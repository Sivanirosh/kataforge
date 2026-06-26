export type ActivityKind = 'kata' | 'assessment' | 'cursus';
export type ActivitySource = 'builtin' | 'user';

export interface ActivityEntry {
  kind: ActivityKind;
  id: string;
  title: string;
  href: string;
  updatedAt: number;
  source?: ActivitySource;
  detail?: string;
}

export interface ActivityCatalog {
  katas?: Array<{
    id: string;
    title: string;
    estimatedMinutes?: number;
    source?: ActivitySource;
  }>;
  assessments?: Array<{
    id: string;
    title: string;
    durationMinutes: number | null;
    kataCount: number;
  }>;
  cursus?: Array<{
    id: string;
    title: string;
    stepCount: number;
    stepKeys: string[];
  }>;
}

export const ACTIVITY_STORAGE_KEY = 'kataforge:activity:v1';

function hasStorage(): boolean {
  return typeof localStorage !== 'undefined';
}

function activityKey(entry: Pick<ActivityEntry, 'kind' | 'id'>): string {
  return `${entry.kind}:${entry.id}`;
}

function isActivityEntry(value: unknown): value is ActivityEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Partial<ActivityEntry>;
  return (
    (entry.kind === 'kata' || entry.kind === 'assessment' || entry.kind === 'cursus') &&
    typeof entry.id === 'string' &&
    entry.id.length > 0 &&
    typeof entry.title === 'string' &&
    entry.title.length > 0 &&
    typeof entry.href === 'string' &&
    entry.href.length > 0 &&
    typeof entry.updatedAt === 'number' &&
    Number.isFinite(entry.updatedAt) &&
    (entry.source === undefined || entry.source === 'builtin' || entry.source === 'user') &&
    (entry.detail === undefined || typeof entry.detail === 'string')
  );
}

function sortNewestFirst(entries: ActivityEntry[]): ActivityEntry[] {
  return [...entries].sort((a, b) => {
    if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
    return a.title.localeCompare(b.title);
  });
}

export function loadActivityEntries(): ActivityEntry[] {
  if (!hasStorage()) return [];
  const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortNewestFirst(parsed.filter(isActivityEntry));
  } catch {
    localStorage.removeItem(ACTIVITY_STORAGE_KEY);
    return [];
  }
}

export function saveActivityEntries(entries: ActivityEntry[]): void {
  if (!hasStorage()) return;
  const unique = new Map<string, ActivityEntry>();
  for (const entry of entries.filter(isActivityEntry)) {
    const key = activityKey(entry);
    const existing = unique.get(key);
    if (!existing || entry.updatedAt >= existing.updatedAt) {
      unique.set(key, entry);
    }
  }
  localStorage.setItem(
    ACTIVITY_STORAGE_KEY,
    JSON.stringify(sortNewestFirst([...unique.values()]).slice(0, 20)),
  );
}

export function recordActivity(entry: Omit<ActivityEntry, 'updatedAt'> & { updatedAt?: number }): void {
  const next: ActivityEntry = {
    ...entry,
    updatedAt: entry.updatedAt ?? Date.now(),
  };
  saveActivityEntries([next, ...loadActivityEntries()]);
}

function readJsonKey<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function fallbackFromSessions(catalog: ActivityCatalog): ActivityEntry[] {
  const katas = new Map((catalog.katas ?? []).map((kata) => [kata.id, kata]));
  const assessments = new Map((catalog.assessments ?? []).map((assessment) => [assessment.id, assessment]));
  const entries: ActivityEntry[] = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith('kataforge:session:')) continue;
    const id = key.slice('kataforge:session:'.length);
    const session = readJsonKey<{
      startedAt?: unknown;
      currentKataIndex?: unknown;
      submitted?: unknown;
    }>(key);
    const startedAt = typeof session?.startedAt === 'number' ? session.startedAt : 0;
    if (startedAt <= 0) continue;

    const assessment = assessments.get(id);
    if (assessment) {
      entries.push({
        kind: 'assessment',
        id,
        title: assessment.title,
        href: `/assessment/${id}`,
        updatedAt: startedAt,
        detail: assessment.durationMinutes
          ? `${assessment.durationMinutes}m · ${assessment.kataCount} katas`
          : `untimed · ${assessment.kataCount} katas`,
      });
      continue;
    }

    const kata = katas.get(id);
    if (kata) {
      entries.push({
        kind: 'kata',
        id,
        title: kata.title,
        href: `/problem/${id}`,
        updatedAt: startedAt,
        source: kata.source,
        detail: kata.estimatedMinutes ? `${kata.estimatedMinutes} min practice` : 'practice',
      });
    }
  }

  return entries;
}

function fallbackFromCursus(catalog: ActivityCatalog): ActivityEntry[] {
  const cursusById = new Map((catalog.cursus ?? []).map((cursus) => [cursus.id, cursus]));
  const entries: ActivityEntry[] = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith('kataforge:cursus-progress:')) continue;
    const id = key.slice('kataforge:cursus-progress:'.length);
    const cursus = cursusById.get(id);
    if (!cursus) continue;
    const progress = readJsonKey<{
      startedAt?: unknown;
      lastStepKey?: unknown;
      completedStepKeys?: unknown;
    }>(key);
    const startedAt = typeof progress?.startedAt === 'number' ? progress.startedAt : 0;
    if (startedAt <= 0) continue;

    const stepIndex =
      typeof progress?.lastStepKey === 'string'
        ? cursus.stepKeys.indexOf(progress.lastStepKey)
        : -1;
    const completed = Array.isArray(progress?.completedStepKeys)
      ? progress.completedStepKeys.length
      : 0;

    entries.push({
      kind: 'cursus',
      id,
      title: cursus.title,
      href: stepIndex >= 0 ? `/cursus/${id}/step/${stepIndex}` : `/cursus/${id}`,
      updatedAt: startedAt,
      detail: `${completed}/${cursus.stepCount} steps complete`,
    });
  }

  return entries;
}

export function loadActivityFeed(catalog: ActivityCatalog = {}): ActivityEntry[] {
  if (!hasStorage()) return [];

  const knownKatas = catalog.katas ? new Set(catalog.katas.map((entry) => entry.id)) : null;
  const knownAssessments = catalog.assessments
    ? new Set(catalog.assessments.map((entry) => entry.id))
    : null;
  const knownCursus = catalog.cursus ? new Set(catalog.cursus.map((entry) => entry.id)) : null;

  const unique = new Map<string, ActivityEntry>();
  for (const entry of [
    ...loadActivityEntries(),
    ...fallbackFromSessions(catalog),
    ...fallbackFromCursus(catalog),
  ]) {
    if (entry.kind === 'kata' && knownKatas && !knownKatas.has(entry.id)) continue;
    if (
      entry.kind === 'assessment' &&
      knownAssessments &&
      !knownAssessments.has(entry.id)
    ) {
      continue;
    }
    if (entry.kind === 'cursus' && knownCursus && !knownCursus.has(entry.id)) continue;

    const key = activityKey(entry);
    const existing = unique.get(key);
    if (!existing || entry.updatedAt > existing.updatedAt) {
      unique.set(key, entry);
    }
  }

  return sortNewestFirst([...unique.values()]);
}
