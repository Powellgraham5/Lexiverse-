import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { BackIcon, SpeakerIcon } from '../../app/icons.jsx';
import { Placeholder } from '../../components/Placeholder.jsx';
import { loadDaily } from '../../lib/daily.js';
import { speak } from '../../lib/speech.js';

// Stand-in until the full word page lands in build phase 2.
export default function WordSoon() {
  const { params } = useRoute();
  const word = decodeURIComponent(params.word || '').toLowerCase();
  usePage(word);
  const [settings] = useSettings();
  const [entry, setEntry] = useState(null);
  useEffect(() => { loadDaily().then((ws) => setEntry(ws.find((w) => w.w === word) || null)).catch(() => {}); }, [word]);
  return (
    <>
      <a class="lx-btn secondary small" href="/search" style={{ alignSelf: 'flex-start' }} onClick={(e) => { if (history.length > 1) { e.preventDefault(); history.back(); } }}>
        <BackIcon size={20} />Back
      </a>
      <Placeholder title={word} phase={2}>
        {entry ? entry.def : 'Meanings, sounds, examples and related words for this word.'}
      </Placeholder>
      <button type="button" class="lx-btn secondary" onClick={() => speak(word, { accent: settings.accent, rate: settings.speechRate })}>
        <SpeakerIcon size={20} />Hear it
      </button>
    </>
  );
}
