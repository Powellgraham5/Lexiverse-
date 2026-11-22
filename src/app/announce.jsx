import { useEffect } from 'preact/hooks';

// One live region that is always on the page. Screen readers announce a region reliably only when it
// already exists, so feedback that appears after an answer speaks through this one instead of its own.
let region = null;
export function AnnounceRegion() {
  return <p class="lx-sr" aria-live="polite" aria-atomic="true" ref={(el) => { region = el; }} />;
}
export function announce(text) {
  if (!region || !text) return;
  region.textContent = '';
  // A short gap makes repeated messages ("Brilliant!" twice in a row) announce again.
  setTimeout(() => { if (region) region.textContent = text; }, 60);
}
// Announces its text once when it appears, e.g. inside an answer's feedback panel.
export function Announce({ text }) {
  useEffect(() => { announce(text); }, [text]);
  return null;
}

// Announces the visible text of the element it sits in, once, when that element appears.
export function AnnounceParent() {
  let el = null;
  useEffect(() => { const t = el?.parentElement?.textContent?.trim(); if (t) announce(t); }, []);
  return <span hidden ref={(x) => { el = x; }} />;
}
