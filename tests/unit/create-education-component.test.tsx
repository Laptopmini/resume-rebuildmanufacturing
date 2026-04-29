import { render, screen } from "@testing-library/react";
import Education from "../../src/components/Education";
import { EDUCATION, EYEBROW_EDU } from "../../src/lib/content";

describe("Education component", () => {
  it("renders the education section with correct data-testid and in-view attributes", () => {
    render(<Education />);
    const section = screen.getByTestId("education-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-in-view", "true");
    expect(section.tagName).toBe("SECTION");
  });

  it("renders the eyebrow with education text and testId", () => {
    render(<Education />);
    const eyebrow = screen.getByTestId("education-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(EYEBROW_EDU);
  });

  it("renders all education entries with title and detail", () => {
    render(<Education />);
    EDUCATION.forEach((edu, index) => {
      const li = screen.getByTestId(`edu-${index}`);
      expect(li).toBeInTheDocument();
      expect(li.querySelector("span:first-child")).toHaveTextContent(edu.title);
      expect(li.querySelector("span:last-child")).toHaveTextContent(edu.detail);
    });
  });

  it("renders exactly the number of education entries from EDUCATION", () => {
    render(<Education />);
    EDUCATION.forEach((_, index) => {
      expect(screen.getByTestId(`edu-${index}`)).toBeInTheDocument();
    });
    expect(screen.queryByTestId(`edu-${EDUCATION.length}`)).not.toBeInTheDocument();
  });
});
