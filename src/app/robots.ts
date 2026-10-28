import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lyxis.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/dashboard", "/verify"],
        disallow: ["/api/", "/admin/", "/exam/", "/result/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/dashboard", "/verify"],
        disallow: ["/api/", "/admin/", "/exam/", "/result/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
