#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

FILE="vite.config.ts"

assert "vite config exists" test -f "$FILE"

assert_grep_regex "base path is /resume-rebuildmanufacturing/" 'base:.*"/resume-rebuildmanufacturing/"' "$FILE"

# The old base path must not be present on the base line
if grep -qF 'base: "/rebuildmanufacturing/"' "$FILE" 2>/dev/null; then
  _fail "old base path removed from base option"
else
  _pass "old base path removed from base option"
fi

report_results
