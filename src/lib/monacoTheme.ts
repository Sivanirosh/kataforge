import type * as MonacoEditor from 'monaco-editor';

export type KataForgeMonacoTheme =
  | 'kataforge-dark'
  | 'kataforge-light';

export function defineKataForgeThemes(monaco: typeof MonacoEditor): void {
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

export function getMonacoTheme(): KataForgeMonacoTheme {
  if (typeof document === 'undefined') return 'kataforge-dark';
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return isLight ? 'kataforge-light' : 'kataforge-dark';
}
