import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { BackIcon, DownloadIcon, LinkIcon, ShareIcon } from '../../app/icons.jsx';
import { toast } from '../../components/toast.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { lookup } from '../../lib/dictionary.js';
import { loadDaily } from '../../lib/daily.js';
import { drawCard, shareImage, saveImage, wordLink } from '../../lib/share.js';
import './share.css';

const isDark = () => document.documentElement.dataset.theme === 'dark'
  || (document.documentElement.dataset.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);

export default function Share() {
  const { params } = useRoute();
  const word = decodeURIComponent(params.word || '').toLowerCase();
  usePage(`Share ${word}`);
  const canvas = useRef(null);
  const [img, setImg] = useState(null);
  const [req, retry] = useRequest(async (signal) => {
    const daily = await loadDaily().then((ws) => ws.find((w) => w.w === word) || null).catch(() => null);
    return lookup(word, { signal, daily });
  }, [word], { isOnline: () => true });

  const e = req.data;
  const m = e?.meanings[0];
  useEffect(() => {
    if (!e || !canvas.current) return;
    drawCard(canvas.current, { word, ipa: e.ipa, pos: m?.pos, def: m?.def || '', theme: isDark() ? 'dark' : 'light' })
      .then((c) => setImg(c.toDataURL('image/png')));
  }, [e]);

  async function copyLink() {
    try { await navigator.clipboard.writeText(wordLink(word)); toast({ text: 'Link copied', kind: 'success' }); } catch { toast({ text: "Couldn't copy the link", kind: 'error' }); }
  }
  async function share() {
    const r = await shareImage(canvas.current, word);
    if (r === 'downloaded') toast({ text: 'Image saved. Share it from your photos or files', kind: 'success' });
  }

  return (
    <>
      <div class="sh-top">
        <a class="wd-round light" href={`/word/${word}`} aria-label="Back to the word"><BackIcon /></a>
        <h1>Share a word</h1>
      </div>
      {req.state === 'error' && <ErrorCard title="Couldn't make the card" code={req.code || 'DICT-503'} onRetry={retry}>Check your connection and try again.</ErrorCard>}
      {req.state === 'not-found' && <ErrorCard title={`We couldn't find “${word}”`} code="DICT-404">There's no card for a word we don't know yet.</ErrorCard>}
      <canvas ref={canvas} hidden />
      {e && (
        <>
          <figure class="sh-card lx-rise">
            {img ? <img src={img} alt={`Card: Word I learned today, ${word}${e.ipa ? `, ${e.ipa}` : ''}${m ? `, ${m.pos}. ${m.def}` : ''}`} /> : <span class="lx-skeleton sh-sk" />}
          </figure>
          <div class="sh-actions lx-rise lx-d1">
            <button type="button" class="sh-act" onClick={() => saveImage(canvas.current, word)} disabled={!img}><DownloadIcon />Save image</button>
            <button type="button" class="sh-act" onClick={copyLink}><LinkIcon />Copy link</button>
            <button type="button" class="sh-act" onClick={share} disabled={!img}><ShareIcon />More apps</button>
          </div>
          <button type="button" class="lx-btn lx-rise lx-d2" onClick={share} disabled={!img}>Share</button>
        </>
      )}
    </>
  );
}
