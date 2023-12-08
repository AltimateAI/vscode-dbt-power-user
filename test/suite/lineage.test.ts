import * as assert from "assert";
import * as vscode from "vscode";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import { NewLineagePanel } from "../../src/webview_provider/newLineagePanel";
// import { LineagePanel } from "../../src/webview_provider/lineagePanel";
import { DBTProjectContainer } from "../../src/manifest/dbtProjectContainer";
import path = require("path");
import { Container } from "inversify";
import { DBTWorkspaceFolder } from "../../src/manifest/dbtWorkspaceFolder";

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
        "models/mart/mart_fullmoon_reviews.sql",
      ),
    );
    const projectContainer: DBTWorkspaceFolder = container.get(
      "Factory<DBTWorkspaceFolder>",
    )(
      model_uri,
      () => {
        console.log("manifest changed");
      },
      () => {
        console.log("project registered");
      },
    );

    assert.equal(projectContainer.getProjects().length, 1);

    // const doc = await vscode.workspace.openTextDocument(model_uri);
    // const editor = await vscode.window.showTextDocument(doc);
    // await vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
    // const dockeys = projectContainer.eventMap.keys();
    // assert.equal(Array.from(dockeys).length, 1);
  });
});
