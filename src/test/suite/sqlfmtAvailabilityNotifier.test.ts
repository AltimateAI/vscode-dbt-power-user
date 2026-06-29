import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";
import { DbtDocumentFormattingEditProvider } from "../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";
import { SqlFmtAvailabilityNotifier } from "../../document_formatting_edit_provider/sqlfmtAvailabilityNotifier";
import { TelemetryService } from "../../telemetry";

/**
 * Production telemetry surfaced ~31 machines / 231 events / 24h of
 * `formatDbtModelApplyDiffError` with "sqlfmt not found" — users hitting
 * Format Document on dbt models without sqlfmt installed and re-hitting it
 * every time. The notifier surfaces a one-time install prompt the first time
 * a sql / jinja-sql file is focused in a workspace that has at least one dbt
 * project, then runs `python -m pip install` in-extension matching the
 * `installDbtCore` / `installDbtCloud` / `installDbtFusion` convention in
 * `walkthroughCommands.ts`.
 */
describe("SqlFmtAvailabilityNotifier", () => {
  let resolveSqlFmtPath: jest.Mock<any>;
  let invalidateSqlFmtPathCache: jest.Mock<any>;
  let getProjects: jest.Mock<any>;
  let getFromGlobalState: jest.Mock<any>;
  let setToGlobalState: jest.Mock<any>;
  let showInformationMessage: jest.Mock<any>;
  let showErrorMessage: jest.Mock<any>;
  let withProgress: jest.Mock<any>;
  let sendTelemetryEvent: jest.Mock<any>;
  let sendTelemetryError: jest.Mock<any>;
  let createCommandProcessExecution: jest.Mock<any>;
  let completeWithTerminalOutput: jest.Mock<any>;
  let onDidChangeActiveTextEditorListener:
    | ((editor: vscode.TextEditor | undefined) => unknown)
    | undefined;
  let onManifestChangedListener: (() => unknown) | undefined;
  let onManifestChanged: jest.Mock<any>;

  beforeEach(() => {
    resolveSqlFmtPath = jest.fn();
    invalidateSqlFmtPathCache = jest.fn();
    getProjects = jest.fn().mockReturnValue([{ projectRoot: "/p" }]);
    getFromGlobalState = jest.fn().mockReturnValue(undefined);
    setToGlobalState = jest.fn();
    showInformationMessage = jest.fn();
    showErrorMessage = jest.fn();
    sendTelemetryEvent = jest.fn();
    sendTelemetryError = jest.fn();
    onManifestChanged = jest.fn((cb: () => unknown) => {
      onManifestChangedListener = cb;
      return { dispose: jest.fn() };
    });
    completeWithTerminalOutput = jest.fn();
    completeWithTerminalOutput.mockResolvedValue({
      stdout: "Successfully installed shandy-sqlfmt-0.21.0",
      stderr: "",
    });
    createCommandProcessExecution = jest.fn();
    createCommandProcessExecution.mockReturnValue({
      completeWithTerminalOutput,
    });
    // withProgress just invokes the task and returns its result, matching the
    // real signature closely enough for our purposes.
    withProgress = jest.fn();
    withProgress.mockImplementation(
      async (_opts: unknown, task: () => Promise<unknown>) => task(),
    );

    onManifestChangedListener = undefined;
    onDidChangeActiveTextEditorListener = undefined;
    const win = vscode.window as unknown as Record<string, unknown>;
    win.activeTextEditor = undefined;
    win.showInformationMessage = showInformationMessage;
    win.showErrorMessage = showErrorMessage;
    win.withProgress = withProgress;
    win.onDidChangeActiveTextEditor = jest.fn(
      (cb: (editor: vscode.TextEditor | undefined) => unknown) => {
        onDidChangeActiveTextEditorListener = cb;
        return { dispose: jest.fn() };
      },
    );
    // `getFirstWorkspacePath()` (used by the install spawn) reads
    // `workspace.workspaceFolders[0].uri.fsPath`. Provide a folder so the
    // install path doesn't crash before reaching pip.
    (vscode.workspace as unknown as Record<string, unknown>).workspaceFolders =
      [{ uri: { fsPath: "/workspace" } }];
  });

  afterEach(() => {
    jest.clearAllMocks();
    const win = vscode.window as unknown as Record<string, unknown>;
    delete win.activeTextEditor;
    delete win.onDidChangeActiveTextEditor;
    delete win.withProgress;
    delete (vscode.workspace as unknown as Record<string, unknown>)
      .workspaceFolders;
  });

  const construct = (): SqlFmtAvailabilityNotifier => {
    const container = {
      getProjects,
      getFromGlobalState,
      setToGlobalState,
      onManifestChanged,
    } as unknown as DBTProjectContainer;
    const formattingProvider = {
      resolveSqlFmtPath,
      invalidateSqlFmtPathCache,
    } as unknown as DbtDocumentFormattingEditProvider;
    const pythonEnvironment = {
      pythonPath: "/usr/bin/python3",
      pythonVersion: "3.11.4",
      getEnvironmentVariables: jest.fn().mockReturnValue({}),
    } as unknown as PythonEnvironment;
    const commandProcessExecutionFactory = {
      createCommandProcessExecution,
    } as unknown as CommandProcessExecutionFactory;
    const telemetry = {
      sendTelemetryEvent,
      sendTelemetryError,
    } as unknown as TelemetryService;
    return new SqlFmtAvailabilityNotifier(
      container,
      formattingProvider,
      pythonEnvironment,
      commandProcessExecutionFactory,
      telemetry,
    );
  };

  const fireEditorChange = async (langId: string | undefined) => {
    const editor =
      langId === undefined
        ? undefined
        : ({
            document: { languageId: langId },
          } as unknown as vscode.TextEditor);
    await onDidChangeActiveTextEditorListener?.(editor);
  };

  describe("notification gating", () => {
    it("notifies once when sqlfmt is missing and user has a dbt project on a jinja-sql file", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("jinja-sql");
      expect(showInformationMessage).toHaveBeenCalledTimes(1);
      const args = showInformationMessage.mock.calls[0];
      expect(args[0]).toContain("Install sqlfmt");
      expect(args).toContain("Install sqlfmt");
      expect(args).toContain("Don't ask again");
      // Single action button + dismiss — no choose-your-install-tool UX.
      expect(args.length).toBe(3);
    });

    it("notifies on plain `sql` language id as well as `jinja-sql`", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("sql");
      expect(showInformationMessage).toHaveBeenCalledTimes(1);
    });

    it("does not notify on non-sql languages", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("python");
      await fireEditorChange("yaml");
      await fireEditorChange("markdown");
      expect(showInformationMessage).not.toHaveBeenCalled();
      expect(resolveSqlFmtPath).not.toHaveBeenCalled();
    });

    it("does not notify when no dbt projects are registered", async () => {
      getProjects.mockReturnValue([]);
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("jinja-sql");
      expect(showInformationMessage).not.toHaveBeenCalled();
      expect(resolveSqlFmtPath).not.toHaveBeenCalled();
    });

    it("does not notify when sqlfmt IS installed", async () => {
      resolveSqlFmtPath.mockResolvedValue("/usr/local/bin/sqlfmt");
      construct();
      await fireEditorChange("jinja-sql");
      expect(showInformationMessage).not.toHaveBeenCalled();
    });

    it("does not notify when the user previously chose Don't ask again", async () => {
      getFromGlobalState.mockReturnValue(true);
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("jinja-sql");
      expect(showInformationMessage).not.toHaveBeenCalled();
      expect(resolveSqlFmtPath).not.toHaveBeenCalled();
    });

    it("notifies at most once per session even across multiple editor changes", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("jinja-sql");
      await fireEditorChange("jinja-sql");
      await fireEditorChange("sql");
      expect(showInformationMessage).toHaveBeenCalledTimes(1);
    });

    it("notifies once even if a sql file is already focused at construction", async () => {
      (vscode.window as unknown as Record<string, unknown>).activeTextEditor = {
        document: { languageId: "jinja-sql" },
      } as unknown as vscode.TextEditor;
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await Promise.resolve();
      expect(showInformationMessage).toHaveBeenCalledTimes(1);
    });

    it("notifies when the file is open at construction but projects load later (onManifestChanged)", async () => {
      // Production timing: `DBTPowerUserExtension.activate()` constructs the
      // notifier BEFORE awaiting `initializeDBTProjects()`. So at construction
      // time `getProjects()` is empty, the initial maybeNotify short-circuits,
      // and the file-focus event never re-fires because the file was already
      // open. The onManifestChanged hook covers this case.
      (vscode.window as unknown as Record<string, unknown>).activeTextEditor = {
        document: { languageId: "jinja-sql" },
      } as unknown as vscode.TextEditor;
      getProjects.mockReturnValue([]); // no projects yet
      resolveSqlFmtPath.mockResolvedValue(undefined);
      construct();
      await Promise.resolve();
      expect(showInformationMessage).not.toHaveBeenCalled();

      // Now simulate: initializeDBTProjects finishes, manifest changed fires.
      getProjects.mockReturnValue([{ projectRoot: "/p" }]);
      await onManifestChangedListener?.();
      expect(showInformationMessage).toHaveBeenCalledTimes(1);
    });
  });

  describe("install action (mirrors walkthroughCommands install convention)", () => {
    it("runs `<pythonPath> -m pip install shandy-sqlfmt[jinjafmt]` in a progress notification", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      construct();
      await fireEditorChange("jinja-sql");

      expect(withProgress).toHaveBeenCalledTimes(1);
      expect(withProgress.mock.calls[0][0]).toMatchObject({
        title: "Installing sqlfmt...",
        cancellable: false,
      });

      expect(createCommandProcessExecution).toHaveBeenCalledTimes(1);
      const spawnArgs = createCommandProcessExecution.mock.calls[0][0] as {
        command: string;
        args: string[];
      };
      expect(spawnArgs.command).toBe("/usr/bin/python3");
      expect(spawnArgs.args).toEqual([
        "-m",
        "pip",
        "install",
        "shandy-sqlfmt[jinjafmt]",
      ]);
      // Plain pip install — no --force-reinstall or --no-cache-dir, since the
      // notifier only fires when sqlfmt isn't installed at all (no broken
      // state to blow away).
      expect(spawnArgs.args).not.toContain("--force-reinstall");
      expect(spawnArgs.args).not.toContain("--no-cache-dir");
    });

    it("emits installSqlFmt success telemetry with platform / pythonPath / pythonVersion", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      construct();
      await fireEditorChange("jinja-sql");
      expect(sendTelemetryEvent).toHaveBeenCalledWith("installSqlFmt", {
        platform: process.platform,
        pythonPath: "/usr/bin/python3",
        pythonVersion: "3.11.4",
      });
    });

    it("invalidates the sqlfmt path cache after a successful install", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      construct();
      await fireEditorChange("jinja-sql");
      expect(invalidateSqlFmtPathCache).toHaveBeenCalledTimes(1);
    });

    it("treats `Requirement already satisfied` as success (no error, cache still invalidated)", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      completeWithTerminalOutput.mockResolvedValue({
        stdout: "Requirement already satisfied: shandy-sqlfmt in /u/.venv",
        stderr: "",
      });
      construct();
      await fireEditorChange("jinja-sql");
      expect(showErrorMessage).not.toHaveBeenCalled();
      expect(sendTelemetryError).not.toHaveBeenCalled();
      expect(invalidateSqlFmtPathCache).toHaveBeenCalledTimes(1);
    });

    it("surfaces installSqlFmtError + toast when pip exits with stderr", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      completeWithTerminalOutput.mockResolvedValue({
        stdout: "",
        stderr: "ERROR: No matching distribution found for shandy-sqlfmt",
      });
      construct();
      await fireEditorChange("jinja-sql");
      expect(sendTelemetryError).toHaveBeenCalledWith(
        "installSqlFmtError",
        expect.any(Error),
        expect.objectContaining({ platform: process.platform }),
      );
      expect(showErrorMessage).toHaveBeenCalledWith(
        expect.stringContaining("Could not install sqlfmt"),
      );
      expect(invalidateSqlFmtPathCache).not.toHaveBeenCalled();
    });

    it("surfaces installSqlFmtError + toast when the spawn itself rejects", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Install sqlfmt");
      completeWithTerminalOutput.mockRejectedValue(
        new Error("spawn /usr/bin/python3 ENOENT"),
      );
      construct();
      await fireEditorChange("jinja-sql");
      expect(sendTelemetryError).toHaveBeenCalledWith(
        "installSqlFmtError",
        expect.any(Error),
        expect.any(Object),
      );
      expect(showErrorMessage).toHaveBeenCalledWith(
        expect.stringContaining("ENOENT"),
      );
    });
  });

  describe("dismissal", () => {
    it("'Don't ask again' persists dismissal to globalState and does not install", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue("Don't ask again");
      construct();
      await fireEditorChange("jinja-sql");
      expect(setToGlobalState).toHaveBeenCalledWith(
        "dbt.sqlfmt.notification.dismissed",
        true,
      );
      expect(createCommandProcessExecution).not.toHaveBeenCalled();
      expect(sendTelemetryEvent).not.toHaveBeenCalled();
    });

    it("dismissal via Esc (undefined) leaves globalState untouched and does not install", async () => {
      resolveSqlFmtPath.mockResolvedValue(undefined);
      showInformationMessage.mockResolvedValue(undefined);
      construct();
      await fireEditorChange("jinja-sql");
      expect(setToGlobalState).not.toHaveBeenCalled();
      expect(createCommandProcessExecution).not.toHaveBeenCalled();
    });
  });
});
