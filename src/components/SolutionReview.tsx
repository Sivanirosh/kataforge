export interface SolutionReviewProps {
  solutionCode?: string;
  solutionExplanationHtml?: string;
  heading?: string;
}

export default function SolutionReview({
  solutionCode,
  solutionExplanationHtml,
  heading = 'View solution',
}: SolutionReviewProps) {
  if (!solutionCode && !solutionExplanationHtml) return null;

  return (
    <details className="solution-review">
      <summary className="solution-review-summary">{heading}</summary>
      <div className="solution-review-body">
        {solutionExplanationHtml && (
          <div
            className="solution-explanation"
            dangerouslySetInnerHTML={{ __html: solutionExplanationHtml }}
          />
        )}
        {solutionCode && (
          <pre className="solution-code">
            <code>{solutionCode}</code>
          </pre>
        )}
      </div>
    </details>
  );
}
