import { useEffect, useRef, useState } from 'preact/hooks';
import { createRequest } from '../lib/request-state.js';

// Runs `load` through the shared request-state rules (skeleton delay, retry, timeout, offline)
// whenever deps change. Returns [{ state, data, error, code }, retry].
export function useRequest(load, deps, options) {
  const [result, setResult] = useState({ state: 'idle' });
  const req = useRef(null);
  useEffect(() => {
    if (!load) { setResult({ state: 'idle' }); return undefined; }
    const r = createRequest({ load, onState: setResult, ...options });
    req.current = r;
    r.run();
    return () => r.cancel();
  }, deps);
  return [result, () => req.current?.run()];
}
