#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./tailwind.config.js"

assert "tailwind.config.js exists" test -f "$CFG"

# Content globs
assert_grep "content includes index.html" "index.html" "$CFG"
assert_grep "content includes src files" "src/**/*.{ts,tsx}" "$CFG"

# Color tokens
assert_grep "bg color token" "var(--bg)" "$CFG"
assert_grep "bgElevated color token" "var(--bg-elevated)" "$CFG"
assert_grep "bgSunken color token" "var(--bg-sunken)" "$CFG"
assert_grep "ink color token" "var(--ink)" "$CFG"
assert_grep "inkMuted color token" "var(--ink-muted)" "$CFG"
assert_grep "accent color token" "var(--accent)" "$CFG"
assert_grep "accentBright color token" "var(--accent-bright)" "$CFG"
assert_grep "rule color token" "var(--rule)" "$CFG"

# Font family
assert_grep "IBM Plex Sans font" "IBM Plex Sans" "$CFG"

# Max width tokens
assert_grep "maxWidth wide token" "var(--wide)" "$CFG"
assert_grep "maxWidth content token" "var(--content)" "$CFG"

# Font size tokens
assert_grep "fs-xs token" "var(--fs-xs)" "$CFG"
assert_grep "fs-sm token" "var(--fs-sm)" "$CFG"
assert_grep "fs-base token" "var(--fs-base)" "$CFG"
assert_grep "fs-md token" "var(--fs-md)" "$CFG"
assert_grep "fs-lg token" "var(--fs-lg)" "$CFG"
assert_grep "fs-xl token" "var(--fs-xl)" "$CFG"
assert_grep "fs-2xl token" "var(--fs-2xl)" "$CFG"
assert_grep "fs-display token" "var(--fs-display)" "$CFG"
assert_grep "fs-wordmark token" "var(--fs-wordmark)" "$CFG"

# Border radius all zero
assert_grep_regex "borderRadius none is 0" 'none.*0' "$CFG"
assert_grep_regex "borderRadius full is 0" 'full.*0' "$CFG"

# CommonJS export
assert_grep "module.exports" "module.exports" "$CFG"

report_results
