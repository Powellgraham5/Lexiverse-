import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanForVoice, hasLocalVoice, COMING_VOICES } from './localVoice.js';

test('Yoruba text is cleaned to what the voice model knows', () => {
  assert.equal(cleanForVoice('Ọmọ náà, ń ṣeré!', 'yo'), 'ọmọ náà ń ṣeré');
  assert.equal(cleanForVoice('Ẹ KÚ ÀÁRỌ̀ 2024', 'yo'), 'ẹ kú àárọ̀');
  assert.equal(cleanForVoice('  lots   of   space ', 'yo'), 'lots of space');
});

test('Yoruba, Hausa and Pidgin have on-device voices; Igbo has none yet', () => {
  assert.ok(hasLocalVoice('yo'));
  assert.ok(hasLocalVoice('ha'));
  assert.ok(hasLocalVoice('pcm'));
  assert.ok(!hasLocalVoice('ig'));
  assert.deepEqual(COMING_VOICES, []);
});

test('Hausa and Pidgin text is cleaned for their voices', () => {
  assert.equal(cleanForVoice('Ɗan uwāna, yā ƙaunace ka!', 'ha'), 'ɗan uwana ya ƙaunace ka');
  assert.equal(cleanForVoice('How far? Abeg, wetin dey happen?', 'pcm'), 'how far abeg wetin dey happen');
});

test('the self-hosted voice files are each under the 25 MB hosting limit', async () => {
  const fs = await import('node:fs');
  for (const code of ['hau', 'pcm']) {
    const dir = new URL(`../../public/voices/mms-tts-${code}/`, import.meta.url);
    const cfg = JSON.parse(fs.readFileSync(new URL('config.json', dir)));
    const parts = cfg['transformers.js_config'].use_external_data_format['model_quantized.onnx'];
    const files = ['model_quantized.onnx', 'model_quantized.onnx_data', ...Array.from({ length: parts - 1 }, (_, i) => `model_quantized.onnx_data_${i + 1}`)];
    for (const f of files) assert.ok(fs.statSync(new URL(`onnx/${f}`, dir)).size < 25 * 1024 * 1024, f);
    for (const f of ['tokenizer.json', 'tokenizer_config.json']) assert.ok(fs.existsSync(new URL(f, dir)));
  }
});
