#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "tailwind.config.js exists" test -f "./tailwind.config.js"

# Content paths
assert_grep "content has index.html" "./index.html" "./tailwind.config.js"
assert_grep "content has src ts/tsx" "./src/**/*.{ts,tsx}" "./tailwind.config.js"

# Colors mapped to CSS variables
assert_grep "bg color mapped to var" "var(--bg)" "./tailwind.config.js"
assert_grep "bgElevated color mapped" "var(--bg-elevated)" "./tailwind.config.js"
assert_grep "bgSunken color mapped" "var(--bg-sunken)" "./tailwind.config.js"
assert_grep "ink color mapped" "var(--ink)" "./tailwind.config.js"
assert_grep "inkMuted color mapped" "var(--ink-muted)" "./tailwind.config.js"
assert_grep "accent color mapped" "var(--accent)" "./tailwind.config.js"
assert_grep "accentBright color mapped" "var(--accent-bright)" "./tailwind.config.js"
assert_grep "rule color mapped" "var(--rule)" "./tailwind.config.js"

# Font family
assert_grep "fontFamily sans" "IBM Plex Sans" "./tailwind.config.js"

# Max width tokens
assert_grep "maxWidth wide" "var(--wide)" "./tailwind.config.js"
assert_grep "maxWidth content" "var(--content)" "./tailwind.config.js"

# Font size tokens from CSS variables
assert_grep "fontSize xs from CSS var" "var(--fs-xs)" "./tailwind.config.js"
assert_grep "fontSize sm from CSS var" "var(--fs-sm)" "./tailwind.config.js"
assert_grep "fontSize base from CSS var" "var(--fs-base)" "./tailwind.config.js"
assert_grep "fontSize md from CSS var" "var(--fs-md)" "./tailwind.config.js"
assert_grep "fontSize lg from CSS var" "var(--fs-lg)" "./tailwind.config.js"
assert_grep "fontSize xl from CSS var" "var(--fs-xl)" "./tailwind.config.js"
assert_grep "fontSize 2xl from CSS var" "var(--fs-2xl)" "./tailwind.config.js"
assert_grep "fontSize display from CSS var" "var(--fs-display)" "./tailwind.config.js"
assert_grep "fontSize wordmark from CSS var" "var(--fs-wordmark)" "./tailwind.config.js"

# Border radius all zero
assert_grep "borderRadius is zeroed" '"0"' "./tailwind.config.js"

# Plugins empty
assert_grep_regex "plugins is empty array" 'plugins:\s*\[\s*\]' "./tailwind.config.js"

report_results
