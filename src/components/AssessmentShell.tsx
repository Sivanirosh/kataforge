import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import KataWorkspace, {
  type JudgeConfig,
  type KataData,
  type KataSubmitOutcome,
} from './KataWorkspace';
import ProblemNavigator from './ProblemNavigator';
import ThemeToggle from './ThemeToggle';
import Timer from './Timer';
import type { Assessment } from '../lib/configTypes';
import {
  isTimerExpired,
  loadKataCompletionMap,
  loadSession,
  saveSession,
  type SessionState,
} from '../lib/storage';
import { persistAssessmentScore } from '../lib/assessmentResults';
import { isSessionAssessment } from '../lib/kataPractice';
import { recordActivity } from '../lib/activity';

export type { KataData } from './KataWorkspace';

interface AssessmentShellProps {
  assessment: Assessment;
  katas: KataData[];
  judgeConfig: JudgeConfig;
  brandingTitle: string;
}

/**
 * AssessmentShell orchestrates a multi-kata (or timed) assessment: the session,
 * timer, kata navigator, and finish/results actions. The per-kata solve loop
 * lives in KataWorkspace, which this shell renders for the current kata and
 * reacts to via onSubmit.
 */
export default function AssessmentShell({
  assessment,
  katas,
  judgeConfig,
  brandingTitle,
}: AssessmentShellProps) {
  const [session, setSession] = useState<SessionState>(() => {
    const existing = loadSession(assessment.id);
    if (existing) return existing;
    return {
      assessmentId: assessment.id,
      startedAt: Date.now(),
      durationMinutes: assessment.durationMinutes,
      currentKataIndex: 0,
      submitted: false,
    };
  });

  const currentKata = katas[session.currentKataIndex];
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    loadKataCompletionMap(assessment.kataIds),
  );
  const sessionAssessment = isSessionAssessment(assessment);

  useEffect(() => {
    saveSession(session);
    recordActivity({
      kind: 'assessment',
      id: assessment.id,
      title: assessment.title,
      href: `/assessment/${assessment.id}`,
      detail: assessment.durationMinutes
        ? `${assessment.durationMinutes}m · ${assessment.kataIds.length} katas`
        : `untimed · ${assessment.kataIds.length} katas`,
    });
  }, [assessment, session]);

  const kataTitles = useMemo(
    () => Object.fromEntries(katas.map((k) => [k.id, k.title])),
    [katas],
  );

  const goToResults = useCallback(
    (finalize: boolean) => {
      persistAssessmentScore(assessment.id, assessment.kataIds);
      if (finalize) {
        const updated: SessionState = { ...session, submitted: true };
        setSession(updated);
        saveSession(updated);
      }
      window.location.href = `/results/${assessment.id}`;
    },
    [session, assessment.id, assessment.kataIds],
  );

  const handleSubmit = useCallback(
    ({ allPassed }: KataSubmitOutcome) => {
      if (!currentKata) return;
      // A single, untimed assessment behaves like one-shot practice: jump
      // straight to the results page. Timed/multi-kata sessions stay put so the
      // learner can keep working and finish on their own terms.
      if (!sessionAssessment) {
        goToResults(true);
        return;
      }
      if (allPassed) {
        setCompleted((prev) => ({ ...prev, [currentKata.id]: true }));
      }
    },
    [currentKata, sessionAssessment, goToResults],
  );

  const handleFinishAssessment = useCallback(() => {
    goToResults(true);
  }, [goToResults]);

  const handleViewResults = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      goToResults(false);
    },
    [goToResults],
  );

  const expired = isTimerExpired(session);

  if (!currentKata) {
    return <p>No katas found for this assessment.</p>;
  }

  return (
    <div className="assessment-shell">
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
          <span className="assessment-name">{assessment.title}</span>
        </div>
        <ProblemNavigator
          kataIds={assessment.kataIds}
          kataTitles={kataTitles}
          currentIndex={session.currentKataIndex}
          completed={completed}
          onSelect={(index) => setSession((s) => ({ ...s, currentKataIndex: index }))}
        />
        <div className="header-actions">
          <ThemeToggle />
          <Timer session={session} />
          {sessionAssessment && (
            <>
              <button
                type="button"
                className="btn btn-accent"
                onClick={handleFinishAssessment}
                aria-label="Finish assessment"
              >
                Finish
              </button>
              <a
                href={`/results/${assessment.id}`}
                className="btn btn-secondary"
                onClick={handleViewResults}
              >
                Results
              </a>
            </>
          )}
        </div>
      </header>

      {expired && (
        <div className="banner banner-warning" role="status">
          Time expired — you may still submit, but your session is marked late.
        </div>
      )}

      <KataWorkspace
        key={currentKata.id}
        kata={currentKata}
        judgeConfig={judgeConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
