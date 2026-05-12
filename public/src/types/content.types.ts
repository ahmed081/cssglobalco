export type SeoData = {
  title: string;
  description: string;
  keywords?: string;
};

export type ButtonVariant = "primary" | "ghost" | "gold";

export type ButtonData = {
  label: string;
  href: string;
  variant?: ButtonVariant;
};

export type HeroSection = {
  type: "hero";
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: ButtonData[];
  stats?: Array<{ value: string; label: string }>;
  cards?: Array<{ label: string; role: string; price: string; compare: string; save: string }>;
};

export type PageHeroSection = {
  type: "pageHero";
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions?: ButtonData[];
};

export type TickerSection = {
  type: "ticker";
  items: string[];
};

export type CtaSection = {
  type: "cta";
  title: string;
  subtitle: string;
  actions?: ButtonData[];
};

export type RawHtmlSection = {
  type: "rawHtml";
  html: string;
};

export type PageSection = HeroSection | PageHeroSection | TickerSection | CtaSection | RawHtmlSection;

export type CmsPage = {
  slug: string;
  seo: SeoData;
  sections: PageSection[];
};
