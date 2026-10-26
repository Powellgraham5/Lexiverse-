# Lexiverse

Discover a word, understand it, practise it and remember it.

Lexiverse is a mobile-first, installable vocabulary-learning app with a built-in translator, designed to be fully usable by people who are blind or have low vision.

## Status

**Design phase.** `prototype/index.html` is a clickable prototype that uses sample data. Use it to review the flow and the look before the real build.

- Open `prototype/index.html` in any browser. It's a single file with nothing to install.
- Use the **Screen** menu at the top to jump to any screen.
- Full sample entries: *serendipity*, *benevolent*, *eloquent*, *resilient*.
- What really works in the prototype: navigation, search modes, the pronunciation buttons (they use the browser's text-to-speech), voice search (Chrome), quizzes, flashcards, lists, notes, settings (theme, text size, font, contrast), export/import, and the share image card.

See [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) for the product plan, accessibility commitments and build phases.

## For developers

- [docs/STATES.md](docs/STATES.md): every screen's loading, empty, error, offline and success states, timing rules and accessibility rules.
- [design/tokens.css](design/tokens.css): the Orbit design tokens (colour, type, radius, motion) for light, dark and high contrast.
- [src/lib/request-state.js](src/lib/request-state.js): turns any data load into those UI states with the agreed timings. Run its tests with `npm test` (Node 20+).
