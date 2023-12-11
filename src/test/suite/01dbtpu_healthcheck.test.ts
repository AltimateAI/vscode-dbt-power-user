import * as assert from "assert";
import { waitForDebugger } from "inspector";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { container } from "../../inversify.config";

suite("Extension setup healthcheck Suite", () => {
  test("Can verify extension init", async () => {
    // turning extension on does not seem to work.
    // have to individually run the steps from activate function.
    // const ext = vscode.extensions.getExtension(
    //   "innoverio.vscode-dbt-power-user",
    // );
    // const dbtPowerUserExtension = await ext?.activate();
    // const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
    // const dbtPowerUserExtension = dbtpu.activate(vs);
    //dbtPowerUserExtension.activate(vscode.ExtensionContext);
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
});
