import * as assert from "assert";
import { DBTCloudDetection } from "../../dbt_client/dbtCloudIntegration";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../commandProcessExecution";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { mock, instance, when, anything } from "ts-mockito";
import { workspace } from "vscode";

suite("DBTCloudDetection Tests", () => {
  let mockCommandProcessExecutionFactory: CommandProcessExecutionFactory;
  let mockPythonEnvironment: PythonEnvironment;
  let mockTerminal: DBTTerminal;
  let mockCommandProcessExecution: CommandProcessExecution;
  let dbtCloudDetection: DBTCloudDetection;

  setup(() => {
    mockCommandProcessExecutionFactory = mock(CommandProcessExecutionFactory);
    mockPythonEnvironment = mock(PythonEnvironment);
    mockTerminal = mock(DBTTerminal);
    mockCommandProcessExecution = mock<CommandProcessExecution>();

    // Setup default mocks
    when(mockPythonEnvironment.pythonPath).thenReturn("/usr/bin/python3");
    when(mockTerminal.debug(anything(), anything())).thenReturn();
    when(
      mockCommandProcessExecutionFactory.createCommandProcessExecution(
        anything(),
      ),
    ).thenReturn(instance(mockCommandProcessExecution));

    // Mock workspace.workspaceFolders
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => [{ uri: { fsPath: "/test/workspace" } }],
      configurable: true,
    });

    dbtCloudDetection = new DBTCloudDetection(
      instance(mockCommandProcessExecutionFactory),
      instance(mockPythonEnvironment),
      instance(mockTerminal),
    );
  });

  test("detectDBT should return true for supported dbt Cloud CLI version", async () => {
    when(mockCommandProcessExecution.complete()).thenResolve({
      stdout: "dbt Cloud CLI - 0.38.0",
      stderr: "",
      fullOutput: "dbt Cloud CLI - 0.38.0",
    });

    const result = await dbtCloudDetection.detectDBT();
    assert.strictEqual(result, true);
  });

  test("detectDBT should return false for unsupported dbt Cloud CLI version", async () => {
    when(mockCommandProcessExecution.complete()).thenResolve({
      stdout: "dbt Cloud CLI - 0.35.0",
      stderr: "",
      fullOutput: "dbt Cloud CLI - 0.35.0",
    });

    const result = await dbtCloudDetection.detectDBT();
    assert.strictEqual(result, false);
  });

  test("detectDBT should return false when command execution fails", async () => {
    when(mockCommandProcessExecution.complete()).thenReject(
      new Error("Command failed"),
    );

    const result = await dbtCloudDetection.detectDBT();
    assert.strictEqual(result, false);
  });

  teardown(() => {
    // Reset workspace.workspaceFolders
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => undefined,
      configurable: true,
    });
  });
});
