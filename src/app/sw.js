import { toast } from '../components/toast.jsx';

// Screens where reloading would lose the learner's place: lessons, tests, games and the note editor.
const BUSY = ['/welcome', '/challenge', '/learn/flashcards', '/learn/quiz', '/learn/spell', '/learn/match'];
export const isBusy = (path) => BUSY.includes(path) || /^\/learn\/(path|bank)\/[^/]+\/[^/]+$/.test(path) || path.startsWith('/words/note/');

const HOUR = 60 * 60 * 1000;

// Registers the service worker built by vite-plugin-pwa. New versions install on their own:
// the app switches over straight away, unless the learner is in the middle of a lesson, test,
// game or note, in which case it waits until they leave that screen.
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const { registerSW } = await import('virtual:pwa-register');
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
