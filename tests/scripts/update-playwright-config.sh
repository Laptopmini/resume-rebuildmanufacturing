#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./playwright.config.ts"

assert_grep "baseURL uses port 5173" "5173" "$CFG"
assert_grep "testDir preserved" "tests/e2e" "$CFG"
assert_grep "chromium project preserved" "chromium" "$CFG"

# Ensure old port 3000 is NOT present
assert_not_grep() {
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

assert_not_grep "port 3000 removed" "3000" "$CFG"

report_results
