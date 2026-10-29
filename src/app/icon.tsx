import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "#07080B",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#2563EB",
        fontWeight: 900,
        borderRadius: 8,
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      L
    </div>,
    {
      ...size,
    },
  );
}
