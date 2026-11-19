import { DBTTerminal, EnvironmentVariables } from "@altimateai/dbt-integration";
import { execFile } from "child_process";
import { existsSync } from "fs";
import { inject } from "inversify";
import { dirname, isAbsolute, join, relative } from "path";
import {
  commands,
  Disposable,
  Event,
  EventEmitter,
  extensions,
  Terminal,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";

export enum PythonInterpreterPromptAnswer {
  SELECT = "Select Python interpreter",
  DETECT = "Detect from terminal",
  OPEN_SETTING = "Open setting",
  INSTALL = "Install Python extension",
  RELOAD = "Reload window",
  KEEP_FALLBACK = "Keep using it",
  SELECT_ANOTHER = "Select another",
}

/** Where a fallback interpreter was found, in the order the places are tried. */
type FallbackSource =
  | "defaultInterpreterPath"
  | "projectVenv"
  | "workspaceVenv"
  | "known"
  | "path";

/** An interpreter used in place of a selected one that doesn't exist. */
interface InterpreterFallback {
  missing: string;
  path: string;
  source: FallbackSource;
  dbtVersion: string;
}

const VENV_DIRECTORIES = [".venv", "venv", "env"];
const FALLBACK_PROBE_TIMEOUT_MS = 10_000;
// Fails unless dbt imports; prints the interpreter's own path and dbt's version.
const FALLBACK_PROBE =
  "import sys, dbt.version; print(sys.executable); print(dbt.version.__version__)";

/** A path rather than a command the PATH resolves (`python3`). */
export function isInterpreterPath(value: string): boolean {
  return isAbsolute(value) || /[\\/]/.test(value);
}

function venvInterpreters(directory: string): string[] {
  return VENV_DIRECTORIES.map((venv) =>
    process.platform === "win32"
      ? join(directory, venv, "Scripts", "python.exe")
      : join(directory, venv, "bin", "python"),
  ).filter((interpreter) => existsSync(interpreter));
}

function isInside(path: string, directory: string): boolean {
  const rest = relative(directory, path);
  // A leading `..` segment, not a name that starts with `..` (`..tools`).
  return rest !== "" && !/^\.\.(?:[\\/]|$)/.test(rest) && !isAbsolute(rest);
}

type EnvFrom = "process" | "integrated" | "dotenv";
interface EnvVarsResult {
  vars: EnvironmentVariables;
  sources: Record<string, EnvFrom>;
}
interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
  getEnvVars: (workspaceFolder?: WorkspaceFolder) => EnvVarsResult;
}

export class PythonEnvironment {
  private executionDetails?: PythonExecutionDetails;
  // The activation in progress, shared by everyone who waits for it.
  private initialization?: Promise<void>;
  private disposables: Disposable[] = [];
  public allPythonPaths: { path: string; pathType: string }[] = [];
  public isPython3: boolean = true;
  private _pythonVersion?: string;
  private _pythonExtensionAvailable = false;
  // Interpreters already reported missing this session: every dbt project in the
  // workspace fails on the same one, and the user should see one prompt.
  private reportedMissingInterpreters = new Set<string>();
  // Used while the selected interpreter doesn't exist, for this window only.
  private fallback?: InterpreterFallback;
  private fallbackOutcomeReported = false;
  private fallbackNoticesShown = new Set<string>();
  private ignoredOverridesReported = new Set<string>();
  // Fires once a change of interpreter has been resolved, fallback included.
  private readonly interpreterChanges = new EventEmitter<Uri | undefined>();
  // Changes are resolved in order, and only the latest is announced.
  private interpreterChangeResolved: Promise<void> = Promise.resolve();
  private interpreterChangeCount = 0;

  constructor(
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {
    this.disposables.push(this.interpreterChanges);
  }

  async dispose(): Promise<void> {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  async printEnvVars(workspaceFolder?: WorkspaceFolder) {
    await this.dbtTerminal.show(true);
    if (!this.executionDetails) {
      throw new Error(
        "executionDetails is undefined, cannot retrieve environment variables",
      );
    }
    const { vars, sources } = this.executionDetails.getEnvVars(workspaceFolder);
    this.dbtTerminal.log("Printing environment variables...\r\n");
    for (const key in vars) {
      this.dbtTerminal.log(`${key}=${vars[key]}\t\tsource:${sources[key]}\r\n`);
    }
  }

  public get pythonPath() {
    const override = this.getResolvedConfigValue("dbtPythonPathOverride");
    if (override) {
      if (this.isUsableInterpreterOverride(override)) {
        return override;
      }
      // Self-heal already-poisoned configs: a value persisted by an earlier
      // buggy terminal probe (e.g. a leaked command-echo fragment) would
      // otherwise poison every dbt/pip invocation as "Command not found".
      // Ignore it and fall back to normal detection. sendTelemetry=true so we
      // can watch recovery across the affected machines, once per value: this
      // getter runs on every read of the interpreter.
      if (!this.ignoredOverridesReported.has(override)) {
        this.ignoredOverridesReported.add(override);
        this.dbtTerminal.warn(
          "pythonEnvironment:pythonPath",
          `Ignoring invalid dbtPythonPathOverride (not a usable interpreter): ${override}`,
          true,
        );
      }
    }
    const selected = this.executionDetails!.getPythonPath();
    return this.fallback?.missing === selected ? this.fallback.path : selected;
  }

  /** Whether `pythonPath` is `dbt.dbtPythonPathOverride` rather than the
   * Python extension's interpreter. */
  public get pythonPathFromOverride(): boolean {
    const override = this.getResolvedConfigValue("dbtPythonPathOverride");
    return Boolean(override) && this.isUsableInterpreterOverride(override);
  }

  /**
   * Whether a user-supplied dbtPythonPathOverride is something we can actually
   * invoke. Two valid shapes:
   *  - a bare command resolved via PATH ("python", "python3", "python3.11")
   *  - a filesystem path (absolute or containing a separator) that exists
   * Anything else (shell noise, a leaked probe fragment) is rejected so it can
   * never be used as the interpreter.
   */
  private isUsableInterpreterOverride(value: string): boolean {
    if (/^[\w.+-]+$/.test(value)) {
      return true;
    }
    return (isAbsolute(value) || /[\\/]/.test(value)) && existsSync(value);
  }

  /**
   * Tells the user the interpreter doesn't exist (a deleted or moved virtual
   * environment, or a command that isn't on the PATH) and offers a way to pick
   * another, once per interpreter. Picking one fires `onPythonEnvironmentChanged`,
   * which re-initializes the projects.
   */
  async showInterpreterNotFound(interpreterPath: string): Promise<void> {
    if (this.reportedMissingInterpreters.has(interpreterPath)) {
      return;
    }
    this.reportedMissingInterpreters.add(interpreterPath);
    // An override wins over the Python extension's selection, so only editing
    // the setting helps.
    if (
      this.executionDetails !== undefined &&
      this.getResolvedConfigValue("dbtPythonPathOverride") === interpreterPath
    ) {
      const answer = await window.showErrorMessage(
        `The Python interpreter ${interpreterPath} set in dbt.dbtPythonPathOverride was not found. Change the setting to an interpreter that exists.`,
        PythonInterpreterPromptAnswer.OPEN_SETTING,
      );
      if (answer === PythonInterpreterPromptAnswer.OPEN_SETTING) {
        commands.executeCommand(
          "workbench.action.openSettings",
          "dbt.dbtPythonPathOverride",
        );
      }
      return;
    }
    await this.promptForInterpreter(
      this._pythonExtensionAvailable
        ? `The selected Python interpreter ${interpreterPath} was not found. It may have been moved or deleted. Select another interpreter to use dbt.`
        : `The Python interpreter ${interpreterPath} was not found, and the Python extension, which selects interpreters, is not installed. Install it, or set dbt.dbtPythonPathOverride to an interpreter that exists.`,
    );
  }

  /**
   * Shows `message` with the ways to get an interpreter. With the Python
   * extension: its picker, or detection from the terminal. Without it the
   * picker (`python.setInterpreter`) does not exist, so: install the
   * extension, or open `dbt.dbtPythonPathOverride`.
   */
  async promptForInterpreter(message: string): Promise<void> {
    if (!this._pythonExtensionAvailable) {
      const answer = await window.showErrorMessage(
        message,
        PythonInterpreterPromptAnswer.INSTALL,
        PythonInterpreterPromptAnswer.OPEN_SETTING,
      );
      if (answer === PythonInterpreterPromptAnswer.INSTALL) {
        await this.installPythonExtension();
      } else if (answer === PythonInterpreterPromptAnswer.OPEN_SETTING) {
        commands.executeCommand(
          "workbench.action.openSettings",
          "dbt.dbtPythonPathOverride",
        );
      }
      return;
    }
    const answer = await window.showErrorMessage(
      message,
      PythonInterpreterPromptAnswer.SELECT,
      PythonInterpreterPromptAnswer.DETECT,
    );
    if (answer === PythonInterpreterPromptAnswer.SELECT) {
      commands.executeCommand("python.setInterpreter");
    } else if (answer === PythonInterpreterPromptAnswer.DETECT) {
      commands.executeCommand("dbtPowerUser.detectPythonFromTerminal");
    }
  }

  /**
   * Installs the Python extension, then offers to reload the window: the
   * extension is only picked up on activation.
   */
  async installPythonExtension(): Promise<void> {
    await commands.executeCommand(
      "workbench.extensions.installExtension",
      "ms-python.python",
    );
    const reload = await window.showInformationMessage(
      "The Python extension is installed. Reload the window to select an interpreter.",
      PythonInterpreterPromptAnswer.RELOAD,
    );
    if (reload === PythonInterpreterPromptAnswer.RELOAD) {
      commands.executeCommand("workbench.action.reloadWindow");
    }
  }

  public get pythonVersion(): string | undefined {
    return this._pythonVersion;
  }

  /**
   * Whether the Python extension is installed and active. Without it there
   * is no interpreter unless `dbt.dbtPythonPathOverride` names one; dbt
   * Fusion and the dbt Cloud CLI don't need one.
   */
  public get pythonExtensionAvailable(): boolean {
    return this._pythonExtensionAvailable;
  }

  /** Re-fetch the Python version from the Python extension (call after interpreter change) */
  public async refreshPythonVersion(): Promise<void> {
    try {
      const extension = extensions.getExtension("ms-python.python");
      if (!extension?.isActive) {
        return;
      }
      const api = extension.exports;
      const pythonPath = this.pythonPath;
      const envDetails =
        await api.environment.getEnvironmentDetails(pythonPath);
      this._pythonVersion = envDetails?.version?.join(".");
      this.isPython3 = envDetails?.version?.[0] === "3";
    } catch (e) {
      this.dbtTerminal.debug(
        "pythonEnvironment:refreshPythonVersion",
        "Failed to refresh Python version; keeping previous values",
        e,
      );
    }
  }

  public get environmentVariables(): EnvironmentVariables {
    return this.getEnvironmentVariables();
  }

  public getEnvironmentVariables(
    workspaceFolder?: WorkspaceFolder,
  ): EnvironmentVariables {
    if (!this.executionDetails) {
      throw new Error(
        "executionDetails is undefined, cannot retrieve environment variables",
      );
    }
    return this.executionDetails.getEnvVars(workspaceFolder).vars;
  }

  /** Fires after a change of interpreter has been resolved, so a listener
   * reading `pythonPath` gets the interpreter now in use, fallback included. */
  public get onPythonEnvironmentChanged(): Event<Uri | undefined> {
    return this.interpreterChanges.event;
  }

  /**
   * Activates the Python extension and reads the interpreter from it, once,
   * finding a fallback when that interpreter doesn't exist. Callers that
   * arrive while that is running (the dbt installation check and the Get
   * Started wizard both start during activation) wait for the same
   * activation instead of starting another one.
   */
  async initialize(): Promise<void> {
    if (
      this.initialization === undefined &&
      this.executionDetails === undefined
    ) {
      this.initialization = this.activatePythonExtension()
        .then(async (details) => {
          this.executionDetails = details;
          this.disposables.push(
            details.onDidChangeExecutionDetails((resource) =>
              this.interpreterChanged(resource),
            ),
          );
          await this.resolveInterpreter();
          // A change that arrived while resolving is part of the start: wait
          // for it too, so callers never read an unresolved selection.
          await this.interpreterChangeResolved;
        })
        .finally(() => {
          this.initialization = undefined;
        });
    }
    await this.initialization;
  }

  /** A change that arrives while an earlier one is still resolving supersedes
   * it: listeners hear once, after the latest selection is resolved. */
  private interpreterChanged(resource: Uri | undefined): void {
    const change = ++this.interpreterChangeCount;
    this.interpreterChangeResolved = this.interpreterChangeResolved
      .then(() => this.resolveInterpreter())
      .then(() => {
        if (change === this.interpreterChangeCount) {
          this.interpreterChanges.fire(resource);
        }
      })
      .catch((error) =>
        this.dbtTerminal.debug(
          "pythonEnvironment:interpreterChanged",
          "A listener failed on a change of interpreter",
          error,
        ),
      );
  }

  /**
   * When the selected interpreter is a file that doesn't exist (a deleted or
   * moved virtual environment), uses one that can import dbt for this window
   * and says which. dbt Core runs from the interpreter; the other
   * integrations are left alone. Never rejects.
   */
  private async resolveInterpreter(): Promise<void> {
    try {
      const missing = this.missingSelectedInterpreter();
      if (missing === undefined) {
        this.fallback = undefined;
        return;
      }
      if (
        this.fallback?.missing === missing &&
        existsSync(this.fallback.path)
      ) {
        return;
      }
      const fallback = await this.findFallback(missing);
      // The selection changed while probing: the queued change resolves it.
      if (this.missingSelectedInterpreter() !== missing) {
        return;
      }
      this.fallback = fallback;
      this.reportFallbackOutcome(this.fallback);
      if (this.fallback) {
        // Not awaited: the notice waits on the user.
        this.showFallbackNotice(this.fallback).catch((error) =>
          this.dbtTerminal.debug(
            "pythonEnvironment:showFallbackNotice",
            "Could not show the fallback notice or apply its answer",
            error,
          ),
        );
      }
    } catch (error) {
      this.fallback = undefined;
      this.dbtTerminal.debug(
        "pythonEnvironment:resolveInterpreter",
        "Could not look for another Python interpreter",
        error,
      );
    }
  }

  /** The Python extension's interpreter, when it is in use for dbt Core and
   * names a file that doesn't exist. */
  private missingSelectedInterpreter(): string | undefined {
    const mode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    if (mode !== "core" && mode !== "corecommand") {
      return undefined;
    }
    const override = this.getResolvedConfigValue("dbtPythonPathOverride");
    if (override && this.isUsableInterpreterOverride(override)) {
      return undefined;
    }
    const selected = this.executionDetails?.getPythonPath();
    return selected && isInterpreterPath(selected) && !existsSync(selected)
      ? selected
      : undefined;
  }

  /** Probes every candidate at once; the first in order that imports dbt wins. */
  private async findFallback(
    missing: string,
  ): Promise<InterpreterFallback | undefined> {
    const candidates = await this.fallbackCandidates(missing);
    const env = this.getEnvironmentVariables();
    const probes = await Promise.all(
      candidates.map(({ command }) => this.probeInterpreter(command, env)),
    );
    const index = probes.findIndex((probe) => probe !== undefined);
    if (index === -1) {
      return undefined;
    }
    return { missing, source: candidates[index].source, ...probes[index]! };
  }

  /**
   * In order: the Python extension's default interpreter, a virtual
   * environment in a dbt project, then at a workspace root, an environment
   * the Python extension knows inside the workspace, and `python3`, then
   * `python`, on the PATH. An interpreter inside the workspace, wherever it
   * was named, is run only when the workspace is trusted.
   */
  private async fallbackCandidates(
    missing: string,
  ): Promise<{ command: string; source: FallbackSource }[]> {
    const folders = (workspace.workspaceFolders ?? []).map(
      (folder) => folder.uri.fsPath,
    );
    const defaultInterpreter = this.defaultInterpreterPath();
    const candidates: { command: string; source: FallbackSource }[] = [
      ...(defaultInterpreter
        ? [
            {
              command: defaultInterpreter,
              source: "defaultInterpreterPath" as const,
            },
          ]
        : []),
      ...(workspace.isTrusted ? await this.workspaceCandidates(folders) : []),
      { command: "python3", source: "path" },
      { command: "python", source: "path" },
    ];
    return candidates.filter(
      ({ command }, index) =>
        command !== missing &&
        candidates.findIndex((other) => other.command === command) === index &&
        (workspace.isTrusted ||
          !folders.some((folder) => isInside(command, folder))),
    );
  }

  /** `python.defaultInterpreterPath`, when it names an interpreter file that exists. */
  private defaultInterpreterPath(): string | undefined {
    const value = this.substituteSettingsVariables(
      workspace
        .getConfiguration("python")
        .get<string>("defaultInterpreterPath", ""),
      this.getEnvironmentVariables(),
    );
    return value && isInterpreterPath(value) && existsSync(value)
      ? value
      : undefined;
  }

  /** Virtual environments in dbt projects, then at the workspace roots, then
   * the environments the Python extension knows inside the workspace. */
  private async workspaceCandidates(
    folders: string[],
  ): Promise<{ command: string; source: FallbackSource }[]> {
    const projectFiles = await workspace.findFiles(
      "**/dbt_project.yml",
      "**/{dbt_packages,node_modules,.venv,venv,env}/**",
      20,
    );
    const inProjects = projectFiles.flatMap((projectFile) =>
      venvInterpreters(dirname(projectFile.fsPath)),
    );
    const atRoots = folders.flatMap((folder) => venvInterpreters(folder));
    const known = this.allPythonPaths
      .map(({ path }) => path)
      .filter(
        (path) =>
          folders.some((folder) => isInside(path, folder)) && existsSync(path),
      );
    return [
      ...inProjects.map((command) => ({
        command,
        source: "projectVenv" as const,
      })),
      ...atRoots.map((command) => ({
        command,
        source: "workspaceVenv" as const,
      })),
      ...known.map((command) => ({ command, source: "known" as const })),
    ];
  }

  /** The interpreter's own path and dbt version, if it can import dbt. */
  private probeInterpreter(
    command: string,
    env: EnvironmentVariables,
  ): Promise<{ path: string; dbtVersion: string } | undefined> {
    return new Promise((resolve) => {
      execFile(
        command,
        ["-c", FALLBACK_PROBE],
        { env, timeout: FALLBACK_PROBE_TIMEOUT_MS, windowsHide: true },
        (error, stdout) => {
          const [path, dbtVersion] = String(stdout)
            .trim()
            .split(/\r?\n/)
            .slice(-2)
            .map((line) => line.trim());
          resolve(
            !error && path && isAbsolute(path) && existsSync(path) && dbtVersion
              ? { path, dbtVersion }
              : undefined,
          );
        },
      );
    });
  }

  /** Whether a fallback was found and where, once per window, with no path. */
  private reportFallbackOutcome(fallback?: InterpreterFallback): void {
    if (fallback) {
      this.dbtTerminal.info(
        "pythonEnvironment:fallback",
        `The selected Python interpreter ${fallback.missing} was not found; using ${fallback.path} (dbt ${fallback.dbtVersion})`,
        false,
      );
    }
    if (this.fallbackOutcomeReported) {
      return;
    }
    this.fallbackOutcomeReported = true;
    this.dbtTerminal.info(
      "pythonInterpreterFallback",
      fallback ? `found:${fallback.source}` : "none",
      true,
    );
  }

  /** Names the fallback, once per missing interpreter in a window. The
   * Python extension's selection changes only on "Keep using it". */
  private async showFallbackNotice(
    fallback: InterpreterFallback,
  ): Promise<void> {
    if (this.fallbackNoticesShown.has(fallback.missing)) {
      return;
    }
    this.fallbackNoticesShown.add(fallback.missing);
    const answer = await window.showInformationMessage(
      `The selected Python interpreter ${fallback.missing} was not found. dbt is using ${fallback.path} (dbt ${fallback.dbtVersion}) in this window.`,
      PythonInterpreterPromptAnswer.KEEP_FALLBACK,
      PythonInterpreterPromptAnswer.SELECT_ANOTHER,
    );
    if (answer === PythonInterpreterPromptAnswer.KEEP_FALLBACK) {
      await extensions
        .getExtension("ms-python.python")
        ?.exports?.environments?.updateActiveEnvironmentPath(fallback.path);
    } else if (answer === PythonInterpreterPromptAnswer.SELECT_ANOTHER) {
      commands.executeCommand("python.setInterpreter");
    }
  }

  getResolvedConfigValue(key: string, workspaceFolder?: WorkspaceFolder) {
    const value = workspace
      .getConfiguration("dbt", workspaceFolder?.uri)
      .get<string>(key, "");
    return this.substituteSettingsVariables(
      value,
      this.getEnvironmentVariables(workspaceFolder),
      workspaceFolder,
    );
  }

  private substituteSettingsVariables(
    value: any,
    vsCodeEnv: EnvironmentVariables,
    workspaceFolder?: WorkspaceFolder,
    sources?: Record<string, EnvFrom>,
  ): any {
    if (!value) {
      return value;
    }
    if (typeof value !== "string") {
      return value;
    }
    const regexVsCodeEnv = /\$\{env\:(.*?)\}/gm;
    let matchResult;
    while ((matchResult = regexVsCodeEnv.exec(value)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matchResult.index === regexVsCodeEnv.lastIndex) {
        regexVsCodeEnv.lastIndex++;
      }
      if (vsCodeEnv[matchResult[1]] !== undefined) {
        value = value.replace(
          new RegExp(`\\\$\\\{env\\\:${matchResult[1]}\\\}`, "gm"),
          vsCodeEnv[matchResult[1]]!,
        );
        this.dbtTerminal.debug(
          "pythonEnvironment:substituteSettingsVariables",
          `Picking env var ${matchResult[1]} from ${sources?.[matchResult[1]]}`,
        );
      }
    }
    const resolvedFolder = workspaceFolder || workspace.workspaceFolders?.[0];
    if (resolvedFolder) {
      value = value.replace("${workspaceFolder}", resolvedFolder.uri.fsPath);
    }
    return value;
  }

  /**
   * Detect Python with dbt installed from the VS Code integrated terminal.
   * Uses shell integration API to execute a probe command in a real terminal
   * (which has the user's shell profile, venv activations, conda, etc.).
   * Returns undefined if no terminal with shell integration is available.
   */
  public async detectPythonFromShell(): Promise<string | undefined> {
    // Unique markers to reliably extract the path from noisy terminal output.
    const startMarker = "__DBT_DETECT_START__";
    const endMarker = "__DBT_DETECT_END__";
    // Emit each marker as two string literals joined at runtime by Python, so the
    // *contiguous* marker token never appears in the command text itself. Shell
    // integration echoes the command line into the same stream we read back; if a
    // literal marker were in the source, the marker search in executeInTerminal
    // would match the echo and extract a fragment of the probe code instead of the
    // real interpreter path. (That produced an invalid dbtPythonPathOverride like
    // `"); print(sys.executable); print("`.) The joined token only ever appears in
    // stdout.
    const asSplitLiteral = (marker: string, quote: string): string => {
      const mid = Math.ceil(marker.length / 2);
      return `${quote}${marker.slice(0, mid)}${quote} + ${quote}${marker.slice(
        mid,
      )}${quote}`;
    };
    // Build a platform-appropriate command string.
    // POSIX shells: outer single quotes, inner double quotes in Python code.
    // Windows/PowerShell: outer double quotes, inner single quotes in Python code.
    const isWindows = process.platform === "win32";
    const pyCode = (quote: string) =>
      `import sys; __import__(${quote}dbt${quote}); ` +
      `print(${asSplitLiteral(startMarker, quote)}); print(sys.executable); ` +
      `print(${asSplitLiteral(endMarker, quote)})`;
    const pyCodePosix = pyCode('"');
    const pyCodeWin = pyCode("'");
    const buildCmd = (pythonCmd: string) =>
      isWindows
        ? `${pythonCmd} -c "${pyCodeWin}"`
        : `${pythonCmd} -c '${pyCodePosix}'`;

    const terminal = this.findTerminalWithShellIntegration();
    if (!terminal?.shellIntegration) {
      this.dbtTerminal.debug(
        "pythonEnvironment:detectPythonFromShell",
        "No terminal with shell integration found",
      );
      return undefined;
    }

    this.dbtTerminal.debug(
      "pythonEnvironment:detectPythonFromShell",
      `Using terminal: ${terminal.name}`,
    );
    for (const pythonCmd of ["python3", "python"]) {
      const result = await this.executeInTerminal(
        terminal,
        buildCmd(pythonCmd),
        startMarker,
        endMarker,
      );
      if (result) {
        return result;
      }
    }

    return undefined;
  }

  private findTerminalWithShellIntegration(): Terminal | undefined {
    // Prefer the active terminal if it has shell integration
    const active = window.activeTerminal;
    if (active?.shellIntegration) {
      return active;
    }
    // Otherwise find any terminal with shell integration
    return window.terminals.find((t) => t.shellIntegration !== undefined);
  }

  private async executeInTerminal(
    terminal: Terminal,
    commandLine: string,
    startMarker: string,
    endMarker: string,
  ): Promise<string | undefined> {
    if (!terminal.shellIntegration) {
      return undefined;
    }
    const execution = terminal.shellIntegration.executeCommand(commandLine);
    // Race the stream read against a 10s timeout to avoid hanging indefinitely.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const output = await Promise.race([
      (async () => {
        let collected = "";
        for await (const data of execution.read()) {
          collected += data;
        }
        return collected;
      })(),
      new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), 10_000);
      }),
    ]).finally(() => {
      // Clear the timer when the read wins so it doesn't keep the event loop alive.
      if (timer) {
        clearTimeout(timer);
      }
    });
    if (output === undefined) {
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Timed out executing: ${commandLine}`,
      );
      return undefined;
    }
    // Strip ANSI/OSC escape codes and control characters
    const cleaned = output.replace(
      // eslint-disable-next-line no-control-regex
      /\x1B(?:\][^\x07\x1B]*(?:\x07|\x1B\\)|[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
      "",
    );
    this.dbtTerminal.debug(
      "pythonEnvironment:executeInTerminal",
      `Terminal output (cleaned): ${cleaned.slice(0, 500)}`,
    );
    // Extract the path between our unique markers
    const startIdx = cleaned.indexOf(startMarker);
    const endIdx = cleaned.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      return undefined;
    }
    const between = cleaned.slice(startIdx + startMarker.length, endIdx).trim();
    if (between) {
      // Defense-in-depth: only accept an absolute path to an existing file, so
      // shell noise or a leaked command echo can never be persisted as the
      // interpreter (dbt.dbtPythonPathOverride).
      if (!isAbsolute(between) || !existsSync(between)) {
        this.dbtTerminal.debug(
          "pythonEnvironment:executeInTerminal",
          `Ignoring detected value that is not a valid interpreter path: ${between}`,
        );
        return undefined;
      }
      this.dbtTerminal.debug(
        "pythonEnvironment:executeInTerminal",
        `Detected Python with dbt at: ${between}`,
      );
      return between;
    }
    return undefined;
  }

  private async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python");
    if (!extension) {
      this.dbtTerminal.debug(
        "pythonEnvironment:activatePythonExtension",
        "The Python extension is not installed; continuing without it",
      );
      return this.executionDetailsWithoutPythonExtension();
    }
    try {
      if (!extension.isActive) {
        await extension.activate();
      }
      await extension.exports.ready;
    } catch (error) {
      this.dbtTerminal.warn(
        "pythonEnvironment:activatePythonExtension",
        "The Python extension failed to activate; continuing without it",
        true,
        error,
      );
      return this.executionDetailsWithoutPythonExtension();
    }
    this._pythonExtensionAvailable = true;

    const api = extension.exports;
    this.allPythonPaths = await api.environment.getEnvironmentPaths();
    const pythonPath = api.settings.getExecutionDetails(workspace.workspaceFile)
      .execCommand[0];
    const envDetails = await api.environment.getEnvironmentDetails(pythonPath);
    this.isPython3 = envDetails?.version?.[0] === "3";
    this._pythonVersion = envDetails?.version?.join(".");

    const dbtInstalledPythonPath: string[] = [];
    // TODO: support multiple workspacefolders for python detection
    // for (const workspaceFolder of workspace.workspaceFolders || []) {
    //   const candidatePythonPath = api.settings.getExecutionDetails(
    //     workspaceFolder.uri,
    //   ).execCommand[0];

    //   const dbtInstalledCommand =
    //     this.dbtCommandFactory.createVerifyDbtInstalledCommand();
    //   const checkDBTInstalledProcess =
    //     this.commandProcessExecutionFactory.createCommandProcessExecution({
    //       command: candidatePythonPath,
    //       args: dbtInstalledCommand.processExecutionParams.args,
    //     });

    //   try {
    //     await checkDBTInstalledProcess.complete();
    //   } catch {
    //     continue;
    //   }

    //   dbtInstalledPythonPath.push(candidatePythonPath);
    // }

    return (this.executionDetails = {
      getPythonPath: () => {
        if (dbtInstalledPythonPath.length > 0) {
          return dbtInstalledPythonPath[0];
        } else {
          return api.settings.getExecutionDetails(workspace.workspaceFile)
            .execCommand[0];
        }
      },
      onDidChangeExecutionDetails: api.settings.onDidChangeExecutionDetails,
      getEnvVars: (workspaceFolder?: WorkspaceFolder) =>
        this.collectEnvVars(workspaceFolder, api),
    });
  }

  /**
   * Execution details when the Python extension is missing: the override
   * interpreter if one is set, otherwise none (an empty path), and the
   * process and integrated-terminal environment.
   */
  private executionDetailsWithoutPythonExtension(): PythonExecutionDetails {
    this._pythonExtensionAvailable = false;
    // Without the extension, `dbt.dbtPythonPathOverride` is the one way to
    // get an interpreter: a change to it re-runs detection and starts the
    // projects held for the missing interpreter, as a change of interpreter
    // in the extension would.
    const overrideChanges = new EventEmitter<Uri | undefined>();
    this.disposables.push(
      overrideChanges,
      workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("dbt.dbtPythonPathOverride")) {
          overrideChanges.fire(undefined);
        }
      }),
    );
    return (this.executionDetails = {
      getPythonPath: () => "",
      onDidChangeExecutionDetails: overrideChanges.event,
      getEnvVars: (workspaceFolder?: WorkspaceFolder) =>
        this.collectEnvVars(workspaceFolder),
    });
  }

  // There are 3 places from where we can get environments variables:
  // 1. process env    2. integrated terminal env    3. dot env file (from the Python extension, when it is installed)
  // Collecting env vars from all 3 places and merging them into one in the above order
  // While merging, also tagging the places from where the env var has come.
  private collectEnvVars(
    workspaceFolder: WorkspaceFolder | undefined,
    api?: {
      environments?: {
        getEnvironmentVariables: (
          folder: WorkspaceFolder,
        ) => Record<string, string | undefined>;
      };
    },
  ): EnvVarsResult {
    const envVars: EnvironmentVariables = {};
    const sources: Record<string, EnvFrom> = {};
    for (const key in process.env) {
      envVars[key] = process.env[key];
      sources[key] = "process";
    }
    try {
      const integratedEnv: Record<string, Record<string, string>> | undefined =
        workspace.getConfiguration("terminal").get("integrated.env");
      if (integratedEnv) {
        // parse vs code environment variables
        for (const prop in integratedEnv) {
          // Ignore any settings not supported by the terminal
          // We don't know which os is used in terminal unfortunately, so we just merge all of them.
          if (!["osx", "windows", "linux"].includes(prop)) {
            this.dbtTerminal.debug(
              "pythonEnvironment:envVars",
              "Loading env vars from config.terminal.integrated.env",
              "Ignoring invalid property " + prop,
            );
            continue;
          }
          this.dbtTerminal.debug(
            "pythonEnvironment:envVars",
            "Loading env vars from config.terminal.integrated.env",
            "Merging from " + prop,
            Object.keys(integratedEnv[prop]),
          );
          for (const key in integratedEnv[prop]) {
            envVars[key] = this.substituteSettingsVariables(
              integratedEnv[prop][key],
              process.env,
              workspaceFolder,
              sources,
            );
            sources[key] = "integrated";
          }
        }
      }
      if (api?.environments) {
        const workspacePath =
          workspaceFolder || workspace.workspaceFolders?.[0];
        if (workspacePath) {
          this.dbtTerminal.debug(
            "pythonEnvironment:envVars",
            `workspacePath:${workspacePath.uri.fsPath}`,
          );
          const workspaceEnv =
            api.environments.getEnvironmentVariables(workspacePath);
          this.dbtTerminal.debug(
            "pythonEnvironment:envVars",
            `workspaceEnv:${Object.keys(workspaceEnv)}`,
          );
          for (const key in workspaceEnv) {
            // env var from python extension also includes env var from process env
            // therefore only merging those env var, which are not present in process env
            // or whose value differ from process env
            if (!(key in envVars) || workspaceEnv[key] !== envVars[key]) {
              envVars[key] = workspaceEnv[key];
              sources[key] = "dotenv";
            }
          }
        }
      }
    } catch (e: any) {
      this.dbtTerminal.error(
        "getEnvVarsError",
        "Could not call environment api",
        e,
      );
    }

    return { vars: envVars, sources };
  }
}
