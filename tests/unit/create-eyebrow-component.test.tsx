/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Eyebrow from "../../src/components/Eyebrow";

describe("Eyebrow component", () => {
  test("renders text with default testId", () => {
    render(<Eyebrow text="FEATURED ROLES" />);
    const el = screen.getByTestId("eyebrow");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("FEATURED ROLES");
  });

  test("renders with custom testId", () => {
    render(<Eyebrow text="TOP SKILLS" testId="skills-eyebrow" />);
    const el = screen.getByTestId("skills-eyebrow");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("TOP SKILLS");
  });

  test("text is rendered in uppercase tracking element", () => {
    render(<Eyebrow text="EDUCATION" />);
    expect(screen.getByText("EDUCATION")).toBeInTheDocument();
  });
});
