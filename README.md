# Lexiverse

Discover a word, understand it, practise it and remember it.

Lexiverse is a mobile-first, installable vocabulary-learning app with a built-in translator, designed to be fully usable by people who are blind or have low vision.

## Status

**Building, phases 0 to 2 of 7 done.** It is a PWA only: people install it from the browser, with no app store.

- Live: https://lexiverse.ehigiatorpowell1.workers.dev (deploys from this branch on every push).
- Run it: `npm install`, then `npm run dev`. Hosting and install steps are in [docs/DEPLOY.md](docs/DEPLOY.md).
- Phase 0 (foundations): app shell, themes with the dark-mode starfield, high contrast, reading font, text up to 200%, reduce motion, offline support and install.
- Phase 1 (discover):
  - onboarding with goal, level and comfort settings;
  - Today with the word of the day in orbit, its similar, opposite and family words, and streaks;
  - the daily challenge;
  - Search with Word, Meaning, Pattern, Rhymes and Letters modes, "did you mean", recent searches, and loading, empty, error and offline states.
- Phase 2 (understand):
  - **Word page:** the related words in orbit, level, IPA, syllables, US, UK, Slow and Read all, meaning cards with "Use it", origin from Wiktionary, word family, saving and a personal note.
  - **States:** not found with "did you mean", error, partial (no recording), and offline from the device cache.
  - **Translator:** the language picker with Nigerian languages pinned, an offline phrasebook, voice input, Arabic right to left, and the daily-limit and error states.
  - **Share a word:** an image card you can save, share or link to.
- Word content: 289 hand-written daily words in three levels (`scripts/content/`), enriched by `scripts/build-daily.mjs` with pronunciation, related words, and Wiktionary origins and syllables. A 25,000-word frequency list (`scripts/build-frequency.py`) gives level badges and the offline Letters search.
- **Phrasebook (needs a native speaker):**
  - 25 phrases in Yoruba, Hausa, Igbo, Nigerian Pidgin and French are drafts. Please check them in [docs/PHRASE_REVIEW.md](docs/PHRASE_REVIEW.md): tick each correct line, fix wrong ones in `scripts/content/phrases.txt`, then run `node scripts/build-phrases.mjs`.
  - Until then the app labels them "to be checked by a native speaker".
- Next: phase 3, Practise (Learn hub, flashcards, quiz, listen and spell, word match).
- `prototype/` is the old clickable prototype, kept for reference until the real screens replace it.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the product plan, accessibility commitments and build phases.

## For developers

- [docs/STATES.md](docs/STATES.md): every screen's loading, empty, error, offline and success states, timing rules and accessibility rules.
- [design/tokens.css](design/tokens.css): the Orbit design tokens (colour, type, radius, motion) for light, dark and high contrast.
- [src/lib/request-state.js](src/lib/request-state.js): turns any data load into those UI states with the agreed timings.
- Stack: Vite, Preact, `preact-iso` routing, plain CSS on the tokens, `vite-plugin-pwa`, IndexedDB (`src/lib/db.js`). Fonts are self-hosted so they work offline.
- Layout: `src/app/` holds the shell, nav, settings and service worker; `src/screens/<Screen>/` holds one folder per screen; `src/components/` holds the shared pieces.
- Checks: `npm test` (unit, Node 22) and `npm run e2e` (Playwright: every screen at 390, 768, 1024 and 1440 px, light and dark, axe accessibility, 200% text, offline, install). CI runs both on every push.
