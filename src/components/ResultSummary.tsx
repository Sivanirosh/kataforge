import type { AssessmentScore } from '../lib/configTypes';

interface ResultSummaryProps {
  score: AssessmentScore;
  kataTitles: Record<string, string>;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

export default function ResultSummary({ score, kataTitles }: ResultSummaryProps) {
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
        {score.problems.map((p) => (
          <li key={p.kataId}>
            <span className="problem-score-name">{kataTitles[p.kataId] ?? p.kataId}</span>
            <span className="problem-score-value">
              {p.passed}/{p.total} ({p.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
