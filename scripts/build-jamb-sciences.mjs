// Builds the JAMB-style Chemistry and Physics banks: hand-written concept questions plus calculation
// questions whose answers and distractors are computed here. Run: node scripts/build-jamb-sciences.mjs
import { writeFileSync } from 'node:fs';

let seed = 112026;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (xs) => xs[int(0, xs.length - 1)];
const fmt = (x) => (Number.isInteger(x) ? `${x}` : `${Math.round(x * 100) / 100}`);

function bank(prefix) {
  const out = [];
  const add = (topic, q, answer, wrong, why) => {
    const opts = [answer, ...wrong].map(String);
    if (new Set(opts).size !== 4 || out.some((x) => x.q === q)) return false;
    out.push({ topic, q, options: opts, why });
    return true;
  };
  const many = (n, fn) => { let made = 0, tries = 0; while (made < n && tries++ < n * 30) if (fn()) made++; };
  const done = () => out.map((x, i) => ({ id: `${prefix}${i + 1}`, ...x, answer: 0 }));
  return { add, many, done, out };
}

// ---------- Chemistry ----------
const C = bank('ch');
const CHEM = [
  ['Atomic structure', 'The particles found in the nucleus of an atom are', 'protons and neutrons', ['electrons and protons', 'electrons only', 'neutrons and electrons'], 'Protons and neutrons make up the nucleus; electrons move around it.'],
  ['Atomic structure', 'The atomic number of an element is the number of', 'protons in its nucleus', ['neutrons in its nucleus', 'protons plus neutrons', 'electron shells'], 'Atomic number = number of protons.'],
  ['Atomic structure', 'Atoms of the same element with different numbers of neutrons are', 'isotopes', ['isomers', 'allotropes', 'ions'], 'Isotopes have the same proton number but different mass numbers.'],
  ['Atomic structure', 'The electronic configuration of sodium (atomic number 11) is', '2, 8, 1', ['2, 9', '2, 8, 2', '2, 1, 8'], 'Shells fill 2, then 8, then the remaining electron.'],
  ['Atomic structure', 'An atom that has lost electrons becomes a', 'positive ion', ['negative ion', 'neutral atom', 'isotope'], 'Losing negative electrons leaves a positive charge.'],
  ['Atomic structure', 'Who proposed the planetary model of the atom with a dense nucleus?', 'Rutherford', ['Dalton', 'Thomson', 'Avogadro'], 'Rutherford’s gold foil experiment revealed the nucleus.'],
  ['Periodic table', 'Elements in the same group of the periodic table have the same number of', 'outer-shell electrons', ['protons', 'neutrons', 'shells'], 'Group number reflects the number of valence electrons.'],
  ['Periodic table', 'Group 1 elements are called', 'alkali metals', ['halogens', 'noble gases', 'transition metals'], 'Lithium, sodium and potassium are alkali metals.'],
  ['Periodic table', 'The halogens are in group', '7', ['1', '2', '0'], 'Fluorine, chlorine, bromine and iodine are in group 7 (17).'],
  ['Periodic table', 'The noble gases are unreactive because they have', 'a full outer shell', ['no electrons', 'many neutrons', 'a positive charge'], 'A stable outer shell means they rarely react.'],
  ['Periodic table', 'Across a period from left to right, atomic radius generally', 'decreases', ['increases', 'stays the same', 'doubles'], 'Increasing nuclear charge pulls electrons closer.'],
  ['Chemical bonding', 'Sodium chloride is held together by', 'ionic bonds', ['covalent bonds', 'metallic bonds', 'hydrogen bonds'], 'Electrons transfer from sodium to chlorine, forming ions.'],
  ['Chemical bonding', 'A bond formed by sharing a pair of electrons is', 'covalent', ['ionic', 'metallic', 'dative only'], 'Covalent bonds share electron pairs.'],
  ['Chemical bonding', 'Water has a high boiling point for its size because of', 'hydrogen bonding', ['ionic bonding', 'metallic bonding', 'its low mass'], 'Hydrogen bonds between molecules need extra energy to break.'],
  ['Chemical bonding', 'Diamond and graphite are', 'allotropes of carbon', ['isotopes of carbon', 'compounds of carbon', 'isomers'], 'Allotropes are different forms of the same element.'],
  ['States of matter', 'The change of a solid directly into a gas is', 'sublimation', ['evaporation', 'condensation', 'melting'], 'Iodine and naphthalene sublime.'],
  ['States of matter', 'According to Boyle’s law, at constant temperature the volume of a gas is', 'inversely proportional to its pressure', ['directly proportional to its pressure', 'independent of pressure', 'proportional to its mass'], 'PV = constant at fixed temperature.'],
  ['States of matter', 'Charles’s law relates the volume of a gas to its', 'temperature', ['pressure', 'mass', 'density only'], 'V ∝ T at constant pressure, with T in kelvin.'],
  ['States of matter', 'Gases diffuse faster when their molar mass is', 'lower', ['higher', 'the same', 'zero'], 'Graham’s law: rate is inversely proportional to the square root of molar mass.'],
  ['Separation', 'The best method to separate salt from salt solution is', 'evaporation', ['filtration', 'decantation', 'sublimation'], 'Evaporating the water leaves the salt.'],
  ['Separation', 'The colours in ink can be separated by', 'chromatography', ['distillation', 'filtration', 'magnetism'], 'Chromatography separates dyes by how far they travel.'],
  ['Separation', 'Ethanol can be separated from water by', 'fractional distillation', ['filtration', 'sieving', 'decantation'], 'They have different boiling points.'],
  ['Separation', 'Iron filings can be separated from sulphur using', 'a magnet', ['filtration', 'evaporation', 'chromatography'], 'Iron is magnetic; sulphur is not.'],
  ['Acids, bases and salts', 'A solution with pH 2 is', 'strongly acidic', ['neutral', 'weakly alkaline', 'strongly alkaline'], 'Low pH means strongly acidic.'],
  ['Acids, bases and salts', 'Acids turn blue litmus', 'red', ['blue', 'green', 'colourless'], 'Acids turn blue litmus red.'],
  ['Acids, bases and salts', 'The reaction between an acid and a base to form salt and water is', 'neutralisation', ['oxidation', 'hydrolysis', 'fermentation'], 'Acid + base → salt + water.'],
  ['Acids, bases and salts', 'An acid reacts with a carbonate to give a salt, water and', 'carbon dioxide', ['hydrogen', 'oxygen', 'nitrogen'], 'Carbonates fizz with acids, releasing CO₂.'],
  ['Acids, bases and salts', 'A metal reacts with dilute acid to give a salt and', 'hydrogen', ['oxygen', 'carbon dioxide', 'water only'], 'Reactive metals displace hydrogen from acids.'],
  ['Acids, bases and salts', 'The indicator phenolphthalein is pink in', 'alkaline solutions', ['acidic solutions', 'neutral water', 'all solutions'], 'Phenolphthalein is colourless in acid and pink in alkali.'],
  ['Redox', 'Oxidation is the', 'loss of electrons', ['gain of electrons', 'gain of hydrogen', 'loss of oxygen'], 'OIL RIG: oxidation is loss, reduction is gain of electrons.'],
  ['Redox', 'In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, the reducing agent is', 'zinc', ['copper ions', 'copper', 'zinc ions'], 'Zinc gives electrons, so it reduces Cu²⁺.'],
  ['Redox', 'Rusting of iron requires', 'water and oxygen', ['oxygen only', 'water only', 'carbon dioxide'], 'Iron rusts only when both are present.'],
  ['Electrolysis', 'During electrolysis, cations move to the', 'cathode', ['anode', 'electrolyte surface', 'salt bridge'], 'Positive ions are attracted to the negative cathode.'],
  ['Electrolysis', 'In the electrolysis of brine, the gas produced at the anode is', 'chlorine', ['hydrogen', 'oxygen', 'nitrogen'], 'Chloride ions are discharged at the anode.'],
  ['Electrolysis', 'Electroplating a spoon with silver, the spoon is made the', 'cathode', ['anode', 'electrolyte', 'salt bridge'], 'Silver ions are reduced onto the cathode.'],
  ['Rates and equilibrium', 'A catalyst speeds up a reaction by', 'lowering the activation energy', ['raising the temperature', 'increasing the concentration', 'being used up'], 'A catalyst provides an easier pathway and is unchanged at the end.'],
  ['Rates and equilibrium', 'Which change increases the rate of reaction between marble chips and acid?', 'Using powdered marble', ['Using larger chips', 'Cooling the acid', 'Diluting the acid'], 'Powder has a larger surface area.'],
  ['Rates and equilibrium', 'For an exothermic reaction at equilibrium, raising the temperature', 'shifts the equilibrium to the left', ['shifts it to the right', 'has no effect', 'stops the reaction'], 'Le Chatelier: the system absorbs the added heat by favouring the endothermic direction.'],
  ['Rates and equilibrium', 'A reaction that releases heat to its surroundings is', 'exothermic', ['endothermic', 'reversible only', 'catalytic'], 'Exothermic reactions give out heat; ΔH is negative.'],
  ['Organic chemistry', 'The general formula of the alkanes is', 'CₙH₂ₙ₊₂', ['CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙOH'], 'Alkanes are saturated hydrocarbons.'],
  ['Organic chemistry', 'Alkenes decolourise bromine water because they are', 'unsaturated', ['saturated', 'ionic', 'acidic'], 'The C=C double bond adds bromine.'],
  ['Organic chemistry', 'The functional group of alcohols is', '−OH', ['−COOH', '−CHO', 'C=C'], 'Alcohols contain the hydroxyl group.'],
  ['Organic chemistry', 'Ethanoic acid reacts with ethanol to form', 'an ester', ['an alkene', 'an alkane', 'a soap'], 'Acid + alcohol → ester + water (esterification).'],
  ['Organic chemistry', 'The process of breaking long-chain hydrocarbons into shorter ones is', 'cracking', ['polymerisation', 'fermentation', 'esterification'], 'Cracking produces smaller, more useful molecules.'],
  ['Organic chemistry', 'Soap is made by heating fats or oils with', 'sodium hydroxide', ['hydrochloric acid', 'ethanol', 'sulphur'], 'This is saponification.'],
  ['Organic chemistry', 'Polythene is made by the polymerisation of', 'ethene', ['ethane', 'ethanol', 'ethanoic acid'], 'Ethene molecules join by addition polymerisation.'],
  ['Organic chemistry', 'Compounds with the same molecular formula but different structures are', 'isomers', ['isotopes', 'allotropes', 'polymers'], 'Isomers differ in the arrangement of atoms.'],
  ['Industrial chemistry', 'Ammonia is made industrially by the', 'Haber process', ['Contact process', 'Solvay process', 'Ostwald process only'], 'Nitrogen and hydrogen react over an iron catalyst.'],
  ['Industrial chemistry', 'The Contact process is used to make', 'sulphuric acid', ['nitric acid', 'ammonia', 'sodium carbonate'], 'Sulphur dioxide is oxidised to sulphur trioxide over a vanadium(V) oxide catalyst.'],
  ['Industrial chemistry', 'Hard water contains dissolved', 'calcium and magnesium ions', ['sodium and potassium ions', 'chlorine gas', 'oxygen only'], 'These ions form scum with soap.'],
  ['Industrial chemistry', 'Temporary hardness of water can be removed by', 'boiling', ['filtration', 'chlorination', 'freezing'], 'Boiling decomposes hydrogencarbonates into insoluble carbonates.'],
  ['Industrial chemistry', 'The main ore of aluminium is', 'bauxite', ['haematite', 'galena', 'cassiterite'], 'Aluminium is extracted from bauxite by electrolysis.'],
  ['Industrial chemistry', 'Iron is extracted from haematite in the', 'blast furnace', ['electrolytic cell', 'Haber plant', 'fractionating column'], 'Carbon monoxide reduces iron(III) oxide in the blast furnace.'],
  ['Environmental chemistry', 'Acid rain is mainly caused by', 'sulphur dioxide and nitrogen oxides', ['oxygen and nitrogen', 'carbon monoxide only', 'water vapour'], 'These gases dissolve in rain to form acids.'],
  ['Environmental chemistry', 'Which gas is poisonous because it combines with haemoglobin?', 'Carbon monoxide', ['Carbon dioxide', 'Nitrogen', 'Oxygen'], 'CO binds to haemoglobin and stops oxygen transport.']
];
for (const [t, q, a, w, why] of CHEM) C.add(t, q, a, w, why);
const M = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65 };
const COMPOUNDS = [['H₂O', 18], ['CO₂', 44], ['NaCl', 58.5], ['CaCO₃', 100], ['H₂SO₄', 98], ['NaOH', 40], ['NH₃', 17], ['CH₄', 16], ['MgO', 40], ['HCl', 36.5], ['KOH', 56], ['C₆H₁₂O₆', 180]];
for (const [f, m] of COMPOUNDS) C.add('Mole concept', `Calculate the relative molecular mass of ${f}. (H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, S = 32, Cl = 35.5, K = 39, Ca = 40)`, m, [m + 2, m - 1 > 0 ? m * 2 : m + 4, Math.round(m / 2)], `Add the relative atomic masses of every atom in ${f}: ${m}.`);
C.many(12, () => {
  const [f, m] = pick(COMPOUNDS), n = pick([0.1, 0.2, 0.25, 0.5, 2, 3]);
  const g = Math.round(m * n * 100) / 100;
  return C.add('Mole concept', `How many moles are in ${fmt(g)} g of ${f}? (Mr of ${f} = ${m})`, `${n} mol`, [`${fmt(g * m)} mol`, `${fmt(n * 2)} mol`, `${fmt(m / g)} mol`], `Moles = mass ÷ Mr = ${fmt(g)} ÷ ${m} = ${n} mol.`);
});
C.many(8, () => {
  const n = pick([0.1, 0.2, 0.5, 2, 3]), v = 22.4 * n;
  return C.add('Mole concept', `What volume does ${n} mol of a gas occupy at s.t.p.? (Molar volume = 22.4 dm³)`, `${fmt(v)} dm³`, [`${fmt(v * 2)} dm³`, `${fmt(22.4 / n)} dm³`, `${fmt(v + 22.4)} dm³`], `Volume = moles × 22.4 = ${fmt(v)} dm³.`);
});
C.many(8, () => {
  const n = pick([0.1, 0.2, 0.25, 0.5]), v = pick([250, 500, 1000, 2000]);
  const c = n / (v / 1000);
  return C.add('Mole concept', `${n} mol of NaOH is dissolved to make ${v} cm³ of solution. Find the concentration.`, `${fmt(c)} mol/dm³`, [`${fmt(n * v / 1000)} mol/dm³`, `${fmt(n * v)} mol/dm³`, `${fmt(c * 2)} mol/dm³`], `Concentration = moles ÷ volume in dm³ = ${n} ÷ ${v / 1000} = ${fmt(c)} mol/dm³.`);
});
for (const [ion, n] of [['Na⁺', 10], ['Cl⁻', 18], ['Mg²⁺', 10], ['O²⁻', 10], ['Ca²⁺', 18], ['Al³⁺', 10]]) {
  C.add('Atomic structure', `How many electrons does the ion ${ion} have? (Na = 11, Cl = 17, Mg = 12, O = 8, Ca = 20, Al = 13)`, n, [n + 2, n - 1, n + 1], `Positive ions lose electrons and negative ions gain them: ${ion} has ${n} electrons.`);
}
for (const [el, z, cfg, w] of [['magnesium', 12, '2, 8, 2', ['2, 10', '2, 8, 1', '2, 6, 4']], ['chlorine', 17, '2, 8, 7', ['2, 8, 8', '2, 7, 8', '2, 9, 6']], ['oxygen', 8, '2, 6', ['2, 8', '2, 4, 2', '8']], ['aluminium', 13, '2, 8, 3', ['2, 8, 2', '2, 11', '3, 8, 2']], ['calcium', 20, '2, 8, 8, 2', ['2, 8, 10', '2, 8, 9, 1', '2, 10, 8']], ['nitrogen', 7, '2, 5', ['2, 4, 1', '7', '2, 6']]]) {
  C.add('Atomic structure', `The electronic configuration of ${el} (atomic number ${z}) is`, cfg, w, `Fill the shells 2, 8, 8, …: ${cfg}.`);
}
for (const [f, v, w] of [['NaCl', 'sodium chloride', ['sodium chlorate', 'sodium chlorite', 'sodium hydroxide']], ['CaCO₃', 'calcium carbonate', ['calcium oxide', 'calcium hydroxide', 'calcium chloride']], ['H₂SO₄', 'sulphuric acid', ['hydrochloric acid', 'nitric acid', 'sulphurous acid']], ['NaOH', 'sodium hydroxide', ['sodium oxide', 'sodium carbonate', 'sodium hydride']], ['CuSO₄', 'copper(II) sulphate', ['copper(I) sulphide', 'copper carbonate', 'copper(II) oxide']], ['HNO₃', 'nitric acid', ['nitrous acid', 'ammonia', 'sulphuric acid']]]) {
  C.add('Chemical formulae', `What is the name of ${f}?`, v, w, `${f} is ${v}.`);
}

C.many(8, () => {
  const P1 = pick([100, 200, 300, 400]), V1 = pick([2, 3, 4, 6, 8, 12]), P2 = pick([100, 150, 200, 400, 600, 800]);
  const V2 = P1 * V1 / P2;
  if (P1 === P2 || !Number.isInteger(V2 * 10)) return false;
  return C.add('States of matter', `A gas occupies ${V1} dm³ at ${P1} kPa. Find its volume at ${P2} kPa, at the same temperature.`, `${fmt(V2)} dm³`, [`${fmt(P2 * V1 / P1)} dm³`, `${fmt(V1 * P1 * P2 / 10000)} dm³`, `${fmt(V2 + V1)} dm³`], `Boyle’s law: P₁V₁ = P₂V₂, so V₂ = ${P1} × ${V1} ÷ ${P2} = ${fmt(V2)} dm³.`);
});
C.many(6, () => {
  const V1 = pick([100, 200, 300, 400]), T1 = pick([200, 300, 400]), T2 = pick([300, 400, 600, 800]);
  const V2 = V1 * T2 / T1;
  if (T1 === T2 || !Number.isInteger(V2)) return false;
  return C.add('States of matter', `A gas occupies ${V1} cm³ at ${T1} K. Find its volume at ${T2} K, at constant pressure.`, `${V2} cm³`, [`${fmt(V1 * T1 / T2)} cm³`, `${V1 + T2 - T1} cm³`, `${V1} cm³`], `Charles’s law: V₁/T₁ = V₂/T₂, so V₂ = ${V1} × ${T2} ÷ ${T1} = ${V2} cm³.`);
});
C.many(8, () => {
  const cb = pick([0.1, 0.2, 0.5]), vb = pick([20, 25, 40, 50]), va = pick([10, 20, 25, 50]);
  const ca = cb * vb / va;
  if (!Number.isInteger(Math.round(ca * 1000) / ca * 0) || Math.round(ca * 1000) !== ca * 1000) return false;
  return C.add('Volumetric analysis', `${va} cm³ of HCl exactly neutralises ${vb} cm³ of ${cb} mol/dm³ NaOH. Find the concentration of the acid.`, `${fmt(ca)} mol/dm³`, [`${fmt(cb * va / vb)} mol/dm³`, `${fmt(cb)} mol/dm³`, `${fmt(ca * 2)} mol/dm³`], `HCl and NaOH react 1:1, so CₐVₐ = C_bV_b: Cₐ = ${cb} × ${vb} ÷ ${va} = ${fmt(ca)} mol/dm³.`);
});
for (const [f, el, pc, w] of [['H₂O', 'hydrogen', 11.1, [88.9, 5.6, 33.3]], ['CO₂', 'carbon', 27.3, [72.7, 50, 33.3]], ['CaCO₃', 'calcium', 40, [12, 48, 60]], ['NaOH', 'sodium', 57.5, [40, 2.5, 23]], ['MgO', 'magnesium', 60, [40, 24, 50]], ['CH₄', 'carbon', 75, [25, 12, 80]]]) {
  C.add('Mole concept', `Calculate the percentage by mass of ${el} in ${f}. (H = 1, C = 12, O = 16, Na = 23, Mg = 24, Ca = 40)`, `${pc}%`, w.map((x) => `${x}%`), `Divide the mass of ${el} in one formula unit by the relative formula mass and multiply by 100: ${pc}%.`);
}

// ---------- Physics ----------
const P = bank('ph');
const PHYS = [
  ['Measurement', 'The SI unit of force is the', 'newton', ['joule', 'watt', 'pascal'], 'Force is measured in newtons (N).'],
  ['Measurement', 'Which of these is a vector quantity?', 'Velocity', ['Speed', 'Mass', 'Temperature'], 'Velocity has size and direction.'],
  ['Measurement', 'Which instrument measures the diameter of a thin wire most accurately?', 'Micrometer screw gauge', ['Metre rule', 'Measuring tape', 'Vernier calipers'], 'A micrometer reads to 0.01 mm.'],
  ['Measurement', 'The SI unit of power is the', 'watt', ['joule', 'newton', 'volt'], 'Power is energy per second, in watts.'],
  ['Motion', 'The area under a velocity–time graph gives', 'distance travelled', ['acceleration', 'force', 'speed'], 'Area under v–t is displacement.'],
  ['Motion', 'The gradient of a velocity–time graph gives', 'acceleration', ['distance', 'speed only', 'momentum'], 'Acceleration is change in velocity per unit time.'],
  ['Motion', 'Newton’s first law is also called the law of', 'inertia', ['acceleration', 'reaction', 'gravitation'], 'A body stays at rest or in uniform motion unless a force acts.'],
  ['Motion', 'For every action there is an equal and opposite reaction. This is Newton’s', 'third law', ['first law', 'second law', 'law of gravitation'], 'Forces come in action–reaction pairs.'],
  ['Motion', 'The tendency of a body to remain at rest is called', 'inertia', ['momentum', 'friction', 'weight'], 'Inertia resists changes in motion.'],
  ['Motion', 'A body moving in a circle at constant speed has', 'an acceleration towards the centre', ['no acceleration', 'an acceleration outwards', 'constant velocity'], 'Its direction keeps changing, so it accelerates towards the centre.'],
  ['Energy', 'Energy stored in a stretched spring is', 'elastic potential energy', ['kinetic energy', 'chemical energy', 'nuclear energy'], 'Work done stretching the spring is stored as elastic energy.'],
  ['Energy', 'The principle of conservation of energy states that energy', 'cannot be created or destroyed', ['is always lost as heat', 'can be created by machines', 'is only kinetic'], 'Energy changes form but the total stays the same.'],
  ['Energy', 'The efficiency of a machine is always less than 100% because of', 'friction', ['gravity only', 'its mass', 'the load'], 'Some energy is wasted overcoming friction.'],
  ['Heat', 'Heat travels through a vacuum by', 'radiation', ['conduction', 'convection', 'evaporation'], 'Radiation needs no medium.'],
  ['Heat', 'Land and sea breezes are caused by', 'convection', ['conduction', 'radiation only', 'evaporation'], 'Unequal heating sets up convection currents.'],
  ['Heat', 'The temperature at which a liquid changes to a gas throughout is its', 'boiling point', ['melting point', 'dew point', 'freezing point'], 'At the boiling point, vapour forms throughout the liquid.'],
  ['Heat', 'Absolute zero on the Kelvin scale is', '0 K', ['273 K', '−100 K', '100 K'], '0 K is −273 °C.'],
  ['Heat', 'A vacuum flask reduces heat loss by', 'conduction, convection and radiation', ['radiation only', 'conduction only', 'evaporation only'], 'The vacuum stops conduction and convection; silvered walls reduce radiation.'],
  ['Waves', 'Sound cannot travel through', 'a vacuum', ['water', 'steel', 'air'], 'Sound needs a medium.'],
  ['Waves', 'Light waves are', 'transverse', ['longitudinal', 'mechanical only', 'stationary'], 'Light vibrations are at right angles to its direction.'],
  ['Waves', 'Sound waves are', 'longitudinal', ['transverse', 'electromagnetic', 'stationary only'], 'Sound vibrations are along the direction of travel.'],
  ['Waves', 'The bending of light as it passes from air into glass is', 'refraction', ['reflection', 'diffraction', 'dispersion'], 'Light changes speed and direction at the boundary.'],
  ['Waves', 'The splitting of white light into colours by a prism is', 'dispersion', ['refraction only', 'reflection', 'interference'], 'Different colours refract by different amounts.'],
  ['Waves', 'An echo is caused by the', 'reflection of sound', ['refraction of sound', 'diffraction of sound', 'absorption of sound'], 'Sound bounces off a surface and returns.'],
  ['Waves', 'Which has the longest wavelength?', 'Radio waves', ['X-rays', 'Visible light', 'Gamma rays'], 'Radio waves are at the long-wavelength end of the spectrum.'],
  ['Optics', 'A convex lens is also called a', 'converging lens', ['diverging lens', 'plane lens', 'concave mirror'], 'Convex lenses bring light rays together.'],
  ['Optics', 'The image formed by a plane mirror is', 'virtual and laterally inverted', ['real and inverted', 'magnified', 'real and upright'], 'Plane mirror images are virtual and reversed left to right.'],
  ['Optics', 'Total internal reflection is used in', 'optical fibres', ['magnifying glasses', 'plane mirrors', 'spectacles'], 'Light is trapped inside the fibre by repeated total internal reflection.'],
  ['Electricity', 'The SI unit of electric charge is the', 'coulomb', ['ampere', 'volt', 'ohm'], 'Charge is measured in coulombs.'],
  ['Electricity', 'An ammeter is connected in a circuit', 'in series', ['in parallel', 'across the battery only', 'outside the circuit'], 'Current must flow through the ammeter.'],
  ['Electricity', 'A voltmeter is connected', 'in parallel', ['in series', 'without a battery', 'to the fuse only'], 'It measures the potential difference across a component.'],
  ['Electricity', 'A fuse protects a circuit by', 'melting when the current is too large', ['storing charge', 'increasing the voltage', 'reducing resistance'], 'The fuse wire melts and breaks the circuit.'],
  ['Electricity', 'The resistance of a metal wire increases when its', 'length increases', ['length decreases', 'thickness increases', 'temperature falls'], 'Resistance is proportional to length.'],
  ['Magnetism', 'Like magnetic poles', 'repel', ['attract', 'have no effect', 'cancel out'], 'Like poles repel; unlike poles attract.'],
  ['Magnetism', 'Which material is best for making a permanent magnet?', 'Steel', ['Soft iron', 'Copper', 'Aluminium'], 'Steel keeps its magnetism.'],
  ['Magnetism', 'A transformer works on the principle of', 'electromagnetic induction', ['static electricity', 'thermionic emission', 'photoelectric effect'], 'A changing current in one coil induces a voltage in the other.'],
  ['Magnetism', 'A step-up transformer has', 'more turns on the secondary coil', ['fewer turns on the secondary coil', 'equal turns on both coils', 'no core'], 'Vs/Vp = Ns/Np, so more secondary turns raise the voltage.'],
  ['Modern physics', 'Alpha particles are', 'helium nuclei', ['electrons', 'photons', 'neutrons'], 'An alpha particle is two protons and two neutrons.'],
  ['Modern physics', 'Beta particles are', 'fast-moving electrons', ['helium nuclei', 'protons', 'X-rays'], 'Beta particles are electrons emitted from the nucleus.'],
  ['Modern physics', 'Which radiation is the most penetrating?', 'Gamma rays', ['Alpha particles', 'Beta particles', 'Visible light'], 'Gamma rays need thick lead or concrete to stop them.'],
  ['Modern physics', 'The emission of electrons from a metal surface when light falls on it is the', 'photoelectric effect', ['thermionic emission', 'Compton effect', 'piezoelectric effect'], 'Light of high enough frequency ejects electrons.'],
  ['Pressure', 'Pressure in a liquid increases with', 'depth', ['the area of the container', 'the shape of the container', 'the volume of the container only'], 'Pressure = ρgh, so it rises with depth.'],
  ['Pressure', 'The instrument used to measure atmospheric pressure is the', 'barometer', ['hydrometer', 'manometer only', 'thermometer'], 'A barometer measures air pressure.'],
  ['Pressure', 'A body floats when the upthrust on it is', 'equal to its weight', ['less than its weight', 'zero', 'twice its weight'], 'Law of flotation: a floating body displaces its own weight of fluid.']
];
for (const [t, q, a, w, why] of PHYS) P.add(t, q, a, w, why);
P.many(8, () => {
  const d = int(2, 30) * 10, t = pick([4, 5, 8, 10, 20]);
  return P.add('Motion', `A car travels ${d} m in ${t} s. Find its average speed.`, `${fmt(d / t)} m/s`, [`${d * t} m/s`, `${fmt(t / d)} m/s`, `${fmt(d / t + t)} m/s`], `Speed = distance ÷ time = ${d} ÷ ${t} = ${fmt(d / t)} m/s.`);
});
P.many(8, () => {
  const u = int(0, 10), a = int(1, 5), t = int(2, 10);
  return P.add('Motion', `A body starts with velocity ${u} m/s and accelerates at ${a} m/s² for ${t} s. Find its final velocity.`, `${u + a * t} m/s`, [`${a * t} m/s`, `${u * a * t} m/s`, `${u + a + t} m/s`], `v = u + at = ${u} + ${a} × ${t} = ${u + a * t} m/s.`);
});
P.many(8, () => {
  const m = int(2, 20), a = int(2, 10);
  return P.add('Motion', `Find the force needed to give a mass of ${m} kg an acceleration of ${a} m/s².`, `${m * a} N`, [`${m + a} N`, `${fmt(m / a)} N`, `${m * a * 10} N`], `F = ma = ${m} × ${a} = ${m * a} N.`);
});
P.many(6, () => {
  const m = int(2, 50), v = int(2, 20);
  return P.add('Motion', `Find the momentum of a ${m} kg body moving at ${v} m/s.`, `${m * v} kg m/s`, [`${m + v} kg m/s`, `${fmt(m * v * v / 2)} kg m/s`, `${fmt(m / v)} kg m/s`], `p = mv = ${m} × ${v} = ${m * v} kg m/s.`);
});
P.many(8, () => {
  const m = int(1, 10), v = int(2, 12);
  return P.add('Energy', `Find the kinetic energy of a ${m} kg mass moving at ${v} m/s.`, `${fmt(m * v * v / 2)} J`, [`${m * v} J`, `${m * v * v} J`, `${fmt(m * v / 2)} J`], `KE = ½mv² = ½ × ${m} × ${v}² = ${fmt(m * v * v / 2)} J.`);
});
P.many(8, () => {
  const m = int(1, 20), h = int(2, 20);
  return P.add('Energy', `Find the potential energy gained by a ${m} kg mass raised through ${h} m. (g = 10 m/s²)`, `${m * h * 10} J`, [`${m * h} J`, `${m * 10} J`, `${fmt(m * h * 10 / 2)} J`], `PE = mgh = ${m} × 10 × ${h} = ${m * h * 10} J.`);
});
P.many(6, () => {
  const w = int(2, 30) * 100, t = pick([4, 5, 10, 20, 25]);
  return P.add('Energy', `A machine does ${w} J of work in ${t} s. Find its power.`, `${fmt(w / t)} W`, [`${w * t} W`, `${fmt(t / w)} W`, `${w} W`], `Power = work ÷ time = ${w} ÷ ${t} = ${fmt(w / t)} W.`);
});
P.many(10, () => {
  const I = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), R = int(2, 20);
  const V = I * R;
  return P.add('Electricity', `A current of ${I} A flows through a ${R} Ω resistor. Find the potential difference across it.`, `${fmt(V)} V`, [`${fmt(R / I)} V`, `${fmt(I + R)} V`, `${fmt(V * 2)} V`], `V = IR = ${I} × ${R} = ${fmt(V)} V.`);
});
P.many(8, () => {
  const a = int(2, 12), b = int(2, 12);
  return P.add('Electricity', `Find the total resistance of ${a} Ω and ${b} Ω resistors connected in series.`, `${a + b} Ω`, [`${fmt(a * b / (a + b))} Ω`, `${a * b} Ω`, `${Math.abs(a - b) || 1} Ω`], `In series, R = R₁ + R₂ = ${a + b} Ω.`);
});
P.many(6, () => {
  const [a, b] = pick([[6, 3], [4, 4], [12, 6], [10, 10], [6, 12], [20, 5], [3, 6]]);
  return P.add('Electricity', `Find the total resistance of ${a} Ω and ${b} Ω resistors connected in parallel.`, `${fmt(a * b / (a + b))} Ω`, [`${a + b} Ω`, `${a * b} Ω`, `${fmt((a + b) / 2)} Ω`], `1/R = 1/${a} + 1/${b}, so R = ${a} × ${b} ÷ ${a + b} = ${fmt(a * b / (a + b))} Ω.`);
});
P.many(6, () => {
  const V = pick([6, 12, 24, 220, 240]), I = pick([0.5, 1, 2, 5]);
  return P.add('Electricity', `An appliance takes ${I} A from a ${V} V supply. Find its power.`, `${fmt(V * I)} W`, [`${fmt(V / I)} W`, `${fmt(V + I)} W`, `${fmt(V * I * I)} W`], `P = IV = ${I} × ${V} = ${fmt(V * I)} W.`);
});
P.many(6, () => {
  const m = int(2, 40) * 10, v = pick([10, 20, 25, 50, 100]);
  return P.add('Pressure', `A body of mass ${m} g has a volume of ${v} cm³. Find its density.`, `${fmt(m / v)} g/cm³`, [`${m * v} g/cm³`, `${fmt(v / m)} g/cm³`, `${fmt(m / v + 1)} g/cm³`], `Density = mass ÷ volume = ${m} ÷ ${v} = ${fmt(m / v)} g/cm³.`);
});
P.many(6, () => {
  const F = int(2, 50) * 10, A = pick([2, 4, 5, 10, 0.5]);
  return P.add('Pressure', `A force of ${F} N acts on an area of ${A} m². Find the pressure.`, `${fmt(F / A)} Pa`, [`${fmt(F * A)} Pa`, `${fmt(A / F)} Pa`, `${F} Pa`], `Pressure = force ÷ area = ${F} ÷ ${A} = ${fmt(F / A)} Pa.`);
});
P.many(6, () => {
  const f = pick([50, 100, 200, 250, 500]), lam = pick([0.5, 1, 2, 4, 6.8]);
  return P.add('Waves', `A wave has frequency ${f} Hz and wavelength ${lam} m. Find its speed.`, `${fmt(f * lam)} m/s`, [`${fmt(f / lam)} m/s`, `${fmt(lam / f)} m/s`, `${fmt(f + lam)} m/s`], `v = fλ = ${f} × ${lam} = ${fmt(f * lam)} m/s.`);
});
P.many(6, () => {
  const m = pick([0.5, 1, 2, 3]), c = pick([400, 900, 4200]), dt = int(5, 40);
  return P.add('Heat', `How much heat is needed to raise the temperature of ${m} kg of a substance with specific heat capacity ${c} J/kg K by ${dt} K?`, `${fmt(m * c * dt)} J`, [`${fmt(c * dt)} J`, `${fmt(m * c)} J`, `${fmt(m * c * dt * 2)} J`], `Q = mcΔθ = ${m} × ${c} × ${dt} = ${fmt(m * c * dt)} J.`);
});
P.many(4, () => {
  const half = pick([2, 5, 10, 20]), n = pick([2, 3, 4]), start = pick([80, 160, 320, 640]);
  return P.add('Modern physics', `A radioactive sample of mass ${start} g has a half-life of ${half} days. What mass remains after ${half * n} days?`, `${start / 2 ** n} g`, [`${start / (2 * n)} g`, `${start / 2} g`, `${start - start / 2 ** n} g`], `${n} half-lives pass, so the mass halves ${n} times: ${start} ÷ ${2 ** n} = ${start / 2 ** n} g.`);
});
P.many(5, () => {
  const Vp = pick([240, 220, 120]), Np = pick([100, 200, 500, 1000]), k = pick([2, 4, 5, 10]);
  const Ns = Np / k, Vs = Vp / k;
  if (!Number.isInteger(Ns) || !Number.isInteger(Vs * 10)) return false;
  return P.add('Magnetism', `A transformer has ${Np} turns on its primary coil and ${Ns} on its secondary. If the primary voltage is ${Vp} V, find the secondary voltage.`, `${fmt(Vs)} V`, [`${fmt(Vp * k)} V`, `${fmt(Vp)} V`, `${fmt(Vs * 2)} V`], `Vs/Vp = Ns/Np, so Vs = ${Vp} × ${Ns} ÷ ${Np} = ${fmt(Vs)} V.`);
});

function write(file, subject, title, b) {
  const qs = b.done();
  const topics = [...new Set(qs.map((x) => x.topic))];
  writeFileSync(new URL(`../src/content/banks/jamb/${file}.js`, import.meta.url), `// JAMB-style practice questions: ${title}. Generated by scripts/build-jamb-sciences.mjs: concept questions
// are written by hand there, and calculation answers are computed. Written for Lexiverse, not official past questions.
export default ${JSON.stringify({ subject, title, topics, questions: qs }, null, 1)};
`);
  console.log(`${title}: ${qs.length} questions in ${topics.length} topics`);
}
write('chemistry', 'chemistry', 'Chemistry', C);
write('physics', 'physics', 'Physics', P);
