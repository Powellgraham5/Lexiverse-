// Languages the translator offers. Nigerian languages are pinned first.
// `phrasebookOnly` languages have no free machine translation, only the offline phrasebook.
export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá', pinned: true },
  { code: 'ha', name: 'Hausa', native: 'Harshen Hausa', pinned: true },
  { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo', pinned: true },
  { code: 'pcm', name: 'Nigerian Pidgin', native: 'Naijá', pinned: true, phrasebookOnly: true, beta: true },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', native: '中文', speech: 'zh-CN' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ur', name: 'Urdu', native: 'اردو', dir: 'rtl' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu' }
];

export const byCode = (code) => LANGUAGES.find((l) => l.code === code);

const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

// Matches the English or native name ("sw" finds Swahili and Swedish; "yoruba" finds Èdè Yorùbá).
export function searchLanguages(query, list = LANGUAGES.filter((l) => l.code !== 'en')) {
  const q = fold(query.trim());
  if (!q) return list;
  return list.filter((l) => fold(l.name).includes(q) || fold(l.native).includes(q) || l.code === q);
}

// Whether this device can speak the language (needs speechSynthesis voices).
export function hasVoice(code, voices = (typeof speechSynthesis !== 'undefined' ? speechSynthesis.getVoices() : [])) {
  const want = (byCode(code)?.speech || code).toLowerCase();
  return voices.some((v) => v.lang.toLowerCase() === want || v.lang.toLowerCase().startsWith(want + '-'));
}
