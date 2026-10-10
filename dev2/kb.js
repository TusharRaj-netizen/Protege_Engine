/**
 * Dev 2: Clinical knowledge base (local fallback).
 *
 * This module intentionally has:
 * - no external dependencies
 * - CommonJS exports (works with require(); ESM can still import it)
 */

const fs = require('node:fs');
const path = require('node:path');

function getDemoMedicinesPath() {
  return path.join(__dirname, 'demoMedicines.json');
}

/**
 * Load the local fallback medicine dataset.
 * @returns {{version:number, source:string, medicines:Array<any>}}
 */
function loadDemoMedicines() {
  const p = getDemoMedicinesPath();
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}

module.exports = {
  getDemoMedicinesPath,
  loadDemoMedicines,
};
