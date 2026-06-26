import { describe, expect, it } from 'vitest';
import type { Checkpoint } from './checkpointSchema';
import type { Cursus } from './cursusSchema';
import { validateCursusContent } from './cursusValidation';

const checkpoint: Checkpoint = {
  id: 'two-sum-self-check',
  title: 'Two Sum Self-check',
  attachedKataId: 'two-sum',
  questions: [
    {
      id: 'q1',
      prompt: 'Which invariant matters?',
      choices: [
        { id: 'a', text: 'Seen values are recorded.' },
        { id: 'b', text: 'The array is sorted.' },
      ],
      correctChoiceId: 'a',
      explanation: 'Seen values make complement lookup direct.',
    },
  ],
  reflections: [],
};

function indexes(overrides?: {
  lessons?: string[];
  katas?: string[];
  checkpoints?: Checkpoint[];
}) {
  return {
    lessonsById: new Map((overrides?.lessons ?? ['intro']).map((id) => [id, {}])),
    katasById: new Map((overrides?.katas ?? ['two-sum']).map((id) => [id, {}])),
    checkpointsById: new Map(
      (overrides?.checkpoints ?? [checkpoint]).map((item) => [item.id, item]),
    ),
  };
}

describe('validateCursusContent', () => {
  it('accepts known lessons, katas, and immediately attached checkpoints', () => {
    const cursus: Cursus = {
      id: 'demo',
      title: 'Demo',
      description: 'Demo',
      prerequisites: [],
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
    };

    expect(validateCursusContent(cursus, indexes())).toEqual([]);
  });

  it('collects multiple content reference errors without throwing', () => {
    const cursus: Cursus = {
      id: 'bad',
      title: 'Bad',
      description: 'Bad',
      prerequisites: [],
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1',
          steps: [
            { type: 'lesson', lessonId: 'missing-lesson' },
            { type: 'kata', kataId: 'missing-kata' },
            { type: 'checkpoint', checkpointId: 'missing-checkpoint' },
            { type: 'checkpoint', checkpointId: 'two-sum-self-check' },
          ],
        },
      ],
    };

    const errors = validateCursusContent(cursus, indexes());

    expect(errors.map((error) => error.code)).toEqual([
      'unknown_lesson',
      'unknown_kata',
      'unknown_checkpoint',
      'misplaced_checkpoint',
    ]);
    expect(errors[0]).toMatchObject({
      cursusId: 'bad',
      moduleId: 'mod-1',
      stepIndex: 0,
      refType: 'lessonId',
      refId: 'missing-lesson',
    });
  });

  it('rejects checkpoints attached across module seams', () => {
    const cursus: Cursus = {
      id: 'cross-module',
      title: 'Cross Module',
      description: 'Cross Module',
      prerequisites: [],
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1',
          steps: [{ type: 'kata', kataId: 'two-sum' }],
        },
        {
          id: 'mod-2',
          title: 'Module 2',
          steps: [{ type: 'checkpoint', checkpointId: 'two-sum-self-check' }],
        },
      ],
    };

    expect(validateCursusContent(cursus, indexes())).toMatchObject([
      {
        code: 'misplaced_checkpoint',
        moduleId: 'mod-2',
        stepIndex: 0,
      },
    ]);
  });

  it('reports when a checkpoint attaches to an unknown kata', () => {
    const unknownAttachedKata: Checkpoint = {
      ...checkpoint,
      id: 'missing-attach-self-check',
      attachedKataId: 'missing-kata',
    };
    const cursus: Cursus = {
      id: 'bad-attach',
      title: 'Bad Attach',
      description: 'Bad Attach',
      prerequisites: [],
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1',
          steps: [
            { type: 'kata', kataId: 'two-sum' },
            { type: 'checkpoint', checkpointId: 'missing-attach-self-check' },
          ],
        },
      ],
    };

    expect(
      validateCursusContent(
        cursus,
        indexes({ checkpoints: [unknownAttachedKata], katas: ['two-sum'] }),
      ).map((error) => error.code),
    ).toEqual(['unknown_attached_kata', 'misplaced_checkpoint']);
  });
});
