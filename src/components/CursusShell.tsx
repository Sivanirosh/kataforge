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
import ThemeToggle from './ThemeToggle';
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
    return <p className="cursus-empty">Step not found.</p>;
  }

  const currentComplete = isCursusStepComplete(cursus.id, current.key);
  const canGoNext = currentComplete && currentGlobalIndex < flatSteps.length - 1;

  return (
    <div className="cursus-shell">
      <header className="app-header">
        <div className="header-brand">
          <a href="/" className="brand">
            {brandingTitle}
          </a>
          <span className="header-sep" aria-hidden="true">
            /
          </span>
          <span className="assessment-name">{cursus.title}</span>
        </div>
        <div className="cursus-progress" aria-live="polite">
          <span className="cursus-progress-value">{completionPercent}% complete</span>
          <span className="cursus-progress-detail">
            Step {currentGlobalIndex + 1} of {totalSteps}
          </span>
        </div>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </header>

      <div className="cursus-layout">
        <aside className="cursus-sidebar" aria-label="Cursus modules">
          {cursus.modules.map((mod) => (
            <section key={mod.id} className="cursus-module">
              <h2 className="cursus-module-title">{mod.title}</h2>
              <ul className="cursus-step-list">
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
                        className={`cursus-step-link${active ? ' active' : ''}${done ? ' done' : ''}`}
                        aria-current={active ? 'step' : undefined}
                      >
                        <span className="cursus-step-kind">{kind}</span>
                        <span className="cursus-step-name">{stepLabel(flat, lessonMap, kataMap)}</span>
                        <span className="cursus-step-status" aria-hidden="true">
                          {done ? '✓' : '○'}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </aside>

        <div className="cursus-main">
          <div className="cursus-content">
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
              <p className="cursus-empty">Kata not found: {current.step.kataId}</p>
            )}
          </div>

          <footer className="cursus-footer">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={currentGlobalIndex === 0}
              onClick={() => navigateTo(currentGlobalIndex - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!canGoNext}
              onClick={() => navigateTo(currentGlobalIndex + 1)}
            >
              Next
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
