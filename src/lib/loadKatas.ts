import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadKataForgeConfig } from './loadConfig';
import { problemSchema } from './problemSchema';
import type { KataData } from '../components/AssessmentShell';

export async function loadAllKatas(): Promise<KataData[]> {
  const config = await loadKataForgeConfig();
  const katas: KataData[] = [];
  const idToPath = new Map<string, string>();

  for (const dir of config.problemDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(absDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const parsed = problemSchema.parse(data);

      const existingPath = idToPath.get(parsed.id);
      if (existingPath) {
        throw new Error(
          `Duplicate kata id "${parsed.id}" in ${existingPath} and ${filePath}`,
        );
      }
      idToPath.set(parsed.id, filePath);

      katas.push({
        ...parsed,
        bodyHtml: marked.parse(content) as string,
      });
    }
  }

  return katas.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadKataById(id: string): Promise<KataData | undefined> {
  const katas = await loadAllKatas();
  return katas.find((k) => k.id === id);
}

export async function loadKataMap(): Promise<Record<string, KataData>> {
  const katas = await loadAllKatas();
  return Object.fromEntries(katas.map((k) => [k.id, k]));
}
