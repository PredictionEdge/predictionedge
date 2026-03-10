import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PredictionEdge — Prediction Market Arbitrage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a",
        backgroundImage: "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.08) 0%, transparent 50%)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#f5e6d3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>PE</div>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 700, color: "#f5e6d3", margin: 0, letterSpacing: "-0.02em" }}>
            Find the gaps between markets.
          </h1>
          <div style={{ display: "flex", gap: 40, marginTop: 40, fontSize: 18 }}>
            <span style={{ color: "#3b82f6" }}>Kalshi</span>
            <span style={{ color: "#22c55e" }}>↔ Spread</span>
            <span style={{ color: "#8b5cf6" }}>Polymarket</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
