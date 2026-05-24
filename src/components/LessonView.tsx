interface LessonViewProps {
  title: string;
  bodyHtml: string;
  onContinue: () => void;
}

export default function LessonView({ title, bodyHtml, onContinue }: LessonViewProps) {
  return (
    <article className="cursus-lesson">
      <header className="cursus-lesson-header">
        <span className="cursus-step-kind">Lesson</span>
        <h1 className="cursus-lesson-title">{title}</h1>
      </header>
      <div
        className="cursus-lesson-body markdown-body"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <footer className="cursus-lesson-footer">
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </footer>
    </article>
  );
}
