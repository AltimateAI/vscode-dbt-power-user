import {
  DBTTerminal,
  DbtV2Binary,
  findDbtV2Binary,
  FindDbtV2BinaryOptions,
  probePythonDbtCore,
  PythonDbtCore,
} from "@altimateai/dbt-integration";
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
} from "./integrationMode";
import { PythonEnvironment } from "./pythonEnvironment";

/** workspaceState key: the project roots already told about the switch. */
export const AUTO_SWITCH_NOTIFIED_KEY = "dbtPowerUser.fusionAutoSwitchNotified";

const SWITCH_BACK = "Switch back to dbt Core";
const OPEN_SETTINGS = "Open setting";

export interface AutoSwitch {
  from: string;
  binary: DbtV2Binary;
  pythonDbtCore: PythonDbtCore;
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
 * Fusion when a dbt 2.x binary is on the project's path. Tells each project
 * about an automatic switch once, and offers to switch back to dbt Core when
 * dbt Core imports in the selected interpreter.
 */
export class IntegrationModeService {
  private autoSwitch?: AutoSwitch;
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
    if (!configured.explicit) {
      await this.pythonEnvironment.initialize();
      binary = await this.probes.findBinary({
        pythonPath: this.pythonEnvironment.pythonPath || undefined,
        cwd: workspace.workspaceFolders?.[0]?.uri.fsPath,
        env: this.pythonEnvironment.getEnvironmentVariables(),
      });
    }
    const { mode, autoSwitched } = decideDbtIntegrationMode(
      configured,
      binary !== undefined,
    );
    setEffectiveDbtIntegrationMode(mode);
    if (autoSwitched && binary) {
      const pythonDbtCore = this.pythonEnvironment.pythonExtensionAvailable
        ? await this.probes.probeDbtCore(
            this.pythonEnvironment.pythonPath || undefined,
            this.pythonEnvironment.getEnvironmentVariables(),
          )
        : { importable: false };
      this.autoSwitch = { from: configured.value, binary, pythonDbtCore };
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
        pythonDbtCoreAvailable: `${pythonDbtCore.importable}`,
        pythonDbtCoreVersion: pythonDbtCore.version ?? "",
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
    const canSwitchBack = autoSwitch.pythonDbtCore.importable;
    const message =
      `Power User for dbt is using dbt Fusion for ${names}: the dbt on your path is dbt ${version}, ` +
      "which needs dbt Fusion mode. " +
      (canSwitchBack
        ? `dbt Core ${autoSwitch.pythonDbtCore.version} is also installed in the selected Python environment.`
        : "Set dbt.dbtIntegration to choose a mode yourself.");
    const actions = canSwitchBack
      ? [SWITCH_BACK, OPEN_SETTINGS]
      : [OPEN_SETTINGS];
    const answer = await window.showInformationMessage(message, ...actions);
    if (answer === SWITCH_BACK) {
      await this.switchBack();
    } else if (answer === OPEN_SETTINGS) {
      commands.executeCommand(
        "workbench.action.openSettings",
        "dbt.dbtIntegration",
      );
    }
  }

  /**
   * Back to dbt Core for this workspace: writes `dbt.dbtIntegration: core`
   * to the workspace settings, which makes it explicit, so the window
   * reloads in core mode and is never switched automatically again.
   */
  async switchBack(): Promise<void> {
    this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchBack", {
      binaryVersion: this.autoSwitch?.binary.version.join(".") ?? "",
    });
    await workspace
      .getConfiguration("dbt")
      .update("dbtIntegration", "core", ConfigurationTarget.Workspace);
  }
}
