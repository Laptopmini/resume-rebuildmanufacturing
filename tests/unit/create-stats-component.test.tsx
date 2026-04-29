import { render, screen } from "@testing-library/react";

import Stats from "../../src/components/Stats";
import { STATS } from "../../src/lib/content";
import { sectionEntrance, statCountUp } from "../../src/lib/motion";

describe("Stats", () => {
  beforeEach(() => {
    render(<Stats />);
  });

  it("renders the stats section with data-testid and data-in-view", () => {
    const section = screen.getByTestId("stats-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("renders exactly the number of STATS items", () => {
    for (let i = 0; i < STATS.length; i++) {
      const statItem = screen.getByTestId(`stat-${i}`);
      expect(statItem).toBeInTheDocument();
    }
    expect(screen.queryByTestId(`stat-${STATS.length}`)).not.toBeInTheDocument();
  });

  it("renders stat values with suffix and labels matching STATS data", () => {
    for (let i = 0; i < STATS.length; i++) {
      const statItem = screen.getByTestId(`stat-${i}`);
      expect(statItem).toHaveTextContent(`${STATS[i].value}${STATS[i].suffix}`);
      expect(statItem).toHaveTextContent(STATS[i].label);
    }
  });

  it("applies sectionEntrance CSS custom properties on the section", () => {
    const section = screen.getByTestId("stats-section");
    expect(section.style.getPropertyValue("--entrance-duration")).toBe(
      `${sectionEntrance.duration}ms`,
    );
    expect(section.style.getPropertyValue("--entrance-easing")).toBe(sectionEntrance.easing);
  });

  it("applies statCountUp CSS custom properties on a stat item", () => {
    const firstStat = screen.getByTestId("stat-0");
    expect(firstStat.style.getPropertyValue("--count-duration")).toBe(`${statCountUp.duration}ms`);
    expect(firstStat.style.getPropertyValue("--count-easing")).toBe(statCountUp.easing);
  });
});
