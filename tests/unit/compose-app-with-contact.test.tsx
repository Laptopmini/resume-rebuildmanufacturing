import { render, screen } from "@testing-library/react";
import App from "../../src/App";

describe("App composition with Contact", () => {
  it("renders the Contact section between Education and AIDisclosure", () => {
    render(<App />);
    expect(screen.getByTestId("contact-section")).toBeInTheDocument();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
    expect(screen.getByTestId("ai-disclosure-section")).toBeInTheDocument();
  });

  it("renders all main sections in the correct order", () => {
    render(<App />);
    const main = document.querySelector("main");
    expect(main).not.toBeNull();

    const children = Array.from(main?.children ?? []).filter(
      (child) => child instanceof HTMLElement,
    );
    const testids = children.map((child) => child.getAttribute("data-testid"));

    expect(testids).toEqual([
      "hero-section",
      "hairline",
      "about-section",
      "hairline",
      "stats-section",
      "hairline",
      "experience-section",
      "hairline",
      "skills-section",
      "hairline",
      "education-section",
      "hairline",
      "contact-section",
      "hairline",
      "ai-disclosure-section",
      "hairline",
    ]);
  });

  it("does not remove existing sections from main", () => {
    render(<App />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-section")).toBeInTheDocument();
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
    expect(screen.getByTestId("skills-section")).toBeInTheDocument();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
    expect(screen.getByTestId("ai-disclosure-section")).toBeInTheDocument();
  });

  it("preserves the app root, Header, and Wordmark structure", () => {
    render(<App />);
    expect(screen.getByTestId("app-root")).toBeInTheDocument();
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("wordmark")).toBeInTheDocument();
  });
});
