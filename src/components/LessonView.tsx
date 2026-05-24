import { useEffect, useState } from 'react';

interface LessonViewProps {
  title: string;
  bodyHtml: string;
  onContinue: () => void;
}

export default function LessonView({ title, bodyHtml, onContinue }: LessonViewProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [title, bodyHtml]);

  return (
    <article className="cursus-lesson">
      <header className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Lesson</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{title}</h1>
      </header>
      <div
        className="cursus-lesson-body prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <footer className="mt-10 flex justify-end border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          disabled={!ready}
          onClick={onContinue}
        >
          Continue
        </button>
      </footer>
    </article>
  );
}
