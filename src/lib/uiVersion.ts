export const UI_VERSION_KEY = 'kataforge-ui-version';

export type UIVersion = 'v1' | 'v2';

export function getStoredVersion(): UIVersion {
  if (typeof localStorage === 'undefined') return 'v1';
  return localStorage.getItem(UI_VERSION_KEY) === 'v2' ? 'v2' : 'v1';
}

export function applyVersion(version: UIVersion): void {
  if (version === 'v2') {
    document.documentElement.setAttribute('data-ui-version', 'v2');
  } else {
    document.documentElement.removeAttribute('data-ui-version');
  }
  localStorage.setItem(UI_VERSION_KEY, version);
  window.dispatchEvent(new CustomEvent('kataforge-version-change', { detail: version }));
}

export function toggleVersion(): UIVersion {
  const next: UIVersion = getStoredVersion() === 'v2' ? 'v1' : 'v2';
  applyVersion(next);
  return next;
}
