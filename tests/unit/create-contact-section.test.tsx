import { render, screen } from "@testing-library/react";
import Contact from "../../src/components/Contact";

describe("Contact", () => {
  it("renders the contact section with correct id and testid", () => {
    render(<Contact />);
    const section = screen.getByTestId("contact-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "contact");
    expect(section).toHaveAttribute("data-in-view", "true");
  });

  it("renders the entrance-style block with sectionEntrance values", () => {
    render(<Contact />);
    const section = screen.getByTestId("contact-section");
    expect(section).toHaveStyle({
      "--entrance-duration": "600ms",
      "--entrance-easing": "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  });

  it("renders eyebrow with EYEBROW_CONTACT text via Eyebrow component", () => {
    render(<Contact />);
    const eyebrow = screen.getByTestId("contact-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow.textContent).toBeTruthy();
  });

  it("renders the portrait image with basePath and correct alt text", () => {
    render(<Contact />);
    const img = screen.getByTestId("contact-portrait");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/resume-rebuildmanufacturing/profile.png");
    expect(img).toHaveAttribute("alt", "Paul-Valentin Mini");
  });

  it("renders contact name, location, and phone from CONTACT", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-name")).toHaveTextContent("Paul-Valentin Mini");
    expect(screen.getByTestId("contact-location")).toHaveTextContent("San Francisco, CA");
    expect(screen.getByTestId("contact-phone")).toHaveTextContent("(415) 694-3616");
  });

  it("renders contact email link with mailto href", () => {
    render(<Contact />);
    const email = screen.getByTestId("contact-email");
    expect(email).toHaveAttribute("href", "mailto:paul@emini.com");
    expect(email).toHaveTextContent("paul@emini.com");
  });

  it("renders LinkedIn link with correct href and label", () => {
    render(<Contact />);
    const linkedin = screen.getByTestId("contact-linkedin");
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/pvmini");
    expect(linkedin).toHaveTextContent("LINKEDIN");
  });

  it("renders GitHub link with correct href and label", () => {
    render(<Contact />);
    const github = screen.getByTestId("contact-github");
    expect(github).toHaveAttribute("href", "https://github.com/Laptopmini");
    expect(github).toHaveTextContent("GITHUB");
  });
});
