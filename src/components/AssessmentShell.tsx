import { useCallback, useEffect, useMemo, useState } from 'react';
import CodeEditor from './CodeEditor';
import ProblemNavigator from './ProblemNavigator';
import ProblemStatement from './ProblemStatement';
import TestPanel from './TestPanel';
import Timer from './Timer';
import type { Assessment, TestCase } from '../lib/configTypes';
import { judgeClient } from '../lib/judgeClient';
import { scoreProblem } from '../lib/scoring';
import {
  clearDraft,
  isTimerExpired,
  loadDraft,
  loadResults,
  loadSession,
  saveDraft,
  saveResults,
  saveSession,
  type SessionState,
} from '../lib/storage';

export interface KataData {
  id: string;
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  functionName: string;
  tags: string[];
  starterCode: string;
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
}

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
  const [code, setCode] = useState('');
  const [results, setResults] = useState(() => loadResults(currentKata?.id ?? '') ?? null);
  const [loading, setLoading] = useState(false);
  const [runMode, setRunMode] = useState<'samples' | 'submit' | null>(null);
  const [panelError, setPanelError] = useState<string | null>(null);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    saveSession(session);
  }, [session]);

  useEffect(() => {
    if (!currentKata) return;
    const draft = loadDraft(currentKata.id);
    setCode(draft ?? currentKata.starterCode);
    setResults(loadResults(currentKata.id));
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
      if (currentKata) saveDraft(currentKata.id, value);
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
    [code, currentKata, judgeConfig],
  );

  const handleReset = () => {
    if (!currentKata) return;
    setCode(currentKata.starterCode);
    clearDraft(currentKata.id);
    setResults(null);
  };

  const expired = isTimerExpired(session);

  if (!currentKata) {
    return <p>No katas found for this assessment.</p>;
  }

  return (
    <div className="assessment-shell">
      <header className="app-header">
        <div className="header-left">
          <a href="/" className="brand">
            {brandingTitle}
          </a>
          <span className="assessment-name">{assessment.title}</span>
        </div>
        <Timer session={session} />
        <ProblemNavigator
          kataIds={assessment.kataIds}
          kataTitles={kataTitles}
          currentIndex={session.currentKataIndex}
          completed={completed}
          onSelect={(index) => setSession((s) => ({ ...s, currentKataIndex: index }))}
        />
        <a
          href={`/results/${assessment.id}`}
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/results/${assessment.id}`;
          }}
        >
          View Results
        </a>
      </header>

      {expired && (
        <div className="banner banner-warning" role="status">
          Time expired — you may still submit, but your session is marked late.
        </div>
      )}

      <main className="workspace">
        <section className="pane pane-prompt">
          <ProblemStatement
            title={currentKata.title}
            difficulty={currentKata.difficulty}
            estimatedMinutes={currentKata.estimatedMinutes}
            tags={currentKata.tags}
            body={currentKata.bodyHtml}
          />
        </section>
        <section className="pane pane-code">
          <div className="toolbar">
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
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleReset}
              disabled={loading}
              aria-label="Reset code to starter"
            >
              Reset
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
        </section>
      </main>
    </div>
  );
}

export { scoreProblem };
