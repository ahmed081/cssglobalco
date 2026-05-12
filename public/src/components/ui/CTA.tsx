import type { CtaSection } from "../../types/content.types";
import { Button } from "./Button";

export function CTA({ section }: { section: CtaSection }) {
  return (
    <section className="cta-section">
      <div>
        <h2 className="cta-headline" dangerouslySetInnerHTML={{ __html: section.title }} />
        <p className="cta-sub">{section.subtitle}</p>
      </div>
      {section.actions?.length ? (
        <div className="cta-right">
          {section.actions.map((action) => (
            <Button key={action.href + action.label} {...action} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
