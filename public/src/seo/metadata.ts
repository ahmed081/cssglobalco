import type { Metadata } from "next";
import { rawPageMeta } from "@/data/rawPages";
import { siteData } from "@/data/site.data";
import type { PageSlug } from "@/services/contentService";

export const siteUrl = "https://cssglobalco.com";

export const pageRoutes = {
  home: "/",
  services: "/services",
  pricing: "/pricing"
} as const satisfies Record<PageSlug, string>;

export function routeUrl(slug: PageSlug) {
  return new URL(pageRoutes[slug], siteUrl);
}

export function buildPageMetadata(slug: PageSlug): Metadata {
  const meta = rawPageMeta[slug];
  const url = routeUrl(slug);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteData.name,
      title: meta.title,
      description: meta.description
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
