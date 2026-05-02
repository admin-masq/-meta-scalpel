import { describe, it, expect } from 'vitest';
const { trim, normalize, strip, tokenEstimate } = require('../index.js');

describe('Integration: full pipeline', () => {
  it('should reduce token count after trim + strip on a realistic payload', () => {
    const rawPayload = {
      role: 'assistant',
      content: '  The   answer  is   42.  \n\n\n\n  Trust  me.  ',
      _debug: { latencyMs: 230, model: 'gpt-4o', traceId: 'abc-123' },
      _internal_routing: { region: 'us-east-1' },
    };

    // Step 1: Strip metadata
    const stripped = strip(rawPayload, {
      keys: ['_debug', '_internal_routing'],
    });

    expect(stripped).not.toHaveProperty('_debug');
    expect(stripped).not.toHaveProperty('_internal_routing');
    expect(stripped).toHaveProperty('content');

    // Step 2: Trim the content field
    const cleaned = trim(stripped.content);
    expect(cleaned).toBe('The answer is 42. Trust me.');

    // Step 3: Normalize (should be a no-op on single line)
    const normalized = normalize(cleaned);
    expect(normalized).toBe('The answer is 42. Trust me.');

    // Step 4: Verify token savings
    const tokensBefore = tokenEstimate(rawPayload.content);
    const tokensAfter = tokenEstimate(normalized);
    expect(tokensAfter).toBeLessThan(tokensBefore);
  });

  it('should handle a chat history array cleanup', () => {
    const chatHistory = [
      { role: 'user', content: '  hello  ', _ts: 1000 },
      { role: 'assistant', content: '  hi  there  ', _ts: 1001 },
      { role: 'user', content: '  bye  ', _ts: 1002 },
    ];

    const wrapper = { messages: chatHistory };
    const stripped = strip(wrapper, { keys: ['_ts'] });

    const cleaned = stripped.messages.map((msg) => ({
      ...msg,
      content: trim(msg.content),
    }));

    expect(cleaned).toEqual([
      { role: 'user', content: 'hello' },
      { role: 'assistant', content: 'hi there' },
      { role: 'user', content: 'bye' },
    ]);
  });
});
