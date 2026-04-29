import { withBasePath } from "../lib/basePath";
import { HERO_HEADLINE, HERO_LEAD_HIGHLIGHT, HERO_LEAD_PREFIX } from "../lib/content";
import { sectionEntrance } from "../lib/motion";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": `${sectionEntrance.duration}ms`,
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="relative min-h-screen pt-32 pb-24 px-6 md:px-10 bg-bg"
    >
      <div className="mx-auto max-w-wide grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <h1
            data-testid="hero-headline"
            className="font-sans font-bold uppercase text-display leading-[0.95] tracking-[-0.02em] text-ink"
          >
            {HERO_HEADLINE}
          </h1>
          <p data-testid="hero-lead" className="mt-12 text-md text-ink max-w-content">
            {HERO_LEAD_PREFIX} <span className="accent-highlight">{HERO_LEAD_HIGHLIGHT}</span>
          </p>
        </div>
        <div className="md:col-span-5">
          <img
            data-testid="hero-portrait"
            src={withBasePath("/profile.png")}
            alt="Paul-Valentin Mini"
            className="w-full aspect-[3/4] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
