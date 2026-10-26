# Lexiverse

Discover a word, understand it, practise it and remember it.

Lexiverse is a mobile-first, installable vocabulary-learning app with a built-in translator, designed to be fully usable by people who are blind or have low vision.

## Status

**Building, phases 0 and 1 of 7 done.** It is a PWA only: people install it from the browser, with no app store.

- Run it: `npm install`, then `npm run dev`. Hosting and install steps are in [docs/DEPLOY.md](docs/DEPLOY.md).
- Phase 0 (foundations): app shell, themes with the dark-mode starfield, high contrast, reading font, text up to 200%, reduce motion, offline support and install.
- Phase 1 (discover):
  - onboarding with goal, level and comfort settings;
  - Today with the word of the day in orbit, its similar, opposite and family words, and streaks;
  - the daily challenge;
  - Search with Word, Meaning, Pattern, Rhymes and Letters modes, "did you mean", recent searches, and loading, empty, error and offline states.
- Word content: 289 hand-written daily words in three levels (`scripts/content/`), enriched by `scripts/build-daily.mjs`. A 25,000-word frequency list (`scripts/build-frequency.py`) gives level badges and the offline Letters search.
- Next: phase 2, Understand (word page, translator, share a word).
- `prototype/` is the old clickable prototype, kept for reference until the real screens replace it.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the product plan, accessibility commitments and build phases.

## For developers

- [docs/STATES.md](docs/STATES.md): every screen's loading, empty, error, offline and success states, timing rules and accessibility rules.
- [design/tokens.css](design/tokens.css): the Orbit design tokens (colour, type, radius, motion) for light, dark and high contrast.
- [src/lib/request-state.js](src/lib/request-state.js): turns any data load into those UI states with the agreed timings.
- Stack: Vite, Preact, `preact-iso` routing, plain CSS on the tokens, `vite-plugin-pwa`, IndexedDB (`src/lib/db.js`). Fonts are self-hosted so they work offline.
- Layout: `src/app/` holds the shell, nav, settings and service worker; `src/screens/<Screen>/` holds one folder per screen; `src/components/` holds the shared pieces.
- Checks: `npm test` (unit, Node 22) and `npm run e2e` (Playwright: every screen at 390, 768, 1024 and 1440 px, light and dark, axe accessibility, 200% text, offline, install). CI runs both on every push.
