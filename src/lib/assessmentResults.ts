import type { AssessmentScore, TestResult } from './configTypes';
import { scoreAssessment, scoreProblem } from './scoring';
import {
  getElapsedMs,
  loadResults,
  loadSession,
  saveAssessmentScore,
} from './storage';

export function buildAssessmentScore(
  assessmentId: string,
  kataIds: string[],
): AssessmentScore {
  const session = loadSession(assessmentId);
  const elapsedMs = session ? getElapsedMs(session) : 0;
  const problemScores = kataIds.map((id) => scoreProblem(id, loadResults(id) ?? []));
  return scoreAssessment(assessmentId, problemScores, elapsedMs);
}

export function persistAssessmentScore(
  assessmentId: string,
  kataIds: string[],
): AssessmentScore {
  const score = buildAssessmentScore(assessmentId, kataIds);
  saveAssessmentScore(score);
  return score;
}

export function loadHiddenResultsByKata(
  kataIds: string[],
): Record<string, TestResult[]> {
  return Object.fromEntries(
    kataIds.map((id) => [id, (loadResults(id) ?? []).filter((result) => result.hidden)]),
  );
}
