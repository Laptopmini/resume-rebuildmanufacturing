import { render, screen } from "@testing-library/react";
import Hero from "../../src/components/Hero";

describe("Hero section rewrite", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  describe("section container", () => {
    it("renders with correct id and data attributes", () => {
      const section = screen.getByTestId("hero-section");
      expect(section.tagName).toBe("SECTION");
      expect(section).toHaveAttribute("id", "hero");
      expect(section).toHaveAttribute("data-in-view", "true");
    });

    it("has the required className", () => {
      const section = screen.getByTestId("hero-section");
      expect(section).toHaveClass(
        "relative",
        "min-h-screen",
        "overflow-hidden",
        "bg-bg",
        "flex",
        "items-end",
        "pt-32",
        "pb-24",
        "px-6",
        "md:px-10",
      );
    });

    it("sets CSS custom properties from sectionEntrance", () => {
      const section = screen.getByTestId("hero-section");
      expect(section.style.getPropertyValue("--entrance-duration")).toBe("600ms");
      expect(section.style.getPropertyValue("--entrance-easing")).toBe(
        "cubic-bezier(0.22, 1, 0.36, 1)",
      );
    });
  });

  describe("child element ordering", () => {
    it("renders children in the correct order: iframe, overlay, content wrapper", () => {
      const section = screen.getByTestId("hero-section");
      const children = Array.from(section.children);
      expect(children[0]).toHaveAttribute("data-testid", "hero-video");
      expect(children[1]).toHaveAttribute("data-testid", "hero-overlay");
      expect(children[2]).toHaveClass("relative", "z-10");
    });
  });

  describe("Vimeo background video", () => {
    it("renders the iframe with correct attributes", () => {
      const iframe = screen.getByTestId("hero-video");
      expect(iframe.tagName).toBe("IFRAME");
      expect(iframe).toHaveAttribute(
        "src",
        "https://player.vimeo.com/video/1168134399?muted=1&autoplay=1&loop=1&background=1&app_id=122963",
      );
      expect(iframe).toHaveAttribute("title", "Background video");
      expect(iframe).toHaveAttribute("aria-hidden", "true");
      expect(iframe).toHaveAttribute("allow", "autoplay; fullscreen");
      expect(iframe).toHaveAttribute("frameborder", "0");
      expect(iframe).toHaveClass("hero-video-frame");
    });
  });

  describe("overlay", () => {
    it("renders the overlay div with correct attributes", () => {
      const overlay = screen.getByTestId("hero-overlay");
      expect(overlay.tagName).toBe("DIV");
      expect(overlay).toHaveAttribute("aria-hidden", "true");
      expect(overlay).toHaveClass("hero-overlay");
    });
  });

  describe("foreground content wrapper", () => {
    it("renders with the correct className", () => {
      const wrapper = screen.getByTestId("hero-section").querySelector(".relative.z-10");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("mx-auto", "max-w-wide", "w-full");
    });

    it("renders the headline with correct text and styling", () => {
      const headline = screen.getByTestId("hero-headline");
      expect(headline.tagName).toBe("H1");
      expect(headline).toHaveTextContent("ENGINEERING MODERN INTERFACES");
      expect(headline).toHaveClass(
        "font-sans",
        "font-bold",
        "uppercase",
        "text-display",
        "text-ink",
      );
    });

    it("renders the lead paragraph with prefix text and highlighted span", () => {
      const lead = screen.getByTestId("hero-lead");
      expect(lead.tagName).toBe("P");
      expect(lead).toHaveTextContent(
        "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
      );
      expect(lead).toHaveClass("mt-12", "text-md", "text-ink", "max-w-content");

      const highlight = lead.querySelector(".accent-highlight");
      expect(highlight).toBeInTheDocument();
      expect(highlight).toHaveTextContent("react architecture, design systems, and applied AI.");
    });
  });

  describe("removed elements", () => {
    it("does not render the profile portrait", () => {
      expect(screen.queryByTestId("hero-portrait")).not.toBeInTheDocument();
    });
  });
});
