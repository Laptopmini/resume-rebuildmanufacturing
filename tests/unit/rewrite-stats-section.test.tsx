import { render, screen } from "@testing-library/react";

import Stats from "../../src/components/Stats";

jest.mock("../../src/lib/content", () => ({
  STATS: [
    { value: 10, suffix: "+", label: "YEARS BUILDING UI" },
    { value: 1474, suffix: "+", label: "GITHUB CONTRIBUTIONS / YEAR", format: "comma" },
    { value: 5, suffix: "", label: "POSITIONS HELD" },
  ],
}));

jest.mock("../../src/lib/motion", () => ({
  sectionEntrance: { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", offsetY: 24 },
  statCountUp: { duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
}));

describe("Stats", () => {
  beforeEach(() => {
    render(<Stats />);
  });

  it("renders the stats-section wrapper", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
  });

  it("renders data-in-view attribute on the section", () => {
    const section = screen.getByTestId("stats-section");
    expect(section).toHaveAttribute("data-in-view");
  });

  it("renders correct number of stat items", () => {
    expect(screen.getByTestId("stat-0")).toBeInTheDocument();
    expect(screen.getByTestId("stat-1")).toBeInTheDocument();
    expect(screen.getByTestId("stat-2")).toBeInTheDocument();
    expect(screen.queryByTestId("stat-3")).not.toBeInTheDocument();
  });

  it("renders stat labels from STATS data", () => {
    expect(screen.getByText("YEARS BUILDING UI")).toBeInTheDocument();
    expect(screen.getByText("GITHUB CONTRIBUTIONS / YEAR")).toBeInTheDocument();
    expect(screen.getByText("POSITIONS HELD")).toBeInTheDocument();
  });

  it("formats comma-format values with Intl.NumberFormat", () => {
    expect(screen.getByTestId("stat-1").textContent).toMatch(/1,474\+/);
  });

  it("renders non-comma values without thousand separators", () => {
    expect(screen.getByTestId("stat-0").textContent).toContain("10+");
  });

  it("renders value without suffix when suffix is empty string", () => {
    expect(screen.getByTestId("stat-2").textContent).toContain("5");
    expect(screen.getByTestId("stat-2").textContent).not.toContain("5+");
  });

  it("renders the grid container with correct layout classes", () => {
    const section = screen.getByTestId("stats-section");
    const container = section.firstElementChild;
    expect(container).toHaveClass(
      "mx-auto",
      "max-w-wide",
      "grid",
      "grid-cols-2",
      "md:grid-cols-4",
      "gap-10",
    );
  });

  it("sets entrance animation CSS custom properties on the section", () => {
    const section = screen.getByTestId("stats-section");
    expect(section.style.getPropertyValue("--entrance-duration")).toBe("600ms");
    expect(section.style.getPropertyValue("--entrance-easing")).toBe(
      "cubic-bezier(0.22, 1, 0.36, 1)",
    );
  });

  it("sets count-up animation CSS custom properties on stat items", () => {
    const stat = screen.getByTestId("stat-0");
    expect(stat.style.getPropertyValue("--count-duration")).toBe("1200ms");
    expect(stat.style.getPropertyValue("--count-easing")).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
  });
});
