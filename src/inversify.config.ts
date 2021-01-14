import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Uri, EventEmitter, WorkspaceFolder } from "vscode";
import { CommandProcessExecution } from "./dbt_client/commandProcessExecution";
import { DBTCommandFactory } from "./dbt_client/dbtCommandFactory";
import { DBTProject } from "./manifest/dbtProject";
import { DbtProjectContainer } from "./manifest/dbtProjectContainer";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { DBTProjectLog } from "./manifest/handlers/dbtProjectLog";
import { SourceFileWatchers } from "./manifest/handlers/sourceFileWatchers";
import { TargetWatchers } from "./manifest/handlers/targetWatchers";

export const container = new Container();
container.load(buildProviderModule());

container
  .bind<interfaces.Newable<CommandProcessExecution>>(
    "Newable<CommandProcessExecution>"
  )
  .toConstructor<CommandProcessExecution>(CommandProcessExecution);

container
  .bind<interfaces.Newable<SourceFileWatchers>>("Newable<SourceFileWatchers>")
  .toConstructor<SourceFileWatchers>(SourceFileWatchers);

container
  .bind<interfaces.Newable<DBTProjectLog>>("Newable<DBTProjectLog>")
  .toConstructor<DBTProjectLog>(DBTProjectLog);

container
  .bind<interfaces.Newable<TargetWatchers>>("Newable<TargetWatchers>")
  .toConstructor<TargetWatchers>(TargetWatchers);

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
  .bind<interfaces.Factory<DBTProject>>("DBTProjectFactory")
  .toFactory<DBTProject>((context: interfaces.Context) => {
    return (
      path: Uri,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(DbtProjectContainer),
        container.get("Newable<SourceFileWatchers>"),
        container.get("Newable<DBTProjectLog>"),
        container.get("Newable<TargetWatchers>"),
        container.get(DBTCommandFactory),
        path,
        _onManifestChanged
      );
    };
  });
