import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import { mock, instance, when, anything, verify } from "ts-mockito";
import { DBTTerminal } from "../../dbt_integration/terminal";
import { VSCodeDBTTerminal } from "../../dbt_client/vscodeTerminal";
import { CommandProcessExecutionFactory } from "../../dbt_integration/commandProcessExecution";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

describe("CommandProcessExecution Tests", () => {
  let mockTerminal: DBTTerminal;
  let factory: CommandProcessExecutionFactory;
  let testDir: string;

  beforeEach(() => {
    mockTerminal = mock(VSCodeDBTTerminal);
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

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it("should execute command and return output", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "echo",
      args: process.platform === "win32" ? ["/c", "echo test"] : ["test"],
    });

    const result = await execution.complete();
    expect(result.stdout.trim()).toBe("test");
    expect(result.stderr).toBe("");
    verify(mockTerminal.debug(anything(), anything(), anything())).called();
  });

  it("should handle command errors", async () => {
    const execution = factory.createCommandProcessExecution({
      command: "nonexistentcommand",
    });

    await expect(execution.complete()).rejects.toThrow(/ENOENT/);
  });

  it("should handle command with environment variables", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "printenv",
      args:
        process.platform === "win32" ? ["/c", "echo %TEST_VAR%"] : ["TEST_VAR"],
      envVars: { TEST_VAR: "test_value" },
    });

    const result = await execution.complete();
    expect(result.stdout.trim()).toBe("test_value");
  });

  it("should handle command with working directory", async () => {
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "sh",
      args: process.platform === "win32" ? ["/c", "cd"] : ["-c", "pwd"],
      cwd: testDir,
    });

    const result = await execution.complete();
    const normalizedOutput = path.normalize(result.stdout.trim());
    const normalizedTestDir = path.normalize(testDir);
    expect(normalizedOutput.toLowerCase()).toContain(
      normalizedTestDir.toLowerCase(),
    );
  });

  it("should handle command with stderr output", async () => {
    jest.setTimeout(5000); // Increase timeout to 5 seconds
    const execution = factory.createCommandProcessExecution({
      command: process.platform === "win32" ? "cmd" : "sh",
      args:
        process.platform === "win32"
          ? ["/c", "echo error 1>&2"]
          : ["-c", "echo error >&2"],
    });

    const result = await execution.complete();
    expect(result.stderr.trim()).toBe("error");
  });
});
