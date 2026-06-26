import { useCallback, useEffect, useState } from 'react';
import KataWorkspace, { type JudgeConfig, type KataData } from './KataWorkspace';
import ThemeToggle from './ThemeToggle';
import { persistAssessmentScore } from '../lib/assessmentResults';
import { loadSession, saveSession } from '../lib/storage';
import { getUserKata } from '../lib/userKatas';
import { recordActivity } from '../lib/activity';

interface ProblemPageProps {
  kataId: string;
  builtinKata?: KataData;
  judgeConfig: JudgeConfig;
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

  // Start a session the first time a kata is opened so the results page can
  // report time spent. Practice is untimed (durationMinutes: null).
  useEffect(() => {
    if (!kata) return;
    const existing = loadSession(kata.id);
    if (!existing) {
      saveSession({
        assessmentId: kata.id,
        startedAt: Date.now(),
        durationMinutes: null,
        currentKataIndex: 0,
        submitted: false,
      });
    }
    recordActivity({
      kind: 'kata',
      id: kata.id,
      title: kata.title,
      href: `/problem/${kata.id}`,
      source: builtinKata ? 'builtin' : 'user',
      detail: `${kata.estimatedMinutes} min practice`,
    });
  }, [builtinKata, kata]);

  // Single-kata practice scores and reviews under the kata's own id, so the
  // results route is simply /results/{kataId}. No assessment wrapper needed.
  const handleSubmit = useCallback(() => {
    if (!kata) return;
    recordActivity({
      kind: 'kata',
      id: kata.id,
      title: kata.title,
      href: `/problem/${kata.id}`,
      source: builtinKata ? 'builtin' : 'user',
      detail: 'submitted practice',
    });
    persistAssessmentScore(kata.id, [kata.id]);
    window.location.href = `/results/${kata.id}`;
  }, [builtinKata, kata]);

  if (missing) {
    return (
      <main className="page-main">
        <p>
          Kata not found. <a href="/#library">Import a kata</a> on the hub or pick an existing one.
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

  return (
    <div className="assessment-shell">
      <header className="app-header">
        <div className="header-brand">
          <a href="/" className="brand" aria-label={brandingTitle}>
            <img
              className="brand-logo"
              src="/kataforge-logo.png"
              alt=""
              width={32}
              height={32}
              decoding="async"
            />
            <span>{brandingTitle}</span>
          </a>
          <span className="header-sep" aria-hidden="true">
            /
          </span>
          <span className="assessment-name">{kata.title}</span>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <span className="timer timer-untimed">Untimed</span>
        </div>
      </header>

      <KataWorkspace kata={kata} judgeConfig={judgeConfig} onSubmit={handleSubmit} />
    </div>
  );
}
