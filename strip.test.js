import { describe, it, expect } from 'vitest';
const { strip } = require('../index.js');

describe('strip()', () => {
  it('should remove specified top-level keys', () => {
    const input = { role: 'user', content: 'hi', _debug: true };
    const result = strip(input, { keys: ['_debug'] });

    expect(result).toEqual({ role: 'user', content: 'hi' });
  });

  it('should recursively strip keys from nested objects by default', () => {
    const input = {
      message: 'hello',
      meta: { traceId: '123', nested: { traceId: '456', value: 1 } },
    };
    const result = strip(input, { keys: ['traceId'] });

    expect(result).toEqual({
      message: 'hello',
      meta: { nested: { value: 1 } },
    });
  });

  it('should handle arrays with nested objects', () => {
    const input = {
      items: [
        { id: 1, _internal: true },
        { id: 2, _internal: false },
      ],
    };
    const result = strip(input, { keys: ['_internal'] });

    expect(result).toEqual({
      items: [{ id: 1 }, { id: 2 }],
    });
  });

  it('should only strip top-level keys when deep is false', () => {
    const input = {
      _debug: true,
      nested: { _debug: true, value: 42 },
    };
    const result = strip(input, { keys: ['_debug'], deep: false });

    expect(result).toEqual({
      nested: { _debug: true, value: 42 },
    });
  });

  it('should never mutate the original object', () => {
    const input = { a: 1, b: 2, c: { d: 3 } };
    const original = JSON.parse(JSON.stringify(input));
    strip(input, { keys: ['b'] });

    expect(input).toEqual(original);
  });

  it('should return an empty object when all keys are stripped', () => {
    const result = strip({ a: 1, b: 2 }, { keys: ['a', 'b'] });
    expect(result).toEqual({});
  });

  it('should throw TypeError for non-object input', () => {
    expect(() => strip('string', { keys: [] })).toThrow(TypeError);
    expect(() => strip(null, { keys: [] })).toThrow(TypeError);
  });
});
