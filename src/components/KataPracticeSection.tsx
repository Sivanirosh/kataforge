import { useCallback, useEffect, useState } from 'react';
import KataHubList, { type BuiltInKataSummary } from './KataHubList';
import UserKataImportPanel from './UserKataImportPanel';
import UserKataManager from './UserKataManager';

interface KataPracticeSectionProps {
  builtInKatas: BuiltInKataSummary[];
  builtInIds: string[];
}

function focusImportFlow() {
  requestAnimationFrame(() => {
    const textarea = document.querySelector<HTMLTextAreaElement>('.docs-import-textarea');
    if (textarea) {
      textarea.focus();
      textarea.scrollIntoView({ block: 'center' });
      return;
    }

    document.getElementById('import-user-kata')?.scrollIntoView({ block: 'center' });
  });
}

export default function KataPracticeSection({
  builtInKatas,
  builtInIds,
}: KataPracticeSectionProps) {
  const [importOpen, setImportOpen] = useState(false);
  const [lastImportedId, setLastImportedId] = useState<string | null>(null);

  const openImport = useCallback(() => {
    setImportOpen(true);
    focusImportFlow();
  }, []);

  useEffect(() => {
    if (importOpen) {
      focusImportFlow();
    }
  }, [importOpen]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#import-user-kata') {
        openImport();
      }
    };
    const handleOpenImport = () => openImport();
    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('kataforge:open-user-kata-import', handleOpenImport);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('kataforge:open-user-kata-import', handleOpenImport);
    };
  }, [openImport]);

  const handleImported = (importedIds: string[]) => {
    setLastImportedId(importedIds[0] ?? null);
  };

  return (
    <>
      <KataHubList
        builtInKatas={builtInKatas}
        toolbarActions={
          <>
            <UserKataManager />
            <button
              id="import-user-kata"
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setImportOpen((value) => !value)}
              aria-expanded={importOpen}
            >
              {importOpen ? 'Close import' : 'Import kata'}
            </button>
          </>
        }
        beforeList={
          <>
            {importOpen && (
              <UserKataImportPanel
                builtInIds={builtInIds}
                onImported={handleImported}
                onClose={() => setImportOpen(false)}
              />
            )}

            {lastImportedId && !importOpen && (
              <p className="user-kata-import-toast" role="status">
                Kata imported. <a href={`/problem/${lastImportedId}`}>Open now</a>
              </p>
            )}
          </>
        }
      />
    </>
  );
}
