// hello.test.ts

import * as assert from "assert";
import * as vscode from "vscode";

suite("Hello Tests", () => {
  test("Says hello", () => {
    assert.equal("hello", "hello");
  });
});

export function run() {
  const reporter = new vscode.TestRunReporter();
  try {
    const suite = suite("Hello Tests");
    suite.run();
  } catch (err) {
    reporter.error(err);
  } finally {
    reporter.done();
  }
}
