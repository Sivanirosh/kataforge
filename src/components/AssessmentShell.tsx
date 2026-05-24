import { useCallback, useEffect, useMemo, useState } from 'react';
import CodeEditor from './CodeEditor';
import ProblemNavigator from './ProblemNavigator';
import ProblemStatement from './ProblemStatement';
import TestPanel from './TestPanel';
import ThemeToggle from './ThemeToggle';
import Timer from './Timer';
import SolutionReview from './SolutionReview';
import type { Assessment, TestCase } from '../lib/configTypes';
import { judgeClient } from '../lib/judgeClient';
import { scoreProblem } from '../lib/scoring';
import {
  clearDraft,
  isTimerExpired,
  loadDraft,
  loadKataCompletionMap,
  loadResults,
  loadSession,
  syncDraft,
  saveResults,
  saveSession,
  type SessionState,
} from '../lib/storage';
import { persistAssessmentScore } from '../lib/assessmentResults';

export interface KataData {
  id: string;
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  functionName: string;
  tags: string[];
  starterCode: string;
  solutionCode?: string;
  solutionExplanationHtml?: string;
  tests: TestCase[];
  bodyHtml: string;
}

interface AssessmentShellProps {
  assessment: Assessment;
  katas: KataData[];
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
  brandingTitle: string;
  embedded?: boolean;
  onKataSubmitSuccess?: () => void;
}

export default function AssessmentShell({
  assessment,
  katas,
  judgeConfig,
  brandingTitle,
  embedded = false,
  onKataSubmitSuccess,
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
  const [code, setCode] = useState('');
  const [results, setResults] = useState(() => loadResults(currentKata?.id ?? '') ?? null);
  const [loading, setLoading] = useState(false);
  const [runMode, setRunMode] = useState<'samples' | 'submit' | null>(null);
  const [panelError, setPanelError] = useState<string | null>(null);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    loadKataCompletionMap(assessment.kataIds),
  );
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (embedded) return;
    saveSession(session);
  }, [session, embedded]);

  useEffect(() => {
    if (!currentKata) return;
    const draft = loadDraft(currentKata.id);
    setCode(draft ?? currentKata.starterCode);
    setResults(loadResults(currentKata.id));
    setShowSolution(false);
  }, [currentKata?.id, currentKata?.starterCode]);

  useEffect(() => {
    if (!currentKata) return;
    const saved = loadResults(currentKata.id);
    if (saved?.every((r) => r.status === 'passed')) {
      setCompleted((prev) => ({ ...prev, [currentKata.id]: true }));
    }
  }, [currentKata?.id, results]);

  const kataTitles = useMemo(
    () => Object.fromEntries(katas.map((k) => [k.id, k.title])),
    [katas],
  );

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      if (currentKata) syncDraft(currentKata.id, value, currentKata.starterCode);
    },
    [currentKata],
  );

  const runTests = useCallback(
    async (mode: 'samples' | 'submit') => {
      if (!currentKata) return;
      setLoading(true);
      setRunMode(mode);
      setPanelError(null);

      const tests =
        mode === 'samples'
          ? currentKata.tests.filter((t) => !t.hidden)
          : currentKata.tests;

      const timeoutMs =
        mode === 'samples' ? judgeConfig.sampleTimeoutMs : judgeConfig.submitTimeoutMs;

      try {
        const response = await judgeClient.run({
          requestId: `${currentKata.id}-${mode}-${Date.now()}`,
          language: 'python',
          code,
          functionName: currentKata.functionName,
          tests,
          timeoutMs,
          revealHiddenDetails: false,
        });

        setRuntimeReady(true);

        if (response.error) {
          setPanelError(response.error);
          setResults(response.results.length > 0 ? response.results : null);
          return;
        }

        if (response.results.length === 0) {
          setPanelError('Judge returned no results. Try running again.');
          setResults(null);
          return;
        }

        setPanelError(null);
        setResults(response.results);
        if (mode === 'submit') {
          saveResults(currentKata.id, response.results);
          const allPassed = response.results.every((r) => r.status === 'passed');
          if (allPassed) {
            setCompleted((prev) => ({ ...prev, [currentKata.id]: true }));
            setShowSolution(false);
            onKataSubmitSuccess?.();
          } else {
            setShowSolution(true);
          }
        }
      } catch {
        setRuntimeReady(true);
        setPanelError('Judge failed unexpectedly. Try running again.');
        setResults(null);
      } finally {
        setLoading(false);
        setRunMode(null);
      }
    },
    [code, currentKata, judgeConfig, onKataSubmitSuccess],
  );

  const handleReset = () => {
    if (!currentKata) return;
    const atStarter = code === currentKata.starterCode;
    if (
      !atStarter &&
      !window.confirm(
        'Replace your code with the starter template? Your current edits will be lost.',
      )
    ) {
      return;
    }
    setCode(currentKata.starterCode);
    clearDraft(currentKata.id);
    setResults(null);
    setPanelError(null);
  };

  const handleSubmitAssessment = useCallback(() => {
    persistAssessmentScore(assessment.id, assessment.kataIds);
    const updated: SessionState = { ...session, submitted: true };
    setSession(updated);
    saveSession(updated);
    window.location.href = `/results/${assessment.id}`;
  }, [session, assessment.id, assessment.kataIds]);

  const expired = isTimerExpired(session);

  if (!currentKata) {
    return <p>No katas found for this assessment.</p>;
  }

  return (
    <div className={`assessment-shell${embedded ? ' assessment-shell-embedded' : ''}`}>
      {!embedded && (
      <header className="app-header">
        <div className="header-brand">
          <a href="/" className="brand">
            {brandingTitle}
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
          <button
            type="button"
            className="btn btn-accent"
            onClick={handleSubmitAssessment}
            aria-label="Submit Assessment"
          >
            Submit
          </button>
          <a
            href={`/results/${assessment.id}`}
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/results/${assessment.id}`;
            }}
          >
            Results
          </a>
        </div>
      </header>
      )}

      {!embedded && expired && (
        <div className="banner banner-warning" role="status">
          Time expired — you may still submit, but your session is marked late.
        </div>
      )}

      <main className={`workspace${embedded ? ' workspace-embedded' : ''}`}>
        {!embedded && (
        <section className="pane pane-prompt">
          <ProblemStatement
            title={currentKata.title}
            difficulty={currentKata.difficulty}
            estimatedMinutes={currentKata.estimatedMinutes}
            tags={currentKata.tags}
            body={currentKata.bodyHtml}
          />
        </section>
        )}
        <section className="pane pane-code">
          <div className="toolbar">
            <div className="toolbar-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => runTests('samples')}
                disabled={loading}
                aria-label="Run Samples"
              >
                Run Samples
              </button>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => runTests('submit')}
                disabled={loading}
                aria-label="Submit"
              >
                Submit
              </button>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
              aria-label="Reset to starter code"
              title="Restore the original starter template"
            >
              Reset to starter
            </button>
          </div>
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            onRunSamples={() => runTests('samples')}
            onSubmit={() => runTests('submit')}
          />
          <TestPanel
            results={results}
            loading={loading}
            mode={runMode}
            loadingPhase={
              loading ? (runtimeReady ? runMode : 'runtime') : null
            }
            error={panelError}
          />
          {showSolution &&
            (currentKata.solutionCode || currentKata.solutionExplanationHtml) && (
              <SolutionReview
                solutionCode={currentKata.solutionCode}
                solutionExplanationHtml={currentKata.solutionExplanationHtml}
                heading="View solution and explanation"
              />
            )}
        </section>
      </main>
    </div>
  );
}

export { scoreProblem };
