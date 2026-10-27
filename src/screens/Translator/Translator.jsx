import { useEffect, useRef, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SwapIcon, SpeakerIcon, CopyIcon, MicIcon, CloseIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { LanguagePicker } from '../../components/LanguagePicker.jsx';
import { toast } from '../../components/toast.jsx';
import { translate, loadPhrasebook, MAX_CHARS } from '../../lib/translate.js';
import { byCode, hasVoice } from '../../lib/languages.js';
import { speak, canListen, listenOnce } from '../../lib/speech.js';
import './translator.css';

const ERRORS = {
  'TR-429': ["Today's free translations are used up", 'The free translator has a daily limit. Phrasebook phrases still work, and it resets tomorrow.'],
  'TR-404': ['Only phrasebook phrases for now', 'There is no free machine translation for this language yet. Try one of the quick phrases.'],
  'TR-503': ["Couldn't reach the translator", 'Check your connection and try again. Your text is kept.']
};

export default function Translator() {
  usePage('Translator');
  const [settings, setSettings] = useSettings();
  const [from, setFrom] = useState('en');
  const [to, setTo] = useState(settings.translateTo || 'yo');
  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState('');
  const [picker, setPicker] = useState(null);
  const [book, setBook] = useState(null);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const stopRef = useRef(null);
  const cancelled = useRef(false);

  useEffect(() => { loadPhrasebook().then(setBook).catch(() => {}); }, []);
  useEffect(() => { const t = setTimeout(() => setDebounced(text), 600); return () => clearTimeout(t); }, [text]);

  const q = debounced.trim();
  // Each result remembers what it translated, so an old answer is never shown under new languages.
  const key = `${from}|${to}|${q}`;
  const [req, retry] = useRequest(q ? (signal) => translate(q, from, to, { signal, book }).then((r) => r && { ...r, key }) : null, [q, from, to, book],
    { isOnline: () => true, isEmpty: (d) => !d });
  const current = req.state === 'success' && req.data.key === key;
  const pending = q && !current && req.state !== 'error' && req.state !== 'not-found';
  const toMeta = byCode(to);
  const fromMeta = byCode(from);

  function pick(code) {
    if (picker === 'to') { setTo(code); setSettings({ translateTo: code }); } else setFrom(code);
    setPicker(null);
  }
  function swap() {
    const out = current ? req.data.text : '';
    setFrom(to); setTo(from); setText(out); setDebounced(out);
  }
  async function voice() {
    setListening(true); setHeard(''); cancelled.current = false;
    const { result, stop } = listenOnce({ lang: fromMeta.speech || (from === 'en' ? 'en-US' : from), onInterim: setHeard });
    stopRef.current = stop;
    const said = await result;
    setListening(false);
    if (said && !cancelled.current) { setText(said); setDebounced(said); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(req.data.text); toast({ text: 'Copied', kind: 'success' }); } catch { toast({ text: "Couldn't copy", kind: 'error' }); }
  }
  const phrases = (book?.phrases || []).filter((p) => p.t[to]).slice(0, 12);

  if (listening) {
    return (
      <div class="tr-listen">
        <h1 class="lx-page-title">Translator</h1>
        <div role="status" aria-live="polite" class="tr-listen-body">
          <span class="tr-mic-big" aria-hidden="true"><span class="tr-ripple" /><MicIcon size={44} /></span>
          <span class="tr-wave" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}</span>
          <b>Listening…</b>
          <span class="tr-heard">{heard ? `“${heard}”` : `Speak in ${fromMeta.name}`}</span>
        </div>
        <button type="button" class="lx-btn" onClick={() => stopRef.current?.()}>Done</button>
        <button type="button" class="lx-btn ghost" onClick={() => { cancelled.current = true; stopRef.current?.(); }}>Cancel</button>
      </div>
    );
  }

  return (
    <>
      <h1 class="lx-rise lx-page-title">Translator</h1>
      <div class="tr-langs lx-rise lx-d1">
        <button type="button" class="tr-lang" aria-haspopup="dialog" aria-label={`Translate from ${fromMeta.name}. Change`} onClick={() => setPicker('from')}>{fromMeta.name}</button>
        <button type="button" class="tr-swap" aria-label="Swap languages" onClick={swap}><SwapIcon /></button>
        <button type="button" class="tr-lang" aria-haspopup="dialog" aria-label={`Translate into ${toMeta.name}. Change`} onClick={() => setPicker('to')}>{toMeta.name}</button>
      </div>

      <form class="tr-input lx-card lx-rise lx-d2" onSubmit={(e) => { e.preventDefault(); setDebounced(text); }}>
        <label for="tr-text" class="tr-label">{fromMeta.name}</label>
        <textarea id="tr-text" rows="3" maxLength={MAX_CHARS} value={text} lang={from} dir={fromMeta.dir || 'ltr'}
          placeholder="Type a word or phrase" onInput={(e) => setText(e.currentTarget.value)} />
        <div class="tr-input-row">
          <span class="tr-count" aria-live="polite">{text.length} / {MAX_CHARS}</span>
          {text && <button type="button" class="tr-icon" aria-label="Clear text" onClick={() => { setText(''); setDebounced(''); }}><CloseIcon size={18} /></button>}
          {canListen() && <button type="button" class="tr-icon mic" aria-label={`Speak in ${fromMeta.name}`} onClick={voice}><MicIcon size={20} /></button>}
          <button type="submit" class="lx-btn small">Translate</button>
        </div>
      </form>

      {pending && (
        <div class="tr-result" aria-busy="true" role="status" aria-label={`Translating into ${toMeta.name}`}>
          <span class="tr-label">{toMeta.name} · translating…</span>
          <span class="tr-sk" style={{ width: '85%' }} /><span class="tr-sk" style={{ width: '55%' }} />
        </div>
      )}
      {(req.state === 'error' || req.state === 'not-found') && (
        <ErrorCard title={(ERRORS[req.code] || ERRORS['TR-503'])[0]} code={req.code || 'TR-503'} onRetry={req.code === 'TR-404' ? null : retry}>
          {(ERRORS[req.code] || ERRORS['TR-503'])[1]}
        </ErrorCard>
      )}
      {current && (
        <section class="tr-result lx-rise" aria-label={`${toMeta.name} translation`}>
          <span class="tr-label">{toMeta.name}</span>
          <p class="tr-out" lang={to} dir={toMeta.dir || 'ltr'}>{req.data.text}</p>
          <div class="tr-actions">
            {hasVoice(to)
              ? <button type="button" class="tr-chip" onClick={() => speak(req.data.text, { lang: toMeta.speech || to, rate: settings.speechRate })}><SpeakerIcon size={18} />Listen</button>
              : <button type="button" class="tr-chip dashed" disabled aria-describedby="tr-novoice"><SpeakerIcon size={18} />No voice</button>}
            <button type="button" class="tr-chip light" onClick={copy}><CopyIcon size={18} />Copy</button>
          </div>
          {!hasVoice(to) && <p id="tr-novoice" class="tr-note">Your device has no {toMeta.name} voice. Add one in your device's speech settings to hear it.</p>}
          {!req.data.reviewed && <p class="tr-note">{req.data.source === 'phrasebook' ? 'Phrasebook' : 'Sample translation'} · to be checked by a native speaker</p>}
        </section>
      )}

      {from === 'en' && phrases.length > 0 && (
        <section class="tr-phrases" aria-labelledby="tr-qp">
          <h2 id="tr-qp">Quick phrases</h2>
          <p class="tr-sub">Work offline</p>
          <ul>
            {phrases.map((p) => (
              <li key={p.id}><button type="button" class="lx-chip" onClick={() => { setText(p.en); setDebounced(p.en); }}>{p.en}</button></li>
            ))}
          </ul>
        </section>
      )}

      <LanguagePicker open={picker !== null} value={picker === 'from' ? from : to} title={picker === 'from' ? 'Translate from' : 'Translate into'}
        onClose={() => setPicker(null)} onPick={pick} />
    </>
  );
}
