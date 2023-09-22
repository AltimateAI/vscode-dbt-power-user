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
import { PythonEnvironment } from "./manifest/pythonEnvironment";
import { QueryResultPanel } from "./webview_provider/queryResultPanel";
import { TelemetryService } from "./telemetry";
import { NewLineagePanel } from "./webview_provider/newLineageView";
import { ModelGraphViewPanel } from "./webview_provider/modelGraphViewPanel";
import { AltimateRequest } from "./altimate";

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
      EnvironmentVariables,
    ]
  >((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("Factory<DBTProject>"),
        container.get(TelemetryService),
        workspaceFolder,
        _onManifestChanged,
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

container
  .bind<interfaces.Factory<NewLineagePanel>>("Factory<NewLineagePanel>")
  .toFactory<NewLineagePanel>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      return new NewLineagePanel(
        container.get(DBTProjectContainer),
        container.get(AltimateRequest),
        container.get(TelemetryService),
      );
    };
  });

container
  .bind<interfaces.Factory<ModelGraphViewPanel>>("Factory<ModelGraphViewPanel>")
  .toFactory<ModelGraphViewPanel>((context: interfaces.Context) => {
    return () => {
      const { container } = context;
      return new ModelGraphViewPanel(
        container.get(DBTProjectContainer),
        container.get(TelemetryService),
      );
    };
  });
