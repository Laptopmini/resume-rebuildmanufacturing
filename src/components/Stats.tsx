import { STATS } from "../lib/content";
import { sectionEntrance, statCountUp } from "../lib/motion";

export default function Stats() {
  return (
    <section
      data-testid="stats-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": `${sectionEntrance.duration}ms`,
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="py-24 px-6 md:px-10 bg-bg border-y border-rule"
    >
      <div className="mx-auto max-w-wide grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            data-testid={`stat-${index}`}
            style={
              {
                "--count-duration": `${statCountUp.duration}ms`,
                "--count-easing": statCountUp.easing,
              } as React.CSSProperties
            }
            className="flex flex-col items-start"
          >
            <span className="text-2xl font-bold text-accent">
              {stat.format === "comma"
                ? new Intl.NumberFormat("en-US").format(stat.value)
                : String(stat.value)}
              {stat.suffix}
            </span>
            <span className="mt-3 text-xs uppercase tracking-[0.2em] text-inkMuted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
