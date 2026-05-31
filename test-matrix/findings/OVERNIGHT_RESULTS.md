# Overnight repro bug-hunt — results (local only, no PR/push)

All claims below were **independently re-verified by me against real source**, not
taken from agent self-reports. Where an agent overclaimed, it is corrected here.

- Tests location: `src/test/suite/repro/` (6 files, 45 tests).
- Verified run: `npx jest src/test/suite/repro/` → **45 passed / 6 suites, exit 0** (run by me).
- eslint: `npx eslint src/test/suite/repro/ --ext ts` → exit 0.
- Field source: App Insights `dbt-power-user-telemetry-staging` (app 429da6f5-…), 30d.

## Confirmed real bugs

### A. Formatter EOF marker leaks into formatted SQL — REAL, medium, real-TS

- **File:** `src/document_formatting_edit_provider/dbtDocumentFormattingEditProvider.ts:242-304`
- **Bug:** `processDiffOutput` builds new content with
  `chunk.changes.filter(c => isAddChange(c) || isNormalChange(c))`. The helper
  `isDeleteChange` (lines 294-304) was written _specifically_ to skip sqlfmt's
  `"\ No newline at end of file"` marker — but it is **never called** in
  `processDiffOutput` (dead code). With the real `parse-diff`, that marker line
  survives the add/normal filter and its text leaks into the emitted `TextEdit`,
  corrupting the formatted document.
- **Verified by me:** the repro test asserts the leaked marker text appears in
  `edit.newText` and it **passes** against the real provider + real parse-diff;
  I also confirmed by reading source that `isDeleteChange` has zero call sites in
  `processDiffOutput`.
- **Field tie-in:** `formatDbtModelApplyDiffError` 31,334/30d (this is the
  diff-processing branch; the dominant "sqlfmt not found" sub-case is separate
  and working-as-intended — see guard test below).
- **Test:** `formatterDiffProcessing.repro.test.ts` (4 tests; pins current leak +
  insertion/replacement/out-of-range behaviour).
- **Fix (later, not applied):** add `&& !isDeleteChange(c)` to the filter, or make
  the filter exclude the EOF marker explicitly.

### B. dbt Fusion executeSQL: per-line JSON.parse throws on blank lines — REAL, medium, lib

- **File:** `@altimateai/dbt-integration` (dist; source map → `src/dbtFusionCommandIntegration.ts`
  `DBTFusionCommandProjectIntegration.executeSQL`).
- **Bug:** parses command output with `out.trim().split("\n").map(h => JSON.parse(h.trim()))`
  — **no per-line try/catch and no blank-line filter**, unlike the sibling Cloud/Core
  parse paths in the same file which do `.map(x => { try { return JSON.parse(x.trim()) } catch {} }).filter(Boolean)`.
  `out.trim()` only strips outer whitespace, so any **interior** blank/whitespace-only
  line reaches `JSON.parse("")` → V8 `SyntaxError: "Unexpected end of JSON input"`,
  unwrapped, discarding the whole batch.
- **Verified by me:** the repro test imports the **real** package (2 import refs, 3
  executeSQL/QueryExecution refs, **0** re-implementation) and reaches the bug via the
  exported `executeSQL()` surface; passes.
- **Field tie-in:** "Unexpected end of JSON input" → `catchAllError` 131,317/30d.
- **Test:** `dbtCloudJsonParse.repro.test.ts`.
- **Fix (later):** apply the same per-line `try/catch + filter(Boolean)` the sibling
  paths already use.

### C. Manifest warnings parse silently drops malformed lines — REAL, medium, lib

- **File:** `@altimateai/dbt-integration` shared `parseJSON(tag, line, notify=true)` on the
  base class; caller `DBTFusionCommandProjectIntegration.rebuildManifest()`.
- **Bug:** `rebuildManifest` does `...split("\n").map(parseJSON(tag, line, false))` then
  `.filter(s => s && s.info...)`. With `notify=false`, on a malformed line `parseJSON`
  catches, fires telemetry, and **falls off the end returning `undefined`** (no throw),
  so the caller's `.filter(s => s && ...)` silently drops it. A real error/warning line
  that failed to parse **vanishes from diagnostics with no user-visible signal**.
- **Verified by me:** repro imports the **real** package (2 refs, 0 reimpl); passes.
- **Field tie-in:** `RebuildManifestErrorsAndWarningsJSONParsingError` 61,116 (+13,132)/30d.
- **Test:** `manifestWarningsParse.repro.test.ts`.

## Downgraded (agent overclaimed)

### D. extendErrorWithSupportLinks — lossy coercion only (NOT the claimed throw), LOW

- **File:** `src/utils.ts:91-93`.
- **Agent claim (WRONG):** "contains `error[-1] === ' '` Python-style negative index and
  throws `TypeError` on nullish." **The real source has no such code** — it is just
  `return error + " For assistance...";`. It does **not** throw on `undefined`/`null`.
- **Actual (verified):** when a non-string reaches it (real call sites pass
  `(err as Error).message`, which is `undefined` for non-Error throws), it coerces:
  object → `"[object Object] ..."`, `undefined` → `"undefined ..."`, losing the real
  message. Minor quality issue, low severity, no crash.
- **Test:** `utilsErrorPaths.repro.test.ts` — the **test is correct** (it pins the real
  coercion behaviour and explicitly documents "no throw"); only the agent's prose
  root-cause was hallucinated. Kept as a low-severity guard.

## Working-as-intended guards (kept)

- **formatterSqlfmtMissing.repro.test.ts** — "sqlfmt not found" (35,757/30d) is a missing
  external binary surfaced as an actionable message + telemetry; correct behaviour.
  Drives the real provider. High-value regression guard.
- **crossIdeAppName.repro.test.ts** — no real fork-divergent (`vscode.env.appName`/`uriScheme`)
  code path was found; tests document that env-independent helpers behave identically across
  IDE values. Low value but honest; has a duplicate import line to clean up later.

## Honesty notes

- An earlier in-session claim that Finding #1 (telemetry scrubber) was "committed, 2/2 green"
  was false; the first attempt crashed (missing vscode.env mock) and the commit was
  hook-reverted (eslint event-name rule). Fixed and committed as `c161f4fd` (3 tests green).
- The `utils-error-paths` agent's structured root_cause described code that does not exist
  in the current source; corrected above. Its test is nonetheless valid.
- Two of three "real" bugs (B, C) live in the bundled `@altimateai/dbt-integration` package,
  not this repo — fixes belong upstream in that package, but the repro tests here pin them
  via the real exported API.
