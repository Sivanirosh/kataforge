import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Checkpoint } from './checkpointSchema';

vi.mock('./loadConfig', () => ({
  loadKataForgeConfig: vi.fn(),
}));

vi.mock('./loadKatas', () => ({
  loadKataMap: vi.fn(),
}));

vi.mock('./loadLessons', () => ({
  loadLessonMap: vi.fn(),
}));

vi.mock('./loadCheckpoints', () => ({
  loadCheckpointCollection: vi.fn(),
}));

import { loadKataForgeConfig } from './loadConfig';
import { loadKataMap } from './loadKatas';
import { loadLessonMap } from './loadLessons';
import { loadCheckpointCollection } from './loadCheckpoints';
import { loadAllCursus } from './loadCursus';

const mockedLoadConfig = vi.mocked(loadKataForgeConfig);
const mockedLoadKataMap = vi.mocked(loadKataMap);
const mockedLoadLessonMap = vi.mocked(loadLessonMap);
const mockedLoadCheckpointCollection = vi.mocked(loadCheckpointCollection);

const checkpoint: Checkpoint = {
  id: 'two-sum-self-check',
  title: 'Two Sum Self-check',
  attachedKataId: 'two-sum',
  questions: [
    {
      id: 'q1',
      prompt: 'Which invariant matters?',
      choices: [
        { id: 'a', text: 'Seen values are recorded.' },
        { id: 'b', text: 'The array is sorted.' },
      ],
      correctChoiceId: 'a',
      explanation: 'Seen values make complement lookup direct.',
    },
  ],
  reflections: [],
};

function writeCursus(dir: string, filename: string, modules: unknown[]) {
  fs.writeFileSync(
    path.join(dir, filename),
    JSON.stringify({
      id: filename.replace(/\.json$/, ''),
      title: filename,
      description: filename,
      modules,
    }),
  );
}

function mockContent(tempDir: string, checkpointCollection = [checkpoint]) {
  mockedLoadConfig.mockResolvedValue({
    problemDirs: [],
    assessmentDirs: [],
    cursusDirs: [tempDir],
    lessonDirs: [],
    checkpointDirs: [],
    branding: { title: 'KataForge', tagline: '' },
    judge: {
      sampleTimeoutMs: 2000,
      submitTimeoutMs: 3000,
    },
  });
  mockedLoadKataMap.mockResolvedValue({
    'two-sum': {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'easy',
      estimatedMinutes: 15,
      functionName: 'two_sum',
      tags: [],
      hints: [],
      starterCode: '',
      tests: [],
      bodyHtml: '',
    },
  });
  mockedLoadLessonMap.mockResolvedValue({
    intro: {
      id: 'intro',
      title: 'Intro',
      bodyHtml: '<p>Intro</p>',
    },
  });
  mockedLoadCheckpointCollection.mockResolvedValue({
    all: checkpointCollection,
    byId: new Map(checkpointCollection.map((item) => [item.id, item])),
  });
}

describe('loadAllCursus', () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it('loads checkpoint steps as references without enriching them', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-cursus-'));
    writeCursus(tempDir, 'valid.json', [
      {
        id: 'mod-1',
        title: 'Module 1',
        steps: [
          { type: 'lesson', lessonId: 'intro' },
          { type: 'kata', kataId: 'two-sum' },
          { type: 'checkpoint', checkpointId: 'two-sum-self-check' },
        ],
      },
    ]);
    mockContent(tempDir);

    const [cursus] = await loadAllCursus();

    expect(cursus.modules[0].steps[2]).toEqual({
      type: 'checkpoint',
      checkpointId: 'two-sum-self-check',
    });
  });

  it('throws one composed author-facing error for multiple content reference errors', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-cursus-'));
    writeCursus(tempDir, 'bad.json', [
      {
        id: 'mod-1',
        title: 'Module 1',
        steps: [
          { type: 'lesson', lessonId: 'missing-lesson' },
          { type: 'kata', kataId: 'missing-kata' },
          { type: 'checkpoint', checkpointId: 'missing-checkpoint' },
        ],
      },
    ]);
    mockContent(tempDir);

    await expect(loadAllCursus()).rejects.toThrow(/Cursus file "bad\.json"/);
    await expect(loadAllCursus()).rejects.toThrow(/unknown lessonId "missing-lesson"/);
    await expect(loadAllCursus()).rejects.toThrow(/unknown kataId "missing-kata"/);
    await expect(loadAllCursus()).rejects.toThrow(/unknown checkpointId "missing-checkpoint"/);
  });

  it('rejects checkpoint steps that do not immediately follow their attached kata', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-cursus-'));
    writeCursus(tempDir, 'misplaced.json', [
      {
        id: 'mod-1',
        title: 'Module 1',
        steps: [
          { type: 'lesson', lessonId: 'intro' },
          { type: 'checkpoint', checkpointId: 'two-sum-self-check' },
        ],
      },
    ]);
    mockContent(tempDir);

    await expect(loadAllCursus()).rejects.toThrow(
      /must immediately follow attached kataId "two-sum"/,
    );
  });
});
