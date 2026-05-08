import { probeDbtCoreVersion } from "@altimateai/dbt-integration";
import { NotebookProviders } from "@lib";
import { commands, Disposable, ExtensionContext, workspace } from "vscode";
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

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

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
  /**
   * Monotonic sequence counter for `refreshVersionTelemetryAttributes` so
   * a slow earlier invocation can't overwrite attributes written by a
   * faster later one. Each refresh captures the seq at start and only
   * applies its results if the seq still matches.
   */
  private versionRefreshSeq = 0;

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

      // Enrich every telemetry event with the active Python interpreter version
      // and dbt-core dist version. Without these dimensions, App Insights can't
      // split error clusters by Python or dbt-core version — e.g. we can't
      // tell whether a `pythonBridgeInitPythonError "mashumaro
      // UnserializableField"` is a Python 3.13 + mashumaro 3.14 incompat or
      // something else. Both probes are best-effort: failure → attribute is
      // cleared rather than blocking activation.
      //
      // Primed BEFORE `initializeDBTProjects()` because that call is the
      // python-bridge init step where `pythonBridgeInitPythonError` itself
      // originates. The `void`-fired refresh runs synchronously up to its
      // first await, so `pythonVersion` is guaranteed in `customAttributes`
      // by the time `initializeDBTProjects()` starts — meaning a thrown
      // error caught below is always dimensioned with at least Python
      // version. (`dbtCoreVersion` arrives best-effort once the spawn
      // resolves.) Re-runs on interpreter change so the dimensions track
      // the user's selection. `detectDBT()` is the earliest point where
      // `pythonEnvironment.executionDetails` is set and `pythonVersion`
      // is populated.
      void this.refreshVersionTelemetryAttributes();
      const pythonEnv = this.dbtProjectContainer.getPythonEnvironment();
      this.disposables.push(
        pythonEnv.onPythonEnvironmentChanged(() => {
          void this.refreshVersionTelemetryAttributes();
        }),
      );

      await this.dbtProjectContainer.initializeDBTProjects();
      await this.statusBars.initialize();
      // Ask to reload the window if the dbt integration changes
      const dbtIntegration = workspace
        .getConfiguration("dbt")
        .get<string>("dbtIntegration", "core");
      workspace.onDidChangeConfiguration((e) => {
        if (!e.affectsConfiguration("dbt")) {
          return;
        }
        const newDbtIntegration = workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core");
        if (
          dbtIntegration !== newDbtIntegration &&
          ["core", "cloud", "corecommand", "fusion"].includes(newDbtIntegration)
        ) {
          commands.executeCommand("workbench.action.reloadWindow");
        }
      });
    } catch (error) {
      this.telemetry.sendTelemetryError("extensionActivationError", error);
    }
  }

  /**
   * Populate `pythonVersion` and `dbtCoreVersion` customAttributes on the
   * telemetry service so every event from this point forward carries them.
   * Best-effort: if either probe fails (interpreter missing, dbt-core not
   * installed in this venv, probe timeout), the corresponding attribute is
   * **cleared** rather than left at a stale value from the previous
   * interpreter. Idempotent — wired both at activation and from the
   * `onPythonEnvironmentChanged` listener.
   *
   * Sequence-guarded: rapid interpreter switches can fire two refreshes
   * concurrently. A slower earlier probe finishing last would otherwise
   * overwrite a faster later probe's results. We capture the
   * `versionRefreshSeq` at entry and bail before any write if a newer
   * refresh has bumped the counter.
   */
  private async refreshVersionTelemetryAttributes(): Promise<void> {
    const seq = ++this.versionRefreshSeq;
    try {
      const pythonEnv = this.dbtProjectContainer.getPythonEnvironment();
      const pythonVersion = pythonEnv.pythonVersion;
      if (seq !== this.versionRefreshSeq) {
        return;
      }
      if (pythonVersion) {
        this.telemetry.setTelemetryCustomAttribute(
          "pythonVersion",
          pythonVersion,
        );
      } else {
        this.telemetry.clearTelemetryCustomAttribute("pythonVersion");
      }
      const pythonPath = pythonEnv.pythonPath;
      const dbtCoreVersion = pythonPath
        ? await probeDbtCoreVersion(pythonPath)
        : undefined;
      if (seq !== this.versionRefreshSeq) {
        return;
      }
      if (dbtCoreVersion) {
        this.telemetry.setTelemetryCustomAttribute(
          "dbtCoreVersion",
          dbtCoreVersion,
        );
      } else {
        this.telemetry.clearTelemetryCustomAttribute("dbtCoreVersion");
      }
    } catch {
      // Telemetry-enrichment failures must never block activation or
      // surface as an error — by design these dimensions are best-effort.
    }
  }
}
