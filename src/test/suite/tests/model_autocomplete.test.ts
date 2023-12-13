import * as assert from "assert";
import * as vscode from "vscode";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import path = require("path");
import { Container } from "inversify";
import { ModelAutocompletionProvider } from "../../../autocompletion_provider/modelAutocompletionProvider";

suite("Auto complete Test Suite", () => {
  let container: Container;
  setup("Load Extension", async () => {
    const ext = vscode.extensions.getExtension(
      "innoverio.vscode-dbt-power-user",
    );
    container = await ext!.activate();
    console.log("extension activated");
  });
  test("Can view models in autocomplete", async () => {
    const project_path = path.join(
      vscode.workspace.workspaceFolders![0].uri.path,
      "jaffle_shop_duckdb",
    );
    const modelProvider = container.get(ModelAutocompletionProvider);
    // const ext = vscode.extensions.getExtension(
    //   "innoverio.vscode-dbt-power-user",
    // );
    // const dbtPowerUserExtension = await ext!.activate();
    // const modelKeys = modelProvider.modelAutocompleteMap.get(project_path);
    // assert.equal(modelKeys!.length, 1);
  });
});
