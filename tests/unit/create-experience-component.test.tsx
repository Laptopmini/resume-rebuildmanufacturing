import { render, screen } from "@testing-library/react";

import Experience from "../../src/components/Experience";
import { EXPERIENCES, EYEBROW_EXPERIENCE } from "../../src/lib/content";
import { cardHover, sectionEntrance } from "../../src/lib/motion";

describe("Experience", () => {
  beforeEach(() => {
    render(<Experience />);
  });

  it("renders the experience section with data-testid and data-in-view", () => {
    const section = screen.getByTestId("experience-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("renders the eyebrow with EYEBROW_EXPERIENCE text", () => {
    const eyebrow = screen.getByTestId("experience-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(EYEBROW_EXPERIENCE);
  });

  it("renders exactly the number of EXPERIENCE cards", () => {
    for (let i = 0; i < EXPERIENCES.length; i++) {
      const card = screen.getByTestId(`exp-card-${i}`);
      expect(card).toBeInTheDocument();
    }
    expect(screen.queryByTestId(`exp-card-${EXPERIENCES.length}`)).not.toBeInTheDocument();
  });

  it("renders company, role, dates, and location in each card", () => {
    for (let i = 0; i < EXPERIENCES.length; i++) {
      const card = screen.getByTestId(`exp-card-${i}`);
      expect(card).toHaveTextContent(EXPERIENCES[i].company);
      expect(card).toHaveTextContent(EXPERIENCES[i].role);
      expect(card).toHaveTextContent(EXPERIENCES[i].dates);
      expect(card).toHaveTextContent(EXPERIENCES[i].location);
    }
  });

  it("applies sectionEntrance CSS custom properties on the section", () => {
    const section = screen.getByTestId("experience-section");
    expect(section.style.getPropertyValue("--entrance-duration")).toBe(
      `${sectionEntrance.duration}ms`,
    );
    expect(section.style.getPropertyValue("--entrance-easing")).toBe(sectionEntrance.easing);
  });

  it("applies cardHover CSS custom properties on the first card", () => {
    const firstCard = screen.getByTestId("exp-card-0");
    expect(firstCard.style.getPropertyValue("--card-hover-duration")).toBe(
      `${cardHover.duration}ms`,
    );
    expect(firstCard.style.getPropertyValue("--card-hover-easing")).toBe(cardHover.easing);
    expect(firstCard.style.getPropertyValue("--card-hover-translate-y")).toBe(
      `${cardHover.translateY}px`,
    );
  });
});
