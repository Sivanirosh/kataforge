interface ProblemStatementProps {
  title: string;
  difficulty: string;
  estimatedMinutes: number;
  tags: string[];
  body: string;
}

export default function ProblemStatement({
  title,
  difficulty,
  estimatedMinutes,
  tags,
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
    </div>
  );
}
