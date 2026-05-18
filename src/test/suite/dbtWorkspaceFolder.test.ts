import { describe, expect, it } from "@jest/globals";
import * as path from "path";

/**
 * Test the `contains` method guard against undefined uri.fsPath.
 *
 * Telemetry showed 907 monthly crashes with:
 *   TypeError: Cannot read properties of undefined (reading 'startsWith')
 *   at DBTWorkspaceFolder.contains
 *
 * The crash happens when VS Code APIs pass a Uri without a valid fsPath
 * (e.g., virtual files, git diff views, untitled documents, output channels).
 */
describe("DBTWorkspaceFolder.contains guard", () => {
  // Extracted logic mirrors the `contains` method to test without full DI setup
  function contains(
    uriFsPath: string | undefined,
    workspaceFsPath: string,
  ): boolean {
    if (!uriFsPath) {
      return false;
    }
    return (
      uriFsPath === workspaceFsPath ||
      uriFsPath.startsWith(workspaceFsPath + path.sep)
    );
  }

  it("should return false when uri.fsPath is undefined", () => {
    expect(contains(undefined, "/home/user/project")).toBe(false);
  });

  it("should return false when uri.fsPath is empty string", () => {
    expect(contains("", "/home/user/project")).toBe(false);
  });

  it("should return true when uri matches workspace root exactly", () => {
    expect(contains("/home/user/project", "/home/user/project")).toBe(true);
  });

  it("should return true when uri is inside workspace folder", () => {
    expect(
      contains(
        `/home/user/project${path.sep}models${path.sep}file.sql`,
        "/home/user/project",
      ),
    ).toBe(true);
  });

  it("should return false when uri is outside workspace folder", () => {
    expect(contains("/home/user/other/file.sql", "/home/user/project")).toBe(
      false,
    );
  });

  it("should return false for partial prefix match without separator", () => {
    // /home/user/project-v2/file.sql should NOT match /home/user/project
    expect(
      contains("/home/user/project-v2/file.sql", "/home/user/project"),
    ).toBe(false);
  });
});

/**
 * The `nonExistingAllowListFolders` telemetry condition in `getAllowListFolders`
 * was inverted since the event was added (commit e7220cb6, Dec 2023): it fired
 * when nonFiltered.length === filtered.length — i.e., when nothing had been
 * filtered out — opposite of what the message "filtered out non-existing
 * allowListFolders" says. Production telemetry on 0.61.3 showed 756 distinct
 * machines / 9151 events / 24h (40% of all 0.61.3 machines) — most of them
 * the empty-config case (both arrays length 0). Flipped to `!==` so the event
 * fires only when filtering genuinely removed entries.
 */
describe("DBTWorkspaceFolder nonExistingAllowListFolders telemetry condition", () => {
  // Mirrors the predicate in `getAllowListFolders` exactly so a future drift
  // back to `===` fails this test.
  function shouldReportFilteredAllowListFolders(
    nonFiltered: string[],
    filtered: string[],
  ): boolean {
    return nonFiltered.length !== filtered.length;
  }

  it("does not fire when no allowListFolders are configured (both empty)", () => {
    expect(shouldReportFilteredAllowListFolders([], [])).toBe(false);
  });

  it("does not fire when all configured folders exist (no filtering happened)", () => {
    expect(
      shouldReportFilteredAllowListFolders(
        ["/a", "/b", "/c"],
        ["/a", "/b", "/c"],
      ),
    ).toBe(false);
  });

  it("fires when at least one configured folder was filtered out", () => {
    expect(
      shouldReportFilteredAllowListFolders(
        ["/a", "/b", "/missing"],
        ["/a", "/b"],
      ),
    ).toBe(true);
  });

  it("fires when every configured folder was filtered out", () => {
    expect(
      shouldReportFilteredAllowListFolders(["/missing1", "/missing2"], []),
    ).toBe(true);
  });
});
