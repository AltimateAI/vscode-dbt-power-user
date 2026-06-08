/**
 * Reproduction: formatDbtModelApplyDiffError family.
 *
 * Telemetry (30d, innoverio.vscode-dbt-power-user):
 *   formatDbtModelApplyDiffError = 31,334 events.
 *
 * The error is emitted from DbtDocumentFormattingEditProvider.executeSqlFmt
 * when processDiffOutput(document, diffOutput) throws while turning a sqlfmt
 * unified-diff into vscode.TextEdit[]. This suite drives the REAL
 * processDiffOutput against REAL parse-diff output (the same dependency the
 * production code uses) over a minimal fake TextDocument, and pins the exact
 * TextEdit ranges / newText it produces.
 *
 * Findings encoded here:
 *   1. GENUINE BUG (wrong content): when sqlfmt's formatted output has no
 *      trailing newline, git/diff appends a "\ No newline at end of file"
 *      marker line. parse-diff's eof handler models that marker as a synthetic
 *      change whose `type` copies the most-recent change's type. When the last
 *      real change was an "add", the marker becomes a synthetic ADD change with
 *      content "\ No newline at end of file". processDiffOutput's filter keeps
 *      every add/normal change and NEVER calls isDeleteChange (the only place
 *      the marker is special-cased), so the marker leaks into newContent as
 *      " No newline at end of file" (its leading "\" stripped by content.slice).
 *      => the formatted text is corrupted. Pinned with a normal test() (current
 *      buggy behaviour) and the CORRECT behaviour encoded with test.failing().
 *   2. Working-as-intended baselines: pure insertion, replacement near EOF,
 *      and out-of-range chunk clamping are pinned with exact assertions so the
 *      reproduction is objective.
 */
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import parseDiff from "parse-diff";
import "reflect-metadata";
import { Position, Range, TextEdit } from "vscode";
import { DbtDocumentFormattingEditProvider } from "../../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";

/**
 * Minimal stand-in for vscode.TextDocument that exposes only the surface
 * processDiffOutput touches: lineCount, lineAt(n).range / .rangeIncludingLineBreak.
 * Line ranges use 0-based line numbers; .range.end is end-of-text on the line,
 * .rangeIncludingLineBreak.end is the start of the next line (i.e. includes "\n").
 */
function makeDocument(lines: string[]) {
  const lineCount = lines.length;
  return {
    lineCount,
    lineAt(n: number) {
      if (n < 0 || n >= lineCount) {
        throw new RangeError(
          `Illegal value for line: ${n} (lineCount=${lineCount})`,
        );
      }
      const text = lines[n];
      const start = new Position(n, 0);
      const end = new Position(n, text.length);
      // Next-line start; for the last line vscode clamps to end-of-text, but
      // for these reproductions we only feed in-range end lines.
      const breakEnd =
        n + 1 < lineCount
          ? new Position(n + 1, 0)
          : new Position(n, text.length);
      return {
        text,
        range: new Range(start, end),
        rangeIncludingLineBreak: new Range(start, breakEnd),
      };
    },
  } as any;
}

function newProvider(): any {
  // processDiffOutput uses none of the constructor deps, so stubs are safe.
  return new DbtDocumentFormattingEditProvider({} as any, {} as any, {} as any);
}

function runProcessDiffOutput(doc: any, diff: string): TextEdit[] {
  return newProvider().processDiffOutput(doc, diff);
}

describe("formatDbtModelApplyDiffError repro: processDiffOutput on real sqlfmt diffs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("pure insertion chunk (oldLines===0) emits a single insert TextEdit at line 0 start", () => {
    // sqlfmt added two lines to an otherwise-1-line doc.
    const diff = [
      "--- a/model.sql",
      "+++ b/model.sql",
      "@@ -0,0 +1,2 @@",
      "+line one",
      "+line two",
    ].join("\n");

    // Sanity-check the dependency really produced an insertion chunk.
    const parsed = parseDiff(diff);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].chunks[0].oldLines).toBe(0);
    expect(parsed[0].chunks[0].oldStart).toBe(0);

    const doc = makeDocument(["select 1"]);
    const edits = runProcessDiffOutput(doc, diff);

    expect(edits).toHaveLength(1);
    // insertLine = Math.min(oldStart=0, lineCount=1) - 1 = -1 -> max(-1,0) = 0
    expect(edits[0].range.start.line).toBe(0);
    expect(edits[0].range.start.character).toBe(0);
    // Insert is a zero-width range.
    expect(edits[0].range.end.line).toBe(0);
    expect(edits[0].range.end.character).toBe(0);
    expect(edits[0].newText).toBe("line one\nline two\n");
  });

  test("replacement chunk near EOF replaces the exact old line range with formatted content", () => {
    // 3 old lines collapse into 2 formatted lines (" select" kept, a/b joined).
    const diff = [
      "--- a/model.sql",
      "+++ b/model.sql",
      "@@ -1,3 +1,2 @@",
      " select",
      "-  a,",
      "-  b",
      "+  a, b",
    ].join("\n");

    const parsed = parseDiff(diff);
    expect(parsed[0].chunks[0].oldStart).toBe(1);
    expect(parsed[0].chunks[0].oldLines).toBe(3);

    const doc = makeDocument(["select", "  a,", "  b"]);
    const edits = runProcessDiffOutput(doc, diff);

    expect(edits).toHaveLength(1);
    // startLine = max(oldStart-1, 0) = 0 ; endLine = min(0 + 3 - 1, 2) = 2
    expect(edits[0].range.start.line).toBe(0);
    expect(edits[0].range.start.character).toBe(0);
    // rangeIncludingLineBreak.end of line 2 (last line) -> end-of-text (col 3).
    expect(edits[0].range.end.line).toBe(2);
    expect(edits[0].range.end.character).toBe(3);
    // newContent = normal(" select").slice(1) + add("+  a, b").slice(1) joined.
    expect(edits[0].newText).toBe("select\n  a, b\n");
  });

  test("chunk referencing lines beyond document.lineCount is clamped to the last line", () => {
    // sqlfmt diff says lines 5-6, but the document only has 3 lines.
    const diff = [
      "--- a/model.sql",
      "+++ b/model.sql",
      "@@ -5,2 +5,1 @@",
      "-x",
      "-y",
      "+xy",
    ].join("\n");

    const parsed = parseDiff(diff);
    expect(parsed[0].chunks[0].oldStart).toBe(5);
    expect(parsed[0].chunks[0].oldLines).toBe(2);

    const doc = makeDocument(["a", "b", "c"]); // lineCount = 3
    const edits = runProcessDiffOutput(doc, diff);

    // startLine = max(5-1,0) = 4 ; startLine(4) >= lineCount(3) -> early return.
    // So no edit is produced (the out-of-range guard fires before lineAt).
    expect(edits).toHaveLength(0);
  });

  // ----- GENUINE BUG: "\ No newline at end of file" marker corrupts output -----

  test('PIN (current buggy behaviour): no-newline marker after an add leaks " No newline at end of file" into the replacement text', () => {
    // sqlfmt formatted output has no trailing newline, so diff appends the
    // "\ No newline at end of file" marker right after the "+select 2" add.
    const diff = [
      "--- a/model.sql",
      "+++ b/model.sql",
      "@@ -1,1 +1,1 @@",
      "-select 1",
      "+select 2",
      "\\ No newline at end of file",
    ].join("\n");

    // Confirm parse-diff models the marker as a synthetic ADD change (this is
    // exactly what makes processDiffOutput's add/normal filter swallow it).
    const parsed = parseDiff(diff);
    const changes = parsed[0].chunks[0].changes;
    const marker = changes[changes.length - 1];
    expect(marker.type).toBe("add");
    expect(marker.content).toBe("\\ No newline at end of file");

    const doc = makeDocument(["select 1"]);
    const edits = runProcessDiffOutput(doc, diff);

    expect(edits).toHaveLength(1);
    // BUG: the marker line is treated as content. content.slice(1) drops the
    // leading "\" and yields " No newline at end of file", which is appended
    // as a bogus second line of the formatted SQL.
    expect(edits[0].newText).toBe("select 2\n No newline at end of file\n");
  });

  test.failing(
    "CORRECT behaviour (flips RED when fixed): no-newline marker must NOT appear in the formatted text",
    () => {
      const diff = [
        "--- a/model.sql",
        "+++ b/model.sql",
        "@@ -1,1 +1,1 @@",
        "-select 1",
        "+select 2",
        "\\ No newline at end of file",
      ].join("\n");

      const doc = makeDocument(["select 1"]);
      const edits = runProcessDiffOutput(doc, diff);

      expect(edits).toHaveLength(1);
      // The marker is metadata, not file content. The formatted line is just
      // "select 2"; whether or not a trailing newline is preserved, the marker
      // string must never bleed into the document text.
      expect(edits[0].newText).not.toContain("No newline at end of file");
      expect(edits[0].newText.trimEnd()).toBe("select 2");
    },
  );

  test("isDeleteChange (the marker special-case) is never consulted by processDiffOutput's filter", () => {
    // Demonstrates the root cause: the add/normal filter is what selects content,
    // and a synthetic ADD-typed marker bypasses isDeleteChange entirely.
    const provider = newProvider();
    const markerAsAdd = {
      type: "add",
      add: true,
      ln: 1,
      content: "\\ No newline at end of file",
    } as parseDiff.Change;

    // isAddChange returns true for the marker -> it is KEPT by the content filter.
    expect(provider.isAddChange(markerAsAdd)).toBe(true);
    // isDeleteChange would correctly reject the marker, but only for type "del".
    expect(provider.isDeleteChange(markerAsAdd)).toBe(false);

    const markerAsDel = {
      type: "del",
      del: true,
      ln: 1,
      content: "\\ No newline at end of file",
    } as parseDiff.Change;
    // The special-case only works on the del-typed form, which the add/normal
    // filter never even looks at -> the guard is effectively dead for add-typed
    // markers.
    expect(provider.isDeleteChange(markerAsDel)).toBe(false);
    expect(provider.isAddChange(markerAsDel)).toBe(false);
  });
});
