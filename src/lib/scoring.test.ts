import { describe, expect, it } from 'vitest';
import { scoreAssessment, scoreProblem } from './scoring';
import type { TestResult } from './configTypes';

function result(status: TestResult['status']): TestResult {
  return {
    testId: 't',
    name: 't',
    hidden: false,
    status,
    durationMs: 1,
  };
}

describe('scoring', () => {
  it('scores a single problem', () => {
    const score = scoreProblem('two-sum', [result('passed'), result('failed')]);
    expect(score.passed).toBe(1);
    expect(score.total).toBe(2);
    expect(score.percentage).toBe(50);
  });

  it('scores an assessment', () => {
    const score = scoreAssessment(
      'full-examples',
      [
        { kataId: 'a', passed: 2, total: 2, percentage: 100 },
        { kataId: 'b', passed: 1, total: 2, percentage: 50 },
      ],
      60000,
    );
    expect(score.totalPassed).toBe(3);
    expect(score.totalTests).toBe(4);
    expect(score.percentage).toBe(75);
  });
});
