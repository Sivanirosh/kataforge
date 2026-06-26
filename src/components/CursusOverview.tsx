import { useEffect, useState } from 'react';
import { loadCursusProgress, type CursusProgress } from '../lib/storage';

export interface CursusOverviewItem {
  id: string;
  title: string;
  description: string;
  estimatedHours?: number;
  prerequisites: string[];
  moduleCount: number;
  stepCount: number;
  stepKeys: string[];
}

interface CursusOverviewProps {
  items: CursusOverviewItem[];
}

function progressHref(item: CursusOverviewItem, progress: CursusProgress | null): string {
  if (!progress?.lastStepKey) return `/cursus/${item.id}`;
  const stepIndex = item.stepKeys.indexOf(progress.lastStepKey);
  return stepIndex >= 0 ? `/cursus/${item.id}/step/${stepIndex}` : `/cursus/${item.id}`;
}

export default function CursusOverview({ items }: CursusOverviewProps) {
  const [progressById, setProgressById] = useState<Record<string, CursusProgress | null>>({});

  useEffect(() => {
    setProgressById(
      Object.fromEntries(items.map((item) => [item.id, loadCursusProgress(item.id)])),
    );
  }, [items]);

  return (
    <ul className="cursus-compare" role="list">
      {items.map((item, index) => {
        const progress = progressById[item.id] ?? null;
        const completed = progress?.completedStepKeys.length ?? 0;
        return (
          <li className="cursus-row" key={item.id}>
            <span className="cursus-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="cursus-main">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.prerequisites.length > 0 && (
                <p className="cursus-prereqs">
                  Prereqs: {item.prerequisites.slice(0, 2).join(' / ')}
                </p>
              )}
            </div>
            <div className="cursus-meta-grid">
              <span>
                <strong>{item.estimatedHours ?? '-'}</strong>
                <small>hours</small>
              </span>
              <span>
                <strong>{item.moduleCount}</strong>
                <small>modules</small>
              </span>
              <span>
                <strong>{item.stepCount}</strong>
                <small>steps</small>
              </span>
              <span>
                <strong>{completed}</strong>
                <small>done</small>
              </span>
            </div>
            <a className="cursus-open" href={progressHref(item, progress)}>
              {progress ? 'Continue' : 'Open'}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
