import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { listUserKatas, type UserKataRecord } from '../lib/userKatas';
import type { Difficulty } from '../lib/configTypes';

export interface BuiltInKataSummary {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
}

export interface HubKataEntry {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  source: 'builtin' | 'user';
}

interface KataHubListProps {
  builtInKatas: BuiltInKataSummary[];
  toolbarActions?: ReactNode;
  beforeList?: ReactNode;
}

type DifficultyFilter = 'all' | Difficulty;
type SourceFilter = 'all' | HubKataEntry['source'];

const difficultyFilters: DifficultyFilter[] = ['all', 'easy', 'easy-medium', 'medium', 'hard'];
const sourceFilters: SourceFilter[] = ['all', 'builtin', 'user'];
const difficultyRank: Record<Difficulty, number> = {
  easy: 0,
  'easy-medium': 1,
  medium: 2,
  hard: 3,
};

function sourceLabel(source: SourceFilter): string {
  if (source === 'builtin') return 'Built-in';
  if (source === 'user') return 'UserKata';
  return 'All';
}

function difficultyLabel(difficulty: DifficultyFilter): string {
  if (difficulty === 'easy-medium') return 'Easy-medium';
  if (difficulty === 'all') return 'All';
  return difficulty[0].toUpperCase() + difficulty.slice(1);
}

export function mergeKatas(
  builtIn: BuiltInKataSummary[],
  user: UserKataRecord[],
): HubKataEntry[] {
  return [
    ...builtIn.map((kata) => ({ ...kata, source: 'builtin' as const })),
    ...user.map((kata) => ({
      id: kata.id,
      title: kata.title,
      difficulty: kata.difficulty,
      estimatedMinutes: kata.estimatedMinutes,
      source: 'user' as const,
    })),
  ];
}

export function sortKatasForLibrary(katas: HubKataEntry[]): HubKataEntry[] {
  return [...katas].sort((a, b) => {
    const byDifficulty = difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
    if (byDifficulty !== 0) return byDifficulty;
    return a.title.localeCompare(b.title);
  });
}

export function filterKatasForLibrary(
  katas: HubKataEntry[],
  query: string,
  difficulty: DifficultyFilter,
  source: SourceFilter,
): HubKataEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return sortKatasForLibrary(katas).filter((kata) => {
    const matchesQuery =
      normalizedQuery.length === 0 || kata.title.toLowerCase().includes(normalizedQuery);
    const matchesDifficulty = difficulty === 'all' || kata.difficulty === difficulty;
    const matchesSource = source === 'all' || kata.source === source;
    return matchesQuery && matchesDifficulty && matchesSource;
  });
}

export default function KataHubList({
  builtInKatas,
  toolbarActions,
  beforeList,
}: KataHubListProps) {
  const [userKatas, setUserKatas] = useState<UserKataRecord[]>([]);
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [source, setSource] = useState<SourceFilter>('all');

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

  const allKatas = useMemo(
    () => mergeKatas(builtInKatas, userKatas),
    [builtInKatas, userKatas],
  );
  const visibleKatas = useMemo(
    () => filterKatasForLibrary(allKatas, query, difficulty, source),
    [allKatas, difficulty, query, source],
  );

  return (
    <div className="library-hub">
      <div className="library-command-strip" aria-label="Library controls">
        <label className="library-search">
          <span className="sr-only">Search katas by title</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search katas"
          />
        </label>

        <div className="library-filter-group" role="group" aria-label="Difficulty filter">
          {difficultyFilters.map((option) => (
            <button
              key={option}
              type="button"
              className={option === difficulty ? 'active' : ''}
              aria-pressed={option === difficulty}
              onClick={() => setDifficulty(option)}
            >
              {difficultyLabel(option)}
            </button>
          ))}
        </div>

        <div className="library-filter-group source" role="group" aria-label="Source filter">
          {sourceFilters.map((option) => (
            <button
              key={option}
              type="button"
              className={option === source ? 'active' : ''}
              aria-pressed={option === source}
              onClick={() => setSource(option)}
            >
              {sourceLabel(option)}
            </button>
          ))}
        </div>

        {toolbarActions && <div className="library-toolbar-actions">{toolbarActions}</div>}
      </div>

      <p className="library-result-count" aria-live="polite">
        {visibleKatas.length} of {allKatas.length} katas
      </p>

      {beforeList}

      {visibleKatas.length === 0 ? (
        <div className="library-empty" role="status">
          No katas match the current filters.
        </div>
      ) : (
        <ul className="library-list" aria-label="Kata library">
          {visibleKatas.map((kata) => (
            <li className={`library-row source-${kata.source}`} key={`${kata.source}-${kata.id}`}>
              <a className="library-row-title" href={`/problem/${kata.id}`}>
                <span>{kata.title}</span>
                <small>{kata.source === 'user' ? 'UserKata' : 'built-in'}</small>
              </a>
              <span className={`library-difficulty difficulty-${kata.difficulty}`}>
                {kata.difficulty}
              </span>
              <span className="library-time">{kata.estimatedMinutes} min</span>
              <a className="library-open" href={`/problem/${kata.id}`}>
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
