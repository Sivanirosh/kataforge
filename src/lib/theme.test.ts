/** @vitest-environment happy-dom */
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { applyTheme, getStoredTheme, THEME_STORAGE_KEY, toggleTheme } from './theme';

describe('theme', () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    });
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark when no preference stored', () => {
    expect(getStoredTheme()).toBe('dark');
  });

  it('persists and applies light theme', () => {
    applyTheme('light');
    expect(getStoredTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(store.get(THEME_STORAGE_KEY)).toBe('light');
  });

  it('toggleTheme switches between dark and light', () => {
    expect(toggleTheme()).toBe('light');
    expect(toggleTheme()).toBe('dark');
  });
});
