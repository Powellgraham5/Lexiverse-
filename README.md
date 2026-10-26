# Lexiverse

Discover a word, understand it, practise it and remember it.

Lexiverse is a mobile-first, installable vocabulary-learning app with a built-in translator, designed to be fully usable by people who are blind or have low vision.

## Status

**Building, phase 0 of 7 done (foundations).** It is a PWA only: people install it from the browser, with no app store.

- Run it: `npm install`, then `npm run dev`. Hosting and install steps are in [docs/DEPLOY.md](docs/DEPLOY.md).
- Done: app shell (bottom tabs on phones, side rail on computers), light, dark and auto themes with the dark-mode starfield, high contrast, reading font, text size up to 200%, reduce motion, offline support and install, local storage, toasts and the offline banner.
- Next: phase 1, Discover (onboarding, Today, Search, daily challenge).
- `prototype/` is the old clickable prototype, kept for reference until the real screens replace it.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the product plan, accessibility commitments and build phases.

## For developers

- [docs/STATES.md](docs/STATES.md): every screen's loading, empty, error, offline and success states, timing rules and accessibility rules.
- [design/tokens.css](design/tokens.css): the Orbit design tokens (colour, type, radius, motion) for light, dark and high contrast.
- [src/lib/request-state.js](src/lib/request-state.js): turns any data load into those UI states with the agreed timings.
- Stack: Vite, Preact, `preact-iso` routing, plain CSS on the tokens, `vite-plugin-pwa`, IndexedDB (`src/lib/db.js`). Fonts are self-hosted so they work offline.
- Layout: `src/app/` holds the shell, nav, settings and service worker; `src/screens/<Screen>/` holds one folder per screen; `src/components/` holds the shared pieces.
- Checks: `npm test` (unit, Node 22) and `npm run e2e` (Playwright: every screen at 390, 768, 1024 and 1440 px, light and dark, axe accessibility, 200% text, offline, install). CI runs both on every push.
