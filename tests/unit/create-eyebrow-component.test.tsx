import { render, screen } from "@testing-library/react";
import Eyebrow from "../../src/components/Eyebrow";

describe("Eyebrow", () => {
  it("renders text prop as visible content", () => {
    render(<Eyebrow text="FEATURED ROLES" />);
    expect(screen.getByText("FEATURED ROLES")).toBeInTheDocument();
  });

  it("uses default data-testid eyebrow when no testId prop", () => {
    render(<Eyebrow text="TOP SKILLS" />);
    expect(screen.getByTestId("eyebrow")).toBeInTheDocument();
  });

  it("uses custom data-testid when testId prop provided", () => {
    render(<Eyebrow text="EXPERIENCE" testId="experience-eyebrow" />);
    expect(screen.getByTestId("experience-eyebrow")).toBeInTheDocument();
  });

  it("renders flanking rule lines", () => {
    const { container } = render(<Eyebrow text="TEST" />);
    const spans = container.getElementsByTagName("span");
    // Two bg-rule spans flank the text span
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });
});
