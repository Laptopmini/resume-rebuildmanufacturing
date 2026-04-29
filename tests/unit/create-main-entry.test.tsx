import React from "react";

const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({ render: mockRender }));

jest.mock("react-dom/client", () => ({
  __esModule: true,
  default: {
    createRoot: mockCreateRoot,
  },
}));

jest.mock("../../src/App", () => ({
  __esModule: true,
  default: () => null,
}));

describe("main entry", () => {
  it("creates root from #root div and renders App in StrictMode", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import("../../src/main");

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledTimes(1);

    const element = mockRender.mock.calls[0][0];
    expect(element.type).toBe(React.StrictMode);
    expect(element.props.children).toBeDefined();
    expect(typeof element.props.children.type).toBe("function");
  });
});
