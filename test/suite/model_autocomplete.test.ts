import * as assert from "assert";
import * as vscode from "vscode";
import { app } from "@vscode/test-electron";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { ModelAutocompletionProvider } from "../../src/autocompletion_provider/modelAutocompletionProvider";
import { container } from "../../src/inversify.config";
import path = require("path");

suite("Auto complete Test Suite", () => {
  setup("Load Extension", async () => {
    // const ext = vscode.extensions.getExtension(
    //   "innoverio.vscode-dbt-power-user",
    // );
    // const dbtPowerUserExtension = await ext!.activate();
    container.snapshot();
  });
  teardown("Reset Extension", async () => {
    container.restore();
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
    const modelKeys = modelProvider.modelAutocompleteMap.get(project_path);
    // assert.equal(modelKeys!.length, 1);
  });
});
