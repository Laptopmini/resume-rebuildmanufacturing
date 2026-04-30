import { withBasePath } from "../lib/basePath";
import { CONTACT, EYEBROW_CONTACT } from "../lib/content";
import { sectionEntrance } from "../lib/motion";
import Eyebrow from "./Eyebrow";

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
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
        <Eyebrow text={EYEBROW_CONTACT} testId="contact-eyebrow" />
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <img
              data-testid="contact-portrait"
              src={withBasePath("/profile.png")}
              alt={CONTACT.name}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="md:col-span-7 flex flex-col gap-4">
            <span data-testid="contact-name" className="text-md font-bold text-ink">
              {CONTACT.name}
            </span>
            <span data-testid="contact-location" className="text-sm text-inkMuted">
              {CONTACT.location}
            </span>
            <span data-testid="contact-phone" className="text-sm text-inkMuted">
              {CONTACT.phone}
            </span>
            <div className="mt-4 flex flex-wrap gap-6">
              <a
                data-testid="contact-email"
                href={`mailto:${CONTACT.email}`}
                className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline"
              >
                {CONTACT.email}
              </a>
              <a
                data-testid="contact-linkedin"
                href={CONTACT.linkedin}
                className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline"
              >
                LINKEDIN
              </a>
              <a
                data-testid="contact-github"
                href={CONTACT.github}
                className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
