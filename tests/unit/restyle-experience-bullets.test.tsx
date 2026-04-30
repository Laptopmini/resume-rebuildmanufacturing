import { render, screen } from "@testing-library/react";
import Experience from "../../src/components/Experience";

function getInnerBulletUl(card: Element): HTMLUListElement {
  const ul = card.querySelector("ul");
  if (!ul) throw new Error("Expected an inner bullet <ul> inside the experience card");
  return ul;
}

describe("Experience bullet styling", () => {
  it("renders inner bullet <ul> with list-disc, list-outside, pl-5, and marker:text-accent classes", () => {
    render(<Experience />);

    const cards = screen.getAllByTestId(/^exp-card-/);
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      const ul = getInnerBulletUl(card);

      // New classes must be present
      expect(ul.classList.contains("list-disc")).toBe(true);
      expect(ul.classList.contains("list-outside")).toBe(true);
      expect(ul.classList.contains("pl-5")).toBe(true);
      expect(ul.classList.contains("marker:text-accent")).toBe(true);

      // Old list-none class must be removed
      expect(ul.classList.contains("list-none")).toBe(false);
    }
  });

  it("preserves text-sm text-ink className on each bullet <li>", () => {
    render(<Experience />);

    const cards = screen.getAllByTestId(/^exp-card-/);
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      const ul = getInnerBulletUl(card);
      const items = ul.querySelectorAll("li");
      expect(items.length).toBeGreaterThan(0);

      for (const li of items) {
        expect(li.classList.contains("text-sm")).toBe(true);
        expect(li.classList.contains("text-ink")).toBe(true);
        expect(li.textContent).toBeTruthy();
      }
    }
  });

  it("preserves surrounding structure: outer grid <ul>, company/role/dates/stack spans, data-testid", () => {
    render(<Experience />);

    // Section exists
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();

    // Outer grid ul exists
    const section = screen.getByTestId("experience-section");
    const outerGrid = section.querySelector(":scope > div > ul");
    expect(outerGrid).toBeInTheDocument();
    expect(outerGrid!.classList.contains("grid")).toBe(true);
    expect(outerGrid!.classList.contains("md:grid-cols-2")).toBe(true);

    const cards = screen.getAllByTestId(/^exp-card-\d+$/);
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      const spans = card.querySelectorAll(":scope > span");

      // Company: text-xs uppercase tracking-[0.2em] text-accent
      const companySpan = Array.from(spans).find((s) => s.classList.contains("text-accent"));
      expect(companySpan).toBeTruthy();
      expect(companySpan!.classList.contains("text-xs")).toBe(true);
      expect(companySpan!.classList.contains("uppercase")).toBe(true);
      expect(companySpan!.classList.contains("tracking-[0.2em]")).toBe(true);

      // Role: text-md font-bold text-ink
      const roleSpan = Array.from(spans).find((s) => s.classList.contains("font-bold"));
      expect(roleSpan).toBeTruthy();
      expect(roleSpan!.classList.contains("text-md")).toBe(true);
      expect(roleSpan!.classList.contains("text-ink")).toBe(true);

      // Stack: text-xs italic text-inkMuted (last span)
      const stackSpan = spans[spans.length - 1];
      expect(stackSpan.classList.contains("text-xs")).toBe(true);
      expect(stackSpan.classList.contains("italic")).toBe(true);
      expect(stackSpan.classList.contains("text-inkMuted")).toBe(true);
    }
  });
});
