#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "vite.config.ts exists" test -f "./vite.config.ts"
assert_grep "imports defineConfig" "defineConfig" "./vite.config.ts"
assert_grep "imports react from vite plugin" "@vitejs/plugin-react" "./vite.config.ts"
assert_grep "has react plugin" "react()" "./vite.config.ts"
assert_grep "base is rebuildmanufacturing" "/rebuildmanufacturing/" "./vite.config.ts"
assert_grep "outDir is dist" 'outDir: "dist"' "./vite.config.ts"

report_results
