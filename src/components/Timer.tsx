import { useEffect, useState } from 'react';
import { getRemainingMs, type SessionState } from '../lib/storage';

interface TimerProps {
  session: SessionState;
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Timer({ session }: TimerProps) {
  const [remaining, setRemaining] = useState<number | null>(() =>
    getRemainingMs(session),
  );

  useEffect(() => {
    if (session.durationMinutes === null) return;
    const id = window.setInterval(() => {
      setRemaining(getRemainingMs(session));
    }, 1000);
    return () => window.clearInterval(id);
  }, [session]);

  if (session.durationMinutes === null) {
    return <span className="timer timer-untimed">Untimed</span>;
  }

  const expired = remaining !== null && remaining <= 0;

  return (
    <span
      className={`timer ${expired ? 'timer-expired' : ''}`}
      aria-live="polite"
      aria-label={expired ? 'Time expired' : `Time remaining ${formatMs(remaining ?? 0)}`}
    >
      {expired ? 'Time expired' : formatMs(remaining ?? 0)}
    </span>
  );
}
