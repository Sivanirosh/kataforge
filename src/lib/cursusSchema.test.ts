import { describe, expect, it } from 'vitest';
import { cursusSchema } from './cursusSchema';

describe('cursusSchema', () => {
  it('accepts a valid cursus with lesson and kata steps', () => {
    const parsed = cursusSchema.parse({
      id: 'demo',
      title: 'Demo Cursus',
      description: 'Learn by doing',
      prerequisites: ['Python basics'],
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1',
          steps: [
            { type: 'lesson', lessonId: 'intro' },
            { type: 'kata', kataId: 'two-sum' },
            { type: 'checkpoint', checkpointId: 'two-sum-self-check' },
          ],
        },
      ],
    });

    expect(parsed.modules[0].steps[0].type).toBe('lesson');
    expect(parsed.modules[0].steps[1].type).toBe('kata');
    expect(parsed.modules[0].steps[2]).toEqual({
      type: 'checkpoint',
      checkpointId: 'two-sum-self-check',
    });
  });

  it('rejects empty modules', () => {
    expect(() =>
      cursusSchema.parse({
        id: 'x',
        title: 'X',
        description: 'X',
        modules: [],
      }),
    ).toThrow();
  });
});
