import * as assert from "assert";
import * as vscode from "vscode";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { NewLineagePanel } from "../../src/webview_provider/newLineagePanel";
import { DBTProjectContainer } from "../../src/manifest/dbtProjectContainer";
import { container } from "../../src/inversify.config";
import path = require("path");

suite("Lineage Test Suite", () => {
  test("Load Extension", async () => {
    const dbtProjectContainer = container.get(DBTProjectContainer);
    await dbtProjectContainer.detectDBT();
    assert.equal(dbtProjectContainer.dbtDetected, true);
    await dbtProjectContainer
      .initializeDBTProjects()
      .catch((err: string | Error | undefined) => {
        assert.fail(err);
      });
    const projCount = dbtProjectContainer.getProjects().length;
    assert(projCount !== undefined);
    assert.equal(projCount, 3);
  });
  test("Can load lineage for model", async () => {
    const model_uri = vscode.Uri.file(
      path.join(
        vscode.workspace.workspaceFolders![0].uri.path,
        "jaffle_shop_duckdb/models/customers.sql",
      ),
    );
    const document = await vscode.workspace.openTextDocument(model_uri);
    const editor = await vscode.window.showTextDocument(document);
    const lineage_panel = container.get(NewLineagePanel);
    await vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
    const dockeys = lineage_panel.eventMap.keys();
    assert.equal(Array.from(dockeys).length, 1);
  });
});
