import { z } from 'zod';

export const testCaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  hidden: z.boolean(),
  args: z.array(z.unknown()),
  expected: z.unknown(),
});

export const problemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  difficulty: z.enum(['easy', 'easy-medium', 'medium', 'hard']),
  estimatedMinutes: z.number().int().positive(),
  functionName: z.string().min(1),
  tags: z.array(z.string()).default([]),
  hints: z.array(z.string().min(1)).default([]),
  starterCode: z.string(),
  solutionCode: z.string().optional(),
  solutionExplanation: z.string().optional(),
  tests: z.array(testCaseSchema).min(1),
});

export const assessmentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  durationMinutes: z.number().int().positive().nullable(),
  kataIds: z.array(z.string().min(1)).min(1),
});

export type ProblemData = z.infer<typeof problemSchema>;
