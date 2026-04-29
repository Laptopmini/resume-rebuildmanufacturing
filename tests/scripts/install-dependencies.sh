#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Runtime dependencies
assert_json "react runtime dep" "_.dependencies.react" "./package.json"
assert_json "react-dom runtime dep" "_.dependencies['react-dom']" "./package.json"
assert_json "fontsource runtime dep" "_.dependencies['@fontsource/ibm-plex-sans']" "./package.json"

# Dev dependencies
assert_json "vite dev dep" "_.devDependencies.vite" "./package.json"
assert_json "vite plugin react dev dep" "_.devDependencies['@vitejs/plugin-react']" "./package.json"
assert_json "types react dev dep" "_.devDependencies['@types/react']" "./package.json"
assert_json "types react-dom dev dep" "_.devDependencies['@types/react-dom']" "./package.json"
assert_json "tailwindcss dev dep" "_.devDependencies.tailwindcss" "./package.json"
assert_json "postcss dev dep" "_.devDependencies.postcss" "./package.json"
assert_json "autoprefixer dev dep" "_.devDependencies.autoprefixer" "./package.json"
assert_json "jest-environment-jsdom dev dep" "_.devDependencies['jest-environment-jsdom']" "./package.json"
assert_json "testing-library react dev dep" "_.devDependencies['@testing-library/react']" "./package.json"
assert_json "testing-library jest-dom dev dep" "_.devDependencies['@testing-library/jest-dom']" "./package.json"
assert_json "testing-library user-event dev dep" "_.devDependencies['@testing-library/user-event']" "./package.json"
assert_json "identity-obj-proxy dev dep" "_.devDependencies['identity-obj-proxy']" "./package.json"

# Scripts
assert_json "dev script" "_.scripts.dev === 'vite'" "./package.json"
assert_json "build script" "_.scripts.build === 'vite build'" "./package.json"
assert_json "preview script" "_.scripts.preview === 'vite preview --port 5173'" "./package.json"
assert_json "test:unit script is jest" "_.scripts['test:unit'] === 'jest'" "./package.json"

# Preserved scripts (must not be replaced or removed)
assert_json "maestro script preserved" "_.scripts.maestro && typeof _.scripts.maestro === 'string'" "./package.json"
assert_json "backpressure script preserved" "_.scripts.backpressure && typeof _.scripts.backpressure === 'string'" "./package.json"
assert_json "ralph script preserved" "_.scripts.ralph && typeof _.scripts.ralph === 'string'" "./package.json"
assert_json "lint script preserved" "_.scripts.lint && typeof _.scripts.lint === 'string'" "./package.json"
assert_json "check-types script preserved" "_.scripts['check-types'] && typeof _.scripts['check-types'] === 'string'" "./package.json"

report_results
