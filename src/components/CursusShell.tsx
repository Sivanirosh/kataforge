import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { Cursus } from '../lib/cursusSchema';
import {
  countCursusSteps,
  cursusStepPath,
  flattenCursusSteps,
  getFlatStep,
  parseCursusStepIndex,
  type FlatCursusStep,
} from '../lib/cursusSteps';
import type { Checkpoint } from '../lib/checkpointSchema';
import type { LessonData } from '../lib/loadLessons';
import type { KataData } from './AssessmentShell';
import CheckpointView from './CheckpointView';
import CursusKataStep from './CursusKataStep';
import LessonView from './LessonView';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import {
  isCheckpointAttemptComplete,
  loadCheckpointAttempt,
} from '../lib/checkpointAttempts';
import {
  ensureCursusProgress,
  loadCursusProgress,
  markCursusStepComplete,
  type CursusProgress,
} from '../lib/storage';
import { recordActivity } from '../lib/activity';

interface CursusShellProps {
  cursus: Cursus;
  currentGlobalIndex: number;
  lessonMap: Record<string, LessonData>;
  kataMap: Record<string, KataData>;
  checkpointMap: Record<string, Checkpoint>;
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
  brandingTitle: string;
}

interface StepMaps {
  lessonMap: Record<string, LessonData>;
  kataMap: Record<string, KataData>;
  checkpointMap: Record<string, Checkpoint>;
}

type CheckpointScore = { correct: number; total: number };

const RAIL_COLLAPSED_STORAGE_KEY = 'kataforge:cursus-rail-collapsed';

function readStoredRailCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(RAIL_COLLAPSED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeStoredRailCollapsed(collapsed: boolean) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RAIL_COLLAPSED_STORAGE_KEY, String(collapsed));
  } catch {
    // Preference persistence is best-effort; the rail still works without it.
  }
}

function stepLabel(flat: FlatCursusStep, maps: StepMaps): string {
  if (flat.step.type === 'lesson') {
    return maps.lessonMap[flat.step.lessonId]?.title ?? flat.step.lessonId;
  }
  if (flat.step.type === 'checkpoint') {
    return (
      maps.checkpointMap[flat.step.checkpointId]?.title ??
      flat.step.checkpointId
    );
  }
  return maps.kataMap[flat.step.kataId]?.title ?? flat.step.kataId;
}

/** Nearest preceding Kata step carrying the Checkpoint's attached Kata. */
function findAttachedKataStep(
  flatSteps: FlatCursusStep[],
  checkpointIndex: number,
  attachedKataId: string,
): FlatCursusStep | null {
  for (let i = checkpointIndex - 1; i >= 0; i -= 1) {
    const candidate = flatSteps[i];
    if (
      candidate.step.type === 'kata' &&
      candidate.step.kataId === attachedKataId
    ) {
      return candidate;
    }
  }
  return null;
}

function stepKind(flat: FlatCursusStep): string {
  if (flat.step.type === 'lesson') return 'Lesson';
  if (flat.step.type === 'checkpoint') return 'Self-check';
  return 'Kata';
}

export default function CursusShell({
  cursus,
  currentGlobalIndex,
  lessonMap,
  kataMap,
  checkpointMap,
  judgeConfig,
  brandingTitle,
}: CursusShellProps) {
  const maps: StepMaps = { lessonMap, kataMap, checkpointMap };
  const flatSteps = useMemo(() => flattenCursusSteps(cursus), [cursus]);
  const totalSteps = countCursusSteps(cursus);
  const [stepIndex, setStepIndex] = useState(currentGlobalIndex);
  const [progress, setProgress] = useState<CursusProgress | null>(() =>
    loadCursusProgress(cursus.id),
  );
  const [justCompletedKey, setJustCompletedKey] = useState<string | null>(null);
  const [railCollapsed, setRailCollapsed] = useState(false);

  const completedKeys = useMemo(
    () => new Set(progress?.completedStepKeys ?? []),
    [progress],
  );

  // Compact sidebar scores: read once on mount, then maintained via callbacks.
  const [checkpointScores, setCheckpointScores] = useState<
    Record<string, CheckpointScore>
  >({});

  useEffect(() => {
    const scores: Record<string, CheckpointScore> = {};
    for (const id of Object.keys(checkpointMap)) {
      const attempt = loadCheckpointAttempt(id);
      if (
        attempt &&
        isCheckpointAttemptComplete(attempt) &&
        attempt.score.total > 0
      ) {
        scores[id] = attempt.score;
      }
    }
    setCheckpointScores(scores);
  }, [checkpointMap]);

  useEffect(() => {
    setStepIndex(currentGlobalIndex);
  }, [currentGlobalIndex]);

  useEffect(() => {
    setRailCollapsed(readStoredRailCollapsed());
  }, []);

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
      const next = ensureCursusProgress(cursus.id, current.key);
      setProgress(next);
      recordActivity({
        kind: 'cursus',
        id: cursus.id,
        title: cursus.title,
        href: cursusStepPath(cursus.id, current.globalIndex),
        detail: `${next.completedStepKeys.length}/${totalSteps} steps complete`,
      });
    }
  }, [cursus.id, cursus.title, current?.globalIndex, current?.key, totalSteps]);

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

  const completionPercent =
    totalSteps === 0 ? 0 : Math.round((completedKeys.size / totalSteps) * 100);

  useEffect(() => {
    document.querySelector('.cursus-content')?.scrollTo({ top: 0, left: 0 });
    document
      .querySelector('.cursus-step-link.active')
      ?.scrollIntoView({ block: 'nearest' });
  }, [stepIndex]);

  const navigateTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= flatSteps.length || index === stepIndex) return;
      window.history.pushState(
        { cursusStep: index },
        '',
        cursusStepPath(cursus.id, index),
      );
      setStepIndex(index);
      window.scrollTo(0, 0);
    },
    [cursus.id, flatSteps.length, stepIndex],
  );

  const handleStepLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, index: number) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }
      event.preventDefault();
      navigateTo(index);
    },
    [navigateTo],
  );

  const completeCurrentStep = useCallback(() => {
    if (!current) return;
    if (!completedKeys.has(current.key)) {
      setJustCompletedKey(current.key);
    }
    setProgress(markCursusStepComplete(cursus.id, current.key));
  }, [current, cursus.id, completedKeys]);

  const handleLessonContinue = useCallback(() => {
    completeCurrentStep();
    if (stepIndex < flatSteps.length - 1) {
      navigateTo(stepIndex + 1);
    }
  }, [completeCurrentStep, stepIndex, flatSteps.length, navigateTo]);

  const handleCheckpointComplete = useCallback(
    (score: CheckpointScore) => {
      completeCurrentStep();
      if (current?.step.type === 'checkpoint' && score.total > 0) {
        const checkpointId = current.step.checkpointId;
        setCheckpointScores((existing) => ({
          ...existing,
          [checkpointId]: score,
        }));
      }
    },
    [completeCurrentStep, current],
  );

  const toggleRail = useCallback(() => {
    setRailCollapsed((collapsed) => {
      const next = !collapsed;
      writeStoredRailCollapsed(next);
      return next;
    });
  }, []);

  if (!current) {
    return <p className="cursus-empty">Step not found.</p>;
  }

  const currentComplete = completedKeys.has(current.key);
  const canGoNext = currentComplete && stepIndex < flatSteps.length - 1;
  const nextStep =
    stepIndex < flatSteps.length - 1 ? flatSteps[stepIndex + 1] : null;
  const footerHint = !currentComplete
    ? 'Complete this step to continue'
    : nextStep
      ? `Next: ${stepLabel(nextStep, maps)}`
      : 'Cursus complete';
  const railToggleLabel = railCollapsed
    ? 'Expand cursus rail'
    : 'Collapse cursus rail';

  return (
    <div className={`cursus-shell${railCollapsed ? ' rail-collapsed' : ''}`}>
      <header className="app-header">
        <div className="header-brand">
          <a href="/" className="brand" aria-label={brandingTitle}>
            <img
              className="brand-logo"
              src="/kataforge-logo.png"
              alt=""
              width={32}
              height={32}
              decoding="async"
            />
            <span>{brandingTitle}</span>
          </a>
          <span className="header-sep" aria-hidden="true">
            /
          </span>
          <span className="assessment-name">{cursus.title}</span>
        </div>
        <div className="cursus-progress" aria-live="polite">
          <span className="cursus-progress-value">
            {completionPercent}% complete
          </span>
          <span className="cursus-progress-detail">
            Step {stepIndex + 1} of {totalSteps}
          </span>
        </div>
        <div className="header-actions">
          <ThemeToggle />
        </div>
        <span
          className="cursus-progress-bar"
          style={{ transform: `scaleX(${completionPercent / 100})` }}
          aria-hidden="true"
        />
      </header>

      <div className="cursus-layout">
        <aside className="cursus-sidebar" aria-label="Cursus modules">
          <div className="cursus-rail-header">
            <div className="cursus-rail-title">
              <span className="cursus-rail-kicker">Cursus</span>
              <span className="cursus-rail-progress">
                {completedKeys.size}/{totalSteps} done
              </span>
            </div>
            <div className="kf-ui cursus-rail-toggle-wrap">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="cursus-rail-toggle"
                aria-controls="cursus-step-rail"
                aria-expanded={!railCollapsed}
                aria-label={railToggleLabel}
                title={railToggleLabel}
                onClick={toggleRail}
              >
                {railCollapsed ? (
                  <PanelLeftOpen data-icon="inline-start" aria-hidden="true" />
                ) : (
                  <PanelLeftClose data-icon="inline-start" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          <div id="cursus-step-rail" className="cursus-rail-scroll">
            {cursus.modules.map((mod, moduleIndex) => {
              const moduleSteps = flatSteps.filter(
                (item) => item.moduleId === mod.id,
              );
              const moduleDone = moduleSteps.filter((item) =>
                completedKeys.has(item.key),
              ).length;
              return (
                <section
                  key={mod.id}
                  className="cursus-module"
                  title={mod.title}
                >
                  <h2 className="cursus-module-title">
                    <span className="cursus-module-name">{mod.title}</span>
                    <span className="cursus-module-abbrev" aria-hidden="true">
                      M{moduleIndex}
                    </span>
                    <span className="cursus-module-count">
                      {moduleDone}/{moduleSteps.length}
                    </span>
                  </h2>
                  <ul className="cursus-step-list">
                    {mod.steps.map((_, moduleStepIndex) => {
                      const flat = moduleSteps.find(
                        (item) => item.stepIndex === moduleStepIndex,
                      );
                      if (!flat) return null;
                      const active = flat.globalIndex === stepIndex;
                      const done = completedKeys.has(flat.key);
                      const statusClass = done
                        ? 'done'
                        : active
                          ? 'in-progress'
                          : 'not-started';
                      const statusLabel = done
                        ? 'Completed'
                        : active
                          ? 'In progress'
                          : 'Not started';
                      const kind = stepKind(flat);
                      const label = stepLabel(flat, maps);
                      const score =
                        flat.step.type === 'checkpoint'
                          ? checkpointScores[flat.step.checkpointId]
                          : undefined;
                      return (
                        <li key={flat.key}>
                          <a
                            href={cursusStepPath(cursus.id, flat.globalIndex)}
                            className={`cursus-step-link ${statusClass}${active ? ' active' : ''}`}
                            aria-current={active ? 'step' : undefined}
                            aria-label={`${kind}: ${label} (${statusLabel})`}
                            title={`${kind}: ${label} (${statusLabel})`}
                            onClick={(event) =>
                              handleStepLinkClick(event, flat.globalIndex)
                            }
                          >
                            <span className="cursus-step-kind">
                              {kind}
                              {score && (
                                <span className="cursus-step-score">
                                  {score.correct}/{score.total}
                                </span>
                              )}
                            </span>
                            <span className="cursus-step-name">{label}</span>
                            <span
                              className={`cursus-step-status${
                                done && flat.key === justCompletedKey
                                  ? ' pop'
                                  : ''
                              }`}
                              aria-hidden="true"
                            >
                              ○
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </aside>

        <div className="cursus-main">
          <div className="cursus-content">
            {current.step.type === 'lesson' ? (
              <LessonView
                key={current.key}
                title={
                  lessonMap[current.step.lessonId]?.title ??
                  current.step.lessonId
                }
                bodyHtml={
                  lessonMap[current.step.lessonId]?.bodyHtml ??
                  '<p>Lesson not found.</p>'
                }
                onContinue={handleLessonContinue}
              />
            ) : current.step.type === 'kata' ? (
              kataMap[current.step.kataId] ? (
                <CursusKataStep
                  key={current.key}
                  kata={kataMap[current.step.kataId]}
                  judgeConfig={judgeConfig}
                  onKataSubmitSuccess={completeCurrentStep}
                />
              ) : (
                <p className="cursus-empty">
                  Kata not found: {current.step.kataId}
                </p>
              )
            ) : checkpointMap[current.step.checkpointId] ? (
              (() => {
                const checkpoint = checkpointMap[current.step.checkpointId];
                const attachedStep = findAttachedKataStep(
                  flatSteps,
                  current.globalIndex,
                  checkpoint.attachedKataId,
                );
                return (
                  <CheckpointView
                    key={current.key}
                    checkpoint={checkpoint}
                    attachedKataTitle={
                      kataMap[checkpoint.attachedKataId]?.title ??
                      checkpoint.attachedKataId
                    }
                    locked={
                      attachedStep !== null &&
                      !completedKeys.has(attachedStep.key)
                    }
                    onGoToAttachedKata={
                      attachedStep
                        ? () => navigateTo(attachedStep.globalIndex)
                        : null
                    }
                    onSoftGateComplete={handleCheckpointComplete}
                    onContinue={
                      stepIndex < flatSteps.length - 1
                        ? () => navigateTo(stepIndex + 1)
                        : null
                    }
                  />
                );
              })()
            ) : (
              <p className="cursus-empty">
                Self-check not found: {current.step.checkpointId}
              </p>
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
            <span className="cursus-footer-hint" aria-live="polite">
              <span key={footerHint} className="cursus-footer-hint-text">
                {footerHint}
              </span>
            </span>
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
