import * as assert from "assert";
import { mock, instance, when, anything, verify } from "ts-mockito";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../commandProcessExecution";
import { EventEmitter } from "events";
import { CancellationToken } from "vscode";

suite("CommandProcessExecution Tests", () => {
  let mockTerminal: DBTTerminal;
  let factory: CommandProcessExecutionFactory;

  setup(() => {
    mockTerminal = mock(DBTTerminal);
    when(mockTerminal.debug(anything(), anything(), anything())).thenReturn();
    factory = new CommandProcessExecutionFactory(instance(mockTerminal));
  });

  test("should execute command and return output", async () => {
    const execution = factory.createCommandProcessExecution({
      command: "echo",
      args: ["test"],
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
      command: "printenv",
      args: ["TEST_VAR"],
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
      command: "sleep",
      args: ["2"],
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
      command: "pwd",
      cwd: "/tmp",
    });

    const result = await execution.complete();
    // On macOS, /tmp is symlinked to /private/tmp
    const expectedPaths = ["/tmp", "/private/tmp"];
    assert.ok(
      expectedPaths.includes(result.stdout.trim()),
      `Expected path to be one of ${expectedPaths.join(" or ")}, but got ${result.stdout.trim()}`,
    );
  });

  test("should handle command with stderr output", async () => {
    const execution = factory.createCommandProcessExecution({
      command: "sh",
      args: ["-c", "echo error >&2"],
    });

    const result = await execution.complete();
    assert.strictEqual(result.stderr.trim(), "error");
    assert.strictEqual(result.stdout, "");
  });
});
