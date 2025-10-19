import { expect } from "@jest/globals";
import {
  DBTCoreProjectIntegration,
  DBTCoreDetection,
} from "../../dbt_client/dbtCoreIntegration";
import { Container } from "inversify";
import {
  CLIDBTCommandExecutionStrategy,
  PythonDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
} from "../../dbt_client/dbtIntegration";
import { TelemetryService } from "../../telemetry";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { AltimateRequest } from "../../altimate";
import { ValidationProvider } from "../../validation_provider";
import { DeferToProdService } from "../../services/deferToProdService";
import { Uri, workspace, languages, EventEmitter } from "vscode";
import {
  CommandProcessExecutionFactory,
  CommandProcessExecution,
} from "../../commandProcessExecution";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

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

    const mockUri = Uri.file("/test/project/root");
    const mockDiagnosticCollection =
      languages.createDiagnosticCollection("dbt-project-config");

    // Create mock event emitter for Python environment changes
    const mockPythonEnvChangeEmitter = new EventEmitter<Uri | undefined>();

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
        projectRoot: Uri,
        dbtPath: string,
      ) => CLIDBTCommandExecutionStrategy,
      {} as DBTProjectContainer,
      {} as AltimateRequest,
      {
        debug: () => {},
        error: () => {},
        log: () => {},
      } as any,
      {} as ValidationProvider,
      {} as DeferToProdService,
      mockUri,
      mockDiagnosticCollection,
    );

    (dbtCoreProjectIntegration as any).python = mockPythonBridge;
  });

  it.skip("validateSql should return validation result for valid SQL", async () => {
    // Arrange
    const query = "SELECT * FROM my_table";
    const dialect = "postgres";
    const models = {};
    const expectedResult = {
      valid: true,
      errors: [],
    };

    mockPythonBridge.lock.mockResolvedValue(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockPythonBridge.lock).toHaveBeenCalledTimes(1);
    const lockCall = mockPythonBridge.lock.mock.calls[0][0];
    expect(lockCall.toString()).toContain("validate_sql");
  });

  it.skip("validateSql should handle invalid SQL", async () => {
    const query = "SELECT * FREM my_table"; // Intentional typo
    const dialect = "postgres";
    const models = {};
    const expectedResult = {
      valid: false,
      errors: [
        {
          message: 'syntax error at or near "FREM"',
          line: 1,
          column: 8,
        },
      ],
    };

    mockPythonBridge.lock.mockResolvedValue(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockPythonBridge.lock).toHaveBeenCalledTimes(1);
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
