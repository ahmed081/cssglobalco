import { RawHtml } from "@/components/ui/RawHtml";
import { getPageHtml } from "@/services/contentService";

export default async function HomePage() {
  const page = await getPageHtml("home");
  return <RawHtml html={page.html} />;
}
