import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadKataForgeConfig } from './loadConfig';
import { lessonFrontmatterSchema } from './cursusSchema';

export interface LessonData {
  id: string;
  title: string;
  bodyHtml: string;
}

export async function loadAllLessons(): Promise<LessonData[]> {
  const config = await loadKataForgeConfig();
  const lessons: LessonData[] = [];
  const idToPath = new Map<string, string>();

  for (const dir of config.lessonDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(absDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const parsed = lessonFrontmatterSchema.parse(data);

      const existingPath = idToPath.get(parsed.id);
      if (existingPath) {
        throw new Error(
          `Duplicate lesson id "${parsed.id}" in ${existingPath} and ${filePath}`,
        );
      }
      idToPath.set(parsed.id, filePath);

      lessons.push({
        ...parsed,
        bodyHtml: marked.parse(content) as string,
      });
    }
  }

  return lessons.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadLessonMap(): Promise<Record<string, LessonData>> {
  const lessons = await loadAllLessons();
  return Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));
}

export async function loadLessonById(id: string): Promise<LessonData | undefined> {
  const lessons = await loadAllLessons();
  return lessons.find((lesson) => lesson.id === id);
}
