#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

GLOBALS_CSS="./src/styles/globals.css"

# Local helper: assert a fixed string is NOT found in a file
_assert_grep_not() {
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

# 1. --hero-overlay token inside :root
assert_grep ":root block contains --hero-overlay token" \
  "--hero-overlay: rgba(20, 22, 25, 0.65)" "$GLOBALS_CSS"

# 2. .accent-highlight uses the new marker-highlight (box-decoration-break is a unique marker)
assert_grep ".accent-highlight uses box-decoration-break: clone" \
  "box-decoration-break: clone;" "$GLOBALS_CSS"

# 3. .accent-highlight has explicit text-decoration: none (new implementation)
assert_grep ".accent-highlight sets text-decoration: none" \
  "text-decoration: none;" "$GLOBALS_CSS"

# 4. Old .accent-highlight styles must be removed
_assert_grep_not ".accent-highlight no longer has text-decoration: underline" \
  "text-decoration: underline;" "$GLOBALS_CSS"

_assert_grep_not ".accent-highlight no longer has text-decoration-color" \
  "text-decoration-color:" "$GLOBALS_CSS"

_assert_grep_not ".accent-highlight no longer has text-underline-offset" \
  "text-underline-offset: 6px;" "$GLOBALS_CSS"

# 5. .hero-video-frame rule exists
assert_grep ".hero-video-frame rule exists" \
  ".hero-video-frame" "$GLOBALS_CSS"

# 6. .hero-overlay rule uses --hero-overlay
assert_grep ".hero-overlay rule uses background-color: var(--hero-overlay)" \
  "background-color: var(--hero-overlay)" "$GLOBALS_CSS"

# 7. .accent-highlight is NOT in the prefers-reduced-motion selector list
_check_reduced_motion_no_accent() {
  local file="$1"
  awk '/@media \(prefers-reduced-motion: reduce\)/ { in_block=1; next }
       in_block && /\}/ {
         if (block ~ /\.accent-highlight/) { exit 1 }
         exit 0
       }
       in_block { block = block $0 }
       END { if (in_block == 0) exit 1 }' "$file"
}

if _check_reduced_motion_no_accent "$GLOBALS_CSS"; then
  _pass ".accent-highlight removed from prefers-reduced-motion selector list"
else
  _fail ".accent-highlight removed from prefers-reduced-motion selector list"
fi

# 8. [data-in-view] and .hover-card should still be in prefers-reduced-motion
__extract_reduced_block() {
  local file="$1"
  awk '/@media \(prefers-reduced-motion: reduce\)/ { in_block=1; next }
       in_block && /\}/ { print block; exit }
       in_block { block = block $0 }' "$file"
}

_reduced_block=$(__extract_reduced_block "$GLOBALS_CSS")
if echo "$_reduced_block" | grep -qF "[data-in-view]"; then
  _pass "[data-in-view] still in prefers-reduced-motion selector list"
else
  _fail "[data-in-view] still in prefers-reduced-motion selector list"
fi

if echo "$_reduced_block" | grep -qF ".hover-card"; then
  _pass ".hover-card still in prefers-reduced-motion selector list"
else
  _fail ".hover-card still in prefers-reduced-motion selector list"
fi

report_results
