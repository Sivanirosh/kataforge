import { useCallback, useRef, type ComponentProps } from 'react';
import Editor from '@monaco-editor/react';

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

  const handleMount = useCallback<NonNullable<ComponentProps<typeof Editor>['onMount']>>(
    (editor, monaco) => {
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

  return (
    <div ref={containerRef} className="editor-pane">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? '')}
        onMount={handleMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
