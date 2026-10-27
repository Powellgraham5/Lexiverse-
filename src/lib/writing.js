// Automatic writing checks for the path writing tasks. Free and on the device, so they can only
// look at shape (length, paragraphs, linking words, greetings), never judge ideas. The UI says so.

const LINKERS = ['however', 'therefore', 'firstly', 'secondly', 'finally', 'moreover', 'furthermore', 'in addition', 'also',
  'because', 'although', 'for example', 'for instance', 'in conclusion', 'as a result', 'on the other hand', 'consequently',
  'in summary', 'besides', 'meanwhile', 'then', 'next', 'lastly', 'while', 'whereas', 'since', 'yet', 'in short', 'over time'];
const COMMON = new Set(('the a an and or but of to in on at for with is are was were be been it this that these those i you he she we they my your ' +
  'our their his her its as by from not no so if do does did have has had will would can could should shall may might must me us them').split(' '));
const GREETING = /^(dear|hi|hello|good (morning|afternoon|evening))\b/im;
const CLOSING = /\b(yours (faithfully|sincerely|truly)|best regards|kind regards|warm regards|regards|best wishes|thank you|thanks|cheers|your (loving|dear) \w+)\b[,.!]?\s*\n*\s*\S*/i;
// Not "'s" in general: "the school's library" is a possessive, not a contraction.
const CONTRACTION = /\b(\w+n['’]t|\w+['’](re|ve|ll|d|m)|(it|that|there|he|she|what|who|let)['’]s)\b/i;

export const words = (text) => (text.match(/[A-Za-z][A-Za-z'-]*/g) || []);
export const paragraphs = (text) => text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => words(p).length >= 3);
const sentences = (text) => text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);

// kind: 'essay' | 'letter-formal' | 'letter-informal' | 'email' | 'email-formal' | 'paragraph'
// q (the task) is optional: its own words are the topic, so repeating them is not flagged.
export function checkWriting(text, { minWords = 0, maxWords = Infinity, kind = 'paragraph', minParagraphs, subject = false, q = '' } = {}) {
  const out = [];
  const w = words(text);
  const n = w.length;
  const lower = text.toLowerCase();

  if (n < minWords) out.push({ ok: false, label: `${n} words`, tip: `Aim for at least ${minWords} words. Add an example or explain your point further.` });
  else if (n > maxWords) out.push({ ok: false, label: `${n} words`, tip: `Try to stay under ${maxWords} words. Cut repeated ideas.` });
  else out.push({ ok: true, label: `${n} words`, tip: 'A good length.' });

  const needParas = minParagraphs ?? (kind === 'essay' ? 3 : kind.startsWith('letter') ? 3 : 0);
  if (needParas) {
    const p = paragraphs(text).length;
    out.push(p >= needParas
      ? { ok: true, label: `${p} paragraph${p === 1 ? '' : 's'}`, tip: 'Clear paragraphs make it easy to follow.' }
      : { ok: false, label: `${p} paragraph${p === 1 ? '' : 's'}`, tip: `Use at least ${needParas} paragraphs. Leave an empty line between them.` });
  }

  if (kind === 'essay' || kind.startsWith('letter') || kind === 'paragraph') {
    const used = LINKERS.filter((l) => new RegExp(`\\b${l}\\b`, 'i').test(lower));
    out.push(used.length >= 2
      ? { ok: true, label: 'Linking words', tip: `You used ${used.slice(0, 3).map((u) => `“${u}”`).join(', ')}.` }
      : { ok: false, label: 'Linking words', tip: 'Join your ideas with words like “however”, “therefore” or “for example”.' });
  }

  const long = sentences(text).filter((s) => words(s).length > 35);
  if (long.length) out.push({ ok: false, label: 'Long sentences', tip: `${long.length} sentence${long.length === 1 ? ' is' : 's are'} over 35 words. Split ${long.length === 1 ? 'it' : 'them'} in two.` });

  const counts = {};
  const topic = new Set(words(q).map((y) => y.toLowerCase()));
  for (const x of w.map((y) => y.toLowerCase())) if (!COMMON.has(x) && !topic.has(x) && x.length > 3) counts[x] = (counts[x] || 0) + 1;
  const repeated = Object.entries(counts).filter(([, c]) => c > 4).sort((a, b) => b[1] - a[1]);
  if (repeated.length) out.push({ ok: false, label: 'Repeated words', tip: `“${repeated[0][0]}” appears ${repeated[0][1]} times. Try a synonym.` });

  if (kind.startsWith('letter') || kind.startsWith('email')) {
    out.push(GREETING.test(text)
      ? { ok: true, label: 'Greeting', tip: 'You open with a greeting.' }
      : { ok: false, label: 'Greeting', tip: kind === 'letter-informal' ? 'Start with “Dear …” or “Hi …”.' : 'Start with a greeting such as “Dear Mr Bello,”.' });
    out.push(CLOSING.test(text)
      ? { ok: true, label: 'Closing', tip: 'You close politely.' }
      : { ok: false, label: 'Closing', tip: kind === 'letter-formal' ? 'End with “Yours faithfully,” (or “Yours sincerely,” if you named the person) and your name.' : 'End with a closing such as “Best regards,” and your name.' });
  }
  if (subject) {
    out.push(/^subject\s*:\s*\S+/im.test(text)
      ? { ok: true, label: 'Subject line', tip: 'Your subject line says what the email is about.' }
      : { ok: false, label: 'Subject line', tip: 'Add a first line like “Subject: Request for a meeting on Friday”.' });
  }
  if (kind === 'letter-formal' || kind === 'email-formal' || kind === 'essay') {
    const m = text.match(CONTRACTION);
    if (m) out.push({ ok: false, label: 'Formal style', tip: `Write words in full in formal writing: “${m[0]}” is too casual.` });
  }
  return out;
}
