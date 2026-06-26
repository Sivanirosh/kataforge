import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import KataHubList, {
  availableTagsForLibrary,
  filterKatasForLibrary,
  mergeKatas,
  sortKatasForLibrary,
  type BuiltInKataSummary,
  type HubKataEntry,
} from './KataHubList';
import { importUserKata } from '../lib/userKatas';

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

const builtIns: BuiltInKataSummary[] = [
  { id: 'medium-b', title: 'Medium B', difficulty: 'medium', estimatedMinutes: 25, tags: ['graphs'] },
  { id: 'easy-b', title: 'Easy B', difficulty: 'easy', estimatedMinutes: 10, tags: ['strings'] },
  { id: 'easy-a', title: 'Easy A', difficulty: 'easy', estimatedMinutes: 12, tags: ['arrays', 'hash-map'] },
  { id: 'hard-a', title: 'Hard A', difficulty: 'hard', estimatedMinutes: 45, tags: ['dynamic-programming'] },
];

const userKata = {
  id: 'user-a',
  title: 'User A',
  difficulty: 'easy-medium' as const,
  estimatedMinutes: 15,
  functionName: 'user_a',
  tags: ['demo'],
  starterCode: 'def user_a():\n    pass',
  bodyMarkdown: '# User A\n\nReturn `1`.',
  tests: [
    {
      id: 'sample-1',
      name: 'returns one',
      hidden: false,
      args: [],
      expected: 1,
    },
  ],
};

function rowTitles(container: HTMLElement): string[] {
  return [...container.querySelectorAll('.library-row-title span')].map(
    (entry) => entry.textContent ?? '',
  );
}

function setInputValue(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function setSelectValue(select: HTMLSelectElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set;
  setter?.call(select, value);
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('KataHubList helpers', () => {
  it('sorts by difficulty ladder, then title', () => {
    const entries: HubKataEntry[] = builtIns.map((kata) => ({ ...kata, source: 'builtin' }));

    expect(sortKatasForLibrary(entries).map((entry) => entry.title)).toEqual([
      'Easy A',
      'Easy B',
      'Medium B',
      'Hard A',
    ]);
  });

  it('filters by title, difficulty, and source', () => {
    const entries: HubKataEntry[] = [
      ...builtIns.map((kata) => ({ ...kata, source: 'builtin' as const })),
      {
        id: 'user-a',
        title: 'User A',
        difficulty: 'easy-medium',
        estimatedMinutes: 15,
        tags: ['demo', 'user-only'],
        source: 'user',
      },
    ];

    expect(filterKatasForLibrary(entries, 'user', 'easy-medium', 'user')).toMatchObject([
      { id: 'user-a' },
    ]);
    expect(filterKatasForLibrary(entries, 'user', 'easy-medium', 'user', 'user-only')).toMatchObject([
      { id: 'user-a' },
    ]);
  });

  it('extracts available tags across built-ins and UserKatas', () => {
    const entries = mergeKatas(builtIns, [
      { ...userKata, tags: ['demo', 'user-only'], source: 'user', bodyHtml: '<h1>User A</h1>' },
    ]);

    expect(availableTagsForLibrary(entries)).toEqual([
      'arrays',
      'demo',
      'dynamic-programming',
      'graphs',
      'hash-map',
      'strings',
      'user-only',
    ]);
  });

  it('filters by tag and returns an empty no-match result when filters conflict', () => {
    const entries: HubKataEntry[] = [
      ...builtIns.map((kata) => ({ ...kata, source: 'builtin' as const })),
      {
        id: 'user-a',
        title: 'User A',
        difficulty: 'easy-medium',
        estimatedMinutes: 15,
        tags: ['demo', 'user-only'],
        source: 'user',
      },
    ];

    expect(filterKatasForLibrary(entries, '', 'all', 'all', 'user-only')).toMatchObject([
      { id: 'user-a' },
    ]);
    expect(filterKatasForLibrary(entries, '', 'all', 'builtin', 'user-only')).toEqual([]);
  });
});

describe('KataHubList', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.unstubAllGlobals();
  });

  it('renders filters, toolbar actions, and imported UserKatas', async () => {
    importUserKata(userKata, new Set(builtIns.map((kata) => kata.id)));

    await act(async () => {
      root.render(<KataHubList builtInKatas={builtIns} toolbarActions={<button>Import kata</button>} />);
    });

    expect(container.textContent).toContain('Import kata');
    expect(rowTitles(container)).toEqual(['Easy A', 'Easy B', 'User A', 'Medium B', 'Hard A']);

    const search = container.querySelector<HTMLInputElement>('input[type="search"]')!;
    await act(async () => {
      setInputValue(search, 'user');
    });

    expect(rowTitles(container)).toEqual(['User A']);
  });

  it('filters by source from the segmented control', async () => {
    importUserKata(userKata, new Set(builtIns.map((kata) => kata.id)));

    await act(async () => {
      root.render(<KataHubList builtInKatas={builtIns} />);
    });

    await act(async () => {
      [...container.querySelectorAll('button')]
        .find((button) => button.textContent === 'UserKata')!
        .click();
    });

    expect(rowTitles(container)).toEqual(['User A']);
    expect(container.textContent).toContain('1 of 5 katas');
  });

  it('filters by pattern from the generated tags control', async () => {
    importUserKata(
      { ...userKata, tags: ['user-only'] },
      new Set(builtIns.map((kata) => kata.id)),
    );

    await act(async () => {
      root.render(<KataHubList builtInKatas={builtIns} />);
    });

    const patternFilter = container.querySelector<HTMLSelectElement>(
      'select[aria-label="Pattern filter"]',
    )!;
    expect([...patternFilter.options].map((option) => option.value)).toContain('user-only');

    await act(async () => {
      setSelectValue(patternFilter, 'user-only');
    });

    expect(rowTitles(container)).toEqual(['User A']);
    expect(container.textContent).toContain('1 of 5 katas');

    await act(async () => {
      [...container.querySelectorAll('button')]
        .find((button) => button.textContent === 'Built-in')!
        .click();
    });

    expect(rowTitles(container)).toEqual([]);
    expect(container.textContent).toContain('0 of 5 katas');
    expect(container.textContent).toContain('No katas match the current filters.');
  });
});
