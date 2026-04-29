#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_json "module is ESNext" "_.compilerOptions.module === 'ESNext'" "./tsconfig.json"
assert_json "moduleResolution is Bundler" "_.compilerOptions.moduleResolution === 'Bundler'" "./tsconfig.json"
assert_json "jsx is react-jsx" "_.compilerOptions.jsx === 'react-jsx'" "./tsconfig.json"
assert_json "lib has ES2022" "_.compilerOptions.lib && _.compilerOptions.lib.includes('ES2022')" "./tsconfig.json"
assert_json "lib has DOM" "_.compilerOptions.lib && _.compilerOptions.lib.includes('DOM')" "./tsconfig.json"
assert_json "lib has DOM.Iterable" "_.compilerOptions.lib && _.compilerOptions.lib.includes('DOM.Iterable')" "./tsconfig.json"
assert_json "allowSyntheticDefaultImports" "_.compilerOptions.allowSyntheticDefaultImports === true" "./tsconfig.json"
assert_json "noEmit is true" "_.compilerOptions.noEmit === true" "./tsconfig.json"
assert_json "no outDir" "_.compilerOptions.outDir === undefined" "./tsconfig.json"
assert_json "no rootDir" "_.compilerOptions.rootDir === undefined" "./tsconfig.json"
assert_json "include is correct" "JSON.stringify(_.include) === JSON.stringify(['src/**/*.ts','src/**/*.tsx'])" "./tsconfig.json"
assert_json "exclude has dist" "_.exclude && _.exclude.includes('dist')" "./tsconfig.json"
assert_json "exclude has node_modules" "_.exclude && _.exclude.includes('node_modules')" "./tsconfig.json"
assert_json "exclude has tests" "_.exclude && _.exclude.includes('tests')" "./tsconfig.json"

report_results
