# PRD: GitHub Pages Deploy Workflow

## Tasks

- [ ] Create `.github/workflows/deploy.yml` defining a workflow named `Deploy to GitHub Pages` triggered on `push` to `main` and on `workflow_dispatch`. Set top-level `permissions: { contents: read, pages: write, id-token: write }` and `concurrency: { group: "pages", cancel-in-progress: false }`. Define a single job `build-and-deploy` running on `ubuntu-latest` with two steps before deploy: `actions/checkout@v4`, `actions/setup-node@v4` with `node-version: 24` and `cache: npm`, `npm ci`, `npm run build`. Then upload-and-deploy via `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` with `path: dist`, and `actions/deploy-pages@v4`. Set the job `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }` and tag the deploy step with `id: deployment`. `[test: bash tests/scripts/create-deploy-workflow.sh]`
