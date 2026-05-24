import type { KataForgeConfig } from './src/lib/configTypes';

const config: KataForgeConfig = {
  problemDirs: ['examples/problems'],
  assessmentDirs: ['examples/assessments'],
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
