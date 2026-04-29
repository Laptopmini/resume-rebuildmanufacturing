#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "globals.css exists" test -f "./src/styles/globals.css"

# Tailwind directives
assert_grep "has tailwind base" "@tailwind base" "./src/styles/globals.css"
assert_grep "has tailwind components" "@tailwind components" "./src/styles/globals.css"
assert_grep "has tailwind utilities" "@tailwind utilities" "./src/styles/globals.css"

# Color tokens
assert_grep "has --bg" "--bg: #1e2124" "./src/styles/globals.css"
assert_grep "has --bg-elevated" "--bg-elevated: #26292d" "./src/styles/globals.css"
assert_grep "has --bg-sunken" "--bg-sunken: #16181a" "./src/styles/globals.css"
assert_grep "has --ink" "--ink: #ffffff" "./src/styles/globals.css"
assert_grep "has --ink-muted" "--ink-muted: #abb8c3" "./src/styles/globals.css"
assert_grep "has --accent" "--accent: #d4a017" "./src/styles/globals.css"
assert_grep "has --accent-bright" "--accent-bright: #fcb900" "./src/styles/globals.css"
assert_grep "has --rule" "--rule: #2f3338" "./src/styles/globals.css"

# Layout tokens
assert_grep "has --wide" "--wide: 1200px" "./src/styles/globals.css"
assert_grep "has --content" "--content: 800px" "./src/styles/globals.css"

# Type scale tokens
assert_grep "has --fs-xs" "--fs-xs: 13px" "./src/styles/globals.css"
assert_grep "has --fs-sm" "--fs-sm: 15px" "./src/styles/globals.css"
assert_grep "has --fs-base" "--fs-base: 17px" "./src/styles/globals.css"
assert_grep "has --fs-md" "--fs-md: 20px" "./src/styles/globals.css"
assert_grep "has --fs-lg" "--fs-lg: 28px" "./src/styles/globals.css"
assert_grep "has --fs-xl" "--fs-xl: 42px" "./src/styles/globals.css"
assert_grep "has --fs-2xl" "--fs-2xl: 64px" "./src/styles/globals.css"
assert_grep "has --fs-display" "--fs-display: clamp(56px, 8vw, 112px)" "./src/styles/globals.css"
assert_grep "has --fs-wordmark" "--fs-wordmark: clamp(80px, 22vw, 320px)" "./src/styles/globals.css"

# Body rule
assert_grep "body has background var" "background: var(--bg)" "./src/styles/globals.css"
assert_grep "body has color var" "color: var(--ink)" "./src/styles/globals.css"
assert_grep "body has font-family" "IBM Plex Sans" "./src/styles/globals.css"
assert_grep "body has font-size" "font-size: var(--fs-base)" "./src/styles/globals.css"

# Accent highlight
assert_grep "has accent-highlight class" ".accent-highlight" "./src/styles/globals.css"
assert_grep "accent-highlight uses accent-bright on hover" "--accent-bright" "./src/styles/globals.css"

# Hover card
assert_grep "has hover-card class" ".hover-card" "./src/styles/globals.css"
assert_grep "hover-card uses card-hover-duration var" "--card-hover-duration" "./src/styles/globals.css"
assert_grep "hover-card uses card-hover-translate-y" "--card-hover-translate-y" "./src/styles/globals.css"

# Keyframes
assert_grep "has section-entrance keyframes" "section-entrance" "./src/styles/globals.css"
assert_grep "has wordmark-breathe keyframes" "wordmark-breathe" "./src/styles/globals.css"

# Data-in-view animation
assert_grep "has data-in-view selector" "data-in-view" "./src/styles/globals.css"
assert_grep "data-in-view uses entrance-duration var" "--entrance-duration" "./src/styles/globals.css"
assert_grep "data-in-view uses entrance-easing var" "--entrance-easing" "./src/styles/globals.css"

# Reduce motion
assert_grep "has prefers-reduced-motion" "prefers-reduced-motion" "./src/styles/globals.css"

report_results
