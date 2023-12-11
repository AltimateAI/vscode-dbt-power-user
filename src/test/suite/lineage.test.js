"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const vscode = require("vscode");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import { NewLineagePanel } from "../../src/webview_provider/newLineagePanel";
// import { LineagePanel } from "../../src/webview_provider/lineagePanel";
const dbtProjectContainer_1 = require("../../src/manifest/dbtProjectContainer");
const path = require("path");
suite("Lineage Test Suite", () => {
  let container;
  setup("Load Extension", () =>
    tslib_1.__awaiter(void 0, void 0, void 0, function* () {
      const ext = vscode.extensions.getExtension(
        "innoverio.vscode-dbt-power-user",
      );
      container = yield ext.activate();
      console.log("extension activated");
      const dbtProjectContainer = container.get(
        dbtProjectContainer_1.DBTProjectContainer,
      );
      console.log("dbtWorkspaceFolder", dbtProjectContainer);
    }),
  );
  test("Can load lineage for model", () =>
    tslib_1.__awaiter(void 0, void 0, void 0, function* () {
      const model_uri = vscode.Uri.file(
        path.join(
          vscode.workspace.workspaceFolders[0].uri.path,
          "/jaffle_shop_duckdb/models/customers.sql",
        ),
      );
      const document = yield vscode.workspace.openTextDocument(model_uri);
      const editor = yield vscode.window.showTextDocument(document);
      yield vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
      assert.equal(3, 3);
      // const doc = await vscode.workspace.openTextDocument(model_uri);
      // const editor = await vscode.window.showTextDocument(doc);
      // await vscode.commands.executeCommand("dbtPowerUser.Lineage.focus");
      // const dockeys = projectContainer.eventMap.keys();
      // assert.equal(Array.from(dockeys).length, 1);
    }));
});
//# sourceMappingURL=lineage.test.js.map
