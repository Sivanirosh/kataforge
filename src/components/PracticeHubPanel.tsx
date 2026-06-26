import { useEffect, useMemo, useState } from 'react';
import { type ActivityCatalog, type ActivityEntry } from '../lib/activity';
import {
  emptyPracticeDashboard,
  loadPracticeDashboard,
  type PracticeDashboardSummary,
} from '../lib/practiceDashboard';
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
  const initialDashboard = useMemo(
    () => emptyPracticeDashboard(starterKata ?? undefined),
    [starterKata],
  );
  const [dashboard, setDashboard] = useState<PracticeDashboardSummary>(initialDashboard);

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
      setDashboard(loadPracticeDashboard(catalog, starterKata ?? undefined));
    },
    [assessments, builtInKatas, cursus, starterKata],
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

  const primary = dashboard.primary;
  const visibleActivity = dashboard.activityEntries.slice(1, 4);

  const openImport = () => {
    window.dispatchEvent(new Event('kataforge:open-user-kata-import'));
  };

  return (
    <aside className="hub-panel" aria-label="Practice dashboard">
      <div className="hub-panel-head">
        <span className="hub-panel-kicker">Practice dashboard</span>
        <span className="hub-panel-count">
          {dashboard.recentActivityCount ? `${dashboard.recentActivityCount} recent` : 'fresh'}
        </span>
      </div>

      <div className="hub-dashboard-stats" aria-label="Practice dashboard stats">
        <span className="hub-stat">
          <strong>{dashboard.solvedCount} / {dashboard.submittedCount}</strong>
          <small>Solved / submitted</small>
        </span>
        <span className="hub-stat">
          <strong>{dashboard.activeCount}</strong>
          <small>Active drafts/sessions</small>
        </span>
        <span className="hub-stat">
          <strong>{dashboard.recentActivityCount}</strong>
          <small>Recent activity</small>
        </span>
      </div>

      <div className="hub-primary">
        <span className="hub-primary-kind">{primary.kindLabel}</span>
        <h2>{primary.title}</h2>
        <p>{primary.detail}</p>
        <a className="kiro-btn kiro-btn-primary" href={primary.href}>
          {primary.label}
        </a>
      </div>

      {visibleActivity.length > 0 ? (
        <ol className="hub-activity-list" aria-label="Recent activity">
          {visibleActivity.map((entry) => (
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
          No local progress yet. Drafts, scores, assessment sessions, and Cursus
          progress stay in this browser and will appear here.
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
