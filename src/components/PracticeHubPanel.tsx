import { useEffect, useMemo, useState } from 'react';
import {
  loadActivityFeed,
  type ActivityCatalog,
  type ActivityEntry,
} from '../lib/activity';
import { listUserKatas } from '../lib/userKatas';

export interface PracticeHubKata {
  id: string;
  title: string;
  difficulty: string;
  estimatedMinutes: number;
}

export interface PracticeHubAssessment {
  id: string;
  title: string;
  durationMinutes: number | null;
  kataCount: number;
}

export interface PracticeHubCursus {
  id: string;
  title: string;
  stepCount: number;
  stepKeys: string[];
}

interface PracticeHubPanelProps {
  builtInKatas: PracticeHubKata[];
  assessments: PracticeHubAssessment[];
  cursus: PracticeHubCursus[];
}

function entryKindLabel(kind: ActivityEntry['kind']): string {
  if (kind === 'assessment') return 'Assessment';
  if (kind === 'cursus') return 'Cursus';
  return 'Kata';
}

export default function PracticeHubPanel({
  builtInKatas,
  assessments,
  cursus,
}: PracticeHubPanelProps) {
  const starterKata =
    builtInKatas.find((kata) => kata.id === 'two-sum') ?? builtInKatas[0] ?? null;
  const [feed, setFeed] = useState<ActivityEntry[]>([]);

  const refresh = useMemo(
    () => () => {
      const userKatas = listUserKatas();
      const catalog: ActivityCatalog = {
        katas: [
          ...builtInKatas.map((kata) => ({ ...kata, source: 'builtin' as const })),
          ...userKatas.map((kata) => ({
            id: kata.id,
            title: kata.title,
            estimatedMinutes: kata.estimatedMinutes,
            source: 'user' as const,
          })),
        ],
        assessments,
        cursus,
      };
      setFeed(loadActivityFeed(catalog));
    },
    [assessments, builtInKatas, cursus],
  );

  useEffect(() => {
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('kataforge:user-katas-changed', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('kataforge:user-katas-changed', refresh);
    };
  }, [refresh]);

  const primary = feed[0] ?? null;
  const primaryHref = primary?.href ?? (starterKata ? `/problem/${starterKata.id}` : '#library');
  const primaryLabel = primary ? 'Continue' : 'Start practice';
  const primaryTitle = primary?.title ?? starterKata?.title ?? 'Open Library';
  const primaryDetail =
    primary?.detail ??
    (starterKata ? `${starterKata.difficulty} / ${starterKata.estimatedMinutes} min` : 'Browse the library');

  const openImport = () => {
    window.dispatchEvent(new Event('kataforge:open-user-kata-import'));
  };

  return (
    <aside className="hub-panel" aria-label="Practice state">
      <div className="hub-panel-head">
        <span className="hub-panel-kicker">Local state</span>
        <span className="hub-panel-count">{feed.length || 'fresh'} sessions</span>
      </div>

      <div className="hub-primary">
        <span className="hub-primary-kind">
          {primary ? entryKindLabel(primary.kind) : 'Starter kata'}
        </span>
        <h2>{primaryTitle}</h2>
        <p>{primaryDetail}</p>
        <a className="kiro-btn kiro-btn-primary" href={primaryHref}>
          {primaryLabel}
        </a>
      </div>

      {feed.length > 1 ? (
        <ol className="hub-activity-list" aria-label="Recent activity">
          {feed.slice(1, 4).map((entry) => (
            <li key={`${entry.kind}-${entry.id}`}>
              <a href={entry.href}>
                <span>{entry.title}</span>
                <small>{entryKindLabel(entry.kind)}</small>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <p className="hub-empty">
          Drafts, scores, assessment sessions, and Cursus progress stay in this
          browser and will appear here as you work.
        </p>
      )}

      <div className="hub-panel-actions">
        <a className="kiro-btn kiro-btn-secondary" href="#library">
          Browse Library
        </a>
        <a className="kiro-btn kiro-btn-secondary" href="#import-user-kata" onClick={openImport}>
          Import UserKata
        </a>
      </div>
    </aside>
  );
}
