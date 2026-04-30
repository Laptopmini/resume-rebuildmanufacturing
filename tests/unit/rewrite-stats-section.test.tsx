import { render, screen } from "@testing-library/react";

import Stats from "../../src/components/Stats";

jest.mock("../../src/lib/content", () => ({
  STATS: [
    { label: "Years Experience", value: 10, suffix: "+", format: "comma" as const },
    { label: "Production Apps", value: 8, suffix: "+" },
    { label: "NPM Releases", value: 50000, suffix: "+", format: "comma" as const },
    { label: "Global Teams", value: 4, suffix: "" },
  ],
}));

describe("rewrite Stats section", () => {
  beforeEach(() => {
    render(<Stats />);
  });

  it("renders the stats section wrapper", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
  });

  it("renders exactly four stat items with sequential data-testid attributes", () => {
    for (const i of [0, 1, 2, 3]) {
      expect(screen.getByTestId(`stat-${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("stat-4")).not.toBeInTheDocument();
  });

  it("renders stat labels from the imported STATS constant", () => {
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("Production Apps")).toBeInTheDocument();
    expect(screen.getByText("NPM Releases")).toBeInTheDocument();
    expect(screen.getByText("Global Teams")).toBeInTheDocument();
  });

  it("renders comma-formatted values via Intl.NumberFormat", () => {
    const stat0 = screen.getByTestId("stat-0");
    expect(stat0).toHaveTextContent("10+");

    const stat2 = screen.getByTestId("stat-2");
    expect(stat2).toHaveTextContent("50,000+");
  });

  it("renders non-comma values as plain strings", () => {
    const stat1 = screen.getByTestId("stat-1");
    expect(stat1).toHaveTextContent("8+");

    const stat3 = screen.getByTestId("stat-3");
    expect(stat3).toHaveTextContent("4");
  });

  it("renders value and suffix together in the accent span", () => {
    const stat2 = screen.getByTestId("stat-2");
    const accentSpan = stat2.querySelector(".text-accent");
    expect(accentSpan).toBeInTheDocument();
    expect(accentSpan).toHaveTextContent("50,000+");
  });

  it("renders labels in muted uppercase spans", () => {
    const stat0 = screen.getByTestId("stat-0");
    const labelSpan = stat0.querySelector(".text-inkMuted");
    expect(labelSpan).toBeInTheDocument();
    expect(labelSpan).toHaveTextContent("Years Experience");
  });
});
