import { describe, expect, it } from 'vitest';
import { loadingMessage } from './testPanelMessages';

describe('loadingMessage', () => {
  it('shows runtime loading before Pyodide is warm', () => {
    expect(loadingMessage('runtime', 'samples')).toBe('Loading Python runtime…');
  });

  it('shows run mode after runtime is ready', () => {
    expect(loadingMessage('samples', 'samples')).toBe('Running samples…');
    expect(loadingMessage('submit', 'submit')).toBe('Running submit…');
  });
});
