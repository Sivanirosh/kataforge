import { describe, expect, it } from 'vitest';
import { checkpointFrontmatterSchema } from './checkpointSchema';

const validCheckpoint = {
  id: 'two-sum-self-check',
  title: 'Two Sum Self-check',
  attachedKataId: 'two-sum',
  questions: [
    {
      id: 'q1',
      prompt: 'Which invariant matters?',
      choices: [
        { id: 'a', text: 'Seen values are recorded.' },
        { id: 'b', text: 'The array is already sorted.' },
      ],
      correctChoiceId: 'a',
      explanation: 'The lookup works because every earlier value has been recorded.',
    },
  ],
  reflections: [
    {
      id: 'space',
      prompt: 'When would you avoid a set?',
      expectedAnswer: 'When constant extra space is required.',
    },
  ],
};

describe('checkpointFrontmatterSchema', () => {
  it('accepts the v1 single-answer MCQ shape', () => {
    expect(checkpointFrontmatterSchema.parse(validCheckpoint)).toMatchObject({
      id: 'two-sum-self-check',
      attachedKataId: 'two-sum',
    });
  });

  it('allows a non-scored reflection-only checkpoint', () => {
    const parsed = checkpointFrontmatterSchema.parse({
      ...validCheckpoint,
      questions: [],
      reflections: [
        {
          id: 'takeaway',
          prompt: 'What changed in your model?',
          expectedAnswer: 'Hash lookup trades memory for direct access.',
        },
      ],
    });

    expect(parsed.questions).toEqual([]);
    expect(parsed.reflections).toHaveLength(1);
  });

  it('rejects a checkpoint with no questions or reflections', () => {
    expect(() =>
      checkpointFrontmatterSchema.parse({
        ...validCheckpoint,
        questions: [],
        reflections: [],
      }),
    ).toThrow(/at least one question or reflection/);
  });

  it('rejects missing attachedKataId', () => {
    const { attachedKataId: _attachedKataId, ...withoutAttachedKata } = validCheckpoint;
    expect(() => checkpointFrontmatterSchema.parse(withoutAttachedKata)).toThrow();
  });

  it('rejects duplicate choice ids', () => {
    expect(() =>
      checkpointFrontmatterSchema.parse({
        ...validCheckpoint,
        questions: [
          {
            ...validCheckpoint.questions[0],
            choices: [
              { id: 'a', text: 'First' },
              { id: 'a', text: 'Second' },
            ],
          },
        ],
      }),
    ).toThrow(/Duplicate choice id/);
  });

  it('rejects invalid correctChoiceId', () => {
    expect(() =>
      checkpointFrontmatterSchema.parse({
        ...validCheckpoint,
        questions: [
          {
            ...validCheckpoint.questions[0],
            correctChoiceId: 'missing',
          },
        ],
      }),
    ).toThrow(/correctChoiceId/);
  });

  it('rejects unknown v1 fields', () => {
    expect(() =>
      checkpointFrontmatterSchema.parse({
        ...validCheckpoint,
        mode: 'future-mode',
      }),
    ).toThrow();
  });
});
