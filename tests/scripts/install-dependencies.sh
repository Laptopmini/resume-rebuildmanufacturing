#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

PKG="./package.json"

# Runtime dependencies
assert_json "react@18 installed" "_.dependencies && _.dependencies.react && _.dependencies.react.includes('18')" "$PKG"
assert_json "react-dom@18 installed" "_.dependencies && _.dependencies['react-dom'] && _.dependencies['react-dom'].includes('18')" "$PKG"
assert_json "@fontsource/ibm-plex-sans installed" "_.dependencies && _.dependencies['@fontsource/ibm-plex-sans']" "$PKG"

# Dev dependencies
assert_json "vite@5 installed" "_.devDependencies && _.devDependencies.vite && _.devDependencies.vite.includes('5')" "$PKG"
assert_json "@vitejs/plugin-react installed" "_.devDependencies && _.devDependencies['@vitejs/plugin-react']" "$PKG"
assert_json "@types/react installed" "_.devDependencies && _.devDependencies['@types/react']" "$PKG"
assert_json "@types/react-dom installed" "_.devDependencies && _.devDependencies['@types/react-dom']" "$PKG"
assert_json "tailwindcss@3 installed" "_.devDependencies && _.devDependencies.tailwindcss && _.devDependencies.tailwindcss.includes('3')" "$PKG"
assert_json "postcss installed" "_.devDependencies && _.devDependencies.postcss" "$PKG"
assert_json "autoprefixer installed" "_.devDependencies && _.devDependencies.autoprefixer" "$PKG"
assert_json "jest-environment-jsdom installed" "_.devDependencies && _.devDependencies['jest-environment-jsdom']" "$PKG"
assert_json "@testing-library/react installed" "_.devDependencies && _.devDependencies['@testing-library/react']" "$PKG"
assert_json "@testing-library/jest-dom installed" "_.devDependencies && _.devDependencies['@testing-library/jest-dom']" "$PKG"
assert_json "@testing-library/user-event installed" "_.devDependencies && _.devDependencies['@testing-library/user-event']" "$PKG"
assert_json "identity-obj-proxy installed" "_.devDependencies && _.devDependencies['identity-obj-proxy']" "$PKG"

# Scripts
assert_json "dev script is vite" "_.scripts && _.scripts.dev === 'vite'" "$PKG"
assert_json "build script is vite build" "_.scripts && _.scripts.build === 'vite build'" "$PKG"
assert_json "preview script uses port 5173" "_.scripts && _.scripts.preview === 'vite preview --port 5173'" "$PKG"
assert_json "test:unit script preserved" "_.scripts && _.scripts['test:unit'] && _.scripts['test:unit'].includes('jest')" "$PKG"

# Existing scripts not touched
assert_json "maestro script preserved" "_.scripts && _.scripts.maestro" "$PKG"
assert_json "backpressure script preserved" "_.scripts && _.scripts.backpressure" "$PKG"
assert_json "ralph script preserved" "_.scripts && _.scripts.ralph" "$PKG"
assert_json "lint script preserved" "_.scripts && _.scripts.lint" "$PKG"
assert_json "check-types script preserved" "_.scripts && _.scripts['check-types']" "$PKG"

report_results
