import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { checkpointFrontmatterSchema, type Checkpoint } from './checkpointSchema';
import { loadKataForgeConfig } from './loadConfig';

export interface CheckpointCollection {
  all: Checkpoint[];
  byId: Map<string, Checkpoint>;
}

export async function loadCheckpointCollection(): Promise<CheckpointCollection> {
  const config = await loadKataForgeConfig();
  const checkpoints: Checkpoint[] = [];
  const idToPath = new Map<string, string>();

  for (const dir of config.checkpointDirs) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of fs.readdirSync(absDir)) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(absDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      const parsed = checkpointFrontmatterSchema.parse(data);

      const existingPath = idToPath.get(parsed.id);
      if (existingPath) {
        throw new Error(
          `Duplicate checkpoint id "${parsed.id}" in ${existingPath} and ${filePath}`,
        );
      }
      idToPath.set(parsed.id, filePath);
      checkpoints.push(parsed);
    }
  }

  const all = checkpoints.sort((a, b) => a.title.localeCompare(b.title));
  return {
    all,
    byId: new Map(all.map((checkpoint) => [checkpoint.id, checkpoint])),
  };
}

export async function loadAllCheckpoints(): Promise<Checkpoint[]> {
  return (await loadCheckpointCollection()).all;
}

export async function loadCheckpointById(id: string): Promise<Checkpoint | undefined> {
  return (await loadCheckpointCollection()).byId.get(id);
}
