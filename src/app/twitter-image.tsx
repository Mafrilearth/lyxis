import { ImageResponse } from "next/og";

export const alt = "Lyxis — TOEFL ITP® Diagnostic Simulation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: "#07080B",
        color: "#F8FAFC",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 900,
            color: "white",
          }}
        >
          L
        </div>
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#F8FAFC",
          }}
        >
          LYXIS
        </span>
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#94A3B8",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        Calibrated Score Prediction & Verified Institutional Credentials
      </div>
    </div>,
    {
      ...size,
    },
  );
}
