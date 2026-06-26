import { z } from 'zod';
import { problemSchema } from './problemSchema';

export const userKataImportSchema = problemSchema.extend({
  bodyMarkdown: z.string().min(1),
});

export const userKataPackSchema = z.object({
  version: z.literal(1),
  katas: z.array(userKataImportSchema).min(1),
});

export type UserKataImport = z.infer<typeof userKataImportSchema>;
export type UserKataPack = z.infer<typeof userKataPackSchema>;
