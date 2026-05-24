import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AssessmentScore, TestResult } from './configTypes';
import {
  clearAssessmentAttempt,
  clearDraft,
  getRemainingMs,
  isKataComplete,
  isTimerExpired,
  loadDraft,
  loadKataCompletionMap,
  loadResults,
  loadSession,
  saveAssessmentScore,
  loadAssessmentScore,
  saveDraft,
  syncDraft,
  saveResults,
  saveSession,
  retryAssessmentSession,
  startFreshSession,
  hasAssessmentSession,
  markCursusStepComplete,
  loadCursusProgress,
  cursusCompletionPercent,
  type SessionState,
} from './storage';

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

const passedResult: TestResult = {
  testId: 't1',
  name: 'basic',
  hidden: false,
  status: 'passed',
  durationMs: 1,
};

const failedResult: TestResult = {
  testId: 't1',
  name: 'basic',
  hidden: false,
  status: 'failed',
  durationMs: 1,
};

describe('storage', () => {
  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('round-trips draft save/load per kata id', () => {
    saveDraft('two-sum', 'def two_sum(): pass');
    expect(loadDraft('two-sum')).toBe('def two_sum(): pass');
    clearDraft('two-sum');
    expect(loadDraft('two-sum')).toBeNull();
  });

  it('syncDraft clears storage for empty or starter-matching code', () => {
    const starter = 'def two_sum(nums, target):\n    pass';
    saveDraft('two-sum', 'user edited code');
    syncDraft('two-sum', starter, starter);
    expect(loadDraft('two-sum')).toBeNull();

    saveDraft('two-sum', 'user edited code');
    syncDraft('two-sum', '   \n', starter);
    expect(loadDraft('two-sum')).toBeNull();

    syncDraft('two-sum', 'def two_sum(nums, target):\n    return []', starter);
    expect(loadDraft('two-sum')).toBe('def two_sum(nums, target):\n    return []');
  });

  it('round-trips session with startedAt and currentKataIndex', () => {
    const session: SessionState = {
      assessmentId: 'full-examples',
      startedAt: 1_700_000_000_000,
      durationMinutes: 60,
      currentKataIndex: 2,
      submitted: false,
    };
    saveSession(session);
    expect(loadSession('full-examples')).toEqual(session);
  });

  it('marks timed session expired after elapsed duration', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

    const session: SessionState = {
      assessmentId: 'timed',
      startedAt: Date.now(),
      durationMinutes: 30,
      currentKataIndex: 0,
      submitted: false,
    };

    expect(isTimerExpired(session)).toBe(false);
    vi.setSystemTime(new Date('2026-01-01T00:31:00Z'));
    expect(isTimerExpired(session)).toBe(true);
    expect(getRemainingMs(session)).toBe(0);

    vi.useRealTimers();
  });

  it('never expires untimed sessions', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

    const session: SessionState = {
      assessmentId: 'quick',
      startedAt: Date.now(),
      durationMinutes: null,
      currentKataIndex: 1,
      submitted: false,
    };

    vi.setSystemTime(new Date('2026-01-02T00:00:00Z'));
    expect(isTimerExpired(session)).toBe(false);
    expect(getRemainingMs(session)).toBeNull();

    vi.useRealTimers();
  });

  it('builds completion map from saved submit results', () => {
    saveResults('fizzbuzz', [passedResult]);
    saveResults('two-sum', [failedResult]);

    expect(isKataComplete('fizzbuzz')).toBe(true);
    expect(isKataComplete('two-sum')).toBe(false);
    expect(isKataComplete('missing')).toBe(false);
    expect(loadKataCompletionMap(['fizzbuzz', 'two-sum', 'missing'])).toEqual({
      fizzbuzz: true,
    });
  });

  it('round-trips assessment score save/load', () => {
    const score: AssessmentScore = {
      assessmentId: 'quick-practice',
      problems: [{ kataId: 'two-sum', passed: 2, total: 3, percentage: 67 }],
      totalPassed: 2,
      totalTests: 3,
      percentage: 67,
      elapsedMs: 120_000,
    };
    saveAssessmentScore(score);
    expect(loadAssessmentScore('quick-practice')).toEqual(score);
  });

  it('retry assessment preserves drafts but clears results and score', () => {
    saveSession({
      assessmentId: 'full-examples',
      startedAt: 100,
      durationMinutes: 45,
      currentKataIndex: 1,
      submitted: true,
    });
    saveDraft('two-sum', 'def two_sum(): return [0, 1]');
    saveResults('two-sum', [passedResult]);
    saveAssessmentScore({
      assessmentId: 'full-examples',
      problems: [{ kataId: 'two-sum', passed: 1, total: 1, percentage: 100 }],
      totalPassed: 1,
      totalTests: 1,
      percentage: 100,
      elapsedMs: 60_000,
    });

    const retried = retryAssessmentSession('full-examples', 45, ['two-sum', 'fizzbuzz']);

    expect(loadDraft('two-sum')).toBe('def two_sum(): return [0, 1]');
    expect(loadResults('two-sum')).toBeNull();
    expect(loadAssessmentScore('full-examples')).toBeNull();
    expect(loadSession('full-examples')).toEqual(retried);
    expect(retried.submitted).toBe(false);
    expect(retried.currentKataIndex).toBe(0);
  });

  it('clears assessment attempt data on start over', () => {
    saveSession({
      assessmentId: 'full-examples',
      startedAt: 100,
      durationMinutes: 45,
      currentKataIndex: 1,
      submitted: true,
    });
    saveDraft('two-sum', 'draft');
    saveResults('two-sum', [passedResult]);

    const fresh = startFreshSession('full-examples', 45, ['two-sum', 'fizzbuzz']);

    expect(loadSession('full-examples')).toEqual(fresh);
    expect(fresh.startedAt).toBeGreaterThan(100);
    expect(fresh.currentKataIndex).toBe(0);
    expect(fresh.submitted).toBe(false);
    expect(loadDraft('two-sum')).toBeNull();
    expect(loadResults('two-sum')).toBeNull();

    clearAssessmentAttempt('full-examples', ['fizzbuzz']);
    expect(loadSession('full-examples')).toBeNull();
  });

  it('reports remaining time after reload from saved session startedAt', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

    const session: SessionState = {
      assessmentId: 'full-examples',
      startedAt: Date.now(),
      durationMinutes: 30,
      currentKataIndex: 0,
      submitted: false,
    };
    saveSession(session);

    vi.setSystemTime(new Date('2026-01-01T00:05:00Z'));
    const reloaded = loadSession('full-examples')!;
    expect(getRemainingMs(reloaded)).toBe(25 * 60 * 1000);
    expect(isTimerExpired(reloaded)).toBe(false);

    vi.useRealTimers();
  });

  it('reset clears saved draft so starter code is used', () => {
    saveDraft('two-sum', 'user edited code');
    clearDraft('two-sum');
    expect(loadDraft('two-sum')).toBeNull();
  });

  it('detects when an assessment session exists', () => {
    expect(hasAssessmentSession('demo')).toBe(false);
    saveSession({
      assessmentId: 'demo',
      startedAt: Date.now(),
      durationMinutes: null,
      currentKataIndex: 0,
      submitted: false,
    });
    expect(hasAssessmentSession('demo')).toBe(true);
  });

  it('tracks cursus step completion separately from assessments', () => {
    markCursusStepComplete('agent-harness', 'agent-loop:0');
    markCursusStepComplete('agent-harness', 'agent-loop:1');

    const progress = loadCursusProgress('agent-harness');
    expect(progress?.completedStepKeys).toEqual(['agent-loop:0', 'agent-loop:1']);
    expect(cursusCompletionPercent('agent-harness', 6)).toBe(33);
  });
});
