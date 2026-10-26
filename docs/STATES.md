# Lexiverse: screen states spec

The designs live on the Lexiverse Mockups canvas (rows "States: …"). This file is the build contract: which states every screen has, when each one appears, and what it must say to screen readers.

Code: `src/lib/request-state.js` implements the timing rules below. `design/tokens.css` holds every colour, radius and motion value for light, dark and high contrast.

## The state set

Every screen that loads data uses the same states:

| State | When | What the user sees |
|---|---|---|
| `idle` | Nothing requested yet | The screen's starting content (for example recent searches) |
| `loading` | Request running for more than 300 ms | Skeleton shaped like the real layout |
| `success` | Data arrived | The normal screen |
| `empty` | Data arrived but there is nothing to show | Friendly illustration, one clear next step |
| `not-found` | The item does not exist (HTTP 404) | Suggestions ("Did you mean…") and an alternative path |
| `error` | Server or network failed after one silent retry, or over 10 s | Plain explanation, Retry button, a way to keep going offline, error code |
| `offline` | Device is offline before or during a request | Banner plus anything saved on the device |
| `partial` | Data arrived but a piece is missing (audio, translation) | The content, with the missing piece explained inline |

### Timing rules

- Under **300 ms**: show nothing new. No skeleton flash.
- Once a skeleton is visible, keep it at least **400 ms**.
- Failures get **1 silent retry** (600 ms backoff). Then show `error`.
- A request still running after **10 s** becomes `error` (kind `timeout`).
- `not-found` is never retried.
- Search input is debounced **250 ms**; a newer query cancels the older request.
- Buttons: `loading` appears after 300 ms; `success` shows for 1.5 s, then resets.
- Toasts: 4 s, or 6 s when they carry an action (Undo, Retry).

## Per screen

| Screen | loading | empty | not-found | error | offline | partial / other |
|---|---|---|---|---|---|---|
| Today | Skeleton planet and chips | n/a | n/a | Show cached word of the day | Yesterday's word + "Review offline" | **Done for today** celebration |
| Search | Skeleton result rows | Idle: recent + explore | "Did you mean" + closest saved word | Inline alert + saved matches + Retry | Banner, search saved words only | Listening (voice) |
| Word page | Full-page skeleton | n/a | Suggestions, describe instead, request word | "Lost in space", Retry, open saved words, code | Show if cached, else error with saved words link | No recording (use device voice), no translation (suggest one) |
| Translator | Shimmer in result card, input stays editable | n/a | n/a | Keep text, explain, Try again | Banner; disable Translate | Listening; voice not available for language |
| My Words | Skeleton list planets | **Your galaxy is empty** | n/a | Lists are local: should not error | Works fully | n/a |
| List detail | Skeleton rows | **No words in this list yet** | List deleted on another device: go back with toast | n/a | Works fully | n/a |
| Learn | Skeleton ring | **All caught up** (next review time) | n/a | n/a | Works fully | n/a |
| Flashcards / Quiz / Listen & spell / Word match | Skeleton card | Nothing due: send to All caught up | n/a | Audio failed: show text and spelling hint | Works fully (audio from device voice) | n/a |
| Progress | Skeleton tiles | **Day one** checklist, no empty charts | n/a | Show last known stats | Works fully | n/a |
| Sign in | Button loading | n/a | n/a | Input errors under the field; provider failure toast | Disable providers, explain | Signed in: sync status pill |

## Accessibility rules for states

- Loading containers get `aria-busy="true"` and an accessible name ("Loading serendipity"). Skeleton shapes are `aria-hidden`.
- `error` and form errors use `role="alert"`. Toasts, sync status and banners use `role="status"` (polite) and never move focus.
- When a screen switches from `loading` to `success`, keep focus where it was. When a full-screen state replaces the screen (`error`, `not-found`), move focus to its heading.
- Inputs in error: `aria-invalid="true"` and `aria-describedby` pointing at the message. The message says how to fix it.
- Disabled controls keep `aria-disabled="true"` and stay focusable when they need explaining (for example "No voice").
- Every state works with reduced motion: shimmer, sparks and orbits stop; nothing important is carried by animation alone.
- Colour is never the only signal: status pills have an icon and a word (Due, Learning, Known), related words have ≈ ≠ + markers.

## Error codes

Shown small under the error message so support can help:

| Code | Meaning |
|---|---|
| `DICT-404` | Word not in dictionary (shown as not-found, not error) |
| `DICT-503` | Dictionary service unavailable |
| `DICT-TIMEOUT` | Dictionary took over 10 s |
| `TR-503` | Translation service unavailable |
| `SYNC-409` | Sync conflict; local copy kept, merged on next sync |
| `NET-OFFLINE` | No connection |
