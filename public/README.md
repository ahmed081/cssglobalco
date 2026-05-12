# CSS Global Co React v3

React + TypeScript frontend clone of the provided HTML pages.

## What changed in v3

- Reusable layout components: `Header`, `MobileMenu`, `Footer`, `AppLayout`
- API-ready content structure in `src/data/pages.data.ts`
- Typed CMS/page model in `src/types/content.types.ts`
- Dynamic page renderer in `src/features/pageRenderer/DynamicPage.tsx`
- SEO manager in `src/seo/Seo.tsx`
- Theme tokens in `src/theme/tokens.ts`
- Better mobile menu behavior and transitions
- Reveal animations and pricing calculator behavior preserved
- Logo and static assets preserved in `public/`

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Future backend integration

Currently, pages are loaded from static data:

```ts
import {pages} from "./data/pages.data";
```

Later, replace this source with an API call returning the same structure:

```ts
GET / api / pages / home
GET / api / pages / services
GET / api / pages / pricing
```

The renderer can keep the same contract.
