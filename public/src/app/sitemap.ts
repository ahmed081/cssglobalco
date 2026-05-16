import type { MetadataRoute } from "next";
import { pageRoutes, siteUrl } from "@/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return Object.values(pageRoutes).map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
