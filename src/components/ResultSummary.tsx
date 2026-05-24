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
