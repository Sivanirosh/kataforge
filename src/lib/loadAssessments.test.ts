import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('./loadConfig', () => ({
  loadKataForgeConfig: vi.fn(),
}));

vi.mock('./loadKatas', () => ({
  loadKataMap: vi.fn(),
}));

import { loadKataForgeConfig } from './loadConfig';
import { loadKataMap } from './loadKatas';
import { loadAssessments } from './loadAssessments';

const mockedLoadConfig = vi.mocked(loadKataForgeConfig);
const mockedLoadKataMap = vi.mocked(loadKataMap);

describe('loadAssessments', () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it('throws when assessment references unknown kataId', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-assess-'));
    const assessmentPath = path.join(tempDir, 'bad.json');
    fs.writeFileSync(
      assessmentPath,
      JSON.stringify({
        id: 'bad',
        title: 'Bad',
        durationMinutes: null,
        kataIds: ['missing-kata'],
      }),
    );

    mockedLoadConfig.mockResolvedValue({
      problemDirs: [],
      assessmentDirs: [tempDir],
      cursusDirs: [],
      lessonDirs: [],
      branding: { title: 'KataForge', tagline: '' },
      judge: {
        pyodideVersion: '0.27.7',
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
        starterCode: '',
        tests: [],
        bodyHtml: '',
      },
    });

    await expect(loadAssessments()).rejects.toThrow(
      /Assessment "bad\.json" references unknown kataId "missing-kata"/,
    );
  });
});
