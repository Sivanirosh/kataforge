import { describe, expect, it } from 'vitest';
import type { Cursus } from './cursusSchema';
import { flattenCursusSteps, getFlatStep, stepKey } from './cursusSteps';

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
    expect(flat).toHaveLength(3);
    expect(flat[0].key).toBe(stepKey('agent-loop', 0));
    expect(flat[1].globalIndex).toBe(1);
    expect(flat[2].moduleId).toBe('tools');
  });

  it('returns a step by global index', () => {
    const step = getFlatStep(sampleCursus, 1);
    expect(step?.step.type).toBe('kata');
    expect(step?.step).toEqual({ type: 'kata', kataId: 'k1' });
  });
});
