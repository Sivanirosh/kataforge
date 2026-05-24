import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ResultsPage from './ResultsPage';
import type { TestResult } from '../lib/configTypes';

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

const passedVisible: TestResult = {
  testId: 'v1',
  name: 'visible pass',
  hidden: false,
  status: 'passed',
  durationMs: 1,
};

const failedVisible: TestResult = {
  testId: 'v2',
  name: 'visible fail',
  hidden: false,
  status: 'failed',
  expected: [0, 1],
  actual: [],
  durationMs: 1,
};

const failedHidden: TestResult = {
  testId: 'h1',
  name: 'hidden fail',
  hidden: true,
  status: 'failed',
  durationMs: 1,
};

describe('ResultsPage', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:05:00Z'));
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());

    store.set(
      'kataforge:session:demo',
      JSON.stringify({
        assessmentId: 'demo',
        startedAt: new Date('2026-01-01T00:00:00Z').getTime(),
        durationMinutes: null,
        currentKataIndex: 0,
        submitted: true,
      }),
    );
    store.set(
      'kataforge:results:kata-a',
      JSON.stringify([passedVisible, failedVisible, failedHidden]),
    );
    store.set('kataforge:results:kata-b', JSON.stringify([passedVisible]));

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('renders review details and solution for incomplete katas', async () => {
    await act(async () => {
      root.render(
        <ResultsPage
          assessmentId="demo"
          kataIds={['kata-a', 'kata-b']}
          kataTitles={{ 'kata-a': 'Kata A', 'kata-b': 'Kata B' }}
          kataSolutions={{
            'kata-a': {
              solutionCode: 'def solve():\n    return 1',
              solutionExplanationHtml: '<p>Use a hash map.</p>',
            },
          }}
          durationMinutes={null}
        />,
      );
    });

    expect(container.textContent).toContain('50%');
    expect(container.textContent).toContain('2/4 tests passed');
    expect(container.textContent).toContain('5m 0s');
    expect(container.textContent).toContain('Kata A');
    expect(container.textContent).toContain('Kata B');
    expect(container.textContent).toContain('Where you missed');
    expect(container.textContent).toContain('visible fail');
    expect(container.textContent).toContain('hidden fail');
    expect(container.textContent).toContain('Expected:');
    expect(container.textContent).toContain('[0,1]');
    expect(container.textContent).toContain('View solution and explanation');
    expect(container.textContent).toContain('def solve():');
    expect(store.get('kataforge:score:demo')).toBeTruthy();
  });
});
