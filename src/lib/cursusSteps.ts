import type { Cursus, CursusModule, CursusStep } from './cursusSchema';

export interface FlatCursusStep {
  key: string;
  globalIndex: number;
  moduleId: string;
  moduleTitle: string;
  stepIndex: number;
  step: CursusStep;
}

export function stepKey(moduleId: string, stepIndex: number): string {
  return `${moduleId}:${stepIndex}`;
}

export function flattenCursusSteps(cursus: Cursus): FlatCursusStep[] {
  const flat: FlatCursusStep[] = [];
  for (const mod of cursus.modules) {
    mod.steps.forEach((step, stepIndex) => {
      flat.push({
        key: stepKey(mod.id, stepIndex),
        globalIndex: flat.length,
        moduleId: mod.id,
        moduleTitle: mod.title,
        stepIndex,
        step,
      });
    });
  }
  return flat;
}

export function getFlatStep(cursus: Cursus, globalIndex: number): FlatCursusStep | undefined {
  return flattenCursusSteps(cursus)[globalIndex];
}

export function countCursusSteps(cursus: Cursus): number {
  return cursus.modules.reduce((sum, mod) => sum + mod.steps.length, 0);
}

export function findModuleForStep(cursus: Cursus, moduleId: string): CursusModule | undefined {
  return cursus.modules.find((mod) => mod.id === moduleId);
}

export function collectCursusLessonIds(cursus: Cursus): string[] {
  const ids = new Set<string>();
  for (const mod of cursus.modules) {
    for (const step of mod.steps) {
      if (step.type === 'lesson') {
        ids.add(step.lessonId);
      }
    }
  }
  return [...ids];
}

export function collectCursusKataIds(cursus: Cursus): string[] {
  const ids = new Set<string>();
  for (const mod of cursus.modules) {
    for (const step of mod.steps) {
      if (step.type === 'kata') {
        ids.add(step.kataId);
      }
    }
  }
  return [...ids];
}

export function collectCursusCheckpointIds(cursus: Cursus): string[] {
  const ids = new Set<string>();
  for (const mod of cursus.modules) {
    for (const step of mod.steps) {
      if (step.type === 'checkpoint') {
        ids.add(step.checkpointId);
      }
    }
  }
  return [...ids];
}

export function cursusStepPath(cursusId: string, stepIndex: number): string {
  return `/cursus/${cursusId}/step/${stepIndex}`;
}

export function parseCursusStepIndex(pathname: string): number | null {
  const match = pathname.match(/\/cursus\/[^/]+\/step\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}
