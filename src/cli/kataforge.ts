#!/usr/bin/env -S node --experimental-strip-types

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkKataForgeContent, formatContentCheckCounts } from '../lib/contentCheck.ts';

interface WritableLineStream {
  write(chunk: string): unknown;
}

interface CliStreams {
  stdout: WritableLineStream;
  stderr: WritableLineStream;
}

function writeLine(stream: WritableLineStream, line = ''): void {
  stream.write(`${line}\n`);
}

function printHelp(stream: WritableLineStream): void {
  writeLine(stream, 'Usage: kataforge check');
  writeLine(stream, '');
  writeLine(stream, 'Commands:');
  writeLine(stream, '  check   Validate configured ProblemPack content');
}

export async function runKataForgeCli(
  argv = process.argv.slice(2),
  streams: CliStreams = { stdout: process.stdout, stderr: process.stderr },
): Promise<number> {
  const [command] = argv;

  if (!command || command === '--help' || command === '-h') {
    printHelp(streams.stdout);
    return 0;
  }

  if (command !== 'check') {
    writeLine(streams.stderr, `Unknown command: ${command}`);
    printHelp(streams.stderr);
    return 1;
  }

  const result = checkKataForgeContent({ strictConfig: true });
  if (result.ok) {
    writeLine(streams.stdout, `KataForge content OK: ${formatContentCheckCounts(result.counts)}.`);
    return 0;
  }

  writeLine(
    streams.stderr,
    `KataForge content check failed with ${result.errors.length} error${
      result.errors.length === 1 ? '' : 's'
    }:`,
  );
  for (const error of result.errors) {
    writeLine(streams.stderr, `- ${error.file}: ${error.reason}`);
  }
  return 1;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath && fileURLToPath(import.meta.url) === invokedPath) {
  process.exitCode = await runKataForgeCli();
}
