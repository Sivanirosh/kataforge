import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import TestPanel from './TestPanel';

describe('TestPanel', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('shows judge error banner when run fails', async () => {
    await act(async () => {
      root.render(
        <TestPanel
          results={null}
          loading={false}
          mode={null}
          error="Worker failed to execute"
        />,
      );
    });

    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      'Worker failed to execute',
    );
  });

  it('shows Python runtime loading message on first run', async () => {
    await act(async () => {
      root.render(
        <TestPanel results={null} loading={true} mode="samples" loadingPhase="runtime" />,
      );
    });

    expect(container.textContent).toContain('Loading Python runtime');
  });
});
