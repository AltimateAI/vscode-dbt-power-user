import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { EventEmitter, Uri, WorkspaceFolder } from "vscode";
import { DBTCommandFactory } from "./dbt_client/dbtCommandFactory";
import { DBTTerminal } from "./dbt_client/dbtTerminal";
import { EnvironmentVariables } from "./domain";
import { DBTProject } from "./manifest/dbtProject";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { DBTProjectLogFactory } from "./manifest/modules/dbtProjectLog";
import { SourceFileWatchersFactory } from "./manifest/modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./manifest/modules/targetWatchers";
import { QueryResultPanel } from "./webview_view/queryResultPanel";

export const container = new Container();
container.load(buildProviderModule());

container
  .bind<interfaces.Factory<DBTWorkspaceFolder>>("Factory<DBTWorkspaceFolder>")
  .toFactory<
    DBTWorkspaceFolder,
    [
      WorkspaceFolder,
      EventEmitter<ManifestCacheChangedEvent>,
      string,
      EnvironmentVariables
    ]
  >((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      pythonPath: string,
      envVars: EnvironmentVariables
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("Factory<DBTProject>"),
        workspaceFolder,
        _onManifestChanged,
        pythonPath,
        envVars
      );
    };
  });

container
  .bind<interfaces.Factory<DBTProject>>("Factory<DBTProject>")
  .toFactory<
    DBTProject,
    [
      Uri,
      any,
      EventEmitter<ManifestCacheChangedEvent>,
      string,
      EnvironmentVariables
    ]
  >((context: interfaces.Context) => {
    return (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      pythonPath: string,
      envVars: EnvironmentVariables
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(DBTProjectContainer),
        container.get(SourceFileWatchersFactory),
        container.get(DBTProjectLogFactory),
        container.get(TargetWatchersFactory),
        container.get(DBTCommandFactory),
        container.get(DBTTerminal),
        container.get(QueryResultPanel),
        path,
        projectConfig,
        _onManifestChanged,
        pythonPath,
        envVars
      );
    };
  });
