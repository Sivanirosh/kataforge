import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Checkpoint } from './checkpointSchema';
import {
  acknowledgeCheckpoint,
  answerCheckpointQuestion,
  ensureCheckpointAttempt,
  isCheckpointAttemptComplete,
  loadCheckpointAttempt,
  nextUnansweredQuestionId,
  retakeCheckpoint,
} from './checkpointAttempts';

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
      prompt: 'What is stored?',
      choices: [
        { id: 'a', text: 'value -> index' },
        { id: 'b', text: 'index -> value' },
      ],
      correctChoiceId: 'a',
      explanation: 'Store seen value to its index.',
    },
  ],
  reflections: [],
};

const reflectionOnly: Checkpoint = {
  id: 'cp-reflect',
  title: 'Reflection only',
  attachedKataId: 'two-sum',
  questions: [],
  reflections: [{ id: 'r1', prompt: 'Recall the invariant.', expectedAnswer: 'seen map' }],
};

describe('checkpointAttempts', () => {
  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('records selected choice and correctness for an answer', () => {
    const attempt = ensureCheckpointAttempt(checkpoint);
    const updated = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'b');
    expect(updated.selectedChoiceIds.q1).toBe('b');
    expect(updated.correctByQuestionId.q1).toBe(false);
    expect(updated.score).toEqual({ correct: 0, total: 2 });
    expect(loadCheckpointAttempt(checkpoint.id)?.selectedChoiceIds.q1).toBe('b');
  });

  it('locks an answered question against re-answering', () => {
    let attempt = ensureCheckpointAttempt(checkpoint);
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'b');
    const relocked = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'a');
    expect(relocked.selectedChoiceIds.q1).toBe('b');
    expect(relocked.correctByQuestionId.q1).toBe(false);
  });

  it('is not complete until all MCQs are answered', () => {
    let attempt = ensureCheckpointAttempt(checkpoint);
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'a');
    expect(isCheckpointAttemptComplete(attempt)).toBe(false);
    expect(nextUnansweredQuestionId(checkpoint, attempt)).toBe('q2');
  });

  it('completes with a score after all MCQs are answered', () => {
    let attempt = ensureCheckpointAttempt(checkpoint);
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'b');
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q2', 'a');
    expect(isCheckpointAttemptComplete(attempt)).toBe(true);
    expect(attempt.completedAt).not.toBeNull();
    expect(attempt.score).toEqual({ correct: 1, total: 2 });
    expect(nextUnansweredQuestionId(checkpoint, attempt)).toBeNull();
  });

  it('retake overwrites answers and increments the attempt number', () => {
    let attempt = ensureCheckpointAttempt(checkpoint);
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'a');
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q2', 'a');
    const retake = retakeCheckpoint(checkpoint);
    expect(retake.attemptNumber).toBe(2);
    expect(retake.selectedChoiceIds).toEqual({});
    expect(retake.completedAt).toBeNull();
    expect(loadCheckpointAttempt(checkpoint.id)?.attemptNumber).toBe(2);
  });

  it('completes a question-free checkpoint through acknowledgement', () => {
    const attempt = ensureCheckpointAttempt(reflectionOnly);
    expect(isCheckpointAttemptComplete(attempt)).toBe(false);
    const acknowledged = acknowledgeCheckpoint(reflectionOnly, attempt);
    expect(isCheckpointAttemptComplete(acknowledged)).toBe(true);
  });

  it('ignores acknowledgement for checkpoints that have MCQs', () => {
    const attempt = ensureCheckpointAttempt(checkpoint);
    const unchanged = acknowledgeCheckpoint(checkpoint, attempt);
    expect(unchanged.completedAt).toBeNull();
  });

  it('recovers from corrupted storage with a fresh attempt', () => {
    store.set('kataforge:checkpoint-attempt:cp-two-sum', '{not json');
    expect(loadCheckpointAttempt(checkpoint.id)).toBeNull();
    const attempt = ensureCheckpointAttempt(checkpoint);
    expect(attempt.attemptNumber).toBe(1);
    expect(attempt.selectedChoiceIds).toEqual({});
  });

  it('rejects a structurally invalid stored attempt', () => {
    store.set(
      'kataforge:checkpoint-attempt:cp-two-sum',
      JSON.stringify({ checkpointId: 'cp-two-sum', selectedChoiceIds: [1], attemptNumber: 0 }),
    );
    expect(loadCheckpointAttempt(checkpoint.id)).toBeNull();
    expect(store.has('kataforge:checkpoint-attempt:cp-two-sum')).toBe(false);
  });

  it('never creates Assessment score keys', () => {
    let attempt = ensureCheckpointAttempt(checkpoint);
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q1', 'a');
    attempt = answerCheckpointQuestion(checkpoint, attempt, 'q2', 'a');
    retakeCheckpoint(checkpoint);
    const keys = [...store.keys()];
    expect(keys.every((key) => !key.startsWith('kataforge:score:'))).toBe(true);
    expect(keys.every((key) => !key.startsWith('kataforge:session:'))).toBe(true);
  });
});
