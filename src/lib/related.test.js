import { test } from 'node:test';
import assert from 'node:assert/strict';
import { orbitChips, familyLabel } from './related.js';

test('orbit chips mix kinds and fill gaps', () => {
  assert.deepEqual(orbitChips({ syn: ['a', 'b', 'c'], ant: ['x'], fam: ['f'] }).map((c) => c.mark + c.word), ['≈a', '≈b', '≠x', '≈c', '+f']);
  assert.deepEqual(orbitChips({ syn: ['a'], ant: ['x', 'y'], fam: [] }).map((c) => c.word), ['a', 'y', 'x']);
  assert.equal(orbitChips({ syn: ['a', 'b', 'c'], ant: ['x'], fam: ['f'] }, 4).length, 4);
});

test('family labels', () => {
  assert.equal(familyLabel('serendipitously'), 'Adverb');
  assert.equal(familyLabel('serendipitous'), 'Adjective');
  assert.equal(familyLabel('anticipation'), 'Noun');
  assert.equal(familyLabel('persuasive'), 'Adjective');
});
