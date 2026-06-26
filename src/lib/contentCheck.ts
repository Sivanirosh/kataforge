import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { assessmentSchema, problemSchema, type ProblemData } from './problemSchema.ts';
import { checkpointFrontmatterSchema, type Checkpoint } from './checkpointSchema.ts';
import { cursusSchema, type Cursus, lessonFrontmatterSchema, type LessonFrontmatter } from './cursusSchema.ts';
import { validateCursusContent } from './cursusValidation.ts';
import { loadKataForgeConfigSync } from './loadConfig.ts';
import type { Assessment, KataForgeConfig } from './configTypes';

export interface ContentCheckCounts {
  problems: number;
  assessments: number;
  cursus: number;
  lessons: number;
  checkpoints: number;
}

export interface ContentCheckError {
  file: string;
  reason: string;
}

export interface ContentCheckResult {
  ok: boolean;
  counts: ContentCheckCounts;
  errors: ContentCheckError[];
}

export interface ContentCheckOptions {
  cwd?: string;
  strictConfig?: boolean;
}

interface IndexedContent<T> {
  file: string;
  data: T;
}

const configSchema = z
  .object({
    problemDirs: z.array(z.string().min(1)),
    assessmentDirs: z.array(z.string().min(1)),
    cursusDirs: z.array(z.string().min(1)),
    lessonDirs: z.array(z.string().min(1)),
    checkpointDirs: z.array(z.string().min(1)),
    branding: z
      .object({
        title: z.string(),
        tagline: z.string(),
      })
      .passthrough(),
    judge: z
      .object({
        sampleTimeoutMs: z.number().int().positive(),
        submitTimeoutMs: z.number().int().positive(),
      })
      .passthrough(),
  })
  .passthrough();

const emptyCounts = (): ContentCheckCounts => ({
  problems: 0,
  assessments: 0,
  cursus: 0,
  lessons: 0,
  checkpoints: 0,
});

function withCwd<T>(cwd: string, action: () => T): T {
  const previousCwd = process.cwd();
  if (previousCwd === cwd) return action();
  process.chdir(cwd);
  try {
    return action();
  } finally {
    process.chdir(previousCwd);
  }
}

function withStrictConfig<T>(enabled: boolean, action: () => T): T {
  if (!enabled) return action();

  const previous = process.env.KATAFORGE_STRICT_CONFIG;
  process.env.KATAFORGE_STRICT_CONFIG = '1';
  try {
    return action();
  } finally {
    if (previous === undefined) {
      delete process.env.KATAFORGE_STRICT_CONFIG;
    } else {
      process.env.KATAFORGE_STRICT_CONFIG = previous;
    }
  }
}

function displayPath(cwd: string, filePath: string): string {
  const relative = path.relative(cwd, filePath);
  if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    return relative.split(path.sep).join('/');
  }
  return filePath.split(path.sep).join('/');
}

function addError(
  errors: ContentCheckError[],
  cwd: string,
  filePath: string,
  reason: string,
): void {
  errors.push({ file: displayPath(cwd, filePath), reason });
}

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join('.') : 'value';
      return `${field}: ${issue.message}`;
    })
    .join('; ');
}

function contentFiles(cwd: string, dirs: string[], extension: '.json' | '.md'): string[] {
  const files: string[] = [];

  for (const dir of dirs) {
    const absDir = path.resolve(cwd, dir);
    if (!fs.existsSync(absDir)) continue;

    for (const entry of fs.readdirSync(absDir).sort()) {
      if (!entry.endsWith(extension)) continue;
      const filePath = path.join(absDir, entry);
      if (fs.statSync(filePath).isFile()) {
        files.push(filePath);
      }
    }
  }

  return files;
}

function readJson(filePath: string, errors: ContentCheckError[], cwd: string): unknown | undefined {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    addError(errors, cwd, filePath, `invalid JSON: ${(error as Error).message}`);
    return undefined;
  }
}

function readFrontmatter(
  filePath: string,
  errors: ContentCheckError[],
  cwd: string,
): Record<string, unknown> | undefined {
  try {
    return matter(fs.readFileSync(filePath, 'utf-8')).data;
  } catch (error) {
    addError(errors, cwd, filePath, `invalid frontmatter: ${(error as Error).message}`);
    return undefined;
  }
}

function indexById<T extends { id: string }>(
  byId: Map<string, IndexedContent<T>>,
  item: IndexedContent<T>,
  kind: string,
  errors: ContentCheckError[],
  cwd: string,
): void {
  const existing = byId.get(item.data.id);
  if (existing) {
    addError(
      errors,
      cwd,
      item.file,
      `duplicate ${kind} id "${item.data.id}" (already defined in ${displayPath(cwd, existing.file)})`,
    );
    return;
  }

  byId.set(item.data.id, item);
}

function collectProblems(
  config: KataForgeConfig,
  cwd: string,
  errors: ContentCheckError[],
): Map<string, IndexedContent<ProblemData>> {
  const byId = new Map<string, IndexedContent<ProblemData>>();

  for (const file of contentFiles(cwd, config.problemDirs, '.md')) {
    const data = readFrontmatter(file, errors, cwd);
    if (!data) continue;

    const parsed = problemSchema.safeParse(data);
    if (!parsed.success) {
      addError(errors, cwd, file, `invalid problem frontmatter: ${formatZodError(parsed.error)}`);
      continue;
    }

    indexById(byId, { file, data: parsed.data }, 'kata', errors, cwd);
  }

  return byId;
}

function collectLessons(
  config: KataForgeConfig,
  cwd: string,
  errors: ContentCheckError[],
): Map<string, IndexedContent<LessonFrontmatter>> {
  const byId = new Map<string, IndexedContent<LessonFrontmatter>>();

  for (const file of contentFiles(cwd, config.lessonDirs, '.md')) {
    const data = readFrontmatter(file, errors, cwd);
    if (!data) continue;

    const parsed = lessonFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      addError(errors, cwd, file, `invalid lesson frontmatter: ${formatZodError(parsed.error)}`);
      continue;
    }

    indexById(byId, { file, data: parsed.data }, 'lesson', errors, cwd);
  }

  return byId;
}

function collectCheckpoints(
  config: KataForgeConfig,
  cwd: string,
  errors: ContentCheckError[],
): Map<string, IndexedContent<Checkpoint>> {
  const byId = new Map<string, IndexedContent<Checkpoint>>();

  for (const file of contentFiles(cwd, config.checkpointDirs, '.md')) {
    const data = readFrontmatter(file, errors, cwd);
    if (!data) continue;

    const parsed = checkpointFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      addError(errors, cwd, file, `invalid checkpoint frontmatter: ${formatZodError(parsed.error)}`);
      continue;
    }

    indexById(byId, { file, data: parsed.data }, 'checkpoint', errors, cwd);
  }

  return byId;
}

function collectAssessments(
  config: KataForgeConfig,
  cwd: string,
  errors: ContentCheckError[],
): Map<string, IndexedContent<Assessment>> {
  const byId = new Map<string, IndexedContent<Assessment>>();

  for (const file of contentFiles(cwd, config.assessmentDirs, '.json')) {
    const raw = readJson(file, errors, cwd);
    if (raw === undefined) continue;

    const parsed = assessmentSchema.safeParse(raw);
    if (!parsed.success) {
      addError(errors, cwd, file, `invalid assessment: ${formatZodError(parsed.error)}`);
      continue;
    }

    indexById(byId, { file, data: parsed.data }, 'assessment', errors, cwd);
  }

  return byId;
}

function collectCursus(
  config: KataForgeConfig,
  cwd: string,
  errors: ContentCheckError[],
): Map<string, IndexedContent<Cursus>> {
  const byId = new Map<string, IndexedContent<Cursus>>();

  for (const file of contentFiles(cwd, config.cursusDirs, '.json')) {
    const raw = readJson(file, errors, cwd);
    if (raw === undefined) continue;

    const parsed = cursusSchema.safeParse(raw);
    if (!parsed.success) {
      addError(errors, cwd, file, `invalid cursus: ${formatZodError(parsed.error)}`);
      continue;
    }

    indexById(byId, { file, data: parsed.data }, 'cursus', errors, cwd);
  }

  return byId;
}

function mapData<T>(items: Map<string, IndexedContent<T>>): Map<string, T> {
  return new Map(Array.from(items, ([id, item]) => [id, item.data]));
}

function validateReferences(params: {
  problemsById: Map<string, IndexedContent<ProblemData>>;
  lessonsById: Map<string, IndexedContent<LessonFrontmatter>>;
  checkpointsById: Map<string, IndexedContent<Checkpoint>>;
  assessmentsById: Map<string, IndexedContent<Assessment>>;
  cursusById: Map<string, IndexedContent<Cursus>>;
  errors: ContentCheckError[];
  cwd: string;
}): void {
  const {
    problemsById,
    lessonsById,
    checkpointsById,
    assessmentsById,
    cursusById,
    errors,
    cwd,
  } = params;

  for (const assessment of assessmentsById.values()) {
    for (const kataId of assessment.data.kataIds) {
      if (!problemsById.has(kataId)) {
        addError(
          errors,
          cwd,
          assessment.file,
          `assessment "${assessment.data.id}" references missing kataId "${kataId}"`,
        );
      }
    }
  }

  for (const checkpoint of checkpointsById.values()) {
    if (!problemsById.has(checkpoint.data.attachedKataId)) {
      addError(
        errors,
        cwd,
        checkpoint.file,
        `checkpoint "${checkpoint.data.id}" references missing attachedKataId "${checkpoint.data.attachedKataId}"`,
      );
    }
  }

  const cursusIndexes = {
    lessonsById: mapData(lessonsById),
    katasById: mapData(problemsById),
    checkpointsById: mapData(checkpointsById),
  };

  for (const cursus of cursusById.values()) {
    for (const referenceError of validateCursusContent(cursus.data, cursusIndexes)) {
      addError(errors, cwd, cursus.file, referenceError.message);
    }
  }
}

export function checkKataForgeContent(options: ContentCheckOptions = {}): ContentCheckResult {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const strictConfig = options.strictConfig ?? false;
  const errors: ContentCheckError[] = [];
  let config: KataForgeConfig;

  try {
    config = withStrictConfig(strictConfig, () => withCwd(cwd, loadKataForgeConfigSync));
  } catch (error) {
    const localConfigPath = path.join(cwd, 'kataforge.local.json');
    addError(errors, cwd, localConfigPath, (error as Error).message);
    return { ok: false, counts: emptyCounts(), errors };
  }

  const configResult = configSchema.safeParse(config);
  if (!configResult.success) {
    const localConfigPath = path.join(cwd, 'kataforge.local.json');
    const baseConfigPath = path.join(cwd, 'kataforge.config.ts');
    addError(
      errors,
      cwd,
      fs.existsSync(localConfigPath) ? localConfigPath : baseConfigPath,
      `invalid merged KataForge config: ${formatZodError(configResult.error)}`,
    );
    return { ok: false, counts: emptyCounts(), errors };
  }

  const validConfig = configResult.data as KataForgeConfig;
  const problemsById = collectProblems(validConfig, cwd, errors);
  const lessonsById = collectLessons(validConfig, cwd, errors);
  const checkpointsById = collectCheckpoints(validConfig, cwd, errors);
  const assessmentsById = collectAssessments(validConfig, cwd, errors);
  const cursusById = collectCursus(validConfig, cwd, errors);

  validateReferences({
    problemsById,
    lessonsById,
    checkpointsById,
    assessmentsById,
    cursusById,
    errors,
    cwd,
  });

  return {
    ok: errors.length === 0,
    counts: {
      problems: problemsById.size,
      assessments: assessmentsById.size,
      cursus: cursusById.size,
      lessons: lessonsById.size,
      checkpoints: checkpointsById.size,
    },
    errors,
  };
}

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

export function formatContentCheckCounts(counts: ContentCheckCounts): string {
  return [
    plural(counts.problems, 'problem'),
    plural(counts.assessments, 'assessment'),
    plural(counts.cursus, 'cursus', 'cursus'),
    plural(counts.lessons, 'lesson'),
    plural(counts.checkpoints, 'checkpoint'),
  ].join(', ');
}
