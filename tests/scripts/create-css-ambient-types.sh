#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "css.d.ts exists" test -f "./src/types/css.d.ts"
assert_grep "declares css module" "declare module \"*.css\"" "./src/types/css.d.ts"

report_results
