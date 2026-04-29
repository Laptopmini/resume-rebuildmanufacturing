#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WORKFLOW=".github/workflows/deploy.yml"

assert "deploy workflow file exists" test -f "$WORKFLOW"

# Workflow name
assert_grep "workflow name" "name: Deploy to GitHub Pages" "$WORKFLOW"

# Triggers
assert_grep "trigger on push" "push:" "$WORKFLOW"
assert_grep "push targets main branch" "branches:" "$WORKFLOW"
assert_grep "main branch listed" "- main" "$WORKFLOW"
assert_grep "workflow_dispatch trigger" "workflow_dispatch" "$WORKFLOW"

# Permissions
assert_grep "contents read permission" "contents: read" "$WORKFLOW"
assert_grep "pages write permission" "pages: write" "$WORKFLOW"
assert_grep "id-token write permission" "id-token: write" "$WORKFLOW"

# Concurrency
assert_grep "concurrency group pages" "group: pages" "$WORKFLOW"
assert_grep "concurrency cancel-in-progress false" "cancel-in-progress: false" "$WORKFLOW"

# Job
assert_grep "job name build-and-deploy" "build-and-deploy:" "$WORKFLOW"
assert_grep "runs-on ubuntu-latest" "runs-on: ubuntu-latest" "$WORKFLOW"

# Environment
assert_grep "environment name github-pages" "name: github-pages" "$WORKFLOW"
assert_grep "environment url references deployment output" "steps.deployment.outputs.page_url" "$WORKFLOW"

# Steps
assert_grep "checkout step" "actions/checkout@v4" "$WORKFLOW"
assert_grep "setup-node step" "actions/setup-node@v4" "$WORKFLOW"
assert_grep "node-version 24" "node-version: 24" "$WORKFLOW"
assert_grep "npm cache" "cache: npm" "$WORKFLOW"
assert_grep "npm ci step" "run: npm ci" "$WORKFLOW"
assert_grep "npm run build step" "run: npm run build" "$WORKFLOW"
assert_grep "configure-pages step" "actions/configure-pages@v5" "$WORKFLOW"
assert_grep "upload-pages-artifact step" "actions/upload-pages-artifact@v3" "$WORKFLOW"
assert_grep "artifact path dist" "path: dist" "$WORKFLOW"
assert_grep "deploy-pages step" "actions/deploy-pages@v4" "$WORKFLOW"
assert_grep "deployment step id" "id: deployment" "$WORKFLOW"

report_results
