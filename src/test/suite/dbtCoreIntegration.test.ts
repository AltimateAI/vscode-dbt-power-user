import { expect } from "@jest/globals";
import {
  DBTCoreProjectIntegration,
  DBTCoreDetection,
} from "../../dbt_client/dbtCoreIntegration";
import { DBTDiagnosticData } from "../../dbt_client/diagnostics";
import { Container } from "inversify";
import {
  CLIDBTCommandExecutionStrategy,
  DeferConfig,
  PythonDBTCommandExecutionStrategy,
} from "../../dbt_client/dbtIntegration";
import { TelemetryService } from "../../telemetry";
import { AltimateRequest } from "../../altimate";
import { ValidationProvider } from "../../validation_provider";
import { DBTConfiguration } from "../../dbt_client/configuration";
import { Uri, workspace, EventEmitter } from "vscode";
import {
  CommandProcessExecutionFactory,
  CommandProcessExecution,
} from "../../commandProcessExecution";

// Mock workspace folders
jest.mock("vscode", () => ({
  ...jest.requireActual("vscode"),
  workspace: {
    workspaceFolders: [
      {
        uri: {
          fsPath: "/test/workspace",
        },
      },
    ],
  },
}));

// Note: DBTCoreProjectIntegration tests are temporarily disabled
// TODO: Add proper tests for DBTCoreProjectIntegration

describe("DBTCoreDetection Tests", () => {
  let dbtCoreDetection: DBTCoreDetection;
  let mockCommandProcessExecutionFactory: jest.Mocked<CommandProcessExecutionFactory>;
  let mockPythonEnvironment: jest.Mocked<any>;

  beforeEach(() => {
    // Create mock dependencies
    mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: jest.fn(),
    } as any;

    mockPythonEnvironment = {
      pythonPath: "/usr/bin/python3",
      environmentVariables: {},
    } as any;

    // Create the instance with mocked dependencies
    dbtCoreDetection = new DBTCoreDetection(
      mockPythonEnvironment,
      mockCommandProcessExecutionFactory,
    );
  });

  it("should detect dbt when python import succeeds", async () => {
    // Arrange
    const mockProcess = {
      complete: jest.fn().mockResolvedValue({ stdout: "", stderr: "" }),
      disposables: [],
      terminal: undefined,
      command: "",
      spawn: jest.fn(),
      kill: jest.fn(),
      dispose: jest.fn(),
      completeWithTerminalOutput: jest.fn(),
      formatText: jest.fn(),
    } as unknown as CommandProcessExecution;

    mockCommandProcessExecutionFactory.createCommandProcessExecution.mockReturnValue(
      mockProcess,
    );

    // Mock workspace folders
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => [{ uri: { fsPath: "/test/workspace" } }],
      configurable: true,
    });

    // Act
    const result = await dbtCoreDetection.detectDBT();

    // Assert
    expect(result).toBe(true);
    expect(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
    ).toHaveBeenCalledWith({
      command: "/usr/bin/python3",
      args: ["-c", "import dbt"],
      envVars: {},
    });
  });

  it("should return false when dbt import fails", async () => {
    // Arrange
    const mockProcess = {
      complete: jest
        .fn()
        .mockRejectedValue(
          new Error("ModuleNotFoundError: No module named 'dbt'"),
        ),
      disposables: [],
      terminal: undefined,
      command: "",
      spawn: jest.fn(),
      kill: jest.fn(),
      dispose: jest.fn(),
      completeWithTerminalOutput: jest.fn(),
      formatText: jest.fn(),
    } as unknown as CommandProcessExecution;

    mockCommandProcessExecutionFactory.createCommandProcessExecution.mockReturnValue(
      mockProcess,
    );

    // Mock workspace folders
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => [{ uri: { fsPath: "/test/workspace" } }],
      configurable: true,
    });

    // Act
    const result = await dbtCoreDetection.detectDBT();

    // Assert
    expect(result).toBe(false);
    expect(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
    ).toHaveBeenCalledWith({
      command: "/usr/bin/python3",
      args: ["-c", "import dbt"],
      envVars: {},
    });
  });
});
