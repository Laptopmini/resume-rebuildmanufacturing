import * as content from "../../src/lib/content";

describe("content module — byte-for-byte intact exports", () => {
  it("preserves HERO_HEADLINE", () => {
    expect(content.HERO_HEADLINE).toBe("ENGINEERING MODERN INTERFACES");
  });

  it("preserves HERO_LEAD_PREFIX", () => {
    expect(content.HERO_LEAD_PREFIX).toBe(
      "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
    );
  });

  it("preserves HERO_LEAD_HIGHLIGHT", () => {
    expect(content.HERO_LEAD_HIGHLIGHT).toBe("react architecture, design systems, and applied AI.");
  });

  it("preserves SUBHEAD_PARTNER", () => {
    expect(content.SUBHEAD_PARTNER).toBe("Your Partner For Cross-Platform Frontend Engineering");
  });

  it("preserves SUBHEAD_BODY", () => {
    expect(content.SUBHEAD_BODY).toBe(
      "Lead Frontend Engineer with over 10 years of experience designing and scaling web and mobile applications for global platforms like Samsung SmartThings. Expert in React, Next.js, and modern JavaScript ecosystems, with a proven track record of overhauling developer consoles and building robust internal component libraries.",
    );
  });

  it("preserves EYEBROW_EXPERIENCE", () => {
    expect(content.EYEBROW_EXPERIENCE).toBe("FEATURED ROLES");
  });

  it("preserves EYEBROW_SKILLS", () => {
    expect(content.EYEBROW_SKILLS).toBe("TOP SKILLS");
  });

  it("preserves EYEBROW_EDU", () => {
    expect(content.EYEBROW_EDU).toBe("EDUCATION & CERTIFICATIONS");
  });

  it("preserves EXPERIENCES array length", () => {
    expect(content.EXPERIENCES).toHaveLength(5);
  });

  it("preserves EXPERIENCES first entry company", () => {
    expect(content.EXPERIENCES[0].company).toBe("SmartThings");
  });

  it("preserves EXPERIENCES first entry role", () => {
    expect(content.EXPERIENCES[0].role).toBe("Senior Software Developer");
  });

  it("preserves EXPERIENCES first entry dates", () => {
    expect(content.EXPERIENCES[0].dates).toBe("January 2020 – Present");
  });

  it("preserves EXPERIENCES first entry location", () => {
    expect(content.EXPERIENCES[0].location).toBe("San Francisco, CA");
  });

  it("preserves EXPERIENCES first entry bullets count", () => {
    expect(content.EXPERIENCES[0].bullets).toHaveLength(4);
  });

  it("preserves EXPERIENCES last entry company", () => {
    expect(content.EXPERIENCES[4].company).toBe("Imprivata");
  });

  it("preserves EDUCATION array length", () => {
    expect(content.EDUCATION).toHaveLength(3);
  });

  it("preserves EDUCATION first entry title", () => {
    expect(content.EDUCATION[0].title).toBe("B.A. Computer Science");
  });

  it("preserves EDUCATION first entry detail", () => {
    expect(content.EDUCATION[0].detail).toBe("University of California, Santa Cruz (UCSC)");
  });

  it("preserves CONTACT name", () => {
    expect(content.CONTACT.name).toBe("Paul-Valentin Mini");
  });

  it("preserves CONTACT email", () => {
    expect(content.CONTACT.email).toBe("paul@emini.com");
  });

  it("preserves CONTACT phone", () => {
    expect(content.CONTACT.phone).toBe("(415) 694-3616");
  });

  it("preserves CONTACT location", () => {
    expect(content.CONTACT.location).toBe("San Francisco, CA");
  });

  it("preserves WORDMARK_TEXT", () => {
    expect(content.WORDMARK_TEXT).toBe("PVMINI");
  });

  it("preserves AI_FOOTER_REPO_URL", () => {
    expect(content.AI_FOOTER_REPO_URL).toBe(
      "https://github.com/Laptopmini/resume-rebuildmanufacturing",
    );
  });

  it("preserves AI_FOOTER_RALPH_URL", () => {
    expect(content.AI_FOOTER_RALPH_URL).toBe("https://github.com/Laptopmini/ralph-node");
  });
});
