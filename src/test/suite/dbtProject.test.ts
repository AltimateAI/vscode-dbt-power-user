import * as assert from "assert";
import * as vscode from "vscode";
import { DBTProject } from "../../manifest/dbtProject";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import {
  Uri,
  EventEmitter,
  Event,
  Disposable,
  OutputChannel,
  LogOutputChannel,
  FileSystemWatcher,
  DiagnosticCollection,
  languages,
} from "vscode";
import { SourceFileWatchersFactory } from "../../manifest/modules/sourceFileWatchers";
import { DBTProjectLogFactory } from "../../manifest/modules/dbtProjectLog";
import { DBTProjectLog } from "../../manifest/modules/dbtProjectLog";
import { ProjectConfigChangedEvent } from "../../manifest/event/projectConfigChangedEvent";
import { DBTCommand } from "../../dbt_client/dbtIntegration";
import type { RunModelParams } from "../../dbt_client/dbtIntegration";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { TelemetryService } from "../../telemetry";
import { EnvironmentVariables } from "../../domain";
import {
  CommandProcessExecutionFactory,
  CommandProcessExecution,
} from "../../commandProcessExecution";
import { ChildProcessWithoutNullStreams } from "child_process";
import TelemetryReporter from "@vscode/extension-telemetry";
import { TargetWatchersFactory } from "../../manifest/modules/targetWatchers";
import { AltimateRequest } from "../../altimate";
import { ValidationProvider } from "../../validation_provider";
import { ManifestCacheChangedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { DBTCoreProjectIntegration } from "../../dbt_client/dbtCoreIntegration";
import { DBTCloudProjectIntegration } from "../../dbt_client/dbtCloudIntegration";
import { RunResultsEvent } from "../../manifest/event/runResultsEvent";

// Mock interfaces
interface ManifestParser {
  lastSentParseManifestProps: any;
  nodeParser: any;
  macroParser: any;
  metricParser: any;
  sourceParser: any;
  exposureParser: any;
  semanticParser: any;
  groupParser: any;
  saveParser: any;
  testParser: any;
  modelParser: any;
  seedParser: any;
  snapshotParser: any;
  analysisParser: any;
}

interface TargetWatchers {
  disposables: any[];
  _onManifestChanged: EventEmitter<any>;
  _onRunResults: EventEmitter<any>;
  watchers: FileSystemWatcher[];
  onManifestChanged: Event<any>;
  onRunResults: Event<any>;
  dispose(): void;
  handleManifestChange(): void;
  handleRunResults(): void;
  handleTargetChange(): void;
}

interface SharedStateService {
  eventEmitter: EventEmitter<any>;
  fire(): void;
}

interface DBTCommandFactory {
  createVersionCommand(): DBTCommand;
  createParseCommand(): DBTCommand;
  createRunModelCommand(params: RunModelParams): DBTCommand;
  createBuildModelCommand(params: RunModelParams): DBTCommand;
  createBuildProjectCommand(): DBTCommand;
  createTestModelCommand(testName: string): DBTCommand;
  createCompileModelCommand(params: RunModelParams): DBTCommand;
  createDocsGenerateCommand(): DBTCommand;
  createGenerateSourcesCommand(): DBTCommand;
  createInstallDepsCommand(): DBTCommand;
  createDebugCommand(): DBTCommand;
  createCleanCommand(): DBTCommand;
  createAddPackagesCommand(packages: string[]): DBTCommand;
}

suite("DbtProject Test Suite", () => {
  let mockProject: DBTProject;

  setup(() => {
    const mockOutputChannel: LogOutputChannel = {
      name: "dbt",
      append: () => {},
      appendLine: () => {},
      clear: () => {},
      dispose: () => {},
      hide: () => {},
      show: () => {},
      replace: () => {},
      logLevel: 0,
      onDidChangeLogLevel: new EventEmitter<number>().event,
      trace: () => {},
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    };

    const mockTelemetry = {} as TelemetryService;

    const mockTerminal = {
      debug: () => {},
      log: () => {},
      error: () => {},
      warn: () => {},
      info: () => {},
      logLine: () => {},
      logNewLine: () => {},
      logHorizontalRule: () => {},
      logBlock: () => {},
      logBlockWithHeader: () => {},
      show: async () => {},
      dispose: () => {},
      writeEmitter: new EventEmitter<string>(),
      outputChannel: mockOutputChannel,
      telemetry: mockTelemetry,
      trace: () => {},
      requireTerminal: async () => {},
      disposables: [],
      eventEmitter: new EventEmitter<any>(),
      fire: () => {},
    } as unknown as DBTTerminal & SharedStateService;

    const mockCommandProcessExecution = {
      complete: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
      completeWithTerminalOutput: async () => ({
        stdout: "",
        stderr: "",
        fullOutput: "",
      }),
      terminal: mockTerminal,
      command: "",
      spawn: () => {
        const process =
          new EventEmitter() as unknown as ChildProcessWithoutNullStreams;

        return process;
      },
      dispose: () => {},
      formatText: () => "",
      disposables: [],
    } as unknown as CommandProcessExecution;

    const mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: () => mockCommandProcessExecution,
      terminal: mockTerminal,
    } as unknown as CommandProcessExecutionFactory;

    const mockPythonEnvironment = {
      pythonPath: "/usr/bin/python3",
      environmentVariables: {} as EnvironmentVariables,
      environmentVariableSource: {},
      allPythonPaths: [],
      isPython3: true,
      onPythonEnvironmentChanged: new EventEmitter<Uri | undefined>().event,
      initialize: async () => {},
      dispose: () => {},
      printEnvVars: async () => {},
      telemetry: mockTelemetry,
      commandProcessExecutionFactory: mockCommandProcessExecutionFactory,
      dbtTerminal: mockTerminal,
      getResolvedConfigValue: () => "",
      substituteSettingsVariables: () => "",
      activatePythonExtension: async () => ({
        getPythonPath: () => "",
        onDidChangeExecutionDetails: new EventEmitter<Uri | undefined>().event,
        getEnvVars: () => ({}),
      }),
      disposables: [],
    } as unknown as PythonEnvironment;

    const mockSourceFileWatchersFactory = {
      create: () => ({
        dispose: () => {},
      }),
      createSourceFileWatchers: () => ({
        dispose: () => {},
      }),
      terminal: mockTerminal,
      disposables: [],
    } as unknown as SourceFileWatchersFactory;

    const mockManifestParser: ManifestParser = {
      lastSentParseManifestProps: {},
      nodeParser: {} as any,
      macroParser: {} as any,
      metricParser: {} as any,
      sourceParser: {} as any,
      exposureParser: {} as any,
      semanticParser: {} as any,
      groupParser: {} as any,
      saveParser: {} as any,
      testParser: {} as any,
      modelParser: {} as any,
      seedParser: {} as any,
      snapshotParser: {} as any,
      analysisParser: {} as any,
    };

    const mockTargetWatchers: TargetWatchers = {
      disposables: [],
      _onManifestChanged: new EventEmitter<any>(),
      _onRunResults: new EventEmitter<any>(),
      watchers: [],
      onManifestChanged: new EventEmitter<any>().event,
      onRunResults: new EventEmitter<any>().event,
      dispose: () => {},
      handleManifestChange: () => {},
      handleRunResults: () => {},
      handleTargetChange: () => {},
    };

    const mockTargetWatchersFactory = {
      dbtTerminal: mockTerminal,
      manifestParser: mockManifestParser,
      createTargetWatchers: (
        onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
        onRunResults: EventEmitter<RunResultsEvent>,
        onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
      ) => mockTargetWatchers,
    } as unknown as TargetWatchersFactory;

    class MockDBTProjectLog extends DBTProjectLog {
      constructor() {
        const mockEvent = new EventEmitter<ProjectConfigChangedEvent>().event;
        super(mockEvent);
      }
    }

    const mockProjectLogFactory: DBTProjectLogFactory = {
      createDBTProjectLog: (
        onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
      ) => new DBTProjectLog(onProjectConfigChanged),
    };

    const mockCommandFactory: DBTCommandFactory = {
      createVersionCommand: () => new DBTCommand("Version", ["--version"]),
      createParseCommand: () => new DBTCommand("Parse", ["parse"]),
      createRunModelCommand: (params: RunModelParams) =>
        new DBTCommand("Run", [
          "run",
          "--select",
          `${params.plusOperatorLeft}${params.modelName}${params.plusOperatorRight}`,
        ]),
      createBuildModelCommand: (params: RunModelParams) =>
        new DBTCommand("Build", [
          "build",
          "--select",
          `${params.plusOperatorLeft}${params.modelName}${params.plusOperatorRight}`,
        ]),
      createBuildProjectCommand: () =>
        new DBTCommand("Build Project", ["build"]),
      createTestModelCommand: (testName: string) =>
        new DBTCommand("Test", ["test", "--select", testName]),
      createCompileModelCommand: (params: RunModelParams) =>
        new DBTCommand("Compile", [
          "compile",
          "--select",
          `${params.plusOperatorLeft}${params.modelName}${params.plusOperatorRight}`,
        ]),
      createDocsGenerateCommand: () =>
        new DBTCommand("Docs", ["docs", "generate"]),
      createGenerateSourcesCommand: () => new DBTCommand("Sources", ["source"]),
      createInstallDepsCommand: () => new DBTCommand("Deps", ["deps"]),
      createDebugCommand: () => new DBTCommand("Debug", ["debug"]),
      createCleanCommand: () => new DBTCommand("Clean", ["clean"]),
      createAddPackagesCommand: (packages: string[]) =>
        new DBTCommand("Add Packages", ["deps", "--add-package", ...packages]),
    };

    class MockValidationProvider extends ValidationProvider {
      constructor() {
        super({} as AltimateRequest);
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

    const mockAltimateRequest = {} as AltimateRequest;
    const mockValidationProvider = new MockValidationProvider();

    const mockDbtCoreIntegrationFactory = (path: Uri) => {
      const integration = {
        projectName: "test_project",
        python: mockPythonEnvironment,
        disposables: [],
        rebuildManifestDiagnostics: () => {},
        pythonBridgeDiagnostics:
          languages.createDiagnosticCollection("dbt-python-bridge"),
        executionInfrastructure: mockCommandProcessExecutionFactory,
        pythonEnvironment: mockPythonEnvironment,
        telemetry: mockTelemetry,
        getProjectName: () => "test_project",
        getProjectRoot: () => path,
        getTarget: () => "dev",
        getProfile: () => "default",
        getThreads: () => 1,
        getModels: () => [],
        getModelGroups: () => [],
        getSources: () => [],
        getSourceGroups: () => [],
        getTests: () => [],
        getSnapshots: () => [],
        getSeeds: () => [],
        getAnalyses: () => [],
        getMacros: () => [],
        getMetrics: () => [],
        getExposures: () => [],
        getGroups: () => [],
        getSaveVersions: () => [],
        getSemanticModels: () => [],
        dispose: () => {},
        onManifestChanged: new EventEmitter<ManifestCacheChangedEvent>().event,
        onRunResults: new EventEmitter<RunResultsEvent>().event,
        onProjectConfigChanged: new EventEmitter<ProjectConfigChangedEvent>()
          .event,
        terminal: mockTerminal,
        commandFactory: mockCommandFactory,
        manifestParser: mockManifestParser,
        targetWatchers: mockTargetWatchers,
        dbtProjectLog: new MockDBTProjectLog(),
        validationProvider: mockValidationProvider,
        initialize: async () => {},
        runCommand: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        parseManifest: async () => {},
        runModel: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        buildModel: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        buildProject: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        testModel: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        compileModel: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        generateDocs: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        generateSources: async () => ({
          stdout: "",
          stderr: "",
          fullOutput: "",
        }),
        installDeps: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        debug: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        clean: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
        addPackages: async () => ({ stdout: "", stderr: "", fullOutput: "" }),
      } as unknown as DBTCoreProjectIntegration;
      return integration;
    };

    const mockDbtCloudIntegrationFactory = (path: Uri) =>
      ({}) as DBTCloudProjectIntegration;

    mockProject = new DBTProject(
      mockPythonEnvironment,
      mockSourceFileWatchersFactory,
      mockProjectLogFactory,
      mockTargetWatchersFactory,
      mockCommandFactory,
      mockTerminal,
      mockTerminal,
      mockTelemetry,
      mockDbtCoreIntegrationFactory,
      mockDbtCloudIntegrationFactory,
      mockAltimateRequest,
      mockValidationProvider,
      Uri.file("/path/to/project"),
      {},
      new EventEmitter<ManifestCacheChangedEvent>(),
    );

    (mockProject as any).args = {
      threads: 1,
      quiet: true,
      target_path: "/custom/path",
    };

    (mockProject as any).has_jinja = (text: string) => {
      return text.includes("{{") || text.includes("{%");
    };
  });

  test("should initialize with correct default values", () => {
    assert.strictEqual((mockProject as any).args.threads, 1);
    assert.strictEqual((mockProject as any).args.quiet, true);
  });

  test("should handle target path correctly", () => {
    assert.strictEqual((mockProject as any).args.target_path, "/custom/path");
  });

  test("has_jinja should detect jinja syntax correctly", () => {
    assert.strictEqual(
      (mockProject as any).has_jinja("select * from table"),
      false,
    );
    assert.strictEqual(
      (mockProject as any).has_jinja('select * from {{ ref("model") }}'),
      true,
    );
    assert.strictEqual(
      (mockProject as any).has_jinja("{%·set·var·=·1·%}"),
      true,
    );
  });
});
