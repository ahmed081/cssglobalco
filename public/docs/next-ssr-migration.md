# Next.js SSR Migration Notes

## Server-rendered by default

All page routes are server components:

- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/pricing/page.tsx`

They read content on the server through `getPage()` and render HTML before it reaches the browser.

Because the data is static right now, Next.js prerenders these pages as static HTML during build. When backend calls are added, the same structure can become SSR by using `cache: "no-store"` or revalidation.

## Client components kept minimal

Only browser-only behavior uses `"use client"`:

- scroll navbar state
- mobile menu open/close
- custom cursor
- reveal animation observer
- pricing calculator
- form mock submit behavior
- appointment date/time interaction

## Future backend switch

Replace the body of `src/services/contentService.ts` with backend fetch calls.

Recommended future options:

```ts
fetch(url, { cache: "no-store" })
```

for always-fresh SSR, or:

```ts
fetch(url, { next: { revalidate: 300 } })
```

for ISR/cached public pages.
