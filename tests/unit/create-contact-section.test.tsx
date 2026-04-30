import { render, screen } from "@testing-library/react";
import Contact from "../../src/components/Contact";

describe("Contact component", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it("renders the contact section with correct attributes", () => {
    const section = screen.getByTestId("contact-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "contact");
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("renders the contact eyebrow with correct text", () => {
    const eyebrow = screen.getByTestId("contact-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent("CONTACT");
  });

  it("renders the portrait image through withBasePath", () => {
    const portrait = screen.getByTestId("contact-portrait");
    expect(portrait).toBeInTheDocument();
    expect(portrait).toHaveAttribute("src", "/resume-rebuildmanufacturing/profile.png");
    expect(portrait).toHaveAttribute("alt", "Paul-Valentin Mini");
  });

  it("renders contact details in the right column", () => {
    expect(screen.getByTestId("contact-name")).toHaveTextContent("Paul-Valentin Mini");
    expect(screen.getByTestId("contact-location")).toHaveTextContent("San Francisco, CA");
    expect(screen.getByTestId("contact-phone")).toHaveTextContent("(415) 694-3616");
  });

  it("renders contact links with correct hrefs and labels", () => {
    const emailLink = screen.getByTestId("contact-email");
    expect(emailLink).toHaveAttribute("href", "mailto:paul@emini.com");
    expect(emailLink).toHaveTextContent("paul@emini.com");

    const linkedinLink = screen.getByTestId("contact-linkedin");
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/pvmini");
    expect(linkedinLink).toHaveTextContent("LINKEDIN");

    const githubLink = screen.getByTestId("contact-github");
    expect(githubLink).toHaveAttribute("href", "https://github.com/Laptopmini");
    expect(githubLink).toHaveTextContent("GITHUB");
  });

  it("renders link styles with uppercase tracking and underline", () => {
    const emailLink = screen.getByTestId("contact-email");
    expect(emailLink).toHaveClass("text-xs", "uppercase", "underline");
  });

  it("does not render ai-disclosure testids inside the contact section", () => {
    expect(screen.queryByTestId("ai-eyebrow")).not.toBeInTheDocument();
    expect(screen.queryByTestId("ai-headline")).not.toBeInTheDocument();
  });
});
