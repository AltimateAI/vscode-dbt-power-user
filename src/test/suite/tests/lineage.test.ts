import * as assert from "assert";
import * as vscode from "vscode";
import { DBTProjectContainer } from "../../../manifest/dbtProjectContainer";
import path = require("path");
import { Container } from "inversify";
import { LineagePanel } from "../../../webview_provider/lineagePanel";

suite("Lineage Test Suite", () => {
  let container: Container;
  setup("Load Extension", async () => {
    const ext = vscode.extensions.getExtension(
      "innoverio.vscode-dbt-power-user",
    );
    container = await ext!.activate();
    console.log("extension activated");
  });
  test("Can load lineage for model", async () => {
    const model_uri = vscode.Uri.file(
      path.join(
        vscode.workspace.workspaceFolders![0].uri.path,
        "/jaffle_shop_duckdb/models/customers.sql",
      ),
    );
    const dbtProjectContainer = container.get(DBTProjectContainer);

    assert.equal(dbtProjectContainer.getProjects().length, 3);

    const lineage_panel = container.get(LineagePanel);
    const doc = await vscode.workspace.openTextDocument(model_uri);
    const editor = await vscode.window.showTextDocument(doc);
    await vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
    // const dockeys = lineage_panel.eventMap.keys();
    // assert.equal(Array.from(dockeys).length, 1);
    // console.log("dockeys", Array.from(dockeys).length);
  });
});
