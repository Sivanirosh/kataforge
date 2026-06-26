import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { checkKataForgeContent, formatContentCheckCounts } from './contentCheck';

const originalCwd = process.cwd();
let tempDir: string | undefined;

function makeFixtureDir(): string {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-check-'));
  for (const dir of ['problems', 'assessments', 'cursus', 'lessons', 'checkpoints']) {
    fs.mkdirSync(path.join(tempDir, dir), { recursive: true });
  }
  fs.writeFileSync(
    path.join(tempDir, 'kataforge.local.json'),
    JSON.stringify({
      problemDirs: ['problems'],
      assessmentDirs: ['assessments'],
      cursusDirs: ['cursus'],
      lessonDirs: ['lessons'],
      checkpointDirs: ['checkpoints'],
    }),
  );
  return tempDir;
}

function writeProblem(filename: string, id: string) {
  fs.writeFileSync(
    path.join(tempDir!, 'problems', filename),
    `---
id: ${id}
title: ${id}
difficulty: easy
estimatedMinutes: 5
functionName: solve
tags: []
starterCode: |
  def solve():
      pass
tests:
  - id: sample
    name: sample
    hidden: false
    args: []
    expected: 1
---
Body
`,
  );
}

function writeLesson(filename: string, id: string) {
  fs.writeFileSync(
    path.join(tempDir!, 'lessons', filename),
    `---
id: ${id}
title: ${id}
---
Lesson body
`,
  );
}

function writeCheckpoint(filename: string, id: string, attachedKataId: string) {
  fs.writeFileSync(
    path.join(tempDir!, 'checkpoints', filename),
    `---
id: ${id}
title: ${id}
attachedKataId: ${attachedKataId}
questions:
  - id: q1
    prompt: Pick one.
    choices:
      - id: a
        text: A
      - id: b
        text: B
    correctChoiceId: a
    explanation: Because A.
reflections: []
---
Checkpoint body
`,
  );
}

function writeAssessment(filename: string, kataIds: string[]) {
  fs.writeFileSync(
    path.join(tempDir!, 'assessments', filename),
    JSON.stringify({
      id: filename.replace(/\.json$/, ''),
      title: filename,
      durationMinutes: null,
      kataIds,
    }),
  );
}

function writeCursus(filename: string, steps: unknown[]) {
  fs.writeFileSync(
    path.join(tempDir!, 'cursus', filename),
    JSON.stringify({
      id: filename.replace(/\.json$/, ''),
      title: filename,
      description: filename,
      modules: [
        {
          id: 'module-1',
          title: 'Module 1',
          steps,
        },
      ],
    }),
  );
}

describe('checkKataForgeContent', () => {
  afterEach(() => {
    process.chdir(originalCwd);
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDir = undefined;
  });

  it('validates a complete ProblemPack fixture and reports concise counts', () => {
    const cwd = makeFixtureDir();
    process.chdir(cwd);
    writeProblem('two-sum.md', 'two-sum');
    writeLesson('intro.md', 'intro');
    writeCheckpoint('two-sum-check.md', 'two-sum-check', 'two-sum');
    writeAssessment('practice.json', ['two-sum']);
    writeCursus('track.json', [
      { type: 'lesson', lessonId: 'intro' },
      { type: 'kata', kataId: 'two-sum' },
      { type: 'checkpoint', checkpointId: 'two-sum-check' },
    ]);

    const result = checkKataForgeContent({ strictConfig: true });

    expect(result).toMatchObject({
      ok: true,
      counts: {
        problems: 1,
        assessments: 1,
        cursus: 1,
        lessons: 1,
        checkpoints: 1,
      },
      errors: [],
    });
    expect(formatContentCheckCounts(result.counts)).toBe(
      '1 problem, 1 assessment, 1 cursus, 1 lesson, 1 checkpoint',
    );
  });

  it('returns actionable file-path errors for duplicate kata ids and missing references', () => {
    const cwd = makeFixtureDir();
    process.chdir(cwd);
    writeProblem('first.md', 'dup-kata');
    writeProblem('second.md', 'dup-kata');
    writeAssessment('bad-assessment.json', ['missing-kata']);
    writeCursus('bad-cursus.json', [
      { type: 'lesson', lessonId: 'missing-lesson' },
      { type: 'checkpoint', checkpointId: 'missing-checkpoint' },
    ]);

    const result = checkKataForgeContent({ strictConfig: true });

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file: 'problems/second.md',
          reason: expect.stringContaining('duplicate kata id "dup-kata"'),
        }),
        expect.objectContaining({
          file: 'assessments/bad-assessment.json',
          reason: expect.stringContaining('missing kataId "missing-kata"'),
        }),
        expect.objectContaining({
          file: 'cursus/bad-cursus.json',
          reason: expect.stringContaining('unknown lessonId "missing-lesson"'),
        }),
        expect.objectContaining({
          file: 'cursus/bad-cursus.json',
          reason: expect.stringContaining('unknown checkpointId "missing-checkpoint"'),
        }),
      ]),
    );
  });
});
