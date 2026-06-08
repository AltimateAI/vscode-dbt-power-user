import { describe, expect, test } from "@jest/globals";
import { extendErrorWithSupportLinks } from "../../../utils";

/**
 * Reproduction tests for the `extendErrorWithSupportLinks` error-formatting
 * helper (src/utils.ts:96). This helper decorates the user-facing message on
 * the error paths that feed the top App Insights field errors
 * (catchAllError 18.07M, formatDbtModelApplyDiffError, RebuildManifest...,
 * "Unexpected end of JSON input", etc.). It is invoked from ~20 call sites
 * (commands/index.ts, dbtProject.ts, the formatter provider, doc gen, lineage,
 * conversation provider, ...), several of which pass `(err as Error).message`
 * or joined arrays — i.e. values that are NOT guaranteed to be strings at
 * runtime even though the parameter is typed `string`.
 *
 * Two real defects are pinned here:
 *
 *  (1) Dead trailing-space de-duplication. The source uses `error[-1]` to test
 *      whether the message already ends in a space. JavaScript does NOT support
 *      negative string indexing (that is Python), so `error[-1]` is ALWAYS
 *      `undefined` and the `=== " "` branch is never taken. An
 *      already-space-terminated message gets a SECOND space appended, producing
 *      a double space before the support link. The intended behaviour
 *      (`endsWith(" ")` => no extra space) is encoded with `test.failing` so the
 *      suite is green now and flips red the moment the bug is fixed.
 *
 *  (2) Non-string coercion. With non-string runtime inputs (undefined, null,
 *      plain object) the `+ " "` concatenation coerces the value via
 *      `String(value)`, yielding misleading messages like "undefined ...",
 *      "null ..." and "[object Object] ..." that mask the real primary error
 *      instead of surfacing it. The function never throws, so this compounds —
 *      rather than crashes — the top field errors.
 *
 * The const below is the exact support-link suffix from the source; the leading
 * space is contributed by the function, not by this constant.
 */
const SUPPORT_TAIL =
  "If the issue persists, please [contact us](https://www.altimate.ai/support) via chat or Slack";

describe("extendErrorWithSupportLinks - error-formatting robustness (repro)", () => {
  // ---- Baseline: the documented happy path still holds ---------------------
  test("plain string message gets exactly one space then the support link", () => {
    expect(extendErrorWithSupportLinks("problem")).toBe(
      "problem " + SUPPORT_TAIL,
    );
  });

  // ---- Defect 1: dead trailing-space de-duplication ------------------------
  // PIN (current buggy behaviour): an already-space-terminated message gets a
  // SECOND space, because `error[-1] === " "` can never be true in JS.
  test("BUG PIN: already-space-terminated message gets a doubled space", () => {
    const out = extendErrorWithSupportLinks("problem ");
    // Two spaces between "problem" and the link -> dedup logic is dead code.
    expect(out).toBe("problem  " + SUPPORT_TAIL);
    expect(out.startsWith("problem  If")).toBe(true); // double space
    expect(out.startsWith("problem If")).toBe(false); // not single
  });

  // CORRECT behaviour the fix should produce: a message that already ends in a
  // space must NOT receive a second one. This flips to passing once the source
  // uses `endsWith(" ")` (or `error[error.length - 1]`) instead of `error[-1]`.
  test.failing(
    "EXPECTED AFTER FIX: trailing-space message keeps a single space",
    () => {
      expect(extendErrorWithSupportLinks("problem ")).toBe(
        "problem " + SUPPORT_TAIL,
      );
    },
  );

  // ---- Defect 2: non-string inputs are silently coerced --------------------
  // These call sites are real: e.g. commands/index.ts passes
  // `(err as Error).message`, which is `undefined` when the thrown value is not
  // an Error or has no message; dbtLineageService passes joined arrays; several
  // paths forward a caught value of `unknown` type.

  // VERIFIED by running jest: undefined/null do NOT coerce to "undefined ..."
  // — the property access `error[-1]` itself throws before any concatenation,
  // because you cannot read a property off undefined/null. This is the more
  // severe variant: the error-decorator THROWS on exactly the inputs produced
  // by `(err as Error).message` when the thrown value is not an Error (message
  // is undefined). A helper meant to make errors friendlier instead raises a
  // secondary TypeError, which is what feeds the catchAll wrapper.
  test("BUG PIN: undefined input throws TypeError (reading '-1'), not a friendly message", () => {
    expect(() =>
      extendErrorWithSupportLinks(undefined as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      extendErrorWithSupportLinks(undefined as unknown as string),
    ).toThrow("Cannot read properties of undefined (reading '-1')");
  });

  test("BUG PIN: null input throws TypeError (reading '-1'), not a friendly message", () => {
    expect(() =>
      extendErrorWithSupportLinks(null as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      extendErrorWithSupportLinks(null as unknown as string),
    ).toThrow("Cannot read properties of null (reading '-1')");
  });

  // CORRECT behaviour the fix should produce: null/undefined must NOT throw —
  // the decorator should degrade gracefully to the support link. Flips to
  // passing once the helper normalises nullish input (e.g. `String(error ?? "")`).
  test.failing("EXPECTED AFTER FIX: null/undefined inputs do not throw", () => {
    expect(() =>
      extendErrorWithSupportLinks(undefined as unknown as string),
    ).not.toThrow();
    expect(() =>
      extendErrorWithSupportLinks(null as unknown as string),
    ).not.toThrow();
  });

  test("BUG PIN: a plain object becomes '[object Object]'", () => {
    expect(extendErrorWithSupportLinks({} as unknown as string)).toBe(
      "[object Object] " + SUPPORT_TAIL,
    );
  });

  test("BUG PIN: an error-like object surfaces '[object Object]', not its .message", () => {
    // The function stringifies the whole object instead of reading `.message`,
    // so the actual error text ("boom") is lost from the user-facing message.
    const out = extendErrorWithSupportLinks({
      message: "boom",
    } as unknown as string);
    expect(out).toBe("[object Object] " + SUPPORT_TAIL);
    expect(out.includes("boom")).toBe(false);
  });

  // CORRECT behaviour the fix should produce for an Error-like value: the real
  // message ("boom") should appear and the misleading "[object Object]" should
  // not. Flips to passing once the helper normalises non-string input
  // (e.g. `error instanceof Error ? error.message : String(error ?? "")`).
  test.failing(
    "EXPECTED AFTER FIX: error-like input surfaces its message, not [object Object]",
    () => {
      const out = extendErrorWithSupportLinks({
        message: "boom",
      } as unknown as string);
      expect(out.includes("boom")).toBe(true);
      expect(out.includes("[object Object]")).toBe(false);
    },
  );

  // CORRECT behaviour the fix should produce for null/undefined: the call must
  // succeed and return a string that still ends with the support link (so the
  // user is never shown a raw "null"/"undefined" and the decorator never
  // throws). Currently this throws at `error[-1]`, so the test fails today and
  // flips to passing once the helper normalises nullish input.
  test.failing(
    "EXPECTED AFTER FIX: undefined yields a clean string ending in the support link",
    () => {
      const out = extendErrorWithSupportLinks(undefined as unknown as string);
      expect(out.endsWith(SUPPORT_TAIL)).toBe(true);
      expect(out).not.toContain("undefined ");
    },
  );
});
