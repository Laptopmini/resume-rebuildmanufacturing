#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./jest.config.mjs"

assert_grep "testEnvironment is jsdom" 'jsdom' "$CFG"
assert_grep_regex "CSS moduleNameMapper present" '\\.(css|less|scss|sass)' "$CFG"
assert_grep "identity-obj-proxy in config" "identity-obj-proxy" "$CFG"
assert_grep "@testing-library/jest-dom in setup" "@testing-library/jest-dom" "$CFG"
assert_grep "transform preserved" "@swc/jest" "$CFG"
assert_grep "testMatch preserved" "tests/unit" "$CFG"

report_results
