# Pixel-perfect QA checklist

This version keeps the original CSS blocks from Home, Services, and Pricing and adds React-specific corrections.

## Checked/fixed areas

- Header spacing, logo size, scrolled state, and mobile breakpoint behavior.
- Mobile overlay open/close behavior, body scroll lock, link animation, and CTA visibility.
- Original typography variables and Google font stack preserved.
- Original section spacing preserved with responsive overrides for tablet and mobile.
- Original reveal/ticker animations preserved with reduced-motion support.
- Legacy links normalized from `.html` paths to React routes.
- Original inline logo asset preserved as `/public/logo.png`.

## Manual QA to run after `npm run dev`

1. Compare `/` with `index(1).html` at 1440px, 1024px, 768px, and 390px.
2. Compare `/services` with `services(1).html` at the same breakpoints.
3. Compare `/pricing` with `pricing(1).html` at the same breakpoints.
4. Scroll each page and verify the header shrinks and keeps the same color behavior.
5. Open the mobile menu, click each link, and verify body scrolling is locked while the menu is open.
6. Test pricing tabs, calculator values, time-slot selection, and contact form feedback.

## Known intentional choice

The UI is still rendered from legacy HTML sections for maximum visual fidelity. The frozen content model is now defined
separately so the next version can progressively replace each raw HTML block with real typed React components without
changing the future API contract.
