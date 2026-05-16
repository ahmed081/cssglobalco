import type { CmsPage } from "../types/content.types";
import { rawPageHtml } from "./rawPages";

export const pages: Record<"home" | "services" | "pricing", CmsPage> = {
  home: {
    slug: "home",
    seo: {
      title: "CSS — Customers, Sales & Solutions",
      description:
        "Scale your SaaS team faster with nearshore talent from Morocco. Hire Sales reps, Customer Success teams, and software engineers quickly and cost-effectively.",
      keywords:
        "nearshore outsourcing, SaaS hiring, remote sales team, customer success outsourcing, hire developers Morocco",
    },
    sections: [{ type: "rawHtml", html: rawPageHtml.home }],
  },
  services: {
    slug: "services",
    seo: {
      title: "Services — CSS",
      description:
        "Explore CSS services for Customer Support, Sales SDR/BDR, IT Engineering and training programmes.",
    },
    sections: [{ type: "rawHtml", html: rawPageHtml.services }],
  },
  pricing: {
    slug: "pricing",
    seo: {
      title: "Pricing — CSS",
      description:
        "Compare CSS nearshore team pricing against US hiring costs and calculate potential savings.",
    },
    sections: [{ type: "rawHtml", html: rawPageHtml.pricing }],
  },
};
