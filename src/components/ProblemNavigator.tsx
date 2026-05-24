interface ProblemNavigatorProps {
  kataIds: string[];
  kataTitles: Record<string, string>;
  currentIndex: number;
  completed: Record<string, boolean>;
  onSelect: (index: number) => void;
}

export default function ProblemNavigator({
  kataIds,
  kataTitles,
  currentIndex,
  completed,
  onSelect,
}: ProblemNavigatorProps) {
  return (
    <nav className="problem-nav" aria-label="Problem navigation">
      {kataIds.map((id, index) => (
        <button
          key={id}
          type="button"
          className={`nav-item ${index === currentIndex ? 'active' : ''} ${completed[id] ? 'done' : ''}`}
          onClick={() => onSelect(index)}
          aria-current={index === currentIndex ? 'step' : undefined}
        >
          <span className="nav-index">{index + 1}</span>
          <span className="nav-title">{kataTitles[id] ?? id}</span>
        </button>
      ))}
    </nav>
  );
}
