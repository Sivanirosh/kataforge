import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: path.join(os.tmpdir(), 'kataforge-vitest-cache'),
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'components',
          environment: 'happy-dom',
          include: ['src/**/*.test.tsx'],
        },
      },
    ],
  },
});
