#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./vite.config.ts"

assert "vite.config.ts exists" test -f "$CFG"
assert_grep "imports defineConfig" "defineConfig" "$CFG"
assert_grep "imports react plugin" "@vitejs/plugin-react" "$CFG"
assert_grep "uses react plugin" "react()" "$CFG"
assert_grep "base path set" "/rebuildmanufacturing/" "$CFG"
assert_grep "outDir is dist" "dist" "$CFG"

report_results
