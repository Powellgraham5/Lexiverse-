# Lexiverse: Product Plan

Lexiverse is a vocabulary-learning app, not just a dictionary. Every feature serves one journey:

**Discover → Understand → Practise → Remember**, with learning data feeding back into what we show next.

## Decisions so far

| Decision | Choice |
|---|---|
| Core idea | Learn & play: dictionary plus daily practice, flashcards, quizzes and streaks |
| Design phase | Clickable HTML prototype (`prototype/index.html`) |
| Final product | Installable web app (PWA), mobile-first, works on desktop |
| Accounts | Optional; everything works without signing in, sign in to sync |
| Accessibility | First-class: usable by people who are blind or have low vision |
| Translator | Built in: per-word translation and a phrase translator |

## Accessibility commitments

Not a later polish pass: every screen is built to these from day one:

- Works fully with screen readers (VoiceOver, TalkBack, NVDA): labelled controls, landmarks, headings, live announcements for results and quiz feedback, focus moved to the new screen's heading on navigation.
- Everything readable aloud: words (US/UK, slow), meanings, quiz questions and options, translations. Optional "read words aloud" mode.
- Voice input: voice search, voice input for the translator, and "listen and spell" practice that needs no reading.
- Low vision: text size up to 160%, Atkinson Hyperlegible font by default (Lexend option), high-contrast mode in light and dark, 48px touch targets.
- Full keyboard use with visible focus, reduce-motion setting, no information carried by colour alone.
- Target: WCAG 2.2 AA, tested with real screen readers before launch.

## Screens (in the prototype)

- **Onboarding**: goal, level, comfort settings (text size, read-aloud, contrast).
- **Today**: word of the day with listen and save, a one-minute daily challenge with an explanation, a "write your own sentence" box, the review due today, and the archive.
- **Search**: autocomplete, "Did you mean…?", voice search, plus modes for searching by meaning (reverse dictionary), pattern (`c?t`, `pre*`), rhymes and letters (anagrams / Scrabble / Wordle helper). Recent searches and tools.
- **Word page**: level, frequency and register tags; IPA and syllables; US/UK/slow audio; numbered meanings with examples labelled Everyday / Academic / Professional; translation; synonyms, antonyms and related words; forms and phrases; origin; personal notes; save to list; share as an image card; copy.
- **Translator**: English → French, Spanish, Yoruba, Hausa, Igbo, Arabic, Chinese, with listen and copy.
- **My Words**: custom lists, search within saved words, history, export.
- **Learn**: the daily review with spaced repetition (Not remembered / Needs practice / Easy), flashcards, a quiz (meaning, synonym, fill the gap, spelling, listen-and-spell, opposite) that explains every answer.
- **Progress**: streak, words saved, quizzes, accuracy, a weekly chart and milestones.
- **Me**: account (optional), theme, reading and listening settings, translation language, reminders, import/export.

## Build phases

**Phase 1: Core (the dictionary people trust)**
- Real word data: Free Dictionary API, Datamuse (autocomplete, meaning search, rhymes, related words), Wiktionary for origin.
- Search with typo tolerance, every search mode, and the full word page.
- Word of the day with its archive; saved lists; history; notes.
- Translator via a translation API. Yoruba, Hausa and Igbo output must be checked by native speakers.
- PWA: install, offline app shell, saved words available offline.
- Error states for: word not found, no internet, API failure and empty search.

**Phase 2: Learning habits**
- Spaced-repetition scheduling (SM-2 style) on saved words.
- Flashcards, all quiz types, daily goal and streak, progress page and milestones.
- Word-of-the-day notification (opt-in).
- Optional accounts with sync across devices.

**Phase 3: Differentiate**
- Personalised word suggestions by goal and level.
- A sentence-improvement tool.
- An AI word tutor, built only if users ask for it. Its answers must be grounded in the dictionary entry and clearly marked as AI.

## Measures (from the proposal)

Search success · saved words per active user · quiz completion and accuracy · 7-day return rate · recall in later reviews · mobile load time and errors.

## Open questions

1. Final tech stack. Options are vanilla JS (as in the original brief) or a light framework (e.g. Preact/Svelte) once the app grows. My recommendation is to decide after the prototype is reviewed.
2. Which translation service to use (cost, and quality for Nigerian languages).
3. Which account provider to use for sync (e.g. Supabase, Firebase).
4. Brand: are the name "Lexiverse", the colours and the fonts final?
