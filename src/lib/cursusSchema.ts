import { z } from 'zod';

export const lessonStepSchema = z.object({
  type: z.literal('lesson'),
  lessonId: z.string().min(1),
});

export const kataStepSchema = z.object({
  type: z.literal('kata'),
  kataId: z.string().min(1),
});

export const cursusStepSchema = z.discriminatedUnion('type', [
  lessonStepSchema,
  kataStepSchema,
]);

export const cursusModuleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  steps: z.array(cursusStepSchema).min(1),
});

export const cursusSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  estimatedHours: z.number().positive().optional(),
  prerequisites: z.array(z.string()).default([]),
  modules: z.array(cursusModuleSchema).min(1),
});

export const lessonFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
});

export type CursusStep = z.infer<typeof cursusStepSchema>;
export type CursusModule = z.infer<typeof cursusModuleSchema>;
export type Cursus = z.infer<typeof cursusSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
