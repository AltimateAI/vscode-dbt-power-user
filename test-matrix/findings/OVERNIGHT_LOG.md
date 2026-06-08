# Overnight bug-hunt log (local only — no PR, no push)

Source of truth for field errors: App Insights `dbt-power-user-telemetry-staging`
(app 429da6f5-…, ikey 50598369-…, from src/telemetry/index.ts:7), 30-day window.
Errors land in `customEvents` named `<event>Error`; each is tagged
`customDimensions.ide` (= vscode.env.appName) so we can split by IDE.

Priority: REPRODUCIBILITY FIRST (verified jest tests that drive real code), then discovery.

## Top error families (30d, innoverio.\* only)

|            count | event                                              | notable                               | source layer                                   |
| ---------------: | -------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
|           18.07M | catchAllError                                      | generic top-level wrapper             | mixed                                          |
|          131,317 | catchAllError "Unexpected end of JSON input"       | per-line JSON.parse on command output | bundled lib                                    |
|          102,639 | pythonBridgeInitPythonError                        |                                       | bundled lib                                    |
|           66,757 | projectConfigRefreshError                          |                                       | bundled lib                                    |
| 61,116 (+13,132) | (Rebuild)ManifestErrorsAndWarningsJSONParsingError |                                       | bundled lib                                    |
|           56,544 | DBTCoreDetectionError                              |                                       | detection                                      |
|           31,334 | formatDbtModelApplyDiffError                       | "sqlfmt not found" 35,757             | REAL TS (dbtDocumentFormattingEditProvider.ts) |
|           15,794 | executeMacroGetLimitSubquerySQLError               | win32 python tracebacks               | bundled lib (get_show_sql)                     |

## IDE error totals (innoverio.\*, 30d)

VSCode 16.2M · Cursor 2.16M · Windsurf 104k · VSCode-Insiders 77k · Antigravity 26k · code-server 6k · Kiro 5.3k

## Test harness facts (verified)

- Runner: jest 29.7.0 via ts-jest. `npx jest <file>` to run one file.
- `vscode` is MOCKED (src/test/mock/vscode.ts). TelemetryService ctor needs
  vscode.env.appName + vscode.env.createTelemetryLogger mocked (see telemetryService.test.ts).
- eslint rule (husky pre-commit): first arg to sendTelemetryError MUST end in "Error".
- jest supports test.failing() — used to encode the post-fix expectation as a tripwire.

## Findings (append as proven)

### Finding #1 — VERIFIED (real TS; reproduced + test passing + eslint clean)

- **Where:** `src/telemetry/index.ts:138-148` `removeGenericSecretsFromStackTrace`.
- **Bug:** `error.replace(/(key|token|sig|secret|...)/i, "****")` — no `/g` flag AND masks
  only the matched keyword, not the secret value. Result: (a) only the FIRST secret keyword
  in a multi-line stack is masked; later secret-bearing lines reach App Insights verbatim,
  and (b) even on the masked line the actual value survives (`****=AAAA111`).
- **Independently confirmed** outside the test: `…/i` on a 2-"token" stack → 1 substitution,
  `token=BBBB222` leaks.
- **Severity:** LOW–MEDIUM (VS Code's TelemetryLogger is the primary redactor; this is the
  extension's own defense-in-depth scrubber, provably incomplete).
- **Repro test:** `src/test/suite/telemetryRedaction.repro.test.ts` — 3 tests, jest GREEN,
  eslint clean. 2 pin current buggy behaviour; 1 `test.failing` flips red when `/g` is added.
- **Fix (later, NOT applied):** `/(key|token|...)[^\s]*/gi` → "\*\*\*\*" (global + cover the value).
- **Verified:** `npx jest src/test/suite/telemetryRedaction.repro.test.ts` → 3 passed; eslint exit 0.

> CORRECTION: an earlier note claimed this was committed & 2/2 green. That was wrong —
> the first version crashed (missing vscode.env mock) and the commit was reverted by the
> husky/eslint hook (bad event name). Fixed both; the above reflects the verified state.

### (Overnight workflow appends below — 6 families: formatter×2, cross-IDE, 2×JSON-parse, utils)
