import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { EventEmitter, Uri, WorkspaceFolder } from "vscode";
import { DBTCommandFactory } from "./dbt_client/dbtCommandFactory";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { EnvironmentVariables } from "./domain";
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
import { QueryResultPanel } from "./webview_provider/queryResultPanel";
import { TelemetryService } from "./telemetry";

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
      string,
      EnvironmentVariables,
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
        container.get(TelemetryService),
        workspaceFolder,
        _onManifestChanged,
        _onProjectRegisteredUnregistered,
      );
    };
  });

container
  .bind<interfaces.Factory<DBTProject>>("Factory<DBTProject>")
  .toFactory<DBTProject, [Uri, any, EventEmitter<ManifestCacheChangedEvent>]>(
    (context: interfaces.Context) => {
      return (
        path: Uri,
        projectConfig: any,
        _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      ) => {
        const { container } = context;
        return new DBTProject(
          container.get(DBTProjectContainer),
          container.get(PythonEnvironment),
          container.get(SourceFileWatchersFactory),
          container.get(DBTProjectLogFactory),
          container.get(TargetWatchersFactory),
          container.get(DBTCommandFactory),
          container.get(DBTTerminal),
          container.get(QueryResultPanel),
          container.get(TelemetryService),
          path,
          projectConfig,
          _onManifestChanged,
        );
      };
    },
  );
