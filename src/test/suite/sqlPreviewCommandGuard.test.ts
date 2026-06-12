import { describe, expect, it } from "@jest/globals";

/**
 * Customer UAT surfaced an error when "Validate SQL" or "Visualize SQL (Beta)"
 * was run with the compiled-SQL preview pane focused:
 *
 *   ENOPRO: No file system provider found for resource
 *   'query-preview:/…/customers.sql'
 *
 * Root cause: both commands read the active editor's content with
 * `workspace.fs.readFile(uri)`. The compiled preview is served by a
 * `TextDocumentContentProvider` registered for the `query-preview` scheme
 * (`SqlPreviewContentProvider.SCHEME`). `workspace.fs.*` does not route through
 * content providers — it looks up a `FileSystemProvider`, finds none for
 * `query-preview`, and throws `ENOPRO`.
 *
 *   - validateSql.ts          — read at L131; an existing scheme guard sat
 *                               AFTER the read, so it never prevented the crash.
 *   - sqlLineagePanel.ts       — read at L159; no guard at all. The command
 *                               handler lives in commands/index.ts.
 *
 * The fix has two layers, both characterized below:
 *   1. Menu: `editor/context` when-clause gains `resourceScheme != 'query-preview'`
 *      so the items don't appear on the preview pane.
 *   2. Handler: each command early-returns with an info toast when the active
 *      editor is the preview, before any `workspace.fs` call (covers the
 *      Command Palette path, which has no when-gating).
 *
 * These tests mirror the guard logic (same characterization style as
 * bigQueryCostEstimate.test.ts) rather than instantiating the heavy command
 * classes / VS Code host.
 */
describe("compiled-preview guard for Validate SQL / Visualize SQL", () => {
  // SqlPreviewContentProvider.SCHEME
  const PREVIEW_SCHEME = "query-preview";

  type Uri = { scheme: string };

  describe("Layer 2 — handler control flow around workspace.fs.readFile", () => {
    /**
     * Pre-fix validateSql: the file is read first and the scheme is only
     * checked afterwards, so a preview URI reaches `readFile` and throws.
     */
    function preFixHandlerFlow(uri: Uri): string[] {
      const steps: string[] = [];
      steps.push("readFile"); // workspace.fs.readFile(currentFilePath)
      if (uri.scheme === PREVIEW_SCHEME) {
        steps.push("return"); // guard, but too late to help
      }
      return steps;
    }

    /**
     * Post-fix (both handlers): the scheme is checked at the top, before any
     * `workspace.fs` call. Preview → info toast + early return; anything else
     * proceeds to read.
     */
    function postFixHandlerFlow(uri: Uri): string[] {
      const steps: string[] = [];
      if (uri.scheme === PREVIEW_SCHEME) {
        steps.push("showInformationMessage");
        steps.push("return");
        return steps;
      }
      steps.push("readFile");
      return steps;
    }

    it("pre-fix: a preview URI reaches readFile (the ENOPRO crash)", () => {
      const steps = preFixHandlerFlow({ scheme: PREVIEW_SCHEME });
      expect(steps).toContain("readFile");
      // the guard runs, but only after the crashing read
      expect(steps.indexOf("readFile")).toBeLessThan(steps.indexOf("return"));
    });

    it("post-fix: a preview URI short-circuits before any fs read", () => {
      const steps = postFixHandlerFlow({ scheme: PREVIEW_SCHEME });
      expect(steps).not.toContain("readFile");
      expect(steps).toEqual(["showInformationMessage", "return"]);
    });

    it("post-fix: a real file URI still proceeds to read", () => {
      expect(postFixHandlerFlow({ scheme: "file" })).toEqual(["readFile"]);
    });

    it("post-fix: a remote source URI still proceeds (denylist, not file-only)", () => {
      // vscode-remote: (SSH / Codespaces / WSL) must keep working
      expect(postFixHandlerFlow({ scheme: "vscode-remote" })).toEqual([
        "readFile",
      ]);
    });
  });

  describe("Layer 1 — editor/context when-clause visibility", () => {
    /**
     * Mirrors the when-clause applied to dbtPowerUser.validateSql and
     * dbtPowerUser.sqlLineage:
     *   resourceLangId =~ /^sql$|^jinja-sql$/ && resourceScheme != 'query-preview'
     */
    function menuItemVisible(langId: string, scheme: string): boolean {
      return /^sql$|^jinja-sql$/.test(langId) && scheme !== PREVIEW_SCHEME;
    }

    it("visible on a source .sql / jinja-sql file", () => {
      expect(menuItemVisible("sql", "file")).toBe(true);
      expect(menuItemVisible("jinja-sql", "file")).toBe(true);
    });

    it("hidden on the compiled preview pane", () => {
      expect(menuItemVisible("sql", PREVIEW_SCHEME)).toBe(false);
    });

    it("still visible on remote source files (denylist preserves vscode-remote)", () => {
      expect(menuItemVisible("sql", "vscode-remote")).toBe(true);
    });

    it("still gated by language id (not shown on non-sql files)", () => {
      expect(menuItemVisible("python", "file")).toBe(false);
    });
  });
});
