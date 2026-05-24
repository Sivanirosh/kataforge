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
    return <ResultsSkeleton />;
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
