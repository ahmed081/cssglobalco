# CSS Global Co — React TS v4 QA + Frozen Model

This version focuses on steps 1 and 2:

1. Pixel-perfect QA improvements against the original HTML exports.
2. A frozen, backend-ready content model for future API integration.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main improvements

- Original CSS blocks from Home, Services, and Pricing are preserved.
- React-specific overrides improve mobile header/menu behavior.
- Logo is preserved in `public/logo.png`.
- Mobile overlay uses body scroll locking and animated link transitions.
- Content model contract added in `src/content/contentModel.ts`.
- Frozen static page model added in `src/data/content/frozenPages.model.ts`.
- QA docs added in `docs/pixel-perfect-qa.md` and `docs/content-model-contract.md`.

## Next recommended step

Add `contentService.getPage(slug)` so pages read from the frozen static model first, then later from Spring Boot APIs.
