import { useEffect } from 'preact/hooks';

// Set by the shell on in-app navigation; the next screen to mount moves focus to its heading.
let focusPending = false;
export const requestHeadingFocus = () => { focusPending = true; };

// Focus the screen's h1. Many screens show a placeholder heading while their data loads and then
// replace it, which drops focus to <body>; so keep watching for about two seconds and move focus
// to the real heading whenever focus is lost, unless the learner has already moved it themselves.
function focusHeading() {
  const focus = () => {
    const h1 = document.querySelector('#main h1');
    if (!h1) return false;
    h1.setAttribute('tabindex', '-1');
    h1.focus({ preventScroll: true });
    return true;
  };
  focus();
  const until = Date.now() + 2000;
  const tick = () => {
    const a = document.activeElement;
    const lost = !a || a === document.body || !a.isConnected;
    if (lost) focus();
    if (Date.now() < until && (lost || a?.tagName === 'H1')) setTimeout(tick, 100);
  };
  setTimeout(tick, 100);
}

// Sets the browser tab title and, after navigation, focuses the screen's h1 so screen readers announce it.
export function usePage(title) {
  useEffect(() => { document.title = title ? `${title} · Lexiverse` : 'Lexiverse: learn a word a day'; }, [title]);
  useEffect(() => {
    if (!focusPending) return;
    focusPending = false;
    focusHeading();
  }, []);
}
