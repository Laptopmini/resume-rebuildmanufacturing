import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("basePath", () => {
  describe("BASE_PATH", () => {
    it("is /rebuildmanufacturing", () => {
      expect(BASE_PATH).toBe("/rebuildmanufacturing");
    });
  });

  describe("withBasePath", () => {
    it("prepends base path to absolute-style paths", () => {
      expect(withBasePath("/profile.png")).toBe("/rebuildmanufacturing/profile.png");
    });

    it("prepends base path and adds leading slash for paths without one", () => {
      expect(withBasePath("foo.png")).toBe("/rebuildmanufacturing/foo.png");
    });

    it("handles root path", () => {
      expect(withBasePath("/")).toBe("/rebuildmanufacturing/");
    });
  });
});
