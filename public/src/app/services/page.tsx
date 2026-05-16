import type { Metadata } from "next";
import { RawHtml } from "@/components/ui/RawHtml";
import { getPageHtml } from "@/services/contentService";
import { buildPageMetadata } from "@/seo/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("services");
}

export default async function ServicesPage() {
  const page = await getPageHtml("services");
  return <RawHtml html={page.html} />;
}
