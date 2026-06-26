import { describe, expect, it } from 'vitest';
import { buildLlmKataCopyBlock, LLM_KATA_SYSTEM_PROMPT } from './llmKataTemplate';

describe('buildLlmKataCopyBlock', () => {
  it('combines prompt and example JSON in one block', () => {
    const block = buildLlmKataCopyBlock();
    expect(block).toContain(LLM_KATA_SYSTEM_PROMPT);
    expect(block).toContain('--- EXAMPLE JSON OUTPUT ---');
    expect(block).toContain('"id": "two-sum"');
  });
});
