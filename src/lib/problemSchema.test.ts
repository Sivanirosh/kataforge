import { describe, expect, it } from 'vitest';
import { assessmentSchema, problemSchema } from './problemSchema';

describe('problemSchema', () => {
  it('accepts valid problem frontmatter', () => {
    const parsed = problemSchema.parse({
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'easy',
      estimatedMinutes: 15,
      functionName: 'two_sum',
      tags: ['arrays'],
      starterCode: 'def two_sum(nums, target):\n    pass',
      tests: [
        {
          id: 's1',
          name: 'basic',
          hidden: false,
          args: [[1, 2], 3],
          expected: [0, 1],
        },
      ],
    });
    expect(parsed.id).toBe('two-sum');
  });

  it('accepts optional solution fields', () => {
    const parsed = problemSchema.parse({
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'easy',
      estimatedMinutes: 15,
      functionName: 'two_sum',
      tags: ['arrays'],
      starterCode: 'def two_sum(nums, target):\n    pass',
      solutionCode: 'def two_sum(nums, target):\n    return []',
      solutionExplanation: 'Use a hash map.',
      tests: [
        {
          id: 's1',
          name: 'basic',
          hidden: false,
          args: [[1, 2], 3],
          expected: [0, 1],
        },
      ],
    });
    expect(parsed.solutionCode).toContain('return []');
    expect(parsed.solutionExplanation).toBe('Use a hash map.');
  });

  it('rejects invalid difficulty', () => {
    expect(() =>
      problemSchema.parse({
        id: 'x',
        title: 'X',
        difficulty: 'impossible',
        estimatedMinutes: 5,
        functionName: 'f',
        starterCode: '',
        tests: [],
      }),
    ).toThrow();
  });

  it('rejects empty tests array with a clear Zod error', () => {
    expect(() =>
      problemSchema.parse({
        id: 'x',
        title: 'X',
        difficulty: 'easy',
        estimatedMinutes: 5,
        functionName: 'f',
        starterCode: '',
        tests: [],
      }),
    ).toThrow(/Array must contain at least 1 element/);
  });

  it('rejects TestCase missing required fields', () => {
    expect(() =>
      problemSchema.parse({
        id: 'x',
        title: 'X',
        difficulty: 'easy',
        estimatedMinutes: 5,
        functionName: 'f',
        starterCode: '',
        tests: [{ id: 't1', hidden: false, args: [], expected: 1 }],
      }),
    ).toThrow();
  });
});

describe('assessmentSchema', () => {
  it('accepts untimed assessment', () => {
    const parsed = assessmentSchema.parse({
      id: 'quick',
      title: 'Quick',
      durationMinutes: null,
      kataIds: ['two-sum'],
    });
    expect(parsed.durationMinutes).toBeNull();
  });

  it('rejects empty kataIds', () => {
    expect(() =>
      assessmentSchema.parse({
        id: 'empty',
        title: 'Empty',
        durationMinutes: null,
        kataIds: [],
      }),
    ).toThrow(/Array must contain at least 1 element/);
  });
});
