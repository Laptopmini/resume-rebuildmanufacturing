import { render, screen } from "@testing-library/react";
import App from "../../src/App";

describe("App composition with Contact", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the Contact section between Education and AIDisclosure", () => {
    const contactSection = screen.getByTestId("contact-section");
    const aiSection = screen.getByTestId("ai-disclosure-section");

    expect(contactSection).toBeInTheDocument();
    expect(aiSection).toBeInTheDocument();

    // Contact must appear before AIDisclosure in the DOM
    expect(
      contactSection.compareDocumentPosition(aiSection) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders Contact inside the main element", () => {
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId("contact-section"));
  });
});
