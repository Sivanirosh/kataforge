import type { AssessmentScore, ProblemScore, TestResult } from './configTypes';

export function scoreProblem(kataId: string, results: TestResult[]): ProblemScore {
  const total = results.length;
  const passed = results.filter((r) => r.status === 'passed').length;
  return {
    kataId,
    passed,
    total,
    percentage: total === 0 ? 0 : Math.round((passed / total) * 100),
  };
}

export function scoreAssessment(
  assessmentId: string,
  problemScores: ProblemScore[],
  elapsedMs: number,
): AssessmentScore {
  const totalPassed = problemScores.reduce((sum, p) => sum + p.passed, 0);
  const totalTests = problemScores.reduce((sum, p) => sum + p.total, 0);
  const percentage =
    totalTests === 0 ? 0 : Math.round((totalPassed / totalTests) * 100);

  return {
    assessmentId,
    problems: problemScores,
    totalPassed,
    totalTests,
    percentage,
    elapsedMs,
  };
}
