# Install / Update Test Matrix (P1)

Each cell emits a RESULT_JSON (schema in docs/superpowers/plans/2026-05-30-extension-install-update-matrix-p1.md).

- `vscode-cell.mjs` — real VSCode/Insiders via @vscode/test-electron (fresh + upgrade)
- `codeserver-cell.sh` — wraps docker-setup/vsix-smoke.sh
- `aggregate.py` — renders the install + update matrices, Slack payload, and the blocking gate exit code

Run one cell locally:
npm run build && npm run compile
bash test-matrix/setup-dbt-env.sh
node test-matrix/vscode-cell.mjs --mode fresh --target latest --out /tmp/r.json
