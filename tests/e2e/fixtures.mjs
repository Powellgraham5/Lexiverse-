// Canned Datamuse answers so e2e runs are repeatable and never depend on the live API.
const d = (word, def, extra = {}) => ({ word, score: 1000, defs: [`n\t${def}`], ...extra });

const ROUTES = [
  [/sp=seren\*/, [d('serendipity', 'Luck in finding good things by chance'), d('serene', 'Calm and peaceful'), d('serenity', 'The state of being calm')]],
  [/sp=serendipity\*/, [d('serendipity', 'Luck in finding good things by chance'), d('serendipitous', 'Happening by happy chance')]],
  [/sp=serendipty\*/, []],
  [/sp=serendipty(&|$)/, [{ word: 'serendipity', score: 10 }]],
  [/sp=qwizzle/, []],
  [/sp=c%3Ft/, [d('cat', 'A small furry pet'), d('cot', "A baby's bed"), d('cut', 'To divide with a blade')]],
  [/ml=/, [d('bibliophile', 'A person who loves books'), d('bookworm', 'Someone who reads a lot'), d('reader', 'A person who reads')]],
  [/rel_rhy=bright/, [{ word: 'night', numSyllables: 1 }, { word: 'kite', numSyllables: 1 }, { word: 'delight', numSyllables: 2 }, { word: 'satellite', numSyllables: 3 }]],
  [/rel_nry=bright/, [{ word: 'life' }]],
  [/sp=fail/, 500]
];

export async function mockApis(context) {
  await context.route('https://api.datamuse.com/**', (route) => {
    const url = route.request().url();
    const hit = ROUTES.find(([re]) => re.test(url));
    const body = hit ? hit[1] : [];
    return body === 500 ? route.fulfill({ status: 500, body: 'error' }) : route.fulfill({ json: body });
  });
  // No real network for pronunciations either.
  await context.route('https://api.dictionaryapi.dev/**', (route) => route.abort());
}

export const PROFILE = { goal: 'e', level: 2, done: true, startedAt: 0 };
