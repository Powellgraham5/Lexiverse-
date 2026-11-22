import { toast } from '../components/toast.jsx';

// Screens where reloading would lose the learner's place: lessons, tests, games and the note editor.
const BUSY = ['/welcome', '/challenge', '/learn/flashcards', '/learn/quiz', '/learn/spell', '/learn/match'];
// Typing is also busy: an update must never wipe text in the translator, search, a note or a form.
const typing = () => {
  const a = document.activeElement;
  if (a && a.matches?.('input, textarea, [contenteditable]')) return true;
  return [...document.querySelectorAll('textarea, input[type="text"], input[type="search"], input:not([type])')].some((el) => el.value && el.offsetParent !== null);
};
export const isBusy = (path) => BUSY.includes(path) || /^\/learn\/(path|bank)\/[^/]+\/[^/]+$/.test(path) || path.startsWith('/words/note/') || (typeof document !== 'undefined' && typing());

const HOUR = 60 * 60 * 1000;

// Registers the service worker built by vite-plugin-pwa. New versions install on their own:
// the app switches over straight away, unless the learner is in the middle of a lesson, test,
// game or note, in which case it waits until they leave that screen.
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const { registerSW } = await import('virtual:pwa-register');
  // Ask the browser to keep words, notes and progress even when the device runs low on space.
  navigator.storage?.persist?.().catch(() => {});
  let waiting = null;
  const apply = () => { clearInterval(waiting); update(true); };
  const update = registerSW({
    immediate: true,
    onOfflineReady() { toast({ text: 'Lexiverse now works offline', kind: 'success' }); },
    onNeedRefresh() {
      if (!isBusy(location.pathname)) return apply();
      toast({ text: 'A new version will load when you finish', action: 'Update now', onAction: apply });
      clearInterval(waiting);
      waiting = setInterval(() => { if (!isBusy(location.pathname)) apply(); }, 1500);
    },
    onRegisteredSW(_url, reg) {
      if (!reg) return;
      // Look for new versions every hour and whenever the app comes back to the foreground.
      setInterval(() => reg.update().catch(() => {}), HOUR);
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }
  });
}

// Install: Chrome and Android offer a prompt we can show from a button; iPhone needs Share, then Add to Home Screen.
let installEvent = null;
const installListeners = new Set();
if (typeof window !== 'undefined') {
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; installListeners.forEach((f) => f()); });
  addEventListener('appinstalled', () => { installEvent = null; installListeners.forEach((f) => f()); });
}
export const installed = () => typeof matchMedia !== 'undefined' && (matchMedia('(display-mode: standalone)').matches || navigator.standalone === true);
export const canInstall = () => Boolean(installEvent);
export const onInstallChange = (f) => { installListeners.add(f); return () => installListeners.delete(f); };
export async function promptInstall() {
  if (!installEvent) return false;
  installEvent.prompt();
  const { outcome } = await installEvent.userChoice.catch(() => ({}));
  installEvent = null;
  installListeners.forEach((f) => f());
  return outcome === 'accepted';
}
