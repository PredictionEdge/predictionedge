import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PredictionEdge — Prediction Market Arbitrage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 25% 50%, rgba(59,130,246,0.15), transparent 50%), radial-gradient(circle at 75% 50%, rgba(139,92,246,0.15), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f5e6d3",
              letterSpacing: "-0.03em",
            }}
          >
            PredictionEdge
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#737373",
              marginTop: 16,
            }}
          >
            Real-time prediction market arbitrage
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 18,
                color: "#3b82f6",
              }}
            >
              ● Kalshi
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#22c55e",
              }}
            >
              ↔ Spread
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 18,
                color: "#8b5cf6",
              }}
            >
              ● Polymarket
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
