import { rawPageHtml, rawPageMeta } from "@/data/rawPages";

export type PageSlug = keyof typeof rawPageHtml;

export async function getPageHtml(slug: PageSlug) {
  return {
    slug,
    html: rawPageHtml[slug],
    meta: rawPageMeta[slug]
  };
}
