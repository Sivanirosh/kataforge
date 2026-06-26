import KataWorkspace, { type JudgeConfig, type KataData } from './KataWorkspace';

interface CursusKataStepProps {
  kata: KataData;
  judgeConfig: JudgeConfig;
  onKataSubmitSuccess: () => void;
}

export default function CursusKataStep({
  kata,
  judgeConfig,
  onKataSubmitSuccess,
}: CursusKataStepProps) {
  return (
    <div className="cursus-kata-embed">
      <KataWorkspace
        kata={kata}
        judgeConfig={judgeConfig}
        embedded
        onSubmit={({ allPassed }) => {
          if (allPassed) onKataSubmitSuccess();
        }}
      />
    </div>
  );
}
