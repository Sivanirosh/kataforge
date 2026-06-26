import { describe, expect, it } from 'vitest';
import { importUserKataFromText } from './importUserKataFromText';


describe('importUserKataFromText', () => {
  it('returns error for invalid JSON', () => {
    const result = importUserKataFromText({ text: '{', builtInIds: new Set() });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain('Invalid JSON');
  });
});
