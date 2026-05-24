import { useCallback, useEffect, useRef, type ComponentProps } from 'react';
import Editor from '@monaco-editor/react';
import { defineKataForgeThemes, getMonacoTheme } from '../lib/monacoTheme';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRunSamples?: () => void;
  onSubmit?: () => void;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  onRunSamples,
  onSubmit,
  readOnly = false,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Parameters<NonNullable<ComponentProps<typeof Editor>['onMount']>>[0] | null>(
    null,
  );
  const monacoRef = useRef<Parameters<NonNullable<ComponentProps<typeof Editor>['onMount']>>[1] | null>(
    null,
  );

  const handleMount = useCallback<NonNullable<ComponentProps<typeof Editor>['onMount']>>(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;
      defineKataForgeThemes(monaco);
      monaco.editor.setTheme(getMonacoTheme());

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRunSamples?.();
      });
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
        () => {
          onSubmit?.();
        },
      );
      containerRef.current?.focus();
    },
    [onRunSamples, onSubmit],
  );

  useEffect(() => {
    const onThemeChange = () => {
      if (monacoRef.current) {
        monacoRef.current.editor.setTheme(getMonacoTheme());
      }
    };
    window.addEventListener('kataforge-theme-change', onThemeChange);
    return () => window.removeEventListener('kataforge-theme-change', onThemeChange);
  }, []);

  return (
    <div ref={containerRef} className="editor-pane">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme={getMonacoTheme()}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        loading={<div className="editor-loading" aria-hidden="true" />}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Geist Mono', 'Fira Code', monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
