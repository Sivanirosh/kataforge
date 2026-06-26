import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearUserKatas,
  deleteUserKata,
  exportUserKataPack,
  getUserKata,
  importUserKata,
  importUserKataPack,
  listUserKatas,
  resolveUniqueId,
  USER_KATAS_STORAGE_KEY,
} from './userKatas';

const sampleKata = {
  id: 'sample-kata',
  title: 'Sample Kata',
  difficulty: 'easy' as const,
  estimatedMinutes: 10,
  functionName: 'sample_fn',
  tags: ['demo'],
  starterCode: 'def sample_fn():\n    pass',
  bodyMarkdown: '# Sample\n\nDo the thing.',
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

function createLocalStorageMock() {
  const store = new Map<string, string>();
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

describe('resolveUniqueId', () => {
  it('returns requested id when unused', () => {
    expect(resolveUniqueId('foo', new Set(['bar']))).toBe('foo');
  });

  it('auto-suffixes on collision', () => {
    const reserved = new Set(['two-sum', 'two-sum-2']);
    expect(resolveUniqueId('two-sum', reserved)).toBe('two-sum-3');
  });
});

describe('userKatas storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock());
    clearUserKatas();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('imports a user kata', () => {
    const result = importUserKata(sampleKata, new Set());
    expect(result).toEqual({
      id: 'sample-kata',
      requestedId: 'sample-kata',
      title: 'Sample Kata',
    });
    const stored = getUserKata('sample-kata');
    expect(stored?.source).toBe('user');
    expect(stored?.hints).toEqual([]);
    expect(stored?.bodyHtml).toContain('<h1>Sample</h1>');
  });

  it('suffixes id when colliding with built-in kata', () => {
    const result = importUserKata(sampleKata, new Set(['sample-kata']));
    expect(result.id).toBe('sample-kata-2');
    expect(getUserKata('sample-kata-2')).toBeDefined();
  });

  it('suffixes id when colliding with existing user kata', () => {
    importUserKata(sampleKata, new Set());
    const result = importUserKata({ ...sampleKata, title: 'Another' }, new Set());
    expect(result.id).toBe('sample-kata-2');
  });

  it('imports a pack of katas', () => {
    const results = importUserKataPack(
      {
        version: 1,
        katas: [
          sampleKata,
          { ...sampleKata, id: 'other-kata', title: 'Other' },
        ],
      },
      new Set(),
    );
    expect(results).toHaveLength(2);
    expect(listUserKatas()).toHaveLength(2);
  });

  it('exports imported katas as a round-trip pack', () => {
    importUserKata(sampleKata, new Set());
    const pack = exportUserKataPack();
    expect(pack.version).toBe(1);
    expect(pack.katas[0]?.bodyMarkdown).toBe(sampleKata.bodyMarkdown);
    expect(pack.katas[0]?.id).toBe('sample-kata');
  });

  it('preserves hints through import and export', () => {
    const hints = ['Check the sample manually.', 'Keep only the state you need.'];
    importUserKata({ ...sampleKata, hints }, new Set());
    expect(getUserKata('sample-kata')?.hints).toEqual(hints);
    expect(exportUserKataPack().katas[0]?.hints).toEqual(hints);
  });

  it('defaults legacy stored katas without hints to an empty array', () => {
    localStorage.setItem(
      USER_KATAS_STORAGE_KEY,
      JSON.stringify({
        'legacy-kata': {
          ...sampleKata,
          id: 'legacy-kata',
          source: 'user',
          bodyHtml: '<h1>Sample</h1>',
        },
      }),
    );

    expect(getUserKata('legacy-kata')?.hints).toEqual([]);
    expect(exportUserKataPack().katas[0]?.hints).toEqual([]);
  });

  it('deletes a user kata', () => {
    importUserKata(sampleKata, new Set());
    expect(deleteUserKata('sample-kata')).toBe(true);
    expect(getUserKata('sample-kata')).toBeUndefined();
    expect(localStorage.getItem(USER_KATAS_STORAGE_KEY)).toBe('{}');
  });

  it('clears all user katas', () => {
    importUserKata(sampleKata, new Set());
    clearUserKatas();
    expect(listUserKatas()).toHaveLength(0);
  });
});
