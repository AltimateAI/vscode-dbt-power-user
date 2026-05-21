import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import { Disposable, ProgressLocation, TextEditor, window } from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { PythonEnvironment } from "../dbt_client/pythonEnvironment";
import { TelemetryService } from "../telemetry";
import { getFirstWorkspacePath } from "../utils";
import { DbtDocumentFormattingEditProvider } from "./dbtDocumentFormattingEditProvider";

// Surfaces a one-time "install sqlfmt" prompt when the user first looks at a
// `sql` or `jinja-sql` file in a dbt project workspace and sqlfmt isn't
// available. Production telemetry showed ~31 machines repeatedly hitting
// `formatDbtModelApplyDiffError` with "sqlfmt not found" (~7.5 events per
// machine per day) because the format provider only surfaces the install
// hint when the user actually runs the format command. This pre-empts that:
// users learn about the missing dependency before they hit Format and can
// install it in one click.
export class SqlFmtAvailabilityNotifier implements Disposable {
  // Persisted in globalState so "Don't ask again" survives reboots and
  // applies across workspaces (the user has made a deliberate choice about
  // their machine, not just this folder).
  private static readonly DISMISSED_KEY = "dbt.sqlfmt.notification.dismissed";

  private static readonly INSTALL = "Install sqlfmt";
  private static readonly DONT_ASK_AGAIN = "Don't ask again";

  private notifiedThisSession = false;
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private formattingProvider: DbtDocumentFormattingEditProvider,
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
  ) {
    this.disposables.push(
      window.onDidChangeActiveTextEditor((editor) => this.maybeNotify(editor)),
    );
    // Handle the "single sql file open at activation" case. The notifier is
    // constructed before `DBTPowerUserExtension.activate()` finishes its
    // `initializeDBTProjects()` chain, so `getProjects()` is empty at this
    // point and the first maybeNotify short-circuits. Re-fire when a project's
    // manifest first becomes available — `notifiedThisSession` latch makes
    // subsequent manifest-changed events no-ops.
    this.disposables.push(
      this.dbtProjectContainer.onManifestChanged(() =>
        this.maybeNotify(window.activeTextEditor),
      ),
    );
    void this.maybeNotify(window.activeTextEditor);
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async maybeNotify(editor: TextEditor | undefined): Promise<void> {
    if (this.notifiedThisSession) {
      return;
    }
    if (!editor) {
      return;
    }
    const langId = editor.document.languageId;
    if (langId !== "jinja-sql" && langId !== "sql") {
      return;
    }
    // Only notify users who actually have a dbt project loaded. A sql/jinja-sql
    // editor outside any registered dbt project isn't our target — they may
    // have power-user installed for other features and never intend to use the
    // format command.
    if (this.dbtProjectContainer.getProjects().length === 0) {
      return;
    }
    if (
      this.dbtProjectContainer.getFromGlobalState(
        SqlFmtAvailabilityNotifier.DISMISSED_KEY,
      )
    ) {
      // Honor the prior "Don't ask again". Latch the in-memory flag so we
      // don't re-check globalState on every editor change.
      this.notifiedThisSession = true;
      return;
    }

    // Latch synchronously, before the await, so concurrent maybeNotify calls
    // (e.g. onManifestChanged + onDidChangeActiveTextEditor firing in the same
    // tick) can't both pass the guard above and double-prompt. Also covers the
    // "user installs sqlfmt mid-session" case the same way the old placement
    // did — once per session, not per editor change.
    this.notifiedThisSession = true;
    const sqlFmtPath = await this.formattingProvider.resolveSqlFmtPath();
    if (sqlFmtPath) {
      return;
    }

    await this.showInstallPrompt();
  }

  private async showInstallPrompt(): Promise<void> {
    const choice = await window.showInformationMessage(
      "Install sqlfmt to enable dbt model formatting (Format Document on .sql files).",
      SqlFmtAvailabilityNotifier.INSTALL,
      SqlFmtAvailabilityNotifier.DONT_ASK_AGAIN,
    );
    if (choice === SqlFmtAvailabilityNotifier.INSTALL) {
      await this.installSqlFmt();
    } else if (choice === SqlFmtAvailabilityNotifier.DONT_ASK_AGAIN) {
      this.dbtProjectContainer.setToGlobalState(
        SqlFmtAvailabilityNotifier.DISMISSED_KEY,
        true,
      );
    }
    // `undefined` means the user dismissed via Esc/X — leave globalState
    // alone so they get one more chance next session.
  }

  // Installs `shandy-sqlfmt[jinjafmt]` into the workspace python environment
  // and invalidates the format provider's cached path. Mirrors the convention
  // used by `installDbtCore` / `installDbtCloud` / `installDbtFusion` in
  // `walkthroughCommands.ts`: progress notification, command process
  // execution via factory, bare-verb success telemetry, `*Error` failure
  // telemetry, error toast on failure.
  private async installSqlFmt(): Promise<void> {
    const telemetryProps = {
      platform: process.platform,
      pythonPath: this.pythonEnvironment.pythonPath ?? "unknown",
      pythonVersion: this.pythonEnvironment.pythonVersion ?? "unknown",
    };
    this.telemetry.sendTelemetryEvent("installSqlFmt", telemetryProps);
    let error: unknown = undefined;
    await window.withProgress(
      {
        title: "Installing sqlfmt...",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          const { stdout, stderr } = await this.commandProcessExecutionFactory
            .createCommandProcessExecution({
              command: this.pythonEnvironment.pythonPath,
              args: ["-m", "pip", "install", "shandy-sqlfmt[jinjafmt]"],
              cwd: getFirstWorkspacePath(),
              envVars: this.pythonEnvironment.getEnvironmentVariables(),
            })
            .completeWithTerminalOutput();
          if (
            !stdout.includes("Successfully installed") &&
            !stdout.includes("Requirement already satisfied") &&
            stderr
          ) {
            throw new Error(stderr);
          }
          this.formattingProvider.invalidateSqlFmtPathCache();
        } catch (err) {
          error = err;
          this.telemetry.sendTelemetryError(
            "installSqlFmtError",
            err,
            telemetryProps,
          );
        }
      },
    );
    if (error) {
      window.showErrorMessage(
        "Could not install sqlfmt: " + (error as Error).message,
      );
    }
  }
}
