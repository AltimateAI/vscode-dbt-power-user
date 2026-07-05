# REVIEW.md — vscode-dbt-power-user

TypeScript VSCode extension (Inversify DI, `src/`) + React/Redux webview panels (`webview_panels/`) + a Python bridge (`dbt_core_integration.py` et al.) that makes VSCode work with dbt™ — autocomplete, lineage, query preview/execution, doc generation, an MCP server, and DataPilot AI chat.

## Goal: catch what CI cannot

This repo already runs `eslint`, `tsc --noEmit`-equivalent compile, `jest` with coverage, and `lockfile-lint` in CI, plus a pre-commit `husky` hook. Kilo's job is the layer above that: crashes from unguarded `undefined`/`null` on VS Code and dbt-manifest data, async/race bugs in extension activation and webview messaging, telemetry-serialization edge cases, and multi-root-workspace path handling — the classes of bug this repo's own fix-commit history shows repeating.

## Don't duplicate CI — never flag

- Formatting/style already enforced by `eslint --ext ts` (`npm run lint`) — don't flag spacing, import order, or other auto-fixable style.
- Type errors already caught by `tsc -p ./` (`test-compile` / `compile` scripts) — don't flag things the compiler would reject.
- Test presence/coverage is tracked via `codecov.yml` + `jest --coverage` — flag *missing regression tests for a fix*, not raw coverage percentage.
- `lockfile-lint.yml` already guards `package-lock.json` integrity — don't re-review lockfile diffs line by line.
- Pre-existing issues in code the PR doesn't touch — note only if the PR's own change makes the pre-existing issue newly reachable.

## Evidence standard — no speculation

Trace the actual caller chain before flagging: who invokes this, with what values, what happens on the undefined/error path. This repo's reviewers hold the same bar — a "stale `mcpExtensionApi` reference" finding was withdrawn after tracing `updateMcpExtensionApi()` to its single caller in `activate()` and confirming no re-invocation path exists. An untraced-but-plausible claim is worse than no comment.

## Severity calibration

- **Critical** — crashes extension activation or a core provider (autocomplete, lineage, query execution) for a common input shape; unhandled promise rejections that escape `catchAllError`; data corruption in YAML/manifest writes (e.g. writing both `tests:` and `data_tests:`).
- **Warning** — logic bugs that silently produce wrong results without crashing (substring-vs-exact matches, stale telemetry attributes, race conditions with a narrow window), missing error surfacing to the user (console-only `catch` with no UI feedback).
- **Nit** — `any` creep against the repo's `unknown`-preferred convention, dead/unused exports, telemetry naming-convention drift (`sendTelemetryError` keys should end in `Error`).

## Focus areas — bug classes this repo actually ships

1. **Unguarded `undefined`/`null` from VS Code APIs and dbt manifest data (~8+ fixes).** Recurring pattern: code assumes `uri.fsPath`, `range.start`, `data_type`, macro `type`, or command-palette args are always populated. *Flag when* a handler reads a nested property off a VS Code event, URI, or manifest node without a null/undefined check. *Verify* the call site can actually be reached with a partial/absent value (e.g. palette invocation with no args, a manifest node missing optional fields).

2. **Async/race conditions in activation, webview messaging, and telemetry (~5+ fixes: `webview:ready` postMessage race, `versionRefreshSeq` monotonic counter, DuckDB lock, concurrent `sqlfmt` notifications).** *Flag when* two async paths can write shared state (telemetry `customAttributes`, a singleton lock, a "shown already" flag) without an ordering guard. *Check* whether a monotonic sequence number or explicit await-ordering is needed — the established fix here is a `seq` counter re-checked after each `await`, not a mutex.

3. **Telemetry error serialization on non-Error throwables (~3 fixes: `safeSerializeTelemetryValue`, `extendErrorWithSupportLinks`, redactor-proof structured fields).** *Flag when* a `catch` passes the caught value straight into `sendTelemetryError`/Sentry without confirming it's an `Error` — circular objects, `BigInt`, strings, and non-Error throwables have each crashed the crash-handler here before. *Verify* a guarded serialize-with-fallback is used, not raw `JSON.stringify`.

4. **Telemetry naming/attribute hygiene (~2 fixes + explicit reviewer convention: `-Error` suffix on `sendTelemetryError` keys; stale `customAttributes` leaking across project switches).** *Flag* a new `sendTelemetryError("SomeEvent", ...)` whose key doesn't end in `Error`. *Check* a project-scoped attribute (e.g. `dbtCloudVariant`, `pythonVersion`) is cleared/overwritten on every path, including early-return branches, not just the happy path.

5. **Substring matching where exact equality is needed (model/table name lookups).** Confirmed bug: `.filter((ut) => ut.model.includes(modelName))` matched `orders`, `order_items`, `customer_orders` when looking up unit tests for `order.sql`. *Flag when* a model/table/column comparison uses `.includes()`/`.startsWith()`/a naive regex instead of exact match against a `unique_id` — check whether a sibling function already resolves precisely (e.g. via `lookupByBaseName`) and this one should match it.

6. **Multi-root workspace and path/variable resolution (~4 fixes: per-folder `.env` loading, `${workspaceFolder}`/`${env:VAR}` resolution, lineage across multi-root, `DBT_PROFILES_DIR` relative paths).** *Flag when* a path/env-var/settings lookup assumes a single workspace folder. *Verify* the code iterates `workspace.workspaceFolders` (not just `[0]`) and resolves `${workspaceFolder}`/`${env:...}` tokens before use.

7. **YAML/schema mutation correctness (docs editor writing both `tests:`/`data_tests:`; MCP tool `$schema` stripping for Gemini; YAML-AST walking vs. regex for table declarations).** *Flag* regex-based YAML text manipulation beyond a trivial string replace — this repo moved to `parseDocument`/AST walking after regex produced real name-collision bugs. *Check* a new schema/doc write doesn't reintroduce a duplicate or conflicting key.

8. **`any` type creep against the repo's `unknown`-preferred convention.** *Flag* new `as any`/`any[]`/`(x: any) =>` introduced by the diff (not pre-existing) — reviewers have called this out explicitly and suggested a narrow inline type instead.

9. **Cross-platform / packaging fragility (npm pack+tar for `altimate-core`, `.node` binary copying, lockfile symlink resolution, Windows vs POSIX venv paths in dbt-core detection).** *Flag* a new hardcoded POSIX path (`bin/python`, forward-slash joins) in code that also runs on Windows CI — the fix pattern derives the path per-platform (`Scripts/python.exe` vs `bin/python`).

10. **Inversify DI binding-mode mismatches.** *Verify before flagging* — a class bound via `.toDynamicValue()` legitimately doesn't need `@injectable()`/constructor reflection; only `.to(Class)`/`.toSelf()` bindings require it. Check `src/inversify.config.ts` before flagging a "missing `@injectable()`".

11. **Activation error routing (swallowing real errors vs. expected "no dbt project").** *Flag* an activation-level `catch` that either surfaces `NoProjectsFound` as a hard error, or swallows a genuinely unexpected error (`EMFILE`, `EACCES`, python-bridge failure) alongside it. *Verify* the specific exception type is checked, not a blanket catch-and-classify.

12. **Timeout/OOM in external process or cloud calls (sqlfmt discovery, MCP body timeout, CDK `BucketDeployment` Lambda OOM on docs deploy).** *Flag* a new subprocess/HTTP call to `sqlfmt`, dbt CLI, or an MCP endpoint with no timeout, or a timeout not cleared on success (a past bug left `setTimeout` alive after successful settlement).

## Repo invariants & landmines

- Multiple dbt integration backends exist (`dbtCoreIntegration.ts`, `dbtCloudIntegration.ts`, `dbtFusionCommandIntegration.ts`) — a fix for one (e.g. Core) rarely applies unmodified to Cloud/Fusion; check whether the PR needs to touch all three.
- `webview_panels/` is a separate Vite/React app (own `package.json`, built via `panel:webviews` before the main `rsbuild build`) — changes there don't take effect until both build steps run.
- The Python bridge (`dbt_core_integration.py`, Jupyter kernel) is a separate execution context from the TS extension host; errors there surface asynchronously and need their own guarding, not TS-side try/catch alone.
- `docker-setup/` supports E2E verification against code-server + `jaffle-shop-duckdb` — reviewers use this to verify UI/activation changes end-to-end when unit tests can't cover it.

## Known-intentional — don't flag

- Stylistic nits reviewers have explicitly deferred ("not being followed in the repo for now, will create a separate PR if needed") — don't re-raise the same ask on every PR.
- `@inject("DBTTerminal")`-style parameter decorators that are inert under `toDynamicValue` binding — intentional, they just document the token.
- `sweep.yaml` / bot-authored housekeeping PRs and dependency bumps with no behavior change — light-touch review only.

## High-blast-radius — never auto-edit

- `.github/workflows/*.yml` (`ci.yml`, `tests.yml`, `lockfile-lint.yml`, `deploy-docs-to-s3.yaml`, `silent-close-shim.yml`)
- `package.json` / `package-lock.json` (root and `webview_panels/`) and `postInstall.js` / `prepareBuild.js`
- `docker-setup/` deploy scripts
- `sweep.yaml` and any repo automation config
- `.env*`, publish/release tooling (`vsce publish`, `ovsx publish`)

## Comment style

Exact-line comments, one finding per comment, most severe first. Prefer a concrete suggested diff over prose when the fix is small. Skip deep review of trivial diffs (typo fixes, dependency bumps, doc-only changes) — say `lgtm`. Don't repeat a finding another automated reviewer (e.g. CodeRabbit) already raised in the same PR thread.
