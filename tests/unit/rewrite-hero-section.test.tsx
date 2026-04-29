import { render, screen } from "@testing-library/react";
import Hero from "../../src/components/Hero";

jest.mock("../../src/lib/content", () => ({
  HERO_HEADLINE: "ENGINEERING MODERN INTERFACES",
  HERO_LEAD_PREFIX:
    "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through",
  HERO_LEAD_HIGHLIGHT: "react architecture, design systems, and applied AI.",
  HERO_VIDEO_URL: "https://player.vimeo.com/video/123456789",
}));

describe("Hero", () => {
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(<Hero />);
    container = result.container;
  });

  describe("section container", () => {
    it("renders a hero section with the required attributes and the new className", () => {
      const section = screen.getByTestId("hero-section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute("id", "hero");
      expect(section).toHaveAttribute("data-in-view", "true");
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

    it("sets --entrance-duration and --entrance-easing from sectionEntrance", () => {
      const section = screen.getByTestId("hero-section");
      expect(section.style.getPropertyValue("--entrance-duration")).toBe("600ms");
      expect(section.style.getPropertyValue("--entrance-easing")).toBe(
        "cubic-bezier(0.22, 1, 0.36, 1)",
      );
    });
  });

  describe("background video", () => {
    it("renders the Vimeo iframe with the required attributes", () => {
      const iframe = screen.getByTestId("hero-video");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", "https://player.vimeo.com/video/123456789");
      expect(iframe).toHaveAttribute("title", "Background video");
      expect(iframe).toHaveAttribute("aria-hidden", "true");
      expect(iframe).toHaveAttribute("allow", "autoplay; fullscreen");
      expect(iframe).toHaveAttribute("frameborder", "0");
      expect(iframe).toHaveClass("hero-video-frame");
    });
  });

  describe("overlay", () => {
    it("renders the overlay div between the iframe and content", () => {
      const overlay = screen.getByTestId("hero-overlay");
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass("hero-overlay");
      expect(overlay).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("foreground content", () => {
    it("renders the headline as an h1 with the hero-headline testid", () => {
      const headline = screen.getByTestId("hero-headline");
      expect(headline).toBeInTheDocument();
      expect(headline.tagName).toBe("H1");
      expect(headline).toHaveTextContent("ENGINEERING MODERN INTERFACES");
    });

    it("renders the lead paragraph with the highlighted span", () => {
      const lead = screen.getByTestId("hero-lead");
      expect(lead).toBeInTheDocument();
      expect(lead).toHaveTextContent(
        "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through react architecture, design systems, and applied AI.",
      );

      const highlight = lead.querySelector(".accent-highlight");
      expect(highlight).toBeInTheDocument();
      expect(highlight).toHaveTextContent("react architecture, design systems, and applied AI.");
    });
  });

  describe("removals from previous layout", () => {
    it("does not render the profile portrait", () => {
      expect(screen.queryByTestId("hero-portrait")).not.toBeInTheDocument();
    });

    it("does not contain a 12-column grid layout anywhere in the rendered output", () => {
      const gridElement = container.querySelector(".md\\:grid-cols-12");
      expect(gridElement).not.toBeInTheDocument();
    });
  });
});
