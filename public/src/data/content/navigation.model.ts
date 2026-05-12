export const navigationModel = {
    primary: [
        {label: "Home", href: "/"},
        {label: "Services", href: "/services"},
        {label: "Pricing", href: "/pricing"},
        {label: "Contact", href: "/#contact"},
    ],
    cta: {label: "Book a call", href: "/#contact", variant: "primary" as const},
    footer: [
        {label: "Home", href: "/"},
        {label: "Services", href: "/services"},
        {label: "Pricing", href: "/pricing"},
        {label: "Contact", href: "/#contact"},
    ],
} as const;
