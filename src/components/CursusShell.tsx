import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import type { Cursus } from '../lib/cursusSchema';
import {
  countCursusSteps,
  cursusStepPath,
  flattenCursusSteps,
  getFlatStep,
  parseCursusStepIndex,
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
  const totalSteps = countCursusSteps(cursus);
  const [stepIndex, setStepIndex] = useState(currentGlobalIndex);
  const [progressTick, setProgressTick] = useState(0);

  useEffect(() => {
    setStepIndex(currentGlobalIndex);
  }, [currentGlobalIndex]);

  useEffect(() => {
    const onPopState = () => {
      const fromUrl = parseCursusStepIndex(window.location.pathname);
      if (fromUrl !== null) {
        setStepIndex(fromUrl);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const current = getFlatStep(cursus, stepIndex);

  useEffect(() => {
    if (current) {
      ensureCursusProgress(cursus.id, current.key);
    }
  }, [cursus.id, current?.key]);

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.getElementById('cursus-boot')?.remove();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [stepIndex]);

  const completionPercent = useMemo(
    () => cursusCompletionPercent(cursus.id, totalSteps),
    [cursus.id, totalSteps, progressTick],
  );

  const navigateTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= flatSteps.length || index === stepIndex) return;
      window.history.pushState({ cursusStep: index }, '', cursusStepPath(cursus.id, index));
      setStepIndex(index);
      window.scrollTo(0, 0);
    },
    [cursus.id, flatSteps.length, stepIndex],
  );

  const handleStepLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, index: number) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      event.preventDefault();
      navigateTo(index);
    },
    [navigateTo],
  );

  const handleLessonContinue = useCallback(() => {
    if (!current) return;
    markCursusStepComplete(cursus.id, current.key);
    setProgressTick((n) => n + 1);
    if (stepIndex < flatSteps.length - 1) {
      navigateTo(stepIndex + 1);
    }
  }, [current, cursus.id, stepIndex, flatSteps.length, navigateTo]);

  const handleKataSuccess = useCallback(() => {
    if (!current) return;
    markCursusStepComplete(cursus.id, current.key);
    setProgressTick((n) => n + 1);
  }, [current, cursus.id]);

  if (!current) {
    return <p className="cursus-empty">Step not found.</p>;
  }

  const currentComplete = isCursusStepComplete(cursus.id, current.key);
  const canGoNext = currentComplete && stepIndex < flatSteps.length - 1;

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
            Step {stepIndex + 1} of {totalSteps}
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
                {mod.steps.map((step, moduleStepIndex) => {
                  const flat = flatSteps.find(
                    (item) => item.moduleId === mod.id && item.stepIndex === moduleStepIndex,
                  );
                  if (!flat) return null;
                  const active = flat.globalIndex === stepIndex;
                  const done = isCursusStepComplete(cursus.id, flat.key);
                  const kind = step.type === 'lesson' ? 'Lesson' : 'Kata';
                  return (
                    <li key={flat.key}>
                      <a
                        href={cursusStepPath(cursus.id, flat.globalIndex)}
                        className={`cursus-step-link${active ? ' active' : ''}${done ? ' done' : ''}`}
                        aria-current={active ? 'step' : undefined}
                        onClick={(event) => handleStepLinkClick(event, flat.globalIndex)}
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
                key={current.key}
                title={lessonMap[current.step.lessonId]?.title ?? current.step.lessonId}
                bodyHtml={lessonMap[current.step.lessonId]?.bodyHtml ?? '<p>Lesson not found.</p>'}
                onContinue={handleLessonContinue}
              />
            ) : kataMap[current.step.kataId] ? (
              <CursusKataStep
                key={current.key}
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
              disabled={stepIndex === 0}
              onClick={() => navigateTo(stepIndex - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!canGoNext}
              onClick={() => navigateTo(stepIndex + 1)}
            >
              Next
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
