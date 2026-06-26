import { ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LessonViewProps {
  title: string;
  bodyHtml: string;
  onContinue: () => void;
}

export default function LessonView({ title, bodyHtml, onContinue }: LessonViewProps) {
  return (
    <article className="kf-ui cursus-lesson">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 border-b border-border pb-5">
          <Badge variant="secondary" className="mb-2.5 gap-1.5 font-medium">
            <BookOpen aria-hidden />
            Lesson
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        </header>
        <div className="kf-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        <footer className="mt-8 flex justify-end border-t border-border pt-5">
          <Button type="button" onClick={onContinue}>
            Continue
            <ArrowRight data-icon="inline-end" aria-hidden />
          </Button>
        </footer>
      </div>
    </article>
  );
}
