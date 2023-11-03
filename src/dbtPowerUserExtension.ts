import { Disposable, ExtensionContext, commands, workspace } from "vscode";
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
import { PUStatusBars } from "./quickpick";

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
    private puStatusBars: PUStatusBars,
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
    // set contexts
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.updateVSCode",
      await this.vscodeCommands.needVscodeUpdate(),
    );
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.needsExtensionUpdate",
      await this.vscodeCommands.needExtensionUpdate(),
    );
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.extensionVersion",
      "very old",
    );

    // show setup walkthrough if needed
    const showSetupWalkthrough = context.globalState.get(
      "showSetupWalkthrough",
    );
    // not sure why this isnt working
    const showSetup2 = workspace
      .getConfiguration("dbt")
      .get("showSetupWalkthrough");
    if (showSetupWalkthrough === undefined || showSetupWalkthrough === true) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }

    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();
  }
}
