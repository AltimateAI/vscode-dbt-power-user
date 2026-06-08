/**
 * Reproduction: RebuildManifestErrorsAndWarningsJSONParsingError
 * (App Insights, innoverio.vscode-dbt-power-user, 30d: 61,116 + 13,132 non-cloud variant)
 *
 * WHERE IT LIVES (source AND runtime verified against the real npm package)
 * ------------------------------------------------------------------------
 * The telemetry name is produced by the shared helper `parseJSON(tag, line, notify)` defined on
 * the base integration class (`L`) in node_modules/@altimateai/dbt-integration/dist/index.js.
 * Verified minified source body (at byte offset 14034):
 *
 *   parseJSON(r, t, e = true) {                      // r=tag, t=line, e=notify(default true)
 *     try { return JSON.parse(t); }
 *     catch (n) {
 *       if (this.terminal.error(r + "Error",         // -> "RebuildManifestErrorsAndWarningsJSONParsingError"
 *                               "An error occured while parsing following json: " + t,
 *                               n),                    // <-- exactly 3 args: name, message, error
 *           e) throw n;                                // throws ONLY when notify(e) is truthy
 *     }
 *     // NO explicit return -> falls off the end -> returns `undefined` when notify is false
 *   }
 *
 * The caller is `DBTFusionCommandProjectIntegration.rebuildManifest()` (verified at offset 46742 /
 * dist/index.js line 77), which parses the dbt parse-command stderr LINE-BY-LINE with notify=false:
 *
 *   const o = stderr.trim().split("\n").map(s=>s.trim()).filter(s=>!!s)
 *               .map(s => this.parseJSON("RebuildManifestErrorsAndWarningsJSONParsing", s, false));
 *   const a = o.filter(s => s && s.hasOwnProperty("info") && s.info.hasOwnProperty("level")
 *                            && s.info.hasOwnProperty("msg") && ["error","fatal"].includes(s.info.level))
 *               .map(s => s.info.msg);   // -> error diagnostics
 *   const i = o.filter(s => s && ... && s.info.level === "warn").map(s => s.info.msg); // -> warning diagnostics
 *
 * The error NAME is built as `tag + "Error"`, which is exactly
 * "RebuildManifestErrorsAndWarningsJSONParsingError". `parseJSON` is inherited from base `L`, so it
 * is reachable off the exported integration classes — runtime-verified that it resolves on
 * DBTFusionCommandProjectIntegration, DBTCloudProjectIntegration, DBTBaseProjectIntegration and
 * CloudFusionIntegration (all defined on `L`). We use the ACTUAL rebuild caller class here,
 * DBTFusionCommandProjectIntegration.
 *
 * EXACT RUNTIME-OBSERVED BEHAVIOUR (notify=false, the rebuild path)
 * ----------------------------------------------------------------
 *   valid line   -> returns the parsed object, terminal.error NOT called
 *   "{}"         -> returns {} (parses fine), terminal.error NOT called, caller drops it (no info)
 *   bad line     -> terminal.error called with name="...Error",
 *                   message="An error occured while parsing following json: " + line,
 *                   error=<SyntaxError>; then returns `undefined` (NOT null, NOT throw)
 * Note: this helper does NOT pass a `notify` flag NOR an `{adapter}` dimension to terminal.error
 * (only 3 args). The adapter dimension lives on OTHER telemetry calls in rebuildManifest's catch,
 * not on this per-line parse.
 *
 * WHAT THE TELEMETRY MEANS / BUG CLASSIFICATION
 * ---------------------------------------------
 * When dbt emits a line that is not valid JSON (a truncated jsonl record, a banner/log line, or a
 * python traceback leaking onto stderr — the same upstream condition behind the 131k "Unexpected
 * end of JSON input" family), JSON.parse throws, the helper fires the telemetry, and (because the
 * caller passes notify=false) returns `undefined`. The caller's `.filter(s => s && ...)` then drops
 * every undefined, so the offending line — which may have carried a real compile error or warning —
 * is silently discarded from the diagnostics list.
 *
 * It does not crash (the throw is suppressed for notify=false), so at "does the extension blow up"
 * level it is working-as-intended. But it is a genuine, high-volume (61k + 13k events / 30d)
 * data-loss / observability defect: a failed error/warning line vanishes and the dropped-line count
 * is never surfaced to the user. is_real_bug = true on that basis.
 *
 * STRATEGY
 * --------
 *  - Every assertion calls the REAL exported helper off the class prototype (no re-implementation),
 *    with a minimal `this` providing only the members the method touches: `this.terminal.error`.
 *  - Normal test()s PIN current behaviour with exact values (parsed object; the precise telemetry
 *    name + message; SyntaxError; `undefined` return for notify=false; throw for notify=true; and
 *    the caller filter dropping the undefined).
 *  - One test.failing() encodes the CORRECT fixed behaviour: a parse failure must not collapse to a
 *    bare `undefined` indistinguishable from a benign non-diagnostic line. Green now (bug present),
 *    flips red when fixed.
 *
 * ASSERTION STABILITY
 * -------------------
 * Telemetry NAME, the exact message string, the `undefined` return, and the canonical V8-stable
 * SyntaxError message "Unexpected end of JSON input" (premature-EOF / truncated case) are stable
 * and asserted exactly. For arbitrary garbage we assert only `instanceof SyntaxError` because V8's
 * position-specific text ("Unexpected token 'R'...") varies by Node version.
 */
import { DBTFusionCommandProjectIntegration } from "@altimateai/dbt-integration";
import { describe, expect, test } from "@jest/globals";

const TELEMETRY_EVENT = "RebuildManifestErrorsAndWarningsJSONParsingError";
const REBUILD_TAG = "RebuildManifestErrorsAndWarningsJSONParsing";

type Captured = {
  name: string;
  message: string;
  error: unknown;
  extraArgCount: number;
} | null;

/** Invoke the REAL parseJSON helper off the prototype with a minimal `this`. */
function callRealParseJSON(
  line: string,
  notify: boolean,
): { result: unknown; threw: unknown; telemetry: Captured } {
  let telemetry: Captured = null;
  const ctx = {
    terminal: {
      error: (
        name: string,
        message: string,
        error: unknown,
        ...rest: unknown[]
      ) => {
        telemetry = { name, message, error, extraArgCount: rest.length };
      },
    },
  };
  const fn = (DBTFusionCommandProjectIntegration as any).prototype.parseJSON;
  let result: unknown;
  let threw: unknown = undefined;
  try {
    result = fn.call(ctx, REBUILD_TAG, line, notify);
  } catch (e) {
    threw = e;
  }
  return { result, threw, telemetry };
}

/** Mirror of the caller's error/fatal keep-filter (dist/index.js line 77). */
function callerKeepsAsError(s: any): boolean {
  return !!(
    s &&
    Object.prototype.hasOwnProperty.call(s, "info") &&
    s.info &&
    Object.prototype.hasOwnProperty.call(s.info, "level") &&
    Object.prototype.hasOwnProperty.call(s.info, "msg") &&
    ["error", "fatal"].includes(s.info.level)
  );
}

describe("RebuildManifestErrorsAndWarningsJSONParsingError (real @altimateai/dbt-integration)", () => {
  test("the parseJSON helper is reachable on the rebuild caller class prototype (not re-implemented here)", () => {
    expect(typeof DBTFusionCommandProjectIntegration).toBe("function");
    expect(
      typeof (DBTFusionCommandProjectIntegration as any).prototype.parseJSON,
    ).toBe("function");
  });

  test("valid error JSONL line: returns the parsed object, no telemetry, caller keeps it", () => {
    const line = JSON.stringify({
      info: { level: "error", msg: "Compilation Error in model foo" },
    });
    const { result, threw, telemetry } = callRealParseJSON(line, false);
    expect(threw).toBeUndefined();
    expect(result).toEqual({
      info: { level: "error", msg: "Compilation Error in model foo" },
    });
    expect(telemetry).toBeNull();
    expect(callerKeepsAsError(result)).toBe(true);
  });

  test("valid but non-diagnostic JSONL line ('{}'): parses fine, no telemetry, caller drops it", () => {
    const { result, threw, telemetry } = callRealParseJSON("{}", false);
    expect(threw).toBeUndefined();
    expect(result).toEqual({});
    expect(telemetry).toBeNull();
    expect(callerKeepsAsError(result)).toBe(false);
  });

  test("truncated JSONL line ('Unexpected end of JSON input') with notify=false: fires telemetry, does NOT throw, returns undefined", () => {
    // A real jsonl line cut off mid-stream so it ends right after a key, where MORE tokens were
    // expected — this is what reliably yields the V8-stable "Unexpected end of JSON input" message
    // and is the exact upstream condition behind that 131k family. (A line truncated mid-VALUE
    // instead yields V8's position-specific text, which is not version-stable, so we don't use it
    // for the message assertion.)
    const truncated = '{"info":';
    const { result, threw, telemetry } = callRealParseJSON(truncated, false);

    expect(telemetry).not.toBeNull();
    expect(telemetry!.name).toBe(TELEMETRY_EVENT);
    // Exact message string built by the helper (verified in source).
    expect(telemetry!.message).toBe(
      `An error occured while parsing following json: ${truncated}`,
    );
    expect(telemetry!.error).toBeInstanceOf(SyntaxError);
    // Canonical, V8-stable message for premature EOF.
    expect((telemetry!.error as Error).message).toBe(
      "Unexpected end of JSON input",
    );
    // The helper passes ONLY (name, message, error) to terminal.error — no notify flag, no adapter.
    expect(telemetry!.extraArgCount).toBe(0);

    // notify=false -> the `if(...,e)throw n` does NOT throw; the method falls off the end.
    expect(threw).toBeUndefined();
    // THE DATA LOSS: returns undefined (not null), so the caller's `.filter(s => s && ...)` drops it.
    expect(result).toBeUndefined();
    expect(callerKeepsAsError(result)).toBe(false);
  });

  test("non-JSON line (banner/log) with notify=false: fires telemetry with a SyntaxError, returns undefined", () => {
    const logline = "Running with dbt=1.7.0";
    const { result, threw, telemetry } = callRealParseJSON(logline, false);
    expect(telemetry).not.toBeNull();
    expect(telemetry!.name).toBe(TELEMETRY_EVENT);
    expect(telemetry!.message).toBe(
      `An error occured while parsing following json: ${logline}`,
    );
    expect(telemetry!.error).toBeInstanceOf(SyntaxError);
    expect(telemetry!.extraArgCount).toBe(0);
    expect(threw).toBeUndefined();
    expect(result).toBeUndefined();
  });

  test("notify=true: still fires the SAME telemetry but RE-THROWS the SyntaxError (other callers' path)", () => {
    // The rebuild path uses notify=false; the default (notify=true) re-throws. Pin both branches.
    const bad = "definitely not json";
    const { threw, telemetry } = callRealParseJSON(bad, true);
    expect(telemetry).not.toBeNull();
    expect(telemetry!.name).toBe(TELEMETRY_EVENT);
    expect(telemetry!.message).toBe(
      `An error occured while parsing following json: ${bad}`,
    );
    expect(threw).toBeInstanceOf(SyntaxError);
  });

  test("THE BUG, pinned: a failed parse is dropped by the caller IDENTICALLY to a benign non-diagnostic line", () => {
    // A failed parse yields undefined -> dropped by `.filter(s => s && ...)`.
    const failed = callRealParseJSON(
      '{"info":{"level":"error","msg":"boom"}',
      false,
    ).result;
    // A successfully-parsed non-diagnostic line is ALSO dropped by the same filter.
    const nonDiag = callRealParseJSON(
      JSON.stringify({ status: "ok" }),
      false,
    ).result;

    expect(callerKeepsAsError(failed)).toBe(false);
    expect(callerKeepsAsError(nonDiag)).toBe(false);
    // The dropped error message "boom" never reaches the diagnostics list, and downstream there is
    // no way to tell the failure (failed=undefined) apart from the benign skip (nonDiag={status}).
    expect(failed).toBeUndefined();
    expect(nonDiag).toEqual({ status: "ok" });
  });

  // CORRECT behaviour, encoded as test.failing so the suite is GREEN now (bug present) and flips
  // RED when the helper stops collapsing a parse failure to a bare `undefined`. A correct
  // implementation would surface the failure distinctly to the rebuild caller (e.g. return a
  // sentinel it can detect and report, or push a synthetic diagnostic) instead of returning the
  // same falsy value that the caller's filter silently drops — making the ~74k/mo of dropped
  // diagnostics observable instead of silent.
  test.failing(
    "FIXED-BEHAVIOUR GUARD: a parse failure must not return a bare undefined that the caller filter silently drops",
    () => {
      const failed = callRealParseJSON(
        '{"info":{"level":"error","msg":"boom"}',
        false,
      ).result;
      // Today this is undefined (the bug). A correct fix returns a distinguishable failure marker.
      expect(failed).toBeDefined();
    },
  );
});
