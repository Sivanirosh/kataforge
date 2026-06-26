import { useEffect, useState } from 'react';
import type { AssessmentScore, TestResult } from '../lib/configTypes';
import FailedTestReview from './FailedTestReview';
import SolutionReview from './SolutionReview';

function skipCountUp(): boolean {
  return (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function useCountUp(target: number, durationMs = 700): number {
  const [value, setValue] = useState(() => (skipCountUp() ? target : 0));

  useEffect(() => {
    if (skipCountUp()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export interface KataSolution {
  solutionCode?: string;
  solutionExplanationHtml?: string;
}

interface ResultSummaryProps {
  score: AssessmentScore;
  kataTitles: Record<string, string>;
  resultsByKata: Record<string, TestResult[]>;
  kataSolutions: Record<string, KataSolution>;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

export default function ResultSummary({
  score,
  kataTitles,
  resultsByKata,
  kataSolutions,
}: ResultSummaryProps) {
  const displayPercent = useCountUp(score.percentage);
  return (
    <div className="result-summary">
      <h2>Assessment Results</h2>
      <div
        className="score-hero"
        data-perfect={score.percentage === 100 ? 'true' : undefined}
      >
        <div className="score-percent">{displayPercent}%</div>
        <div className="score-detail">
          {score.totalPassed}/{score.totalTests} tests passed · {formatDuration(score.elapsedMs)}
        </div>
      </div>
      <ul className="problem-scores">
        {score.problems.map((problem) => {
          const kataResults = resultsByKata[problem.kataId] ?? [];
          const solution = kataSolutions[problem.kataId];
          const needsReview = problem.percentage < 100;
          const hasSolution = Boolean(solution?.solutionCode || solution?.solutionExplanationHtml);

          return (
            <li key={problem.kataId} className="problem-score-item">
              <div className="problem-score-row">
                <span className="problem-score-name">
                  {kataTitles[problem.kataId] ?? problem.kataId}
                </span>
                <span className="problem-score-value">
                  {problem.passed}/{problem.total} ({problem.percentage}%)
                </span>
              </div>
              {needsReview && (
                <div className="problem-review">
                  <FailedTestReview results={kataResults} />
                  {hasSolution && (
                    <SolutionReview
                      solutionCode={solution.solutionCode}
                      solutionExplanationHtml={solution.solutionExplanationHtml}
                      heading="View solution and explanation"
                    />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
