import { useEffect } from 'preact/hooks';

// Set by the shell on in-app navigation; the next screen to mount moves focus to its heading.
let focusPending = false;
export const requestHeadingFocus = () => { focusPending = true; };

// Sets the browser tab title and, after navigation, focuses the screen's h1 so screen readers announce it.
export function usePage(title) {
  useEffect(() => { document.title = title ? `${title} · Lexiverse` : 'Lexiverse: learn a word a day'; }, [title]);
  useEffect(() => {
    if (!focusPending) return;
    focusPending = false;
    const h1 = document.querySelector('#main h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }, []);
}
