import { useEffect, useState } from 'react';
import ProblemPage from './ProblemPage';
import ResultsPageLoader from './ResultsPageLoader';
import ThemeToggle from './ThemeToggle';

interface ParsedRoute {
  type: 'problem' | 'results';
  id: string;
}

interface UserKataRouteFallbackProps {
  brandingTitle: string;
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
}

function parseRoute(pathname: string): ParsedRoute | null {
  const match = pathname.match(/^\/(problem|results)\/([^/]+)\/?$/);
  if (!match) return null;
  return { type: match[1] as ParsedRoute['type'], id: decodeURIComponent(match[2]) };
}

function FallbackNav({ title }: { title: string }) {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-brand">
          {title}
        </a>
        <nav className="site-nav-links" aria-label="Site">
          <a href="/#cursus">Cursus</a>
          <a href="/#assessments">Assessments</a>
          <a href="/#katas">Practice</a>
          <a href="/docs">Docs</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default function UserKataRouteFallback({
  brandingTitle,
  judgeConfig,
}: UserKataRouteFallbackProps) {
  const [route, setRoute] = useState<ParsedRoute | null>(() =>
    typeof window !== 'undefined' ? parseRoute(window.location.pathname) : null,
  );

  useEffect(() => {
    setRoute(parseRoute(window.location.pathname));
  }, []);

  if (!route) {
    return (
      <>
        <FallbackNav title={brandingTitle} />
        <main className="page-main">
          <h1>Page not found</h1>
          <p>
            <a href="/">Back to home</a>
          </p>
        </main>
      </>
    );
  }

  if (route.type === 'problem') {
    return (
      <ProblemPage
        kataId={route.id}
        judgeConfig={judgeConfig}
        brandingTitle={brandingTitle}
      />
    );
  }

  return (
    <>
      <FallbackNav title={brandingTitle} />
      <main className="results-page page-main">
        <ResultsPageLoader assessmentId={route.id} />
      </main>
    </>
  );
}
