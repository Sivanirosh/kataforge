import type { TestResult } from '../lib/configTypes';

interface FailedTestReviewProps {
  results: TestResult[];
}

function statusLabel(status: TestResult['status']): string {
  switch (status) {
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

export default function FailedTestReview({ results }: FailedTestReviewProps) {
  const failed = results.filter((result) => result.status !== 'passed');
  if (failed.length === 0) return null;

  return (
    <div className="failed-test-review">
      <h3 className="failed-test-review-heading">Where you missed</h3>
      <ul className="test-list">
        {failed.map((result) => (
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
            {result.error && <pre className="test-error">{result.error}</pre>}
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
