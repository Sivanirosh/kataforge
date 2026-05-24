import { useEffect, useState } from 'react';
import AssessmentShell, { type KataData } from './AssessmentShell';
import type { Assessment } from '../lib/configTypes';
import { kataPracticeAssessment } from '../lib/kataPractice';
import { getUserKata } from '../lib/userKatas';

interface ProblemPageProps {
  kataId: string;
  builtinKata?: KataData;
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
  brandingTitle: string;
}

export default function ProblemPage({
  kataId,
  builtinKata,
  judgeConfig,
  brandingTitle,
}: ProblemPageProps) {
  const [kata, setKata] = useState<KataData | null>(builtinKata ?? null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (builtinKata) {
      setKata(builtinKata);
      setMissing(false);
      return;
    }
    const userKata = getUserKata(kataId);
    if (userKata) {
      setKata(userKata);
      setMissing(false);
    } else {
      setMissing(true);
    }
  }, [kataId, builtinKata]);

  if (missing) {
    return (
      <main className="page-main">
        <p>
          Kata not found. <a href="/#katas">Import a kata</a> on the hub or pick an existing one.
        </p>
      </main>
    );
  }

  if (!kata) {
    return (
      <main className="page-main">
        <p aria-busy="true">Loading kata…</p>
      </main>
    );
  }

  const assessment: Assessment = kataPracticeAssessment(kata);

  return (
    <AssessmentShell
      assessment={assessment}
      katas={[kata]}
      judgeConfig={judgeConfig}
      brandingTitle={brandingTitle}
    />
  );
}
