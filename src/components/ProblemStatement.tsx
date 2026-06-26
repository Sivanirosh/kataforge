import { useEffect, useId, useMemo, useState } from 'react';

interface ProblemStatementProps {
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  tags: string[];
  hints?: string[];
  body: string;
}

function HintLadder({ hints }: { hints: string[] }) {
  const headingId = useId();
  const listId = useId();
  const statusId = useId();
  const cleanHints = useMemo(
    () => hints.map((hint) => hint.trim()).filter(Boolean),
    [hints],
  );
  const hintKey = cleanHints.join('\u0000');
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
  }, [hintKey]);

  const totalHints = cleanHints.length;
  if (totalHints === 0) return null;

  const revealedCount = Math.min(visibleCount, totalHints);
  const hasMoreHints = revealedCount < totalHints;

  return (
    <section className="hint-ladder" aria-labelledby={headingId}>
      <div className="hint-ladder-header">
        <h3 id={headingId}>Hint ladder</h3>
        <p>Reveal one nudge at a time. Hints are separate from solutions.</p>
      </div>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => setVisibleCount((count) => Math.min(count + 1, totalHints))}
        disabled={!hasMoreHints}
        aria-controls={listId}
        aria-describedby={statusId}
      >
        {hasMoreHints
          ? `Show hint ${revealedCount + 1} of ${totalHints}`
          : 'All hints revealed'}
      </button>
      <p id={statusId} className="hint-ladder-status" aria-live="polite">
        {revealedCount === 0
          ? `${totalHints} hint${totalHints === 1 ? '' : 's'} available`
          : `${revealedCount} of ${totalHints} hints revealed`}
      </p>
      {revealedCount > 0 && (
        <ol id={listId} className="hint-ladder-list">
          {cleanHints.slice(0, revealedCount).map((hint, index) => (
            <li key={`${index}-${hint}`} className="hint-ladder-item">
              <strong>Hint {index + 1}</strong>
              <p>{hint}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function ProblemStatement({
  title,
  difficulty,
  estimatedMinutes,
  tags,
  hints = [],
  body,
}: ProblemStatementProps) {
  return (
    <div className="problem-statement">
      <header className="problem-header">
        <h2>{title}</h2>
        <div className="problem-meta">
          <span className={`badge badge-${difficulty}`}>{difficulty}</span>
          <span className="meta-item">{estimatedMinutes} min</span>
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <HintLadder hints={hints} />
    </div>
  );
}
