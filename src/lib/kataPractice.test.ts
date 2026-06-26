import { describe, expect, it } from 'vitest';
import { isSessionAssessment, kataPracticeAssessment } from './kataPractice';

describe('isSessionAssessment', () => {
  it('is false for single untimed kata practice', () => {
    expect(
      isSessionAssessment({ kataIds: ['two-sum'], durationMinutes: null }),
    ).toBe(false);
  });

  it('is true for multi-kata assessments', () => {
    expect(
      isSessionAssessment({ kataIds: ['two-sum', 'fizzbuzz'], durationMinutes: null }),
    ).toBe(true);
  });

  it('is true for timed single-kata assessments', () => {
    expect(isSessionAssessment({ kataIds: ['two-sum'], durationMinutes: 30 })).toBe(true);
  });
});

describe('kataPracticeAssessment', () => {
  it('uses kata id as assessment id for practice mode', () => {
    const assessment = kataPracticeAssessment({ id: 'two-sum', title: 'Two Sum' });
    expect(assessment).toEqual({
      id: 'two-sum',
      title: 'Two Sum',
      durationMinutes: null,
      kataIds: ['two-sum'],
    });
  });
});
