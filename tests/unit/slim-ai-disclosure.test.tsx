import { render, screen } from "@testing-library/react";
import AIDisclosure from "../../src/components/AIDisclosure";

describe("AIDisclosure (slim)", () => {
  it("renders the section with id ai-disclosure instead of contact", () => {
    render(<AIDisclosure />);
    const section = screen.getByTestId("ai-disclosure-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "ai-disclosure");
    expect(section).not.toHaveAttribute("id", "contact");
  });

  it("renders the eyebrow with AI_FOOTER_EYEBROW text", () => {
    render(<AIDisclosure />);
    const eyebrow = screen.getByTestId("ai-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent("AI-DEVELOPED RESUME");
  });

  it("renders the headline and body content", () => {
    render(<AIDisclosure />);
    expect(screen.getByTestId("ai-headline")).toHaveTextContent("Built with AI");
    expect(screen.getByTestId("ai-body")).toHaveTextContent(
      "This resume was built with AI-assisted development using a deterministic bash loop (The Ralph Loop).",
    );
  });

  it("renders the CTA ralph link with correct href", () => {
    render(<AIDisclosure />);
    const ralphLink = screen.getByTestId("ai-ralph-link");
    expect(ralphLink).toBeInTheDocument();
    expect(ralphLink).toHaveAttribute("href", "https://github.com/Laptopmini/ralph-node");
    expect(ralphLink.textContent).toBeTruthy();
  });

  it("renders the repo link with correct href and label", () => {
    render(<AIDisclosure />);
    const repoLink = screen.getByTestId("ai-repo-link");
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/Laptopmini/resume-rebuildmanufacturing",
    );
    expect(repoLink).toHaveTextContent("RESUME REPO");
  });

  it("does not render the ai-workflow paragraph", () => {
    render(<AIDisclosure />);
    expect(screen.queryByTestId("ai-workflow")).not.toBeInTheDocument();
  });

  it("does not render contact links that now live in Contact.tsx", () => {
    render(<AIDisclosure />);
    expect(screen.queryByTestId("contact-email")).not.toBeInTheDocument();
    expect(screen.queryByTestId("contact-linkedin")).not.toBeInTheDocument();
    expect(screen.queryByTestId("contact-github")).not.toBeInTheDocument();
  });
});
