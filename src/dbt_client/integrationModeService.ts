import {
  DBT_PROJECT_FILE,
  DBTTerminal,
  DbtV2Binary,
  EnvironmentVariables,
  findDbtV2Binary,
  FindDbtV2BinaryOptions,
  findProfilesFile,
  probePythonDbtCore,
  readAndParseProjectConfig,
  resolveProfileTargets,
} from "@altimateai/dbt-integration";
import { existsSync, readFileSync } from "fs";
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
  FusionAdapterCheck,
  getDbtIntegrationMode,
  projectAdapterCheck,
  pythonDbtCoreFromCheck,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
  SwitchHeldReason,
  windowAdapterCheck,
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
  adapterUnsupported: "dbt Fusion does not support the profile's adapter",
  dbtLoom: "a dbt-loom config is present",
  dbtCoreUnknown: "dbt-core could not be checked in the selected interpreter",
};
const HELD_BECAUSE: Record<SwitchHeldReason, string> = {
  dbtCore: "the interpreter has dbt-core",
  adapterUnsupported:
    "the dbt profile uses an adapter dbt Fusion does not support",
  dbtLoom: "a dbt-loom config is present",
  dbtCoreUnknown: "dbt-core could not be checked in the selected interpreter",
};
/**
 * For a window held for its adapter: what dbt Core mode, which it keeps,
 * still needs when the selected interpreter cannot run it.
 */
const CORE_MODE_NEEDS: Partial<Record<DbtCoreCheck, string>> = {
  notInstalled:
    "dbt Core mode needs dbt-core, which the selected Python interpreter does not have.",
  noInterpreter: "dbt Core mode needs a Python interpreter with dbt-core.",
};

/** "the dbt profile uses the sqlserver adapter, which dbt Fusion does not support" */
function unsupportedAdaptersPhrase(types: string[]): string {
  const names =
    types.length > 1
      ? `${types.slice(0, -1).join(", ")} and ${types[types.length - 1]}`
      : types[0];
  return types.length > 1
    ? `the dbt profile targets use the ${names} adapters, which dbt Fusion does not support`
    : `the dbt profile uses the ${names} adapter, which dbt Fusion does not support`;
}

/** What an adapter type looks like, for telemetry. */
const ADAPTER_NAME = /^[A-Za-z0-9_-]{1,40}$/;

/** What the adapter check found, for the decision, the notices and telemetry. */
interface AdapterFindings {
  check: FusionAdapterCheck;
  /** The candidate adapter types read, sorted, each once. */
  types: string[];
  /** The types of the projects found unsupported, sorted, each once. */
  unsupported: string[];
}

export interface AutoSwitch {
  from: string;
  binary: DbtV2Binary;
  dbtCoreCheck: DbtCoreCheck;
  fusionAdapterCheck: FusionAdapterCheck;
}

export interface SwitchHeld {
  reason: SwitchHeldReason;
  binary: DbtV2Binary;
  dbtCoreCheck: DbtCoreCheck;
  fusionAdapterCheck: FusionAdapterCheck;
  /** The adapter types dbt Fusion does not support, for "adapterUnsupported". */
  unsupportedAdapters: string[];
}

/** How the user answered the offer to switch back to dbt Core. */
export type ParseFailedAnswer = "switchBack" | "keepFusion" | "dismissed";

/** A notification VS Code cancelled while it was open. */
const CANCELED = Symbol("canceled");

/**
 * The button chosen on a notification (`undefined` when it was dismissed), or
 * `CANCELED` when VS Code cancelled it while it was open: the window closed or
 * the extension host stopped first. That is no answer, not an error.
 */
async function answerTo<T>(
  notification: Thenable<T | undefined>,
): Promise<T | undefined | typeof CANCELED> {
  try {
    return await notification;
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "Canceled" &&
      error.message === "Canceled"
    ) {
      return CANCELED;
    }
    throw error;
  }
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
    let adapters: AdapterFindings = {
      check: "noProjects",
      types: [],
      unsupported: [],
    };
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
        const projectRoots = await this.listProjectRoots();
        dbtLoom =
          Boolean(env.DBT_LOOM_CONFIG_PATH) ||
          this.dbtLoomConfigured(projectRoots);
        adapters = this.checkAdapters(projectRoots, env, binary.version);
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
        fusionAdapterUnsupported: adapters.check === "unsupported",
      },
    );
    // Adapter names as telemetry sees them; anything else a profile holds is "other".
    const adapterTypes = adapters.types
      .map((type) => (ADAPTER_NAME.test(type) ? type : "other"))
      .join(",");
    setEffectiveDbtIntegrationMode(mode);
    if (heldBack && binary) {
      this.switchHeld = {
        reason: heldBack,
        binary,
        dbtCoreCheck,
        fusionAdapterCheck: adapters.check,
        unsupportedAdapters: adapters.unsupported,
      };
      const cause =
        heldBack === "adapterUnsupported"
          ? `${HELD_CAUSES[heldBack]} (${adapters.unsupported.join(", ")})`
          : HELD_CAUSES[heldBack];
      this.terminal.info(
        "dbtIntegrationSwitchHeld",
        `${binary.path} is dbt ${binary.version.join(".")}, but ${cause}: keeping ${mode} (dbt-core check: ${dbtCoreCheck}, adapter check: ${adapters.check})`,
        false,
      );
      this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeld", {
        reason: heldBack,
        binaryVersion: binary.version.join("."),
        binaryLocation: binary.location,
        dbtCoreCheck,
        fusionAdapterCheck: adapters.check,
        adapterTypes,
      });
    }
    if (autoSwitched && binary) {
      this.autoSwitch = {
        from: configured.value,
        binary,
        dbtCoreCheck,
        fusionAdapterCheck: adapters.check,
      };
      this.terminal.info(
        "dbtIntegrationAutoSwitched",
        `dbt.dbtIntegration is not set and ${binary.path} is dbt ${binary.version.join(".")}: using dbt Fusion (dbt-core check: ${dbtCoreCheck}, adapter check: ${adapters.check})`,
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
        fusionAdapterCheck: adapters.check,
        adapterTypes,
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
   * The roots of the dbt projects under the workspace folders, as
   * `discoverProjects` will find them.
   */
  private async listProjectRoots(): Promise<string[]> {
    const roots: string[] = [];
    for (const folder of workspace.workspaceFolders ?? []) {
      let projectFiles: Uri[] = [];
      try {
        projectFiles = await this.probes.findProjectFiles(folder);
      } catch (error) {
        // Discovery retries this later; for the mode decision an unreadable
        // folder is a folder without dbt projects.
        this.terminal.debug(
          "dbtIntegrationProjectList",
          `Could not list dbt projects under ${folder.uri.fsPath}: ${error}`,
        );
      }
      for (const file of projectFiles) {
        const root = path.dirname(file.fsPath);
        if (!roots.includes(root)) {
          roots.push(root);
        }
      }
    }
    return roots;
  }

  /**
   * Whether a dbt-loom config sits at a workspace folder root or beside any
   * dbt project under one. The library reads dbt-loom from each project's
   * root, so a nested project's config holds the switch back too.
   */
  private dbtLoomConfigured(projectRoots: string[]): boolean {
    const folders = (workspace.workspaceFolders ?? []).map(
      (folder) => folder.uri.fsPath,
    );
    return [...folders, ...projectRoots].some((dir) =>
      existsSync(path.join(dir, DBT_LOOM_CONFIG)),
    );
  }

  /**
   * Whether dbt Fusion `version` accepts the adapter each project's profile
   * uses, read from profiles.yml as dbt Fusion would find it.
   */
  private checkAdapters(
    projectRoots: string[],
    env: EnvironmentVariables,
    version: number[],
  ): AdapterFindings {
    const checks: FusionAdapterCheck[] = [];
    const types = new Set<string>();
    const unsupported = new Set<string>();
    for (const root of projectRoots) {
      const candidates = this.profileAdapterTypes(root, env);
      const check = projectAdapterCheck(candidates, version);
      checks.push(check);
      for (const type of candidates) {
        if (type !== undefined) {
          types.add(type);
          if (check === "unsupported") {
            unsupported.add(type);
          }
        }
      }
    }
    return {
      check: windowAdapterCheck(checks),
      types: [...types].sort(),
      unsupported: [...unsupported].sort(),
    };
  }

  /**
   * The adapter types a project may run with: its profile's default target's
   * type, or every output's when the default target cannot be told without
   * dbt. Empty when the profile cannot be read; `undefined` for an output
   * whose type cannot be read.
   */
  private profileAdapterTypes(
    projectRoot: string,
    env: EnvironmentVariables,
  ): (string | undefined)[] {
    try {
      const profileName = readAndParseProjectConfig(projectRoot)?.profile;
      if (typeof profileName !== "string" || profileName.includes("{{")) {
        return [];
      }
      const profilesFile = findProfilesFile(projectRoot, env);
      if (!profilesFile) {
        return [];
      }
      const profile = resolveProfileTargets(
        readFileSync(profilesFile, "utf8"),
        profileName,
        env,
      );
      if (profile.defaultTarget !== undefined) {
        return [profile.adapterTypes[profile.defaultTarget]];
      }
      return profile.targets.map((target) => profile.adapterTypes[target]);
    } catch (error) {
      this.terminal.debug(
        "dbtIntegrationAdapterCheck",
        `Could not read the profile of ${projectRoot}: ${error}`,
      );
      return [];
    }
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
    const answer = await answerTo(
      window.showInformationMessage(
        `Power User for dbt is using dbt Fusion for ${names}: the dbt on your path is dbt ${version}, ` +
          "which needs dbt Fusion mode. Set dbt.dbtIntegration to choose a mode yourself.",
        OPEN_SETTINGS,
      ),
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
    // Sent when shown: one that is never answered still counts.
    this.telemetry.sendTelemetryEvent(
      "dbtIntegrationAutoSwitchParseFailedOffered",
      { binaryVersion: version, dbtCoreCheck: autoSwitch.dbtCoreCheck },
      { errorCount },
    );
    const choice = await answerTo(
      window.showWarningMessage(
        `dbt Fusion could not parse ${name}. Power User switched this window to dbt Fusion because dbt ${version} is on your path` +
          (SWITCHED_BECAUSE[autoSwitch.dbtCoreCheck]
            ? ` and ${SWITCHED_BECAUSE[autoSwitch.dbtCoreCheck]}`
            : "."),
        SWITCH_BACK,
        KEEP_FUSION,
      ),
    );
    if (choice === CANCELED) {
      this.terminal.debug(
        "dbtIntegrationAutoSwitchParseFailed",
        `The offer for ${name} closed without an answer`,
      );
      return;
    }
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
    const because =
      held.reason === "adapterUnsupported" &&
      held.unsupportedAdapters.length > 0
        ? unsupportedAdaptersPhrase(held.unsupportedAdapters)
        : HELD_BECAUSE[held.reason];
    const needs =
      held.reason === "adapterUnsupported"
        ? CORE_MODE_NEEDS[held.dbtCoreCheck]
        : undefined;
    const answer = await answerTo(
      window.showInformationMessage(
        `dbt Fusion ${held.binary.version.join(".")} was found at ${held.binary.path}, but this window keeps dbt Core mode because ${because}.` +
          (needs ? ` ${needs}` : ""),
        USE_FUSION,
        DISMISS,
      ),
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
