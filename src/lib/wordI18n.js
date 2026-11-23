// Reading a word page in a Nigerian language: the part-of-speech names and headings in that language.
// The English stays beside them, and everything is marked for a native speaker to check.

export const PAGE_LANGS = ['en', 'yo', 'ha', 'ig', 'pcm'];

// How many meanings are machine translated, to stay inside the free daily translation limit.
export const MAX_TRANSLATED = 4;

const POS = {
  yo: { noun: 'Orúkọ', verb: 'Ọ̀rọ̀-ìṣe', adjective: 'Ọ̀rọ̀-àpèjúwe', adverb: 'Ọ̀rọ̀-àpọ́nlé', pronoun: 'Ọ̀rọ̀-arọ́pò-orúkọ', preposition: 'Ọ̀rọ̀-atọ́kùn', conjunction: 'Ọ̀rọ̀-àsopọ̀', interjection: 'Ọ̀rọ̀-ìṣe-ìyanu' },
  ha: { noun: 'Suna', verb: 'Aikatau', adjective: 'Sifa', adverb: 'Bayanau', pronoun: 'Wakilin suna', preposition: 'Mafayyaci', conjunction: 'Mahaɗi', interjection: 'Motsin rai' },
  ig: { noun: 'Aha', verb: 'Ngwaa', adjective: 'Nkọwaaha', adverb: 'Nkwuwa', pronoun: 'Nnọchiaha', preposition: 'Mbuụzọ', conjunction: 'Njikọ', interjection: 'Mbubeokwu' }
};

const UI = {
  yo: { meanings: 'Ìtumọ̀', example: 'Àpẹẹrẹ' },
  ha: { meanings: "Ma'anoni", example: 'Misali' },
  ig: { meanings: 'Nkọwa', example: 'Ọmụmaatụ' }
};

// "Orúkọ" for a Yoruba noun; null when there is no label (the page then shows the English only).
export function posLabel(pos, lang) {
  return POS[lang]?.[String(pos || '').toLowerCase()] || null;
}

export function uiLabel(key, lang) {
  return UI[lang]?.[key] || null;
}

// Which meanings get translated: the first few, each with its definition and example.
export function textsToTranslate(meanings, max = MAX_TRANSLATED) {
  return meanings.slice(0, max).flatMap((m) => [m.def, ...(m.example ? [m.example] : [])]);
}
