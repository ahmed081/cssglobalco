# Frozen content model contract

The frontend now has a stable API-ready model in `src/content/contentModel.ts`.

Future backend response example:

```json
{
  "slug": "home",
  "locale": "en",
  "seo": {
    "title": "CSS — Customers, Sales & Solutions",
    "description": "Scale your SaaS team faster with nearshore talent from Morocco.",
    "keywords": ["nearshore outsourcing", "SaaS hiring"]
  },
  "assets": [
    {
      "id": "brand-logo",
      "type": "logo",
      "src": "/logo.png",
      "alt": "CSS — Customers, Sales & Solutions",
      "priority": true
    }
  ],
  "sections": [
    {
      "id": "home-hero",
      "type": "hero",
      "enabled": true,
      "order": 10,
      "content": {
        "eyebrow": "Nearshore SaaS Teams",
        "title": "Scale your SaaS team with nearshore talent",
        "subtitle": "Hire Sales, Customer Success, and Engineering teams faster.",
        "actions": [
          { "label": "Book a call", "href": "/#contact", "variant": "primary" }
        ]
      }
    }
  ]
}
```

The next step can add `contentService.getPage(slug)` and keep the current static model as the mock provider.
