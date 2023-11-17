import * as assert from "assert";
import { waitForDebugger } from "inspector";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { DBTProjectContainer } from "../../src/manifest/dbtProjectContainer";
import { container } from "../../src/inversify.config";

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
  });
});
