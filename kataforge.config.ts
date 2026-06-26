import type { KataForgeConfig } from './src/lib/configTypes';

const config: KataForgeConfig = {
  problemDirs: ['examples/problems', 'packs/applied-algorithms-2026/problems'],
  assessmentDirs: ['examples/assessments'],
  cursusDirs: ['examples/cursus', 'packs/applied-algorithms-2026'],
  lessonDirs: ['examples/lessons', 'packs/applied-algorithms-2026/lessons'],
  checkpointDirs: ['examples/checkpoints', 'packs/applied-algorithms-2026/checkpoints'],
  branding: {
    title: 'KataForge',
    tagline: 'Build and practice custom coding assessments locally.',
  },
  judge: {
    sampleTimeoutMs: 2000,
    submitTimeoutMs: 3000,
  },
};

export default config;
