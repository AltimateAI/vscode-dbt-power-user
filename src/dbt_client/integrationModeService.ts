import {
  DBTTerminal,
  DbtV2Binary,
  findDbtV2Binary,
  FindDbtV2BinaryOptions,
  probePythonDbtCore,
  PythonDbtCore,
} from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import * as path from "path";
import {
  commands,
  ConfigurationTarget,
  Memento,
  window,
  workspace,
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
}

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
    },
  ) {}

  get autoSwitched(): AutoSwitch | undefined {
    return this.autoSwitch;
  }

  async resolve(workspaceState: Memento): Promise<string> {
    this.workspaceState = workspaceState;
    const configured = readConfiguredDbtIntegration();
    this.resolvedExplicit = configured.explicit;
    let binary: DbtV2Binary | undefined;
    let pythonDbtCore: PythonDbtCore = { importable: false };
    let dbtLoom = false;
    if (!configured.explicit) {
      await this.pythonEnvironment.initialize();
      const env = this.pythonEnvironment.getEnvironmentVariables();
      binary = await this.probes.findBinary({
        pythonPath: this.pythonEnvironment.pythonPath || undefined,
        cwd: workspace.workspaceFolders?.[0]?.uri.fsPath,
        env,
      });
      if (binary) {
        if (this.pythonEnvironment.pythonExtensionAvailable) {
          pythonDbtCore = await this.probes.probeDbtCore(
            this.pythonEnvironment.pythonPath || undefined,
            env,
          );
        }
        dbtLoom =
          Boolean(env.DBT_LOOM_CONFIG_PATH) ||
          (workspace.workspaceFolders ?? []).some((folder) =>
            existsSync(path.join(folder.uri.fsPath, DBT_LOOM_CONFIG)),
          );
      }
    }
    const { mode, autoSwitched, heldBack } = decideDbtIntegrationMode(
      configured,
      {
        dbtV2Found: binary !== undefined,
        pythonDbtCore: pythonDbtCore.importable,
        dbtLoom,
      },
    );
    setEffectiveDbtIntegrationMode(mode);
    if (heldBack && binary) {
      this.switchHeld = { reason: heldBack, binary };
      const cause =
        heldBack === "dbtCore"
          ? "dbt-core imports in the selected interpreter"
          : "a dbt-loom config is present";
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
    const because =
      held.reason === "dbtCore"
        ? "the interpreter has dbt-core"
        : "a dbt-loom config is present";
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
