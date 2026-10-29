import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 108,
        background: "#07080B",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#2563EB",
        fontWeight: 900,
        borderRadius: 36,
        border: "2px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      L
    </div>,
    {
      ...size,
    },
  );
}
