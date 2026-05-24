import type { AssessmentScore, TestResult } from './configTypes';

const PREFIX = 'kataforge:';

function key(suffix: string): string {
  return `${PREFIX}${suffix}`;
}

export interface SessionState {
  assessmentId: string;
  startedAt: number;
  durationMinutes: number | null;
  currentKataIndex: number;
  submitted: boolean;
}

export function loadDraft(kataId: string): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(key(`draft:${kataId}`));
}

export function saveDraft(kataId: string, code: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key(`draft:${kataId}`), code);
}

/** Persist edits only when they differ from the starter template. */
export function syncDraft(kataId: string, code: string, starterCode: string): void {
  if (!code.trim() || code === starterCode) {
    clearDraft(kataId);
    return;
  }
  saveDraft(kataId, code);
}

export function clearDraft(kataId: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(key(`draft:${kataId}`));
}

export function loadResults(kataId: string): TestResult[] | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(key(`results:${kataId}`));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TestResult[];
  } catch {
    return null;
  }
}

export function saveResults(kataId: string, results: TestResult[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key(`results:${kataId}`), JSON.stringify(results));
}

export function loadSession(assessmentId: string): SessionState | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(key(`session:${assessmentId}`));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return null;
  }
}

export function saveSession(session: SessionState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key(`session:${session.assessmentId}`), JSON.stringify(session));
}

export function loadAssessmentScore(assessmentId: string): AssessmentScore | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(key(`score:${assessmentId}`));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentScore;
  } catch {
    return null;
  }
}

export function saveAssessmentScore(score: AssessmentScore): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key(`score:${score.assessmentId}`), JSON.stringify(score));
}

export function getElapsedMs(session: SessionState): number {
  return Date.now() - session.startedAt;
}

export function isTimerExpired(session: SessionState): boolean {
  if (session.durationMinutes === null) return false;
  return getElapsedMs(session) >= session.durationMinutes * 60 * 1000;
}

export function getRemainingMs(session: SessionState): number | null {
  if (session.durationMinutes === null) return null;
  const remaining = session.durationMinutes * 60 * 1000 - getElapsedMs(session);
  return Math.max(0, remaining);
}

export function isKataComplete(kataId: string): boolean {
  const saved = loadResults(kataId);
  return Boolean(saved && saved.length > 0 && saved.every((r) => r.status === 'passed'));
}

export function loadKataCompletionMap(kataIds: string[]): Record<string, boolean> {
  const completed: Record<string, boolean> = {};
  for (const kataId of kataIds) {
    if (isKataComplete(kataId)) {
      completed[kataId] = true;
    }
  }
  return completed;
}

export interface ClearAssessmentAttemptOptions {
  preserveDrafts?: boolean;
}

export function clearAssessmentAttempt(
  assessmentId: string,
  kataIds: string[],
  options?: ClearAssessmentAttemptOptions,
): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(key(`session:${assessmentId}`));
  localStorage.removeItem(key(`score:${assessmentId}`));
  for (const kataId of kataIds) {
    if (!options?.preserveDrafts) {
      localStorage.removeItem(key(`draft:${kataId}`));
    }
    localStorage.removeItem(key(`results:${kataId}`));
  }
}

export function retryAssessmentSession(
  assessmentId: string,
  durationMinutes: number | null,
  kataIds: string[],
): SessionState {
  clearAssessmentAttempt(assessmentId, kataIds, { preserveDrafts: true });
  const session: SessionState = {
    assessmentId,
    startedAt: Date.now(),
    durationMinutes,
    currentKataIndex: 0,
    submitted: false,
  };
  saveSession(session);
  return session;
}

export function startFreshSession(
  assessmentId: string,
  durationMinutes: number | null,
  kataIds: string[],
): SessionState {
  clearAssessmentAttempt(assessmentId, kataIds);
  const session: SessionState = {
    assessmentId,
    startedAt: Date.now(),
    durationMinutes,
    currentKataIndex: 0,
    submitted: false,
  };
  saveSession(session);
  return session;
}

export function hasAssessmentSession(assessmentId: string): boolean {
  return loadSession(assessmentId) !== null;
}
