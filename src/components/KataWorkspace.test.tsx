import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TestResult } from '../lib/configTypes';

// Monaco does not run in jsdom — replace the editor with a plain textarea that
// still exposes value/onChange and the run/submit shortcuts.
vi.mock('./CodeEditor', () => ({
  default: ({
    value,
    onChange,
    onRunSamples,
    onSubmit,
  }: {
    value: string;
    onChange: (v: string) => void;
    onRunSamples?: () => void;
    onSubmit?: () => void;
  }) => (
    <div>
      <textarea
        aria-label="code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" onClick={onRunSamples}>
        kbd-samples
      </button>
      <button type="button" onClick={onSubmit}>
        kbd-submit
      </button>
    </div>
  ),
}));

const runMock = vi.fn();
vi.mock('../lib/judgeClient', () => ({
  judgeClient: { run: (req: unknown) => runMock(req) },
}));

import KataWorkspace, { type KataData } from './KataWorkspace';

const store = new Map<string, string>();
function createLocalStorageMock() {
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
}

const kata: KataData = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  estimatedMinutes: 15,
  functionName: 'two_sum',
  tags: ['arrays'],
  hints: ['Try a small input first.', 'Track seen values without revealing code.'],
  starterCode: 'def two_sum(nums, target):\n    pass\n',
  solutionCode: 'def two_sum(nums, target):\n    return []\n',
  solutionExplanationHtml: '<p>Use a hash map.</p>',
  tests: [
    { id: 't1', name: 'sample', hidden: false, args: [] } as never,
    { id: 't2', name: 'hidden', hidden: true, args: [] } as never,
  ],
  bodyHtml: '<p>Find two numbers.</p>',
};

function pass(id: string): TestResult {
  return { testId: id, name: id, hidden: false, status: 'passed', durationMs: 1 } as TestResult;
}
function fail(id: string): TestResult {
  return { testId: id, name: id, hidden: false, status: 'failed', durationMs: 1 } as TestResult;
}

const judgeConfig = { sampleTimeoutMs: 2000, submitTimeoutMs: 3000 };

describe('KataWorkspace', () => {
  let container: HTMLDivElement;
  let root: Root;
  let onSubmit: ReturnType<typeof vi.fn>;

  function render(props: Partial<React.ComponentProps<typeof KataWorkspace>> = {}) {
    act(() => {
      root.render(
        <KataWorkspace kata={kata} judgeConfig={judgeConfig} onSubmit={onSubmit} {...props} />,
      );
    });
  }

  async function clickText(label: string) {
    const button = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes(label),
    );
    expect(button, `button "${label}"`).toBeTruthy();
    await act(async () => {
      button!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
    });
  }

  beforeEach(() => {
    store.clear();
    runMock.mockReset();
    vi.stubGlobal('localStorage', createLocalStorageMock());
    onSubmit = vi.fn();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it('loads starter code, or a saved draft when present', () => {
    store.set('kataforge:draft:two-sum', 'my draft');
    render();
    const editor = container.querySelector('textarea') as HTMLTextAreaElement;
    expect(editor.value).toBe('my draft');
  });

  it('Run Samples sends only non-hidden tests and does not persist or report a submit', async () => {
    runMock.mockResolvedValue({ requestId: 'r', results: [pass('t1')] });
    render();
    await clickText('Run Samples');
    const sent = runMock.mock.calls[0][0] as { tests: { id: string }[] };
    expect(sent.tests.map((t) => t.id)).toEqual(['t1']);
    expect(store.get('kataforge:results:two-sum')).toBeUndefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('Submit all-pass persists results, reports allPassed, and shows no solution', async () => {
    runMock.mockResolvedValue({ requestId: 'r', results: [pass('t1'), pass('t2')] });
    render();
    await clickText('Submit');
    expect(JSON.parse(store.get('kataforge:results:two-sum')!)).toHaveLength(2);
    expect(onSubmit).toHaveBeenCalledWith({
      results: [pass('t1'), pass('t2')],
      allPassed: true,
    });
    expect(container.textContent).not.toContain('View solution and explanation');
  });

  it('Submit with a failure reports allPassed=false and reveals the solution', async () => {
    runMock.mockResolvedValue({ requestId: 'r', results: [pass('t1'), fail('t2')] });
    render();
    await clickText('Submit');
    expect(onSubmit).toHaveBeenCalledWith({
      results: [pass('t1'), fail('t2')],
      allPassed: false,
    });
    expect(container.textContent).toContain('View solution and explanation');
  });

  it('Submit sends all tests including hidden ones', async () => {
    runMock.mockResolvedValue({ requestId: 'r', results: [pass('t1'), pass('t2')] });
    render();
    await clickText('Submit');
    const sent = runMock.mock.calls[0][0] as { tests: { id: string }[] };
    expect(sent.tests.map((t) => t.id)).toEqual(['t1', 't2']);
  });

  it('hydrates from previously saved results on mount', () => {
    store.set('kataforge:results:two-sum', JSON.stringify([pass('t1')]));
    render();
    expect(container.textContent).toContain('sample');
  });
});
