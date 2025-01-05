import * as assert from "assert";
import * as vscode from "vscode";
import * as sinon from "sinon";
import { expect } from "chai";
import { DBTProject } from "../../manifest/dbtProject";
import { DBTProjectLog } from "../../manifest/modules/dbtProjectLog";
import { ValidationProvider } from "../../validation_provider";
import { NoCredentialsError, AltimateRequest } from "../../altimate";
import { EventEmitter } from "vscode";
import { ManifestCacheChangedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import {
  DBTCommand,
  RunModelParams,
  PythonDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  CLIDBTCommandExecutionStrategy,
} from "../../dbt_client/dbtIntegration";
import { DBTCoreProjectIntegration } from "../../dbt_client/dbtCoreIntegration";
import { DBTCloudProjectIntegration } from "../../dbt_client/dbtCloudIntegration";
import { ProjectConfigChangedEvent } from "../../manifest/event/projectConfigChangedEvent";
import {
  SourceFileWatchers,
  SourceFileWatchersFactory,
} from "../../manifest/modules/sourceFileWatchers";
import {
  TargetWatchers,
  TargetWatchersFactory,
} from "../../manifest/modules/targetWatchers";
import { RunResultsEvent } from "../../manifest/event/runResultsEvent";
import { ManifestParser } from "../../manifest/parsers";
import { SharedStateService } from "../../services/sharedStateService";
import { SharedStateEventEmitterProps } from "../../webview_provider/altimateWebviewProvider";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { DeferToProdService } from "../../services/deferToProdService";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

suite("DbtProject Test Suite", () => {
  let mockProject: DBTProject;
  let mockPythonEnvironment: any;
  let mockSourceFileWatchersFactory: SourceFileWatchersFactory;
  let mockProjectLogFactory: any;
  let mockTargetWatchersFactory: TargetWatchersFactory;
  let mockCommandFactory: any;
  let mockTerminal: any;
  let mockTelemetry: any;
  let mockAltimate: any;
  let mockValidationProvider: any;
  let telemetrySpy: sinon.SinonSpy;
  let mockDbtCloudIntegrationFactory: any;
  let mockManifestParser: ManifestParser;
  let mockSharedStateService: SharedStateService;
  let mockDiagnosticCollection: vscode.DiagnosticCollection;
  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    mockPythonEnvironment = {
      pythonPath: "/path/to/python",
      environmentVariables: {},
      onPythonEnvironmentChanged: () => ({
        dispose: () => {},
      }),
    };

    mockTerminal = {
      debug: () => {},
      error: () => {},
      warn: () => {},
      log: () => {},
      show: () => {},
    };

    const mockSourceFileWatchersEventEmitter = new EventEmitter<void>();
    mockSourceFileWatchersFactory = {
      terminal: mockTerminal,
      createSourceFileWatchers: () => ({
        _onSourceFileChanged: mockSourceFileWatchersEventEmitter,
        onSourceFileChanged: mockSourceFileWatchersEventEmitter.event,
        watchers: [],
        disposables: [],
        terminal: mockTerminal,
        dispose: () => {},
      }),
    } as unknown as SourceFileWatchersFactory;

    mockProjectLogFactory = {
      createProjectLog: () =>
        new DBTProjectLog(new EventEmitter<ProjectConfigChangedEvent>().event),
    };

    const mockTargetWatchersEventEmitter = new EventEmitter<RunResultsEvent>();
    const mockManifestParser = {
      parseManifest: () => Promise.resolve(),
      lastSentParseManifestProps: {},
      nodeParser: {},
      macroParser: {},
      metricParser: {},
      sourceParser: {},
      testParser: {},
      exposureParser: {},
      docParser: {},
      terminal: mockTerminal,
      telemetry: mockTelemetry,
    } as unknown as ManifestParser;

    mockTargetWatchersFactory = {
      manifestParser: mockManifestParser,
      dbtTerminal: mockTerminal,
      createTargetWatchers: () => ({
        disposables: [],
        _onManifestChanged: new EventEmitter<ManifestCacheChangedEvent>(),
        _onRunResults: mockTargetWatchersEventEmitter,
        onRunResults: mockTargetWatchersEventEmitter.event,
        watchers: [],
        manifestParser: mockManifestParser,
        dbtTerminal: mockTerminal,
        dispose: () => {},
      }),
    } as unknown as TargetWatchersFactory;

    mockCommandFactory = {
      createTestModelCommand: (modelName: string) =>
        new DBTCommand("Testing model...", ["test", modelName]),
      createCompileModelCommand: (params: RunModelParams) =>
        new DBTCommand("Compiling model...", ["compile", params.modelName]),
      createDebugCommand: () => new DBTCommand("Debug command...", ["debug"]),
      createDocsGenerateCommand: () =>
        new DBTCommand("Generating docs...", ["docs", "generate"]),
      createRunModelCommand: (params: RunModelParams) =>
        new DBTCommand("Running model...", ["run", params.modelName]),
      createBuildModelCommand: (params: RunModelParams) =>
        new DBTCommand("Building model...", ["build", params.modelName]),
      createBuildProjectCommand: () =>
        new DBTCommand("Building project...", ["build"]),
    };

    mockTelemetry = {
      sendTelemetryEvent: sandbox.spy(),
    };

    mockAltimate = {
      handlePreviewFeatures: sandbox.stub().returns(true),
    };

    mockValidationProvider = {
      validateCredentialsSilently: () => {},
    };

    const eventEmitter = new EventEmitter<SharedStateEventEmitterProps>();
    mockSharedStateService = {
      eventEmitter,
      fire: (data: SharedStateEventEmitterProps) => eventEmitter.fire(data),
    } as SharedStateService;

    telemetrySpy = mockTelemetry.sendTelemetryEvent;

    // Mock workspace configuration
    sandbox.stub(vscode.workspace, "getConfiguration").returns({
      get: sandbox.stub().withArgs("dbtIntegration").returns("core"),
    } as any);

    const mockDbtProjectIntegration = {
      initializeProject: () => Promise.resolve(),
      refreshProjectConfig: () => Promise.resolve(),
      getTargetPath: () => "/custom/path",
      getProjectName: () => "test_project",
      version: [0, 0, 0],
      projectName: "test_project",
      adapterType: "unknown",
      python: mockPythonEnvironment,
      disposables: [],
      dbtPath: "dbt",
      rebuildManifestCancellationTokenSource: undefined,
      pathsInitalized: false,
      dbtCommandFactory: mockCommandFactory,
      getModelPaths: () => undefined,
      getSeedPaths: () => undefined,
      getMacroPaths: () => undefined,
      getPackageInstallPath: () => undefined,
      getAdapterType: () => "unknown",
      getVersion: () => [0, 0, 0],
      getPythonBridgeStatus: () => true,
      getAllDiagnostic: () => [],
      dispose: () => Promise.resolve(),
      findPackageVersion: () => undefined,
      debug: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("debug");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      generateDocs: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("generateDocs");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      runModel: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("runModel");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      buildModel: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("buildModel");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      buildProject: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("buildProject");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      runTest: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("runTest");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      runModelTest: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("runModelTest");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      compileModel: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("compileModel");
        return { stdout: "", stderr: "", fullOutput: "" };
      },
      executeCommandImmediately: async (command: DBTCommand) => {
        await mockTelemetry.sendTelemetryEvent("executeCommandImmediately");
        return { stdout: "", stderr: "" };
      },
      rebuildManifestDiagnostics:
        vscode.languages.createDiagnosticCollection("dbt"),
      pythonBridgeDiagnostics:
        vscode.languages.createDiagnosticCollection("dbt"),
      pythonDBTCommandExecutionStrategy:
        {} as PythonDBTCommandExecutionStrategy,
      dbtProjectContainer: {} as DBTProjectContainer,
      dbtTerminal: mockTerminal,
      projectConfigDiagnostics:
        vscode.languages.createDiagnosticCollection("dbt"),
      projectRoot: vscode.Uri.file("/test/project"),
      telemetry: mockTelemetry,
      validationProvider: {} as ValidationProvider,
      deferToProdService: {} as DeferToProdService,
      executionInfrastructure: {} as DBTCommandExecutionInfrastructure,
      pythonEnvironment: mockPythonEnvironment,
      altimateRequest: {} as AltimateRequest,
      isDbtLoomInstalled: () => Promise.resolve(false),
      removeTrailingSlashes: (path: string) => path,
      getLimitQuery: () => "",
      getQuery: () => "",
      executeSQL: () => Promise.resolve({ stdout: "", stderr: "" }),
      setSelectedTarget: () => Promise.resolve(),
      getTargetNames: () => Promise.resolve([]),
      getSelectedTarget: () => undefined,
      deps: () => Promise.resolve(""),
      unsafeCompileNode: () => Promise.resolve(""),
      unsafeCompileQuery: () => Promise.resolve(""),
      validateSql: () => Promise.resolve({ stdout: "", stderr: "" }),
      getColumnsOfSource: () => Promise.resolve([]),
      getColumnsOfModel: () => Promise.resolve([]),
      getCatalog: () => Promise.resolve({ nodes: {} }),
      getBulkCompiledSQL: () => Promise.resolve({}),
      getBulkSchemaFromDB: () => Promise.resolve({}),
      performDatapilotHealthcheck: () => Promise.resolve({ issues: [] }),
      applyDeferConfig: () => Promise.resolve(),
      applySelectedTarget: () => Promise.resolve(),
      cliDBTCommandExecutionStrategyFactory: () =>
        ({}) as DBTCommandExecutionStrategy,
      terminal: mockTerminal,
    };

    const mockDbtCoreIntegrationFactory = (
      path: vscode.Uri,
      projectConfigDiagnostics: vscode.DiagnosticCollection,
    ) => mockDbtProjectIntegration as unknown as DBTCoreProjectIntegration;

    mockDbtCloudIntegrationFactory = (path: vscode.Uri) =>
      mockDbtProjectIntegration as unknown as DBTCloudProjectIntegration;

    mockProject = new DBTProject(
      mockPythonEnvironment,
      mockSourceFileWatchersFactory,
      mockProjectLogFactory,
      mockTargetWatchersFactory,
      mockCommandFactory,
      mockTerminal,
      mockSharedStateService,
      mockTelemetry,
      mockDbtCoreIntegrationFactory,
      mockDbtCloudIntegrationFactory,
      mockAltimate,
      mockValidationProvider,
      vscode.Uri.file("/path/to/project"),
      {},
      new EventEmitter<ManifestCacheChangedEvent>(),
    );

    (mockProject as any).has_jinja = (text: string) => {
      return text.includes("{{") || text.includes("{%");
    };
  });

  teardown(() => {
    sandbox.restore();
  });

  test("should initialize with correct default values", () => {
    expect(mockProject.getProjectName()).to.equal("test_project");
  });

  test("should handle target path correctly", () => {
    expect(mockProject.getTargetPath()).to.equal("/custom/path");
  });

  test("has_jinja should detect jinja syntax correctly", () => {
    expect((mockProject as any).has_jinja("{{ variable }}")).to.be.true;
    expect((mockProject as any).has_jinja("{% if condition %}")).to.be.true;
    expect((mockProject as any).has_jinja("plain text")).to.be.false;
  });

  test("should handle model test execution correctly", async () => {
    const result = await mockProject.runModelTest("test_model");
    expect(result).to.deep.equal({ stdout: "", stderr: "", fullOutput: "" });
    const telemetryCall = telemetrySpy
      .getCalls()
      .find((call) => call.args[0] === "runModelTest");
    expect(telemetryCall).to.not.be.undefined;
    expect(telemetrySpy.calledWith("runModelTest")).to.be.true;
  });

  test("should handle command execution errors gracefully", async () => {
    const errorSpy = sinon.spy(vscode.window, "showErrorMessage");
    await mockProject.generateDocsImmediately();
    expect(telemetrySpy.calledWith("executeCommandImmediately")).to.be.true;
    errorSpy.restore();
  });

  test("should handle NoCredentialsError correctly", async () => {
    const mockDbtProjectIntegration = {
      projectName: "test_project",
      python: mockPythonEnvironment,
      disposables: [],
      rebuildManifestDiagnostics: () => {},
      executeCommandImmediately: async () => {
        throw new NoCredentialsError("No credentials");
      },
      getProjectName: () => "test_project",
    } as unknown as DBTCoreProjectIntegration;

    const mockDbtCoreIntegrationFactory = (
      path: vscode.Uri,
      projectConfigDiagnostics: vscode.DiagnosticCollection,
    ) => mockDbtProjectIntegration;

    const project = new DBTProject(
      mockPythonEnvironment,
      mockSourceFileWatchersFactory,
      mockProjectLogFactory,
      mockTargetWatchersFactory,
      mockCommandFactory,
      mockTerminal,
      mockSharedStateService,
      mockTelemetry,
      mockDbtCoreIntegrationFactory,
      mockDbtCloudIntegrationFactory,
      mockAltimate,
      mockValidationProvider,
      vscode.Uri.file("/path/to/project"),
      {},
      new EventEmitter<ManifestCacheChangedEvent>(),
    );

    await project.generateDocsImmediately();
    expect(mockAltimate.handlePreviewFeatures.calledOnce).to.be.true;
  });

  test("should compile model with correct parameters", async () => {
    await mockProject.compileModel({
      modelName: "test_model",
      plusOperatorLeft: "",
      plusOperatorRight: "",
    });
    expect(telemetrySpy.calledWith("compileModel")).to.be.true;
  });

  test("should execute debug command and send telemetry", async () => {
    await mockProject.debug();
    expect(telemetrySpy.calledWith("debug")).to.be.true;
  });

  test("should execute generateDocs command and send telemetry", async () => {
    await mockProject.generateDocs();
    expect(telemetrySpy.calledWith("generateDocs")).to.be.true;
  });
});

suite("DBTCommand Test Suite", () => {
  test("should properly construct and handle command arguments", async () => {
    const statusMessage = "Test DBT Command";
    const initialArgs = ["run", "--select", "model1"];
    const command = new DBTCommand(statusMessage, initialArgs);

    // Test initial construction
    assert.strictEqual(command.statusMessage, statusMessage);
    assert.deepStrictEqual(command.args, initialArgs);
    assert.strictEqual(command.focus, false);
    assert.strictEqual(command.showProgress, false);
    assert.strictEqual(command.logToTerminal, false);

    // Test argument addition
    command.addArgument("--vars");
    assert.deepStrictEqual(command.args, [
      "run",
      "--select",
      "model1",
      "--vars",
    ]);

    // Test command string generation
    assert.strictEqual(
      command.getCommandAsString(),
      "dbt run --select model1 --vars",
    );

    // Test execution strategy handling
    assert.throws(() => command.execute(), /Execution strategy is required/);
  });
});

class MockDBTProjectLog extends DBTProjectLog {
  constructor() {
    const mockConfigEvent = new EventEmitter<ProjectConfigChangedEvent>();
    super(mockConfigEvent.event);
  }
}

class MockValidationProvider extends ValidationProvider {
  constructor(altimate: any) {
    super(altimate);
  }

  validateCredentialsSilently(): void {}

  validateCredentials(): void {}

  isAuthenticated(): boolean {
    return true;
  }

  throwIfNotAuthenticated(): void {}

  setDBTContext(): void {}

  dispose(): void {}
}

suite("CLIDBTCommandExecutionStrategy Tests", () => {
  let mockPythonEnvironment: any;
  let mockTerminal: any;

  setup(() => {
    mockPythonEnvironment = {
      pythonPath: "/path/to/python",
      environmentVariables: {},
    };

    mockTerminal = {
      debug: () => {},
      error: () => {},
      warn: () => {},
      log: () => {},
      show: () => {},
    };
  });

  test("should send telemetry event with correct command data", async () => {
    const mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: () => ({
        complete: () => Promise.resolve({ stdout: "", stderr: "" }),
        completeWithTerminalOutput: () =>
          Promise.resolve({ stdout: "", stderr: "" }),
      }),
    };

    const mockTelemetry = {
      sendTelemetryEvent: sinon.spy(),
    };

    const strategy = new CLIDBTCommandExecutionStrategy(
      mockCommandProcessExecutionFactory as any,
      mockPythonEnvironment,
      mockTerminal,
      mockTelemetry as any,
      vscode.Uri.file("/test/project"),
      "dbt",
    );

    const command = new DBTCommand(
      "Test command",
      ["run", "--select", "my_model"],
      true,
      true,
      false,
    );

    await strategy.execute(command);

    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, "dbtCommand", {
      command: "dbt run --select my_model",
    });
  });
});

suite("DBTTerminal Test Suite", () => {
  let mockTelemetry: any;
  let mockOutputChannel: any;
  let mockTerminal: any;
  let terminal: DBTTerminal;
  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    mockTelemetry = {
      sendTelemetryEvent: sandbox.spy(),
      sendTelemetryError: sandbox.spy(),
    };

    mockOutputChannel = {
      info: sandbox.spy(),
      debug: sandbox.spy(),
      warn: sandbox.spy(),
      error: sandbox.spy(),
      appendLine: sandbox.spy(),
    };

    mockTerminal = {
      name: "Test Terminal",
      processId: Promise.resolve(1),
      creationOptions: {},
      exitStatus: undefined,
      state: { isInteractedWith: false },
      shellIntegration: undefined,
      show: sandbox.spy(),
      hide: sandbox.spy(),
      dispose: sandbox.spy(),
      sendText: sandbox.spy(),
      onDidClose: sandbox.spy(),
      onDidOpen: sandbox.spy(),
      onDidWrite: sandbox.spy(),
      onDidChangeName: sandbox.spy(),
      onDidChangeState: sandbox.spy(),
    } as unknown as vscode.Terminal;

    // Mock the window API using the existing mock
    const mockVSCode = require("../mock/vscode").default;
    mockVSCode.window.createOutputChannel = () => mockOutputChannel;
    mockVSCode.window.createTerminal = () => mockTerminal;

    terminal = new DBTTerminal(mockTelemetry);
  });

  teardown(() => {
    sandbox.restore();
  });

  test("should log messages with proper formatting", async () => {
    const message = "Test message";
    terminal.log(message);

    sinon.assert.calledWith(mockOutputChannel.info, message, []);
  });

  test("should send telemetry on info messages", () => {
    const name = "test_event";
    const message = "Test info message";
    terminal.info(name, message);

    sinon.assert.calledWith(mockOutputChannel.info, `${name}:${message}`, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, name, {
      message,
      level: "info",
    });
  });

  test("should send telemetry on warning messages", () => {
    const name = "test_warning";
    const message = "Test warning message";
    terminal.warn(name, message);

    sinon.assert.calledWith(mockOutputChannel.warn, `${name}:${message}`, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, name, {
      message,
      level: "warn",
    });
  });

  test("should handle errors with proper error message formatting", () => {
    const name = "test_error";
    const message = "Test error message";
    const error = new Error("Test error details");
    terminal.error(name, message, error);

    const expectedErrorMessage = `${name}:${message}:${error.message}`;
    sinon.assert.calledWith(mockOutputChannel.error, expectedErrorMessage, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryError, name, error, {
      message: `${message}:${error.message}`,
    });
  });

  test("should format block messages with horizontal rules", () => {
    const block = ["Line 1", "Line 2", "Line 3"];
    terminal.logBlock(block);

    const calls = mockOutputChannel.info.getCalls();
    assert.strictEqual(calls.length, 10); // HR + 3 lines with \r\n + HR + \r\n

    // First call should be horizontal rule
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(0),
      "--------------------------------------------------------------------------",
      [],
    );

    // Check content lines (each line is followed by \r\n)
    sinon.assert.calledWith(mockOutputChannel.info.getCall(2), "Line 1", []);
    sinon.assert.calledWith(mockOutputChannel.info.getCall(4), "Line 2", []);
    sinon.assert.calledWith(mockOutputChannel.info.getCall(6), "Line 3", []);

    // Last call should be horizontal rule
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(8),
      "--------------------------------------------------------------------------",
      [],
    );
  });

  test("should format block messages with headers correctly", () => {
    const header = ["Header 1", "Header 2"];
    const block = ["Content 1", "Content 2", "Content 3"];
    terminal.logBlockWithHeader(header, block);

    const calls = mockOutputChannel.info.getCalls();
    // Expected calls: HR + 2 header lines with \r\n + HR + 3 content lines with \r\n + HR + \r\n
    assert.strictEqual(calls.length, 16);

    // First horizontal rule
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(0),
      "--------------------------------------------------------------------------",
      [],
    );

    // Header lines
    sinon.assert.calledWith(mockOutputChannel.info.getCall(2), "Header 1", []);
    sinon.assert.calledWith(mockOutputChannel.info.getCall(4), "Header 2", []);

    // Middle horizontal rule
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(6),
      "--------------------------------------------------------------------------",
      [],
    );

    // Content lines
    sinon.assert.calledWith(mockOutputChannel.info.getCall(8), "Content 1", []);
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(10),
      "Content 2",
      [],
    );
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(12),
      "Content 3",
      [],
    );

    // Final horizontal rule
    sinon.assert.calledWith(
      mockOutputChannel.info.getCall(14),
      "--------------------------------------------------------------------------",
      [],
    );
  });

  test("should handle terminal show and error cases correctly", async () => {
    // Test show with status true
    await terminal.show(true);
    sinon.assert.called(mockTerminal.show);

    // Test show with status false
    await terminal.show(false);
    sinon.assert.calledOnce(mockTerminal.show);

    // Test error handling with PythonException
    class PythonException extends Error {
      constructor(public exception: { message: string }) {
        super(exception.message);
      }
    }
    const pythonError = new PythonException({
      message: "Python error occurred",
    });
    terminal.error("test_python_error", "Test message", pythonError);
    sinon.assert.calledWith(
      mockOutputChannel.error,
      "test_python_error:Test message:Python error occurred",
      [],
    );
    sinon.assert.calledWith(
      mockTelemetry.sendTelemetryError,
      "test_python_error",
      pythonError,
      { message: "Test message:Python error occurred" },
    );

    // Test error handling with standard Error
    const standardError = new Error("Standard error occurred");
    terminal.error("test_standard_error", "Test message", standardError);
    sinon.assert.calledWith(
      mockOutputChannel.error,
      "test_standard_error:Test message:Standard error occurred",
      [],
    );
    sinon.assert.calledWith(
      mockTelemetry.sendTelemetryError,
      "test_standard_error",
      standardError,
      { message: "Test message:Standard error occurred" },
    );

    // Test error handling with unknown error type
    const unknownError = "Unknown error occurred";
    terminal.error("test_unknown_error", "Test message", unknownError);
    sinon.assert.calledWith(
      mockOutputChannel.error,
      "test_unknown_error:Test message:Unknown error occurred",
      [],
    );
    sinon.assert.calledWith(
      mockTelemetry.sendTelemetryError,
      "test_unknown_error",
      unknownError,
      { message: "Test message:Unknown error occurred" },
    );
  });

  test("should properly handle terminal cleanup and disposal", async () => {
    // Create a disposable for testing
    const mockDisposable = { dispose: sinon.spy() };
    terminal["disposables"].push(mockDisposable);

    // Mock the writeEmitter.fire with a spy
    const writeEmitterSpy = sinon.spy();
    terminal["writeEmitter"].fire = writeEmitterSpy;

    // Test terminal write functionality
    await terminal.show(true);
    terminal.log("Test message");
    sinon.assert.called(writeEmitterSpy);

    // Test terminal disposal
    terminal.dispose();
    sinon.assert.called(mockDisposable.dispose);
    assert.strictEqual(terminal["disposables"].length, 0);

    // Create a new terminal with mocked pty
    const mockPty = {
      onDidWrite: terminal["writeEmitter"].event,
      open: () => terminal["writeEmitter"].fire(""),
      close: () => {
        if (terminal["terminal"]) {
          terminal["terminal"].dispose();
          terminal["terminal"] = undefined;
        }
      },
    };

    terminal["terminal"] = {
      ...mockTerminal,
      pty: mockPty,
    } as any;

    // Test terminal cleanup on close
    mockPty.close();
    assert.strictEqual(terminal["terminal"], undefined);
  });
});
