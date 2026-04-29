#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

FILE="./src/types/css.d.ts"

assert "css.d.ts exists" test -f "$FILE"
assert_grep "declares css module" '*.css' "$FILE"
assert_grep_regex "declare module statement" 'declare module' "$FILE"

report_results
