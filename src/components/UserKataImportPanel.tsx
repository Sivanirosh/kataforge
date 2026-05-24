import { useState, type ChangeEvent } from 'react';
import { importUserKataFromText } from '../lib/importUserKataFromText';

interface UserKataImportPanelProps {
  builtInIds: string[];
  onImported?: (importedIds: string[]) => void;
  onClose?: () => void;
}

export default function UserKataImportPanel({
  builtInIds,
  onImported,
  onClose,
}: UserKataImportPanelProps) {
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importedId, setImportedId] = useState<string | null>(null);

  const handleImport = () => {
    setImportError(null);
    setImportSuccess(null);
    setImportedId(null);
    if (!importText.trim()) {
      setImportError('Paste JSON from your LLM or upload a file first.');
      return;
    }
    const result = importUserKataFromText({
      text: importText,
      builtInIds: new Set(builtInIds),
    });
    if (!result.ok) {
      setImportError(result.error);
      return;
    }
    setImportSuccess(result.message);
    setImportedId(result.importedIds[0] ?? null);
    setImportText('');
    onImported?.(result.importedIds);
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setImportText(text);
    setImportError(null);
    setImportSuccess(null);
    event.target.value = '';
  };

  return (
    <div className="user-kata-import-panel">
      <div className="user-kata-import-panel-header">
        <h3>Import kata</h3>
        {onClose && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        )}
      </div>
      <p className="user-kata-import-hint">
        Paste JSON from your LLM or upload a <code>.json</code> file. Need the template?{' '}
        <a href="/docs">See Docs</a>.
      </p>
      <textarea
        className="docs-import-textarea"
        value={importText}
        onChange={(e) => setImportText(e.target.value)}
        placeholder='{ "id": "my-kata", "title": "...", ... }'
        rows={10}
        spellCheck={false}
      />
      <div className="docs-actions">
        <label className="btn btn-secondary docs-file-label">
          Upload JSON
          <input type="file" accept=".json,application/json" onChange={handleFileUpload} hidden />
        </label>
        <button type="button" className="btn btn-primary" onClick={handleImport}>
          Import
        </button>
      </div>
      {importError && (
        <pre className="docs-import-message docs-import-error" role="alert">
          {importError}
        </pre>
      )}
      {importSuccess && (
        <p className="docs-import-message docs-import-success" role="status">
          {importSuccess}
          {importedId && (
            <>
              {' '}
              <a href={`/problem/${importedId}`}>Open now</a>
            </>
          )}
        </p>
      )}
    </div>
  );
}
