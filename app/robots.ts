import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/os", "/portal", "/api"],
    },
    sitemap: "https://www.cfopartners.fund/sitemap.xml",
    host: "https://www.cfopartners.fund",
  };
}
