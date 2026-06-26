import type { Assessment } from './configTypes';

export interface KataPracticeSource {
  id: string;
  title: string;
}

/** Timed or multi-kata flows use session-level Finish / Results header actions. */
export function isSessionAssessment(
  assessment: Pick<Assessment, 'kataIds' | 'durationMinutes'>,
): boolean {
  return assessment.kataIds.length > 1 || assessment.durationMinutes != null;
}

/** Single-kata practice uses the kata id as the assessment id and results route. */
export function kataPracticeAssessment(kata: KataPracticeSource): Assessment {
  return {
    id: kata.id,
    title: kata.title,
    durationMinutes: null,
    kataIds: [kata.id],
  };
}
