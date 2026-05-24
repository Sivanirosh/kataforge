import { useEffect, useState } from 'react';
import ResultSummary from './ResultSummary';
import type { AssessmentScore } from '../lib/configTypes';
import { scoreAssessment, scoreProblem } from '../lib/scoring';
import { getElapsedMs, loadResults, loadSession } from '../lib/storage';

interface ResultsPageProps {
  assessmentId: string;
  kataIds: string[];
  kataTitles: Record<string, string>;
}

export default function ResultsPage({
  assessmentId,
  kataIds,
  kataTitles,
}: ResultsPageProps) {
  const [score, setScore] = useState<AssessmentScore | null>(null);

  useEffect(() => {
    const session = loadSession(assessmentId);
    const elapsedMs = session ? getElapsedMs(session) : 0;
    const problemScores = kataIds.map((id) => {
      const results = loadResults(id) ?? [];
      return scoreProblem(id, results);
    });
    setScore(scoreAssessment(assessmentId, problemScores, elapsedMs));
  }, [assessmentId, kataIds]);

  if (!score) {
    return <p className="results-loading">Loading results…</p>;
  }

  return (
    <div className="results-page-inner">
      <ResultSummary score={score} kataTitles={kataTitles} />
      <div className="results-actions">
        <a href={`/assessment/${assessmentId}`} className="btn btn-primary">
          Retry assessment
        </a>
        <a href="/" className="btn btn-secondary">
          Back to home
        </a>
      </div>
    </div>
  );
}
