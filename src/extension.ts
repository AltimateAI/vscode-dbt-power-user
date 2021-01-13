import { Container, interfaces } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import "reflect-metadata";
import * as vscode from "vscode";
import { DBTStatusBar } from "./statusbar/dbtStatusBar";
import { RunResultStatusBar } from "./statusbar/runResultStatusBar";
import { DBTPowerUserExtension } from "./DBTPowerUserExtension";
import { DBTWorkspaceFolder } from "./manifest/dbtWorkspaceFolder";
import { EventEmitter, Uri, WorkspaceFolder } from "vscode";
import { ManifestCacheChangedEvent } from "./manifest/event/manifestCacheChangedEvent";
import { DBTProject } from "./manifest/dbtProject";
import { DbtProjectContainer } from "./manifest/dbtProjectContainer";
import { ModelTreeviewProvider } from "./treeview_provider/ModelParentTreeviewProvider";
import { GraphMetaMap } from "./domain";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

const container = new Container();
container.load(buildProviderModule());

container
  .bind<interfaces.Factory<DBTProject>>("DBTProject")
  .toFactory<DBTProject>((context: interfaces.Context) => {
    return (
      path: Uri,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => {
      const { container } = context;
      return new DBTProject(
        container.get(DbtProjectContainer),
        path,
        _onManifestChanged
      );
    };
  });

container
  .bind<interfaces.Factory<DBTWorkspaceFolder>>("DBTWorkspaceFolder")
  .toFactory<DBTWorkspaceFolder>((context: interfaces.Context) => {
    return (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => {
      const { container } = context;
      return new DBTWorkspaceFolder(
        container.get("DBTProject"),
        workspaceFolder,
        _onManifestChanged
      );
    };
  });

container
  .bind<interfaces.Factory<ModelTreeviewProvider>>("ModelTreeviewProvider")
  .toFactory<ModelTreeviewProvider>((context: interfaces.Context) => {
    return (treeType: keyof GraphMetaMap) => {
      const { container } = context;
      return new ModelTreeviewProvider(
        container.get(DbtProjectContainer),
        treeType
      );
    };
  });

export async function activate(context: vscode.ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);
  const dbtProjectContainer = container.get(DbtProjectContainer);
  const runResultStatusBar = container.get(RunResultStatusBar);
  const dbtStatusBar = container.get(DBTStatusBar);

  context.subscriptions.push(
    ...dbtPowerUserExtension.createDefinitionProviders(),
    ...dbtPowerUserExtension.createAutoCompletionProviders(),
    ...dbtPowerUserExtension.createModelTreeViews(),
    ...dbtPowerUserExtension.createCommands(),
    runResultStatusBar,
    dbtStatusBar,
    dbtProjectContainer
  );

  await dbtProjectContainer.detectDBT();
  await dbtProjectContainer.initializeDBTProjects();
}

export function deactivate() {}
