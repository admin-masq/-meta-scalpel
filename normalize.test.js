import { describe, it, expect } from 'vitest';
const { normalize } = require('../index.js');

describe('normalize()', () => {
  it('should convert CRLF line endings to LF', () => {
    expect(normalize('line one\r\nline two')).toBe('line one\nline two');
  });

  it('should convert stray CR to LF', () => {
    expect(normalize('line one\rline two')).toBe('line one\nline two');
  });

  it('should collapse 3+ consecutive blank lines into one blank line', () => {
    expect(normalize('A\n\n\n\nB')).toBe('A\n\nB');
    expect(normalize('A\n\n\n\n\n\n\nB')).toBe('A\n\nB');
  });

  it('should preserve exactly two consecutive newlines (one blank line)', () => {
    expect(normalize('A\n\nB')).toBe('A\n\nB');
  });

  it('should trim leading and trailing whitespace from the result', () => {
    expect(normalize('\n\n\nHello\n\n\n')).toBe('Hello');
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => normalize(123)).toThrow(TypeError);
    expect(() => normalize({})).toThrow(TypeError);
  });
});
