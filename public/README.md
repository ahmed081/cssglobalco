# CSSGLOBALCO Next.js SSR Version

This version converts `cssglobalco-react-v4-qa-model` from Vite React into a Next.js App Router project.

## What changed

- Public website is now Next.js App Router.
- `/`, `/services`, and `/pricing` are server-rendered routes.
- Page components are async server components by default.
- Interactive behavior is isolated in small client components:
  - `Header`
  - `MobileMenu`
  - `SiteEffects`
- Static content is still used for now through `contentService`.
- Later, `contentService` can call a Spring Boot backend without changing UI components.
- SEO metadata is generated per page using `generateMetadata`.
- Logo is preserved in `public/logo.png`.
- Original CSS and animations are preserved in `src/app/globals.css`.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Backend-ready boundary

Current:

```ts
const page = await getPage("home");
```

Later:

```ts
const page = await fetch(`${API_URL}/api/public/pages/home`).then(r => r.json());
```

Only `src/services/contentService.ts` needs to change.
