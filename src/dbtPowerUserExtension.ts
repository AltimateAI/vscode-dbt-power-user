import { Disposable, ExtensionContext, window, WebviewPanel, workspace, commands, TextEditor, ViewColumn, languages } from "vscode";
import { AutocompletionProviders } from "./autocompletion_provider";
import { VSCodeCommands } from "./commands";
import { DefinitionProviders } from "./definition_provider";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { StatusBars } from "./statusbar";
import { TreeviewProviders } from "./treeview_provider";
import { provideSingleton } from "./utils";
import { QueryResultPanelLoader, getWebviewOptions } from "./webview";
import { ContentProviders } from "./content_provider";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension implements Disposable {
  static DBT_MODE = { language: "jinja-sql", scheme: "file" };
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryResultPanelLoader: QueryResultPanelLoader,
    private autocompletionProviders: AutocompletionProviders,
    private definitionProviders: DefinitionProviders,
    private vscodeCommands: VSCodeCommands,
    private treeviewProviders: TreeviewProviders,
    private contentProviders: ContentProviders,
    private statusBars: StatusBars,
  ) {
    this.disposables.push(
      this.dbtProjectContainer,
      this.queryResultPanelLoader,
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
    if (window.registerWebviewPanelSerializer) {
      // Query runner
      const queryResultPanelLoader = this.queryResultPanelLoader;
      this.disposables.push(window.registerWebviewPanelSerializer(QueryResultPanelLoader.VIEW_TYPE, {
        async deserializeWebviewPanel(webviewPanel: WebviewPanel, state: any) {
          // TODO: state not being used is definitely fishy
          webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
          queryResultPanelLoader.revive(webviewPanel);
        }
      }));
    }
    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();
  }


}
