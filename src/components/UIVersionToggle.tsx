import { useEffect, useState } from 'react';
import { applyVersion, getStoredVersion, type UIVersion } from '../lib/uiVersion';

export default function UIVersionToggle() {
  const [version, setVersion] = useState<UIVersion>('v1');
  const [bouncing, setBouncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVersion(getStoredVersion());
    setMounted(true);
    try {
      if (!sessionStorage.getItem('kataforge-fab-seen')) {
        setBouncing(true);
        sessionStorage.setItem('kataforge-fab-seen', '1');
      }
    } catch (_e) {
      // sessionStorage may be unavailable (privacy mode); fail silently
    }
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    const next: UIVersion = version === 'v1' ? 'v2' : 'v1';
    applyVersion(next);
    setVersion(next);
  };

  const label = version === 'v1' ? 'New UI' : 'Classic';
  const title =
    version === 'v1' ? 'Try the new V2 design' : 'Back to classic';

  return (
    <button
      type="button"
      className={`ui-version-fab${bouncing ? ' fab-bouncing' : ''}`}
      onClick={handleClick}
      title={title}
      aria-label={title}
      aria-pressed={version === 'v2'}
      onAnimationEnd={() => setBouncing(false)}
    >
      <span className="fab-icon" aria-hidden="true">
        ✦
      </span>
      <span className="fab-label">{label}</span>
    </button>
  );
}
