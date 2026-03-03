import * as assert from "assert";
import * as vscode from "vscode";

suite("PythonEnvironment per-folder .env loading", () => {
  test("workspace folders resolve to correct fixture paths", () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length < 2) {
      // Skip when not running in multi-root workspace
      return;
    }

    const firstFolder = folders[0];
    const secondFolder = folders[1];

    assert.ok(
      firstFolder.uri.fsPath.endsWith("first-dbt-project"),
      `First folder should be first-dbt-project, got: ${firstFolder.uri.fsPath}`,
    );
    assert.ok(
      secondFolder.uri.fsPath.endsWith("second-dbt-project"),
      `Second folder should be second-dbt-project, got: ${secondFolder.uri.fsPath}`,
    );
  });

  test("each fixture folder has its own .env file", async () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length < 2) {
      return;
    }

    for (const folder of folders) {
      const envUri = vscode.Uri.joinPath(folder.uri, ".env");
      const stat = await vscode.workspace.fs.stat(envUri);
      assert.ok(stat, `.env should exist in ${folder.uri.fsPath}`);
    }
  });

  test("${workspaceFolder} in python.envFile is configured", () => {
    const config = vscode.workspace.getConfiguration("python");
    const envFile = config.get<string>("envFile");
    assert.strictEqual(
      envFile,
      "${workspaceFolder}/.env",
      "python.envFile should be set to ${workspaceFolder}/.env",
    );
  });

  test("getWorkspaceFolder resolves URIs to correct folders", () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length < 2) {
      return;
    }

    const uri1 = vscode.Uri.joinPath(folders[0].uri, "models/example.sql");
    const uri2 = vscode.Uri.joinPath(folders[1].uri, "models/example.sql");

    const resolved1 = vscode.workspace.getWorkspaceFolder(uri1);
    const resolved2 = vscode.workspace.getWorkspaceFolder(uri2);

    assert.strictEqual(
      resolved1?.uri.fsPath,
      folders[0].uri.fsPath,
      "URI in first folder should resolve to first workspace folder",
    );
    assert.strictEqual(
      resolved2?.uri.fsPath,
      folders[1].uri.fsPath,
      "URI in second folder should resolve to second workspace folder",
    );
  });
});
