// Turns English Wiktionary wikitext into learner-friendly origin text and syllables.
// Conservative by design: any template we can't render makes the whole origin null,
// so the app shows nothing rather than half-parsed markup.

const LANG = {
  en: 'English', enm: 'Middle English', ang: 'Old English', la: 'Latin', 'la-lat': 'Late Latin', 'la-med': 'Medieval Latin',
  'la-new': 'New Latin', LL: 'Late Latin', ML: 'Medieval Latin', NL: 'New Latin', grc: 'Ancient Greek', el: 'Greek',
  fr: 'French', fro: 'Old French', frm: 'Middle French', xno: 'Anglo-Norman', 'roa-onf': 'Old Northern French', it: 'Italian',
  es: 'Spanish', pt: 'Portuguese', de: 'German', gmh: 'Middle High German', goh: 'Old High German', nl: 'Dutch',
  dum: 'Middle Dutch', non: 'Old Norse', da: 'Danish', sv: 'Swedish', ar: 'Arabic', fa: 'Persian', sa: 'Sanskrit',
  hi: 'Hindi', tr: 'Turkish', ja: 'Japanese', zh: 'Chinese', yi: 'Yiddish', he: 'Hebrew', ru: 'Russian', pl: 'Polish',
  'gem-pro': 'Proto-Germanic', 'ine-pro': 'Proto-Indo-European', 'itc-pro': 'Proto-Italic', 'gmw-pro': 'Proto-West Germanic',
  yo: 'Yoruba', ha: 'Hausa', ig: 'Igbo', sw: 'Swahili', mul: 'Translingual'
};

// Splits a template body on top-level pipes into positional and named arguments.
function args(body) {
  const parts = [];
  let depth = 0, cur = '';
  for (let i = 0; i < body.length; i++) {
    const two = body.slice(i, i + 2);
    if (two === '{{' || two === '[[') { depth++; cur += two; i++; continue; }
    if (two === '}}' || two === ']]') { depth--; cur += two; i++; continue; }
    if (body[i] === '|' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += body[i];
  }
  parts.push(cur);
  const pos = [], named = {};
  for (const p of parts) {
    const m = p.match(/^\s*([a-z0-9]+)\s*=(.*)$/s);
    if (m) named[m[1]] = m[2].trim(); else pos.push(p.trim());
  }
  return { name: pos.shift(), pos, named };
}

const quote = (gloss) => (gloss ? ` (“${gloss}”)` : '');
const lang = (code) => LANG[code];

// Returns replacement text, '' to drop, or undefined when the template is unknown.
function render({ name, pos, named }) {
  const n = name.toLowerCase();
  if (/^(ety|root|rootsee|rfe|rfv|rfv-etym|rfv-sense|dercat|etydate|ref|refn|nb\.\.\.|senseid|attn|top|bottom|-|wp)$/.test(n)) return '';
  if (/^(inh\+?|der\+?|bor\+?|uder|ubor|lbor|slbor|obor|lbor|calque|cal|sl|semantic loan|psm|translit|learned borrowing|lbor\+?|inh-lite)$/.test(n)) {
    const l = lang(pos[1]); const word = pos[3] || pos[2];
    if (!l) return undefined;
    return word && word !== '-' ? `${l} ${word.replace(/^\*/, '*')}${quote(named.t || named.gloss || pos[4])}` : l;
  }
  if (/^(cog|ncog|noncog|cognate)$/.test(n)) { const l = lang(pos[0]); return l ? `${l} ${pos[2] || pos[1]}${quote(named.t || pos[3])}` : undefined; }
  if (/^(m|l|mention|link|ll|m\+)$/.test(n)) return `${pos[2] || pos[1]}${quote(named.t || named.gloss || pos[3])}`;
  if (n === 'etyl') return lang(pos[0]);
  if (n === 'suffix' || n === 'suf') return `${pos[1]} + -${pos[2].replace(/^-/, '')}`;
  if (n === 'prefix' || n === 'pre') return `${pos[1].replace(/-$/, '')}- + ${pos[2]}`;
  if (/^(affix|af|compound|com|confix|con|blend)$/.test(n)) return (n === 'blend' ? 'a blend of ' : '') + pos.slice(1).filter(Boolean).join(' + ');
  if (n === 'coin' || n === 'coinage') return `Coined by ${pos[1]}${named.in ? ` in ${named.in}` : ''}`;
  if (n === 'w' || n === 'pedia') return pos[1] || pos[0];
  if (n === 'doublet') return `Doublet of ${pos.slice(1).join(' and ')}`;
  if (n === 'clipping' || n === 'clip') return `Shortened from ${pos[1]}`;
  if (n === 'back-form' || n === 'back-formation' || n === 'bf') return `Back-formation from ${pos[1]}`;
  if (n === 'q' || n === 'qualifier' || n === 'i') return `(${pos.join(', ')})`;
  if (n === 'gloss') return `(“${pos[0]}”)`;
  return undefined;
}

export function englishSection(wikitext) {
  const start = wikitext.indexOf('==English==');
  if (start < 0) return '';
  const rest = wikitext.slice(start + 11);
  const end = rest.search(/\n==[^=]/);
  return end < 0 ? rest : rest.slice(0, end);
}

// First paragraph of the first Etymology section, as at most two plain sentences.
export function etymologyText(wikitext) {
  const en = englishSection(wikitext);
  const m = en.match(/===Etymology(?: \d+)?===\n([\s\S]*?)(?=\n=|$)/);
  if (!m) return null;
  let text = m[1].replace(/<!--[\s\S]*?-->/g, '').replace(/<ref[^>]*\/>/g, '').replace(/<ref[\s\S]*?<\/ref>/g, '').trim().split(/\n\s*\n/)[0];
  if (!text || /^\s*[*#:]/.test(text)) return null;
  // Render innermost templates first, until none are left.
  for (let guard = 0; text.includes('{{') && guard < 20; guard++) {
    let unknown = false;
    text = text.replace(/\{\{([^{}]*)\}\}/g, (_, body) => {
      let out;
      try { out = render(args(body)); } catch { out = undefined; } // malformed template: treat as unknown
      if (out === undefined) unknown = true;
      return out ?? '';
    });
    if (unknown) return null;
  }
  text = text
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'''?/g, '').replace(/<[^>]+>/g, '')
    .replace(/&#91;/g, '[').replace(/&#93;/g, ']').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').replace(/\s+([.,;:)])/g, '$1').replace(/\(\s*\)/g, '').trim();
  if (/[{}[\]|]|^From\s*\.?$/.test(text) || text.length < 15) return null;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  let out = '';
  for (const s of sentences) { if ((out + s).length > 280 && out) break; out += s; if (out.length > 140) break; }
  out = out.trim();
  return out.endsWith('.') || out.endsWith('”') ? out : out + '.';
}

// Syllables from {{hyphenation|en|ser|en|dip|i|ty}}; the first alternative only.
export function syllables(wikitext) {
  const en = englishSection(wikitext);
  const m = en.match(/\{\{(?:hyphenation|hyph)\|en\|([^}]*)\}\}/);
  if (!m) return null;
  const parts = [];
  for (const p of m[1].split('|')) {
    if (p === '' ) { if (parts.length) break; else continue; }
    if (p.includes('=')) continue;
    parts.push(p.trim());
  }
  return parts.length > 1 ? parts : null;
}
