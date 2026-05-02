import { describe, it, expect } from 'vitest';
const { trim } = require('../index.js');

describe('trim()', () => {
  it('should collapse multiple spaces into a single space', () => {
    expect(trim('Hello,   world!')).toBe('Hello, world!');
  });

  it('should strip leading and trailing whitespace', () => {
    expect(trim('   padded string   ')).toBe('padded string');
  });

  it('should collapse tabs and newlines into single spaces', () => {
    expect(trim("line one\t\tline two\n\nline three")).toBe(
      'line one line two line three'
    );
  });

  it('should return an empty string when given only whitespace', () => {
    expect(trim('     \t  \n  ')).toBe('');
  });

  it('should return the same string when no redundant whitespace exists', () => {
    expect(trim('already clean')).toBe('already clean');
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => trim(42)).toThrow(TypeError);
    expect(() => trim(null)).toThrow(TypeError);
    expect(() => trim(undefined)).toThrow(TypeError);
  });
});
