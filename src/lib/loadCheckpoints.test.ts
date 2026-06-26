import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('./loadConfig', () => ({
  loadKataForgeConfig: vi.fn(),
}));

import { loadKataForgeConfig } from './loadConfig';
import { loadCheckpointCollection } from './loadCheckpoints';

const mockedLoadConfig = vi.mocked(loadKataForgeConfig);

function mockConfig(checkpointDirs: string[]) {
  mockedLoadConfig.mockResolvedValue({
    problemDirs: [],
    assessmentDirs: [],
    cursusDirs: [],
    lessonDirs: [],
    checkpointDirs,
    branding: { title: 'KataForge', tagline: '' },
    judge: {
      sampleTimeoutMs: 2000,
      submitTimeoutMs: 3000,
    },
  });
}

function writeCheckpoint(dir: string, filename: string, id: string) {
  const content = `---
id: ${id}
title: ${id}
attachedKataId: two-sum
questions:
  - id: q1
    prompt: Which invariant matters?
    choices:
      - id: a
        text: Seen values are recorded.
      - id: b
        text: The array is already sorted.
    correctChoiceId: a
    explanation: Hash lookup checks complements directly.
reflections: []
---
This Markdown body is reserved for future use.
`;
  fs.writeFileSync(path.join(dir, filename), content);
}

describe('loadCheckpointCollection', () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it('loads checkpoints as an ordered collection with direct id lookup', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-checkpoints-'));
    writeCheckpoint(tempDir, 'b.md', 'beta-self-check');
    writeCheckpoint(tempDir, 'a.md', 'alpha-self-check');
    mockConfig([tempDir]);

    const collection = await loadCheckpointCollection();

    expect(collection.all.map((checkpoint) => checkpoint.id)).toEqual([
      'alpha-self-check',
      'beta-self-check',
    ]);
    expect(collection.byId.get('alpha-self-check')?.attachedKataId).toBe('two-sum');
  });

  it('treats missing configured checkpoint directories as empty sources', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-checkpoints-'));
    writeCheckpoint(tempDir, 'checkpoint.md', 'present-self-check');
    mockConfig([path.join(tempDir, 'missing'), tempDir]);

    const collection = await loadCheckpointCollection();

    expect(collection.all).toHaveLength(1);
    expect(collection.byId.has('present-self-check')).toBe(true);
  });

  it('throws when duplicate checkpoint id appears in two files', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-checkpoints-'));
    writeCheckpoint(tempDir, 'a.md', 'dup-id');
    writeCheckpoint(tempDir, 'b.md', 'dup-id');
    mockConfig([tempDir]);

    await expect(loadCheckpointCollection()).rejects.toThrow(/Duplicate checkpoint id "dup-id"/);
    await expect(loadCheckpointCollection()).rejects.toThrow(/a\.md/);
    await expect(loadCheckpointCollection()).rejects.toThrow(/b\.md/);
  });
});
