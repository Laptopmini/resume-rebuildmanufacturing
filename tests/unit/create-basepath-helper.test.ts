import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("basePath helper", () => {
  test("BASE_PATH equals /rebuildmanufacturing", () => {
    expect(BASE_PATH).toBe("/rebuildmanufacturing");
  });

  test("withBasePath prepends base to absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/rebuildmanufacturing/profile.png");
  });

  test("withBasePath prepends base to relative path (no leading slash)", () => {
    expect(withBasePath("foo.png")).toBe("/rebuildmanufacturing/foo.png");
  });

  test("withBasePath handles nested paths", () => {
    expect(withBasePath("/assets/image.jpg")).toBe("/rebuildmanufacturing/assets/image.jpg");
  });
});
