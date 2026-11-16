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
import {
  decideDbtIntegrationMode,
  getDbtIntegrationMode,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
  SwitchHeldReason,
} from "./integrationMode";
import { PythonEnvironment } from "./pythonEnvironment";

/** workspaceState key: the project roots already told about the switch. */
export const AUTO_SWITCH_NOTIFIED_KEY = "dbtPowerUser.fusionAutoSwitchNotified";
/** workspaceState key: the workspace was told why it was not switched. */
export const SWITCH_HELD_NOTIFIED_KEY = "dbtPowerUser.fusionSwitchHeldNotified";

const OPEN_SETTINGS = "Open setting";
const USE_FUSION = "Use dbt Fusion";
const DISMISS = "Dismiss";
const DBT_LOOM_CONFIG = "dbt_loom.config.yml";
/** Where dbt projects are not looked for, as `discoverProjects` excludes them. */
const PROJECT_EXCLUDES =
  "**/{dbt_packages,site-packages,dbt_internal_packages}";
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
  dbtCoreUnknown:
    "dbt-core could not be checked in the selected interpreter in time",
};
const HELD_BECAUSE: Record<SwitchHeldReason, string> = {
  dbtCore: "the interpreter has dbt-core",
  dbtLoom: "a dbt-loom config is present",
  dbtCoreUnknown:
    "dbt-core could not be checked in the selected interpreter in time",
};

export interface AutoSwitch {
  from: string;
  binary: DbtV2Binary;
}

export interface SwitchHeld {
  reason: SwitchHeldReason;
  binary: DbtV2Binary;
}

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
    new RelativePattern(folder, PROJECT_EXCLUDES),
  );

/**
 * Decides, once per window and before dbt is detected, which integration
 * mode runs: an explicit `dbt.dbtIntegration` always; with the default, dbt
 * Fusion when a dbt 2.x binary is on the project's path and the project
 * cannot run in dbt Core mode (no dbt-core in the selected interpreter, no
 * dbt-loom config). Tells each project about an automatic switch once, and
 * the workspace once why a found binary did not switch it.
 */
export class IntegrationModeService {
  private autoSwitch?: AutoSwitch;
  private switchHeld?: SwitchHeld;
  private resolvedExplicit = false;
  private workspaceState?: Memento;

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
    let pythonDbtCore: boolean | "unknown" = false;
    let dbtLoom = false;
    if (!configured.explicit) {
      await this.pythonEnvironment.initialize();
      const env = this.pythonEnvironment.getEnvironmentVariables();
      // The selected interpreter, or `dbt.dbtPythonPathOverride` without the
      // Python extension; empty when there is no interpreter at all.
      const pythonPath = this.pythonEnvironment.pythonPath || undefined;
      binary = await this.probes.findBinary({
        pythonPath,
        cwd: workspace.workspaceFolders?.[0]?.uri.fsPath,
        env,
      });
      if (binary) {
        if (pythonPath) {
          pythonDbtCore = await this.probeDbtCore(pythonPath, env);
        }
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
        pythonDbtCore,
        dbtLoom,
      },
    );
    setEffectiveDbtIntegrationMode(mode);
    if (heldBack && binary) {
      this.switchHeld = { reason: heldBack, binary };
      const cause = HELD_CAUSES[heldBack];
      this.terminal.info(
        "dbtIntegrationSwitchHeld",
        `${binary.path} is dbt ${binary.version.join(".")}, but ${cause}: keeping ${mode}`,
        false,
      );
      this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeld", {
        reason: heldBack,
        binaryVersion: binary.version.join("."),
        binaryLocation: binary.location,
      });
    }
    if (autoSwitched && binary) {
      this.autoSwitch = { from: configured.value, binary };
      this.terminal.info(
        "dbtIntegrationAutoSwitched",
        `dbt.dbtIntegration is not set and ${binary.path} is dbt ${binary.version.join(".")}: using dbt Fusion`,
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
      });
    }
    return mode;
  }

  /**
   * Whether dbt-core imports in `pythonPath`, or "unknown" when the probe has
   * not answered within `probeTimeoutMs`. The library's own timeout reports
   * "no dbt-core"; a user with both dbt Core and Fusion whose first import is
   * slow would be switched by that, so the slow answer is not trusted.
   */
  private async probeDbtCore(
    pythonPath: string,
    env: Record<string, string | undefined>,
  ): Promise<boolean | "unknown"> {
    let timer: NodeJS.Timeout | undefined;
    const unknown = new Promise<"unknown">((resolve) => {
      timer = setTimeout(() => resolve("unknown"), this.probeTimeoutMs);
    });
    try {
      const probe = this.probes
        .probeDbtCore(pythonPath, env, this.probeTimeoutMs + PROBE_GRACE_MS)
        .then((result) => result.importable);
      return await Promise.race([probe, unknown]);
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
