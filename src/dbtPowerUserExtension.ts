import { NotebookProviders } from "@lib";
import { Disposable, ExtensionContext, workspace } from "vscode";
import { AutocompletionProviders } from "./autocompletion_provider";
import { CodeLensProviders } from "./code_lens_provider";
import { VSCodeCommands } from "./commands";
import { CommentProviders } from "./comment_provider";
import { ContentProviders } from "./content_provider";
import { DBTProjectContainer } from "./dbt_client/dbtProjectContainer";
import { DefinitionProviders } from "./definition_provider";
import { DocumentFormattingEditProviders } from "./document_formatting_edit_provider";
import { HoverProviders } from "./hover_provider";
import { DbtPowerUserMcpServer } from "./mcp";
import { DbtPowerUserActionsCenter } from "./quickpick";
import { StatusBars } from "./statusbar";
import { TelemetryService } from "./telemetry";
import { TreeviewProviders } from "./treeview_provider";
import { ValidationProvider } from "./validation_provider";
import { WebviewViewProviders } from "./webview_provider";

export class DBTPowerUserExtension implements Disposable {
  static DBT_SQL_SELECTOR = [
    { language: "jinja-sql", scheme: "file" },
    { language: "sql", scheme: "file" },
    { language: "jinja-sql", scheme: "untitled" },
    { language: "jinja-sql", scheme: "vscode-notebook-cell" },
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
    private validationProvider: ValidationProvider,
    private commentProviders: CommentProviders,
    private notebookProviders: NotebookProviders,
    private mcpServer: DbtPowerUserMcpServer,
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
      this.validationProvider,
      this.commentProviders,
      this.notebookProviders,
      this.mcpServer,
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
    try {
      await this.mcpServer.updateMcpExtensionApi();
      this.dbtProjectContainer.setContext(context);
      this.dbtProjectContainer.initializeWalkthrough();
      await this.dbtProjectContainer.detectDBT();
      await this.dbtProjectContainer.initializeDBTProjects();
      this.statusBars.initialize();
      // Reinitialize extension when dbt integration type changes
      let dbtIntegration = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");
      this.disposables.push(
        workspace.onDidChangeConfiguration(async (e) => {
          if (!e.affectsConfiguration("dbt.dbtIntegration")) {
            return;
          }
          const newDbtIntegration = workspace
            .getConfiguration("dbt")
            .get<string>("dbtIntegration", "core");
          if (
            dbtIntegration !== newDbtIntegration &&
            ["core", "cloud", "corecommand", "fusion"].includes(
              newDbtIntegration,
            )
          ) {
            dbtIntegration = newDbtIntegration;
            try {
              await this.dbtProjectContainer.reinitialize();
              this.statusBars.initialize();
            } catch (error) {
              this.telemetry.sendTelemetryError(
                "dbtIntegrationChangeError",
                error,
              );
            }
          }
        }),
      );
    } catch (error) {
      this.telemetry.sendTelemetryError("extensionActivationError", error);
    }
  }
}
