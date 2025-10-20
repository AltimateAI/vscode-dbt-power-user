import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  DBTCoreDetection,
  DBTCoreProjectIntegration,
} from "@altimateai/dbt-integration";
import { expect } from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { DBTProjectContainer } from "src/dbt_client/dbtProjectContainer";
import { EventEmitter, languages, Uri, workspace } from "vscode";
import { AltimateRequest } from "../../altimate";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  PythonDBTCommandExecutionStrategy,
} from "../../dbt_client/dbtIntegration";
import { TelemetryService } from "../../telemetry";
import { ValidationProvider } from "../../validation_provider";

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

describe("DBTCoreProjectIntegration - dbt-loom config", () => {
  let mockExecutionInfrastructure: jest.Mocked<DBTCommandExecutionInfrastructure>;
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let mockPythonBridge: jest.Mocked<any>;
  let tempDir: string;

  beforeEach(() => {
    // Create a temporary directory for testing
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "dbt-test-"));

    // Create mock dependencies
    mockPythonBridge = {
      lock: jest.fn(),
      ex: jest.fn(),
      connected: true,
    };

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
    } as any;

    mockExecutionInfrastructure = {
      createPythonBridge: jest.fn().mockReturnValue(mockPythonBridge),
      createQueue: jest.fn(),
    } as any;
  });

  afterEach(() => {
    // Clean up temporary directory
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    jest.clearAllMocks();
  });

  it("should set DBT_LOOM_CONFIG_PATH when dbt_loom.config.yml exists", () => {
    // Arrange
    const projectRoot = Uri.file(tempDir);
    const dbtLoomConfigPath = path.join(tempDir, "dbt_loom.config.yml");

    // Create the dbt_loom.config.yml file
    fs.writeFileSync(dbtLoomConfigPath, "# Test config file");

    const mockDiagnosticCollection =
      languages.createDiagnosticCollection("dbt-project-config");
    const mockPythonEnvChangeEmitter = new EventEmitter<Uri | undefined>();

    // Act
    new DBTCoreProjectIntegration(
      mockExecutionInfrastructure as any,
      {
        onPythonEnvironmentChanged: mockPythonEnvChangeEmitter.event,
        pythonPath: "/usr/bin/python3",
        environmentVariables: {},
      } as any,
      mockTelemetry,
      {} as PythonDBTCommandExecutionStrategy,
      {} as (
        projectRoot: Uri,
        dbtPath: string,
      ) => CLIDBTCommandExecutionStrategy,
      {} as DBTProjectContainer,
      {} as AltimateRequest,
      {
        debug: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
      } as any,
      {} as ValidationProvider,
      {} as DeferToProdService,
      projectRoot,
      mockDiagnosticCollection,
    );

    // Assert
    expect(mockExecutionInfrastructure.createPythonBridge).toHaveBeenCalledWith(
      tempDir,
      {
        DBT_LOOM_CONFIG_PATH: dbtLoomConfigPath,
      },
    );
  });

  it("should not set DBT_LOOM_CONFIG_PATH when dbt_loom.config.yml does not exist", () => {
    // Arrange
    const projectRoot = Uri.file(tempDir);
    // Explicitly NOT creating the dbt_loom.config.yml file

    const mockDiagnosticCollection =
      languages.createDiagnosticCollection("dbt-project-config");
    const mockPythonEnvChangeEmitter = new EventEmitter<Uri | undefined>();

    // Act
    new DBTCoreProjectIntegration(
      mockExecutionInfrastructure as any,
      {
        onPythonEnvironmentChanged: mockPythonEnvChangeEmitter.event,
        pythonPath: "/usr/bin/python3",
        environmentVariables: {},
      } as any,
      mockTelemetry,
      {} as PythonDBTCommandExecutionStrategy,
      {} as (
        projectRoot: Uri,
        dbtPath: string,
      ) => CLIDBTCommandExecutionStrategy,
      {} as DBTProjectContainer,
      {} as AltimateRequest,
      {
        debug: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
      } as any,
      {} as ValidationProvider,
      {} as DeferToProdService,
      projectRoot,
      mockDiagnosticCollection,
    );

    // Assert
    expect(mockExecutionInfrastructure.createPythonBridge).toHaveBeenCalledWith(
      tempDir,
      {}, // Empty env object when file doesn't exist
    );
  });
});
