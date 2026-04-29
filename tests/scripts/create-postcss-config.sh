#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./postcss.config.cjs"

assert "postcss.config.cjs exists" test -f "$CFG"
assert_grep "tailwindcss plugin" "tailwindcss" "$CFG"
assert_grep "autoprefixer plugin" "autoprefixer" "$CFG"

report_results
