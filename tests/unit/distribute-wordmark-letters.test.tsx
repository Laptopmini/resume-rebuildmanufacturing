import { render, screen } from "@testing-library/react";
import Wordmark from "../../src/components/Wordmark";

describe("Wordmark", () => {
  beforeEach(() => {
    render(<Wordmark />);
  });

  describe("outer wrapper", () => {
    it("renders a wrapper div with data-testid wordmark", () => {
      const wrapper = screen.getByTestId("wordmark");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.tagName).toBe("DIV");
    });

    it("has the required bg-bgSunken overflow-hidden className", () => {
      const wrapper = screen.getByTestId("wordmark");
      expect(wrapper.className).toContain("bg-bgSunken");
      expect(wrapper.className).toContain("overflow-hidden");
    });

    it("has an inline animation style referencing wordmark-breathe", () => {
      const wrapper = screen.getByTestId("wordmark");
      expect(wrapper.style.animation).toContain("wordmark-breathe");
    });
  });

  describe("inner flex container", () => {
    it("uses a div (not a span) as the direct child of the wrapper", () => {
      const wrapper = screen.getByTestId("wordmark");
      const inner = wrapper.firstElementChild;
      expect(inner).not.toBeNull();
      expect(inner?.tagName).toBe("DIV");
    });

    it("has the required flex layout className", () => {
      const wrapper = screen.getByTestId("wordmark");
      const inner = wrapper.firstElementChild as HTMLElement;
      expect(inner.className).toContain("flex");
      expect(inner.className).toContain("justify-between");
      expect(inner.className).toContain("items-center");
      expect(inner.className).toContain("w-full");
      expect(inner.className).toContain("leading-[0.85]");
      expect(inner.className).toContain("select-none");
      expect(inner.className).toContain("px-0");
    });
  });

  describe("letter distribution via flex (no tracking)", () => {
    it("renders exactly 6 character spans, one per letter of PVMINI", () => {
      for (let i = 0; i < 6; i++) {
        const el = screen.getByTestId(`wordmark-char-${i}`);
        expect(el).toBeInTheDocument();
        expect(el.tagName).toBe("SPAN");
      }
      expect(screen.queryByTestId("wordmark-char-6")).toBeNull();
    });

    it("each character span contains the correct letter", () => {
      const letters = ["P", "V", "M", "I", "N", "I"];
      for (let i = 0; i < letters.length; i++) {
        expect(screen.getByTestId(`wordmark-char-${i}`).textContent).toBe(letters[i]);
      }
    });

    it("each character span has font-bold uppercase text-wordmark text-ink classes", () => {
      for (let i = 0; i < 6; i++) {
        const el = screen.getByTestId(`wordmark-char-${i}`);
        expect(el.className).toContain("font-bold");
        expect(el.className).toContain("uppercase");
        expect(el.className).toContain("text-wordmark");
        expect(el.className).toContain("text-ink");
      }
    });

    it("uses no tracking-* classes anywhere inside the wordmark", () => {
      const wrapper = screen.getByTestId("wordmark");
      wrapper.querySelectorAll("*").forEach((el) => {
        expect(el.className).not.toContain("tracking-");
      });
    });
  });
});
