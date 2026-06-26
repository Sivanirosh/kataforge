import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { runKataForgeCli } from './kataforge';

const originalCwd = process.cwd();
let tempDir: string | undefined;

function makeFixtureDir(): string {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kataforge-cli-'));
  fs.mkdirSync(path.join(tempDir, 'problems'), { recursive: true });
  fs.writeFileSync(
    path.join(tempDir, 'kataforge.local.json'),
    JSON.stringify({
      problemDirs: ['problems'],
      assessmentDirs: [],
      cursusDirs: [],
      lessonDirs: [],
      checkpointDirs: [],
    }),
  );
  process.chdir(tempDir);
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
starterCode: ''
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

function memoryStreams() {
  let stdout = '';
  let stderr = '';
  return {
    streams: {
      stdout: {
        write(chunk: string | Uint8Array) {
          stdout += chunk.toString();
          return true;
        },
      },
      stderr: {
        write(chunk: string | Uint8Array) {
          stderr += chunk.toString();
          return true;
        },
      },
    },
    output: () => ({ stdout, stderr }),
  };
}

describe('kataforge CLI', () => {
  afterEach(() => {
    process.chdir(originalCwd);
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDir = undefined;
  });

  it('prints success counts and exits zero for valid content', async () => {
    makeFixtureDir();
    writeProblem('one.md', 'one');
    const { streams, output } = memoryStreams();

    const exitCode = await runKataForgeCli(['check'], streams);

    expect(exitCode).toBe(0);
    expect(output().stdout).toContain('KataForge content OK: 1 problem');
    expect(output().stderr).toBe('');
  });

  it('prints actionable file-path errors and exits nonzero for invalid content', async () => {
    makeFixtureDir();
    writeProblem('one.md', 'dup');
    writeProblem('two.md', 'dup');
    const { streams, output } = memoryStreams();

    const exitCode = await runKataForgeCli(['check'], streams);

    expect(exitCode).toBe(1);
    expect(output().stderr).toContain('problems/two.md');
    expect(output().stderr).toContain('duplicate kata id "dup"');
  });
});
