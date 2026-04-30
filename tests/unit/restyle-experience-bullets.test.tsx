import { render, screen, within } from "@testing-library/react";
import Experience from "../../src/components/Experience";

describe("Experience bullet list styling", () => {
  beforeEach(() => {
    render(<Experience />);
  });

  it("renders the experience section and card with their data-testid attributes", () => {
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
    expect(screen.getByTestId("exp-card-0")).toBeInTheDocument();
  });

  it("styles the inner bullet <ul> with list-disc, list-outside, pl-5, space-y-2, and marker:text-accent", () => {
    const card = screen.getByTestId("exp-card-0");
    const bulletList = within(card).getByRole("list");

    expect(bulletList).toHaveClass("list-disc");
    expect(bulletList).toHaveClass("list-outside");
    expect(bulletList).toHaveClass("pl-5");
    expect(bulletList).toHaveClass("mt-3");
    expect(bulletList).toHaveClass("space-y-2");
    expect(bulletList).toHaveClass("marker:text-accent");
  });

  it("does not have list-none on the inner bullet <ul>", () => {
    const card = screen.getByTestId("exp-card-0");
    const bulletList = within(card).getByRole("list");

    expect(bulletList).not.toHaveClass("list-none");
  });

  it("keeps text-sm text-ink on each bullet <li>", () => {
    const card = screen.getByTestId("exp-card-0");
    const bulletList = within(card).getByRole("list");
    const items = bulletList.querySelectorAll("li");

    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      expect(item).toHaveClass("text-sm");
      expect(item).toHaveClass("text-ink");
    });
  });
});
