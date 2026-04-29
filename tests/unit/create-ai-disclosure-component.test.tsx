import { render, screen } from "@testing-library/react";
import AIDisclosure from "../../src/components/AIDisclosure";
import {
  AI_FOOTER_BODY,
  AI_FOOTER_EYEBROW,
  AI_FOOTER_HEADLINE,
  AI_FOOTER_RALPH_URL,
  AI_FOOTER_REPO_LABEL,
  AI_FOOTER_REPO_URL,
  AI_FOOTER_WORKFLOW,
  CONTACT,
} from "../../src/lib/content";

describe("AIDisclosure component", () => {
  it("renders the ai disclosure section with correct data-testid and in-view attributes", () => {
    render(<AIDisclosure />);
    const section = screen.getByTestId("ai-disclosure-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
    expect(section.tagName).toBe("SECTION");
  });

  it("renders the eyebrow with AI disclosure text and testId", () => {
    render(<AIDisclosure />);
    const eyebrow = screen.getByTestId("ai-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(AI_FOOTER_EYEBROW);
  });

  it("renders the headline using the imported AI_FOOTER_HEADLINE constant", () => {
    render(<AIDisclosure />);
    const headline = screen.getByTestId("ai-headline");
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(AI_FOOTER_HEADLINE);
  });

  it("renders the body paragraph with AI_FOOTER_BODY text", () => {
    render(<AIDisclosure />);
    const body = screen.getByTestId("ai-body");
    expect(body).toBeInTheDocument();
    expect(body).toHaveTextContent(AI_FOOTER_BODY);
  });

  it("renders the workflow paragraph with AI_FOOTER_WORKFLOW text", () => {
    render(<AIDisclosure />);
    const workflow = screen.getByTestId("ai-workflow");
    expect(workflow).toBeInTheDocument();
    expect(workflow).toHaveTextContent(AI_FOOTER_WORKFLOW);
  });

  it("renders the repo link with correct label and href", () => {
    render(<AIDisclosure />);
    const repoLink = screen.getByTestId("ai-repo-link");
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveTextContent(AI_FOOTER_REPO_LABEL);
    expect(repoLink).toHaveAttribute("href", AI_FOOTER_REPO_URL);
  });

  it("renders the ralph link with correct label and href", () => {
    render(<AIDisclosure />);
    const ralphLink = screen.getByTestId("ai-ralph-link");
    expect(ralphLink).toBeInTheDocument();
    expect(ralphLink).toHaveTextContent("RALPH-NODE");
    expect(ralphLink).toHaveAttribute("href", AI_FOOTER_RALPH_URL);
  });

  it("renders the contact email link with correct mailto href", () => {
    render(<AIDisclosure />);
    const emailLink = screen.getByTestId("contact-email");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveTextContent(CONTACT.email);
    expect(emailLink).toHaveAttribute("href", `mailto:${CONTACT.email}`);
  });

  it("renders the contact linkedin link", () => {
    render(<AIDisclosure />);
    const linkedinLink = screen.getByTestId("contact-linkedin");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveTextContent("LINKEDIN");
    expect(linkedinLink).toHaveAttribute("href", CONTACT.linkedin);
  });

  it("renders the contact github link", () => {
    render(<AIDisclosure />);
    const githubLink = screen.getByTestId("contact-github");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveTextContent("GITHUB");
    expect(githubLink).toHaveAttribute("href", CONTACT.github);
  });
});
