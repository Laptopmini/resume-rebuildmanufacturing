#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

FILE="./src/styles/globals.css"

assert "globals.css exists" test -f "$FILE"

# Tailwind directives
assert_grep "tailwind base" "@tailwind base" "$FILE"
assert_grep "tailwind components" "@tailwind components" "$FILE"
assert_grep "tailwind utilities" "@tailwind utilities" "$FILE"

# Color tokens
assert_grep "bg color" "--bg: #1e2124" "$FILE"
assert_grep "bg-elevated color" "--bg-elevated: #26292d" "$FILE"
assert_grep "bg-sunken color" "--bg-sunken: #16181a" "$FILE"
assert_grep "ink color" "--ink: #ffffff" "$FILE"
assert_grep "ink-muted color" "--ink-muted: #abb8c3" "$FILE"
assert_grep "accent color" "--accent: #d4a017" "$FILE"
assert_grep "accent-bright color" "--accent-bright: #fcb900" "$FILE"
assert_grep "rule color" "--rule: #2f3338" "$FILE"

# Layout tokens
assert_grep "wide layout" "--wide: 1200px" "$FILE"
assert_grep "content layout" "--content: 800px" "$FILE"

# Type scale
assert_grep "fs-xs" "--fs-xs: 13px" "$FILE"
assert_grep "fs-sm" "--fs-sm: 15px" "$FILE"
assert_grep "fs-base" "--fs-base: 17px" "$FILE"
assert_grep "fs-md" "--fs-md: 20px" "$FILE"
assert_grep "fs-lg" "--fs-lg: 28px" "$FILE"
assert_grep "fs-xl" "--fs-xl: 42px" "$FILE"
assert_grep "fs-2xl" "--fs-2xl: 64px" "$FILE"
assert_grep_regex "fs-display clamp" "--fs-display:.*clamp" "$FILE"
assert_grep_regex "fs-wordmark clamp" "--fs-wordmark:.*clamp" "$FILE"

# Body rule
assert_grep "body background" "var(--bg)" "$FILE"
assert_grep "body color" "var(--ink)" "$FILE"
assert_grep "body font-family" "IBM Plex Sans" "$FILE"
assert_grep "body line-height" "1.55" "$FILE"

# accent-highlight class
assert_grep "accent-highlight class" ".accent-highlight" "$FILE"
assert_grep "accent-highlight underline thickness" "text-decoration-thickness: 3px" "$FILE"
assert_grep "accent-highlight offset" "text-underline-offset: 6px" "$FILE"
assert_grep "accent-highlight hover uses accent-bright" "var(--accent-bright)" "$FILE"

# hover-card class
assert_grep "hover-card class" ".hover-card" "$FILE"
assert_grep "hover-card translateY" "translateY" "$FILE"
assert_grep "hover-card outline" "outline-color" "$FILE"

# Animations
assert_grep "section-entrance keyframes" "section-entrance" "$FILE"
assert_grep "wordmark-breathe keyframes" "wordmark-breathe" "$FILE"
assert_grep "data-in-view selector" "data-in-view" "$FILE"

# Reduce motion
assert_grep "prefers-reduced-motion" "prefers-reduced-motion" "$FILE"

report_results
