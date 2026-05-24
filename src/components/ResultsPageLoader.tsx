import { useEffect, useState } from 'react';
import ResultsPage from './ResultsPage';
import type { KataSolution } from './ResultSummary';
import type { Assessment } from '../lib/configTypes';
import { kataPracticeAssessment } from '../lib/kataPractice';
import { getUserKata } from '../lib/userKatas';

interface ResultsPageLoaderProps {
  assessmentId: string;
  builtInAssessment?: Assessment;
  builtInKataTitles?: Record<string, string>;
  builtInKataSolutions?: Record<string, KataSolution>;
  durationMinutes?: number | null;
  retryHref?: string;
}

function builtInRetryHref(assessment: Assessment): string {
  const isKataPractice =
    assessment.kataIds.length === 1 && assessment.id === assessment.kataIds[0];
  return isKataPractice ? `/problem/${assessment.id}` : `/assessment/${assessment.id}`;
}

export default function ResultsPageLoader({
  assessmentId,
  builtInAssessment,
  builtInKataTitles,
  builtInKataSolutions,
  durationMinutes,
  retryHref,
}: ResultsPageLoaderProps) {
  const [userData, setUserData] = useState<{
    assessment: Assessment;
    kataTitles: Record<string, string>;
    kataSolutions: Record<string, KataSolution>;
    retryHref: string;
  } | null>(null);
  const [checkedUser, setCheckedUser] = useState(Boolean(builtInAssessment));

  useEffect(() => {
    if (builtInAssessment) return;
    const userKata = getUserKata(assessmentId);
    if (userKata) {
      const assessment = kataPracticeAssessment(userKata);
      setUserData({
        assessment,
        kataTitles: { [userKata.id]: userKata.title },
        kataSolutions: {
          [userKata.id]: {
            solutionCode: userKata.solutionCode,
            solutionExplanationHtml: userKata.solutionExplanationHtml,
          },
        },
        retryHref: `/problem/${userKata.id}`,
      });
    }
    setCheckedUser(true);
  }, [assessmentId, builtInAssessment]);

  if (builtInAssessment) {
    return (
      <ResultsPage
        assessmentId={builtInAssessment.id}
        kataIds={builtInAssessment.kataIds}
        kataTitles={builtInKataTitles ?? {}}
        kataSolutions={builtInKataSolutions ?? {}}
        durationMinutes={durationMinutes ?? builtInAssessment.durationMinutes}
        retryHref={retryHref ?? builtInRetryHref(builtInAssessment)}
      />
    );
  }

  if (!checkedUser) {
    return <p aria-busy="true">Loading results…</p>;
  }

  if (!userData) {
    return (
      <p>
        Results not found. Start from <a href="/#katas">Practice</a> or import a kata there.
      </p>
    );
  }

  return (
    <ResultsPage
      assessmentId={userData.assessment.id}
      kataIds={userData.assessment.kataIds}
      kataTitles={userData.kataTitles}
      kataSolutions={userData.kataSolutions}
      durationMinutes={userData.assessment.durationMinutes}
      retryHref={userData.retryHref}
    />
  );
}
