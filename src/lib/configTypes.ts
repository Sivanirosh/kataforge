export type Difficulty = 'easy' | 'easy-medium' | 'medium' | 'hard';

export interface TestCase {
  id: string;
  name: string;
  hidden: boolean;
  args: unknown[];
  expected: unknown;
}

export interface KataForgeBranding {
  title: string;
  tagline: string;
}

export interface KataForgeJudgeConfig {
  sampleTimeoutMs: number;
  submitTimeoutMs: number;
}

export interface KataForgeConfig {
  problemDirs: string[];
  assessmentDirs: string[];
  branding: KataForgeBranding;
  judge: KataForgeJudgeConfig;
}

export interface Assessment {
  id: string;
  title: string;
  durationMinutes: number | null;
  kataIds: string[];
}

export type JudgeErrorCategory =
  | 'syntax_error'
  | 'missing_function'
  | 'runtime_error'
  | 'timeout'
  | 'internal_error';

export type TestStatus = 'passed' | 'failed' | 'error' | 'timeout';

export interface TestResult {
  testId: string;
  name: string;
  hidden: boolean;
  status: TestStatus;
  expected?: unknown;
  actual?: unknown;
  stdout?: string;
  error?: string;
  errorCategory?: JudgeErrorCategory;
  durationMs: number;
}

export interface JudgeResponse {
  requestId: string;
  results: TestResult[];
  error?: string;
}

export interface JudgeRequest {
  requestId: string;
  language: 'python';
  code: string;
  functionName: string;
  tests: TestCase[];
  timeoutMs: number;
  revealHiddenDetails: boolean;
}

export interface ProblemScore {
  kataId: string;
  passed: number;
  total: number;
  percentage: number;
}

export interface AssessmentScore {
  assessmentId: string;
  problems: ProblemScore[];
  totalPassed: number;
  totalTests: number;
  percentage: number;
  elapsedMs: number;
}
