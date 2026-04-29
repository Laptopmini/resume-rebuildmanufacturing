import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("BASE_PATH constant", () => {
  it("equals /resume-rebuildmanufacturing (no trailing slash)", () => {
    expect(BASE_PATH).toBe("/resume-rebuildmanufacturing");
  });

  it("does NOT equal the old value /rebuildmanufacturing", () => {
    expect(BASE_PATH).not.toBe("/rebuildmanufacturing");
  });
});

describe("withBasePath", () => {
  it("prepends BASE_PATH to a path starting with /", () => {
    expect(withBasePath("/foo")).toBe("/resume-rebuildmanufacturing/foo");
  });

  it("prepends BASE_PATH with / separator when path lacks leading /", () => {
    expect(withBasePath("foo")).toBe("/resume-rebuildmanufacturing/foo");
  });

  it("returns just BASE_PATH when given empty string", () => {
    expect(withBasePath("")).toBe("/resume-rebuildmanufacturing/");
  });

  it("returns BASE_PATH + / when given / only", () => {
    expect(withBasePath("/")).toBe("/resume-rebuildmanufacturing/");
  });
});
