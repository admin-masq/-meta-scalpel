/**
 * @fileoverview Core utility functions for meta-scalpel.
 * Provides enterprise-grade mechanisms for aggressively trimming and cleaning
 * JSON payloads and strings to minimize LLM token usage.
 * 
 * @author admin-masq
 * @license MIT
 * @version 1.0.0
 */

'use strict';

/**
 * Collapses redundant whitespace characters (spaces, tabs, newlines) into a single space
 * and trims leading/trailing whitespace from the input string.
 *
 * @param {string} input - The raw text input to be trimmed.
 * @returns {string} The normalized, whitespace-collapsed string.
 * @throws {TypeError} If the provided input is not a string.
 *
 * @example
 * const cleanText = trim('   Hello, \t world! \n ');
 * // Returns: 'Hello, world!'
 */
function trim(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`[meta-scalpel:trim] Expected string, received ${typeof input}`);
  }
  return input.replace(/\s+/g, ' ').trim();
}

/**
 * Normalizes line endings to LF and collapses consecutive blank lines into a single blank line.
 * This is particularly useful for sanitizing LLM completions or standardizing multi-line prompts.
 *
 * @param {string} input - The multi-line string to normalize.
 * @returns {string} The normalized string with unified line endings.
 * @throws {TypeError} If the provided input is not a string.
 *
 * @example
 * const normalized = normalize('Line one\r\n\r\n\r\nLine two');
 * // Returns: 'Line one\n\nLine two'
 */
function normalize(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`[meta-scalpel:normalize] Expected string, received ${typeof input}`);
  }

  return input
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Configuration options for the strip function.
 * @typedef {Object} StripOptions
 * @property {string[]} [keys=[]] - An array of object keys to remove.
 * @property {boolean} [deep=true] - Determines whether to recursively strip keys from nested objects and arrays.
 */

/**
 * Deeply clones an object while removing specified keys. This operation is non-mutating.
 * Arrays are mapped and traversed if the `deep` option is enabled.
 *
 * @param {Object} payload - The JSON-compatible object to process.
 * @param {StripOptions} [options={}] - Configuration options for stripping.
 * @returns {Object} A new object with the specified keys omitted.
 * @throws {TypeError} If the provided payload is not a valid object.
 *
 * @example
 * const data = { id: 1, _debug: true, nested: { _debug: false, val: 42 } };
 * const cleaned = strip(data, { keys: ['_debug'], deep: true });
 * // Returns: { id: 1, nested: { val: 42 } }
 */
function strip(payload, options = {}) {
  if (payload === null || typeof payload !== 'object') {
    throw new TypeError(`[meta-scalpel:strip] Expected object, received ${payload === null ? 'null' : typeof payload}`);
  }

  const keysToRemove = new Set(options.keys || []);
  const isDeep = options.deep !== false;

  /**
   * Internal recursive handler.
   * @param {*} value - The current node to process.
   * @returns {*} The processed node.
   */
  function processNode(value) {
    if (Array.isArray(value)) {
      return isDeep ? value.map(processNode) : value.slice();
    }

    if (value !== null && typeof value === 'object') {
      const result = {};
      for (const [key, val] of Object.entries(value)) {
        if (keysToRemove.has(key)) {
          continue;
        }
        result[key] = isDeep ? processNode(val) : val;
      }
      return result;
    }

    return value;
  }

  return processNode(payload);
}

/**
 * Calculates a rough estimate of tokens based on word count.
 * Uses a heuristic multiplier of ~1.33 tokens per word. This is strictly for estimation
 * and should not replace a dedicated tokenizer (e.g., tiktoken) for exact counts.
 *
 * @param {string} text - The input text to estimate.
 * @returns {number} The estimated token count.
 * @throws {TypeError} If the provided input is not a string.
 */
function tokenEstimate(text) {
  if (typeof text !== 'string') {
    throw new TypeError(`[meta-scalpel:tokenEstimate] Expected string, received ${typeof text}`);
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  return Math.ceil(words.length * 1.33);
}

module.exports = {
  trim,
  normalize,
  strip,
  tokenEstimate
};
