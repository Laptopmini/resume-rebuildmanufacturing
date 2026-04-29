import { render, screen } from "@testing-library/react";
import Wordmark from "../../src/components/Wordmark";
import { WORDMARK_TEXT } from "../../src/lib/content";
import { wordmarkBreathe } from "../../src/lib/motion";

describe("Wordmark component", () => {
  it("renders the wordmark container with correct data-testid", () => {
    render(<Wordmark />);
    const container = screen.getByTestId("wordmark");
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe("DIV");
  });

  it("renders the wordmark text span with WORDMARK_TEXT", () => {
    render(<Wordmark />);
    const span = screen.getByTestId("wordmark").querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent(WORDMARK_TEXT);
  });

  it("applies the wordmark-breathe animation style with duration and easing from motion preset", () => {
    render(<Wordmark />);
    const container = screen.getByTestId("wordmark");
    const style = container.getAttribute("style") || "";
    expect(style).toContain("wordmark-breathe");
    expect(style).toContain(String(wordmarkBreathe.duration));
    expect(style).toContain(wordmarkBreathe.easing);
  });

  it("does not contain hardcoded magic numbers for animation values", () => {
    render(<Wordmark />);
    const container = screen.getByTestId("wordmark");
    const style = container.getAttribute("style") || "";
    // The duration and easing must come from the wordmarkBreathe preset — verify the exact values
    expect(style).toContain(`${wordmarkBreathe.duration}ms`);
    expect(style).toContain(wordmarkBreathe.easing);
  });
});
