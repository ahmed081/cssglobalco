import type { Metadata } from "next";
import { RawHtml } from "@/components/ui/RawHtml";
import { getPageHtml } from "@/services/contentService";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageHtml("services");
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ServicesPage() {
  const page = await getPageHtml("services");
  return <RawHtml html={page.html} />;
}
