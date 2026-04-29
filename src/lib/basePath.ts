export const BASE_PATH = "/rebuildmanufacturing";

export function withBasePath(path: string): string {
  return BASE_PATH + (path.startsWith("/") ? path : "/" + path);
}
