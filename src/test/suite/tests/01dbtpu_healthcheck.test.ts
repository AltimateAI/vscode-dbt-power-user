import * as vscode from "vscode";
import * as assert from "assert";

import { DBTProjectContainer } from "../../../manifest/dbtProjectContainer";
import { Container } from "inversify";

suite("Extension setup healthcheck Suite", () => {
  let container: Container;
  setup("Load Extension", async () => {
    const ext = vscode.extensions.getExtension(
      "innoverio.vscode-dbt-power-user",
    );
    container = await ext!.activate();
    console.log("extension activated");
  });

  test("if vscode loaded all dbt projects", async () => {
    const dbtProjectContainer = container.get(DBTProjectContainer);
    // assert.equal(dbtProjectContainer.dbtDetected, true);
    const projCount = dbtProjectContainer.getProjects().length;
    assert(projCount !== undefined);
    assert.equal(projCount, 3);
  });
});
