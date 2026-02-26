import {
  AltimateHttpClient,
  ChildrenParentParser,
  CLIDBTCommandExecutionStrategy,
  CommandProcessExecutionFactory,
  DBTCloudDetection,
  DBTCloudProjectDetection,
  DBTCloudProjectIntegration,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  DBTConfiguration,
  DBTCoreCommandDetection,
  DBTCoreCommandProjectDetection,
  DBTCoreCommandProjectIntegration,
  DBTCoreDetection,
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
  DBTDetection,
  DBTDiagnosticData,
  DBTFusionCommandDetection,
  DBTFusionCommandProjectDetection,
  DBTFusionCommandProjectIntegration,
  DbtIntegrationClient,
  DBTProjectDetection,
  DBTProjectIntegrationAdapter,
  DBTTerminal,
  DeferConfig,
  DocParser,
  ExposureParser,
  GraphParser,
  MacroParser,
  MetricParser,
  ModelDepthParser,
  NodeParser,
  PythonDBTCommandExecutionStrategy,
  PythonEnvironmentProvider,
  RuntimePythonEnvironment,
  SourceParser,
  TestParser,
} from "@altimateai/dbt-integration";
import * as LibNamespace from "@lib";
import { NotebookKernelClient } from "@lib";
import { Container, interfaces } from "inversify";
import { Event, EventEmitter, Uri, workspace, WorkspaceFolder } from "vscode";
import { AltimateRequest } from "./altimate";
import { DBTProject } from "./dbt_client/dbtProject";
import { ProjectRegisteredUnregisteredEvent } from "./dbt_client/dbtProjectContainer";
import { DBTProjectLog } from "./dbt_client/dbtProjectLog";
import { DBTWorkspaceFolder } from "./dbt_client/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./dbt_client/event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "./dbt_client/event/projectConfigChangedEvent";
import { PythonEnvironment } from "./dbt_client/pythonEnvironment";
import {
  StaticRuntimePythonEnvironment,
  VSCodeRuntimePythonEnvironmentProvider,
} from "./dbt_client/runtimePythonEnvironmentProvider";
import { VSCodeDBTConfiguration } from "./dbt_client/vscodeConfiguration";
import { VSCodeDBTTerminal } from "./dbt_client/vscodeTerminal";
import { AltimateAuthService } from "./services/altimateAuthService";
import { ConversationService } from "./services/conversationService";
import { DbtLineageService } from "./services/dbtLineageService";
import { DbtTestService } from "./services/dbtTestService";
import { DiagnosticsOutputChannel } from "./services/diagnosticsOutputChannel";
import { DocGenService } from "./services/docGenService";
import { FileService } from "./services/fileService";
import { QueryAnalysisService } from "./services/queryAnalysisService";
import { QueryManifestService } from "./services/queryManifestService";
import { RunHistoryService } from "./services/runHistoryService";
import { SharedStateService } from "./services/sharedStateService";
import { StreamingService } from "./services/streamingService";
import { UsersService } from "./services/usersService";
import { TelemetryService } from "./telemetry";
import { ValidationProvider } from "./validation_provider";

// Core extension components
import { DBTClient } from "./dbt_client";
import { AltimateDatapilot } from "./dbt_client/datapilot";
import { DBTProjectContainer } from "./dbt_client/dbtProjectContainer";
import { DbtPowerUserMcpServer } from "./mcp";
import { DbtPowerUserMcpServerTools } from "./mcp/server";

// Import providers
import { AutocompletionProviders } from "./autocompletion_provider";
import { DocAutocompletionProvider } from "./autocompletion_provider/docAutocompletionProvider";
import { MacroAutocompletionProvider } from "./autocompletion_provider/macroAutocompletionProvider";
import { ModelAutocompletionProvider } from "./autocompletion_provider/modelAutocompletionProvider";
import { SourceAutocompletionProvider } from "./autocompletion_provider/sourceAutocompletionProvider";
import { UserCompletionProvider } from "./autocompletion_provider/usercompletion_provider";
import { CodeLensProviders } from "./code_lens_provider";
import { CteCodeLensProvider } from "./code_lens_provider/cteCodeLensProvider";
import { DocumentationCodeLensProvider } from "./code_lens_provider/documentationCodeLensProvider";
import { SourceModelCreationCodeLensProvider } from "./code_lens_provider/sourceModelCreationCodeLensProvider";
import { VirtualSqlCodeLensProvider } from "./code_lens_provider/virtualSqlCodeLensProvider";
import { DefinitionProviders } from "./definition_provider";
import { DocDefinitionProvider } from "./definition_provider/docDefinitionProvider";
import { MacroDefinitionProvider } from "./definition_provider/macroDefinitionProvider";
import { ModelDefinitionProvider } from "./definition_provider/modelDefinitionProvider";
import { SourceDefinitionProvider } from "./definition_provider/sourceDefinitionProvider";
import { HoverProviders } from "./hover_provider";
import { DepthDecorationProvider } from "./hover_provider/depthDecorationProvider";
import { MacroHoverProvider } from "./hover_provider/macroHoverProvider";
import { ModelHoverProvider } from "./hover_provider/modelHoverProvider";
import { SourceHoverProvider } from "./hover_provider/sourceHoverProvider";
import { ProjectQuickPick } from "./quickpick/projectQuickPick";

// Import missing providers and components
import { VSCodeCommands } from "./commands";
import { AltimateScan } from "./commands/altimateScan";
import { BigQueryCostEstimate } from "./commands/bigQueryCostEstimate";
import { RunModel } from "./commands/runModel";
import { SqlToModel } from "./commands/sqlToModel";
import { MissingSchemaTest } from "./commands/tests/missingSchemaTest";
import { StaleModelColumnTest } from "./commands/tests/staleModelColumnTest";
import { UndocumentedModelColumnTest } from "./commands/tests/undocumentedModelColumnTest";
import { UnmaterializedModelTest } from "./commands/tests/unmaterializedModelTest";
import { ValidateSql } from "./commands/validateSql";
import { WalkthroughCommands } from "./commands/walkthroughCommands";
import { CommentProviders } from "./comment_provider";
import { ConversationProvider } from "./comment_provider/conversationProvider";
import { ContentProviders } from "./content_provider";
import { SqlPreviewContentProvider } from "./content_provider/sqlPreviewContentProvider";
import { DBTPowerUserExtension } from "./dbtPowerUserExtension";
import { DocumentFormattingEditProviders } from "./document_formatting_edit_provider";
import { DbtDocumentFormattingEditProvider } from "./document_formatting_edit_provider/dbtDocumentFormattingEditProvider";
import { DbtPowerUserActionsCenter } from "./quickpick";
import { DbtPowerUserControlCenterAction } from "./quickpick/puQuickPick";
import { DbtSQLAction } from "./quickpick/sqlQuickPick";
import { StatusBars } from "./statusbar";
import { DeferToProductionStatusBar } from "./statusbar/deferToProductionStatusBar";
import { TargetStatusBar } from "./statusbar/targetStatusBar";
import { VersionStatusBar } from "./statusbar/versionStatusBar";
import { TreeviewProviders } from "./treeview_provider";
import {
  ChildrenModelTreeview,
  DocumentationTreeview,
  IconActionsTreeview,
  ModelTestTreeview,
  ParentModelTreeview,
} from "./treeview_provider/modelTreeviewProvider";
import { RunHistoryTreeviewProvider } from "./treeview_provider/runHistoryTreeviewProvider";
import { WebviewViewProviders } from "./webview_provider";
import { DataPilotPanel } from "./webview_provider/datapilotPanel";
import { DbtDocsView } from "./webview_provider/DbtDocsView";
import { DocsEditViewPanel } from "./webview_provider/docsEditPanel";
import { InsightsPanel } from "./webview_provider/insightsPanel";
import { LineagePanel } from "./webview_provider/lineagePanel";
import { NewDocsGenPanel } from "./webview_provider/newDocsGenPanel";
import { NewLineagePanel } from "./webview_provider/newLineagePanel";
import { QueryResultPanel } from "./webview_provider/queryResultPanel";
import { SQLLineagePanel } from "./webview_provider/sqlLineagePanel";

export const container = new Container();

// Bind parser classes
container
  .bind(ChildrenParentParser)
  .toDynamicValue(() => new ChildrenParentParser());
container
  .bind(NodeParser)
  .toDynamicValue(
    (context) => new NodeParser(context.container.get("DBTTerminal")),
  );
container
  .bind(MacroParser)
  .toDynamicValue(
    (context) => new MacroParser(context.container.get("DBTTerminal")),
  );
container
  .bind(MetricParser)
  .toDynamicValue(
    (context) => new MetricParser(context.container.get("DBTTerminal")),
  );
container
  .bind(GraphParser)
  .toDynamicValue(
    (context) => new GraphParser(context.container.get("DBTTerminal")),
  );
container
  .bind(SourceParser)
  .toDynamicValue(
    (context) => new SourceParser(context.container.get("DBTTerminal")),
  );
container
  .bind(TestParser)
  .toDynamicValue(
    (context) => new TestParser(context.container.get("DBTTerminal")),
  );
container
  .bind(ExposureParser)
  .toDynamicValue(
    (context) => new ExposureParser(context.container.get("DBTTerminal")),
  );
container
  .bind(DocParser)
  .toDynamicValue(
    (context) => new DocParser(context.container.get("DBTTerminal")),
  );
container
  .bind(ModelDepthParser)
  .toDynamicValue(
    (context) =>
      new ModelDepthParser(
        context.container.get("DBTTerminal"),
        context.container.get(DbtIntegrationClient),
        context.container.get("DBTConfiguration"),
      ),
  );

// Bind core dbt integration classes using factory functions
container
  .bind(CLIDBTCommandExecutionStrategy)
  .toDynamicValue(() => {
    // Note: CLIDBTCommandExecutionStrategy requires projectRoot and dbtPath at construction time
    // These will be provided by the factory functions that create instances
    throw new Error(
      "CLIDBTCommandExecutionStrategy should be created via Factory<CLIDBTCommandExecutionStrategy>",
    );
  })
  .inSingletonScope();

container
  .bind(PythonDBTCommandExecutionStrategy)
  .toDynamicValue((context) => {
    return new PythonDBTCommandExecutionStrategy(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get("RuntimePythonEnvironment"),
      context.container.get("DBTTerminal"),
      context.container.get("DBTConfiguration"),
    );
  })
  .inSingletonScope();

container.bind(DBTCommandExecutionInfrastructure).toDynamicValue((context) => {
  return new DBTCommandExecutionInfrastructure(
    context.container.get("RuntimePythonEnvironment"),
    context.container.get("DBTTerminal"),
  );
});

container
  .bind(DBTCommandFactory)
  .toDynamicValue((context) => {
    return new DBTCommandFactory(context.container.get("DBTConfiguration"));
  })
  .inSingletonScope();

// Bind dbt core integration classes using factory functions
container
  .bind(DBTCoreDetection)
  .toDynamicValue((context) => {
    return new DBTCoreDetection(
      context.container.get("RuntimePythonEnvironment"),
      context.container.get(CommandProcessExecutionFactory),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCoreProjectDetection)
  .toDynamicValue((context) => {
    return new DBTCoreProjectDetection(
      context.container.get(DBTCommandExecutionInfrastructure),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Note: DBTCoreProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCoreProjectIntegration>
container
  .bind(DBTCoreProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCoreProjectIntegration should be created via Factory<DBTCoreProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt cloud integration classes using factory functions
container
  .bind(DBTCloudDetection)
  .toDynamicValue((context) => {
    return new DBTCloudDetection(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get("RuntimePythonEnvironment"),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCloudProjectDetection)
  .toDynamicValue(() => {
    return new DBTCloudProjectDetection();
  })
  .inSingletonScope();

// Note: DBTCloudProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCloudProjectIntegration>
container
  .bind(DBTCloudProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCloudProjectIntegration should be created via Factory<DBTCloudProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt fusion integration classes using factory functions
container
  .bind(DBTFusionCommandDetection)
  .toDynamicValue((context) => {
    return new DBTFusionCommandDetection(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get("RuntimePythonEnvironment"),
      context.container.get("DBTTerminal"),
      context.container.get("DBTConfiguration"),
    );
  })
  .inSingletonScope();

container
  .bind(DBTFusionCommandProjectDetection)
  .toDynamicValue(() => {
    return new DBTFusionCommandProjectDetection();
  })
  .inSingletonScope();

// Note: DBTFusionCommandProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTFusionCommandProjectIntegration>
container
  .bind(DBTFusionCommandProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTFusionCommandProjectIntegration should be created via Factory<DBTFusionCommandProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind dbt core command integration classes using factory functions
container
  .bind(DBTCoreCommandDetection)
  .toDynamicValue((context) => {
    return new DBTCoreCommandDetection(
      context.container.get("RuntimePythonEnvironment"),
      context.container.get(CommandProcessExecutionFactory),
    );
  })
  .inSingletonScope();

container
  .bind(DBTCoreCommandProjectDetection)
  .toDynamicValue((context) => {
    return new DBTCoreCommandProjectDetection(
      context.container.get(DBTCommandExecutionInfrastructure),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Note: DBTCoreCommandProjectIntegration requires projectRoot at construction time
// It will be created via Factory<DBTCoreCommandProjectIntegration>
container
  .bind(DBTCoreCommandProjectIntegration)
  .toDynamicValue(() => {
    throw new Error(
      "DBTCoreCommandProjectIntegration should be created via Factory<DBTCoreCommandProjectIntegration>",
    );
  })
  .inSingletonScope();

// Bind DBTConfiguration
container
  .bind<DBTConfiguration>("DBTConfiguration")
  .to(VSCodeDBTConfiguration)
  .inSingletonScope();

// Bind DBTTerminal
container
  .bind<DBTTerminal>("DBTTerminal")
  .to(VSCodeDBTTerminal)
  .inSingletonScope();

// Bind RuntimePythonEnvironment (VSCode-free version for dbt_integration)
container
  .bind<RuntimePythonEnvironment>("RuntimePythonEnvironment")
  .to(StaticRuntimePythonEnvironment)
  .inSingletonScope();

// Bind PythonEnvironmentProvider
container
  .bind<PythonEnvironmentProvider>("PythonEnvironmentProvider")
  .to(VSCodeRuntimePythonEnvironmentProvider)
  .inSingletonScope();

// Bind CommandProcessExecutionFactory
container
  .bind(CommandProcessExecutionFactory)
  .toDynamicValue((context) => {
    return new CommandProcessExecutionFactory(
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Bind AltimateHttpClient
container
  .bind(AltimateHttpClient)
  .toDynamicValue((context) => {
    return new AltimateHttpClient(
      context.container.get("DBTTerminal"),
      context.container.get("DBTConfiguration"),
    );
  })
  .inSingletonScope();

// Bind DbtIntegrationClient
container
  .bind(DbtIntegrationClient)
  .toDynamicValue((context) => {
    return new DbtIntegrationClient(
      context.container.get(AltimateHttpClient),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Bind AltimateRequest
container
  .bind(AltimateRequest)
  .toDynamicValue((context) => {
    return new AltimateRequest(
      context.container.get("DBTTerminal"),
      context.container.get("DBTConfiguration"),
      context.container.get(AltimateHttpClient),
    );
  })
  .inSingletonScope();

container
  .bind<interfaces.Factory<DBTDetection>>("Factory<DBTDetection>")
  .toFactory<DBTDetection, []>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      const dbtIntegrationMode = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");

      switch (dbtIntegrationMode) {
        case "cloud":
          return container.get(DBTCloudDetection);
        case "fusion":
          return container.get(DBTFusionCommandDetection);
        default:
          return container.get(DBTCoreDetection);
      }
    };
  });

container
  .bind<interfaces.Factory<DBTProjectDetection>>("Factory<DBTProjectDetection>")
  .toFactory<DBTProjectDetection, []>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      const dbtIntegrationMode = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");

      switch (dbtIntegrationMode) {
        case "cloud":
          // Handle preview features for cloud integration
          container.get(AltimateAuthService).handlePreviewFeatures();
          return container.get(DBTCloudProjectDetection);
        case "fusion":
          return container.get(DBTFusionCommandProjectDetection);
        default:
          return container.get(DBTCoreProjectDetection);
      }
    };
  });

container
  .bind<interfaces.Factory<DBTWorkspaceFolder>>("Factory<DBTWorkspaceFolder>")
  .toFactory<
    DBTWorkspaceFolder,
    [
      WorkspaceFolder,
      EventEmitter<ManifestCacheChangedEvent>,
      EventEmitter<ProjectRegisteredUnregisteredEvent>,
    ]
  >((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("Factory<DBTProject>"),
        container.get("Factory<DBTProjectDetection>"),
        container.get(TelemetryService),
        container.get("DBTTerminal"),
        workspaceFolder,
        _onManifestChanged,
        _onProjectRegisteredUnregistered,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCommandExecutionStrategy>
  >("Factory<CLIDBTCommandExecutionStrategy>")
  .toFactory<
    CLIDBTCommandExecutionStrategy,
    [string, string]
  >((context: interfaces.Context) => {
    return (projectRoot: string, dbtPath: string) => {
      const { container } = context;
      return new CLIDBTCommandExecutionStrategy(
        container.get(CommandProcessExecutionFactory),
        container.get("RuntimePythonEnvironment"),
        container.get("DBTTerminal"),
        projectRoot,
        dbtPath,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTCoreProjectIntegration>")
  .toFactory<
    DBTCoreProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig, () => void]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
      onDiagnosticsChanged: () => void,
    ) => {
      const { container } = context;
      return new DBTCoreProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get("RuntimePythonEnvironment"),
        container.get("PythonEnvironmentProvider"),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get("DBTTerminal"),
        container.get("DBTConfiguration"),
        container.get(DbtIntegrationClient),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
        onDiagnosticsChanged,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTCoreCommandProjectIntegration>")
  .toFactory<
    DBTCoreCommandProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig, () => void]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
      onDiagnosticsChanged: () => void,
    ) => {
      const { container } = context;
      return new DBTCoreCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get("RuntimePythonEnvironment"),
        container.get("PythonEnvironmentProvider"),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get("DBTTerminal"),
        container.get("DBTConfiguration"),
        container.get(DbtIntegrationClient),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
        onDiagnosticsChanged,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTFusionCommandProjectIntegration>")
  .toFactory<
    DBTFusionCommandProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig, () => void]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
      onDiagnosticsChanged: () => void,
    ) => {
      const { container } = context;
      return new DBTFusionCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get("RuntimePythonEnvironment"),
        container.get("PythonEnvironmentProvider"),
        container.get("DBTTerminal"),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
        onDiagnosticsChanged,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCloudProjectIntegration>
  >("Factory<DBTCloudProjectIntegration>")
  .toFactory<
    DBTCloudProjectIntegration,
    [string, DBTDiagnosticData[], DeferConfig, () => void]
  >((context: interfaces.Context) => {
    return (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
      onDiagnosticsChanged: () => void,
    ) => {
      const { container } = context;
      return new DBTCloudProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get("RuntimePythonEnvironment"),
        container.get("PythonEnvironmentProvider"),
        container.get("DBTTerminal"),
        projectRoot,
        projectConfigDiagnostics,
        deferConfig,
        onDiagnosticsChanged,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTProjectIntegrationAdapter>
  >("Factory<DBTProjectIntegrationAdapter>")
  .toFactory<
    DBTProjectIntegrationAdapter,
    [string, DeferConfig | undefined]
  >((context: interfaces.Context) => {
    return (projectRoot: string, deferConfig: DeferConfig | undefined) => {
      const { container } = context;
      return new DBTProjectIntegrationAdapter(
        container.get("DBTConfiguration"),
        container.get(DBTCommandFactory),
        container.get("Factory<DBTCoreProjectIntegration>"),
        container.get("Factory<DBTCloudProjectIntegration>"),
        container.get("Factory<DBTFusionCommandProjectIntegration>"),
        container.get("Factory<DBTCoreCommandProjectIntegration>"),
        projectRoot,
        deferConfig,
        container.get(ChildrenParentParser),
        container.get(NodeParser),
        container.get(MacroParser),
        container.get(MetricParser),
        container.get(GraphParser),
        container.get(SourceParser),
        container.get(TestParser),
        container.get(ExposureParser),
        container.get(DocParser),
        container.get("DBTTerminal"),
        container.get(ModelDepthParser),
      );
    };
  });

container
  .bind<interfaces.Factory<DBTProject>>("Factory<DBTProject>")
  .toFactory<
    DBTProject,
    [Uri, any, EventEmitter<ManifestCacheChangedEvent>]
  >((context: interfaces.Context) => {
    return (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(PythonEnvironment),
        container.get("Factory<DBTProjectLog>"),
        container.get(DBTCommandFactory),
        container.get("DBTTerminal"),
        container.get(SharedStateService),
        container.get(TelemetryService),
        container.get(DBTCommandExecutionInfrastructure),
        container.get("Factory<DBTProjectIntegrationAdapter>"),
        container.get(AltimateRequest),
        container.get(ValidationProvider),
        container.get(AltimateAuthService),
        container.get(RunHistoryService),
        path,
        projectConfig,
        _onManifestChanged,
      );
    };
  });

container
  .bind<interfaces.Factory<DBTProjectLog>>("Factory<DBTProjectLog>")
  .toFactory<DBTProjectLog, [Event<ProjectConfigChangedEvent>]>(() => {
    return (onProjectConfigChanged: Event<ProjectConfigChangedEvent>) => {
      return new DBTProjectLog(onProjectConfigChanged);
    };
  });

// Bind services
container
  .bind(AltimateAuthService)
  .toDynamicValue((context) => {
    return new AltimateAuthService(context.container.get("DBTConfiguration"));
  })
  .inSingletonScope();

container
  .bind(ConversationService)
  .toDynamicValue((context) => {
    return new ConversationService(
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateRequest),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(DbtLineageService)
  .toDynamicValue((context) => {
    return new DbtLineageService(
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
    );
  })
  .inSingletonScope();

container
  .bind(DbtTestService)
  .toDynamicValue((context) => {
    return new DbtTestService(
      context.container.get(DocGenService),
      context.container.get(StreamingService),
      context.container.get(AltimateRequest),
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(TelemetryService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(DiagnosticsOutputChannel)
  .toDynamicValue(() => {
    return new DiagnosticsOutputChannel();
  })
  .inSingletonScope();

container
  .bind(DocGenService)
  .toDynamicValue((context) => {
    return new DocGenService(
      context.container.get(AltimateRequest),
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(FileService)
  .toDynamicValue(() => {
    return new FileService();
  })
  .inSingletonScope();

container
  .bind(QueryAnalysisService)
  .toDynamicValue((context) => {
    return new QueryAnalysisService(
      context.container.get(DocGenService),
      context.container.get(StreamingService),
      context.container.get(AltimateRequest),
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(FileService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(QueryManifestService)
  .toDynamicValue((context) => {
    return new QueryManifestService(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
      context.container.get(SharedStateService),
      context.container.get(ProjectQuickPick),
    );
  })
  .inSingletonScope();

container
  .bind(SharedStateService)
  .toDynamicValue(() => {
    return new SharedStateService();
  })
  .inSingletonScope();

container
  .bind(RunHistoryService)
  .toDynamicValue(() => {
    return new RunHistoryService();
  })
  .inSingletonScope();

container
  .bind(RunHistoryTreeviewProvider)
  .toDynamicValue((context) => {
    return new RunHistoryTreeviewProvider(
      context.container.get(RunHistoryService),
    );
  })
  .inSingletonScope();

container
  .bind(ProjectQuickPick)
  .toDynamicValue(() => {
    return new ProjectQuickPick();
  })
  .inSingletonScope();

container
  .bind(StreamingService)
  .toDynamicValue((context) => {
    return new StreamingService(
      context.container.get(AltimateRequest),
      context.container.get(SharedStateService),
    );
  })
  .inSingletonScope();

container
  .bind(UsersService)
  .toDynamicValue((context) => {
    return new UsersService(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateRequest),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(TelemetryService)
  .toDynamicValue(() => {
    return new TelemetryService();
  })
  .inSingletonScope();

container
  .bind(ValidationProvider)
  .toDynamicValue((context) => {
    return new ValidationProvider(
      context.container.get(AltimateRequest),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

// Bind manifest components
container
  .bind(PythonEnvironment)
  .toDynamicValue((context) => {
    return new PythonEnvironment(context.container.get("DBTTerminal"));
  })
  .inSingletonScope();

container
  .bind(DBTProjectContainer)
  .toDynamicValue((context) => {
    return new DBTProjectContainer(
      context.container.get(DBTClient),
      context.container.get("Factory<DBTWorkspaceFolder>"),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateDatapilot),
      context.container.get(AltimateRequest),
    );
  })
  .inSingletonScope();

// Bind MCP server tools
container
  .bind(DbtPowerUserMcpServerTools)
  .toDynamicValue((context) => {
    return new DbtPowerUserMcpServerTools(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Bind MCP server
container
  .bind(DbtPowerUserMcpServer)
  .toDynamicValue((context) => {
    return new DbtPowerUserMcpServer(
      context.container.get(DbtPowerUserMcpServerTools),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateRequest),
      context.container.get(SharedStateService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

// Bind dbt client
container
  .bind(DBTClient)
  .toDynamicValue((context) => {
    return new DBTClient(
      context.container.get(PythonEnvironment),
      context.container.get("Factory<DBTDetection>"),
    );
  })
  .inSingletonScope();

container
  .bind(AltimateDatapilot)
  .toDynamicValue((context) => {
    return new AltimateDatapilot(
      context.container.get(PythonEnvironment),
      context.container.get(CommandProcessExecutionFactory),
      context.container.get("DBTTerminal"),
      context.container.get("DBTConfiguration"),
    );
  })
  .inSingletonScope();

// Bind autocompletion providers
container
  .bind(AutocompletionProviders)
  .toDynamicValue((context) => {
    return new AutocompletionProviders(
      context.container.get(MacroAutocompletionProvider),
      context.container.get(ModelAutocompletionProvider),
      context.container.get(SourceAutocompletionProvider),
      context.container.get(DocAutocompletionProvider),
      context.container.get(UserCompletionProvider),
    );
  })
  .inSingletonScope();

container
  .bind(DocAutocompletionProvider)
  .toDynamicValue((context) => {
    return new DocAutocompletionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(MacroAutocompletionProvider)
  .toDynamicValue((context) => {
    return new MacroAutocompletionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(ModelAutocompletionProvider)
  .toDynamicValue((context) => {
    return new ModelAutocompletionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(SourceAutocompletionProvider)
  .toDynamicValue((context) => {
    return new SourceAutocompletionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(UserCompletionProvider)
  .toDynamicValue((context) => {
    return new UserCompletionProvider(context.container.get(UsersService));
  })
  .inSingletonScope();

// Bind code lens providers
container
  .bind(CodeLensProviders)
  .toDynamicValue((context) => {
    return new CodeLensProviders(
      context.container.get(DBTProjectContainer),
      context.container.get(SourceModelCreationCodeLensProvider),
      context.container.get(VirtualSqlCodeLensProvider),
      context.container.get(DocumentationCodeLensProvider),
      context.container.get(CteCodeLensProvider),
    );
  })
  .inSingletonScope();

container
  .bind(CteCodeLensProvider)
  .toDynamicValue((context) => {
    return new CteCodeLensProvider(
      context.container.get("DBTTerminal"),
      context.container.get(AltimateRequest),
    );
  })
  .inSingletonScope();

container
  .bind(DocumentationCodeLensProvider)
  .toDynamicValue(() => {
    return new DocumentationCodeLensProvider();
  })
  .inSingletonScope();

container
  .bind(SourceModelCreationCodeLensProvider)
  .toDynamicValue(() => {
    return new SourceModelCreationCodeLensProvider();
  })
  .inSingletonScope();

container
  .bind(VirtualSqlCodeLensProvider)
  .toDynamicValue((context) => {
    return new VirtualSqlCodeLensProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(QueryManifestService),
      context.container.get("NotebookService"),
    );
  })
  .inSingletonScope();

// Bind definition providers
container
  .bind(DefinitionProviders)
  .toDynamicValue((context) => {
    return new DefinitionProviders(
      context.container.get(ModelDefinitionProvider),
      context.container.get(MacroDefinitionProvider),
      context.container.get(SourceDefinitionProvider),
      context.container.get(DocDefinitionProvider),
    );
  })
  .inSingletonScope();

container
  .bind(DocDefinitionProvider)
  .toDynamicValue((context) => {
    return new DocDefinitionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(MacroDefinitionProvider)
  .toDynamicValue((context) => {
    return new MacroDefinitionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(ModelDefinitionProvider)
  .toDynamicValue((context) => {
    return new ModelDefinitionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(SourceDefinitionProvider)
  .toDynamicValue((context) => {
    return new SourceDefinitionProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

// Bind hover providers
container
  .bind(HoverProviders)
  .toDynamicValue((context) => {
    return new HoverProviders(
      context.container.get(ModelHoverProvider),
      context.container.get(SourceHoverProvider),
      context.container.get(MacroHoverProvider),
      context.container.get(DepthDecorationProvider),
    );
  })
  .inSingletonScope();

container
  .bind(DepthDecorationProvider)
  .toDynamicValue((context) => {
    return new DepthDecorationProvider(
      context.container.get(DBTProjectContainer),
    );
  })
  .inSingletonScope();

container
  .bind(MacroHoverProvider)
  .toDynamicValue((context) => {
    return new MacroHoverProvider(
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
    );
  })
  .inSingletonScope();

container
  .bind(ModelHoverProvider)
  .toDynamicValue((context) => {
    return new ModelHoverProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(SourceHoverProvider)
  .toDynamicValue((context) => {
    return new SourceHoverProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

// Bind notebook-related services

container
  .bind<any>("NotebookFileSystemProvider")
  .toDynamicValue((context) => {
    return new LibNamespace.NotebookFileSystemProvider(
      context.container.get("DBTTerminal"),
      context.container.get(AltimateRequest),
    );
  })
  .inSingletonScope();

container
  .bind<interfaces.Factory<NotebookKernelClient>>("Factory<NotebookClient>")
  .toFactory<NotebookKernelClient, [string]>((context: interfaces.Context) => {
    return (path: string) => {
      const { container } = context;
      return new LibNamespace.NotebookKernelClient(
        path,
        container.get(DBTCommandExecutionInfrastructure),
        container.get("NotebookDependencies"),
        container.get("DBTTerminal"),
      );
    };
  });
container
  .bind<any>("NotebookDependencies")
  .toDynamicValue((context) => {
    return new LibNamespace.NotebookDependencies(
      context.container.get("DBTTerminal"),
      context.container.get(TelemetryService),
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(PythonEnvironment),
    );
  })
  .inSingletonScope();

container
  .bind<any>("ClientMapper")
  .toDynamicValue((context) => {
    return new LibNamespace.ClientMapper(
      context.container.get(DBTCommandExecutionInfrastructure),
      context.container.get("NotebookDependencies"),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind<any>("DatapilotNotebookSerializer")
  .toDynamicValue(() => {
    return new LibNamespace.DatapilotNotebookSerializer();
  })
  .inSingletonScope();

container
  .bind<any>("DatapilotNotebookController")
  .toDynamicValue((context) => {
    return new LibNamespace.DatapilotNotebookController(
      context.container.get("ClientMapper"),
      context.container.get(QueryManifestService),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
      context.container.get("NotebookDependencies"),
      context.container.get(AltimateRequest),
    );
  })
  .inSingletonScope();

container
  .bind<any>("NotebookService")
  .toDynamicValue((context) => {
    return new LibNamespace.NotebookService(
      context.container.get("DatapilotNotebookController"),
    );
  })
  .inSingletonScope();

container
  .bind<any>("NotebookProviders")
  .toDynamicValue((context) => {
    return new LibNamespace.NotebookProviders(
      context.container.get("DatapilotNotebookSerializer"),
      context.container.get("DatapilotNotebookController"),
      context.container.get("NotebookFileSystemProvider"),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Bind test components
container
  .bind(MissingSchemaTest)
  .toDynamicValue(() => {
    return new MissingSchemaTest();
  })
  .inSingletonScope();

container
  .bind(UndocumentedModelColumnTest)
  .toDynamicValue(() => {
    return new UndocumentedModelColumnTest();
  })
  .inSingletonScope();

container
  .bind(UnmaterializedModelTest)
  .toDynamicValue(() => {
    return new UnmaterializedModelTest();
  })
  .inSingletonScope();

container
  .bind(StaleModelColumnTest)
  .toDynamicValue(() => {
    return new StaleModelColumnTest();
  })
  .inSingletonScope();

// Bind additional webview components
container
  .bind(DbtDocsView)
  .toDynamicValue((context) => {
    return new DbtDocsView(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get(SharedStateService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
      context.container.get(UsersService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(SqlPreviewContentProvider)
  .toDynamicValue((context) => {
    return new SqlPreviewContentProvider(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(DbtDocumentFormattingEditProvider)
  .toDynamicValue((context) => {
    return new DbtDocumentFormattingEditProvider(
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(TelemetryService),
      context.container.get(PythonEnvironment),
    );
  })
  .inSingletonScope();

// Bind status bar components
container
  .bind(VersionStatusBar)
  .toDynamicValue((context) => {
    return new VersionStatusBar(context.container.get(DBTProjectContainer));
  })
  .inSingletonScope();

container
  .bind(DeferToProductionStatusBar)
  .toDynamicValue((context) => {
    return new DeferToProductionStatusBar(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(TargetStatusBar)
  .toDynamicValue((context) => {
    return new TargetStatusBar(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

// Bind quick pick components
container
  .bind(DbtPowerUserControlCenterAction)
  .toDynamicValue(() => {
    return new DbtPowerUserControlCenterAction();
  })
  .inSingletonScope();

container
  .bind(DbtSQLAction)
  .toDynamicValue((context) => {
    return new DbtSQLAction(context.container.get(DBTProjectContainer));
  })
  .inSingletonScope();

// Bind individual command components that are required by VSCodeCommands
container
  .bind(RunModel)
  .toDynamicValue((context) => {
    return new RunModel(context.container.get(DBTProjectContainer));
  })
  .inSingletonScope();

container
  .bind(SqlToModel)
  .toDynamicValue((context) => {
    return new SqlToModel(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(AltimateRequest),
      context.container.get("DBTTerminal"),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(ValidateSql)
  .toDynamicValue((context) => {
    return new ValidateSql(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(AltimateRequest),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(AltimateScan)
  .toDynamicValue((context) => {
    return new AltimateScan(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(AltimateRequest),
      context.container.get(MissingSchemaTest),
      context.container.get(UndocumentedModelColumnTest),
      context.container.get(UnmaterializedModelTest),
      context.container.get(StaleModelColumnTest),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(WalkthroughCommands)
  .toDynamicValue((context) => {
    return new WalkthroughCommands(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(CommandProcessExecutionFactory),
      context.container.get(PythonEnvironment),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(BigQueryCostEstimate)
  .toDynamicValue((context) => {
    return new BigQueryCostEstimate(
      context.container.get(DBTProjectContainer),
      context.container.get("DBTTerminal"),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(ConversationProvider)
  .toDynamicValue((context) => {
    return new ConversationProvider(
      context.container.get(ConversationService),
      context.container.get(UsersService),
      context.container.get("DBTTerminal"),
      context.container.get(SharedStateService),
      context.container.get(QueryManifestService),
      context.container.get(TelemetryService),
    );
  })
  .inSingletonScope();

container
  .bind(SQLLineagePanel)
  .toDynamicValue((context) => {
    return new SQLLineagePanel(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
      context.container.get(SharedStateService),
      context.container.get(UsersService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(VSCodeCommands)
  .toDynamicValue((context) => {
    return new VSCodeCommands(
      context.container.get(DBTProjectContainer),
      context.container.get(RunModel),
      context.container.get(SqlToModel),
      context.container.get(ValidateSql),
      context.container.get(AltimateScan),
      context.container.get(WalkthroughCommands),
      context.container.get(BigQueryCostEstimate),
      context.container.get("DBTTerminal"),
      context.container.get(DiagnosticsOutputChannel),
      context.container.get(SharedStateService),
      context.container.get(ConversationProvider),
      context.container.get(PythonEnvironment),
      context.container.get(DBTClient),
      context.container.get(SQLLineagePanel),
      context.container.get(QueryManifestService),
      context.container.get(AltimateRequest),
      context.container.get("DatapilotNotebookController"),
    );
  })
  .inSingletonScope();

// Bind webview panel components
container
  .bind(QueryResultPanel)
  .toDynamicValue((context) => {
    return new QueryResultPanel(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(AltimateRequest),
      context.container.get(SharedStateService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
      context.container.get(UsersService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(DocsEditViewPanel)
  .toDynamicValue((context) => {
    return new DocsEditViewPanel(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get(NewDocsGenPanel),
      context.container.get(DocGenService),
      context.container.get(DbtTestService),
      context.container.get("DBTTerminal"),
      context.container.get(DbtLineageService),
    );
  })
  .inSingletonScope();

container
  .bind(LineagePanel)
  .toDynamicValue((context) => {
    return new LineagePanel(
      context.container.get(NewLineagePanel),
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
    );
  })
  .inSingletonScope();

container
  .bind(DataPilotPanel)
  .toDynamicValue((context) => {
    return new DataPilotPanel(
      context.container.get(DBTProjectContainer),
      context.container.get(TelemetryService),
      context.container.get(AltimateRequest),
      context.container.get(DocGenService),
      context.container.get(SharedStateService),
      context.container.get(QueryAnalysisService),
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(DbtTestService),
      context.container.get(FileService),
      context.container.get(UsersService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(InsightsPanel)
  .toDynamicValue((context) => {
    return new InsightsPanel(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(DbtIntegrationClient),
      context.container.get(TelemetryService),
      context.container.get(SharedStateService),
      context.container.get("DBTTerminal"),
      context.container.get(QueryManifestService),
      context.container.get(ValidationProvider),
      context.container.get(UsersService),
      context.container.get("NotebookFileSystemProvider"),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(NewDocsGenPanel)
  .toDynamicValue((context) => {
    return new NewDocsGenPanel(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get(DocGenService),
      context.container.get(SharedStateService),
      context.container.get(QueryManifestService),
      context.container.get("DBTTerminal"),
      context.container.get(DbtTestService),
      context.container.get(UsersService),
      context.container.get(DbtDocsView),
      context.container.get(ConversationProvider),
      context.container.get(ConversationService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

container
  .bind(NewLineagePanel)
  .toDynamicValue((context) => {
    return new NewLineagePanel(
      context.container.get(DBTProjectContainer),
      context.container.get(AltimateRequest),
      context.container.get(TelemetryService),
      context.container.get("DBTTerminal"),
      context.container.get(DbtLineageService),
      context.container.get(SharedStateService),
      context.container.get(QueryManifestService),
      context.container.get(UsersService),
      context.container.get(AltimateAuthService),
    );
  })
  .inSingletonScope();

// Bind WebviewViewProviders
container
  .bind(WebviewViewProviders)
  .toDynamicValue((context) => {
    return new WebviewViewProviders(
      context.container.get(QueryResultPanel),
      context.container.get(DocsEditViewPanel),
      context.container.get(LineagePanel),
      context.container.get(DataPilotPanel),
      context.container.get(InsightsPanel),
    );
  })
  .inSingletonScope();

// Bind treeview components
container
  .bind(ChildrenModelTreeview)
  .toDynamicValue((context) => {
    return new ChildrenModelTreeview(
      context.container.get(DBTProjectContainer),
    );
  })
  .inSingletonScope();

container
  .bind(ParentModelTreeview)
  .toDynamicValue((context) => {
    return new ParentModelTreeview(context.container.get(DBTProjectContainer));
  })
  .inSingletonScope();

container
  .bind(ModelTestTreeview)
  .toDynamicValue((context) => {
    return new ModelTestTreeview(context.container.get(DBTProjectContainer));
  })
  .inSingletonScope();

container
  .bind(DocumentationTreeview)
  .toDynamicValue((context) => {
    return new DocumentationTreeview(
      context.container.get(DBTProjectContainer),
    );
  })
  .inSingletonScope();

container
  .bind(IconActionsTreeview)
  .toDynamicValue(() => {
    return new IconActionsTreeview();
  })
  .inSingletonScope();

// Bind TreeviewProviders
container
  .bind(TreeviewProviders)
  .toDynamicValue((context) => {
    return new TreeviewProviders(
      context.container.get(ChildrenModelTreeview),
      context.container.get(ParentModelTreeview),
      context.container.get(ModelTestTreeview),
      context.container.get(DocumentationTreeview),
      context.container.get(IconActionsTreeview),
      context.container.get(RunHistoryTreeviewProvider),
    );
  })
  .inSingletonScope();

// Bind ContentProviders
container
  .bind(ContentProviders)
  .toDynamicValue((context) => {
    return new ContentProviders(
      context.container.get(SqlPreviewContentProvider),
    );
  })
  .inSingletonScope();

// Bind DocumentFormattingEditProviders
container
  .bind(DocumentFormattingEditProviders)
  .toDynamicValue((context) => {
    return new DocumentFormattingEditProviders(
      context.container.get(DbtDocumentFormattingEditProvider),
    );
  })
  .inSingletonScope();

// Bind StatusBars
container
  .bind(StatusBars)
  .toDynamicValue((context) => {
    return new StatusBars(
      context.container.get(VersionStatusBar),
      context.container.get(DeferToProductionStatusBar),
      context.container.get(TargetStatusBar),
    );
  })
  .inSingletonScope();

// Bind DbtPowerUserActionsCenter
container
  .bind(DbtPowerUserActionsCenter)
  .toDynamicValue((context) => {
    return new DbtPowerUserActionsCenter(
      context.container.get(DbtPowerUserControlCenterAction),
      context.container.get(ProjectQuickPick),
      context.container.get(DBTProjectContainer),
      context.container.get(DbtSQLAction),
    );
  })
  .inSingletonScope();

// Bind CommentProviders
container
  .bind(CommentProviders)
  .toDynamicValue((context) => {
    return new CommentProviders(context.container.get(ConversationProvider));
  })
  .inSingletonScope();

// Finally, bind the main DBTPowerUserExtension
container
  .bind(DBTPowerUserExtension)
  .toDynamicValue((context) => {
    return new DBTPowerUserExtension(
      context.container.get(DBTProjectContainer),
      context.container.get(WebviewViewProviders),
      context.container.get(AutocompletionProviders),
      context.container.get(DefinitionProviders),
      context.container.get(VSCodeCommands),
      context.container.get(TreeviewProviders),
      context.container.get(ContentProviders),
      context.container.get(CodeLensProviders),
      context.container.get(DocumentFormattingEditProviders),
      context.container.get(StatusBars),
      context.container.get(DbtPowerUserActionsCenter),
      context.container.get(TelemetryService),
      context.container.get(HoverProviders),
      context.container.get(ValidationProvider),
      context.container.get(CommentProviders),
      context.container.get("NotebookProviders"),
      context.container.get(DbtPowerUserMcpServer),
    );
  })
  .inSingletonScope();
