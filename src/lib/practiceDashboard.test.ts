import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ActivityCatalog } from './activity';
import { ACTIVITY_STORAGE_KEY } from './activity';
import { loadPracticeDashboard, type PracticeDashboardStarter } from './practiceDashboard';

const store = new Map<string, string>();

function createLocalStorageMock() {
  return {
    get length() {
      return store.size;
    },
    key: (index: number) => [...store.keys()][index] ?? null,
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

const catalog: ActivityCatalog = {
  katas: [
    {
      id: 'two-sum',
      title: 'Two Sum',
      estimatedMinutes: 15,
      source: 'builtin',
    },
    {
      id: 'fizzbuzz',
      title: 'FizzBuzz',
      estimatedMinutes: 10,
      source: 'builtin',
    },
    {
      id: 'agent-loop-bash-gates',
      title: 'Agent Loop Bash Gates',
      estimatedMinutes: 20,
      source: 'builtin',
    },
  ],
  assessments: [
    {
      id: 'full-examples',
      title: 'Example Katas',
      durationMinutes: 30,
      kataCount: 2,
    },
  ],
  cursus: [
    {
      id: 'build-ai-agent-harness',
      title: 'Build Your Own AI Coding Agent Harness',
      stepCount: 6,
      stepKeys: [
        'agent-loop:0',
        'agent-loop:1',
        'agent-loop:2',
        'agent-loop:3',
        'agent-loop:4',
        'agent-loop:5',
      ],
    },
  ],
};

const starter: PracticeDashboardStarter = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  estimatedMinutes: 15,
};

describe('practice dashboard', () => {
  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds a quiet fresh-browser zero state', () => {
    const dashboard = loadPracticeDashboard(catalog, starter);

    expect(dashboard.solvedCount).toBe(0);
    expect(dashboard.submittedCount).toBe(0);
    expect(dashboard.activeCount).toBe(0);
    expect(dashboard.recentActivityCount).toBe(0);
    expect(dashboard.primary).toMatchObject({
      href: '/problem/two-sum',
      label: 'Start practice',
      title: 'Two Sum',
      kindLabel: 'Starter kata',
    });
  });

  it('derives submitted, active, recent, and continuation state from local storage', () => {
    store.set(
      'kataforge:results:two-sum',
      JSON.stringify([
        { testId: 's1', name: 'sample', hidden: false, status: 'passed', durationMs: 1 },
        { testId: 'h1', name: 'hidden', hidden: true, status: 'passed', durationMs: 1 },
      ]),
    );
    store.set(
      'kataforge:results:fizzbuzz',
      JSON.stringify([
        { testId: 's1', name: 'sample', hidden: false, status: 'passed', durationMs: 1 },
        { testId: 'h1', name: 'hidden', hidden: true, status: 'failed', durationMs: 1 },
      ]),
    );
    store.set('kataforge:draft:agent-loop-bash-gates', 'def solve():\n    pass');
    store.set(
      'kataforge:session:full-examples',
      JSON.stringify({
        assessmentId: 'full-examples',
        startedAt: 2_000,
        durationMinutes: 30,
        currentKataIndex: 1,
        submitted: false,
      }),
    );
    store.set(
      'kataforge:cursus-progress:build-ai-agent-harness',
      JSON.stringify({
        cursusId: 'build-ai-agent-harness',
        completedStepKeys: ['agent-loop:0'],
        lastStepKey: 'agent-loop:3',
        startedAt: 1_000,
      }),
    );

    const dashboard = loadPracticeDashboard(catalog, starter);

    expect(dashboard.solvedCount).toBe(1);
    expect(dashboard.submittedCount).toBe(2);
    expect(dashboard.activeCount).toBe(2);
    expect(dashboard.recentActivityCount).toBe(2);
    expect(dashboard.activityEntries.map((entry) => [entry.kind, entry.id])).toEqual([
      ['assessment', 'full-examples'],
      ['cursus', 'build-ai-agent-harness'],
    ]);
    expect(dashboard.primary).toMatchObject({
      href: '/assessment/full-examples',
      label: 'Continue',
      title: 'Example Katas',
      kindLabel: 'Assessment',
    });
  });

  it('ignores malformed localStorage values without throwing', () => {
    store.set(ACTIVITY_STORAGE_KEY, '{not json');
    store.set('kataforge:results:two-sum', '{not json');
    store.set('kataforge:results:fizzbuzz', JSON.stringify([{ noStatus: true }]));
    store.set('kataforge:draft:two-sum', '   ');
    store.set('kataforge:session:full-examples', '{not json');
    store.set('kataforge:cursus-progress:build-ai-agent-harness', '{not json');

    const dashboard = loadPracticeDashboard(catalog, starter);

    expect(dashboard.solvedCount).toBe(0);
    expect(dashboard.submittedCount).toBe(0);
    expect(dashboard.activeCount).toBe(0);
    expect(dashboard.recentActivityCount).toBe(0);
    expect(dashboard.primary.href).toBe('/problem/two-sum');
    expect(store.has(ACTIVITY_STORAGE_KEY)).toBe(false);
  });
});
