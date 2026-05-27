import type { Monaco } from 'monaco-editor';

export type KataForgeMonacoTheme =
  | 'kataforge-dark'
  | 'kataforge-light'
  | 'kataforge-v2-dark'
  | 'kataforge-v2-light';

export function defineKataForgeThemes(monaco: Monaco): void {
  monaco.editor.defineTheme('kataforge-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '8b8a9e', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'b8affc' },
      { token: 'string', foreground: '4ade80' },
      { token: 'number', foreground: 'fbbf24' },
    ],
    colors: {
      'editor.background': '#09090e',
      'editor.foreground': '#edecf4',
      'editorLineNumber.foreground': '#8b8a9e',
      'editorLineNumber.activeForeground': '#7c6df8',
      'editor.selectionBackground': '#7c6df833',
      'editor.lineHighlightBackground': '#1a1a22',
      'editorCursor.foreground': '#7c6df8',
      'editorIndentGuide.background': '#252530',
      'editorIndentGuide.activeBackground': '#7c6df866',
      'editorWidget.background': '#111116',
      'editorWidget.border': '#252530',
    },
  });

  monaco.editor.defineTheme('kataforge-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '71717a', fontStyle: 'italic' },
      { token: 'keyword', foreground: '6d5ce8' },
      { token: 'string', foreground: '16a34a' },
      { token: 'number', foreground: 'd97706' },
    ],
    colors: {
      'editor.background': '#fafafa',
      'editor.foreground': '#18181b',
      'editorLineNumber.foreground': '#a1a1aa',
      'editorLineNumber.activeForeground': '#6d5ce8',
      'editor.selectionBackground': '#6d5ce833',
      'editor.lineHighlightBackground': '#f4f4f5',
      'editorCursor.foreground': '#6d5ce8',
      'editorIndentGuide.background': '#e4e4e7',
      'editorIndentGuide.activeBackground': '#6d5ce866',
      'editorWidget.background': '#ffffff',
      'editorWidget.border': '#e4e4e7',
    },
  });
}

export function defineKataForgeV2Themes(monaco: Monaco): void {
  monaco.editor.defineTheme('kataforge-v2-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '7a79a0', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'b39dff' },
      { token: 'string', foreground: '22d3ee' },
      { token: 'number', foreground: 'fbbf24' },
      { token: 'type', foreground: '00d37f' },
      { token: 'function', foreground: 'c4b5fd' },
    ],
    colors: {
      'editor.background': '#02010a',
      'editor.foreground': '#f0effa',
      'editorLineNumber.foreground': '#5a5980',
      'editorLineNumber.activeForeground': '#9b79ff',
      'editor.selectionBackground': '#9b79ff40',
      'editor.lineHighlightBackground': '#0f0f1a',
      'editorCursor.foreground': '#9b79ff',
      'editorIndentGuide.background': '#1e1e30',
      'editorIndentGuide.activeBackground': '#9b79ff66',
      'editorWidget.background': '#080811',
      'editorWidget.border': '#1e1e30',
      'editorBracketMatch.background': '#9b79ff22',
      'editorBracketMatch.border': '#9b79ff66',
    },
  });

  monaco.editor.defineTheme('kataforge-v2-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a6798', fontStyle: 'italic' },
      { token: 'keyword', foreground: '7c3aed' },
      { token: 'string', foreground: '0891b2' },
      { token: 'number', foreground: 'd97706' },
      { token: 'type', foreground: '059669' },
      { token: 'function', foreground: '6d28d9' },
    ],
    colors: {
      'editor.background': '#f0f0fa',
      'editor.foreground': '#1a1735',
      'editorLineNumber.foreground': '#a8a4ce',
      'editorLineNumber.activeForeground': '#7c3aed',
      'editor.selectionBackground': '#7c3aed33',
      'editor.lineHighlightBackground': '#ede9fe',
      'editorCursor.foreground': '#7c3aed',
      'editorIndentGuide.background': '#d8d4f0',
      'editorIndentGuide.activeBackground': '#7c3aed66',
      'editorWidget.background': '#ffffff',
      'editorWidget.border': '#d8d4f0',
      'editorBracketMatch.background': '#7c3aed22',
      'editorBracketMatch.border': '#7c3aed66',
    },
  });
}

export function getMonacoTheme(): KataForgeMonacoTheme {
  if (typeof document === 'undefined') return 'kataforge-dark';
  const isV2 = document.documentElement.getAttribute('data-ui-version') === 'v2';
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isV2) return isLight ? 'kataforge-v2-light' : 'kataforge-v2-dark';
  return isLight ? 'kataforge-light' : 'kataforge-dark';
}
