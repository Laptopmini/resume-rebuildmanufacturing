import { render, screen } from "@testing-library/react";
import Hairline from "../../src/components/Hairline";

describe("Hairline", () => {
  it("renders with role separator", () => {
    render(<Hairline />);
    const element = screen.getByRole("separator");
    expect(element).toBeInTheDocument();
  });

  it("renders with data-testid hairline", () => {
    render(<Hairline />);
    const element = screen.getByTestId("hairline");
    expect(element).toBeInTheDocument();
  });

  it("the role and testid point to the same element", () => {
    render(<Hairline />);
    const byRole = screen.getByRole("separator");
    const byTestId = screen.getByTestId("hairline");
    expect(byRole).toBe(byTestId);
  });
});
