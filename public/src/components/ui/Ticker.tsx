import type { TickerSection } from "@/types/content.types";

export function Ticker({ section }: { section: TickerSection }) {
  const items = [...section.items, ...section.items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {items.map((item, index) => (
          <div className="ticker-item" key={`${item}-${index}`}>
            <span>✦</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
