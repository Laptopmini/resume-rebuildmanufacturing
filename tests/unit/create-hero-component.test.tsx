import { render, screen } from "@testing-library/react";
import Hero from "../../src/components/Hero";

describe("Hero", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it("renders the hero section with id, data-testid, and in-view attribute", () => {
    const section = screen.getByTestId("hero-section");
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveAttribute("id", "hero");
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("sets the entrance-animation custom properties on the section style", () => {
    const section = screen.getByTestId("hero-section");
    const style = section.getAttribute("style") ?? "";
    expect(style).toContain("--entrance-duration");
    expect(style).toContain("600ms");
    expect(style).toContain("--entrance-easing");
    expect(style).toContain("cubic-bezier(0.22, 1, 0.36, 1)");
  });

  it("renders the hero headline with the HERO_HEADLINE text", () => {
    const h1 = screen.getByTestId("hero-headline");
    expect(h1.tagName).toBe("H1");
    expect(h1).toHaveTextContent("ENGINEERING MODERN INTERFACES");
  });

  it("renders the lead paragraph containing the prefix and highlighted span", () => {
    const lead = screen.getByTestId("hero-lead");
    expect(lead.tagName).toBe("P");

    const fullText = lead.textContent ?? "";
    expect(fullText).toContain(
      "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
    );
    expect(fullText).toContain("react architecture, design systems, and applied AI.");

    const highlight = lead.querySelector("span.accent-highlight");
    expect(highlight).not.toBeNull();
    expect(highlight).toHaveTextContent("react architecture, design systems, and applied AI.");
  });

  it("renders the portrait image with correct src, alt, and aspect class", () => {
    const img = screen.getByTestId("hero-portrait");
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/rebuildmanufacturing/profile.png");
    expect(img).toHaveAttribute("alt", "Paul-Valentin Mini");
    const cls = img.getAttribute("class") ?? "";
    expect(cls).toContain("w-full");
    expect(cls).toContain("aspect-[3/4]");
    expect(cls).toContain("object-cover");
  });
});
