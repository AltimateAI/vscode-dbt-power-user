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

describe("DBTCoreProjectIntegration Tests", () => {
  let dbtCoreProjectIntegration: DBTCoreProjectIntegration;
  let mockPythonBridge: jest.Mocked<any>;
  let mockTelemetry: jest.Mocked<TelemetryService>;

  beforeEach(() => {
    // Create mock dependencies
    const container = new Container();

    // Mock all required dependencies
    mockPythonBridge = {
      lock: jest.fn(),
    };

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
    } as any;

    const mockExecutionInfrastructure = {
      createPythonBridge: () => mockPythonBridge,
      createQueue: () => {},
    };

    const mockUri = "/test/project/root";
    const mockProjectConfigDiagnostics: DBTDiagnosticData[] = [];

    // Create mock event emitter for Python environment changes
    const mockPythonEnvChangeEmitter = new EventEmitter<Uri | undefined>();

    const mockDeferConfig: DeferConfig = {
      deferToProduction: false,
      favorState: false,
      manifestPathForDeferral: null,
    };

    // Create the instance directly with constructor injection
    dbtCoreProjectIntegration = new DBTCoreProjectIntegration(
      mockExecutionInfrastructure as any,
      {
        onPythonEnvironmentChanged: mockPythonEnvChangeEmitter.event,
        pythonPath: "/usr/bin/python3",
        environmentVariables: {},
      } as any,
      mockTelemetry,
      {} as PythonDBTCommandExecutionStrategy,
      {} as (
        projectRoot: string,
        dbtPath: string,
      ) => CLIDBTCommandExecutionStrategy,
      {} as AltimateRequest,
      {
        debug: () => {},
        error: () => {},
        log: () => {},
      } as any,
      {} as ValidationProvider,
      mockUri,
      mockProjectConfigDiagnostics,
      mockDeferConfig,
    );

    (dbtCoreProjectIntegration as any).python = mockPythonBridge;
  });
});

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
      cwd: "/test/workspace",
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
      cwd: "/test/workspace",
      envVars: {},
    });
  });
});
