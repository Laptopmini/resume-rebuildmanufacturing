/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Hairline from "../../src/components/Hairline";

describe("Hairline component", () => {
  test("renders a separator with correct data-testid", () => {
    render(<Hairline />);
    const el = screen.getByTestId("hairline");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("role", "separator");
  });

  test("has no required props", () => {
    expect(() => render(<Hairline />)).not.toThrow();
  });
});
