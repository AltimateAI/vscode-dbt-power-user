import {
  Disposable,
  commands,
  workspace,
  window,
  ExtensionContext,
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

enum PromptAnswer {
  YES = "Yes",
  IGNORE = "Ignore",
}

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

  async showWalkthrough() {
    const answer = await window.showInformationMessage(
      `Thanks for installing dbt Power User. Do you need help setting up the extension?`,
      PromptAnswer.YES,
      PromptAnswer.IGNORE,
    );
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.showSetupWalkthrough",
      true,
    );
    if (answer === PromptAnswer.YES) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }
  }

  async activate(context: ExtensionContext): Promise<void> {
    this.dbtProjectContainer.setContext(context);
    await this.dbtProjectContainer.detectDBT();
    await this.dbtProjectContainer.initializeDBTProjects();

    // show setup walkthrough if needed
    const showSetupWalkthrough = context.globalState.get(
      "showSetupWalkthrough",
    );
    if (showSetupWalkthrough === undefined || showSetupWalkthrough === true) {
      this.showWalkthrough();
    }

    const allProjects = await this.dbtProjectContainer.getProjects();

    commands.executeCommand(
      "setContext",
      "dbtPowerUser.projectCount",
      allProjects.length,
    );
    if (allProjects.length === 1) {
      this.dbtProjectContainer.setToWorkspaceState(
        "dbtPowerUser.projectSelected",
        {
          label: allProjects[0].getProjectName(),
          description: allProjects[0].projectRoot.fsPath,
          uri: allProjects[0].projectRoot,
        },
      );
      commands.executeCommand(
        "setContext",
        "dbtPowerUser.walkthroughProjectSelected",
        true,
      );
    }
    const existingAssociations = workspace
      .getConfiguration("files")
      .get<any>("associations", {});
    let showFileAssociationsStep = false;
    Object.entries({
      "*.sql": ["jinja-sql", "sql"],
      "*.yml": ["jinja-yaml", "yaml"],
    }).forEach(([key, value]) => {
      if (existingAssociations[key] === undefined) {
        showFileAssociationsStep ||= true;
      }
      showFileAssociationsStep ||= !value.includes(existingAssociations[key]);
    });
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.showFileAssociationStep",
      showFileAssociationsStep,
    );
  }
}
