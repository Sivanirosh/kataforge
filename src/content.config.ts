import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { loadKataForgeConfig } from './lib/loadConfig';

const config = await loadKataForgeConfig();

const patterns =
  config.problemDirs.length === 1
    ? '**/*.{md,mdx}'
    : config.problemDirs.map((dir) => `${dir}/**/*.{md,mdx}`);

const problems = defineCollection({
  loader: glob({
    pattern: patterns,
    base: config.problemDirs.length === 1 ? `./${config.problemDirs[0]}` : '.',
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    difficulty: z.enum(['easy', 'easy-medium', 'medium', 'hard']),
    estimatedMinutes: z.number(),
    functionName: z.string(),
    tags: z.array(z.string()).default([]),
    starterCode: z.string(),
    tests: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        hidden: z.boolean(),
        args: z.array(z.unknown()),
        expected: z.unknown(),
      }),
    ),
  }),
});

export const collections = { problems };
