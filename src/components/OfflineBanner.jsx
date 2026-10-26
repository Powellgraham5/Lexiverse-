import { useEffect, useState } from 'preact/hooks';
import { OfflineIcon } from '../app/icons.jsx';

export function useOnline() {
  const [online, setOnline] = useState(() => navigator.onLine !== false);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    addEventListener('online', on);
    addEventListener('offline', off);
    // The connection may have changed between first render and now.
    setOnline(navigator.onLine !== false);
    return () => { removeEventListener('online', on); removeEventListener('offline', off); };
  }, []);
  return online;
}

// NET-OFFLINE: one calm line, never a blocking screen. Saved things keep working.
export function OfflineBanner() {
  const online = useOnline();
  return (
    <div role="status" aria-live="polite" class="lx-offline-slot">
      {!online && (
        <div class="lx-offline">
          <OfflineIcon size={18} />
          <span>Offline. Your saved words and practice still work.</span>
        </div>
      )}
    </div>
  );
}
