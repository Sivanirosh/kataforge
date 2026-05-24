import { useState } from 'react';
import KataHubList, { type BuiltInKataSummary } from './KataHubList';
import UserKataImportPanel from './UserKataImportPanel';
import UserKataManager from './UserKataManager';

interface KataPracticeSectionProps {
  builtInKatas: BuiltInKataSummary[];
  builtInIds: string[];
}

export default function KataPracticeSection({
  builtInKatas,
  builtInIds,
}: KataPracticeSectionProps) {
  const [importOpen, setImportOpen] = useState(false);
  const [hubVersion, setHubVersion] = useState(0);
  const [lastImportedId, setLastImportedId] = useState<string | null>(null);

  const handleImported = (importedIds: string[]) => {
    setHubVersion((value) => value + 1);
    setLastImportedId(importedIds[0] ?? null);
  };

  return (
    <>
      <div className="section-header section-header-actions">
        <h2>Practice a Kata</h2>
        <div className="section-header-buttons">
          <UserKataManager />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setImportOpen((value) => !value)}
            aria-expanded={importOpen}
          >
            {importOpen ? 'Close import' : 'Import kata'}
          </button>
        </div>
      </div>

      {importOpen && (
        <UserKataImportPanel
          builtInIds={builtInIds}
          onImported={handleImported}
          onClose={() => setImportOpen(false)}
        />
      )}

      {lastImportedId && !importOpen && (
        <p className="user-kata-import-toast" role="status">
          Kata imported.{' '}
          <a href={`/problem/${lastImportedId}`}>Open now</a>
        </p>
      )}

      <KataHubList key={hubVersion} builtInKatas={builtInKatas} />
    </>
  );
}
