#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./tsconfig.json"

assert_json "module is ESNext" "_.compilerOptions.module === 'ESNext'" "$CFG"
assert_json "moduleResolution is Bundler" "_.compilerOptions.moduleResolution === 'Bundler'" "$CFG"
assert_json "jsx is react-jsx" "_.compilerOptions.jsx === 'react-jsx'" "$CFG"
assert_json "lib includes ES2022" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.includes('ES2022')" "$CFG"
assert_json "lib includes DOM" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.includes('DOM')" "$CFG"
assert_json "lib includes DOM.Iterable" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.includes('DOM.Iterable')" "$CFG"
assert_json "allowSyntheticDefaultImports is true" "_.compilerOptions.allowSyntheticDefaultImports === true" "$CFG"
assert_json "noEmit is true" "_.compilerOptions.noEmit === true" "$CFG"
assert_json "outDir removed" "_.compilerOptions.outDir === undefined" "$CFG"
assert_json "rootDir removed" "_.compilerOptions.rootDir === undefined" "$CFG"
assert_json "include has src ts" "Array.isArray(_.include) && _.include.includes('src/**/*.ts')" "$CFG"
assert_json "include has src tsx" "Array.isArray(_.include) && _.include.includes('src/**/*.tsx')" "$CFG"
assert_json "exclude has dist" "Array.isArray(_.exclude) && _.exclude.includes('dist')" "$CFG"
assert_json "exclude has node_modules" "Array.isArray(_.exclude) && _.exclude.includes('node_modules')" "$CFG"
assert_json "exclude has tests" "Array.isArray(_.exclude) && _.exclude.includes('tests')" "$CFG"

report_results
