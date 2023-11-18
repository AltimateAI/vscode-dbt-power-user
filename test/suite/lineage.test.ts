import * as assert from "assert";
import * as vscode from "vscode";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { NewLineagePanel } from "../../src/webview_provider/newLineagePanel";
import { LineagePanel } from "../../src/webview_provider/lineagePanel";
import { DBTProjectContainer } from "../../src/manifest/dbtProjectContainer";
import { container } from "../../src/inversify.config";
import path = require("path");

suite("Lineage Test Suite", () => {
  setup("Load Extension", async () => {
    const ext = vscode.extensions.getExtension(
      "innoverio.vscode-dbt-power-user",
    );
    const dbtPowerUserExtension = await ext!.activate();
  });
  test("Can load lineage for model", async () => {
    const model_uri = vscode.Uri.file(
      path.join(
        vscode.workspace.workspaceFolders![0].uri.path,
        "jaffle_shop_duckdb/models/customers.sql",
      ),
    );
    const lineage_panel = container.get(LineagePanel);
    const document = await vscode.workspace.openTextDocument(model_uri);
    const editor = await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
    const dockeys = lineage_panel.eventMap.keys();
    assert.equal(Array.from(dockeys).length, 1);
  });
});
