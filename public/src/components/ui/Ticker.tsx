import type {TickerSection} from "../../types/content.types";

export function Ticker({section}: { section: TickerSection }) {
    const items = [...section.items, ...section.items];
    return (
        <div className="ticker-wrap">
            <div className="ticker-inner">
                {items.map((item, index) => (
                    <span className="ticker-item" key={`${item}-${index}`}>
            <span>✦</span>{item}
          </span>
                ))}
            </div>
        </div>
    );
}
