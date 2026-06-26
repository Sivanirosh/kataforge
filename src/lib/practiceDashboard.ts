import {
  loadActivityFeed,
  type ActivityCatalog,
  type ActivityEntry,
} from './activity';

const RESULT_PREFIX = 'kataforge:results:';
const DRAFT_PREFIX = 'kataforge:draft:';
const SESSION_PREFIX = 'kataforge:session:';

export interface PracticeDashboardStarter {
  id: string;
  title: string;
  difficulty?: string;
  estimatedMinutes?: number;
}

export interface PracticeDashboardPrimaryAction {
  href: string;
  label: 'Continue' | 'Start practice';
  title: string;
  detail: string;
  kindLabel: string;
}

export interface PracticeDashboardSummary {
  solvedCount: number;
  submittedCount: number;
  activeCount: number;
  recentActivityCount: number;
  primary: PracticeDashboardPrimaryAction;
  activityEntries: ActivityEntry[];
}

function hasStorage(): boolean {
  return typeof localStorage !== 'undefined';
}

function knownIds<T extends { id: string }>(items: T[] | undefined): Set<string> | null {
  return items ? new Set(items.map((item) => item.id)) : null;
}

function isKnown(id: string, ids: Set<string> | null): boolean {
  return ids === null || ids.has(id);
}

function storageKeys(prefix: string): string[] {
  if (!hasStorage()) return [];
  const keys: string[] = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(prefix)) keys.push(key);
    }
  } catch {
    return keys;
  }
  return keys;
}

function readRaw(key: string): string | null {
  if (!hasStorage()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readJson(key: string): unknown {
  const raw = readRaw(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function isResultRecord(value: unknown): value is { status: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { status?: unknown }).status === 'string'
  );
}

function countSubmittedResults(knownKatas: Set<string> | null): Pick<
  PracticeDashboardSummary,
  'solvedCount' | 'submittedCount'
> {
  let solvedCount = 0;
  let submittedCount = 0;

  for (const key of storageKeys(RESULT_PREFIX)) {
    const kataId = key.slice(RESULT_PREFIX.length);
    if (!kataId || !isKnown(kataId, knownKatas)) continue;

    const parsed = readJson(key);
    if (!Array.isArray(parsed)) continue;
    const results = parsed.filter(isResultRecord);
    if (results.length === 0) continue;

    submittedCount += 1;
    if (results.every((result) => result.status === 'passed')) {
      solvedCount += 1;
    }
  }

  return { solvedCount, submittedCount };
}

function collectActiveDrafts(knownKatas: Set<string> | null): Set<string> {
  const drafts = new Set<string>();
  for (const key of storageKeys(DRAFT_PREFIX)) {
    const kataId = key.slice(DRAFT_PREFIX.length);
    if (!kataId || !isKnown(kataId, knownKatas)) continue;
    const raw = readRaw(key);
    if (raw?.trim()) drafts.add(kataId);
  }
  return drafts;
}

function collectActiveSessions(
  knownKatas: Set<string> | null,
  knownAssessments: Set<string> | null,
): Set<string> {
  const sessions = new Set<string>();
  const hasKnownCatalog = knownKatas !== null || knownAssessments !== null;
  for (const key of storageKeys(SESSION_PREFIX)) {
    const id = key.slice(SESSION_PREFIX.length);
    const sessionIsKnown =
      !hasKnownCatalog ||
      Boolean(knownKatas?.has(id)) ||
      Boolean(knownAssessments?.has(id));
    if (!id || !sessionIsKnown) continue;

    const session = readJson(key) as {
      startedAt?: unknown;
      submitted?: unknown;
    } | null;
    if (
      session &&
      typeof session.startedAt === 'number' &&
      Number.isFinite(session.startedAt) &&
      session.startedAt > 0 &&
      session.submitted !== true
    ) {
      sessions.add(id);
    }
  }
  return sessions;
}

function kindLabel(kind: ActivityEntry['kind']): string {
  if (kind === 'assessment') return 'Assessment';
  if (kind === 'cursus') return 'Cursus';
  return 'Kata';
}

function starterAction(starter?: PracticeDashboardStarter): PracticeDashboardPrimaryAction {
  return {
    href: starter ? `/problem/${starter.id}` : '#library',
    label: 'Start practice',
    title: starter?.title ?? 'Open Library',
    detail: starter
      ? [starter.difficulty, starter.estimatedMinutes ? `${starter.estimatedMinutes} min` : null]
          .filter(Boolean)
          .join(' / ') || 'practice kata'
      : 'Browse the library',
    kindLabel: starter ? 'Starter kata' : 'Library',
  };
}

function actionFromActivity(entry: ActivityEntry): PracticeDashboardPrimaryAction {
  return {
    href: entry.href,
    label: 'Continue',
    title: entry.title,
    detail: entry.detail ?? kindLabel(entry.kind),
    kindLabel: kindLabel(entry.kind),
  };
}

function actionFromDraft(
  drafts: Set<string>,
  catalog: ActivityCatalog,
): PracticeDashboardPrimaryAction | null {
  if (drafts.size === 0) return null;

  const katas = catalog.katas ?? [];
  const ordered = [
    ...katas.filter((kata) => drafts.has(kata.id)).map((kata) => kata.id),
    ...[...drafts].filter((id) => !katas.some((kata) => kata.id === id)).sort(),
  ];
  const id = ordered[0];
  if (!id) return null;

  const kata = katas.find((candidate) => candidate.id === id);
  return {
    href: `/problem/${id}`,
    label: 'Continue',
    title: kata?.title ?? id,
    detail: kata?.estimatedMinutes ? `${kata.estimatedMinutes} min draft` : 'draft saved locally',
    kindLabel: 'Draft',
  };
}

export function emptyPracticeDashboard(
  starter?: PracticeDashboardStarter,
): PracticeDashboardSummary {
  return {
    solvedCount: 0,
    submittedCount: 0,
    activeCount: 0,
    recentActivityCount: 0,
    primary: starterAction(starter),
    activityEntries: [],
  };
}

export function loadPracticeDashboard(
  catalog: ActivityCatalog = {},
  starter?: PracticeDashboardStarter,
): PracticeDashboardSummary {
  if (!hasStorage()) return emptyPracticeDashboard(starter);

  const knownKatas = knownIds(catalog.katas);
  const knownAssessments = knownIds(catalog.assessments);
  const { solvedCount, submittedCount } = countSubmittedResults(knownKatas);
  const activeDrafts = collectActiveDrafts(knownKatas);
  const activeSessions = collectActiveSessions(knownKatas, knownAssessments);
  const activeCount = new Set([...activeDrafts, ...activeSessions]).size;
  const activityEntries = loadActivityFeed(catalog);
  const primary =
    (activityEntries[0] && actionFromActivity(activityEntries[0])) ??
    actionFromDraft(activeDrafts, catalog) ??
    starterAction(starter);

  return {
    solvedCount,
    submittedCount,
    activeCount,
    recentActivityCount: activityEntries.length,
    primary,
    activityEntries,
  };
}
