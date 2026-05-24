import { describe, expect, it } from 'vitest';
import { importUserKataFromText } from './importUserKataFromText';

const sampleKataJson = JSON.stringify({
  id: 'import-test',
  title: 'Import Test',
  difficulty: 'easy',
  estimatedMinutes: 5,
  functionName: 'fn',
  tags: [],
  starterCode: 'def fn():\n    pass',
  bodyMarkdown: '# Test',
  tests: [{ id: 't1', name: 'basic', hidden: false, args: [], expected: 1 }],
});

describe('importUserKataFromText', () => {
  it('returns error for invalid JSON', () => {
    const result = importUserKataFromText({ text: '{', builtInIds: new Set() });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain('Invalid JSON');
  });
});
