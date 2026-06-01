# dbt Power User — field-error bugs (reproduced as tests)

**Source of truth:** App Insights `dbt-power-user-telemetry-staging` (app `429da6f5-…`), 30-day window.
Errors land in `customEvents` named `<event>Error`, each tagged `customDimensions.ide`
(= `vscode.env.appName`) so volumes split per IDE.

**Method:** each error family was traced to real source, reproduced as a jest test that drives the
**real code path** (no re-implementation), and verified by running it. All 6 suites / 45 tests pass
locally; 5 are confirmed real bugs, 2 are working-as-intended regression guards.
Tests live in `src/test/suite/repro/`.

**Per-IDE error totals (30d, innoverio.\*):** VSCode 16.2M · Cursor 2.16M · Windsurf 104k ·
VSCode-Insiders 77k · Antigravity 26k · code-server 6k · Kiro 5.3k.

---

## Bug 1 — Telemetry stack scrubber leaks secrets (no global flag)

- **Severity:** low–medium (defense-in-depth; VS Code's TelemetryLogger is the primary redactor).
- **Location:** `src/telemetry/index.ts:138-148` `removeGenericSecretsFromStackTrace` (this repo).
- **Root cause:** `error.replace(/(key|token|sig|secret|password|...)/i, "****")` — **no `/g` flag**,
  and it masks only the matched keyword, not the secret value. So only the _first_ secret keyword in a
  multi-line stack is masked; later secret-bearing lines reach App Insights verbatim, and even on the
  masked line the value survives (`****=AAAA111`).
- **Verified:** independent run — 2-`token` stack → 1 substitution, `token=BBBB222` leaks.
- **Fix:** `/(key|token|...)\S*/gi` → `"****"` (global + cover the value).
- **Repro test:** `src/test/suite/repro/telemetryRedaction.repro.test.ts` (in `src/test/suite/`).

## Bug 2 — Formatter leaks the "No newline at end of file" marker into your SQL

- **Severity:** medium. **Field tie-in:** `formatDbtModelApplyDiffError` 31,334/30d.
- **Location:** `src/document_formatting_edit_provider/dbtDocumentFormattingEditProvider.ts:242-304` (this repo).
- **Root cause:** `processDiffOutput` filters `chunk.changes` to `isAddChange || isNormalChange`. The
  guard written to skip sqlfmt's `"\ No newline at end of file"` marker (`isDeleteChange`, lines 294-304)
  is **never called** — dead code. parse-diff classifies that marker as a synthetic `add` after a `+`
  line, so it survives the filter and `" No newline at end of file"` leaks into the emitted `TextEdit`,
  corrupting the formatted document.
- **Trigger:** any sqlfmt diff whose formatted output has no trailing newline (very common).
- **Fix:** `.filter(c => (isAddChange(c) || isNormalChange(c)) && c.content !== "\\ No newline at end of file")`.
- **Repro test:** `formatterDiffProcessing.repro.test.ts` (6 tests; pins the leak + insertion/replacement/clamp).

## Bug 3 — dbt Fusion query preview crashes on a blank output line

- **Severity:** medium. **Field tie-in:** "Unexpected end of JSON input" → `catchAllError` 131,317/30d.
- **Location:** `@altimateai/dbt-integration` v0.3.2 → `DBTFusionCommandProjectIntegration.executeSQL`
  (source map → `src/dbtFusionCommandIntegration.ts:517`). **Upstream package, not this repo.**
- **Root cause:** parses `dbt show` output with
  `out.trim().split("\n").map(h => JSON.parse(h.trim()))` — **no per-line try/catch, no blank-line filter**,
  unlike the sibling Cloud/Core parse paths in the same file. `out.trim()` strips only outer whitespace,
  so any **interior** blank/whitespace-only line reaches `JSON.parse("")` → unwrapped
  `SyntaxError: "Unexpected end of JSON input"`, discarding the whole result batch.
- **Verified:** empty / whitespace-only / interior-blank / interior-spaced stdout all throw the exact
  field message; a valid pair returns the correct table; a truncated line throws a _different_ message
  (so the family attribution is precise).
- **Matches user report:** GitHub issue **#1887** ("…`SyntaxError: Unexpected token 'p', "panic: run"…`").
- **Fix:** mirror the sibling paths — per-line `try{…}catch{}` + `.filter(Boolean)` + empty-result guard.
- **Repro test:** `dbtCloudJsonParse.repro.test.ts` (9 tests, drives the real exported `executeSQL`).

## Bug 4 — Manifest errors/warnings silently dropped

- **Severity:** medium. **Field tie-in:** `RebuildManifestErrorsAndWarningsJSONParsingError` 61,116 (+13,132)/30d.
- **Location:** `@altimateai/dbt-integration` shared `parseJSON(tag, line, notify=true)`; caller
  `DBTFusionCommandProjectIntegration.rebuildManifest()`. **Upstream package, not this repo.**
- **Root cause:** `rebuildManifest` calls `parseJSON(tag, line, false)` per line, then `.filter(s => s && …)`.
  With `notify=false`, a malformed line makes `parseJSON` catch, fire telemetry, and **fall off the end
  returning `undefined`** — which the caller's filter silently drops. A real error/warning line that
  failed to parse vanishes from diagnostics with no user-visible signal.
- **Matches user report:** GitHub issue **#1579** ("Unable to parse manifest.json", lineage not working).
- **Fix:** route parse failures to a distinct channel instead of returning a filtered-away `undefined`.
- **Repro test:** `manifestWarningsParse.repro.test.ts` (8 tests, resolves the real minified `parseJSON`).

## Bug 5 — `extendErrorWithSupportLinks` throws a _second_ error on the error path

- **Severity:** low–medium (compounds, doesn't originate, the top errors). **Feeds:** catchAll 18.07M/30d.
- **Location:** `src/utils.ts:96-101` (this repo).
- **Root cause:** `(error[-1] === " " ? error : error + " ")`. JS has no negative string indexing, so:
  - **Throws:** when a non-Error is thrown, ~20 call sites pass `(err as Error).message` = `undefined`;
    `undefined[-1]` → `TypeError: Cannot read properties of undefined (reading '-1')`. A helper meant to
    make errors friendlier raises a secondary error on exactly the catchAll paths.
  - **Dead dedup / lossy:** `error[-1]` is always `undefined` → `=== " "` never fires → space-terminated
    messages get a doubled space; a non-string object becomes `"[object Object] …"`, dropping `.message`.
- **Call-site breadth (verified):** invoked in **~20 files** (dbtProject.ts, queryResultPanel.ts:404,
  dbtTestService.ts:451, lineage panels, docGenService, commands/index.ts×6, conversationProvider, …).
- **Verified:** ran the exact expression — `undefined`/`null` → TypeError; object → `"[object Object] …"`.
- **Fix:** normalise input + `endsWith(" ")`:
  `const s = error instanceof Error ? error.message : error == null ? "" : String(error); return (s.endsWith(" ") ? s : s + " ") + LINK;`
- **Repro test:** `utilsErrorPaths.repro.test.ts` (10 tests; pins throw/coercion + `test.failing` tripwires).

---

## Working-as-intended (kept as regression guards, not bugs)

- **`formatterSqlfmtMissing.repro.test.ts`** — "sqlfmt not found" (35,757/30d) is a missing external
  binary surfaced as an actionable message + telemetry. Correct behaviour; guards against silent failure
  or a spurious spawn.
- **`crossIdeAppName.repro.test.ts`** — `isCursor()` (`env.appName === "Cursor"`) is a deliberate
  Cursor-only feature gate; returning false on every other fork is the intended default. No fork-divergent
  crash path exists in `src/`.

## Severity summary

| #   | Bug                                  | Repo         | Severity | Field volume (30d) |
| --- | ------------------------------------ | ------------ | -------- | ------------------ |
| 1   | Telemetry secret leak (no `/g`)      | this repo    | low–med  | —                  |
| 2   | Formatter EOF marker leak            | this repo    | medium   | 31,334             |
| 3   | Fusion `JSON.parse` on blank line    | upstream lib | medium   | 131,317            |
| 4   | Manifest warnings silently dropped   | upstream lib | medium   | 74,248             |
| 5   | `extendErrorWithSupportLinks` throws | this repo    | low–med  | feeds 18.07M       |

**In-repo fixes:** #1, #2, #5. **Upstream (`@altimateai/dbt-integration`):** #3, #4.
