// Runs the on-device voice model off the main thread. The engine and the model download once,
// then the browser keeps them (the engine in the app's cache, the model in "transformers-cache").
const ENGINE = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';
const loading = new Map();

// Hausa and Pidgin are hosted on Lexiverse itself (/voices/...). The site answers unknown paths with
// the app page, so turn that into a plain "not found" for the optional files the engine asks about.
const SELF = 'https://huggingface.co/lexiverse/';
const realFetch = self.fetch.bind(self);
self.fetch = async (input, init) => {
  let url = typeof input === 'string' ? input : input.url;
  if (url.startsWith(SELF)) url = `${self.location.origin}/voices/${url.slice(SELF.length).replace('/resolve/main/', '/')}`;
  else return realFetch(input, init);
  const res = await realFetch(url, init);
  if ((res.headers.get('content-type') || '').includes('text/html')) return new Response('Not found', { status: 404 });
  return res;
};

function load(model) {
  if (!loading.has(model)) {
    loading.set(model, (async () => {
      const { pipeline, env } = await import(/* @vite-ignore */ ENGINE);
      if (env) env.allowLocalModels = false;
      const files = {};
      return pipeline('text-to-speech', model, {
        dtype: 'q8',
        progress_callback: (p) => {
          if (p.status !== 'progress' || !p.file) return;
          files[p.file] = { loaded: p.loaded || 0, total: p.total || 0 };
          const all = Object.values(files);
          self.postMessage({ type: 'progress', model, loaded: all.reduce((a, f) => a + f.loaded, 0), total: all.reduce((a, f) => a + f.total, 0) });
        }
      });
    })().catch((err) => { loading.delete(model); throw err; }));
  }
  return loading.get(model);
}

self.onmessage = async ({ data }) => {
  const { id, type, model, text } = data;
  try {
    const tts = await load(model);
    if (type === 'load') return self.postMessage({ id, type: 'done' });
    const out = await tts(text);
    self.postMessage({ id, type: 'done', audio: out.audio, rate: out.sampling_rate }, [out.audio.buffer]);
  } catch (err) {
    self.postMessage({ id, type: 'error', message: String(err?.message || err) });
  }
};
