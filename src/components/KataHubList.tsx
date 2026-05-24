import { useEffect, useMemo, useState } from 'react';
import { listUserKatas, type UserKataRecord } from '../lib/userKatas';

export interface BuiltInKataSummary {
  id: string;
  title: string;
  difficulty: string;
  estimatedMinutes: number;
}

interface HubKataEntry {
  id: string;
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  source: 'builtin' | 'user';
}

interface KataHubListProps {
  builtInKatas: BuiltInKataSummary[];
}

function mergeKatas(builtIn: BuiltInKataSummary[], user: UserKataRecord[]): HubKataEntry[] {
  const merged: HubKataEntry[] = [
    ...builtIn.map((kata) => ({ ...kata, source: 'builtin' as const })),
    ...user.map((kata) => ({
      id: kata.id,
      title: kata.title,
      difficulty: kata.difficulty,
      estimatedMinutes: kata.estimatedMinutes,
      source: 'user' as const,
    })),
  ];
  return merged.sort((a, b) => a.title.localeCompare(b.title));
}

export default function KataHubList({ builtInKatas }: KataHubListProps) {
  const [userKatas, setUserKatas] = useState<UserKataRecord[]>([]);

  useEffect(() => {
    const refresh = () => setUserKatas(listUserKatas());
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('kataforge:user-katas-changed', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('kataforge:user-katas-changed', refresh);
    };
  }, []);

  const katas = useMemo(() => mergeKatas(builtInKatas, userKatas), [builtInKatas, userKatas]);

  if (katas.length === 0) {
    return <p className="docs-empty">No katas available.</p>;
  }

  return (
    <ul className="card-list">
      {katas.map((kata) => (
        <li className="card" key={`${kata.source}-${kata.id}`}>
          <h3>
            {kata.title}
            {kata.source === 'user' && (
              <span className="badge-user-kata" title="UserKata imported in this browser">
                custom
              </span>
            )}
          </h3>
          <p>
            <span className={`badge badge-${kata.difficulty}`}>{kata.difficulty}</span>{' '}
            {kata.estimatedMinutes} min
          </p>
          <a className="btn btn-secondary" href={`/problem/${kata.id}`}>
            Open
          </a>
        </li>
      ))}
    </ul>
  );
}
