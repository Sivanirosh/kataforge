import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TestResult } from './configTypes';
import {
  buildAssessmentScore,
  loadHiddenResultsByKata,
  loadResultsByKata,
  persistAssessmentScore,
} from './assessmentResults';
import { loadAssessmentScore } from './storage';

const store = new Map<string, string>();

function createLocalStorageMock() {
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
}

const visiblePass: TestResult = {
  testId: 'v1',
  name: 'visible',
  hidden: false,
  status: 'passed',
  durationMs: 1,
};

const hiddenFail: TestResult = {
  testId: 'h1',
  name: 'hidden edge',
  hidden: true,
  status: 'failed',
  durationMs: 1,
};

describe('assessmentResults', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:10:00Z'));
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
    store.set(
      'kataforge:session:demo',
      JSON.stringify({
        assessmentId: 'demo',
        startedAt: new Date('2026-01-01T00:00:00Z').getTime(),
        durationMinutes: 30,
        currentKataIndex: 0,
        submitted: true,
      }),
    );
    store.set('kataforge:results:kata-a', JSON.stringify([visiblePass, hiddenFail]));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('builds assessment score from session elapsed time and saved results', () => {
    const score = buildAssessmentScore('demo', ['kata-a']);

    expect(score.percentage).toBe(50);
    expect(score.totalPassed).toBe(1);
    expect(score.totalTests).toBe(2);
    expect(score.elapsedMs).toBe(10 * 60 * 1000);
  });

  it('persists assessment score to localStorage', () => {
    const score = persistAssessmentScore('demo', ['kata-a']);

    expect(loadAssessmentScore('demo')).toEqual(score);
  });

  it('returns only hidden test results grouped by kata', () => {
    expect(loadHiddenResultsByKata(['kata-a'])).toEqual({
      'kata-a': [hiddenFail],
    });
  });

  it('returns all saved results grouped by kata', () => {
    expect(loadResultsByKata(['kata-a', 'missing'])).toEqual({
      'kata-a': [visiblePass, hiddenFail],
      missing: [],
    });
  });
});
