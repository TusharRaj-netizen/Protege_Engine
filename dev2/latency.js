/**
 * Dev 2: Latency-safe defaults.
 *
 * Product requirement:
 * - If streaming isn't ready, use max_tokens: 150 so responses return quickly.
 */

const LLM_DEFAULTS = {
  temperature: 0.2,
  // Most providers accept this name; if yours uses max_output_tokens, map it in your adapter.
  max_tokens: 150,
  stream: false,
};

/**
 * Returns model params tuned for snappy responses.
 *
 * @param {{streamingReady?: boolean, maxTokensIfStreaming?: number}} [opts]
 */
function getLatencySafeParams(opts = {}) {
  const { streamingReady = false, maxTokensIfStreaming = 500 } = opts;
  return {
    temperature: LLM_DEFAULTS.temperature,
    stream: !!streamingReady,
    max_tokens: streamingReady ? maxTokensIfStreaming : 150,
  };
}

module.exports = {
  LLM_DEFAULTS,
  getLatencySafeParams,
};
