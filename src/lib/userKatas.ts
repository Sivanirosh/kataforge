import { marked } from 'marked';
import type { KataData } from '../components/AssessmentShell';
import {
  userKataImportSchema,
  userKataPackSchema,
  type UserKataImport,
  type UserKataPack,
} from './userKataSchema';

export const USER_KATAS_STORAGE_KEY = 'kataforge:user-katas';

export interface UserKataRecord extends KataData {
  source: 'user';
  bodyMarkdown: string;
}

export interface UserKataImportResult {
  id: string;
  requestedId: string;
  title: string;
}

export interface UserKataExportEntry extends UserKataImport {}

function storageKey(): string {
  return USER_KATAS_STORAGE_KEY;
}

function notifyUserKatasChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('kataforge:user-katas-changed'));
}

function readStore(): Record<string, UserKataRecord> {
  if (typeof localStorage === 'undefined') return {};
  const raw = localStorage.getItem(storageKey());
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, UserKataRecord>;
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, UserKataRecord>): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(storageKey(), JSON.stringify(store));
}

export function resolveUniqueId(requestedId: string, reservedIds: Set<string>): string {
  if (!reservedIds.has(requestedId)) return requestedId;
  let suffix = 2;
  while (reservedIds.has(`${requestedId}-${suffix}`)) {
    suffix += 1;
  }
  return `${requestedId}-${suffix}`;
}

function toUserKataRecord(data: UserKataImport, id: string): UserKataRecord {
  const { bodyMarkdown, solutionExplanation, ...kataFields } = data;
  return {
    ...kataFields,
    id,
    source: 'user',
    bodyMarkdown,
    tests: kataFields.tests.map((test) => ({
      ...test,
      expected: test.expected,
    })),
    bodyHtml: marked.parse(bodyMarkdown) as string,
    solutionExplanationHtml: solutionExplanation
      ? (marked.parse(solutionExplanation) as string)
      : undefined,
  };
}

function allReservedIds(
  builtInIds: Set<string>,
  store: Record<string, UserKataRecord>,
  excludeId?: string,
): Set<string> {
  const reserved = new Set(builtInIds);
  for (const id of Object.keys(store)) {
    if (id !== excludeId) reserved.add(id);
  }
  return reserved;
}

export function listUserKatas(): UserKataRecord[] {
  return Object.values(readStore()).sort((a, b) => a.title.localeCompare(b.title));
}

export function getUserKata(id: string): UserKataRecord | undefined {
  return readStore()[id];
}

export function deleteUserKata(id: string): boolean {
  const store = readStore();
  if (!store[id]) return false;
  delete store[id];
  writeStore(store);
  notifyUserKatasChanged();
  return true;
}

export function clearUserKatas(): void {
  writeStore({});
  notifyUserKatasChanged();
}

export function importUserKata(
  input: unknown,
  builtInIds: Set<string>,
): UserKataImportResult {
  const parsed = userKataImportSchema.parse(input);
  const store = readStore();
  const reserved = allReservedIds(builtInIds, store);
  const id = resolveUniqueId(parsed.id, reserved);
  store[id] = toUserKataRecord(parsed, id);
  writeStore(store);
  notifyUserKatasChanged();
  return { id, requestedId: parsed.id, title: parsed.title };
}

export function importUserKataPack(
  input: unknown,
  builtInIds: Set<string>,
): UserKataImportResult[] {
  const parsed = userKataPackSchema.parse(input);
  const results: UserKataImportResult[] = [];
  for (const kata of parsed.katas) {
    results.push(importUserKata(kata, builtInIds));
  }
  return results;
}

export function exportUserKataPack(): UserKataPack {
  const katas: UserKataExportEntry[] = listUserKatas().map(
    ({ bodyMarkdown, bodyHtml: _bodyHtml, solutionExplanationHtml: _html, source: _source, ...rest }) => ({
      ...rest,
      bodyMarkdown,
    }),
  );
  return { version: 1, katas };
}

