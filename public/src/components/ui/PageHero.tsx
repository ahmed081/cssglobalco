import type { PageHeroSection } from "@/types/content.types";
import { Button } from "./Button";

export function PageHero({ section }: { section: PageHeroSection }) {
  return (
    <section className="page-hero">
      <div className="page-hero-eyebrow">{section.eyebrow}</div>
      <h1 dangerouslySetInnerHTML={{ __html: section.title }} />
      {section.subtitle ? <p>{section.subtitle}</p> : null}
      {section.actions?.length ? (
        <div className="hero-cta-row">
          {section.actions.map((action) => (
            <Button key={`${action.href}-${action.label}`} data={action} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
