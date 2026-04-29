#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

VITE_CONFIG="./vite.config.ts"

assert_grep "vite.config.ts sets base to /resume-rebuildmanufacturing/ (trailing slash)" \
  'base: "/resume-rebuildmanufacturing/"' "$VITE_CONFIG"

# Negative assertion: the old base path must NOT exist
_assert_grep_not() {
  local desc="$1" pattern="$2" file="$3"
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found: $file)"
    return 0
  fi
  if grep -qF -- "$pattern" "$file" 2>/dev/null; then
    _fail "$desc"
  else
    _pass "$desc"
  fi
}

_assert_grep_not "vite.config.ts no longer contains old base path /rebuildmanufacturing/" \
  'base: "/rebuildmanufacturing/"' "$VITE_CONFIG"

report_results
