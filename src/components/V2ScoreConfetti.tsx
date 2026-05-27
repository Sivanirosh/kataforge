import { useEffect, useState } from 'react';

interface V2ScoreConfettiProps {
  percentage: number;
}

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
  color: string;
  width: number;
  height: number;
}

const COLORS = ['#9b79ff', '#22d3ee', '#00d37f', '#fbbf24', '#ff4d6d', '#c4b5fd'];
const PIECE_COUNT = 60;

function buildPieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 3 + Math.random() * 2.2,
    drift: (Math.random() - 0.5) * 240,
    rotation: 480 + Math.random() * 720,
    color: COLORS[i % COLORS.length],
    width: 6 + Math.random() * 6,
    height: 10 + Math.random() * 8,
  }));
}

export default function V2ScoreConfetti({ percentage }: V2ScoreConfettiProps) {
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (percentage < 100) return;
    if (typeof document === 'undefined') return;
    const isV2 = document.documentElement.getAttribute('data-ui-version') === 'v2';
    if (!isV2) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    setPieces(buildPieces());
    setActive(true);

    const timeout = window.setTimeout(() => setActive(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [percentage]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="v2-confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              background: piece.color,
              width: `${piece.width}px`,
              height: `${piece.height}px`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              ['--confetti-x' as string]: `${piece.drift}px`,
              ['--confetti-r' as string]: `${piece.rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
