import { useEffect, useState } from 'react';
import { ArrowRight, Check, Lightbulb, Lock, RotateCcw, Sparkles, X } from 'lucide-react';
import type { Checkpoint, CheckpointQuestion } from '../lib/checkpointSchema';
import {
  acknowledgeCheckpoint,
  answerCheckpointQuestion,
  ensureCheckpointAttempt,
  isCheckpointAttemptComplete,
  nextUnansweredQuestionId,
  retakeCheckpoint,
  type CheckpointAttempt,
} from '../lib/checkpointAttempts';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CheckpointViewProps {
  checkpoint: Checkpoint;
  attachedKataTitle: string;
  locked: boolean;
  onGoToAttachedKata: (() => void) | null;
  onSoftGateComplete: (score: { correct: number; total: number }) => void;
  onContinue: (() => void) | null;
}

/** Tailwind classes for a single answer choice. Keeps the `checkpoint-choice`
    marker class (used by tests + as a stable hook) as the first token. */
function choiceClass(
  question: CheckpointQuestion,
  attempt: CheckpointAttempt,
  choiceId: string,
): string {
  const selected = attempt.selectedChoiceIds[question.id];
  const base =
    'checkpoint-choice flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.95rem] leading-snug transition-all duration-150';
  if (selected === undefined) {
    return cn(
      base,
      'cursor-pointer border-border bg-card text-foreground hover:border-muted-foreground/40 hover:bg-accent active:scale-[0.99]',
    );
  }
  const isCorrect = choiceId === question.correctChoiceId;
  const isChosen = choiceId === selected;
  return cn(
    base,
    'cursor-default',
    isCorrect && 'border-success/50 bg-success/10 text-foreground',
    isChosen && !isCorrect && 'border-destructive/50 bg-destructive/10 text-foreground',
    !isCorrect && !isChosen && 'border-border bg-card text-muted-foreground',
  );
}

function SelfCheckHeader({
  title,
  context,
  locked = false,
}: {
  title: string;
  context?: string;
  locked?: boolean;
}) {
  return (
    <header className="mb-5">
      <Badge variant="secondary" className="mb-2.5 gap-1.5 font-medium">
        <Sparkles aria-hidden />
        Self-check{locked ? ' · Locked' : ''}
      </Badge>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {context ? <p className="mt-1.5 text-sm text-muted-foreground">{context}</p> : null}
    </header>
  );
}

function Reflections({ checkpoint }: { checkpoint: Checkpoint }) {
  if (checkpoint.reflections.length === 0) return null;
  return (
    <div className="checkpoint-reflections mt-6">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Lightbulb className="size-3.5" aria-hidden />
        Reflect
      </h3>
      <div className="grid gap-2">
        {checkpoint.reflections.map((reflection) => (
          <details
            key={reflection.id}
            className="checkpoint-reflection group rounded-lg border border-border bg-card transition-colors hover:border-muted-foreground/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {reflection.prompt}
              <ArrowRight
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90"
                aria-hidden
              />
            </summary>
            <p className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {reflection.expectedAnswer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

function QuestionCard({
  checkpoint,
  question,
  attempt,
  questionNumber,
  onAnswer,
  onAdvance,
  isLast,
}: {
  checkpoint: Checkpoint;
  question: CheckpointQuestion;
  attempt: CheckpointAttempt;
  questionNumber: number;
  onAnswer: (questionId: string, choiceId: string) => void;
  onAdvance: () => void;
  isLast: boolean;
}) {
  const total = checkpoint.questions.length;
  const selected = attempt.selectedChoiceIds[question.id];
  const answered = selected !== undefined;
  const correct = attempt.correctByQuestionId[question.id] === true;

  return (
    <div className="checkpoint-question">
      <div className="mb-4 flex items-center gap-4">
        <p className="checkpoint-progress font-mono text-xs text-muted-foreground" aria-live="polite">
          Question {questionNumber} of {total}
        </p>
        <Progress value={(questionNumber / total) * 100} className="h-1.5 flex-1" />
      </div>
      <h2 className="checkpoint-prompt mb-4 text-lg font-semibold leading-snug text-foreground">
        {question.prompt}
      </h2>
      <div className="checkpoint-choices grid gap-2.5" role="group" aria-label="Answer choices">
        {question.choices.map((choice) => {
          const isChosen = selected === choice.id;
          const isCorrectChoice = choice.id === question.correctChoiceId;
          return (
            <button
              key={choice.id}
              type="button"
              className={choiceClass(question, attempt, choice.id)}
              disabled={answered}
              aria-pressed={isChosen}
              onClick={() => onAnswer(question.id, choice.id)}
            >
              <span className="flex-1">{choice.text}</span>
              {answered && isCorrectChoice ? (
                <Check className="size-4 shrink-0 text-success" aria-hidden />
              ) : null}
              {answered && isChosen && !isCorrectChoice ? (
                <X className="size-4 shrink-0 text-destructive" aria-hidden />
              ) : null}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {answered ? (
          <div
            className={cn(
              'checkpoint-feedback mt-4 rounded-lg border p-4',
              correct ? 'border-success/40 bg-success/5' : 'border-destructive/40 bg-destructive/5',
            )}
          >
            <p
              className={cn(
                'mb-1.5 flex items-center gap-1.5 text-sm font-bold',
                correct ? 'text-success' : 'text-destructive',
              )}
            >
              {correct ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
              {correct ? 'Correct.' : 'Not quite.'}
            </p>
            <p className="mb-3 text-sm leading-relaxed text-foreground/90">{question.explanation}</p>
            <Button type="button" size="sm" onClick={onAdvance}>
              {isLast ? 'Finish self-check' : 'Next question'}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ReviewQuestion({
  question,
  attempt,
  index,
}: {
  question: CheckpointQuestion;
  attempt: CheckpointAttempt;
  index: number;
}) {
  const correct = attempt.correctByQuestionId[question.id] === true;
  const selected = attempt.selectedChoiceIds[question.id];
  return (
    <div className="checkpoint-review-item rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-start gap-2.5">
        <span
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-white',
            correct ? 'bg-success' : 'bg-destructive',
          )}
          aria-hidden
        >
          {correct ? <Check className="size-3" /> : <X className="size-3" />}
        </span>
        <p className="checkpoint-prompt text-sm font-semibold leading-snug text-foreground">
          <span className="text-muted-foreground">Q{index + 1}.</span> {question.prompt}
        </p>
      </div>
      <div className="grid gap-1.5 pl-7">
        {question.choices.map((choice) => {
          const isChosen = selected === choice.id;
          const isCorrectChoice = choice.id === question.correctChoiceId;
          return (
            <div
              key={choice.id}
              className={cn(
                'flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm',
                isCorrectChoice && 'border-success/50 bg-success/10 text-foreground',
                isChosen && !isCorrectChoice && 'border-destructive/50 bg-destructive/10 text-foreground',
                !isCorrectChoice && !isChosen && 'border-transparent text-muted-foreground',
              )}
            >
              <span className="flex-1">{choice.text}</span>
              {isCorrectChoice ? <Check className="size-3.5 shrink-0 text-success" aria-hidden /> : null}
              {isChosen && !isCorrectChoice ? <X className="size-3.5 shrink-0 text-destructive" aria-hidden /> : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">{question.explanation}</p>
    </div>
  );
}

export default function CheckpointView({
  checkpoint,
  attachedKataTitle,
  locked,
  onGoToAttachedKata,
  onSoftGateComplete,
  onContinue,
}: CheckpointViewProps) {
  const [attempt, setAttempt] = useState<CheckpointAttempt | null>(null);
  const [viewQuestionId, setViewQuestionId] = useState<string | null>(null);
  const [confirmingRetake, setConfirmingRetake] = useState(false);

  useEffect(() => {
    if (!locked) {
      setAttempt(ensureCheckpointAttempt(checkpoint));
    }
  }, [checkpoint, locked]);

  const complete = attempt !== null && isCheckpointAttemptComplete(attempt);

  useEffect(() => {
    if (attempt && isCheckpointAttemptComplete(attempt)) {
      onSoftGateComplete(attempt.score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt?.completedAt]);

  if (locked) {
    return (
      <article className="kf-ui cursus-lesson checkpoint-locked">
        <div className="mx-auto w-full max-w-2xl">
          <SelfCheckHeader title={checkpoint.title} locked />
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-start gap-4 py-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Lock className="size-5" aria-hidden />
              </span>
              <p className="checkpoint-locked-hint text-[0.95rem] leading-relaxed text-muted-foreground">
                This self-check consolidates <strong className="text-foreground">{attachedKataTitle}</strong>.
                Solve that kata first — its questions may reveal the insight.
              </p>
              {onGoToAttachedKata ? (
                <Button type="button" onClick={onGoToAttachedKata}>
                  Go to {attachedKataTitle}
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </article>
    );
  }

  if (!attempt) {
    return <p className="cursus-empty">Loading self-check…</p>;
  }

  const handleAnswer = (questionId: string, choiceId: string) => {
    setViewQuestionId(questionId);
    setAttempt(answerCheckpointQuestion(checkpoint, attempt, questionId, choiceId));
  };

  const handleAdvance = () => {
    setViewQuestionId(null);
  };

  const handleRetake = () => {
    setAttempt(retakeCheckpoint(checkpoint));
    setViewQuestionId(null);
    setConfirmingRetake(false);
  };

  const context = `After: ${attachedKataTitle}`;

  // Question-free checkpoint: reflections plus an acknowledgement Soft Gate.
  if (checkpoint.questions.length === 0) {
    return (
      <article className="kf-ui cursus-lesson checkpoint">
        <div className="mx-auto w-full max-w-2xl">
          <SelfCheckHeader title={checkpoint.title} context={context} />
          <Reflections checkpoint={checkpoint} />
          <footer className="cursus-lesson-footer mt-8 flex justify-end border-t border-border pt-5">
            {complete ? (
              onContinue ? (
                <Button type="button" onClick={onContinue}>
                  Continue
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Button>
              ) : null
            ) : (
              <Button type="button" onClick={() => setAttempt(acknowledgeCheckpoint(checkpoint, attempt))}>
                <Check data-icon="inline-start" aria-hidden />
                Mark as reviewed
              </Button>
            )}
          </footer>
        </div>
      </article>
    );
  }

  if (complete && viewQuestionId === null) {
    const pct = Math.round((attempt.score.correct / Math.max(attempt.score.total, 1)) * 100);
    const aced = attempt.score.correct === attempt.score.total;
    return (
      <article className="kf-ui cursus-lesson checkpoint">
        <div className="mx-auto w-full max-w-2xl">
          <SelfCheckHeader title={checkpoint.title} context={context} />
          <Card className="checkpoint-summary mb-5 overflow-hidden">
            <CardContent className="flex items-center gap-4 py-1">
              <div
                className={cn(
                  'flex size-14 shrink-0 flex-col items-center justify-center rounded-full font-mono text-sm font-bold',
                  aced ? 'bg-success/15 text-success' : 'bg-primary/12 text-primary',
                )}
                aria-hidden
              >
                {pct}%
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground">
                  <span className="checkpoint-score-pill">
                    {attempt.score.correct}/{attempt.score.total} correct
                  </span>
                </p>
                <p className="checkpoint-attempt-note mt-0.5 text-sm text-muted-foreground">
                  Attempt {attempt.attemptNumber} · {aced ? 'Nailed it.' : 'Review the explanations below.'}
                </p>
                <Progress value={pct} className="mt-2 h-1.5" />
              </div>
            </CardContent>
          </Card>

          <div className="checkpoint-review grid gap-3">
            {checkpoint.questions.map((question, index) => (
              <ReviewQuestion key={question.id} question={question} attempt={attempt} index={index} />
            ))}
          </div>

          <Reflections checkpoint={checkpoint} />

          <footer className="cursus-lesson-footer checkpoint-review-actions mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            {confirmingRetake ? (
              <>
                <span className="checkpoint-retake-warning mr-auto text-sm text-[color:var(--warning)]">
                  Retaking overwrites these answers.
                </span>
                <Button type="button" variant="ghost" onClick={() => setConfirmingRetake(false)}>
                  Keep answers
                </Button>
                <Button type="button" onClick={handleRetake}>
                  Start retake
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="ghost" onClick={() => setConfirmingRetake(true)}>
                  <RotateCcw data-icon="inline-start" aria-hidden />
                  Retake
                </Button>
                {onContinue ? (
                  <Button type="button" className="ml-auto" onClick={onContinue}>
                    Continue
                    <ArrowRight data-icon="inline-end" aria-hidden />
                  </Button>
                ) : null}
              </>
            )}
          </footer>
        </div>
      </article>
    );
  }

  const activeQuestionId = viewQuestionId ?? nextUnansweredQuestionId(checkpoint, attempt);
  const activeQuestion = checkpoint.questions.find((entry) => entry.id === activeQuestionId);
  if (!activeQuestion) {
    return <p className="cursus-empty">Self-check question not found.</p>;
  }
  const questionNumber =
    checkpoint.questions.findIndex((entry) => entry.id === activeQuestion.id) + 1;

  return (
    <article className="kf-ui cursus-lesson checkpoint">
      <div className="mx-auto w-full max-w-2xl">
        <SelfCheckHeader title={checkpoint.title} context={context} />
        <Card>
          <CardContent className="py-1">
            <QuestionCard
              checkpoint={checkpoint}
              question={activeQuestion}
              attempt={attempt}
              questionNumber={questionNumber}
              onAnswer={handleAnswer}
              onAdvance={handleAdvance}
              isLast={questionNumber === checkpoint.questions.length}
            />
          </CardContent>
        </Card>
      </div>
    </article>
  );
}
