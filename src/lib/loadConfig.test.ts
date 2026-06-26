import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import baseConfig from '../../kataforge.config.ts';
import { loadKataForgeConfigSync } from './loadConfig';

const localConfigPath = path.resolve(process.cwd(), 'kataforge.local.json');

describe('loadKataForgeConfig', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads base config with example problem dirs', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const config = loadKataForgeConfigSync();
    expect(config.problemDirs).toEqual(baseConfig.problemDirs);
    expect(config.assessmentDirs).toEqual(baseConfig.assessmentDirs);
    expect(config.cursusDirs).toEqual(baseConfig.cursusDirs);
    expect(config.lessonDirs).toEqual(baseConfig.lessonDirs);
    expect(config.checkpointDirs).toEqual(baseConfig.checkpointDirs);
    expect(config.branding.title).toBe(baseConfig.branding.title);
    expect(config.judge.sampleTimeoutMs).toBe(baseConfig.judge.sampleTimeoutMs);
    expect(config.judge.submitTimeoutMs).toBe(baseConfig.judge.submitTimeoutMs);
  });

  it('returns base config unchanged when local overlay file is missing', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const config = loadKataForgeConfigSync();
    expect(config.problemDirs).toEqual(baseConfig.problemDirs);
    expect(config.branding.tagline).toBe(baseConfig.branding.tagline);
  });

  it('replaces content dirs when overlay provides them', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(
      JSON.stringify({
        problemDirs: ['private/problems'],
        assessmentDirs: ['private/assessments'],
        checkpointDirs: ['private/checkpoints'],
      }),
    );

    const config = loadKataForgeConfigSync();
    expect(config.problemDirs).toEqual(['private/problems']);
    expect(config.assessmentDirs).toEqual(['private/assessments']);
    expect(config.checkpointDirs).toEqual(['private/checkpoints']);
  });

  it('shallow-merges branding and judge overrides from overlay', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(
      JSON.stringify({
        branding: { title: 'My Pack' },
        judge: { sampleTimeoutMs: 5000 },
      }),
    );

    const config = loadKataForgeConfigSync();
    expect(config.branding).toEqual({
      title: 'My Pack',
      tagline: 'Build and practice custom coding assessments locally.',
    });
    expect(config.judge).toEqual({
      sampleTimeoutMs: 5000,
      submitTimeoutMs: 3000,
    });
  });

  it('reads overlay from kataforge.local.json in cwd', () => {
    const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    loadKataForgeConfigSync();

    expect(existsSpy).toHaveBeenCalledWith(localConfigPath);
  });

  it('warns and returns base config when overlay JSON is malformed', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue('{ not valid json');

    const config = loadKataForgeConfigSync();

    expect(config.problemDirs).toEqual(baseConfig.problemDirs);
    expect(config.checkpointDirs).toEqual(baseConfig.checkpointDirs);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to parse kataforge.local.json'),
    );
  });

  it('throws when overlay JSON is malformed and KATAFORGE_STRICT_CONFIG=1', () => {
    vi.stubEnv('KATAFORGE_STRICT_CONFIG', '1');
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue('{ not valid json');

    expect(() => loadKataForgeConfigSync()).toThrow(
      /Failed to parse kataforge.local.json/,
    );
  });
});
