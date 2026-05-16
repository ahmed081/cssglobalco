import type { Metadata } from "next";
import { RawHtml } from "@/components/ui/RawHtml";
import { getPageHtml } from "@/services/contentService";
import { buildPageMetadata } from "@/seo/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

export default async function HomePage() {
  const page = await getPageHtml("home");
  return <RawHtml html={page.html} />;
}
