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
