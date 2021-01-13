import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import "reflect-metadata";
import * as vscode from "vscode";
import { TreeviewProviderFactory } from "./treeview_provider/treeviewProviderFactory";
import { DefinitionProviderFactory } from "./definition_provider/definitionProviderFactory";
import { dbtProjectContainer } from "./manifest/dbtProjectContainer";
import { DBTStatusBar } from "./statusbar/dbtStatusBar";
import { RunResultStatusBar } from "./statusbar/runResultStatusBar";
import { DBTPowerUserExtension } from "./DBTPowerUserExtension";

export const DBT_MODE = { language: "jinja-sql", scheme: "file" };

const container = new Container();
container.load(buildProviderModule());

export async function activate(context: vscode.ExtensionContext) {
  const dbtPowerUserExtension = container.get(DBTPowerUserExtension);

  context.subscriptions.push(
    ...DefinitionProviderFactory.createDefinitionProviders(),
    ...dbtPowerUserExtension.createAutoCompletionProviders(),
    ...TreeviewProviderFactory.createModelTreeViews(),
    ...dbtPowerUserExtension.createCommands(),
    new RunResultStatusBar(),
    new DBTStatusBar(),
    dbtProjectContainer
  );

  await dbtProjectContainer.detectDBT();
  await dbtProjectContainer.initializeDBTProjects();
}

export function deactivate() {}
