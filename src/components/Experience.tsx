import { EXPERIENCES, EYEBROW_EXPERIENCE } from "../lib/content";
import { cardHover, sectionEntrance } from "../lib/motion";
import Eyebrow from "./Eyebrow";

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": `${sectionEntrance.duration}ms`,
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="py-24 px-6 md:px-10 bg-bg"
    >
      <div className="mx-auto max-w-wide">
        <Eyebrow text={EYEBROW_EXPERIENCE} testId="experience-eyebrow" />
        <ul className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map((exp, index) => (
            <li
              key={exp.company + exp.role}
              data-testid={`exp-card-${index}`}
              className="hover-card bg-bgElevated p-8 flex flex-col gap-3"
              style={
                {
                  "--card-hover-duration": `${cardHover.duration}ms`,
                  "--card-hover-easing": cardHover.easing,
                  "--card-hover-translate-y": `${cardHover.translateY}px`,
                } as React.CSSProperties
              }
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent">{exp.company}</span>
              <span className="text-md font-bold text-ink">{exp.role}</span>
              <span className="text-xs text-inkMuted">
                {exp.dates} · {exp.location}
              </span>
              <ul className="mt-3 list-none space-y-2">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-sm text-ink">
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mt-3 text-xs italic text-inkMuted">{exp.stack}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
