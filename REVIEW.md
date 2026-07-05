# REVIEW.md — vscode-dbt-power-user

TypeScript VSCode extension (Inversify DI, `src/`) + React/Redux webview panels (`webview_panels/`) for dbt™ — autocomplete, lineage, query execution, doc gen, an MCP server, and DataPilot AI chat.

## Goal: catch what CI cannot

This repo already runs `eslint`, `tsc --noEmit`-equivalent compile, `jest` with coverage, and `lockfile-lint` in CI, plus a pre-commit `husky` hook. Kilo's job is the layer above: crashes from unguarded `undefined`/`null` on VS Code and dbt-manifest data, async/race bugs in activation and webview messaging, telemetry-serialization edge cases, and multi-root-workspace path handling — bug classes this repo's fix history shows repeating.

## Don't duplicate CI — never flag

- Formatting/style already enforced by `eslint --ext ts` — don't flag spacing, import order, or other auto-fixable style.
- Type errors already caught by `tsc -p ./` — don't flag things the compiler would reject.
- Test coverage is tracked via `codecov.yml` + `jest --coverage` — flag *missing regression tests for a fix*, not raw coverage percentage.
- `lockfile-lint.yml` already guards `package-lock.json` integrity — don't re-review lockfile diffs line by line.
- Pre-existing issues in code the PR doesn't touch — note only if the PR's change makes it newly reachable.

## Evidence standard — no speculation

Trace the actual caller chain before flagging: who invokes this, with what values, what happens on the undefined/error path. Reviewers hold the same bar — a "stale `mcpExtensionApi` reference" finding was withdrawn after tracing `updateMcpExtensionApi()` to its single caller in `activate()` with no re-invocation path. An untraced-but-plausible claim is worse than no comment.

## Severity calibration

- **Critical** — crashes extension activation or a core provider (autocomplete, lineage, query execution) for a common input shape; unhandled promise rejections escaping `catchAllError`; data corruption in YAML/manifest writes (e.g. writing both `tests:` and `data_tests:`).
- **Warning** — logic bugs that silently produce wrong results without crashing (substring-vs-exact matches, stale telemetry attributes, narrow-window races), missing error surfacing to the user (console-only `catch` with no UI feedback).
- **Nit** — `any` creep against the repo's `unknown`-preferred convention, dead/unused exports, telemetry naming drift (`sendTelemetryError` keys should end in `Error`).

## Focus areas — bug classes this repo actually ships

1. **Unguarded `undefined`/`null` from VS Code APIs and dbt manifest data (~8+ fixes).** Pattern: code assumes `uri.fsPath`, `range.start`, `data_type`, macro `type`, or palette args are populated. *Flag* a handler reading a nested property off a VS Code event/URI/manifest node without a null check. *Verify* the call site can be reached with a partial/absent value (e.g. palette call with no args, manifest node missing optional fields).

2. **Async/race conditions in activation, webview messaging, and telemetry (~5+ fixes: `webview:ready` postMessage race, `versionRefreshSeq` counter, DuckDB lock, concurrent `sqlfmt` notifications).** *Flag* two async paths writing shared state (telemetry `customAttributes`, a singleton lock, a "shown already" flag) without an ordering guard. The established fix is a `seq` counter re-checked after each `await`, not a mutex.

3. **Telemetry error serialization on non-Error throwables (~3 fixes: `safeSerializeTelemetryValue`, `extendErrorWithSupportLinks`, redactor-proof fields).** *Flag* a `catch` passing the caught value straight into `sendTelemetryError`/Sentry without confirming it's an `Error` — circular objects, `BigInt`, strings, and non-Error throwables have each crashed the crash-handler here. *Verify* a guarded serialize-with-fallback is used, not raw `JSON.stringify`.

4. **Telemetry naming/attribute hygiene (~2 fixes + convention: `-Error` suffix on `sendTelemetryError` keys; stale `customAttributes` leaking across project switches).** *Flag* a new `sendTelemetryError("SomeEvent", ...)` whose key doesn't end in `Error`. *Check* a project-scoped attribute (e.g. `dbtCloudVariant`) is cleared/overwritten on every path, including early returns.

5. **Substring matching where exact equality is needed (model/table lookups).** Confirmed bug: `.filter((ut) => ut.model.includes(modelName))` matched `orders`, `order_items`, `customer_orders` for `order.sql`. *Flag* a comparison using `.includes()`/`.startsWith()`/regex instead of exact match against a `unique_id` — check whether a sibling function already resolves precisely (e.g. `lookupByBaseName`) and this one should match it.

6. **Multi-root workspace and path/variable resolution (~4 fixes: per-folder `.env` loading, `${workspaceFolder}`/`${env:VAR}` resolution, multi-root lineage, `DBT_PROFILES_DIR` relative paths).** *Flag* a path/env-var lookup that assumes a single workspace folder. *Verify* the code iterates `workspace.workspaceFolders` (not just `[0]`) and resolves `${workspaceFolder}`/`${env:...}` tokens before use.

7. **YAML/schema mutation correctness (docs editor writing both `tests:`/`data_tests:`; MCP `$schema` stripping for Gemini; YAML-AST walking vs. regex).** *Flag* regex-based YAML text manipulation beyond a trivial replace — this repo moved to `parseDocument`/AST walking after regex caused name-collision bugs. *Check* a new schema/doc write doesn't reintroduce a duplicate or conflicting key.

8. **`any` type creep against the repo's `unknown`-preferred convention.** *Flag* new `as any`/`any[]`/`(x: any) =>` introduced by the diff (not pre-existing) — reviewers suggest a narrow inline type instead.

9. **Cross-platform / packaging fragility (npm pack+tar for `altimate-core`, `.node` binary copying, lockfile symlinks, Windows vs POSIX venv paths).** *Flag* a new hardcoded POSIX path (`bin/python`, forward-slash joins) in code that runs on Windows CI too — the fix derives the path per-platform (`Scripts/python.exe` vs `bin/python`).

10. **Inversify DI binding-mode mismatches.** *Verify before flagging* — a class bound via `.toDynamicValue()` legitimately doesn't need `@injectable()`; only `.to(Class)`/`.toSelf()` bindings require it. Check `src/inversify.config.ts` before flagging a "missing `@injectable()`".

11. **Activation error routing (swallowing real errors vs. expected "no dbt project").** *Flag* an activation `catch` that surfaces `NoProjectsFound` as a hard error, or swallows a genuinely unexpected error (`EMFILE`, `EACCES`, integration-bridge failure) alongside it. *Verify* the specific exception type is checked, not a blanket catch-and-classify.

12. **Timeout/OOM in external process or cloud calls (sqlfmt discovery, MCP body timeout, CDK `BucketDeployment` Lambda OOM on docs deploy).** *Flag* a new subprocess/HTTP call to `sqlfmt`, dbt CLI, or an MCP endpoint with no timeout, or a timeout not cleared on success (a past bug left `setTimeout` alive after success).

## Repo invariants & landmines

- Dbt integration backends (Core/Cloud/CoreCommand/Fusion) are consolidated behind a single `DbtIntegrationClient` (bound in `src/inversify.config.ts`, backed by `@altimateai/dbt-integration`); the backend is chosen at runtime via the `dbtIntegration` setting (`core`/`cloud`/`corecommand`/`fusion`) — a backend-specific fix rarely applies unmodified to the others, so check which one(s) the PR touches.
- `webview_panels/` is a separate Vite/React app (own `package.json`, built via `panel:webviews` before `rsbuild build`) — changes don't take effect until both build steps run.
- The Jupyter kernel bridge is a separate execution context from the TS extension host; errors there surface asynchronously and need their own guarding, not TS-side try/catch alone.
- `docker-setup/` supports E2E verification against code-server + `jaffle-shop-duckdb` — use this to verify UI/activation changes end-to-end when unit tests can't.

## Known-intentional — don't flag

- Stylistic nits reviewers have explicitly deferred — don't re-raise the same ask on every PR.
- `@inject("DBTTerminal")`-style decorators inert under `toDynamicValue` binding — intentional, they just document the token.
- `sweep.yaml` / bot-authored housekeeping PRs and dependency bumps with no behavior change — light-touch review only.

## High-blast-radius — never auto-edit

- `.github/workflows/*.yml` (`ci.yml`, `tests.yml`, `lockfile-lint.yml`, `deploy-docs-to-s3.yaml`, `silent-close-shim.yml`)
- `package.json` / `package-lock.json` (root and `webview_panels/`) and `postInstall.js` / `prepareBuild.js`
- `docker-setup/` deploy scripts
- `sweep.yaml` and any repo automation config
- `.env*`, publish/release tooling (`vsce publish`, `ovsx publish`)

## Comment style

Exact-line comments, one finding per comment, most severe first. Prefer a concrete suggested diff over prose when the fix is small. Skip deep review of trivial diffs (typos, dependency bumps, doc-only changes) — say `lgtm`. Don't repeat a finding another automated reviewer (e.g. CodeRabbit) already raised in the same thread.
