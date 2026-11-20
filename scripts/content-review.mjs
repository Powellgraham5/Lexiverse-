// Rebuilds docs/CONTENT_REVIEW.md, the teacher's checklist for every lesson and writing format.
// Run: node scripts/content-review.mjs
import { writeFileSync } from 'node:fs';
import { PATHS, loadPath } from '../src/lib/paths.js';
import { FORMAT_GROUPS } from '../src/content/formats.js';

const out = ['# Learning path content review', '',
  'These lessons, practice questions and writing formats were written for Lexiverse. They are not official WAEC, NECO, IELTS, SAT or exam-board questions, and the app says so on every path.', '',
  'Please ask an English teacher to check each lesson. Tick the box when a lesson is correct, or write the fix next to it. Lesson files are in `src/content/paths/`; writing formats are in `src/content/formats.js`.', ''];
let lessons = 0;
for (const meta of PATHS.filter((p) => p.load)) {
  const path = await loadPath(meta.id);
  out.push(`## ${meta.title} (\`${meta.id}.js\`)`, '');
  for (const u of path.units) {
    out.push(`### ${u.title}`, '');
    for (const l of u.lessons) {
      lessons++;
      const types = [...new Set(l.exercises.map((x) => x.type))].join(', ');
      out.push(`- [ ] **${l.title}** (\`${l.id}\`): ${l.cards.length} teaching card${l.cards.length === 1 ? '' : 's'}, ${l.exercises.length} exercises (${types})`);
    }
    out.push('');
  }
}
out.push('## Writing formats (`formats.js`)', '');
for (const g of FORMAT_GROUPS) for (const f of g.formats) out.push(`- [ ] **${g.title}: ${f.title}**`);
writeFileSync(new URL('../docs/CONTENT_REVIEW.md', import.meta.url), out.join('\n') + '\n');
console.log(`${lessons} lessons written to docs/CONTENT_REVIEW.md`);
