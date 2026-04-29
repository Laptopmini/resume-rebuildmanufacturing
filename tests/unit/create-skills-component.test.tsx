import { render, screen } from "@testing-library/react";
import Skills from "../../src/components/Skills";
import { EYEBROW_SKILLS, SKILLS } from "../../src/lib/content";

describe("Skills component", () => {
  it("renders the skills section with correct data-testid and in-view attributes", () => {
    render(<Skills />);
    const section = screen.getByTestId("skills-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
    expect(section.tagName).toBe("SECTION");
  });

  it("renders the eyebrow with skills text and testId", () => {
    render(<Skills />);
    const eyebrow = screen.getByTestId("skills-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(EYEBROW_SKILLS);
  });

  it("renders a dl grid with all skill categories", () => {
    render(<Skills />);
    SKILLS.forEach((skill, index) => {
      const catDiv = screen.getByTestId(`skill-cat-${index}`);
      expect(catDiv).toBeInTheDocument();
      expect(catDiv.querySelector("dt")).toHaveTextContent(skill.category);
      expect(catDiv.querySelector("dd")).toHaveTextContent(skill.items.join(", "));
    });
  });

  it("renders exactly the number of skill categories from SKILLS", () => {
    render(<Skills />);
    SKILLS.forEach((_, index) => {
      expect(screen.getByTestId(`skill-cat-${index}`)).toBeInTheDocument();
    });
    expect(screen.queryByTestId(`skill-cat-${SKILLS.length}`)).not.toBeInTheDocument();
  });
});
