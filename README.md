# Protege_Engine

## ElderEase – Dev 2 (AI & Prompt Engineering)

This repo contains the Dev 2 deliverables designed to be easy to integrate into other stacks.

### What’s included

- `dev2/systemPrompt.txt` – the exact system prompt (canonical text).
- `dev2/systemPrompt.js` – JS export of the same prompt.
- `dev2/demoMedicines.json` – local fallback dataset with 5 realistic sample medicine profiles:
  - Metformin 500 mg
  - Amlodipine 5 mg
  - Atorvastatin 20 mg
  - Paracetamol 650 mg
  - Pantoprazole 40 mg
- `dev2/kb.js` – helper to load the local JSON knowledge base.
- `dev2/latency.js` – latency-safe LLM params (`max_tokens: 150` when streaming is not ready).
- `dev2/index.js` – convenience barrel export.
- `dev2/formatMedicineAnswer.js` – non-LLM formatter that enforces the (1)(2)(3)+disclaimer structure.
- `dev2/testDev2.js` – tiny no-deps self-test (`node dev2/testDev2.js`).

### Integration example (Node / CommonJS)

```js
const {
  SYSTEM_PROMPT,
  loadDemoMedicines,
  getLatencySafeParams,
} = require('./dev2');

const kb = loadDemoMedicines();
const llmParams = getLatencySafeParams({ streamingReady: false });

// Pass SYSTEM_PROMPT + user messages into your LLM provider.
// Use kb.medicines as a local fallback when remote KB is unavailable.
```

### Notes

- Some LLM SDKs use `max_output_tokens` instead of `max_tokens`. Map it in your adapter.
- When streaming is enabled, you can safely raise the token limit (e.g. 500+) because tokens arrive progressively.

### Disclaimer

This content is for development/testing only and is not medical advice. Always consult a licensed clinician.