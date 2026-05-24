import { useCallback, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod || event.key !== 'Enter') return;
      event.preventDefault();
      if (event.shiftKey) {
        onSubmit?.();
      } else {
        onRunSamples?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onRunSamples, onSubmit]);

  const handleMount = useCallback(() => {
    containerRef.current?.focus();
  }, []);

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
