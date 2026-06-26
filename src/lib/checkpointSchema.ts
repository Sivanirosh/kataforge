import { z } from 'zod';

const nonEmptyString = z.string().min(1);

export const checkpointChoiceSchema = z
  .object({
    id: nonEmptyString,
    text: nonEmptyString,
  })
  .strict();

export const checkpointQuestionSchema = z
  .object({
    id: nonEmptyString,
    prompt: nonEmptyString,
    choices: z.array(checkpointChoiceSchema).min(2),
    correctChoiceId: nonEmptyString,
    explanation: nonEmptyString,
  })
  .strict()
  .superRefine((question, context) => {
    const choiceIds = new Set<string>();
    for (const choice of question.choices) {
      if (choiceIds.has(choice.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate choice id "${choice.id}"`,
          path: ['choices'],
        });
      }
      choiceIds.add(choice.id);
    }

    if (!choiceIds.has(question.correctChoiceId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `correctChoiceId "${question.correctChoiceId}" does not match a choice id`,
        path: ['correctChoiceId'],
      });
    }
  });

export const checkpointReflectionSchema = z
  .object({
    id: nonEmptyString,
    prompt: nonEmptyString,
    expectedAnswer: nonEmptyString,
  })
  .strict();

export const checkpointFrontmatterSchema = z
  .object({
    id: nonEmptyString,
    title: nonEmptyString,
    attachedKataId: nonEmptyString,
    questions: z.array(checkpointQuestionSchema),
    reflections: z.array(checkpointReflectionSchema).default([]),
  })
  .strict()
  .superRefine((checkpoint, context) => {
    const questionIds = new Set<string>();
    for (const question of checkpoint.questions) {
      if (questionIds.has(question.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate question id "${question.id}"`,
          path: ['questions'],
        });
      }
      questionIds.add(question.id);
    }

    const reflectionIds = new Set<string>();
    for (const reflection of checkpoint.reflections) {
      if (reflectionIds.has(reflection.id)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate reflection id "${reflection.id}"`,
          path: ['reflections'],
        });
      }
      reflectionIds.add(reflection.id);
    }

    if (checkpoint.questions.length === 0 && checkpoint.reflections.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Checkpoint must include at least one question or reflection',
        path: ['questions'],
      });
    }
  });

export type CheckpointChoice = z.infer<typeof checkpointChoiceSchema>;
export type CheckpointQuestion = z.infer<typeof checkpointQuestionSchema>;
export type CheckpointReflection = z.infer<typeof checkpointReflectionSchema>;
export type Checkpoint = z.infer<typeof checkpointFrontmatterSchema>;
