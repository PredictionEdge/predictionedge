"use client";

import { useState } from "react";
import { ArbWithSpread } from "@/lib/db/types";
import { Input } from "@/components/ui/input";
import InfoTooltip from "@/components/ui/info-tooltip";

interface Props { arb: ArbWithSpread; onClose: () => void; }

export default function ArbCalculator({ arb }: Props) {
  const [stake, setStake] = useState(100);

  const totalCost = arb.kalshiPrice + arb.polymarketPrice;
  const netProfitPerContract = arb.spread / 100;
  const rawProfitPerContract = arb.rawSpread / 100;
  const feesPerContract = rawProfitPerContract - netProfitPerContract;

  // User's custom stake calculation
  const contracts = totalCost > 0 ? Math.floor(stake / totalCost) : 0;
  const customProfit = contracts * netProfitPerContract;
  const customRoi = totalCost > 0 ? (netProfitPerContract / totalCost) * 100 : 0;

  // L1 max profit (what's actually executable right now)
  const l1Contracts = Math.floor(arb.maxSize);
  const l1Profit = l1Contracts * netProfitPerContract;
  const l1Cost = l1Contracts * totalCost;

  return (
    <div className="rounded-xl bg-secondary/50 p-4 space-y-4">
      {/* Price breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-background/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground/60">Buy side</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <a href={arb.kalshiUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[var(--color-kalshi)] hover:underline">Kalshi</a>
              <span className="font-mono text-sm text-[var(--color-kalshi)]">
                {(arb.kalshiPrice * 100).toFixed(1)}¢
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <a href={arb.polymarketUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-[var(--color-poly)] hover:underline">Polymarket</a>
              <span className="font-mono text-sm text-[var(--color-poly)]">
                {(arb.polymarketPrice * 100).toFixed(1)}¢
              </span>
            </div>
            <div className="border-t border-border/30 pt-1.5 flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground/60">Total cost</span>
              <span className="font-mono text-sm">{(totalCost * 100).toFixed(1)}¢</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-background/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground/60">Per contract</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">Gross profit <InfoTooltip text="Raw profit per contract before any platform fees. Calculated as $1 payout minus combined cost on both platforms." /></span>
              <span className="font-mono text-sm">{(rawProfitPerContract * 100).toFixed(2)}¢</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground/60">Fees</span>
              <span className="font-mono text-sm text-red-400/70">−{(feesPerContract * 100).toFixed(2)}¢</span>
            </div>
            <div className="border-t border-border/30 pt-1.5 flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">Net profit <InfoTooltip text="Profit per contract after Kalshi and Polymarket taker fees are deducted. This is what you actually keep per contract." /></span>
              <span className="font-mono text-sm text-[var(--color-spread-green)]">
                {(netProfitPerContract * 100).toFixed(2)}¢
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available at L1 */}
      {arb.maxSize > 0 && (
        <div className="rounded-lg border border-[var(--color-spread-green)]/20 bg-[var(--color-spread-green)]/5 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[var(--color-spread-green)] flex items-center gap-1">Available now at best price <InfoTooltip text="Maximum contracts you can execute right now at the current best ask on both platforms. Limited by the thinner side of the book. Larger orders will fill at worse prices." /></span>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <p className="text-xs text-muted-foreground/60 mb-0.5">Contracts</p>
              <p className="font-mono text-sm">{l1Contracts.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60 mb-0.5">Capital needed</p>
              <p className="font-mono text-sm">${l1Cost.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground/60 mb-0.5 flex items-center gap-1">Profit <InfoTooltip text="Total profit if you fill all available contracts at the current best price. Includes both platform fees. Does not account for slippage if the book moves before execution." /></p>
              <p className="font-mono text-sm text-[var(--color-spread-green)]">${l1Profit.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground/50">
            <span>Kalshi depth: {Math.floor(arb.kalshiL1Size)} contracts</span>
            <span>Poly depth: {Math.floor(arb.polyL1Size)} contracts</span>
          </div>
        </div>
      )}

      {/* Custom calculator */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground/60">Custom stake</span>
          <div className="relative flex-1 max-w-[140px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 text-xs">$</span>
            <Input type="number" value={stake} onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
              className="pl-6 h-7 text-xs font-mono bg-background/50 border-border/40 rounded-lg" min={0} step={100} />
          </div>
          <div className="flex gap-1">
            {[100, 500, 1000, 5000].map(v => (
              <button key={v} onClick={() => setStake(v)}
                className={`rounded-md px-2 py-1 text-[10px] transition-colors ${
                  stake === v ? "bg-foreground text-background" : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}>${v >= 1000 ? `${v/1000}k` : v}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <Stat label="Kalshi" value={`$${(totalCost > 0 ? (arb.kalshiPrice / totalCost) * stake : 0).toFixed(0)}`} color="var(--color-kalshi)" />
          <Stat label="Polymarket" value={`$${(totalCost > 0 ? (arb.polymarketPrice / totalCost) * stake : 0).toFixed(0)}`} color="var(--color-poly)" />
          <Stat label="Contracts" value={contracts.toLocaleString()} />
          <Stat label="Profit ℹ" value={`$${customProfit.toFixed(2)}`} sub={`${customRoi.toFixed(1)}% ROI`} color="var(--color-spread-green)" tooltip="Estimated profit at the current best price. If your stake exceeds L1 depth, actual profit will be lower due to slippage into worse price levels." />
        </div>
        {contracts > l1Contracts && l1Contracts > 0 && (
          <p className="mt-2 text-[10px] text-yellow-400/70 text-center">
            ⚠️ Only {l1Contracts} contracts available at L1 — {contracts - l1Contracts} would need deeper fills with worse prices
          </p>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground/50 text-center">
        Net spread includes platform fees · Excludes slippage beyond L1
      </p>
    </div>
  );
}

function Stat({ label, value, sub, color, tooltip }: { label: string; value: string; sub?: string; color?: string; tooltip?: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground/60 mb-0.5 flex items-center justify-center gap-1">{label} {tooltip && <InfoTooltip text={tooltip} />}</p>
      <p className="text-sm font-mono font-medium" style={color ? { color } : {}}>{value}</p>
      {sub && <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">{sub}</p>}
    </div>
  );
}
