import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ACTIVITY_STORAGE_KEY,
  loadActivityEntries,
  loadActivityFeed,
  recordActivity,
  saveActivityEntries,
} from './activity';

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

describe('activity', () => {
  beforeEach(() => {
    store.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('records and sorts activities newest first', () => {
    recordActivity({
      kind: 'kata',
      id: 'two-sum',
      title: 'Two Sum',
      href: '/problem/two-sum',
      source: 'builtin',
      updatedAt: 10,
    });
    recordActivity({
      kind: 'assessment',
      id: 'full',
      title: 'Full Assessment',
      href: '/assessment/full',
      updatedAt: 20,
    });

    expect(loadActivityEntries().map((entry) => entry.id)).toEqual(['full', 'two-sum']);
  });

  it('keeps the newest value for duplicate kind/id entries', () => {
    saveActivityEntries([
      {
        kind: 'kata',
        id: 'two-sum',
        title: 'Old',
        href: '/problem/two-sum',
        updatedAt: 10,
      },
      {
        kind: 'kata',
        id: 'two-sum',
        title: 'New',
        href: '/problem/two-sum',
        updatedAt: 20,
      },
    ]);

    expect(loadActivityEntries()).toMatchObject([{ title: 'New', updatedAt: 20 }]);
  });

  it('ignores corrupt stored activity payloads', () => {
    store.set(ACTIVITY_STORAGE_KEY, '{not json');

    expect(loadActivityEntries()).toEqual([]);
    expect(store.has(ACTIVITY_STORAGE_KEY)).toBe(false);
  });

  it('falls back to legacy kata session keys', () => {
    store.set(
      'kataforge:session:two-sum',
      JSON.stringify({
        assessmentId: 'two-sum',
        startedAt: 100,
        durationMinutes: null,
        currentKataIndex: 0,
        submitted: false,
      }),
    );

    expect(
      loadActivityFeed({
        katas: [
          {
            id: 'two-sum',
            title: 'Two Sum',
            estimatedMinutes: 15,
            source: 'builtin',
          },
        ],
      }),
    ).toMatchObject([
      {
        kind: 'kata',
        id: 'two-sum',
        title: 'Two Sum',
        href: '/problem/two-sum',
        updatedAt: 100,
      },
    ]);
  });

  it('falls back to legacy assessment and cursus progress keys', () => {
    store.set(
      'kataforge:session:full-examples',
      JSON.stringify({
        assessmentId: 'full-examples',
        startedAt: 300,
        durationMinutes: 30,
        currentKataIndex: 1,
        submitted: false,
      }),
    );
    store.set(
      'kataforge:cursus-progress:path-a',
      JSON.stringify({
        cursusId: 'path-a',
        completedStepKeys: ['intro:0'],
        lastStepKey: 'intro:1',
        startedAt: 200,
      }),
    );

    expect(
      loadActivityFeed({
        assessments: [
          {
            id: 'full-examples',
            title: 'Full Examples',
            durationMinutes: 30,
            kataCount: 4,
          },
        ],
        cursus: [
          {
            id: 'path-a',
            title: 'Path A',
            stepCount: 3,
            stepKeys: ['intro:0', 'intro:1', 'intro:2'],
          },
        ],
      }).map((entry) => [entry.kind, entry.id, entry.href]),
    ).toEqual([
      ['assessment', 'full-examples', '/assessment/full-examples'],
      ['cursus', 'path-a', '/cursus/path-a/step/1'],
    ]);
  });
});
