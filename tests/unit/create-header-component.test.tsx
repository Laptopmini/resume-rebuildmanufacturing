import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders the site header with the required data-testid", () => {
    const header = screen.getByTestId("site-header");
    expect(header.tagName).toBe("HEADER");
  });

  it("applies the fixed-position layout and theme classes to the header", () => {
    const header = screen.getByTestId("site-header");
    const cls = header.getAttribute("class") ?? "";
    expect(cls).toContain("fixed top-0 inset-x-0 z-50");
    expect(cls).toContain("bg-bg/90");
    expect(cls).toContain("backdrop-blur");
    expect(cls).toContain("border-b border-rule");
  });

  it("renders the brand mark span with correct text", () => {
    const mark = screen.getByTestId("header-mark");
    expect(mark.tagName).toBe("SPAN");
    expect(mark).toHaveTextContent("PV·MINI");
  });

  it("renders a nav element containing three anchor links", () => {
    const nav = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(nav.contains(link)).toBe(true);
    });
  });

  it("the Experience link has correct href, text, and data-testid", () => {
    const link = screen.getByTestId("nav-experience");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#experience");
    expect(link).toHaveTextContent("Experience");
  });

  it("the Skills link has correct href, text, and data-testid", () => {
    const link = screen.getByTestId("nav-skills");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#skills");
    expect(link).toHaveTextContent("Skills");
  });

  it("the Contact link has correct href, text, and data-testid", () => {
    const link = screen.getByTestId("nav-contact");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#contact");
    expect(link).toHaveTextContent("Contact");
  });

  it("all nav links share the utility and accent-bright hover class", () => {
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      const cls = link.getAttribute("class") ?? "";
      expect(cls).toContain("text-inkMuted");
      expect(cls).toContain("hover:text-accentBright");
      expect(cls).toContain("text-xs");
      expect(cls).toContain("uppercase");
      expect(cls).toContain("tracking-[0.2em]");
      expect(cls).toContain("transition-colors");
    });
  });
});
