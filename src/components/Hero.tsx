import {
  HERO_HEADLINE,
  HERO_LEAD_HIGHLIGHT,
  HERO_LEAD_PREFIX,
  HERO_VIDEO_URL,
} from "../lib/content";
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
      className="relative min-h-screen overflow-hidden bg-bg flex items-end pt-32 pb-24 px-6 md:px-10"
    >
      <iframe
        data-testid="hero-video"
        src={HERO_VIDEO_URL}
        className="hero-video-frame"
        title="Background video"
        aria-hidden="true"
        allow="autoplay; fullscreen"
        frameBorder={0}
      />
      <div data-testid="hero-overlay" className="hero-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-wide w-full">
        <h1
          data-testid="hero-headline"
          className="font-sans font-bold uppercase text-display leading-[0.95] tracking-[-0.02em] text-ink"
        >
          {HERO_HEADLINE}
        </h1>
        <p data-testid="hero-lead" className="mt-12 text-md text-ink max-w-content">
          {HERO_LEAD_PREFIX} <span className="accent-highlight">{HERO_LEAD_HIGHLIGHT}</span>{" "}
          Seriously, any UI. Even yours.
        </p>
      </div>
    </section>
  );
}
