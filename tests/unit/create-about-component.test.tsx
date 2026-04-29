import { render, screen } from "@testing-library/react";

import About from "../../src/components/About";
import { SUBHEAD_BODY, SUBHEAD_PARTNER } from "../../src/lib/content";
import { sectionEntrance } from "../../src/lib/motion";

describe("About", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("renders the about section with data-testid and data-in-view", () => {
    const section = screen.getByTestId("about-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("renders the headline with SUBHEAD_PARTNER text", () => {
    const headline = screen.getByTestId("about-headline");
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(SUBHEAD_PARTNER);
  });

  it("renders the body with SUBHEAD_BODY text", () => {
    const body = screen.getByTestId("about-body");
    expect(body).toBeInTheDocument();
    expect(body).toHaveTextContent(SUBHEAD_BODY);
  });

  it("applies sectionEntrance duration and easing as CSS custom properties", () => {
    const section = screen.getByTestId("about-section");
    expect(section.style.getPropertyValue("--entrance-duration")).toBe(
      `${sectionEntrance.duration}ms`,
    );
    expect(section.style.getPropertyValue("--entrance-easing")).toBe(sectionEntrance.easing);
  });
});
