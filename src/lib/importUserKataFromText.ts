import { z } from 'zod';
import { userKataImportSchema, userKataPackSchema } from './userKataSchema';
import { importUserKata, importUserKataPack } from './userKatas';

export function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n');
}

export interface ImportUserKataInput {
  text: string;
  builtInIds: Set<string>;
}

export interface ImportUserKataSuccess {
  ok: true;
  message: string;
  importedIds: string[];
}

export interface ImportUserKataFailure {
  ok: false;
  error: string;
}

export type ImportUserKataResult = ImportUserKataSuccess | ImportUserKataFailure;

export function importUserKataFromText({
  text,
  builtInIds,
}: ImportUserKataInput): ImportUserKataResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: 'Invalid JSON. Paste a single kata object or a { "version": 1, "katas": [...] } pack.',
    };
  }

  try {
    const packResult = userKataPackSchema.safeParse(parsed);
    if (packResult.success) {
      const results = importUserKataPack(packResult.data, builtInIds);
      return {
        ok: true,
        message: `Imported ${results.length} kata(s).`,
        importedIds: results.map((result) => result.id),
      };
    }

    const kata = userKataImportSchema.parse(parsed);
    const result = importUserKata(kata, builtInIds);
    const suffixNote = result.id !== result.requestedId ? ` (id: ${result.id})` : '';
    return {
      ok: true,
      message: `Imported "${result.title}"${suffixNote}.`,
      importedIds: [result.id],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { ok: false, error: formatZodError(error) };
    }
    return { ok: false, error: 'Import failed. Check the JSON matches the schema.' };
  }
}
