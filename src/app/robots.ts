import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lyxis.mafrilearth.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register", "/dashboard", "/verify"],
        disallow: ["/api/", "/admin/", "/exam/", "/result/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/register", "/dashboard", "/verify"],
        disallow: ["/api/", "/admin/", "/exam/", "/result/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
