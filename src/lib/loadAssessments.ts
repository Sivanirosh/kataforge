import fs from 'node:fs';
import path from 'node:path';
import { assessmentSchema } from './problemSchema';
import { loadKataForgeConfig } from './loadConfig';
import { loadKataMap } from './loadKatas';
import type { Assessment } from './configTypes';

export async function loadAssessments(): Promise<Assessment[]> {
  const config = await loadKataForgeConfig();
  const kataMap = await loadKataMap();
  const assessments: Assessment[] = [];

  for (const dir of config.assessmentDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.json')) continue;
      const raw = JSON.parse(fs.readFileSync(path.join(absDir, file), 'utf-8'));
      const parsed = assessmentSchema.parse(raw);

      for (const kataId of parsed.kataIds) {
        if (!kataMap[kataId]) {
          throw new Error(
            `Assessment "${file}" references unknown kataId "${kataId}"`,
          );
        }
      }

      assessments.push(parsed);
    }
  }

  return assessments.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadAssessmentById(id: string): Promise<Assessment | undefined> {
  const assessments = await loadAssessments();
  return assessments.find((a) => a.id === id);
}
