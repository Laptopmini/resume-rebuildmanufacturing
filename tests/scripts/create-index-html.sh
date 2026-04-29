#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)/../.."
INDEX="$REPO_ROOT/index.html"

assert "index.html exists" test -f "$INDEX"

assert_grep "has doctype" "<!doctype html>" "$INDEX"
assert_grep_regex "has html lang=en" '<html[^>]*lang="en"' "$INDEX"
assert_grep_regex "has charset meta" '<meta[^>]*charset="UTF-8"' "$INDEX"
assert_grep_regex "has viewport meta" '<meta[^>]*viewport' "$INDEX"
assert_grep "has title text" "Paul-Valentin Mini" "$INDEX"
assert_grep "has description content" "Lead Frontend Engineer" "$INDEX"
assert_grep_regex "has root div" '<div[^>]*id="root"' "$INDEX"
assert_grep "has main.tsx script" "/src/main.tsx" "$INDEX"
assert_grep "has module type" 'type="module"' "$INDEX"

report_results
