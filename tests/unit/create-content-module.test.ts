import {
  AI_FOOTER_BODY,
  AI_FOOTER_EYEBROW,
  AI_FOOTER_HEADLINE,
  AI_FOOTER_RALPH_URL,
  AI_FOOTER_REPO_LABEL,
  AI_FOOTER_REPO_URL,
  AI_FOOTER_WORKFLOW,
  CONTACT,
  EDUCATION,
  EXPERIENCES,
  EYEBROW_EDU,
  EYEBROW_EXPERIENCE,
  EYEBROW_SKILLS,
  HERO_HEADLINE,
  HERO_LEAD_HIGHLIGHT,
  HERO_LEAD_PREFIX,
  SKILLS,
  STATS,
  SUBHEAD_BODY,
  SUBHEAD_PARTNER,
  WORDMARK_TEXT,
} from "../../src/lib/content";

describe("content module", () => {
  test("HERO_HEADLINE", () => {
    expect(HERO_HEADLINE).toBe("ENGINEERING MODERN INTERFACES");
  });

  test("HERO_LEAD_PREFIX", () => {
    expect(HERO_LEAD_PREFIX).toBe(
      "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
    );
  });

  test("HERO_LEAD_HIGHLIGHT", () => {
    expect(HERO_LEAD_HIGHLIGHT).toBe("react architecture, design systems, and applied AI.");
  });

  test("SUBHEAD_PARTNER", () => {
    expect(SUBHEAD_PARTNER).toBe("Your Partner For Cross-Platform Frontend Engineering");
  });

  test("SUBHEAD_BODY is a non-empty string", () => {
    expect(typeof SUBHEAD_BODY).toBe("string");
    expect(SUBHEAD_BODY.length).toBeGreaterThan(20);
  });

  test("STATS has 4 entries with value, suffix, label", () => {
    expect(STATS).toHaveLength(4);
    for (const stat of STATS) {
      expect(typeof stat.value).toBe("number");
      expect(typeof stat.suffix).toBe("string");
      expect(typeof stat.label).toBe("string");
    }
  });

  test("eyebrow constants", () => {
    expect(EYEBROW_EXPERIENCE).toBe("FEATURED ROLES");
    expect(EYEBROW_SKILLS).toBe("TOP SKILLS");
    expect(EYEBROW_EDU).toBe("EDUCATION & CERTIFICATIONS");
  });

  test("EXPERIENCES has 5 entries with correct companies", () => {
    expect(EXPERIENCES).toHaveLength(5);
    const companies = EXPERIENCES.map((e: { company: string }) => e.company);
    expect(companies).toContain("SmartThings, Inc.");
    expect(companies).toContain("Samsung Research America");
    expect(companies).toContain("Samsung Strategy & Innovation Center");
    expect(companies).toContain("Prism, Inc.");
    expect(companies).toContain("Imprivata");
  });

  test("each experience has required fields", () => {
    for (const exp of EXPERIENCES) {
      expect(exp).toHaveProperty("company");
      expect(exp).toHaveProperty("location");
      expect(exp).toHaveProperty("role");
      expect(exp).toHaveProperty("dates");
      expect(Array.isArray(exp.bullets)).toBe(true);
      expect(exp.bullets.length).toBeGreaterThan(0);
      expect(typeof exp.stack).toBe("string");
    }
  });

  test("SKILLS has 4 categories", () => {
    expect(SKILLS).toHaveLength(4);
    for (const skill of SKILLS) {
      expect(typeof skill.category).toBe("string");
      expect(Array.isArray(skill.items)).toBe(true);
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  test("EDUCATION has 3 entries", () => {
    expect(EDUCATION).toHaveLength(3);
    for (const edu of EDUCATION) {
      expect(typeof edu.title).toBe("string");
      expect(typeof edu.detail).toBe("string");
    }
  });

  test("CONTACT has all fields", () => {
    expect(CONTACT.name).toBe("Paul-Valentin Mini");
    expect(CONTACT.location).toBe("San Francisco, CA");
    expect(CONTACT.phone).toBe("(415) 694-3616");
    expect(CONTACT.email).toBe("paul@emini.com");
    expect(CONTACT.linkedin).toBe("https://www.linkedin.com/in/pvmini");
    expect(CONTACT.github).toBe("https://github.com/Laptopmini");
  });

  test("AI footer constants", () => {
    expect(AI_FOOTER_EYEBROW).toBe("TELL US HOW THIS WAS BUILT");
    expect(AI_FOOTER_HEADLINE).toBe("HOW THIS SITE WAS BUILT");
    expect(typeof AI_FOOTER_BODY).toBe("string");
    expect(AI_FOOTER_BODY.length).toBeGreaterThan(20);
    expect(typeof AI_FOOTER_WORKFLOW).toBe("string");
    expect(AI_FOOTER_WORKFLOW.length).toBeGreaterThan(20);
    expect(AI_FOOTER_REPO_LABEL).toBe("VIEW ON GITHUB");
    expect(AI_FOOTER_REPO_URL).toBe("https://github.com/Laptopmini/resume-rebuildmanufacturing");
    expect(AI_FOOTER_RALPH_URL).toBe("https://github.com/Laptopmini/ralph-node");
  });

  test("WORDMARK_TEXT", () => {
    expect(WORDMARK_TEXT).toBe("PVMINI");
  });
});
