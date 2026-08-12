import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://autocomplete.proptechusa.ai/sitemap.xml",
    host: "https://autocomplete.proptechusa.ai",
  };
}
