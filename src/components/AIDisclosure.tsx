import {
  AI_FOOTER_BODY,
  AI_FOOTER_EYEBROW,
  AI_FOOTER_HEADLINE,
  AI_FOOTER_RALPH_URL,
  AI_FOOTER_REPO_LABEL,
  AI_FOOTER_REPO_URL,
  AI_FOOTER_WORKFLOW,
  CONTACT,
} from "../lib/content";
import { sectionEntrance } from "../lib/motion";
import Eyebrow from "./Eyebrow";

export default function AIDisclosure() {
  return (
    <section
      id="contact"
      data-testid="ai-disclosure-section"
      data-in-view="true"
      style={
        {
          "--entrance-duration": `${sectionEntrance.duration}ms`,
          "--entrance-easing": sectionEntrance.easing,
        } as React.CSSProperties
      }
      className="py-24 px-6 md:px-10 bg-bgElevated border-t border-rule"
    >
      <div className="mx-auto max-w-wide">
        <Eyebrow text={AI_FOOTER_EYEBROW} testId="ai-eyebrow" />
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <h2
              data-testid="ai-headline"
              className="text-xl font-bold uppercase tracking-[-0.02em] text-ink leading-[1.05]"
            >
              {AI_FOOTER_HEADLINE}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p data-testid="ai-body" className="text-base text-ink">
              {AI_FOOTER_BODY}
            </p>
            <p data-testid="ai-workflow" className="mt-6 text-base text-inkMuted">
              {AI_FOOTER_WORKFLOW}
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              <a
                data-testid="ai-repo-link"
                href={AI_FOOTER_REPO_URL}
                className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline"
              >
                {AI_FOOTER_REPO_LABEL}
              </a>
              <a
                data-testid="ai-ralph-link"
                href={AI_FOOTER_RALPH_URL}
                className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline"
              >
                RALPH-NODE
              </a>
              <a
                data-testid="contact-email"
                href={`mailto:${CONTACT.email}`}
                className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline"
              >
                {CONTACT.email}
              </a>
              <a
                data-testid="contact-linkedin"
                href={CONTACT.linkedin}
                className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline"
              >
                LINKEDIN
              </a>
              <a
                data-testid="contact-github"
                href={CONTACT.github}
                className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline"
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
