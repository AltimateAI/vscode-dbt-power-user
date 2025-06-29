import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  DBTCloudDetection,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { anything, instance, mock, when } from "ts-mockito";
import { workspace } from "vscode";
import { VSCodeDBTTerminal } from "../../dbt_client/vscodeTerminal";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";

describe("DBTCloudDetection Tests", () => {
  let mockCommandProcessExecutionFactory: CommandProcessExecutionFactory;
  let mockPythonEnvironment: PythonEnvironment;
  let mockTerminal: DBTTerminal;
  let mockCommandProcessExecution: CommandProcessExecution;
  let dbtCloudDetection: DBTCloudDetection;

  beforeEach(() => {
    mockCommandProcessExecutionFactory = mock(CommandProcessExecutionFactory);
    mockPythonEnvironment = mock(PythonEnvironment);
    mockTerminal = mock(VSCodeDBTTerminal);
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

  afterEach(() => {
    // Reset workspace.workspaceFolders
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => undefined,
      configurable: true,
    });
  });

  it("should return true for supported dbt Cloud CLI version", async () => {
    when(mockCommandProcessExecution.complete()).thenResolve({
      stdout: "dbt Cloud CLI - 0.38.0",
      stderr: "",
      fullOutput: "dbt Cloud CLI - 0.38.0",
    });

    const result = await dbtCloudDetection.detectDBT();
    expect(result).toBe(true);
  });

  it.skip("should return false for unsupported dbt Cloud CLI version", async () => {
    when(mockCommandProcessExecution.complete()).thenResolve({
      stdout: "dbt Cloud CLI - 0.35.0",
      stderr: "",
      fullOutput: "dbt Cloud CLI - 0.35.0",
    });

    const result = await dbtCloudDetection.detectDBT();
    expect(result).toBe(false);
  });

  it("should return false when command execution fails", async () => {
    when(mockCommandProcessExecution.complete()).thenReject(
      new Error("Command failed"),
    );

    const result = await dbtCloudDetection.detectDBT();
    expect(result).toBe(false);
  });
});
