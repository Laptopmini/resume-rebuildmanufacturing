#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_grep "testEnvironment is jsdom" 'testEnvironment: "jsdom"' "./jest.config.mjs"
assert_grep "moduleNameMapper present" "moduleNameMapper" "./jest.config.mjs"
assert_grep "identity-obj-proxy used for CSS" "identity-obj-proxy" "./jest.config.mjs"
assert_grep "setupFilesAfterEach present" "setupFilesAfterEach" "./jest.config.mjs"
assert_grep "testing-library jest-dom in setup" "@testing-library/jest-dom" "./jest.config.mjs"
assert_grep "transform preserved" "transform" "./jest.config.mjs"
assert_grep "@swc/jest preserved" "@swc/jest" "./jest.config.mjs"
assert_grep "testMatch preserved" "testMatch" "./jest.config.mjs"

report_results
