import type { Checkpoint } from './checkpointSchema';
import type { Cursus, CursusModule, CursusStep } from './cursusSchema';

export type CursusContentValidationCode =
  | 'unknown_lesson'
  | 'unknown_kata'
  | 'unknown_checkpoint'
  | 'unknown_attached_kata'
  | 'misplaced_checkpoint';

export interface CursusContentValidationError {
  code: CursusContentValidationCode;
  cursusId: string;
  moduleId: string;
  stepIndex: number;
  refType: 'lessonId' | 'kataId' | 'checkpointId' | 'attachedKataId';
  refId: string;
  message: string;
}

interface CursusContentIndexes {
  lessonsById: ReadonlyMap<string, unknown>;
  katasById: ReadonlyMap<string, unknown>;
  checkpointsById: ReadonlyMap<string, Checkpoint>;
}

function refForStep(step: CursusStep): { refType: CursusContentValidationError['refType']; refId: string } {
  if (step.type === 'lesson') return { refType: 'lessonId', refId: step.lessonId };
  if (step.type === 'kata') return { refType: 'kataId', refId: step.kataId };
  return { refType: 'checkpointId', refId: step.checkpointId };
}

function contentError(params: {
  code: CursusContentValidationCode;
  cursus: Cursus;
  mod: CursusModule;
  stepIndex: number;
  refType: CursusContentValidationError['refType'];
  refId: string;
  message: string;
}): CursusContentValidationError {
  return {
    code: params.code,
    cursusId: params.cursus.id,
    moduleId: params.mod.id,
    stepIndex: params.stepIndex,
    refType: params.refType,
    refId: params.refId,
    message: params.message,
  };
}

export function validateCursusContent(
  cursus: Cursus,
  indexes: CursusContentIndexes,
): CursusContentValidationError[] {
  const errors: CursusContentValidationError[] = [];

  for (const mod of cursus.modules) {
    mod.steps.forEach((step, stepIndex) => {
      if (step.type === 'lesson') {
        if (!indexes.lessonsById.has(step.lessonId)) {
          errors.push(
            contentError({
              code: 'unknown_lesson',
              cursus,
              mod,
              stepIndex,
              refType: 'lessonId',
              refId: step.lessonId,
              message: `Cursus "${cursus.id}" module "${mod.id}" step ${stepIndex} references unknown lessonId "${step.lessonId}"`,
            }),
          );
        }
        return;
      }

      if (step.type === 'kata') {
        if (!indexes.katasById.has(step.kataId)) {
          errors.push(
            contentError({
              code: 'unknown_kata',
              cursus,
              mod,
              stepIndex,
              refType: 'kataId',
              refId: step.kataId,
              message: `Cursus "${cursus.id}" module "${mod.id}" step ${stepIndex} references unknown kataId "${step.kataId}"`,
            }),
          );
        }
        return;
      }

      const checkpoint = indexes.checkpointsById.get(step.checkpointId);
      if (!checkpoint) {
        errors.push(
          contentError({
            code: 'unknown_checkpoint',
            cursus,
            mod,
            stepIndex,
            refType: 'checkpointId',
            refId: step.checkpointId,
            message: `Cursus "${cursus.id}" module "${mod.id}" step ${stepIndex} references unknown checkpointId "${step.checkpointId}"`,
          }),
        );
        return;
      }

      if (!indexes.katasById.has(checkpoint.attachedKataId)) {
        errors.push(
          contentError({
            code: 'unknown_attached_kata',
            cursus,
            mod,
            stepIndex,
            refType: 'attachedKataId',
            refId: checkpoint.attachedKataId,
            message: `Cursus "${cursus.id}" module "${mod.id}" step ${stepIndex} checkpointId "${step.checkpointId}" attaches to unknown kataId "${checkpoint.attachedKataId}"`,
          }),
        );
      }

      const previousStep = mod.steps[stepIndex - 1];
      if (
        !previousStep ||
        previousStep.type !== 'kata' ||
        previousStep.kataId !== checkpoint.attachedKataId
      ) {
        const { refType, refId } = refForStep(step);
        errors.push(
          contentError({
            code: 'misplaced_checkpoint',
            cursus,
            mod,
            stepIndex,
            refType,
            refId,
            message: `Cursus "${cursus.id}" module "${mod.id}" step ${stepIndex} checkpointId "${step.checkpointId}" must immediately follow attached kataId "${checkpoint.attachedKataId}" in the same module`,
          }),
        );
      }
    });
  }

  return errors;
}
