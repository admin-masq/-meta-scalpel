import { describe, it, expect } from 'vitest';
const { tokenEstimate } = require('../index.js');

describe('tokenEstimate()', () => {
  it('should estimate tokens using the ~1.33 multiplier', () => {
    // "Hello world" = 2 words → ceil(2 * 1.33) = 3
    expect(tokenEstimate('Hello world')).toBe(3);
  });

  it('should handle single-word input', () => {
    // 1 word → ceil(1 * 1.33) = 2
    expect(tokenEstimate('Hello')).toBe(2);
  });

  it('should return 0 for an empty string', () => {
    expect(tokenEstimate('')).toBe(0);
  });

  it('should return 0 for whitespace-only input', () => {
    expect(tokenEstimate('     ')).toBe(0);
  });

  it('should handle multi-line text correctly', () => {
    const text = 'The quick brown fox\njumps over the lazy dog';
    // 9 words → ceil(9 * 1.33) = 12
    expect(tokenEstimate(text)).toBe(12);
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => tokenEstimate(100)).toThrow(TypeError);
    expect(() => tokenEstimate([])).toThrow(TypeError);
  });
});
