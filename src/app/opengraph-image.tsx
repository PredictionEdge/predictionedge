import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PredictionEdge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0a",
      }}>
        <p style={{ fontSize: 48, fontWeight: 500, color: "#ededed", letterSpacing: "-0.02em" }}>
          PredictionEdge
        </p>
        <p style={{ fontSize: 20, color: "#737373", marginTop: 12 }}>
          Prediction market arbitrage
        </p>
      </div>
    ),
    { ...size }
  );
}
