import fs from 'node:fs';
import path from 'node:path';
import { cursusSchema, type Cursus } from './cursusSchema';
import { validateCursusContent, type CursusContentValidationError } from './cursusValidation';
import { loadKataForgeConfig } from './loadConfig';
import { loadCheckpointCollection } from './loadCheckpoints';
import { loadKataMap } from './loadKatas';
import { loadLessonMap } from './loadLessons';

function recordToMap<T>(record: Record<string, T>): Map<string, T> {
  return new Map(Object.entries(record));
}

function formatCursusContentErrors(
  file: string,
  errors: CursusContentValidationError[],
): string {
  const details = errors.map((error) => `- ${error.message}`).join('\n');
  return `Cursus file "${file}" has ${errors.length} content reference error${
    errors.length === 1 ? '' : 's'
  }:\n${details}`;
}

export async function loadAllCursus(): Promise<Cursus[]> {
  const config = await loadKataForgeConfig();
  const kataMap = await loadKataMap();
  const lessonMap = await loadLessonMap();
  const checkpointCollection = await loadCheckpointCollection();
  const cursusList: Cursus[] = [];

  for (const dir of config.cursusDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.json')) continue;
      const raw = JSON.parse(fs.readFileSync(path.join(absDir, file), 'utf-8'));
      const parsed = cursusSchema.parse(raw);

      const validationErrors = validateCursusContent(parsed, {
        lessonsById: recordToMap(lessonMap),
        katasById: recordToMap(kataMap),
        checkpointsById: checkpointCollection.byId,
      });
      if (validationErrors.length > 0) {
        throw new Error(formatCursusContentErrors(file, validationErrors));
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
