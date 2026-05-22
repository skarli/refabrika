import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "re:fabrika — Digital Marketing & Brand Growth Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7, display: "flex" }}>
          re:fabrika
        </div>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>Strategy-driven</div>
          <div style={{ opacity: 0.5 }}>digital agency.</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.7,
          }}
        >
          <div>Since 2009</div>
          <div>Fethiye · Istanbul</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
