import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lyxis — TOEFL Diagnostic",
    short_name: "Lyxis",
    description: "Standardized score prediction and verified credentials.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080B",
    theme_color: "#07080B",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
