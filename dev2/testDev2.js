/* eslint-disable no-console */

/**
 * Tiny self-test with no dependencies.
 * Run: node dev2/testDev2.js
 */

const {
  SYSTEM_PROMPT,
  loadDemoMedicines,
  getLatencySafeParams,
  formatMedicineAnswer,
} = require('./index');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function run() {
  assert(typeof SYSTEM_PROMPT === 'string' && SYSTEM_PROMPT.length > 10, 'SYSTEM_PROMPT missing');

  const kb = loadDemoMedicines();
  assert(Array.isArray(kb.medicines) && kb.medicines.length === 5, 'Expected 5 demo medicines');

  const params = getLatencySafeParams({ streamingReady: false });
  assert(params.max_tokens === 150, 'Expected max_tokens=150 when streamingReady=false');

  const sample = kb.medicines[0];
  const text = formatMedicineAnswer(sample);

  // Ensure required sections exist.
  assert(text.includes('1) What it does:'), 'Missing what-it-does section');
  assert(text.includes('2) When to take it:'), 'Missing when-to-take section');
  assert(text.includes('3) One key precaution:'), 'Missing precaution section');
  assert(text.toLowerCase().includes('doctor') || text.toLowerCase().includes('pharmacist'), 'Missing disclaimer');

  console.log('Dev2 self-test passed.');
  console.log('\nSample formatted output:\n');
  console.log(text);
}

if (require.main === module) run();
