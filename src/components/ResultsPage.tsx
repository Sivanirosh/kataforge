import { useEffect, useState } from 'react';
import ResultSummary, { type KataSolution } from './ResultSummary';
import type { AssessmentScore, TestResult } from '../lib/configTypes';
import { loadResultsByKata, persistAssessmentScore } from '../lib/assessmentResults';
import { retryAssessmentSession } from '../lib/storage';

interface ResultsPageProps {
  assessmentId: string;
  kataIds: string[];
  kataTitles: Record<string, string>;
  kataSolutions: Record<string, KataSolution>;
  durationMinutes: number | null;
}

function ResultsSkeleton() {
  return (
    <div className="results-skeleton" aria-busy="true" aria-label="Loading results">
      <div className="skeleton skeleton-line skeleton-line-title" />
      <div className="skeleton skeleton-score-hero" />
      <div className="skeleton skeleton-line skeleton-line-md" />
      <div className="skeleton skeleton-line skeleton-line-md" />
      <div className="skeleton skeleton-line skeleton-line-sm" />
    </div>
  );
}

export default function ResultsPage({
  assessmentId,
  kataIds,
  kataTitles,
  kataSolutions,
  durationMinutes,
}: ResultsPageProps) {
  const [score, setScore] = useState<AssessmentScore | null>(null);
  const [resultsByKata, setResultsByKata] = useState<Record<string, TestResult[]>>({});

  useEffect(() => {
    setScore(persistAssessmentScore(assessmentId, kataIds));
    setResultsByKata(loadResultsByKata(kataIds));
  }, [assessmentId, kataIds]);

  const handleRetry = () => {
    retryAssessmentSession(assessmentId, durationMinutes, kataIds);
    window.location.href = `/assessment/${assessmentId}`;
  };

  if (!score) {
    return <ResultsSkeleton />;
  }

  return (
    <div className="results-page-inner">
      <ResultSummary
        score={score}
        kataTitles={kataTitles}
        resultsByKata={resultsByKata}
        kataSolutions={kataSolutions}
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
