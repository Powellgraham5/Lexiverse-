// Turns any async data load into the UI states the designs define:
// idle, loading, success, empty, not-found, error, offline.
//
// Timing rules (see docs/STATES.md):
// - Fast loads (under showDelay) never flash a skeleton.
// - Once a skeleton is visible it stays for at least minVisible, so it never flickers.
// - Failures get `retries` silent retries with backoff before the error state shows.
// - A load that takes longer than `timeout` becomes an error.

export const STATES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  EMPTY: 'empty',
  NOT_FOUND: 'not-found',
  ERROR: 'error',
  OFFLINE: 'offline'
});

export class RequestError extends Error {
  // kind: 'not-found' | 'timeout' | 'network' | 'server'
  constructor(kind, message, code) {
    super(message || kind);
    this.name = 'RequestError';
    this.kind = kind;
    this.code = code;
  }
}

const wait = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});

export function createRequest({
  load,
  onState,
  isEmpty = (data) => data == null || (Array.isArray(data) && data.length === 0),
  // Only an explicit `false` means offline; unknown (no navigator, or no onLine) counts as online.
  isOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false),
  showDelay = 300,
  minVisible = 400,
  timeout = 10000,
  retries = 1,
  retryDelay = 600,
  now = () => Date.now()
}) {
  let controller = null;

  async function attempt(signal) {
    const timeoutCtl = new AbortController();
    const timer = setTimeout(() => timeoutCtl.abort(new RequestError('timeout', 'Request took too long')), timeout);
    const onAbort = () => timeoutCtl.abort(signal.reason);
    signal.addEventListener('abort', onAbort, { once: true });
    try {
      return await Promise.race([
        load(timeoutCtl.signal),
        new Promise((_, reject) => timeoutCtl.signal.addEventListener('abort', () => reject(timeoutCtl.signal.reason), { once: true }))
      ]);
    } finally {
      clearTimeout(timer);
      signal.removeEventListener('abort', onAbort);
    }
  }

  async function run() {
    controller?.abort(new DOMException('Superseded', 'AbortError'));
    const ctl = (controller = new AbortController());
    const emit = (state, extra = {}) => { if (!ctl.signal.aborted) onState({ state, ...extra }); };

    if (!isOnline()) { emit(STATES.OFFLINE); return; }

    let shownAt = null;
    const showTimer = setTimeout(() => { shownAt = now(); emit(STATES.LOADING); }, showDelay);

    let outcome;
    for (let n = 0; ; n++) {
      try {
        outcome = { data: await attempt(ctl.signal) };
        break;
      } catch (error) {
        if (ctl.signal.aborted) { clearTimeout(showTimer); return; }
        const kind = error instanceof RequestError ? error.kind : 'network';
        if (kind === 'not-found' || n >= retries) { outcome = { error, kind }; break; }
        try { await wait(retryDelay * 2 ** n, ctl.signal); } catch { clearTimeout(showTimer); return; }
      }
    }
    clearTimeout(showTimer);

    if (shownAt !== null) {
      const left = minVisible - (now() - shownAt);
      if (left > 0) { try { await wait(left, ctl.signal); } catch { return; } }
    }

    if (outcome.error) {
      if (outcome.kind === 'not-found') emit(STATES.NOT_FOUND, { error: outcome.error });
      else if (!isOnline()) emit(STATES.OFFLINE, { error: outcome.error });
      else emit(STATES.ERROR, { error: outcome.error, code: outcome.error.code });
    } else {
      emit(isEmpty(outcome.data) ? STATES.EMPTY : STATES.SUCCESS, { data: outcome.data });
    }
  }

  return {
    run,
    cancel: () => controller?.abort(new DOMException('Cancelled', 'AbortError'))
  };
}
