import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('./loadConfig', () => ({
  loadKataForgeConfig: vi.fn(),
}));

import { loadKataForgeConfig } from './loadConfig';
import { loadAllKatas } from './loadKatas';

const mockedLoadConfig = vi.mocked(loadKataForgeConfig);

function writeKata(dir: string, filename: string, id: string, hints: string[] = []) {
  const hintsYaml = hints.length
    ? `hints:\n${hints.map((hint) => `  - ${hint}`).join('\n')}\n`
    : '';
  const content = `---
id: ${id}
title: ${id}
difficulty: easy
estimatedMinutes: 5
functionName: f
tags: []
${hintsYaml}starterCode: "def f(): pass"
tests:
  - id: t1
    name: basic
    hidden: false
    args: []
    expected: 1
---
Body
`;
  fs.writeFileSync(path.join(dir, filename), content);
}

describe('loadAllKatas', () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it('loads hints from frontmatter and defaults missing hints to empty', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-katas-'));
    writeKata(tempDir, 'a.md', 'with-hints', [
      'Try the smallest input.',
      'Track what changes after each step.',
    ]);
    writeKata(tempDir, 'b.md', 'without-hints');

    mockedLoadConfig.mockResolvedValue({
      problemDirs: [tempDir],
      assessmentDirs: [],
      cursusDirs: [],
      lessonDirs: [],
      checkpointDirs: [],
      branding: { title: 'KataForge', tagline: '' },
      judge: {
        sampleTimeoutMs: 2000,
        submitTimeoutMs: 3000,
      },
    });

    const katas = await loadAllKatas();
    expect(katas.find((kata) => kata.id === 'with-hints')?.hints).toEqual([
      'Try the smallest input.',
      'Track what changes after each step.',
    ]);
    expect(katas.find((kata) => kata.id === 'without-hints')?.hints).toEqual([]);
  });

  it('throws when duplicate kata id appears in two files', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-katas-'));
    writeKata(tempDir, 'a.md', 'dup-id');
    writeKata(tempDir, 'b.md', 'dup-id');

    mockedLoadConfig.mockResolvedValue({
      problemDirs: [tempDir],
      assessmentDirs: [],
      cursusDirs: [],
      lessonDirs: [],
      checkpointDirs: [],
      branding: { title: 'KataForge', tagline: '' },
      judge: {
        sampleTimeoutMs: 2000,
        submitTimeoutMs: 3000,
      },
    });

    await expect(loadAllKatas()).rejects.toThrow(/Duplicate kata id "dup-id"/);
    await expect(loadAllKatas()).rejects.toThrow(/a\.md/);
    await expect(loadAllKatas()).rejects.toThrow(/b\.md/);
  });
});
