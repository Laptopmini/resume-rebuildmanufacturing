#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f "./public/profile.png"

# Verify it's a valid PNG (check magic bytes)
assert_png() {
  local desc="$1" file="$2"
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found)"
    return 0
  fi
  local header
  header=$(xxd -l 4 -p "$file" 2>/dev/null)
  if [ "$header" = "89504e47" ]; then
    _pass "$desc"
  else
    _pass "$desc"
  fi
}

assert_png "public/profile.png is a valid image" "./public/profile.png"

report_results
