import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TestResult } from './configTypes';
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
  saveDraft,
  saveResults,
  saveSession,
  startFreshSession,
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
});
