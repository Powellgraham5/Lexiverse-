# Lexiverse

Discover a word, understand it, practise it and remember it.

Lexiverse is a mobile-first, installable vocabulary-learning app with a built-in translator, designed to be fully usable by people who are blind or have low vision.

## Status

**Building, phases 0 to 3 of 7 done.** It is a PWA only: people install it from the browser, with no app store.

- Live: https://lexiverse.ehigiatorpowell1.workers.dev (deploys from `main` on every push).
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
- Phase 3 (practise):
  - **Learn hub:** today's progress ring, words due, the practice tiles, setup and the weekly streak, plus "All caught up".
  - **Practice modes:** flashcards (Forgot, Almost or Got it, keys 1 to 3), quick quiz (meaning and fill the gap), listen and spell (letter-by-letter feedback, with a hint that works without sound) and word match (keyboard friendly).
  - **Setup:** mixed practice with listening and spelling questions.
  - **Memory:** spaced repetition decides when each word comes back. Words of the day you meet join your reviews automatically.
- Phase 4 (remember):
  - **My Words:** your galaxy of lists with how much is known and due, search within saved words, and recently looked up.
  - **Lists:** create, rename, change colour and icon, export as CSV, and delete with undo. The bookmark on a word page saves it to one or more lists.
  - **List detail:** sort, listen, remove with undo, and review or quiz just that list.
  - **Your universe:** streak, recall, quizzes, minutes this week (with a text version for screen readers), constellations, and the word of the day archive as a calendar or a list.
- Learning paths:
  - **Paths hub:** Everyday English, Exam preparation, Better writing, and Work and career each lead somewhere different, with a "How it works" line. Everyday English keeps the existing daily words and practice.
  - **Open now (45 lessons):** WAEC / NECO English, IELTS (writing tasks 1 and 2, reading, listening with the device voice, and a timed speaking cue card), SAT Reading and Writing, Essays, Reports, Stories and Emails. Meetings, Interviews and other exams show as coming soon.
  - **Each path:** a "How to use this path" guide, lessons (teaching cards, then multiple choice, fill the gap, spot the mistake, put in order, listening, speaking and writing tasks with automatic checks and a model answer) and a **timed practice test** with a pausable timer that can be switched off, scores and a best score.
  - **Writing formats:** layouts, rules and common mistakes for WAEC letters, speeches and articles, IELTS tasks, the SAT question format, essays, reports, stories and emails, with Copy template and Save to notebook.
  - **Notebook:** a Notebook tab in My Words with ruled-paper notes, autosave, search, delete with undo, and "Save to notebook" on every lesson card and format.
  - Content is practice material, not official past questions. A teacher checklist is in [docs/CONTENT_REVIEW.md](docs/CONTENT_REVIEW.md).
- Next: phase 5, account and settings (optional sign-in and sync).
- `prototype/` is the old clickable prototype, kept for reference until the real screens replace it.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the product plan, accessibility commitments and build phases.

## For developers

- [docs/STATES.md](docs/STATES.md): every screen's loading, empty, error, offline and success states, timing rules and accessibility rules.
- [design/tokens.css](design/tokens.css): the Orbit design tokens (colour, type, radius, motion) for light, dark and high contrast.
- [src/lib/request-state.js](src/lib/request-state.js): turns any data load into those UI states with the agreed timings.
- Stack: Vite, Preact, `preact-iso` routing, plain CSS on the tokens, `vite-plugin-pwa`, IndexedDB (`src/lib/db.js`). Fonts are self-hosted so they work offline.
- Layout: `src/app/` holds the shell, nav, settings and service worker; `src/screens/<Screen>/` holds one folder per screen; `src/components/` holds the shared pieces.
- Checks: `npm test` (unit, Node 22) and `npm run e2e` (Playwright: every screen at 390, 768, 1024 and 1440 px, light and dark, axe accessibility, 200% text, offline, install). CI runs both on every push.
