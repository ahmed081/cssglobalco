import type { CmsPage, PageSection } from "@/types/content.types";
import { RawHtml } from "@/components/ui/RawHtml";
import { PageHero } from "@/components/ui/PageHero";
import { Ticker } from "@/components/ui/Ticker";
import { CTA } from "@/components/ui/CTA";

function SectionRenderer({ section }: { section: PageSection }) {
  switch (section.type) {
    case "rawHtml":
      return <RawHtml html={section.html} />;
    case "pageHero":
      return <PageHero section={section} />;
    case "ticker":
      return <Ticker section={section} />;
    case "cta":
      return <CTA section={section} />;
    default:
      return null;
  }
}

export function DynamicPage({ page }: { page: CmsPage }) {
  return <>{page.sections.map((section, index) => <SectionRenderer key={`${page.slug}-${section.type}-${index}`} section={section} />)}</>;
}
