// Builds src/content/banks/jamb/mathematics.js: JAMB-style Mathematics questions whose answers are
// computed here, so every answer and every distractor is arithmetically checked.
// Run: node scripts/build-jamb-maths.mjs
import { writeFileSync } from 'node:fs';

let seed = 20261121;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (xs) => xs[int(0, xs.length - 1)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const frac = (n, d) => { const g = gcd(n, d); n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? `${n}` : `${n}/${d}`; };
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const xp = (n) => (n === 0 ? '' : n === 1 ? 'x' : `x${sup(n)}`);
const par = (v) => (v < 0 ? `(${v})` : `${v}`);
const fmt = (x) => (Number.isInteger(x) ? `${x}` : `${Math.round(x * 100) / 100}`);

const out = [];
// Adds a question if its four options are distinct and the answer is first.
function add(topic, q, answer, wrong, why) {
  const opts = [answer, ...wrong].map(String);
  if (new Set(opts).size !== 4 || out.some((x) => x.q === q)) return false;
  out.push({ topic, q, options: opts, why });
  return true;
}
function many(n, fn) { let made = 0, tries = 0; while (made < n && tries++ < n * 20) if (fn()) made++; }

// Number bases
many(8, () => {
  const n = int(9, 60), b = pick([2, 3, 5, 8]);
  const s = n.toString(b);
  return add('Number bases', `Convert ${n} (base ten) to base ${b}.`, `${s}₍${b}₎`, [(n + 1).toString(b), (n - 1).toString(b), n.toString(b === 2 ? 3 : 2)].map((x, i) => `${x}₍${i === 2 ? (b === 2 ? 3 : 2) : b}₎`),
    `Divide ${n} repeatedly by ${b} and read the remainders upwards: ${s}.`);
});
many(6, () => {
  const b = pick([2, 5, 8]), n = int(10, 80), s = n.toString(b);
  return add('Number bases', `Convert ${s}₍${b}₎ to base ten.`, n, [n + b, n - 1, parseInt(s, 10)], `Multiply each digit by its place value in base ${b} and add: ${n}.`);
});
// Fractions and decimals
many(8, () => {
  const a = int(1, 5), b = int(2, 9), c = int(1, 5), d = int(2, 9);
  if (a >= b || c >= d || b === d) return false;
  const ans = frac(a * d + c * b, b * d);
  return add('Fractions', `Simplify ${a}/${b} + ${c}/${d}.`, ans, [frac(a + c, b + d), frac(a * c, b * d), frac(a * d + c * b + d, b * d)],
    `Use the common denominator ${b * d}: (${a * d} + ${c * b})/${b * d} = ${ans}.`);
});
many(5, () => {
  const a = int(1, 7), b = int(2, 9), c = int(1, 7), d = int(2, 9);
  if (a >= b || c >= d) return false;
  const ans = frac(a * d, b * c);
  return add('Fractions', `Evaluate ${a}/${b} ÷ ${c}/${d}.`, ans, [frac(a * c, b * d), frac(b * c, a * d), frac(a + d, b + c)], `Dividing by a fraction is multiplying by its reciprocal: ${a}/${b} × ${d}/${c} = ${ans}.`);
});
// Indices
many(8, () => {
  const b = pick([2, 3, 5]), m = int(2, 6), n = int(1, 4);
  return add('Indices', `Simplify ${b}${sup(m)} × ${b}${sup(n)} ÷ ${b}${sup(n + 1)}.`, `${b}${sup(m - 1)}`, [`${b}${sup(m + 2 * n + 1)}`, `${b}${sup(m)}`, `${b}${sup(m * n)}`], `Add the powers when multiplying and subtract when dividing: ${m} + ${n} − ${n + 1} = ${m - 1}.`);
});
many(6, () => {
  const [base, root, pow] = pick([[8, 3, 2], [27, 3, 2], [16, 4, 3], [32, 5, 2], [125, 3, 2], [64, 3, 2], [81, 4, 3]]);
  const ans = Math.round(Math.pow(base, pow / root));
  return add('Indices', `Evaluate ${base}^(${pow}/${root}).`, ans, [Math.round(base * pow / root), Math.round(Math.pow(base, 1 / root)), ans * 2], `Take the ${root === 3 ? 'cube' : `${root}th`} root first, then raise to the power ${pow}: ${ans}.`);
});
many(4, () => {
  const b = pick([2, 3, 4, 5, 10]), n = int(1, 3);
  return add('Indices', `Evaluate ${b}${sup('-' + n)}.`, `1/${b ** n}`, [`−${b ** n}`, `${b ** n}`, `−1/${b ** n}`], `A negative power means the reciprocal: 1/${b}${sup(n)} = 1/${b ** n}.`);
});
// Logarithms
many(8, () => {
  const b = pick([2, 3, 5, 10]), n = int(2, 4), v = b ** n;
  return add('Logarithms', `Evaluate log${b === 10 ? '₁₀' : `₍${b}₎`} ${v}.`, n, [v / b, n + 1, b * n], `${b}${sup(n)} = ${v}, so the logarithm is ${n}.`);
});
many(5, () => {
  const a = pick([2, 4, 5, 20, 25]), b = 100 / a;
  if (!Number.isInteger(b)) return false;
  return add('Logarithms', `Simplify log₁₀ ${a} + log₁₀ ${b}.`, 2, [`log₁₀ ${a + b}`, 1, 10], `log a + log b = log ab = log₁₀ 100 = 2.`);
});
// Percentages and interest
many(8, () => {
  const p = pick([10, 15, 20, 25, 30, 40]), price = int(4, 40) * 500;
  const ans = price * (100 - p) / 100;
  return add('Percentages', `A shirt costs ₦${price}. It is sold at a discount of ${p}%. Find the selling price.`, `₦${ans}`, [`₦${price * p / 100}`, `₦${price + price * p / 100}`, `₦${price - p}`], `${p}% of ₦${price} is ₦${price * p / 100}; ₦${price} − ₦${price * p / 100} = ₦${ans}.`);
});
many(8, () => {
  const P = int(2, 20) * 1000, R = pick([5, 8, 10, 12, 15]), T = int(2, 5);
  const I = P * R * T / 100;
  return add('Simple interest', `Find the simple interest on ₦${P} at ${R}% per annum for ${T} years.`, `₦${I}`, [`₦${I / T}`, `₦${P + I}`, `₦${P * R / 10}`], `I = PRT/100 = ${P} × ${R} × ${T} ÷ 100 = ₦${I}.`);
});
many(5, () => {
  const cost = int(4, 30) * 100, p = pick([10, 20, 25, 50]);
  const sp = cost * (100 + p) / 100;
  return add('Profit and loss', `A trader buys an item for ₦${cost} and sells it for ₦${sp}. Find the profit per cent.`, `${p}%`, [`${Math.round((sp - cost) / sp * 100)}%`, `${p / 2}%`, `${p + 10}%`], `Profit = ₦${sp - cost}; (${sp - cost}/${cost}) × 100 = ${p}%.`);
});
// Ratio
many(6, () => {
  const a = int(1, 5), b = int(1, 5), k = int(100, 900);
  if (a === b) return false;
  const total = (a + b) * k;
  return add('Ratio', `Share ₦${total} between Ade and Bola in the ratio ${a}:${b}. How much does Ade get?`, `₦${a * k}`, [`₦${b * k}`, `₦${total / 2}`, `₦${a * total / b}`].map(String).map((s) => s.includes('.') ? `₦${Math.round(a * total / b)}` : s), `Ade gets ${a}/${a + b} of ₦${total} = ₦${a * k}.`);
});
// Linear equations
many(10, () => {
  const a = int(2, 9), x = int(-6, 9), b = int(-10, 12), c = a * x + b;
  if (b === 0) return false;
  return add('Linear equations', `Solve ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}.`, `x = ${x}`, [`x = ${x + 1}`, `x = ${-x || 2}`, `x = ${x - 1}`], `${a}x = ${c} ${b < 0 ? '+' : '−'} ${Math.abs(b)} = ${a * x}, so x = ${x}.`);
});
// Simultaneous equations
many(6, () => {
  const x = int(-3, 6), y = int(-3, 6), a = int(1, 4), b = int(1, 4);
  if (a === b) return false;
  const e1 = x + y, e2 = a * x - b * y;
  return add('Simultaneous equations', `Solve: x + y = ${e1} and ${a}x − ${b}y = ${e2}.`, `x = ${x}, y = ${y}`, [`x = ${y}, y = ${x}`, `x = ${x + 1}, y = ${y - 1}`, `x = ${-x}, y = ${e1 + x}`], `From the first equation y = ${e1} − x. Substituting gives x = ${x}, so y = ${y}.`);
});
// Quadratic equations
many(10, () => {
  const p = int(-6, 7), q = int(-6, 7);
  if (p === q || p === 0 || q === 0 || p === -q) return false;
  const s = p + q, pr = p * q;
  const sign = (v) => (v < 0 ? `− ${-v}` : `+ ${v}`);
  return add('Quadratic equations', `Solve x² ${sign(-s)}x ${sign(pr)} = 0.`, `x = ${Math.min(p, q)} or ${Math.max(p, q)}`, [`x = ${-Math.max(p, q)} or ${-Math.min(p, q)}`, `x = ${pr} or ${s}`, `x = ${Math.min(p, q) + 1} or ${Math.max(p, q) + 1}`], `Factorise: (x ${sign(-p)})(x ${sign(-q)}) = 0, so x = ${p} or ${q}.`);
});
// Sequences
many(8, () => {
  const a = int(-5, 10), d = int(2, 7), n = int(8, 20);
  const t = a + (n - 1) * d;
  return add('Sequences and series', `Find the ${n}th term of the arithmetic progression ${a}, ${a + d}, ${a + 2 * d}, …`, t, [a + n * d, t - a, a * n + d], `Tn = a + (n − 1)d = ${a} + ${n - 1} × ${d} = ${t}.`);
});
many(5, () => {
  const a = int(1, 4), r = pick([2, 3]), n = int(4, 6);
  const t = a * r ** (n - 1);
  return add('Sequences and series', `Find the ${n}th term of the geometric progression ${a}, ${a * r}, ${a * r * r}, …`, t, [a * r ** n, t / r * (r + 1), a * r * n], `Tn = arⁿ⁻¹ = ${a} × ${r}${sup(n - 1)} = ${t}.`);
});
many(5, () => {
  const a = int(1, 6), d = int(1, 5), n = int(6, 15);
  const S = n * (2 * a + (n - 1) * d) / 2;
  return add('Sequences and series', `Find the sum of the first ${n} terms of the AP ${a}, ${a + d}, ${a + 2 * d}, …`, S, [S + n, n * (a + (n - 1) * d), S - a], `Sn = n/2 [2a + (n − 1)d] = ${n}/2 × ${2 * a + (n - 1) * d} = ${S}.`);
});
// Sets
many(5, () => {
  const A = int(15, 30), B = int(10, 25), both = int(3, 9), total = A + B - both;
  return add('Sets', `In a class, ${A} students offer Physics, ${B} offer Chemistry and ${both} offer both. Every student offers at least one. How many students are in the class?`, total, [A + B, total - both, A + B + both], `n(P ∪ C) = ${A} + ${B} − ${both} = ${total}.`);
});
// Variation
many(5, () => {
  const k = int(2, 6), x1 = int(2, 5), x2 = int(6, 10);
  return add('Variation', `y varies directly as x. If y = ${k * x1} when x = ${x1}, find y when x = ${x2}.`, k * x2, [k * x2 + k, x2 * x1, Math.round(k * x1 * x1 / x2)], `y = kx with k = ${k}, so y = ${k} × ${x2} = ${k * x2}.`);
});
many(4, () => {
  const k = pick([12, 24, 36, 48, 60]), x1 = pick([2, 3, 4]), x2 = pick([6, 12]);
  return add('Variation', `y varies inversely as x. If y = ${k / x1} when x = ${x1}, find y when x = ${x2}.`, k / x2, [k / x1 * x2, k / x1 + x2, k], `y = k/x with k = ${k}, so y = ${k}/${x2} = ${k / x2}.`);
});
// Mensuration (π = 22/7)
many(6, () => {
  const r = pick([7, 14, 21, 3.5]);
  const A = 22 / 7 * r * r;
  return add('Mensuration', `Find the area of a circle of radius ${r} cm. (Take π = 22/7.)`, `${fmt(A)} cm²`, [`${fmt(2 * 22 / 7 * r)} cm²`, `${fmt(22 / 7 * 2 * r * 2 * r)} cm²`, `${fmt(A / 2)} cm²`], `A = πr² = 22/7 × ${r} × ${r} = ${fmt(A)} cm².`);
});
many(5, () => {
  const r = pick([7, 14, 3.5]), h = int(5, 20);
  const V = 22 / 7 * r * r * h;
  return add('Mensuration', `Find the volume of a cylinder of radius ${r} cm and height ${h} cm. (Take π = 22/7.)`, `${fmt(V)} cm³`, [`${fmt(2 * 22 / 7 * r * h)} cm³`, `${fmt(V / 3)} cm³`, `${fmt(22 / 7 * r * h)} cm³`], `V = πr²h = 22/7 × ${r}² × ${h} = ${fmt(V)} cm³.`);
});
many(5, () => {
  const b = int(4, 20), h = int(3, 15);
  return add('Mensuration', `Find the area of a triangle with base ${b} cm and height ${h} cm.`, `${fmt(b * h / 2)} cm²`, [`${b * h} cm²`, `${b + h} cm²`, `${2 * (b + h)} cm²`], `Area = ½ × base × height = ½ × ${b} × ${h} = ${fmt(b * h / 2)} cm².`);
});
// Geometry
many(6, () => {
  const n = pick([5, 6, 8, 9, 10, 12]);
  return add('Angles and polygons', `Find the size of each interior angle of a regular polygon with ${n} sides.`, `${fmt((n - 2) * 180 / n)}°`, [`${fmt(360 / n)}°`, `${(n - 2) * 180}°`, `${fmt(180 - (n - 2) * 180 / n + 10)}°`], `Each interior angle = (n − 2) × 180° ÷ n = ${(n - 2) * 180}° ÷ ${n} = ${fmt((n - 2) * 180 / n)}°.`);
});
many(4, () => {
  const n = pick([5, 6, 7, 8, 9, 10]);
  return add('Angles and polygons', `Find the sum of the interior angles of a polygon with ${n} sides.`, `${(n - 2) * 180}°`, [`${n * 180}°`, `${(n - 1) * 180}°`, '360°'], `Sum = (n − 2) × 180° = ${(n - 2) * 180}°.`);
});
many(5, () => {
  const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
  return add('Pythagoras', `A right-angled triangle has shorter sides ${a} cm and ${b} cm. Find the hypotenuse.`, `${c} cm`, [`${a + b} cm`, `${c + 1} cm`, `${Math.abs(b - a) + 1} cm`], `c² = ${a}² + ${b}² = ${a * a + b * b}, so c = ${c} cm.`);
});
// Statistics
many(8, () => {
  const xs = Array.from({ length: 5 }, () => int(2, 20));
  const sum = xs.reduce((s, v) => s + v, 0);
  if (sum % 5) return false;
  const sorted = [...xs].sort((a, b) => a - b);
  return add('Statistics', `Find the mean of ${xs.join(', ')}.`, sum / 5, [sorted[2] === sum / 5 ? sorted[2] + 1 : sorted[2], sum, sorted[4] - sorted[0] === sum / 5 ? sum / 5 + 2 : sorted[4] - sorted[0]], `Mean = ${sum} ÷ 5 = ${sum / 5}.`);
});
many(6, () => {
  const xs = Array.from({ length: 7 }, () => int(1, 30));
  const sorted = [...xs].sort((a, b) => a - b);
  const mean = Math.round(xs.reduce((s, v) => s + v, 0) / 7);
  return add('Statistics', `Find the median of ${xs.join(', ')}.`, sorted[3], [xs[3], sorted[2], mean], `Arrange in order: ${sorted.join(', ')}. The middle value is ${sorted[3]}.`);
});
many(5, () => {
  const m = int(2, 9), xs = [m, int(1, 9), m, int(1, 9), m, int(1, 9)];
  const counts = xs.reduce((c, v) => ({ ...c, [v]: (c[v] || 0) + 1 }), {});
  if (Object.values(counts).filter((v) => v >= 3).length !== 1) return false;
  const sorted = [...xs].sort((a, b) => a - b);
  return add('Statistics', `Find the mode of ${xs.join(', ')}.`, m, [sorted[0] === m ? sorted[5] : sorted[0], xs.length, Math.max(...xs) - Math.min(...xs) === m ? m + 1 : Math.max(...xs) - Math.min(...xs)], `${m} appears most often.`);
});
many(4, () => {
  const xs = Array.from({ length: 6 }, () => int(5, 60));
  const r = Math.max(...xs) - Math.min(...xs);
  return add('Statistics', `Find the range of ${xs.join(', ')}.`, r, [Math.max(...xs), r + 5, Math.min(...xs)], `Range = highest − lowest = ${Math.max(...xs)} − ${Math.min(...xs)} = ${r}.`);
});
// Probability
many(8, () => {
  const r = int(2, 8), b = int(2, 8), g = int(1, 6), t = r + b + g;
  return add('Probability', `A bag has ${r} red, ${b} blue and ${g} green balls. One ball is picked at random. What is the probability that it is blue?`, frac(b, t), [frac(r, t), frac(b, r + g), frac(1, 3)], `P(blue) = ${b}/${t}${frac(b, t) !== `${b}/${t}` ? ` = ${frac(b, t)}` : ''}.`);
});
many(4, () => {
  const n = pick([2, 3, 4, 5, 6]);
  return add('Probability', `A fair die is thrown once. What is the probability of getting a number greater than ${n}?`, frac(6 - n, 6), [frac(n, 6), frac(1, 6), frac(6 - n + 1, 6)], `${6 - n} of the 6 outcomes are greater than ${n}: ${frac(6 - n, 6)}.`);
});
// Coordinate geometry
many(6, () => {
  const x1 = int(-5, 5), y1 = int(-5, 5), x2 = int(-5, 6), y2 = int(-5, 8);
  if (x1 === x2) return false;
  const m = frac(y2 - y1, x2 - x1);
  return add('Coordinate geometry', `Find the gradient of the line joining (${x1}, ${y1}) and (${x2}, ${y2}).`, m, [frac(x2 - x1, y2 - y1 || 1), frac(-(y2 - y1), x2 - x1), frac(y2 + y1, x2 + x1 || 1)], `m = (${y2} − ${par(y1)}) ÷ (${x2} − ${par(x1)}) = ${m}.`);
});
many(5, () => {
  const x1 = int(-6, 6) * 2, y1 = int(-6, 6) * 2, x2 = int(-6, 6) * 2, y2 = int(-6, 6) * 2;
  return add('Coordinate geometry', `Find the midpoint of (${x1}, ${y1}) and (${x2}, ${y2}).`, `(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`, [`(${x1 + x2}, ${y1 + y2})`, `(${(x2 - x1) / 2}, ${(y2 - y1) / 2})`, `(${(y1 + y2) / 2}, ${(x1 + x2) / 2})`], `Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2).`);
});
// Trigonometry
for (const [f, a, v, w] of [['sin', 30, '1/2', ['√3/2', '1', '√2/2']], ['cos', 60, '1/2', ['√3/2', '0', '1']], ['tan', 45, '1', ['0', '√3', '1/2']], ['sin', 60, '√3/2', ['1/2', '√2/2', '1']], ['cos', 30, '√3/2', ['1/2', '√3', '0']], ['tan', 60, '√3', ['1/√3', '1', '√3/2']], ['sin', 90, '1', ['0', '1/2', '√3/2']], ['cos', 90, '0', ['1', '1/2', '−1']]]) {
  add('Trigonometry', `Find the exact value of ${f} ${a}°.`, v, w, `${f} ${a}° = ${v}, from the special-angle triangles.`);
}
// Calculus
many(8, () => {
  const a = int(2, 6), n = int(2, 5), b = int(1, 9), c = int(1, 9);
  return add('Calculus', `Differentiate y = ${a}${xp(n)} + ${b}x + ${c} with respect to x.`, `${a * n}${xp(n - 1)} + ${b}`, [`${a}${xp(n - 1)} + ${b}`, `${a * n}${xp(n - 1)} + ${b + c}`, `${a * n}${xp(n + 1)} + ${b}`], `d/dx (axⁿ) = naxⁿ⁻¹, the derivative of ${b}x is ${b}, and a constant gives 0.`);
});
many(4, () => {
  const a = int(1, 4), b = int(1, 6);
  return add('Calculus', `Find the gradient of the curve y = ${a}x² + ${b}x at x = 2.`, 4 * a + b, [4 * a + 2 * b, 2 * a + b, 8 * a + b], `dy/dx = ${2 * a}x + ${b}; at x = 2 this is ${4 * a + b}.`);
});

const topics = [...new Set(out.map((x) => x.topic))];
const qs = out.map((x, i) => ({ id: `ma${i + 1}`, ...x, answer: 0 }));
const body = `// JAMB-style practice questions: Mathematics. Generated by scripts/build-jamb-maths.mjs, which computes
// every answer and distractor. Written for Lexiverse, not official past questions. Do not edit by hand.
export default ${JSON.stringify({ subject: 'mathematics', title: 'Mathematics', topics, questions: qs }, null, 1)};
`;
writeFileSync(new URL('../src/content/banks/jamb/mathematics.js', import.meta.url), body);
console.log(`${qs.length} questions in ${topics.length} topics`);
