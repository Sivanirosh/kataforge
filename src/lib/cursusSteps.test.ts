import { describe, expect, it } from 'vitest';
import type { Cursus } from './cursusSchema';
import { flattenCursusSteps, getFlatStep, stepKey, collectCursusKataIds, collectCursusLessonIds, collectCursusCheckpointIds, cursusStepPath, parseCursusStepIndex } from './cursusSteps';

const sampleCursus: Cursus = {
  id: 'demo',
  title: 'Demo',
  description: 'Demo',
  prerequisites: [],
  modules: [
    {
      id: 'agent-loop',
      title: 'Agent Loop',
      steps: [
        { type: 'lesson', lessonId: 'l1' },
        { type: 'kata', kataId: 'k1' },
        { type: 'checkpoint', checkpointId: 'c1' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools',
      steps: [{ type: 'lesson', lessonId: 'l2' }],
    },
  ],
};

describe('cursusSteps', () => {
  it('flattens module steps with stable keys', () => {
    const flat = flattenCursusSteps(sampleCursus);
    expect(flat).toHaveLength(4);
    expect(flat[0].key).toBe(stepKey('agent-loop', 0));
    expect(flat[1].globalIndex).toBe(1);
    expect(flat[3].moduleId).toBe('tools');
  });

  it('returns a step by global index', () => {
    const step = getFlatStep(sampleCursus, 1);
    expect(step?.step.type).toBe('kata');
    expect(step?.step).toEqual({ type: 'kata', kataId: 'k1' });
  });

  it('collects lesson and kata ids referenced by the cursus', () => {
    expect(collectCursusLessonIds(sampleCursus)).toEqual(['l1', 'l2']);
    expect(collectCursusKataIds(sampleCursus)).toEqual(['k1']);
    expect(collectCursusCheckpointIds(sampleCursus)).toEqual(['c1']);
  });

  it('builds and parses cursus step paths', () => {
    expect(cursusStepPath('demo', 3)).toBe('/cursus/demo/step/3');
    expect(parseCursusStepIndex('/cursus/demo/step/3')).toBe(3);
    expect(parseCursusStepIndex('/cursus/demo/step/3/')).toBe(3);
    expect(parseCursusStepIndex('/cursus')).toBeNull();
  });
});
