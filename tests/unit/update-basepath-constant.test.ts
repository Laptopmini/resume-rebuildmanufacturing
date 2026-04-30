import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("BASE_PATH", () => {
  it("exports the correct base path for the resume-rebuildmanufacturing repo", () => {
    expect(BASE_PATH).toBe("/resume-rebuildmanufacturing");
  });
});

describe("withBasePath", () => {
  it("prepends BASE_PATH to a path that starts with /", () => {
    expect(withBasePath("/foo")).toBe("/resume-rebuildmanufacturing/foo");
  });

  it("prepends BASE_PATH and inserts a leading / for paths without one", () => {
    expect(withBasePath("foo")).toBe("/resume-rebuildmanufacturing/foo");
  });

  it("returns BASE_PATH alone when given empty string", () => {
    expect(withBasePath("")).toBe("/resume-rebuildmanufacturing/");
  });
});
