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
