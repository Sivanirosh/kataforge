import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CheckpointView from './CheckpointView';
import type { Checkpoint } from '../lib/checkpointSchema';

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

const checkpoint: Checkpoint = {
  id: 'cp-two-sum',
  title: 'Two Sum Self-check',
  attachedKataId: 'two-sum',
  questions: [
    {
      id: 'q1',
      prompt: 'Why a hash map?',
      choices: [
        { id: 'a', text: 'O(1) lookups' },
        { id: 'b', text: 'Sorting is free' },
      ],
      correctChoiceId: 'a',
      explanation: 'Hash map lookups are amortized O(1).',
    },
    {
      id: 'q2',
      prompt: 'What does the map store?',
      choices: [
        { id: 'a', text: 'value to index' },
        { id: 'b', text: 'index to value' },
      ],
      correctChoiceId: 'a',
      explanation: 'Store each seen value mapped to its index.',
    },
  ],
  reflections: [
    { id: 'r1', prompt: 'When would sorting win?', expectedAnswer: 'When indices are not needed.' },
  ],
};

const reflectionOnly: Checkpoint = {
  id: 'cp-reflect',
  title: 'Reflection only',
  attachedKataId: 'two-sum',
  questions: [],
  reflections: [{ id: 'r1', prompt: 'Recall the invariant.', expectedAnswer: 'seen map' }],
};

describe('CheckpointView', () => {
  let container: HTMLDivElement;
  let root: Root;
  let onSoftGateComplete: ReturnType<typeof vi.fn>;
  let onContinue: ReturnType<typeof vi.fn>;
  let onGoToAttachedKata: ReturnType<typeof vi.fn>;

  function render(props: Partial<React.ComponentProps<typeof CheckpointView>> = {}) {
    act(() => {
      root.render(
        <CheckpointView
          checkpoint={checkpoint}
          attachedKataTitle="Two Sum"
          locked={false}
          onGoToAttachedKata={onGoToAttachedKata}
          onSoftGateComplete={onSoftGateComplete}
          onContinue={onContinue}
          {...props}
        />,
      );
    });
  }

  function clickButton(label: string) {
    const button = [...container.querySelectorAll('button')].find((entry) =>
      entry.textContent?.includes(label),
    );
    expect(button, `button "${label}"`).toBeTruthy();
    act(() => {
      button!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  }

  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
    onSoftGateComplete = vi.fn();
    onContinue = vi.fn();
    onGoToAttachedKata = vi.fn();
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

  it('locked state shows attached Kata context and return action', () => {
    render({ locked: true });
    expect(container.textContent).toContain('Locked');
    expect(container.textContent).toContain('Two Sum');
    clickButton('Go to Two Sum');
    expect(onGoToAttachedKata).toHaveBeenCalledOnce();
    expect(container.textContent).not.toContain('Why a hash map?');
  });

  it('shows one MCQ at a time', () => {
    render();
    expect(container.textContent).toContain('Question 1 of 2');
    expect(container.textContent).toContain('Why a hash map?');
    expect(container.textContent).not.toContain('What does the map store?');
  });

  it('selecting an answer locks choices and reveals the explanation', () => {
    render();
    clickButton('Sorting is free');
    expect(container.textContent).toContain('Not quite.');
    expect(container.textContent).toContain('Hash map lookups are amortized O(1).');
    const choices = [...container.querySelectorAll('button.checkpoint-choice')];
    expect(choices.every((choice) => (choice as HTMLButtonElement).disabled)).toBe(true);
  });

  it('completes with compact score, Continue, and review mode', () => {
    render();
    clickButton('Sorting is free');
    clickButton('Next question');
    expect(container.textContent).toContain('Question 2 of 2');
    clickButton('value to index');
    expect(container.textContent).toContain('Correct.');
    clickButton('Finish self-check');
    expect(container.textContent).toContain('1/2 correct');
    expect(container.textContent).toContain('Attempt 1');
    expect(onSoftGateComplete).toHaveBeenCalledWith({ correct: 1, total: 2 });
    expect(container.textContent).toContain('When would sorting win?');
    clickButton('Continue');
    expect(onContinue).toHaveBeenCalledOnce();
  });

  it('reopens a completed attempt in review mode and supports retake', () => {
    render();
    clickButton('Sorting is free');
    clickButton('Next question');
    clickButton('value to index');
    clickButton('Finish self-check');
    act(() => {
      root.unmount();
    });
    root = createRoot(container);
    render();
    expect(container.textContent).toContain('1/2 correct');
    clickButton('Retake');
    expect(container.textContent).toContain('Retaking overwrites these answers.');
    clickButton('Start retake');
    expect(container.textContent).toContain('Question 1 of 2');
  });

  it('resumes at the next unanswered question after reload', () => {
    render();
    clickButton('Sorting is free');
    act(() => {
      root.unmount();
    });
    root = createRoot(container);
    render();
    expect(container.textContent).toContain('Question 2 of 2');
  });

  it('question-free checkpoint completes through acknowledgement', () => {
    render({ checkpoint: reflectionOnly });
    expect(container.textContent).toContain('Recall the invariant.');
    clickButton('Mark as reviewed');
    expect(onSoftGateComplete).toHaveBeenCalledWith({ correct: 0, total: 0 });
    expect(container.textContent).toContain('Continue');
  });
});
