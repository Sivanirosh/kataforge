import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { z } from 'zod';
import { loadKataForgeConfigSync } from '../src/lib/loadConfig.ts';
import { problemSchema } from '../src/lib/problemSchema.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const config = loadKataForgeConfigSync();
const ids = [];
const idToPath = new Map();

for (const dir of config.problemDirs) {
  const absDir = path.resolve(root, dir);
  if (!fs.existsSync(absDir)) continue;

  for (const file of fs.readdirSync(absDir)) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(absDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    let parsed;

    try {
      parsed = problemSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid kata frontmatter in ${filePath}:\n${error.issues
            .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
            .join('\n')}`,
        );
      }
      throw error;
    }

    const existingPath = idToPath.get(parsed.id);
    if (existingPath) {
      throw new Error(`Duplicate kata id "${parsed.id}" in ${existingPath} and ${filePath}`);
    }

    idToPath.set(parsed.id, filePath);
    ids.push(parsed.id);
  }
}

const outPath = path.join(root, 'public', 'builtin-kata-ids.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(ids.sort(), null, 2)}\n`);
console.log(`Wrote ${ids.length} built-in kata ids to public/builtin-kata-ids.json`);
