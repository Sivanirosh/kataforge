import { describe, expect, it } from 'vitest';
import { loadKataForgeConfigSync } from './loadConfig';

describe('loadKataForgeConfig', () => {
  it('loads base config with example problem dirs', () => {
    const config = loadKataForgeConfigSync();
    expect(config.problemDirs).toContain('examples/problems');
    expect(config.branding.title).toBe('KataForge');
    expect(config.judge.reexecPerTest).toBe(true);
  });
});
