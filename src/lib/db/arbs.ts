import { getPool } from "./index";
import { ArbWithSpread, DepthLevel } from "./types";

/**
 * Query active arbitrage opportunities from the arb_snapshot table.
 * 
 * Set SHOW_ALL_ARBS=true to disable the 5-minute freshness filter (for testing).
 */
export async function getActiveArbs(): Promise<ArbWithSpread[]> {
  const pool = getPool();
  const showAll = process.env.SHOW_ALL_ARBS === "true";

  const timeFilter = showAll
    ? ""
    : "AND snapshot_at > now() - interval '5 minutes'";

  const result = await pool.query(`
    SELECT DISTINCT ON (market_match_id)
      id,
      market_match_id,
      kalshi_event_ticker,
      kalshi_market_ticker,
      polymarket_market_ticker,
      polymarket_event_ticker,
      direction,
      kalshi_ask,
      kalshi_bid,
      poly_ask,
      poly_bid,
      raw_spread_pct,
      net_spread_pct,
      kalshi_fee,
      poly_fee,
      kalshi_title,
      poly_slug,
      kalshi_url,
      poly_url,
      kalshi_l1_size,
      poly_l1_size,
      max_size_dollars,
      COALESCE(total_arb_value, 0) as total_arb_value,
      COALESCE(kalshi_subtitle, '') as kalshi_subtitle,
      depth_levels,
      snapshot_at
    FROM arb_snapshot
    WHERE net_spread_pct > 0
      ${timeFilter}
    ORDER BY market_match_id, snapshot_at DESC
  `);

  return result.rows.map((row) => {
    const dir = row.direction as string;
    const isKalshiYes = dir === "kalshi_yes_poly_no";

    const kalshiUrl = row.kalshi_url || `https://kalshi.com/markets/${row.kalshi_event_ticker}`;
    const polymarketUrl = row.poly_url || (row.poly_slug ? `https://polymarket.com/event/${row.poly_slug}` : "");

    // Parse depth_levels from JSONB
    let depthLevels: DepthLevel[] = [];
    try {
      if (row.depth_levels) {
        depthLevels = typeof row.depth_levels === "string"
          ? JSON.parse(row.depth_levels)
          : row.depth_levels;
      }
    } catch { /* ignore parse errors */ }

    // Compute total depth (sum of sizes across all levels)
    const totalDepth = depthLevels.reduce((sum, l) => sum + l.size, 0);

    return {
      id: row.id,
      market: row.kalshi_subtitle
        ? `${row.kalshi_title} — ${row.kalshi_subtitle}`
        : row.kalshi_title || "Unknown",
      category: "",
      kalshiTicker: row.kalshi_market_ticker,
      polymarketId: row.polymarket_market_ticker,
      kalshiPrice: parseFloat(row.kalshi_ask) || 0,
      polymarketPrice: parseFloat(row.poly_ask) || 0,
      spread: parseFloat(row.net_spread_pct),
      kalshiUrl,
      polymarketUrl,
      kalshiFee: parseFloat(row.kalshi_fee) || 0,
      polyFee: parseFloat(row.poly_fee) || 0,
      rawSpread: parseFloat(row.raw_spread_pct) || 0,
      kalshiL1Size: parseFloat(row.kalshi_l1_size) || 0,
      polyL1Size: parseFloat(row.poly_l1_size) || 0,
      maxSize: parseFloat(row.max_size_dollars) || 0,
      totalArbValue: parseFloat(row.total_arb_value) || 0,
      depthLevels,
      totalDepth,
      direction: isKalshiYes
        ? "Buy YES on Kalshi, Buy NO on Polymarket"
        : "Buy NO on Kalshi, Buy YES on Polymarket",
      expiration: null,
      updatedAt: row.snapshot_at,
    };
  }).sort((a, b) => b.spread - a.spread);
}
