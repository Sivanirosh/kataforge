#!/usr/bin/env -S node --experimental-strip-types

import { runKataForgeCli } from '../../../src/cli/kataforge.ts';

process.exitCode = await runKataForgeCli();
