#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "src/index.ts removed" test ! -f "./src/index.ts"
assert "tests/unit/setup.test.ts removed" test ! -f "./tests/unit/setup.test.ts"
assert "tests/e2e/setup.spec.ts removed" test ! -f "./tests/e2e/setup.spec.ts"

report_results
