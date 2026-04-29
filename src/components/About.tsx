import { SUBHEAD_BODY, SUBHEAD_PARTNER } from "../lib/content";
import { sectionEntrance } from "../lib/motion";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": sectionEntrance.duration + "ms",
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="py-24 px-6 md:px-10 bg-bg"
    >
      <div className="mx-auto max-w-wide grid md:grid-cols-2 gap-10">
        <h2
          data-testid="about-headline"
          className="font-sans font-bold uppercase text-xl leading-[1.05] tracking-[-0.02em] text-ink"
        >
          {SUBHEAD_PARTNER}
        </h2>
        <p data-testid="about-body" className="text-base text-inkMuted">
          {SUBHEAD_BODY}
        </p>
      </div>
    </section>
  );
}
