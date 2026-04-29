import { EDUCATION, EYEBROW_EDU } from "../lib/content";
import { sectionEntrance } from "../lib/motion";
import Eyebrow from "./Eyebrow";

export default function Education() {
  return (
    <section
      data-testid="education-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": `${sectionEntrance.duration}ms`,
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="py-24 px-6 md:px-10 bg-bg border-t border-rule"
    >
      <div className="mx-auto max-w-wide">
        <Eyebrow text={EYEBROW_EDU} testId="education-eyebrow" />
        <ul className="space-y-6">
          {EDUCATION.map((edu, index) => (
            <li data-testid={`edu-${index}`} key={edu.title} className="flex flex-col gap-1">
              <span className="text-md font-bold text-ink">{edu.title}</span>
              <span className="text-sm text-inkMuted">{edu.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
