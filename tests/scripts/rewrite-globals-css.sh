#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

FILE="src/styles/globals.css"

assert "globals.css exists" test -f "$FILE"

# --- :root block must contain the new hero-overlay token ---
assert_grep "hero-overlay token in :root" "--hero-overlay: rgba(20, 22, 25, 0.65);" "$FILE"

# --- accent-highlight must use background-color marker style, not text-decoration ---
assert_grep_regex "accent-highlight has background-color: var(--accent);" 'background-color:[[:space:]]*var(--accent);' "$FILE"

assert_grep "accent-highlight has box-decoration-break: clone;" "box-decoration-break: clone;" "$FILE"

assert_grep "accent-highlight has -webkit-box-decoration-break: clone;" "-webkit-box-decoration-break: clone;" "$FILE"

# --- accent-highlight:hover must use background-color: var(--accent-bright) ---
# Extract the block following .accent-highlight:hover and check for the expected declaration
check_accent_hover_bg() {
  grep -A 10 "\.accent-highlight:hover" "$FILE" | grep -qF "background-color: var(--accent-bright);"
}
assert "accent-highlight:hover has background-color: var(--accent-bright)" check_accent_hover_bg

# --- .hero-video-frame ---
assert_grep "hero-video-frame position absolute" "position: absolute;" "$FILE"
assert_grep "hero-video-frame transform translate" "transform: translate(-50%, -50%);" "$FILE"
assert_grep "hero-video-frame min-width 100vw" "min-width: 100vw;" "$FILE"
assert_grep "hero-video-frame min-height 100vh" "min-height: 100vh;" "$FILE"
assert_grep "hero-video-frame width 177.78vh" "width: 177.78vh;" "$FILE"
assert_grep "hero-video-frame height 56.25vw" "height: 56.25vw;" "$FILE"
assert_grep "hero-video-frame border 0" "border: 0;" "$FILE"
assert_grep "hero-video-frame pointer-events none" "pointer-events: none;" "$FILE"

# --- .hero-overlay ---
assert_grep "hero-overlay position absolute" "position: absolute;" "$FILE"
assert_grep "hero-overlay inset 0" "inset: 0;" "$FILE"
assert_grep "hero-overlay uses var(--hero-overlay)" "var(--hero-overlay)" "$FILE"

# --- prefers-reduced-motion: .accent-highlight must NOT be in the selector list ---
# Extract the prefers-reduced-motion block and verify .accent-highlight is absent
if grep -A 10 "@media (prefers-reduced-motion: reduce)" "$FILE" | grep -qF ".accent-highlight"; then
  _fail "accent-highlight removed from prefers-reduced-motion selector"
else
  _pass "accent-highlight removed from prefers-reduced-motion selector"
fi

# [data-in-view] and .hover-card must still be in prefers-reduced-motion
assert_grep "[data-in-view] in prefers-reduced-motion block" "[data-in-view]" "$FILE"
assert_grep ".hover-card in prefers-reduced-motion block" ".hover-card" "$FILE"

# --- Preserved blocks ---
assert_grep "@tailwind base preserved" "@tailwind base;" "$FILE"
assert_grep "@tailwind components preserved" "@tailwind components;" "$FILE"
assert_grep "@tailwind utilities preserved" "@tailwind utilities;" "$FILE"

assert_grep "body block preserved" "body {" "$FILE"
assert_grep "body background var(--bg)" "background: var(--bg);" "$FILE"

assert_grep "hover-card rule preserved" ".hover-card {" "$FILE"

assert_grep_regex "section-entrance keyframes preserved" "@keyframes section-entrance" "$FILE"
assert_grep_regex "wordmark-breathe keyframes preserved" "@keyframes wordmark-breathe" "$FILE"

assert_grep '[data-in-view="true"] rule preserved' '[data-in-view="true"]' "$FILE"

assert_grep "prefers-reduced-motion media query preserved" "prefers-reduced-motion" "$FILE"

report_results
