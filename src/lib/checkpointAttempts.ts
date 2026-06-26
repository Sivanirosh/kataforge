import type { Checkpoint } from './checkpointSchema';

const ATTEMPT_KEY_PREFIX = 'kataforge:checkpoint-attempt:';

function attemptKey(checkpointId: string): string {
  return `${ATTEMPT_KEY_PREFIX}${checkpointId}`;
}

export interface CheckpointAttempt {
  checkpointId: string;
  selectedChoiceIds: Record<string, string>;
  correctByQuestionId: Record<string, boolean>;
  score: {
    correct: number;
    total: number;
  };
  attemptNumber: number;
  completedAt: number | null;
}

function isRecordOf(
  value: unknown,
  check: (entry: unknown) => boolean,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(check)
  );
}

/** Structural check so a corrupted or stale payload never reaches the UI. */
function isValidAttempt(value: unknown, checkpointId: string): value is CheckpointAttempt {
  if (typeof value !== 'object' || value === null) return false;
  const attempt = value as Partial<CheckpointAttempt>;
  return (
    attempt.checkpointId === checkpointId &&
    isRecordOf(attempt.selectedChoiceIds, (entry) => typeof entry === 'string') &&
    isRecordOf(attempt.correctByQuestionId, (entry) => typeof entry === 'boolean') &&
    typeof attempt.score === 'object' &&
    attempt.score !== null &&
    typeof attempt.score.correct === 'number' &&
    typeof attempt.score.total === 'number' &&
    typeof attempt.attemptNumber === 'number' &&
    attempt.attemptNumber >= 1 &&
    (attempt.completedAt === null || typeof attempt.completedAt === 'number')
  );
}

function persistAttempt(attempt: CheckpointAttempt): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(attemptKey(attempt.checkpointId), JSON.stringify(attempt));
}

export function loadCheckpointAttempt(checkpointId: string): CheckpointAttempt | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(attemptKey(checkpointId));
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isValidAttempt(parsed, checkpointId)) return parsed;
  } catch {
    // fall through to clearing the corrupted entry
  }
  localStorage.removeItem(attemptKey(checkpointId));
  return null;
}

function newAttempt(checkpoint: Checkpoint, attemptNumber: number): CheckpointAttempt {
  return {
    checkpointId: checkpoint.id,
    selectedChoiceIds: {},
    correctByQuestionId: {},
    score: { correct: 0, total: checkpoint.questions.length },
    attemptNumber,
    completedAt: null,
  };
}

/** Latest valid attempt, or a fresh attempt #1 persisted in its place. */
export function ensureCheckpointAttempt(checkpoint: Checkpoint): CheckpointAttempt {
  const existing = loadCheckpointAttempt(checkpoint.id);
  if (existing) return existing;
  const attempt = newAttempt(checkpoint, 1);
  persistAttempt(attempt);
  return attempt;
}

/** Retake: overwrite the latest attempt, keeping the incremented attempt number. */
export function retakeCheckpoint(checkpoint: Checkpoint): CheckpointAttempt {
  const previous = loadCheckpointAttempt(checkpoint.id);
  const attempt = newAttempt(checkpoint, (previous?.attemptNumber ?? 0) + 1);
  persistAttempt(attempt);
  return attempt;
}

/**
 * Record an answer for the current attempt. Answers are locked: a second
 * selection for an already-answered question is ignored. Completion (the
 * Soft Gate) is reached when every MCQ has an answer.
 */
export function answerCheckpointQuestion(
  checkpoint: Checkpoint,
  attempt: CheckpointAttempt,
  questionId: string,
  choiceId: string,
): CheckpointAttempt {
  const question = checkpoint.questions.find((entry) => entry.id === questionId);
  if (!question) return attempt;
  if (attempt.selectedChoiceIds[questionId] !== undefined) return attempt;
  if (!question.choices.some((choice) => choice.id === choiceId)) return attempt;

  const correct = question.correctChoiceId === choiceId;
  const correctByQuestionId = { ...attempt.correctByQuestionId, [questionId]: correct };
  const selectedChoiceIds = { ...attempt.selectedChoiceIds, [questionId]: choiceId };
  const answeredAll = checkpoint.questions.every(
    (entry) => selectedChoiceIds[entry.id] !== undefined,
  );

  const updated: CheckpointAttempt = {
    ...attempt,
    selectedChoiceIds,
    correctByQuestionId,
    score: {
      correct: Object.values(correctByQuestionId).filter(Boolean).length,
      total: checkpoint.questions.length,
    },
    completedAt: answeredAll ? Date.now() : attempt.completedAt,
  };
  persistAttempt(updated);
  return updated;
}

/** Soft Gate for a Checkpoint with no MCQs: explicit acknowledgement. */
export function acknowledgeCheckpoint(
  checkpoint: Checkpoint,
  attempt: CheckpointAttempt,
): CheckpointAttempt {
  if (checkpoint.questions.length > 0 || attempt.completedAt !== null) return attempt;
  const updated: CheckpointAttempt = { ...attempt, completedAt: Date.now() };
  persistAttempt(updated);
  return updated;
}

export function isCheckpointAttemptComplete(attempt: CheckpointAttempt): boolean {
  return attempt.completedAt !== null;
}

/** First MCQ without a locked answer; null when all are answered. */
export function nextUnansweredQuestionId(
  checkpoint: Checkpoint,
  attempt: CheckpointAttempt,
): string | null {
  const next = checkpoint.questions.find(
    (question) => attempt.selectedChoiceIds[question.id] === undefined,
  );
  return next?.id ?? null;
}
