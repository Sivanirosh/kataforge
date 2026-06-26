import type { TestPanelLoadingPhase } from './TestPanel';

export function loadingMessage(
  loadingPhase: TestPanelLoadingPhase | null | undefined,
  mode: 'samples' | 'submit' | null,
): string {
  if (loadingPhase === 'runtime') {
    return 'Loading Python runtime…';
  }
  return `Running ${mode === 'submit' ? 'submit' : 'samples'}…`;
}
