import { Disposable, ExtensionContext } from "vscode";
import { AutocompletionProviders } from "./autocompletion_provider";
import { VSCodeCommands } from "./commands";
import { DefinitionProviders } from "./definition_provider";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { StatusBars } from "./statusbar";
import { TreeviewProviders } from "./treeview_provider";
import { WebviewViewProviders } from "./webview_view";
import { ContentProviders } from "./content_provider";
import { provideSingleton } from "./utils";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension implements Disposable {
  static DBT_MODE = [{ language: "jinja-sql", scheme: "file" }, { language: "sql", scheme: "file"}];
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private webviewViewProviders: WebviewViewProviders,
    private autocompletionProviders: AutocompletionProviders,
    private definitionProviders: DefinitionProviders,
    private vscodeCommands: VSCodeCommands,
    private treeviewProviders: TreeviewProviders,
    private contentProviders: ContentProviders,
    private statusBars: StatusBars,
  ) {
    this.disposables.push(
      this.dbtProjectContainer,
      this.webviewViewProviders,
      this.definitionProviders,
      this.autocompletionProviders,
      this.treeviewProviders,
      this.contentProviders,
      this.vscodeCommands,
      this.statusBars,
    );
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  async activate(context: ExtensionContext): Promise<void> {
    this.dbtProjectContainer.resolveUri(context);
    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();
  }

}
