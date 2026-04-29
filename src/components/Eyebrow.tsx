import type { FC } from "react";

interface EyebrowProps {
  text: string;
  testId?: string;
}

const Eyebrow: FC<EyebrowProps> = ({ text, testId }) => (
  <div data-testid={testId ?? "eyebrow"} className="flex items-center gap-4 mb-12">
    <span className="flex-1 h-px bg-rule" />
    <span className="text-xs uppercase tracking-[0.2em] text-inkMuted whitespace-nowrap">
      {text}
    </span>
    <span className="flex-1 h-px bg-rule" />
  </div>
);

export default Eyebrow;
