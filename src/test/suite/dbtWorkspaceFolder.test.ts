import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";

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
  // The real `contains`, on a folder built without the DI setup.
  function contains(
    uriFsPath: string | undefined,
    workspaceFsPath: string,
  ): boolean {
    const folder = Object.create(DBTWorkspaceFolder.prototype);
    folder.workspaceFolder = { uri: { fsPath: workspaceFsPath } };
    return folder.contains({ fsPath: uriFsPath });
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
