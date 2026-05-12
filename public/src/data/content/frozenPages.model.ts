import type {PageModel} from "../../content/contentModel";
import {rawPageHtml} from "../rawPages";

const sharedAssets = [
    {
        id: "brand-logo",
        type: "logo",
        src: "/logo.png",
        alt: "CSS — Customers, Sales & Solutions",
        priority: true,
    },
] as const;

export const frozenPagesModel: Record<PageModel["slug"], PageModel> = {
    home: {
        slug: "home",
        locale: "en",
        seo: {
            title: "CSS — Customers, Sales & Solutions",
            description:
                "Scale your SaaS team faster with nearshore talent from Morocco. Hire Sales reps, Customer Success teams, and software engineers quickly and cost-effectively.",
            keywords: ["nearshore outsourcing", "SaaS hiring", "remote sales team", "customer success outsourcing"],
        },
        assets: [...sharedAssets],
        sections: [
            {
                id: "home-legacy-html",
                type: "rawHtml",
                enabled: true,
                order: 10,
                content: {source: "legacy-html", html: rawPageHtml.home},
            },
        ],
    },
    services: {
        slug: "services",
        locale: "en",
        seo: {
            title: "Services — CSS",
            description: "Customer Support, Sales SDR/BDR, IT Engineering and training programmes for SaaS teams.",
            keywords: ["customer support", "SDR outsourcing", "IT engineering", "nearshore Morocco"],
        },
        assets: [...sharedAssets],
        sections: [
            {
                id: "services-legacy-html",
                type: "rawHtml",
                enabled: true,
                order: 10,
                content: {source: "legacy-html", html: rawPageHtml.services},
            },
        ],
    },
    pricing: {
        slug: "pricing",
        locale: "en",
        seo: {
            title: "Pricing — CSS",
            description: "Compare CSS nearshore team pricing against US hiring costs and calculate potential savings.",
            keywords: ["nearshore pricing", "SaaS hiring cost", "remote team pricing"],
        },
        assets: [...sharedAssets],
        sections: [
            {
                id: "pricing-legacy-html",
                type: "rawHtml",
                enabled: true,
                order: 10,
                content: {source: "legacy-html", html: rawPageHtml.pricing},
            },
        ],
    },
};
