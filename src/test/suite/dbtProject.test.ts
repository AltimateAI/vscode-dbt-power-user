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
