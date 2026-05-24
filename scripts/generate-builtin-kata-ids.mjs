import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problemDirs = ['examples/problems'];

const localPath = path.join(root, 'kataforge.local.json');
if (fs.existsSync(localPath)) {
  try {
    const local = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
    for (const dir of local.problemDirs ?? []) {
      if (!problemDirs.includes(dir)) problemDirs.push(dir);
    }
  } catch {
    // optional overlay
  }
}

const ids = new Set();

for (const dir of problemDirs) {
  const absDir = path.resolve(root, dir);
  if (!fs.existsSync(absDir)) continue;
  for (const file of fs.readdirSync(absDir)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(absDir, file), 'utf-8');
    const { data } = matter(raw);
    if (typeof data.id === 'string' && data.id.length > 0) {
      ids.add(data.id);
    }
  }
}

const outPath = path.join(root, 'public', 'builtin-kata-ids.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify([...ids].sort(), null, 2)}\n`);
console.log(`Wrote ${ids.size} built-in kata ids to public/builtin-kata-ids.json`);
