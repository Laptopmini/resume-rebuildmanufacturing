#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_not_exists() {
  local desc="$1" file="$2"
  if [ -f "$file" ]; then
    _fail "$desc"
  else
    _pass "$desc"
  fi
}

assert_not_exists "src/index.ts removed" "./src/index.ts"
assert_not_exists "tests/unit/setup.test.ts removed" "./tests/unit/setup.test.ts"
assert_not_exists "tests/e2e/setup.spec.ts removed" "./tests/e2e/setup.spec.ts"

report_results
