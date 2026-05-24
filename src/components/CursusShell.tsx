import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Cursus } from '../lib/cursusSchema';
import {
  countCursusSteps,
  flattenCursusSteps,
  getFlatStep,
  type FlatCursusStep,
} from '../lib/cursusSteps';
import type { LessonData } from '../lib/loadLessons';
import type { KataData } from './AssessmentShell';
import CursusKataStep from './CursusKataStep';
import LessonView from './LessonView';
import {
  cursusCompletionPercent,
  ensureCursusProgress,
  isCursusStepComplete,
  markCursusStepComplete,
} from '../lib/storage';

interface CursusShellProps {
  cursus: Cursus;
  currentGlobalIndex: number;
  lessonMap: Record<string, LessonData>;
  kataMap: Record<string, KataData>;
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
  brandingTitle: string;
}

function stepLabel(
  flat: FlatCursusStep,
  lessonMap: Record<string, LessonData>,
  kataMap: Record<string, KataData>,
): string {
  if (flat.step.type === 'lesson') {
    return lessonMap[flat.step.lessonId]?.title ?? flat.step.lessonId;
  }
  return kataMap[flat.step.kataId]?.title ?? flat.step.kataId;
}

export default function CursusShell({
  cursus,
  currentGlobalIndex,
  lessonMap,
  kataMap,
  judgeConfig,
  brandingTitle,
}: CursusShellProps) {
  const flatSteps = useMemo(() => flattenCursusSteps(cursus), [cursus]);
  const current = getFlatStep(cursus, currentGlobalIndex);
  const totalSteps = countCursusSteps(cursus);
  const [progressTick, setProgressTick] = useState(0);

  useEffect(() => {
    if (current) {
      ensureCursusProgress(cursus.id, current.key);
    }
  }, [cursus.id, current?.key]);

  const completionPercent = useMemo(
    () => cursusCompletionPercent(cursus.id, totalSteps),
    [cursus.id, totalSteps, progressTick],
  );

  const navigateTo = useCallback(
    (index: number) => {
      window.location.href = `/cursus/${cursus.id}/step/${index}`;
    },
    [cursus.id],
  );

  const handleLessonContinue = useCallback(() => {
    if (!current) return;
    markCursusStepComplete(cursus.id, current.key);
    setProgressTick((n) => n + 1);
    if (currentGlobalIndex < flatSteps.length - 1) {
      navigateTo(currentGlobalIndex + 1);
    }
  }, [current, cursus.id, currentGlobalIndex, flatSteps.length, navigateTo]);

  const handleKataSuccess = useCallback(() => {
    if (!current) return;
    markCursusStepComplete(cursus.id, current.key);
    setProgressTick((n) => n + 1);
  }, [current, cursus.id]);

  if (!current) {
    return <p className="p-6 text-foreground">Step not found.</p>;
  }

  const currentComplete = isCursusStepComplete(cursus.id, current.key);
  const canGoNext = currentComplete && currentGlobalIndex < flatSteps.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div>
          <a href="/" className="text-sm text-neutral-500 hover:text-primary">
            {brandingTitle}
          </a>
          <h1 className="text-lg font-semibold">{cursus.title}</h1>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">{completionPercent}% complete</div>
          <div className="text-neutral-500">
            Step {currentGlobalIndex + 1} of {totalSteps}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950 md:block">
          {cursus.modules.map((mod) => (
            <section key={mod.id} className="mb-6">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {mod.title}
              </h2>
              <ul className="space-y-1">
                {mod.steps.map((step, stepIndex) => {
                  const flat = flatSteps.find(
                    (item) => item.moduleId === mod.id && item.stepIndex === stepIndex,
                  );
                  if (!flat) return null;
                  const active = flat.globalIndex === currentGlobalIndex;
                  const done = isCursusStepComplete(cursus.id, flat.key);
                  const kind = step.type === 'lesson' ? 'Lesson' : 'Kata';
                  return (
                    <li key={flat.key}>
                      <a
                        href={`/cursus/${cursus.id}/step/${flat.globalIndex}`}
                        className={`block rounded-md px-3 py-2 text-sm ${
                          active
                            ? 'bg-primary text-white'
                            : 'text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900'
                        }`}
                      >
                        <span className="mr-2">{done ? '✓' : '○'}</span>
                        <span className="text-xs uppercase text-inherit opacity-70">{kind}</span>
                        <div className="font-medium">{stepLabel(flat, lessonMap, kataMap)}</div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {current.step.type === 'lesson' ? (
              <LessonView
                title={lessonMap[current.step.lessonId]?.title ?? current.step.lessonId}
                bodyHtml={lessonMap[current.step.lessonId]?.bodyHtml ?? '<p>Lesson not found.</p>'}
                onContinue={handleLessonContinue}
              />
            ) : kataMap[current.step.kataId] ? (
              <CursusKataStep
                assessment={{
                  id: `cursus-${cursus.id}-step-${current.globalIndex}`,
                  title: kataMap[current.step.kataId]?.title ?? current.step.kataId,
                  durationMinutes: null,
                  kataIds: [current.step.kataId],
                }}
                kata={kataMap[current.step.kataId]}
                judgeConfig={judgeConfig}
                brandingTitle={brandingTitle}
                onKataSubmitSuccess={handleKataSuccess}
              />
            ) : (
              <p>Kata not found: {current.step.kataId}</p>
            )}
          </div>

          <footer className="flex items-center justify-between border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
            <button
              type="button"
              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium disabled:opacity-40"
              disabled={currentGlobalIndex === 0}
              onClick={() => navigateTo(currentGlobalIndex - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              disabled={!canGoNext}
              onClick={() => navigateTo(currentGlobalIndex + 1)}
            >
              Next
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
