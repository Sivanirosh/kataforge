import '../styles/global.css';
import AssessmentShell, { type KataData } from './AssessmentShell';
import type { Assessment } from '../lib/configTypes';

interface CursusKataStepProps {
  assessment: Assessment;
  kata: KataData;
  judgeConfig: {
    sampleTimeoutMs: number;
    submitTimeoutMs: number;
  };
  brandingTitle: string;
  onKataSubmitSuccess: () => void;
}

export default function CursusKataStep({
  assessment,
  kata,
  judgeConfig,
  brandingTitle,
  onKataSubmitSuccess,
}: CursusKataStepProps) {
  return (
    <div className="cursus-kata-embed">
      <AssessmentShell
        assessment={assessment}
        katas={[kata]}
        judgeConfig={judgeConfig}
        brandingTitle={brandingTitle}
        embedded
        onKataSubmitSuccess={onKataSubmitSuccess}
      />
    </div>
  );
}
