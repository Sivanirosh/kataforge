import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ProblemStatement from './ProblemStatement';

describe('ProblemStatement hint ladder', () => {
  let container: HTMLDivElement;
  let root: Root;

  function render(hints: string[] = []) {
    act(() => {
      root.render(
        <ProblemStatement
          title="Two Sum"
          difficulty="easy"
          estimatedMinutes={15}
          tags={['arrays']}
          hints={hints}
          body="<p>Find two numbers.</p>"
        />,
      );
    });
  }

  function button(): HTMLButtonElement {
    const found = container.querySelector('button');
    expect(found).toBeTruthy();
    return found!;
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('does not render an empty ladder when no hints are available', () => {
    render();
    expect(container.textContent).not.toContain('Hint ladder');
    expect(container.querySelector('button')).toBeNull();
  });

  it('reveals hints progressively without showing solution content', () => {
    render([
      'Check whether the sample would work with a simple nested loop.',
      'Keep a lookup of values you have already passed while scanning once.',
    ]);

    expect(container.textContent).toContain('Hint ladder');
    expect(container.textContent).not.toContain('simple nested loop');
    expect(button().textContent).toBe('Show hint 1 of 2');

    act(() => {
      button().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.textContent).toContain('Check whether the sample');
    expect(container.textContent).not.toContain('Keep a lookup');
    expect(button().textContent).toBe('Show hint 2 of 2');

    act(() => {
      button().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.textContent).toContain('Keep a lookup');
    expect(button().textContent).toBe('All hints revealed');
    expect(button().disabled).toBe(true);
    expect(container.textContent).not.toContain('def two_sum');
    expect(container.textContent).not.toContain('Use a hash map.');
  });
});
