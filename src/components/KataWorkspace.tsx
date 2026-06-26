import { useCallback, useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import ProblemStatement from './ProblemStatement';
import TestPanel from './TestPanel';
import SolutionReview from './SolutionReview';
import type { Difficulty, TestCase, TestResult } from '../lib/configTypes';
import { judgeClient } from '../lib/judgeClient';
import { clearDraft, loadDraft, loadResults, saveResults, syncDraft } from '../lib/storage';

/** The shape of a single solvable kata. This is the canonical kata type used
    across loaders and every workspace. */
export interface KataData {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  functionName: string;
  tags: string[];
  hints: string[];
  starterCode: string;
  solutionCode?: string;
  solutionExplanationHtml?: string;
  tests: TestCase[];
  bodyHtml: string;
}

export interface JudgeConfig {
  sampleTimeoutMs: number;
  submitTimeoutMs: number;
}

/** Reported to the host after a submit run that produced results. */
export interface KataSubmitOutcome {
  results: TestResult[];
  allPassed: boolean;
}

interface KataWorkspaceProps {
  kata: KataData;
  judgeConfig: JudgeConfig;
  /** Compact embed (no outer chrome) — used inside the Cursus shell. */
  embedded?: boolean;
  /** Fired after a *submit* run produces results, once they are persisted.
      The host decides what to do (navigate, advance, mark complete). */
  onSubmit?: (outcome: KataSubmitOutcome) => void;
}

/**
 * KataWorkspace owns the full single-kata solve loop: editor + draft
 * persistence, sample/submit runs through the judge, the result panel, and the
 * on-failure solution reveal. It knows nothing about Assessments, sessions,
 * timers, scoring, or navigation — hosts compose it and react to `onSubmit`.
 */
export default function KataWorkspace({
  kata,
  judgeConfig,
  embedded = false,
  onSubmit,
}: KataWorkspaceProps) {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<TestResult[] | null>(() => loadResults(kata.id));
  const [loading, setLoading] = useState(false);
  const [runMode, setRunMode] = useState<'samples' | 'submit' | null>(null);
  const [panelError, setPanelError] = useState<string | null>(null);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const draft = loadDraft(kata.id);
    setCode(draft ?? kata.starterCode);
    setResults(loadResults(kata.id));
    setShowSolution(false);
  }, [kata.id, kata.starterCode]);

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      syncDraft(kata.id, value, kata.starterCode);
    },
    [kata.id, kata.starterCode],
  );

  const runTests = useCallback(
    async (mode: 'samples' | 'submit') => {
      setLoading(true);
      setRunMode(mode);
      setPanelError(null);

      const tests =
        mode === 'samples' ? kata.tests.filter((t) => !t.hidden) : kata.tests;
      const timeoutMs =
        mode === 'samples' ? judgeConfig.sampleTimeoutMs : judgeConfig.submitTimeoutMs;

      try {
        const response = await judgeClient.run({
          requestId: `${kata.id}-${mode}-${Date.now()}`,
          language: 'python',
          code,
          functionName: kata.functionName,
          tests,
          timeoutMs,
          revealHiddenDetails: false,
        });

        setRuntimeReady(true);

        if (response.error) {
          setPanelError(response.error);
          setResults(response.results.length > 0 ? response.results : null);
          if (mode === 'submit' && response.results.length > 0) {
            saveResults(kata.id, response.results);
            onSubmit?.({
              results: response.results,
              allPassed: response.results.every((r) => r.status === 'passed'),
            });
          }
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
          saveResults(kata.id, response.results);
          const allPassed = response.results.every((r) => r.status === 'passed');
          setShowSolution(!allPassed);
          onSubmit?.({ results: response.results, allPassed });
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
    [code, kata, judgeConfig, onSubmit],
  );

  const handleReset = () => {
    const atStarter = code === kata.starterCode;
    if (
      !atStarter &&
      !window.confirm(
        'Replace your code with the starter template? Your current edits will be lost.',
      )
    ) {
      return;
    }
    setCode(kata.starterCode);
    clearDraft(kata.id);
    setResults(null);
    setPanelError(null);
  };

  return (
    <main className={`workspace${embedded ? ' workspace-embedded' : ''}`}>
      <section className="pane pane-prompt">
        <ProblemStatement
          title={kata.title}
          difficulty={kata.difficulty}
          estimatedMinutes={kata.estimatedMinutes}
          tags={kata.tags}
          hints={kata.hints}
          body={kata.bodyHtml}
        />
      </section>
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
          loadingPhase={loading ? (runtimeReady ? runMode : 'runtime') : null}
          error={panelError}
        />
        {showSolution && (kata.solutionCode || kata.solutionExplanationHtml) && (
          <SolutionReview
            solutionCode={kata.solutionCode}
            solutionExplanationHtml={kata.solutionExplanationHtml}
            heading="View solution and explanation"
          />
        )}
      </section>
    </main>
  );
}
