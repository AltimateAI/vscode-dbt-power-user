import {
  DBT_PROJECT_FILE,
  DBTTerminal,
  DbtV2Binary,
  findDbtV2Binary,
  FindDbtV2BinaryOptions,
  probePythonDbtCore,
} from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import * as path from "path";
import {
  commands,
  ConfigurationTarget,
  Memento,
  RelativePattern,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { TelemetryService } from "../telemetry";
import { PROJECT_EXCLUDE_PATTERN } from "./dbtWorkspaceFolder";
import {
  DbtCoreCheck,
  decideDbtIntegrationMode,
  getDbtIntegrationMode,
  pythonDbtCoreFromCheck,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
  SwitchHeldReason,
} from "./integrationMode";
import { isInterpreterPath, PythonEnvironment } from "./pythonEnvironment";

/** workspaceState key: the project roots already told about the switch. */
export const AUTO_SWITCH_NOTIFIED_KEY = "dbtPowerUser.fusionAutoSwitchNotified";
/** workspaceState key: the workspace was told why it was not switched. */
export const SWITCH_HELD_NOTIFIED_KEY = "dbtPowerUser.fusionSwitchHeldNotified";
/** workspaceState key: the workspace was offered dbt Core after dbt Fusion
 * could not parse a project in an automatically switched window. */
export const PARSE_FAILED_OFFERED_KEY =
  "dbtPowerUser.fusionAutoSwitchParseFailedOffered";

const OPEN_SETTINGS = "Open setting";
const USE_FUSION = "Use dbt Fusion";
const DISMISS = "Dismiss";
const SWITCH_BACK = "Switch back to dbt Core";
const KEEP_FUSION = "Keep dbt Fusion";
const DBT_LOOM_CONFIG = "dbt_loom.config.yml";
/**
 * Why the window was switched, and what dbt Core mode would need, for the
 * offer to switch back. A window is switched only when the selected
 * interpreter has no dbt-core or there is no interpreter at all, so dbt Core
 * mode needs one of those fixed first.
 */
const SWITCHED_BECAUSE: Partial<Record<DbtCoreCheck, string>> = {
  notInstalled:
    "the selected Python interpreter has no dbt-core. dbt Core mode needs dbt-core in the selected interpreter.",
  noInterpreter:
    "there is no Python interpreter. dbt Core mode needs a Python interpreter with dbt-core.",
};
/**
 * How long the dbt-core probe may take before its answer counts as unknown.
 * A slow first `import dbt.version` (a cold virus scan of a large venv) must
 * hold the switch back, not switch the window.
 */
export const DBT_CORE_PROBE_TIMEOUT_MS = 15_000;
/** The library's own timeout sits behind ours, so ours is the one that fires. */
const PROBE_GRACE_MS = 5_000;

const HELD_CAUSES: Record<SwitchHeldReason, string> = {
  dbtCore: "dbt-core imports in the selected interpreter",
  dbtLoom: "a dbt-loom config is present",
  dbtCoreUnknown: "dbt-core could not be checked in the selected interpreter",
};
const HELD_BECAUSE: Record<SwitchHeldReason, string> = {
  dbtCore: "the interpreter has dbt-core",
  dbtLoom: "a dbt-loom config is present",
  dbtCoreUnknown: "dbt-core could not be checked in the selected interpreter",
};

export interface AutoSwitch {
  from: string;
  binary: DbtV2Binary;
  dbtCoreCheck: DbtCoreCheck;
}

export interface SwitchHeld {
  reason: SwitchHeldReason;
  binary: DbtV2Binary;
  dbtCoreCheck: DbtCoreCheck;
}

/** How the user answered the offer to switch back to dbt Core. */
export type ParseFailedAnswer = "switchBack" | "keepFusion" | "dismissed";

export interface IntegrationModeProbes {
  findBinary: (
    options: FindDbtV2BinaryOptions,
  ) => Promise<DbtV2Binary | undefined>;
  probeDbtCore: typeof probePythonDbtCore;
  /** The `dbt_project.yml` files under a workspace folder, as discovery finds them. */
  findProjectFiles: (folder: WorkspaceFolder) => Thenable<Uri[]>;
}

const findProjectFiles = (folder: WorkspaceFolder) =>
  workspace.findFiles(
    new RelativePattern(folder, `**/${DBT_PROJECT_FILE}`),
    new RelativePattern(folder, PROJECT_EXCLUDE_PATTERN),
  );

/**
 * Decides, once per window and before dbt is detected, which integration
 * mode runs: an explicit `dbt.dbtIntegration` always; with the default, dbt
 * Fusion when a dbt 2.x binary is on the project's path and the project
 * cannot run in dbt Core mode (no dbt-core in the selected interpreter, no
 * dbt-loom config). Tells each project about an automatic switch once, and
 * the workspace once why a found binary did not switch it; after a switch,
 * offers dbt Core once when dbt Fusion cannot parse a project.
 */
export class IntegrationModeService {
  private autoSwitch?: AutoSwitch;
  private switchHeld?: SwitchHeld;
  private resolvedExplicit = false;
  private workspaceState?: Memento;
  /** Project roots whose first manifest rebuild has settled. */
  private firstRebuildSettled = new Set<string>();
  /** Manifest rebuilds running per project root. */
  private rebuildsRunning = new Map<string, number>();

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
    private probes: IntegrationModeProbes = {
      findBinary: findDbtV2Binary,
      probeDbtCore: probePythonDbtCore,
      findProjectFiles,
    },
    private probeTimeoutMs = DBT_CORE_PROBE_TIMEOUT_MS,
  ) {}

  get autoSwitched(): AutoSwitch | undefined {
    return this.autoSwitch;
  }

  async resolve(workspaceState: Memento): Promise<string> {
    this.workspaceState = workspaceState;
    let configured = readConfiguredDbtIntegration();
    let binary: DbtV2Binary | undefined;
    let dbtCoreCheck: DbtCoreCheck = "noInterpreter";
    let dbtLoom = false;
    if (!configured.explicit) {
      await this.pythonEnvironment.initialize();
      const env = this.pythonEnvironment.getEnvironmentVariables();
      // The selected interpreter, or `dbt.dbtPythonPathOverride` without the
      // Python extension; empty when there is no interpreter at all.
      const pythonPath = this.pythonEnvironment.pythonPath || undefined;
      // Read with the path: the check judges the interpreter by where it came
      // from when it was read, even if the override changes meanwhile.
      const fromOverride = this.pythonEnvironment.pythonPathFromOverride;
      binary = await this.probes.findBinary({
        pythonPath,
        cwd: workspace.workspaceFolders?.[0]?.uri.fsPath,
        env,
      });
      if (binary) {
        dbtCoreCheck = await this.checkDbtCore(pythonPath, fromOverride, env);
        dbtLoom =
          Boolean(env.DBT_LOOM_CONFIG_PATH) || (await this.dbtLoomConfigured());
      }
      // A setting made explicit while the probes ran wins over their result.
      configured = readConfiguredDbtIntegration();
    }
    this.resolvedExplicit = configured.explicit;
    const { mode, autoSwitched, heldBack } = decideDbtIntegrationMode(
      configured,
      {
        dbtV2Found: binary !== undefined,
        pythonDbtCore: pythonDbtCoreFromCheck(dbtCoreCheck),
        dbtLoom,
      },
    );
    setEffectiveDbtIntegrationMode(mode);
    if (heldBack && binary) {
      this.switchHeld = { reason: heldBack, binary, dbtCoreCheck };
      const cause = HELD_CAUSES[heldBack];
      this.terminal.info(
        "dbtIntegrationSwitchHeld",
        `${binary.path} is dbt ${binary.version.join(".")}, but ${cause}: keeping ${mode} (dbt-core check: ${dbtCoreCheck})`,
        false,
      );
      this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeld", {
        reason: heldBack,
        binaryVersion: binary.version.join("."),
        binaryLocation: binary.location,
        dbtCoreCheck,
      });
    }
    if (autoSwitched && binary) {
      this.autoSwitch = { from: configured.value, binary, dbtCoreCheck };
      this.terminal.info(
        "dbtIntegrationAutoSwitched",
        `dbt.dbtIntegration is not set and ${binary.path} is dbt ${binary.version.join(".")}: using dbt Fusion (dbt-core check: ${dbtCoreCheck})`,
        false,
      );
      this.telemetry.setTelemetryCustomAttribute(
        "dbtIntegrationAutoSwitched",
        "fusion",
      );
      this.telemetry.sendTelemetryEvent("dbtIntegrationAutoSwitched", {
        from: configured.value,
        to: mode,
        binaryVersion: binary.version.join("."),
        binaryLocation: binary.location,
        dbtCoreCheck,
      });
    }
    return mode;
  }

  /**
   * Checks whether dbt-core imports in the selected interpreter. Until the
   * Python extension has resolved the workspace's interpreter it reports its
   * default, a bare `python`, which runs whatever is first on the PATH: that
   * is not checked. A bare command from `dbt.dbtPythonPathOverride` is the
   * user's choice and is checked.
   */
  private async checkDbtCore(
    pythonPath: string | undefined,
    fromOverride: boolean,
    env: Record<string, string | undefined>,
  ): Promise<DbtCoreCheck> {
    if (
      this.pythonEnvironment.pythonExtensionAvailable &&
      !fromOverride &&
      (!pythonPath || !isInterpreterPath(pythonPath))
    ) {
      return "unresolvedInterpreter";
    }
    if (!pythonPath) {
      return "noInterpreter";
    }
    return this.probeDbtCore(pythonPath, env);
  }

  /**
   * The probe's answer, or "timeout" when it has not answered within
   * `probeTimeoutMs`. The library's own timeout sits behind ours, so a slow
   * first `import dbt.version` reads as this race's "timeout".
   */
  private async probeDbtCore(
    pythonPath: string,
    env: Record<string, string | undefined>,
  ): Promise<DbtCoreCheck> {
    let timer: NodeJS.Timeout | undefined;
    const timedOut = new Promise<DbtCoreCheck>((resolve) => {
      timer = setTimeout(() => resolve("timeout"), this.probeTimeoutMs);
    });
    try {
      const probe = this.probes
        .probeDbtCore(pythonPath, env, this.probeTimeoutMs + PROBE_GRACE_MS)
        .then(
          (result): DbtCoreCheck =>
            result.status === "unknown"
              ? (result.reason ?? "failed")
              : result.status,
        );
      return await Promise.race([probe, timedOut]);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Whether a dbt-loom config sits at a workspace folder root or beside any
   * dbt project under one, the roots `discoverProjects` will find. The
   * library reads dbt-loom from each project's root, so a nested project's
   * config holds the switch back too.
   */
  private async dbtLoomConfigured(): Promise<boolean> {
    const folders = workspace.workspaceFolders ?? [];
    if (
      folders.some((folder) =>
        existsSync(path.join(folder.uri.fsPath, DBT_LOOM_CONFIG)),
      )
    ) {
      return true;
    }
    for (const folder of folders) {
      let projectFiles: Uri[] = [];
      try {
        projectFiles = await this.probes.findProjectFiles(folder);
      } catch (error) {
        // Discovery retries this later; for the mode decision an unreadable
        // folder is a folder without a dbt-loom config.
        this.terminal.debug(
          "dbtIntegrationLoomCheck",
          `Could not list dbt projects under ${folder.uri.fsPath}: ${error}`,
        );
      }
      if (
        projectFiles.some((file) =>
          existsSync(path.join(path.dirname(file.fsPath), DBT_LOOM_CONFIG)),
        )
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Whether a change to `dbt.dbtIntegration` needs a reload: an explicit
   * value that differs from the mode in use, or the setting going back to
   * its default after the window started from an explicit one.
   */
  needsReload(): boolean {
    const configured = readConfiguredDbtIntegration();
    if (configured.explicit) {
      return configured.value !== getDbtIntegrationMode();
    }
    return this.resolvedExplicit;
  }

  /**
   * Tells the projects in `projectRoots` not told before about the switch,
   * in one notification, and remembers them. No-op without a switch.
   */
  async notifyProjects(
    projects: { root: string; name: string }[],
  ): Promise<void> {
    const autoSwitch = this.autoSwitch;
    if (!autoSwitch || !this.workspaceState || projects.length === 0) {
      return;
    }
    const notified = this.workspaceState.get<string[]>(
      AUTO_SWITCH_NOTIFIED_KEY,
      [],
    );
    const fresh = projects.filter(({ root }) => !notified.includes(root));
    if (fresh.length === 0) {
      return;
    }
    // Remembered before the notification is shown, so a rebuild or a second
    // registration while it is open does not show it again.
    await this.workspaceState.update(AUTO_SWITCH_NOTIFIED_KEY, [
      ...notified,
      ...fresh.map(({ root }) => root),
    ]);
    const names = fresh.map(({ name }) => name).join(", ");
    this.terminal.debug(
      "dbtIntegrationAutoSwitchNotice",
      `Telling ${names} about the switch to dbt Fusion`,
    );
    const version = autoSwitch.binary.version.join(".");
    const answer = await window.showInformationMessage(
      `Power User for dbt is using dbt Fusion for ${names}: the dbt on your path is dbt ${version}, ` +
        "which needs dbt Fusion mode. Set dbt.dbtIntegration to choose a mode yourself.",
      OPEN_SETTINGS,
    );
    if (answer === OPEN_SETTINGS) {
      commands.executeCommand(
        "workbench.action.openSettings",
        "dbt.dbtIntegration",
      );
    }
  }

  /**
   * Follows a project's manifest rebuilds in an automatically switched
   * window. When the first rebuild that settles leaves `errorCount` errors,
   * offers once per workspace to switch back to dbt Core. Later rebuilds,
   * and projects whose first rebuild parsed, are never offered it. No-op
   * without a switch.
   */
  async rebuildStatusChanged(project: {
    root: string;
    name: string;
    inProgress: boolean;
    errorCount: number;
  }): Promise<void> {
    const autoSwitch = this.autoSwitch;
    if (!autoSwitch || !this.workspaceState) {
      return;
    }
    const { root, name, inProgress, errorCount } = project;
    // Rebuilds overlap (a newer one aborts an older one, which still ends):
    // the first rebuild has settled when none is running.
    const running = this.rebuildsRunning.get(root) ?? 0;
    if (inProgress) {
      this.rebuildsRunning.set(root, running + 1);
      return;
    }
    this.rebuildsRunning.set(root, Math.max(0, running - 1));
    if (running > 1 || this.firstRebuildSettled.has(root)) {
      return;
    }
    this.firstRebuildSettled.add(root);
    if (
      errorCount === 0 ||
      this.workspaceState.get<boolean>(PARSE_FAILED_OFFERED_KEY, false)
    ) {
      return;
    }
    // Remembered before the warning is shown, so another project failing
    // while it is open does not show it again.
    await this.workspaceState.update(PARSE_FAILED_OFFERED_KEY, true);
    const version = autoSwitch.binary.version.join(".");
    this.terminal.info(
      "dbtIntegrationAutoSwitchParseFailed",
      `dbt Fusion could not parse ${name} (${errorCount} errors): offering dbt Core`,
      false,
    );
    const choice = await window.showWarningMessage(
      `dbt Fusion could not parse ${name}. Power User switched this window to dbt Fusion because dbt ${version} is on your path` +
        (SWITCHED_BECAUSE[autoSwitch.dbtCoreCheck]
          ? ` and ${SWITCHED_BECAUSE[autoSwitch.dbtCoreCheck]}`
          : "."),
      SWITCH_BACK,
      KEEP_FUSION,
    );
    const answer: ParseFailedAnswer =
      choice === SWITCH_BACK
        ? "switchBack"
        : choice === KEEP_FUSION
          ? "keepFusion"
          : "dismissed";
    this.telemetry.sendTelemetryEvent(
      "dbtIntegrationAutoSwitchParseFailed",
      {
        answer,
        binaryVersion: version,
        dbtCoreCheck: autoSwitch.dbtCoreCheck,
      },
      { errorCount },
    );
    if (answer === "switchBack") {
      // Explicit from here on: the configuration listener reloads the window
      // in dbt Core mode.
      await workspace
        .getConfiguration("dbt")
        .update("dbtIntegration", "core", ConfigurationTarget.Workspace);
    }
  }

  /**
   * Tells the workspace once why a found dbt 2.x binary did not switch it,
   * with a way to dbt Fusion. No-op unless the switch was held back.
   */
  async notifySwitchHeld(): Promise<void> {
    const held = this.switchHeld;
    if (
      !held ||
      !this.workspaceState ||
      this.workspaceState.get<boolean>(SWITCH_HELD_NOTIFIED_KEY, false)
    ) {
      return;
    }
    await this.workspaceState.update(SWITCH_HELD_NOTIFIED_KEY, true);
    const because = HELD_BECAUSE[held.reason];
    const answer = await window.showInformationMessage(
      `dbt Fusion ${held.binary.version.join(".")} was found at ${held.binary.path}, but this window keeps dbt Core mode because ${because}.`,
      USE_FUSION,
      DISMISS,
    );
    if (answer === USE_FUSION) {
      this.telemetry.sendTelemetryEvent("dbtIntegrationUseFusion", {
        reason: held.reason,
        binaryVersion: held.binary.version.join("."),
      });
      // Explicit from here on, so the window reloads in fusion mode.
      await workspace
        .getConfiguration("dbt")
        .update("dbtIntegration", "fusion", ConfigurationTarget.Workspace);
    }
  }
}
