import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import {
  DiagnosticCollection,
  EventEmitter,
  Uri,
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
  DBTCoreProjectDetection,
  DBTCoreProjectIntegration,
} from "./dbt_client/dbtCoreIntegration";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  PythonDBTCommandExecutionStrategy,
} from "./dbt_client/dbtIntegration";
import {
  DBTCloudProjectDetection,
  DBTCloudProjectIntegration,
} from "./dbt_client/dbtCloudIntegration";
import { CommandProcessExecutionFactory } from "./commandProcessExecution";
import { AltimateRequest } from "./altimate";
import { ValidationProvider } from "./validation_provider";
import { DeferToProdService } from "./services/deferToProdService";
import { SharedStateService } from "./services/sharedStateService";
import { DBTCoreCommandProjectIntegration } from "./dbt_client/dbtCoreCommandIntegration";

export const container = new Container();
container.load(buildProviderModule());

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
        container.get(DBTCoreProjectDetection),
        container.get(DBTCloudProjectDetection),
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
        projectRoot,
        dbtPath,
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
        projectRoot,
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
        container.get(AltimateRequest),
        container.get(ValidationProvider),
        path,
        projectConfig,
        _onManifestChanged,
      );
    };
  });
