import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import {
  DiagnosticCollection,
  EventEmitter,
  Uri,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { DBTProject } from "./manifest/dbtProject";
import {
  DBTProjectContainer,
  ProjectRegisteredUnregisteredEvent,
} from "./manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { DBTProjectLogFactory } from "./manifest/modules/dbtProjectLog";
import { SourceFileWatchersFactory } from "./manifest/modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./manifest/modules/targetWatchers";
import { PythonEnvironment } from "./manifest/pythonEnvironment";
import { TelemetryService } from "./telemetry";
import {
  DBTCoreDetection,
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
} from "./dbt_client/dbtCoreIntegration";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  DBTDetection,
  DBTProjectDetection,
  PythonDBTCommandExecutionStrategy,
} from "./dbt_client/dbtIntegration";
import {
  DBTCloudDetection,
  DBTCloudProjectDetection,
  DBTCloudProjectIntegration,
} from "./dbt_client/dbtCloudIntegration";
import { CommandProcessExecutionFactory } from "./commandProcessExecution";
import { AltimateRequest } from "./altimate";
import { ValidationProvider } from "./validation_provider";
import { DBTConfiguration } from "./dbt_client/configuration";
import { VSCodeDBTConfiguration } from "./dbt_client/vscodeConfiguration";
import { DeferToProdService } from "./services/deferToProdService";
import { SharedStateService } from "./services/sharedStateService";
import { NotebookKernelClient, NotebookDependencies } from "@lib";
import { DBTCoreCommandProjectIntegration } from "./dbt_client/dbtCoreCommandIntegration";
import {
  DBTFusionCommandDetection,
  DBTFusionCommandProjectDetection,
  DBTFusionCommandProjectIntegration,
} from "./dbt_client/dbtFusionCommandIntegration";

export const container = new Container();
container.load(buildProviderModule());

// Bind DBTConfiguration
container
  .bind<DBTConfiguration>("DBTConfiguration")
  .to(VSCodeDBTConfiguration)
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
        container.get(DBTTerminal),
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
    [Uri, string]
  >((context: interfaces.Context) => {
    return (projectRoot: Uri, dbtPath: string) => {
      const { container } = context;
      return new CLIDBTCommandExecutionStrategy(
        container.get(CommandProcessExecutionFactory),
        container.get(PythonEnvironment),
        container.get(DBTTerminal),
        container.get(TelemetryService),
        projectRoot.fsPath,
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
    [Uri, DiagnosticCollection]
  >((context: interfaces.Context) => {
    return (
      projectRoot: Uri,
      projectConfigDiagnostics: DiagnosticCollection,
    ) => {
      const { container } = context;
      return new DBTCoreProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(PythonEnvironment),
        container.get(TelemetryService),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(DBTProjectContainer),
        container.get(AltimateRequest),
        container.get(DBTTerminal),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot,
        projectConfigDiagnostics,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTCoreCommandProjectIntegration>")
  .toFactory<
    DBTCoreCommandProjectIntegration,
    [Uri, DiagnosticCollection]
  >((context: interfaces.Context) => {
    return (
      projectRoot: Uri,
      projectConfigDiagnostics: DiagnosticCollection,
    ) => {
      const { container } = context;
      return new DBTCoreCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(PythonEnvironment),
        container.get(TelemetryService),
        container.get(PythonDBTCommandExecutionStrategy),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(DBTProjectContainer),
        container.get(AltimateRequest),
        container.get(DBTTerminal),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot,
        projectConfigDiagnostics,
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCoreProjectIntegration>
  >("Factory<DBTFusionCommandProjectIntegration>")
  .toFactory<
    DBTFusionCommandProjectIntegration,
    [Uri, DiagnosticCollection]
  >((context: interfaces.Context) => {
    return (projectRoot: Uri) => {
      const { container } = context;
      return new DBTFusionCommandProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(TelemetryService),
        container.get(PythonEnvironment),
        container.get(DBTTerminal),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot.fsPath,
        container.get(AltimateRequest),
      );
    };
  });

container
  .bind<
    interfaces.Factory<DBTCloudProjectIntegration>
  >("Factory<DBTCloudProjectIntegration>")
  .toFactory<
    DBTCloudProjectIntegration,
    [Uri]
  >((context: interfaces.Context) => {
    return (projectRoot: Uri) => {
      const { container } = context;
      return new DBTCloudProjectIntegration(
        container.get(DBTCommandExecutionInfrastructure),
        container.get(DBTCommandFactory),
        container.get("Factory<CLIDBTCommandExecutionStrategy>"),
        container.get(TelemetryService),
        container.get(PythonEnvironment),
        container.get(DBTTerminal),
        container.get(ValidationProvider),
        container.get(DeferToProdService),
        projectRoot.fsPath,
        container.get(AltimateRequest),
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
        container.get(SourceFileWatchersFactory),
        container.get(DBTProjectLogFactory),
        container.get(TargetWatchersFactory),
        container.get(DBTCommandFactory),
        container.get(DBTTerminal),
        container.get(SharedStateService),
        container.get(TelemetryService),
        container.get("Factory<DBTCoreProjectIntegration>"),
        container.get("Factory<DBTCoreCommandProjectIntegration>"),
        container.get("Factory<DBTCloudProjectIntegration>"),
        container.get("Factory<DBTFusionCommandProjectIntegration>"),
        container.get(AltimateRequest),
        container.get(ValidationProvider),
        path,
        projectConfig,
        _onManifestChanged,
      );
    };
  });

container
  .bind<interfaces.Factory<NotebookKernelClient>>("Factory<NotebookClient>")
  .toFactory<NotebookKernelClient, [string]>((context: interfaces.Context) => {
    return (path: string) => {
      const { container } = context;
      return new NotebookKernelClient(
        path,
        container.get(DBTCommandExecutionInfrastructure),
        container.get(NotebookDependencies),
        container.get(DBTTerminal),
      );
    };
  });
