import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Uri, Event, EventEmitter, WorkspaceFolder } from "vscode";
import { GraphMetaMap } from "./domain";
import { DBTProject } from "./manifest/dbtProject";
import { DbtProjectContainer } from "./manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "./manifest/event/projectConfigChangedEvent";
import { DBTProjectLog } from "./manifest/handlers/dbtProjectLog";
import { SourceFileWatchers } from "./manifest/handlers/sourceFileWatchers";
import { ModelTreeviewProvider } from "./treeview_provider/ModelParentTreeviewProvider";

export const container = new Container();
container.load(buildProviderModule());

container
  .bind<interfaces.Factory<SourceFileWatchers>>("SourceFileWatchersFactory")
  .toFactory<SourceFileWatchers>((context: interfaces.Context) => {
    return (onProjectConfigChanged: Event<ProjectConfigChangedEvent>) => {
      return new SourceFileWatchers(onProjectConfigChanged);
    };
  });

container
  .bind<interfaces.Factory<DBTProjectLog>>("DBTProjectLogFactory")
  .toFactory<DBTProjectLog>((context: interfaces.Context) => {
    return (onProjectConfigChanged: Event<ProjectConfigChangedEvent>) => {
      return new DBTProjectLog(onProjectConfigChanged);
    };
  });

container
  .bind<interfaces.Factory<DBTProject>>("DBTProjectFactory")
  .toFactory<DBTProject>((context: interfaces.Context) => {
    return (
      path: Uri,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(DbtProjectContainer),
        container.get("SourceFileWatchersFactory"),
        container.get("DBTProjectLogFactory"),
        path,
        _onManifestChanged
      );
    };
  });

container
  .bind<interfaces.Factory<DBTWorkspaceFolder>>("DBTWorkspaceFolderFactory")
  .toFactory<DBTWorkspaceFolder>((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("DBTProjectFactory"),
        workspaceFolder,
        _onManifestChanged
      );
    };
  });

container
  .bind<interfaces.Factory<ModelTreeviewProvider>>(
    "ModelTreeviewProviderFactory"
  )
  .toFactory<ModelTreeviewProvider>((context: interfaces.Context) => {
    return (treeType: keyof GraphMetaMap) => {
      const { container } = context;
      return new ModelTreeviewProvider(
        container.get(DbtProjectContainer),
        treeType
      );
    };
  });
