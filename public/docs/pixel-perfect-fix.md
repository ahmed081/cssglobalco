# Pixel-perfect correction pass

This version was rebuilt against the original uploaded HTML files rather than the simplified React rendering.

What changed:

- Full original `<body>` markup is preserved per page.
- Original inline `<style>` blocks from Home, Services, and Pricing were re-extracted into `src/app/globals.css`.
- Original base64 logo is preserved directly from the uploaded HTML markup.
- Header/footer markup now matches the provided HTML structure instead of using a simplified React header/footer.
- Font loading uses the original Google Font families: Cormorant Garamond, DM Mono, and Outfit.
- Mobile overlay behavior is restored through `SiteEffects`.
- Original inline handlers like `switchVS`, `switchRole`, and `calcSavings` are bridged in `SiteEffects`.

Server rendering:

- Routes `/`, `/services`, and `/pricing` are server-rendered by default using Next.js App Router.
- Only browser-only interactions live in `src/components/client/SiteEffects.tsx`.
- Static content currently lives in `src/data/rawPages.ts`; later this can be replaced by a backend API response.
