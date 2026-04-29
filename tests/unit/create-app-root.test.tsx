import { render, screen } from "@testing-library/react";
import App from "../../src/App";

jest.mock("../../src/components/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Header</div>,
}));

jest.mock("../../src/components/Hero", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-hero">Hero</div>,
}));

jest.mock("../../src/components/About", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-about">About</div>,
}));

jest.mock("../../src/components/Stats", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-stats">Stats</div>,
}));

jest.mock("../../src/components/Experience", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-experience">Experience</div>,
}));

jest.mock("../../src/components/Skills", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-skills">Skills</div>,
}));

jest.mock("../../src/components/Education", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-education">Education</div>,
}));

jest.mock("../../src/components/AIDisclosure", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-aidisclosure">AIDisclosure</div>,
}));

jest.mock("../../src/components/Wordmark", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-wordmark">Wordmark</div>,
}));

jest.mock("../../src/components/Hairline", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-hairline">Hairline</div>,
}));

describe("App", () => {
  it("renders the app root with the correct className", () => {
    render(<App />);
    const root = screen.getByTestId("app-root");
    expect(root).toBeInTheDocument();
    expect(root.className).toBe("bg-bg text-ink min-h-screen");
  });

  it("renders Header as the first child of app-root", () => {
    render(<App />);
    const root = screen.getByTestId("app-root");
    expect(root.firstElementChild).toHaveAttribute("data-testid", "mock-header");
  });

  it("renders Wordmark as the last child of app-root", () => {
    render(<App />);
    const root = screen.getByTestId("app-root");
    expect(root.lastElementChild).toHaveAttribute("data-testid", "mock-wordmark");
  });

  it("renders a main element between Header and Wordmark", () => {
    render(<App />);
    const root = screen.getByTestId("app-root");
    const children = Array.from(root.children);
    const mainIndex = children.findIndex((child) => child.tagName === "MAIN");
    expect(mainIndex).toBe(1);
  });

  it("renders sections in main separated by Hairline components in the correct order", () => {
    render(<App />);
    const main = screen.getByRole("main");
    const children = Array.from(main.children);
    const dataTestIds = children.map((child) => child.getAttribute("data-testid"));

    expect(dataTestIds).toEqual([
      "mock-hero",
      "mock-hairline",
      "mock-about",
      "mock-hairline",
      "mock-stats",
      "mock-hairline",
      "mock-experience",
      "mock-hairline",
      "mock-skills",
      "mock-hairline",
      "mock-education",
      "mock-hairline",
      "mock-aidisclosure",
      "mock-hairline",
    ]);
  });

  it("has exactly eight Hairline separators in main", () => {
    render(<App />);
    const main = screen.getByRole("main");
    const hairlines = main.querySelectorAll('[data-testid="mock-hairline"]');
    expect(hairlines).toHaveLength(8);
  });
});
