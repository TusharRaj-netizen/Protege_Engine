const { SYSTEM_PROMPT } = require('./systemPrompt');
const { loadDemoMedicines, getDemoMedicinesPath } = require('./kb');
const { LLM_DEFAULTS, getLatencySafeParams } = require('./latency');
const { DEFAULT_DISCLAIMER, formatMedicineAnswer } = require('./formatMedicineAnswer');

module.exports = {
  SYSTEM_PROMPT,
  loadDemoMedicines,
  getDemoMedicinesPath,
  LLM_DEFAULTS,
  getLatencySafeParams,
  DEFAULT_DISCLAIMER,
  formatMedicineAnswer,
};
