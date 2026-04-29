#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "postcss.config.cjs exists" test -f "./postcss.config.cjs"
assert_json "has tailwindcss plugin" "_.plugins.tailwindcss !== undefined" "./postcss.config.cjs"
assert_json "has autoprefixer plugin" "_.plugins.autoprefixer !== undefined" "./postcss.config.cjs"

report_results
