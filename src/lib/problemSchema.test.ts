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
});
