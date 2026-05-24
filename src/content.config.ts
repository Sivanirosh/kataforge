import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { loadKataForgeConfig } from './lib/loadConfig';
import { problemSchema } from './lib/problemSchema';

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
  schema: problemSchema,
});

export const collections = { problems };
