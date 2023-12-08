import {
  Disposable,
  commands,
  workspace,
  window,
  ExtensionContext,
  ConfigurationTarget,
  Uri,
} from "vscode";
import { AutocompletionProviders } from "./autocompletion_provider";
import { CodeLensProviders } from "./code_lens_provider";
import { VSCodeCommands } from "./commands";
import { ContentProviders } from "./content_provider";
import { DefinitionProviders } from "./definition_provider";
import { DocumentFormattingEditProviders } from "./document_formatting_edit_provider";
import { DBTProjectContainer } from "./manifest/dbtProjectContainer";
import { StatusBars } from "./statusbar";
import { TreeviewProviders } from "./treeview_provider";
import { provideSingleton } from "./utils";
import { WebviewViewProviders } from "./webview_provider";
import { TelemetryService } from "./telemetry";
import { HoverProviders } from "./hover_provider";
import { DbtPowerUserActionsCenter } from "./quickpick";

@provideSingleton(DBTPowerUserExtension)
export class DBTPowerUserExtension implements Disposable {
  static DBT_SQL_SELECTOR = [
    { language: "jinja-sql", scheme: "file" },
    { language: "sql", scheme: "file" },
  ];
  static DBT_YAML_SELECTOR = [
    { language: "yaml", scheme: "file" },
    { language: "jinja-yaml", scheme: "file" },
  ];
  static DBT_YAML_SQL_SELECTOR = [
    { language: "jinja-sql", scheme: "file" },
    { language: "sql", scheme: "file" },
    { language: "yaml", scheme: "file" },
    { language: "jinja-yaml", scheme: "file" },
  ];

  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private webviewViewProviders: WebviewViewProviders,
    private autocompletionProviders: AutocompletionProviders,
    private definitionProviders: DefinitionProviders,
    private vscodeCommands: VSCodeCommands,
    private treeviewProviders: TreeviewProviders,
    private contentProviders: ContentProviders,
    private codeLensProviders: CodeLensProviders,
    private documentFormattingEditProviders: DocumentFormattingEditProviders,
    private statusBars: StatusBars,
    private puStatusBars: DbtPowerUserActionsCenter,
    private telemetry: TelemetryService,
    private hoverProviders: HoverProviders,
  ) {
    this.disposables.push(
      this.dbtProjectContainer,
      this.webviewViewProviders,
      this.definitionProviders,
      this.autocompletionProviders,
      this.treeviewProviders,
      this.contentProviders,
      this.codeLensProviders,
      this.vscodeCommands,
      this.documentFormattingEditProviders,
      this.statusBars,
      this.puStatusBars,
      this.telemetry,
      this.hoverProviders,
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async activate(context: ExtensionContext): Promise<void> {
    this.dbtProjectContainer.setContext(context);
    this.dbtProjectContainer.initializeWalkthrough();
    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();
    window.registerUriHandler({
      handleUri(uri: Uri) {
        const params = new URLSearchParams(uri.query);
        const key = params.get("key");
        const instance = params.get("instance");

        if (!key || !instance) {
          return;
        }

        // Get workspace configuration
        const config = workspace.getConfiguration();

        // Update configuration values
        config.update("dbt.altimateAiKey", key, ConfigurationTarget.Workspace);
        config.update(
          "dbt.altimateInstanceName",
          instance,
          ConfigurationTarget.Workspace,
        );

        window.showInformationMessage("Configured Altimate AI credentials");
      },
    });
  }
}
