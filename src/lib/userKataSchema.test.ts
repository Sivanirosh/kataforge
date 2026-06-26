import { describe, expect, it } from 'vitest';
import { userKataImportSchema, userKataPackSchema } from './userKataSchema';

const validKata = {
  id: 'demo',
  title: 'Demo',
  difficulty: 'easy',
  estimatedMinutes: 10,
  functionName: 'demo_fn',
  tags: [],
  starterCode: 'def demo_fn():\n    pass',
  bodyMarkdown: '# Demo',
  tests: [
    {
      id: 't1',
      name: 'basic',
      hidden: false,
      args: [],
      expected: 1,
    },
  ],
};

describe('userKataImportSchema', () => {
  it('accepts valid kata import JSON and defaults hints to empty', () => {
    expect(userKataImportSchema.parse(validKata)).toMatchObject({ id: 'demo', hints: [] });
  });

  it('accepts optional hints', () => {
    expect(
      userKataImportSchema.parse({
        ...validKata,
        hints: ['Try the smallest input first.', 'Name the repeated subproblem.'],
      }).hints,
    ).toEqual(['Try the smallest input first.', 'Name the repeated subproblem.']);
  });

  it('rejects missing bodyMarkdown', () => {
    const { bodyMarkdown: _body, ...rest } = validKata;
    expect(() => userKataImportSchema.parse(rest)).toThrow();
  });
});

describe('userKataPackSchema', () => {
  it('accepts a versioned pack', () => {
    const pack = userKataPackSchema.parse({ version: 1, katas: [validKata] });
    expect(pack.katas).toHaveLength(1);
  });
});
