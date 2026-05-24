export const THEME_STORAGE_KEY = 'kataforge-theme';

export type Theme = 'dark' | 'light';

export function getStoredTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark';
  return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent('kataforge-theme-change', { detail: theme }));
}

export function toggleTheme(): Theme {
  const next: Theme = getStoredTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
