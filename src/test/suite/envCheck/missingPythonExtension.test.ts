import * as vscode from "vscode";
import * as assert from "assert";

suite("Extension setup healthcheck Suite", () => {
  test("should not load any dbt project", async () => {
    const ext = vscode.extensions.getExtension(
      "innoverio.vscode-dbt-power-user",
    );
    try {
      await ext!.activate();
    } catch (err) {
      assert.equal(
        (err as Error).message,
        "Cannot activate the 'dbt Power User' extension because it depends on unknown extension 'ms-python.python'",
      );
    }
  });
});
