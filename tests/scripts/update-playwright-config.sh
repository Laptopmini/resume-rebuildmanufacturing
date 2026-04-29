#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "playwright config exists" test -f "./playwright.config.ts"
assert_grep "baseURL is 5173" "http://localhost:5173" "./playwright.config.ts"
assert_grep "testDir preserved" 'testDir: "./tests/e2e"' "./playwright.config.ts"
assert_grep "testMatch preserved" "testMatch" "./playwright.config.ts"
assert_grep "timeout preserved" "timeout: 10000" "./playwright.config.ts"
assert_grep "chromium project preserved" "chromium" "./playwright.config.ts"

report_results
