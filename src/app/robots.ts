import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lyxis.mafrilearth.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register", "/guide", "/verify"],
        disallow: ["/api/", "/admin/", "/candidate/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/register", "/guide", "/verify"],
        disallow: ["/api/", "/admin/", "/candidate/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
