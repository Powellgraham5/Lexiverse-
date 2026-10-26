import { toast } from '../components/toast.jsx';

// Registers the service worker built by vite-plugin-pwa and tells the learner,
// in one quiet toast, when the app is ready offline or an update is waiting.
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const { registerSW } = await import('virtual:pwa-register');
  const update = registerSW({
    onOfflineReady() { toast({ text: 'Lexiverse now works offline', kind: 'success' }); },
    onNeedRefresh() { toast({ text: 'A new version is ready', action: 'Refresh', onAction: () => update(true) }); }
  });
}
