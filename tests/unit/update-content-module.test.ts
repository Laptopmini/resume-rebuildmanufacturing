import * as content from "../../src/lib/content";

describe("new exports", () => {
  it("exports HERO_VIDEO_URL with the correct Vimeo URL", () => {
    expect((content as Record<string, unknown>).HERO_VIDEO_URL).toBe(
      "https://player.vimeo.com/video/1168134399?muted=1&autoplay=1&loop=1&background=1&app_id=122963",
    );
  });

  it("exports EYEBROW_CONTACT as CONTACT", () => {
    expect((content as Record<string, unknown>).EYEBROW_CONTACT).toBe("CONTACT");
  });

  it("exports AI_FOOTER_CTA_LABEL", () => {
    expect((content as Record<string, unknown>).AI_FOOTER_CTA_LABEL).toBe("EXPLORE THE PIPELINE");
  });
});

describe("AI_FOOTER_WORKFLOW is deleted", () => {
  it("does not export AI_FOOTER_WORKFLOW", () => {
    expect(content as Record<string, unknown>).not.toHaveProperty("AI_FOOTER_WORKFLOW");
  });
});

describe("changed exports", () => {
  it("AI_FOOTER_EYEBROW is BUILT BY RALPH-NODE", () => {
    expect(content.AI_FOOTER_EYEBROW).toBe("BUILT BY RALPH-NODE");
  });

  it("AI_FOOTER_HEADLINE is AN ORCHESTRATED AI PIPELINE", () => {
    expect(content.AI_FOOTER_HEADLINE).toBe("AN ORCHESTRATED AI PIPELINE");
  });

  it("AI_FOOTER_BODY has the orchestrated pipeline description", () => {
    expect(content.AI_FOOTER_BODY).toBe(
      "Ralph-node is an orchestrated, test-gated AI development pipeline for Node.js. A Ralph loop turns a single paragraph into a planned, tested, reviewed, fully working implementation across PR-gated phases. Engineered entirely by me.",
    );
  });

  it("AI_FOOTER_REPO_LABEL is VIEW THIS REPO", () => {
    expect(content.AI_FOOTER_REPO_LABEL).toBe("VIEW THIS REPO");
  });
});

describe("SKILLS AI & ML category items", () => {
  it("has the full list of AI & ML skill items", () => {
    const aiSkills = content.SKILLS.find((s) => s.category === "AI & Machine Learning");
    expect(aiSkills).toBeDefined();
    expect(aiSkills?.items).toEqual([
      "Applied Prompt Engineering",
      "LLM Integration",
      "Computer Vision (OpenCV, Tesseract)",
      "Test-Driven Development",
      "Ralph Loop",
      "Agent Orchestration",
    ]);
  });
});

describe("STATS", () => {
  it("has exactly four entries in order", () => {
    expect(content.STATS).toHaveLength(4);
  });

  it("entry 0: YEARS BUILDING UI with value 10 and suffix +", () => {
    expect(content.STATS[0]).toEqual({
      value: 10,
      suffix: "+",
      label: "YEARS BUILDING UI",
    });
  });

  it("entry 1: POSITIONS HELD with derived EXPERIENCES.length", () => {
    expect(content.STATS[1]).toEqual({
      value: content.EXPERIENCES.length,
      suffix: "",
      label: "POSITIONS HELD",
    });
  });

  it("entry 2: GITHUB CONTRIBUTIONS / YEAR with format comma", () => {
    expect(content.STATS[2]).toEqual({
      value: 1474,
      suffix: "+",
      label: "GITHUB CONTRIBUTIONS / YEAR",
      format: "comma",
    });
  });

  it("entry 3: UNIQUE SKILLS with derived total skill count", () => {
    const totalSkills = content.SKILLS.flatMap((s) => s.items as readonly string[]).length;
    expect(content.STATS[3]).toEqual({
      value: totalSkills,
      suffix: "",
      label: "UNIQUE SKILLS",
    });
  });
});

describe("preserved exports", () => {
  it("keeps HERO_HEADLINE unchanged", () => {
    expect(content.HERO_HEADLINE).toBe("ENGINEERING MODERN INTERFACES");
  });

  it("keeps HERO_LEAD_PREFIX unchanged", () => {
    expect(content.HERO_LEAD_PREFIX).toBe(
      "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
    );
  });

  it("keeps EYEBROW_EXPERIENCE unchanged", () => {
    expect(content.EYEBROW_EXPERIENCE).toBe("FEATURED ROLES");
  });

  it("keeps WORDMARK_TEXT unchanged", () => {
    expect(content.WORDMARK_TEXT).toBe("PVMINI");
  });

  it("keeps CONTACT with all fields", () => {
    expect(content.CONTACT).toEqual({
      name: "Paul-Valentin Mini",
      location: "San Francisco, CA",
      phone: "(415) 694-3616",
      email: "paul@emini.com",
      linkedin: "https://www.linkedin.com/in/pvmini",
      github: "https://github.com/Laptopmini",
    });
  });

  it("keeps Frontend & Web skill items unchanged", () => {
    const frontend = content.SKILLS.find((s) => s.category === "Frontend & Web");
    expect(frontend).toBeDefined();
    expect(frontend?.items).toEqual(["JavaScript", "TypeScript", "React", "Next.js", "HTML/CSS"]);
  });

  it("keeps Infrastructure & DevOps skill items unchanged", () => {
    const devops = content.SKILLS.find((s) => s.category === "Infrastructure & DevOps");
    expect(devops).toBeDefined();
    expect(devops?.items).toEqual([
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "Spinnaker",
      "JFrog Artifactory (NPM)",
    ]);
  });

  it("keeps Backend & Mobile skill items unchanged", () => {
    const backend = content.SKILLS.find((s) => s.category === "Backend & Mobile");
    expect(backend).toBeDefined();
    expect(backend?.items).toEqual([
      "Python",
      "Swift",
      "PostgreSQL",
      "REST API Design",
      "iOS/Android Development",
    ]);
  });
});
