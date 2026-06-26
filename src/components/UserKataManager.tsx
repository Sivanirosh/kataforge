import { useCallback, useEffect, useState } from 'react';
import {
  clearUserKatas,
  deleteUserKata,
  exportUserKataPack,
  listUserKatas,
  type UserKataRecord,
} from '../lib/userKatas';

export default function UserKataManager() {
  const [userKatas, setUserKatas] = useState<UserKataRecord[]>([]);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(() => {
    setUserKatas(listUserKatas());
  }, []);

  useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener('storage', onChange);
    window.addEventListener('kataforge:user-katas-changed', onChange);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('kataforge:user-katas-changed', onChange);
    };
  }, [refresh]);

  if (userKatas.length === 0) return null;

  const handleExport = () => {
    const pack = exportUserKataPack();
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'kataforge-user-katas.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (!window.confirm('Delete all imported katas from this browser? Export first if you need a backup.')) {
      return;
    }
    clearUserKatas();
    refresh();
  };

  return (
    <div className="user-kata-manager">
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Manage imported ({userKatas.length})
      </button>
      {open && (
        <div className="user-kata-manager-panel">
          <ul className="docs-kata-list">
            {userKatas.map((kata) => (
              <li key={kata.id} className="docs-kata-item">
                <div>
                  <strong>{kata.title}</strong>
                  <span className="docs-kata-id">{kata.id}</span>
                </div>
                <div className="docs-kata-actions">
                  <a className="btn btn-secondary btn-sm" href={`/problem/${kata.id}`}>
                    Open
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      deleteUserKata(kata.id);
                      refresh();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="docs-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleExport}>
              Export all
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleClearAll}>
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
