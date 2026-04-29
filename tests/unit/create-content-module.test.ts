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
  describe("hero strings", () => {
    it("HERO_HEADLINE is correct", () => {
      expect(HERO_HEADLINE).toBe("ENGINEERING MODERN INTERFACES");
    });

    it("HERO_LEAD_PREFIX is correct", () => {
      expect(HERO_LEAD_PREFIX).toBe(
        "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
      );
    });

    it("HERO_LEAD_HIGHLIGHT is correct", () => {
      expect(HERO_LEAD_HIGHLIGHT).toBe("react architecture, design systems, and applied AI.");
    });
  });

  describe("about strings", () => {
    it("SUBHEAD_PARTNER is correct", () => {
      expect(SUBHEAD_PARTNER).toBe("Your Partner For Cross-Platform Frontend Engineering");
    });

    it("SUBHEAD_BODY is a non-empty string", () => {
      expect(typeof SUBHEAD_BODY).toBe("string");
      expect(SUBHEAD_BODY.length).toBeGreaterThan(50);
    });
  });

  describe("STATS", () => {
    it("has exactly four stats", () => {
      expect(STATS).toHaveLength(4);
    });

    const expectedStats = [
      { value: 10, suffix: "+", label: "YEARS BUILDING UI" },
      { value: 5, suffix: "", label: "PRODUCTION PLATFORMS" },
      { value: 1, suffix: "M+", label: "DEVICES SHIPPED" },
      { value: 4, suffix: "", label: "PATENTED PRODUCTS" },
    ];

    expectedStats.forEach((expected, i) => {
      it(`stat ${i} has correct shape and value`, () => {
        expect(STATS[i].value).toBe(expected.value);
        expect(STATS[i].suffix).toBe(expected.suffix);
        expect(STATS[i].label).toBe(expected.label);
      });
    });
  });

  describe("section eyebrows", () => {
    it("EYEBROW_EXPERIENCE is correct", () => {
      expect(EYEBROW_EXPERIENCE).toBe("FEATURED ROLES");
    });

    it("EYEBROW_SKILLS is correct", () => {
      expect(EYEBROW_SKILLS).toBe("TOP SKILLS");
    });

    it("EYEBROW_EDU is correct", () => {
      expect(EYEBROW_EDU).toBe("EDUCATION & CERTIFICATIONS");
    });
  });

  describe("EXPERIENCES", () => {
    it("has exactly five experiences", () => {
      expect(EXPERIENCES).toHaveLength(5);
    });

    const expectedCompanies = [
      "SmartThings",
      "Samsung Research America",
      "Samsung Strategy & Innovation Center",
      "Prism",
      "Imprivata",
    ];

    expectedCompanies.forEach((company, i) => {
      it(`experience ${i} is for ${company}`, () => {
        const exp = EXPERIENCES[i];
        expect(exp.company).toContain(company);
        expect(typeof exp.location).toBe("string");
        expect(typeof exp.role).toBe("string");
        expect(typeof exp.dates).toBe("string");
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(exp.bullets.length).toBeGreaterThan(0);
        expect(typeof exp.stack).toBe("string");
      });
    });
  });

  describe("SKILLS", () => {
    it("has exactly four skill categories", () => {
      expect(SKILLS).toHaveLength(4);
    });

    it("each skill has category and items", () => {
      for (const skill of SKILLS) {
        expect(typeof skill.category).toBe("string");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });
  });

  describe("EDUCATION", () => {
    it("has exactly three entries", () => {
      expect(EDUCATION).toHaveLength(3);
    });

    it("each entry has title and detail", () => {
      for (const edu of EDUCATION) {
        expect(typeof edu.title).toBe("string");
        expect(typeof edu.detail).toBe("string");
      }
    });
  });

  describe("CONTACT", () => {
    it("has all required fields", () => {
      expect(CONTACT.name).toBe("Paul-Valentin Mini");
      expect(CONTACT.location).toBe("San Francisco, CA");
      expect(CONTACT.phone).toBe("(415) 694-3616");
      expect(CONTACT.email).toBe("paul@emini.com");
      expect(CONTACT.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(CONTACT.github).toBe("https://github.com/Laptopmini");
    });
  });

  describe("AI footer strings", () => {
    it("AI_FOOTER_EYEBROW is correct", () => {
      expect(AI_FOOTER_EYEBROW).toBe("TELL US HOW THIS WAS BUILT");
    });

    it("AI_FOOTER_HEADLINE is correct", () => {
      expect(AI_FOOTER_HEADLINE).toBe("HOW THIS SITE WAS BUILT");
    });

    it("AI_FOOTER_BODY is a non-empty paragraph", () => {
      expect(typeof AI_FOOTER_BODY).toBe("string");
      expect(AI_FOOTER_BODY.length).toBeGreaterThan(100);
    });

    it("AI_FOOTER_WORKFLOW is a non-empty paragraph about ralph phases", () => {
      expect(typeof AI_FOOTER_WORKFLOW).toBe("string");
      expect(AI_FOOTER_WORKFLOW.length).toBeGreaterThan(50);
    });

    it("AI_FOOTER_REPO_LABEL is correct", () => {
      expect(AI_FOOTER_REPO_LABEL).toBe("VIEW ON GITHUB");
    });

    it("AI_FOOTER_REPO_URL is correct", () => {
      expect(AI_FOOTER_REPO_URL).toBe("https://github.com/Laptopmini/resume-rebuildmanufacturing");
    });

    it("AI_FOOTER_RALPH_URL is correct", () => {
      expect(AI_FOOTER_RALPH_URL).toBe("https://github.com/Laptopmini/ralph-node");
    });
  });

  describe("WORDMARK_TEXT", () => {
    it("is correct", () => {
      expect(WORDMARK_TEXT).toBe("PVMINI");
    });
  });
});
