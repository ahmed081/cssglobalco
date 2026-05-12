export type Locale = "en" | "fr";

export type SeoModel = {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
};

export type MediaAsset = {
    id: string;
    type: "image" | "logo" | "icon";
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
};

export type ActionModel = {
    label: string;
    href: string;
    variant: "primary" | "ghost" | "gold";
    trackingKey?: string;
};

export type BaseSection<TType extends string, TContent> = {
    id: string;
    type: TType;
    enabled: boolean;
    order: number;
    content: TContent;
};

export type HeroSectionModel = BaseSection<
    "hero",
    {
        eyebrow: string;
        title: string;
        subtitle: string;
        actions: ActionModel[];
        stats?: Array<{ value: string; label: string }>;
        comparisonCards?: Array<{ label: string; role: string; cssPrice: string; marketPrice: string; saving: string }>;
    }
>;

export type PageHeroSectionModel = BaseSection<
    "pageHero",
    {
        eyebrow: string;
        title: string;
        subtitle: string;
        actions?: ActionModel[];
    }
>;

export type TickerSectionModel = BaseSection<"ticker", { items: string[] }>;

export type CtaSectionModel = BaseSection<
    "cta",
    {
        title: string;
        subtitle: string;
        actions: ActionModel[];
        note?: string;
    }
>;

export type ServiceSectionModel = BaseSection<
    "serviceBlock",
    {
        tag: string;
        title: string;
        price?: string;
        priceNote?: string;
        description: string;
        features: string[];
        kpis?: Array<{ value: string; label: string }>;
        guarantee?: string;
    }
>;

export type PricingSectionModel = BaseSection<
    "pricing",
    {
        introTitle: string;
        introText: string;
        roles: Array<{
            id: string;
            label: string;
            tiers: Array<{
                name: string;
                price: string;
                note: string;
                featured?: boolean;
                features: string[];
            }>;
        }>;
    }
>;

export type RawHtmlSectionModel = BaseSection<"rawHtml", { html: string; source: "legacy-html" }>;

export type SectionModel =
    | HeroSectionModel
    | PageHeroSectionModel
    | TickerSectionModel
    | CtaSectionModel
    | ServiceSectionModel
    | PricingSectionModel
    | RawHtmlSectionModel;

export type PageModel = {
    slug: "home" | "services" | "pricing";
    locale: Locale;
    seo: SeoModel;
    assets: MediaAsset[];
    sections: SectionModel[];
};
