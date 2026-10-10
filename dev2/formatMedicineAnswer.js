/**
 * Dev 2: Formatter that enforces the required output structure.
 *
 * The system prompt instructs the model to always include:
 *  (1) what the medicine does
 *  (2) when to take it (with/without food)
 *  (3) one key precaution
 *  + a brief disclaimer to consult their doctor
 *
 * This helper lets other devs produce consistent text even without an LLM.
 */

const DEFAULT_DISCLAIMER =
  'Please check with your doctor or pharmacist, especially if you have other health problems or take other medicines.';

/**
 * @param {{
 *  displayName?: string,
 *  whatItDoes?: string,
 *  howToTake?: { timing?: string, withFood?: boolean, notes?: string },
 *  keyPrecaution?: string
 * }} med
 * @param {{disclaimer?: string}} [opts]
 */
function formatMedicineAnswer(med, opts = {}) {
  const name = med.displayName || 'This medicine';
  const does = med.whatItDoes || 'Helps with the condition it was prescribed for.';
  const timing = med?.howToTake?.timing || 'Take it the way your doctor told you.';
  const withFoodFlag = med?.howToTake?.withFood;
  const withFoodText =
    withFoodFlag === true
      ? 'Take it with food.'
      : withFoodFlag === false
        ? 'You can take it with or without food.'
        : 'Follow your doctor’s directions about food.';
  const precaution =
    med.keyPrecaution ||
    'If you feel very unwell or have a new serious symptom, contact your doctor.';
  const disclaimer = opts.disclaimer || DEFAULT_DISCLAIMER;

  // Short, warm, 6th-grade friendly sentences.
  return [
    `${name}:`,
    `1) What it does: ${does}`,
    `2) When to take it: ${timing} ${withFoodText}`,
    `3) One key precaution: ${precaution}`,
    `\n${disclaimer}`,
  ].join('\n');
}

module.exports = {
  DEFAULT_DISCLAIMER,
  formatMedicineAnswer,
};
