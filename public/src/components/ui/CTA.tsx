import type { CtaSection } from "@/types/content.types";
import { Button } from "./Button";

export function CTA({ section }: { section: CtaSection }) {
  return (
    <section className="cta-section">
      <div>
        <h2 className="cta-headline" dangerouslySetInnerHTML={{ __html: section.title }} />
        <p className="cta-sub">{section.subtitle}</p>
      </div>
      <div className="cta-right">
        {section.actions?.map((action) => <Button key={`${action.href}-${action.label}`} data={action} />)}
        <div className="cta-note">No long-term lock-in · 90-day replacement guarantee</div>
      </div>
    </section>
  );
}
