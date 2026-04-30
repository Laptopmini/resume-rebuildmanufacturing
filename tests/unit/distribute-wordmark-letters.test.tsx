import { render, screen } from "@testing-library/react";
import Wordmark from "../../src/components/Wordmark";

describe("Wordmark", () => {
  beforeEach(() => {
    render(<Wordmark />);
  });

  describe("outer container", () => {
    it("renders with data-testid wordmark and preserved className", () => {
      const wordmark = screen.getByTestId("wordmark");
      expect(wordmark).toBeInTheDocument();
      expect(wordmark.className).toContain("bg-bgSunken");
      expect(wordmark.className).toContain("overflow-hidden");
    });

    it("preserves the wordmark-breathe animation style", () => {
      const wordmark = screen.getByTestId("wordmark");
      expect(wordmark.style.animation).toContain("wordmark-breathe");
      expect(wordmark.style.animation).toContain("infinite");
    });
  });

  describe("flex container", () => {
    it("uses a flex div with justify-between for edge-to-edge letter distribution", () => {
      const wordmark = screen.getByTestId("wordmark");
      const flexContainer = wordmark.querySelector("div");
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer?.tagName).toBe("DIV");
      expect(flexContainer?.className).toContain("flex");
      expect(flexContainer?.className).toContain("justify-between");
      expect(flexContainer?.className).toContain("items-center");
      expect(flexContainer?.className).toContain("w-full");
      expect(flexContainer?.className).toContain("leading-[0.85]");
      expect(flexContainer?.className).toContain("select-none");
      expect(flexContainer?.className).toContain("px-0");
    });

    it("does not use tracking classes — letter spacing is handled by flex", () => {
      const wordmark = screen.getByTestId("wordmark");
      const flexContainer = wordmark.querySelector("div");
      expect(flexContainer?.className).not.toMatch(/tracking-/);
    });

    it("drops old layout classes from the previous single-span implementation", () => {
      const wordmark = screen.getByTestId("wordmark");
      const flexContainer = wordmark.querySelector("div");
      expect(flexContainer?.className).not.toContain("text-center");
      expect(flexContainer?.className).not.toContain("whitespace-nowrap");
      expect(flexContainer?.className).not.toContain("block");
    });
  });

  describe("character spans", () => {
    it("renders one span per character of WORDMARK_TEXT with correct testids", () => {
      const chars = "PVMINI";
      chars.split("").forEach((char, i) => {
        const charSpan = screen.getByTestId(`wordmark-char-${i}`);
        expect(charSpan).toBeInTheDocument();
        expect(charSpan.tagName).toBe("SPAN");
        expect(charSpan.textContent).toBe(char);
        expect(charSpan.className).toContain("font-bold");
        expect(charSpan.className).toContain("uppercase");
        expect(charSpan.className).toContain("text-wordmark");
        expect(charSpan.className).toContain("text-ink");
      });
    });

    it("renders exactly 6 character spans for PVMINI and no extras", () => {
      expect(screen.getByTestId("wordmark-char-0")).toBeInTheDocument();
      expect(screen.getByTestId("wordmark-char-5")).toBeInTheDocument();
      expect(screen.queryByTestId("wordmark-char-6")).not.toBeInTheDocument();
    });
  });

  describe("edge-to-edge layout", () => {
    it("guarantees the first character at left edge and last at right edge via justify-between", () => {
      const wordmark = screen.getByTestId("wordmark");
      const flexContainer = wordmark.querySelector("div");

      // justify-between spreads items to edges with no gaps at the ends
      expect(flexContainer?.className).toContain("justify-between");

      // px-0 removes horizontal padding so children touch the container edges
      expect(flexContainer?.className).toContain("px-0");

      // w-full ensures the flex container fills the viewport width
      expect(flexContainer?.className).toContain("w-full");
    });
  });
});
