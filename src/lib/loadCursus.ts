import fs from 'node:fs';
import path from 'node:path';
import { cursusSchema, type Cursus } from './cursusSchema';
import { loadKataForgeConfig } from './loadConfig';
import { loadKataMap } from './loadKatas';
import { loadLessonMap } from './loadLessons';

export async function loadAllCursus(): Promise<Cursus[]> {
  const config = await loadKataForgeConfig();
  const kataMap = await loadKataMap();
  const lessonMap = await loadLessonMap();
  const cursusList: Cursus[] = [];

  for (const dir of config.cursusDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.json')) continue;
      const raw = JSON.parse(fs.readFileSync(path.join(absDir, file), 'utf-8'));
      const parsed = cursusSchema.parse(raw);

      for (const mod of parsed.modules) {
        for (const step of mod.steps) {
          if (step.type === 'lesson' && !lessonMap[step.lessonId]) {
            throw new Error(
              `Cursus "${file}" references unknown lessonId "${step.lessonId}"`,
            );
          }
          if (step.type === 'kata' && !kataMap[step.kataId]) {
            throw new Error(
              `Cursus "${file}" references unknown kataId "${step.kataId}"`,
            );
          }
        }
      }

      cursusList.push(parsed);
    }
  }

  return cursusList.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadCursusById(id: string): Promise<Cursus | undefined> {
  const all = await loadAllCursus();
  return all.find((cursus) => cursus.id === id);
}

export async function loadCursusMap(): Promise<Record<string, Cursus>> {
  const all = await loadAllCursus();
  return Object.fromEntries(all.map((cursus) => [cursus.id, cursus]));
}
