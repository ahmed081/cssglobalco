import type { Metadata } from "next";
import { RawHtml } from "@/components/ui/RawHtml";
import { getPageHtml } from "@/services/contentService";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageHtml("pricing");
  return { title: page.meta.title, description: page.meta.description };
}

export default async function PricingPage() {
  const page = await getPageHtml("pricing");
  return <RawHtml html={page.html} />;
}
