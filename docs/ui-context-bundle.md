# KataForge UI Context Bundle

Paste this entire file (or attach it) into the **Context bundle** section of the Sonnet UI-improvement prompt.

Generated from repo source — 12 files, vanilla CSS + React components.

---

## src/styles/global.css

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  color-scheme: dark;
  --bg: #0f1117;
  --surface: #171923;
  --surface-2: #1f2330;
  --border: #2d3348;
  --text: #e8eaef;
  --muted: #9aa3b5;
  --accent: #6c9eff;
  --accent-2: #4ade80;
  --danger: #f87171;
  --warning: #fbbf24;
  font-family: Inter, system-ui, sans-serif;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: var(--bg);
  color: var(--text);
}

a {
  color: var(--accent);
  text-decoration: none;
}

.landing {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.landing-header h1 {
  margin: 0 0 0.5rem;
  font-size: 2.25rem;
}

.tagline {
  color: var(--muted);
  margin: 0;
}

.landing-section {
  margin-top: 2.5rem;
}

.landing-section h2 {
  margin-bottom: 1rem;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

.card h3 {
  margin: 0 0 0.5rem;
}

.card p {
  color: var(--muted);
  margin: 0 0 1rem;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.5rem 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--accent);
  color: #0b1020;
}

.btn-secondary {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
}

.btn-accent {
  background: var(--accent-2);
  color: #052e16;
}

.btn-ghost {
  background: transparent;
  color: var(--muted);
  border-color: var(--border);
}

.badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  background: var(--surface-2);
  border: 1px solid var(--border);
}

.badge-easy {
  background: rgba(74, 222, 128, 0.14);
  border-color: rgba(74, 222, 128, 0.45);
  color: #bbf7d0;
}

.badge-easy-medium {
  background: rgba(163, 230, 53, 0.14);
  border-color: rgba(163, 230, 53, 0.45);
  color: #d9f99d;
}

.badge-medium {
  background: rgba(251, 191, 36, 0.14);
  border-color: rgba(251, 191, 36, 0.45);
  color: #fde68a;
}

.badge-hard {
  background: rgba(248, 113, 113, 0.14);
  border-color: rgba(248, 113, 113, 0.45);
  color: #fecaca;
}

.assessment-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.brand {
  font-weight: 700;
  color: var(--text);
}

.assessment-name {
  color: var(--muted);
  font-size: 0.875rem;
}

.timer {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: var(--surface-2);
}

.timer-expired {
  color: var(--warning);
}

.problem-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
  font-size: 0.8rem;
}

.nav-item.active {
  border-color: var(--accent);
}

.nav-item.done .nav-index {
  background: var(--accent-2);
  color: #052e16;
}

.nav-index {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--border);
  font-size: 0.7rem;
}

.banner {
  padding: 0.6rem 1rem;
  text-align: center;
}

.banner-warning {
  background: rgba(251, 191, 36, 0.12);
  color: var(--warning);
}

.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(360px, 1.2fr);
  min-height: 0;
}

.pane {
  min-height: 0;
  overflow: auto;
}

.pane-prompt {
  border-right: 1px solid var(--border);
  padding: 1rem 1.25rem;
}

.pane-code {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: calc(100vh - 56px);
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}

.editor-pane {
  min-height: 280px;
  height: 100%;
}

.problem-statement h2 {
  margin-top: 0;
}

.problem-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.meta-item,
.tag {
  color: var(--muted);
  font-size: 0.8rem;
}

.markdown-body :is(h1, h2, h3) {
  margin-top: 1.25rem;
}

.markdown-body pre,
.markdown-body code {
  background: var(--surface-2);
  border-radius: 6px;
}

.markdown-body pre {
  padding: 0.75rem;
  overflow: auto;
}

.test-panel {
  border-top: 1px solid var(--border);
  padding: 0.75rem 1rem 1rem;
  max-height: 240px;
  overflow: auto;
}

.test-panel-status {
  color: var(--muted);
  margin: 0;
}

.test-panel-error {
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 8px;
  color: #fecaca;
  margin: 0 0 0.75rem;
  padding: 0.6rem 0.75rem;
}

.test-panel-summary {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.test-panel-empty {
  color: var(--muted);
  margin: 0;
}

.test-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.test-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.5rem;
}

.test-item-header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.test-passed {
  border-color: rgba(74, 222, 128, 0.35);
}

.test-failed,
.test-error,
.test-timeout {
  border-color: rgba(248, 113, 113, 0.35);
}

.status-passed {
  color: var(--accent-2);
}

.status-failed,
.status-error,
.status-timeout {
  color: var(--danger);
}

.test-stdout,
.test-error,
.test-diff {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.results-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.result-summary .score-hero {
  margin: 1.5rem 0;
}

.score-percent {
  font-size: 3rem;
  font-weight: 800;
}

.score-detail {
  color: var(--muted);
}

.problem-scores {
  list-style: none;
  padding: 0;
}

.problem-scores li {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
}

.problem-score-item {
  display: block;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
}

.problem-score-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.hidden-test-list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}

.hidden-test-item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.8rem;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  background: var(--surface-2);
}

.hidden-test-name {
  color: var(--muted);
}

.hidden-test-status {
  font-weight: 600;
}

.hidden-test-item.status-passed .hidden-test-status {
  color: var(--accent-2);
}

.hidden-test-item.status-failed .hidden-test-status,
.hidden-test-item.status-error .hidden-test-status,
.hidden-test-item.status-timeout .hidden-test-status {
  color: var(--danger);
}

.results-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (max-width: 900px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .pane-prompt {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
```

---

## src/pages/index.astro

```astro
---
import '../styles/global.css';
import AssessmentStartActions from '../components/AssessmentStartActions';
import { loadKataForgeConfig } from '../lib/loadConfig';
import { loadAssessments } from '../lib/loadAssessments';
import { loadAllKatas } from '../lib/loadKatas';

const config = await loadKataForgeConfig();
const assessments = await loadAssessments();
const katas = await loadAllKatas();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{config.branding.title}</title>
  </head>
  <body>
    <main class="landing">
      <header class="landing-header">
        <h1>{config.branding.title}</h1>
        <p class="tagline">{config.branding.tagline}</p>
      </header>

      <section class="landing-section">
        <h2>Assessments</h2>
        <ul class="card-list">
          {assessments.map((assessment) => (
            <li class="card">
              <h3>{assessment.title}</h3>
              <p>
                {assessment.kataIds.length} katas
                {assessment.durationMinutes
                  ? ` · ${assessment.durationMinutes} min`
                  : ' · untimed'}
              </p>
              <AssessmentStartActions
                client:load="react"
                assessmentId={assessment.id}
                durationMinutes={assessment.durationMinutes}
                kataIds={assessment.kataIds}
              />
            </li>
          ))}
        </ul>
      </section>

      <section class="landing-section">
        <h2>Practice a Kata</h2>
        <ul class="card-list">
          {katas.map((kata) => (
            <li class="card">
              <h3>{kata.title}</h3>
              <p>
                <span class={`badge badge-${kata.difficulty}`}>{kata.difficulty}</span>
                {' '}
                {kata.estimatedMinutes} min
              </p>
              <a class="btn btn-secondary" href={`/problem/${kata.id}`}>
                Open
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  </body>
</html>
```

---

## src/pages/assessment/[id].astro

```astro
---
import AssessmentShell from '../../components/AssessmentShell';
import { loadKataForgeConfig } from '../../lib/loadConfig';
import { loadAssessments } from '../../lib/loadAssessments';
import { loadKataMap } from '../../lib/loadKatas';
import '../../styles/global.css';

export async function getStaticPaths() {
  const assessments = await loadAssessments();
  return assessments.map((assessment) => ({
    params: { id: assessment.id },
    props: { assessment },
  }));
}

const { assessment } = Astro.props;
const config = await loadKataForgeConfig();
const kataMap = await loadKataMap();
const katas = assessment.kataIds
  .map((id: string) => kataMap[id])
  .filter(Boolean);
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{assessment.title} · {config.branding.title}</title>
  </head>
  <body>
    <AssessmentShell
      client:only="react"
      assessment={assessment}
      katas={katas}
      judgeConfig={config.judge}
      brandingTitle={config.branding.title}
    />
  </body>
</html>
```

---

## src/pages/results/[id].astro

```astro
---
import ResultsPage from '../../components/ResultsPage';
import { loadKataForgeConfig } from '../../lib/loadConfig';
import { loadAssessments } from '../../lib/loadAssessments';
import { loadKataMap } from '../../lib/loadKatas';
import '../../styles/global.css';

export async function getStaticPaths() {
  const assessments = await loadAssessments();
  return assessments.map((assessment) => ({
    params: { id: assessment.id },
    props: { assessment },
  }));
}

const { assessment } = Astro.props;
const config = await loadKataForgeConfig();
const kataMap = await loadKataMap();
const kataTitles = Object.fromEntries(
  Object.values(kataMap).map((k) => [k.id, k.title]),
);
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Results · {config.branding.title}</title>
  </head>
  <body>
    <main class="results-page">
      <ResultsPage
        client:load
        assessmentId={assessment.id}
        kataIds={assessment.kataIds}
        kataTitles={kataTitles}
        durationMinutes={assessment.durationMinutes}
      />
    </main>
  </body>
</html>
```

---

## src/components/AssessmentShell.tsx

```tsx
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
  loadKataCompletionMap,
  loadResults,
  loadSession,
  saveDraft,
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
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    loadKataCompletionMap(assessment.kataIds),
  );

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
        <button
          type="button"
          className="btn btn-accent"
          onClick={handleSubmitAssessment}
          aria-label="Submit Assessment"
        >
          Submit Assessment
        </button>
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
```

---

## src/components/CodeEditor.tsx

```tsx
import { useCallback, useRef, type ComponentProps } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRunSamples?: () => void;
  onSubmit?: () => void;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  onRunSamples,
  onSubmit,
  readOnly = false,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMount = useCallback<NonNullable<ComponentProps<typeof Editor>['onMount']>>(
    (editor, monaco) => {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRunSamples?.();
      });
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
        () => {
          onSubmit?.();
        },
      );
      containerRef.current?.focus();
    },
    [onRunSamples, onSubmit],
  );

  return (
    <div ref={containerRef} className="editor-pane">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
```

---

## src/components/TestPanel.tsx

```tsx
import type { TestResult } from '../lib/configTypes';
import { loadingMessage } from './testPanelMessages';

export type TestPanelLoadingPhase = 'runtime' | 'samples' | 'submit';

interface TestPanelProps {
  results: TestResult[] | null;
  loading: boolean;
  mode: 'samples' | 'submit' | null;
  loadingPhase?: TestPanelLoadingPhase | null;
  error?: string | null;
}

function statusLabel(status: TestResult['status']): string {
  switch (status) {
    case 'passed':
      return 'Passed';
    case 'failed':
      return 'Failed';
    case 'error':
      return 'Error';
    case 'timeout':
      return 'Timeout';
    default:
      return status;
  }
}

export default function TestPanel({
  results,
  loading,
  mode,
  loadingPhase = null,
  error = null,
}: TestPanelProps) {
  if (loading) {
    return (
      <div className="test-panel" aria-live="polite">
        <p className="test-panel-status">{loadingMessage(loadingPhase, mode)}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-panel" aria-live="polite">
        <p className="test-panel-error" role="alert">
          {error}
        </p>
        {results && results.length > 0 ? (
          <>
            <div className="test-panel-summary">
              {results.filter((r) => r.status === 'passed').length}/{results.length} tests passed
            </div>
            <ul className="test-list">
              {results.map((result) => (
                <li
                  key={result.testId}
                  className={`test-item test-${result.status}`}
                  aria-label={`${result.name}: ${statusLabel(result.status)}`}
                >
                  <div className="test-item-header">
                    <span className="test-name">
                      {result.hidden ? `[hidden] ${result.name}` : result.name}
                    </span>
                    <span className={`test-status status-${result.status}`}>
                      {statusLabel(result.status)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="test-panel-empty">Run Samples or Submit to try again.</p>
        )}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="test-panel">
        <p className="test-panel-empty">Run Samples or Submit to see results.</p>
      </div>
    );
  }

  const passed = results.filter((r) => r.status === 'passed').length;

  return (
    <div className="test-panel" aria-live="polite">
      <div className="test-panel-summary">
        {passed}/{results.length} tests passed
      </div>
      <ul className="test-list">
        {results.map((result) => (
          <li
            key={result.testId}
            className={`test-item test-${result.status}`}
            aria-label={`${result.name}: ${statusLabel(result.status)}`}
          >
            <div className="test-item-header">
              <span className="test-name">
                {result.hidden ? `[hidden] ${result.name}` : result.name}
              </span>
              <span className={`test-status status-${result.status}`}>
                {statusLabel(result.status)}
              </span>
            </div>
            {result.stdout && (
              <pre className="test-stdout">
                <strong>stdout:</strong>
                {result.stdout}
              </pre>
            )}
            {result.error && (
              <pre className="test-error">{result.error}</pre>
            )}
            {result.expected !== undefined && result.actual !== undefined && (
              <div className="test-diff">
                <div>
                  <strong>Expected:</strong>{' '}
                  <code>{JSON.stringify(result.expected)}</code>
                </div>
                <div>
                  <strong>Got:</strong>{' '}
                  <code>{JSON.stringify(result.actual)}</code>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## src/components/testPanelMessages.ts

```ts
import type { TestPanelLoadingPhase } from './TestPanel';

export function loadingMessage(
  loadingPhase: TestPanelLoadingPhase | null | undefined,
  mode: 'samples' | 'submit' | null,
): string {
  if (loadingPhase === 'runtime') {
    return 'Loading Python runtime…';
  }
  return `Running ${mode === 'submit' ? 'submit' : 'samples'}…`;
}
```

---

## src/components/ProblemStatement.tsx

```tsx
interface ProblemStatementProps {
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  tags: string[];
  body: string;
}

export default function ProblemStatement({
  title,
  difficulty,
  estimatedMinutes,
  tags,
  body,
}: ProblemStatementProps) {
  return (
    <div className="problem-statement">
      <header className="problem-header">
        <h2>{title}</h2>
        <div className="problem-meta">
          <span className={`badge badge-${difficulty}`}>{difficulty}</span>
          <span className="meta-item">{estimatedMinutes} min</span>
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
```

---

## src/components/ProblemNavigator.tsx

```tsx
interface ProblemNavigatorProps {
  kataIds: string[];
  kataTitles: Record<string, string>;
  currentIndex: number;
  completed: Record<string, boolean>;
  onSelect: (index: number) => void;
}

export default function ProblemNavigator({
  kataIds,
  kataTitles,
  currentIndex,
  completed,
  onSelect,
}: ProblemNavigatorProps) {
  return (
    <nav className="problem-nav" aria-label="Problem navigation">
      {kataIds.map((id, index) => (
        <button
          key={id}
          type="button"
          className={`nav-item ${index === currentIndex ? 'active' : ''} ${completed[id] ? 'done' : ''}`}
          onClick={() => onSelect(index)}
          aria-current={index === currentIndex ? 'step' : undefined}
        >
          <span className="nav-index">{index + 1}</span>
          <span className="nav-title">{kataTitles[id] ?? id}</span>
        </button>
      ))}
    </nav>
  );
}
```

---

## src/components/Timer.tsx

```tsx
import { useEffect, useState } from 'react';
import { getRemainingMs, type SessionState } from '../lib/storage';

interface TimerProps {
  session: SessionState;
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Timer({ session }: TimerProps) {
  const [remaining, setRemaining] = useState<number | null>(() =>
    getRemainingMs(session),
  );

  useEffect(() => {
    if (session.durationMinutes === null) return;
    const id = window.setInterval(() => {
      setRemaining(getRemainingMs(session));
    }, 1000);
    return () => window.clearInterval(id);
  }, [session]);

  if (session.durationMinutes === null) {
    return <span className="timer timer-untimed">Untimed</span>;
  }

  const expired = remaining !== null && remaining <= 0;

  return (
    <span
      className={`timer ${expired ? 'timer-expired' : ''}`}
      aria-live="polite"
      aria-label={expired ? 'Time expired' : `Time remaining ${formatMs(remaining ?? 0)}`}
    >
      {expired ? 'Time expired' : formatMs(remaining ?? 0)}
    </span>
  );
}
```

---

## src/components/ResultsPage.tsx

```tsx
import { useEffect, useState } from 'react';
import ResultSummary from './ResultSummary';
import type { AssessmentScore } from '../lib/configTypes';
import {
  loadHiddenResultsByKata,
  persistAssessmentScore,
} from '../lib/assessmentResults';
import { startFreshSession } from '../lib/storage';

interface ResultsPageProps {
  assessmentId: string;
  kataIds: string[];
  kataTitles: Record<string, string>;
  durationMinutes: number | null;
}

export default function ResultsPage({
  assessmentId,
  kataIds,
  kataTitles,
  durationMinutes,
}: ResultsPageProps) {
  const [score, setScore] = useState<AssessmentScore | null>(null);
  const [hiddenResultsByKata, setHiddenResultsByKata] = useState<
    Record<string, ReturnType<typeof loadHiddenResultsByKata>[string]>
  >({});

  useEffect(() => {
    setScore(persistAssessmentScore(assessmentId, kataIds));
    setHiddenResultsByKata(loadHiddenResultsByKata(kataIds));
  }, [assessmentId, kataIds]);

  const handleRetry = () => {
    startFreshSession(assessmentId, durationMinutes, kataIds);
    window.location.href = `/assessment/${assessmentId}`;
  };

  if (!score) {
    return <p className="results-loading">Loading results…</p>;
  }

  return (
    <div className="results-page-inner">
      <ResultSummary
        score={score}
        kataTitles={kataTitles}
        hiddenResultsByKata={hiddenResultsByKata}
      />
      <div className="results-actions">
        <button type="button" className="btn btn-primary" onClick={handleRetry}>
          Retry assessment
        </button>
        <a href="/" className="btn btn-secondary">
          Back to home
        </a>
      </div>
    </div>
  );
}
```

---

## src/components/ResultSummary.tsx

```tsx
import type { AssessmentScore, TestResult } from '../lib/configTypes';

interface ResultSummaryProps {
  score: AssessmentScore;
  kataTitles: Record<string, string>;
  hiddenResultsByKata: Record<string, TestResult[]>;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

function hiddenStatusLabel(status: TestResult['status']): string {
  return status === 'passed' ? 'Passed' : 'Failed';
}

export default function ResultSummary({
  score,
  kataTitles,
  hiddenResultsByKata,
}: ResultSummaryProps) {
  return (
    <div className="result-summary">
      <h2>Assessment Results</h2>
      <div className="score-hero">
        <div className="score-percent">{score.percentage}%</div>
        <div className="score-detail">
          {score.totalPassed}/{score.totalTests} tests passed · {formatDuration(score.elapsedMs)}
        </div>
      </div>
      <ul className="problem-scores">
        {score.problems.map((p) => {
          const hiddenResults = hiddenResultsByKata[p.kataId] ?? [];
          return (
            <li key={p.kataId} className="problem-score-item">
              <div className="problem-score-row">
                <span className="problem-score-name">{kataTitles[p.kataId] ?? p.kataId}</span>
                <span className="problem-score-value">
                  {p.passed}/{p.total} ({p.percentage}%)
                </span>
              </div>
              {hiddenResults.length > 0 && (
                <ul className="hidden-test-list" aria-label={`Hidden tests for ${kataTitles[p.kataId] ?? p.kataId}`}>
                  {hiddenResults.map((result) => (
                    <li
                      key={result.testId}
                      className={`hidden-test-item status-${result.status}`}
                    >
                      <span className="hidden-test-name">{result.name}</span>
                      <span className="hidden-test-status">
                        {hiddenStatusLabel(result.status)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

---

## src/components/AssessmentStartActions.tsx

```tsx
import { useEffect, useState } from 'react';
import {
  hasAssessmentSession,
  startFreshSession,
} from '../lib/storage';

interface AssessmentStartActionsProps {
  assessmentId: string;
  durationMinutes: number | null;
  kataIds: string[];
}

export default function AssessmentStartActions({
  assessmentId,
  durationMinutes,
  kataIds,
}: AssessmentStartActionsProps) {
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setInProgress(hasAssessmentSession(assessmentId));
  }, [assessmentId]);

  const assessmentHref = `/assessment/${assessmentId}`;

  const handleStartOver = () => {
    startFreshSession(assessmentId, durationMinutes, kataIds);
    window.location.href = assessmentHref;
  };

  if (!inProgress) {
    return (
      <a className="btn btn-primary" href={assessmentHref}>
        Start
      </a>
    );
  }

  return (
    <div className="card-actions">
      <a className="btn btn-primary" href={assessmentHref}>
        Resume
      </a>
      <button type="button" className="btn btn-secondary" onClick={handleStartOver}>
        Start Over
      </button>
    </div>
  );
}
```
