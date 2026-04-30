import { render, screen } from "@testing-library/react";
import AIDisclosure from "../../src/components/AIDisclosure";

describe("Slim AI Disclosure", () => {
  beforeEach(() => {
    render(<AIDisclosure />);
  });

  it("uses id ai-disclosure instead of contact", () => {
    const section = screen.getByTestId("ai-disclosure-section");
    expect(section).toHaveAttribute("id", "ai-disclosure");
  });

  it("does not render contact links", () => {
    expect(screen.queryByTestId("contact-email")).not.toBeInTheDocument();
    expect(screen.queryByTestId("contact-linkedin")).not.toBeInTheDocument();
    expect(screen.queryByTestId("contact-github")).not.toBeInTheDocument();
  });

  it("does not render the workflow paragraph", () => {
    expect(screen.queryByTestId("ai-workflow")).not.toBeInTheDocument();
  });

  it("renders the AI disclosure eyebrow and headline", () => {
    expect(screen.getByTestId("ai-eyebrow")).toBeInTheDocument();
    expect(screen.getByTestId("ai-eyebrow")).toHaveTextContent("BUILT BY RALPH-NODE");
    expect(screen.getByTestId("ai-headline")).toHaveTextContent("AN ORCHESTRATED AI PIPELINE");
  });

  it("renders the AI disclosure body text", () => {
    expect(screen.getByTestId("ai-body")).toHaveTextContent(/Ralph-node is an orchestrated/);
  });

  it("renders the CTA link with correct label and href", () => {
    const ctaLink = screen.getByTestId("ai-ralph-link");
    expect(ctaLink).toHaveAttribute("href", "https://github.com/Laptopmini/ralph-node");
    expect(ctaLink).toHaveTextContent("EXPLORE THE PIPELINE");
  });

  it("renders the repo link with correct label and href", () => {
    const repoLink = screen.getByTestId("ai-repo-link");
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/Laptopmini/resume-rebuildmanufacturing",
    );
    expect(repoLink).toHaveTextContent("VIEW THIS REPO");
  });

  it("renders the ai-ralph-link before the ai-repo-link", () => {
    const ralphLink = screen.getByTestId("ai-ralph-link");
    const repoLink = screen.getByTestId("ai-repo-link");
    expect(
      ralphLink.compareDocumentPosition(repoLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
