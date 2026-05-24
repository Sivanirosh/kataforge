import fs from 'node:fs';
import path from 'node:path';
import baseConfig from '../../kataforge.config';
import type { KataForgeConfig } from './configTypes';

function loadLocalOverlay(): Partial<KataForgeConfig> {
  const localPath = path.resolve(process.cwd(), 'kataforge.local.json');
  if (!fs.existsSync(localPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(localPath, 'utf-8')) as Partial<KataForgeConfig>;
  } catch {
    return {};
  }
}

function mergeConfig(local: Partial<KataForgeConfig>): KataForgeConfig {
  return {
    ...baseConfig,
    ...local,
    branding: { ...baseConfig.branding, ...local.branding },
    judge: { ...baseConfig.judge, ...local.judge },
    problemDirs: local.problemDirs ?? baseConfig.problemDirs,
    assessmentDirs: local.assessmentDirs ?? baseConfig.assessmentDirs,
  };
}

export async function loadKataForgeConfig(): Promise<KataForgeConfig> {
  return mergeConfig(loadLocalOverlay());
}

export function loadKataForgeConfigSync(): KataForgeConfig {
  return mergeConfig(loadLocalOverlay());
}
