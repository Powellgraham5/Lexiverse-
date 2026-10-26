import { createContext } from 'preact';
import { useContext, useState, useCallback } from 'preact/hooks';
import { loadSettings, saveSettings, applySettings, normalize } from '../lib/settings.js';

const Ctx = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = normalize({ ...prev, ...patch });
      applySettings(document.documentElement, next);
      saveSettings(next);
      return next;
    });
  }, []);
  return <Ctx.Provider value={[settings, update]}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);
