import { EYEBROW_SKILLS, SKILLS } from "../lib/content";
import { sectionEntrance } from "../lib/motion";
import Eyebrow from "./Eyebrow";

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
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
        <Eyebrow text={EYEBROW_SKILLS} testId="skills-eyebrow" />
        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {SKILLS.map((skill, index) => (
            <div key={skill.category} data-testid={`skill-cat-${index}`}>
              <dt className="text-md font-bold text-ink mb-3">{skill.category}</dt>
              <dd className="text-sm text-inkMuted">{skill.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
