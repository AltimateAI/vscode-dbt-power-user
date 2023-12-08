// uriHandler.test.ts

import * as assert from "assert";
import * as vscode from "vscode";

suite("URI Handler", () => {
  test("Sets config values from URI", async () => {
    // Construct test URI
    const testUri = vscode.Uri.parse(
      "vscode:extension/innoverio.vscode-dbt-power-user2?key=sk-abcd&instance=mycompany",
    );

    let passedParams;

    // Register temp handler
    await vscode.workspace.registerUriHandler({
      handleUri(uri) {
        passedParams = uri;
      },
    });

    // Simulate URI invoke
    await vscode.env.asExternalUri(testUri);

    // Assert handler was called
    assert(passedParams.toString() === testUri.toString());

    // Get config
    const config = vscode.workspace.getConfiguration();

    // Assert values set
    assert(config.get("key") === "foo");
    assert(config.get("value") === "bar");
  });
});

export function run() {
  const reporter = new TestRunReporter();

  try {
    suite.run();
  } catch (err) {
    reporter.error(err);
  } finally {
    reporter.done();
  }
}
