import * as assert from "assert";
import { mock, instance, when, anything, verify } from "ts-mockito";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../commandProcessExecution";
import { EventEmitter } from "events";
import { CancellationToken } from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

suite("CommandProcessExecution Tests", () => {
  let mockTerminal: DBTTerminal;
  let factory: CommandProcessExecutionFactory;
  let testDir: string;

  setup(() => {
    mockTerminal = mock(DBTTerminal);
    when(mockTerminal.debug(anything(), anything(), anything())).thenReturn();
    factory = new CommandProcessExecutionFactory(instance(mockTerminal));
    testDir = path.join(
      os.tmpdir(),
      "test-dir-" + Math.random().toString(36).slice(2),
    );
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  teardown(() => {
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  test("should execute command and return output", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "echo",
      args: process.platform === "win32" ? ["/c", "echo test"] : ["test"],
    });

    const result = await execution.complete();
    assert.strictEqual(result.stdout.trim(), "test");
    assert.strictEqual(result.stderr, "");
    verify(mockTerminal.debug(anything(), anything(), anything())).called();
  });

  test("should handle command errors", async () => {
    const execution = factory.createCommandProcessExecution({
      command: "nonexistentcommand",
    });

    try {
      await execution.complete();
      assert.fail("Expected error was not thrown");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.ok((error as Error).message.includes("ENOENT"));
    }
  });

  test("should handle command with environment variables", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "printenv",
      args:
        process.platform === "win32" ? ["/c", "echo %TEST_VAR%"] : ["TEST_VAR"],
      envVars: { TEST_VAR: "test_value" },
    });

    const result = await execution.complete();
    assert.strictEqual(result.stdout.trim(), "test_value");
  });

  test("should handle command cancellation", async () => {
    // Create a mock cancellation token
    const emitter = new EventEmitter();
    const mockToken = {
      isCancellationRequested: false,
      onCancellationRequested: (callback: () => void) => {
        emitter.on("cancel", callback);
        return { dispose: () => emitter.removeListener("cancel", callback) };
      },
    } as CancellationToken;

    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "timeout" : "sleep",
      args: process.platform === "win32" ? ["/t", "2"] : ["2"],
      tokens: [mockToken],
    });

    const promise = execution.complete();
    // Trigger cancellation
    emitter.emit("cancel");

    try {
      await promise;
      assert.fail("Expected error was not thrown");
    } catch (error) {
      assert.ok(error instanceof Error);
    }
  });

  test("should handle command with working directory", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "sh",
      args: process.platform === "win32" ? ["/c", "cd"] : ["-c", "pwd"],
      cwd: testDir,
    });

    const result = await execution.complete();
    const normalizedOutput = path.normalize(result.stdout.trim());
    const normalizedTestDir = path.normalize(testDir);
    assert.ok(
      normalizedOutput.toLowerCase().includes(normalizedTestDir.toLowerCase()),
      `Expected path to include ${normalizedTestDir}, but got ${normalizedOutput}`,
    );
  });

  test("should handle command with stderr output", async function () {
    this.timeout(5000); // Increase timeout to 5 seconds
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "sh",
      args:
        process.platform === "win32"
          ? ["/c", "echo error 1>&2"]
          : ["-c", "echo error >&2"],
    });

    const result = await execution.complete();
    assert.strictEqual(result.stderr.trim(), "error");
  });
});
