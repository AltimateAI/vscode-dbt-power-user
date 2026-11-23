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
import { homedir } from "os";
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
import { parse as parseYaml } from "yaml";
import { TelemetryService } from "../telemetry";
import { PROJECT_EXCLUDE_PATTERN } from "./dbtWorkspaceFolder";
import {
  ALLOW_EXPERIMENTAL_ADAPTERS,
  DbtCoreCheck,
  decideDbtIntegrationMode,
  experimentalAdaptersAllowed,
  FusionAdapterCheck,
  fusionAdapterSupport,
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
const SELECT_INTERPRETER = "Select interpreter";
const INSTALL_DBT_CORE = "Install dbt Core";
const OPEN_PROFILES = "Open profiles.yml";
const OPEN_PROJECT_FILE = "Open dbt_project.yml";
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
  profileNotFound: "a project's dbt profile is missing",
  adapterExperimental:
    "dbt Fusion runs the profile's adapter only as an experimental one",
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

/** "a", "a and b", "a, b and c" */
function listed(items: string[]): string {
  return items.length > 1
    ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
    : items[0];
}

/** "the dbt profile uses the sqlserver adapter, which dbt Fusion does not support" */
function adaptersPhrase(types: string[], which: string): string {
  return types.length > 1
    ? `the dbt profile targets use the ${listed(types)} adapters, which dbt Fusion ${which}`
    : `the dbt profile uses the ${listed(types)} adapter, which dbt Fusion ${which}`;
}

/** The `terminal.integrated.env` setting for this platform, which dbt runs with. */
function terminalEnvSetting(): string {
  const os =
    process.platform === "win32"
      ? "windows"
      : process.platform === "darwin"
        ? "osx"
        : "linux";
  return `terminal.integrated.env.${os}`;
}

/**
 * What is missing for a "profileNotFound" hold, read the way dbt Fusion
 * reads it:
 * - "noProfileName": dbt_project.yml has no `profile:`.
 * - "noProfilesFile": no profiles.yml where dbt looks.
 * - "profileMissing": the profile is not in that profiles.yml.
 * - "targetMissing": the target dbt selects (`DBT_TARGET` or the profile's
 *   `target:`) is not one of the profile's outputs.
 */
export type ProfileCheck =
  | "noProfileName"
  | "noProfilesFile"
  | "profileMissing"
  | "targetMissing";

export interface ProfileProblem {
  check: ProfileCheck;
  /** The project's root, and its folder name for the message. */
  projectRoot: string;
  /** The profiles.yml read ("profileMissing", "targetMissing"). */
  profilesFile?: string;
  /** Where dbt looked for profiles.yml ("noProfilesFile"); empty when
   * `DBT_PROFILES_DIR` is set but empty. */
  searched?: string[];
  profile?: string;
  /** The target dbt selects, when it is written out ("targetMissing"). */
  target?: string;
}

/**
 * Where dbt Fusion looks for profiles.yml, as `findProfilesFile` does:
 * `DBT_PROFILES_DIR` alone when it is set, else the project, then `~/.dbt`.
 */
function profilesSearched(
  projectRoot: string,
  env: EnvironmentVariables,
): string[] {
  const profilesDir = env.DBT_PROFILES_DIR;
  if (profilesDir !== undefined) {
    return profilesDir === ""
      ? []
      : [path.resolve(projectRoot, profilesDir, "profiles.yml")];
  }
  return [
    path.join(projectRoot, "profiles.yml"),
    path.join(homedir(), ".dbt", "profiles.yml"),
  ];
}

// `{{ env_var('NAME') }}` or `{{ env_var("NAME", "default") }}`, as
// dbt-integration's `resolveProfileTargets` reads a profile's `target:`.
const SINGLE_ENV_VAR =
  /^\{\{\s*env_var\(\s*(['"])([^'"]+)\1\s*(?:,\s*(['"])([^'"]*)\3\s*)?\)\s*\}\}$/;

/**
 * The target dbt selects for `profileName`, for the message: `DBT_TARGET`,
 * else the profile's `target:`, literal or a single `env_var` call resolved
 * as `resolveProfileTargets` resolves it.
 */
function selectedTarget(
  profilesYaml: string,
  profileName: string,
  env: EnvironmentVariables,
): string | undefined {
  if (env.DBT_TARGET !== undefined) {
    return env.DBT_TARGET;
  }
  const document: unknown = parseYaml(profilesYaml);
  const target = (document as Record<string, { target?: unknown }>)?.[
    profileName
  ]?.target;
  if (typeof target !== "string") {
    return undefined;
  }
  if (!target.includes("{{")) {
    return target;
  }
  const match = SINGLE_ENV_VAR.exec(target);
  if (!match) {
    return undefined;
  }
  const [, , name, , fallback] = match;
  return (env[name] !== undefined ? env[name] : fallback) || undefined;
}

/** Why the window was held, with what was found, for the log. */
function heldCause(
  reason: SwitchHeldReason,
  adapters: AdapterFindings,
): string {
  switch (reason) {
    case "adapterUnsupported":
      return `${HELD_CAUSES[reason]} (${adapters.unsupported.join(", ")})`;
    case "adapterExperimental":
      return `${HELD_CAUSES[reason]} (${adapters.experimental.join(", ")})`;
    case "profileNotFound":
      return `${HELD_CAUSES[reason]} (${adapters.profileProblem?.check} in ${adapters.profileProblem?.projectRoot})`;
    default:
      return HELD_CAUSES[reason];
  }
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
  /** The types of the projects found experimental, sorted, each once. */
  experimental: string[];
  /** The first project whose profile is certainly missing. */
  profileProblem?: ProfileProblem;
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
  /** The experimental adapter types, for "adapterExperimental". */
  experimentalAdapters: string[];
  /** What is missing, for "profileNotFound". */
  profileProblem?: ProfileProblem;
}

/** How the user answered a hold message, for telemetry. */
type SwitchHeldAnswer =
  | "useFusion"
  | "selectInterpreter"
  | "installDbtCore"
  | "openFile"
  | "openSetting"
  | "dismissed";

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
  /** `notifyHeldWithoutDbtCore` told this window why it was held. */
  private heldErrorShown = false;

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
      experimental: [],
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
        fusionAdapterExperimental: adapters.check === "experimental",
        profileNotFound: adapters.profileProblem !== undefined,
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
        experimentalAdapters: adapters.experimental,
        profileProblem:
          heldBack === "profileNotFound" ? adapters.profileProblem : undefined,
      };
      const cause = heldCause(heldBack, adapters);
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
        ...(heldBack === "profileNotFound" && adapters.profileProblem
          ? { profileCheck: adapters.profileProblem.check }
          : {}),
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
   * Whether the found dbt Fusion accepts the adapter of every dbt project in
   * the window (`windowAdapterCheck`), and the first project whose profile is
   * certainly missing. Each project's candidate adapters are the ones its
   * profile uses, read from profiles.yml as dbt Fusion would find it.
   */
  private checkAdapters(
    projectRoots: string[],
    env: EnvironmentVariables,
    version: number[],
  ): AdapterFindings {
    const allowExperimental = experimentalAdaptersAllowed(env);
    const checks: FusionAdapterCheck[] = [];
    const types = new Set<string>();
    const unsupported = new Set<string>();
    const experimental = new Set<string>();
    let profileProblem: ProfileProblem | undefined;
    for (const root of projectRoots) {
      const { types: candidates, problem } = this.profileAdapterTypes(
        root,
        env,
      );
      profileProblem ??= problem;
      const check = projectAdapterCheck(candidates, version, allowExperimental);
      checks.push(check);
      for (const type of candidates) {
        if (type !== undefined) {
          types.add(type);
          if (check === "unsupported") {
            unsupported.add(type);
          }
          if (
            check === "experimental" &&
            fusionAdapterSupport(type, version, allowExperimental) ===
              "experimental"
          ) {
            experimental.add(type);
          }
        }
      }
    }
    return {
      check: windowAdapterCheck(checks),
      types: [...types].sort(),
      unsupported: [...unsupported].sort(),
      experimental: [...experimental].sort(),
      profileProblem,
    };
  }

  /**
   * The adapter types a project may run with: its profile's default target's
   * type, or every output's when the default target cannot be told without
   * dbt. Empty when the profile cannot be read; `undefined` for an output
   * whose type cannot be read. `problem` is set only when the profile is
   * certainly missing where dbt looks: a template, or a file that does not
   * parse, is left to dbt.
   */
  private profileAdapterTypes(
    projectRoot: string,
    env: EnvironmentVariables,
  ): { types: (string | undefined)[]; problem?: ProfileProblem } {
    try {
      const config: unknown = readAndParseProjectConfig(projectRoot);
      if (
        typeof config !== "object" ||
        config === null ||
        Array.isArray(config)
      ) {
        return { types: [] };
      }
      const profileName = (config as { profile?: unknown }).profile;
      if (
        profileName === undefined ||
        profileName === null ||
        profileName === ""
      ) {
        return {
          types: [],
          problem: { check: "noProfileName", projectRoot },
        };
      }
      if (typeof profileName !== "string" || profileName.includes("{{")) {
        return { types: [] };
      }
      const profilesFile = findProfilesFile(projectRoot, env);
      if (!profilesFile) {
        return {
          types: [],
          problem: {
            check: "noProfilesFile",
            projectRoot,
            searched: profilesSearched(projectRoot, env),
            profile: profileName,
          },
        };
      }
      const profilesYaml = readFileSync(profilesFile, "utf8");
      const profile = resolveProfileTargets(profilesYaml, profileName, env);
      if (profile.unresolved === "no-profile") {
        return {
          types: [],
          problem: {
            check: "profileMissing",
            projectRoot,
            profilesFile,
            profile: profileName,
          },
        };
      }
      const types =
        profile.defaultTarget !== undefined
          ? [profile.adapterTypes[profile.defaultTarget]]
          : profile.targets.map((target) => profile.adapterTypes[target]);
      if (profile.unresolved === "unknown-target") {
        return {
          types,
          problem: {
            check: "targetMissing",
            projectRoot,
            profilesFile,
            profile: profileName,
            target: selectedTarget(profilesYaml, profileName, env),
          },
        };
      }
      return { types };
    } catch (error) {
      this.terminal.debug(
        "dbtIntegrationAdapterCheck",
        `Could not read the profile of ${projectRoot}: ${error}`,
      );
      return { types: [] };
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
   * with a way to dbt Fusion. No-op unless the switch was held back, and
   * after `notifyHeldWithoutDbtCore` told this window already.
   */
  async notifySwitchHeld(): Promise<void> {
    const held = this.switchHeld;
    if (
      !held ||
      this.heldErrorShown ||
      !this.workspaceState ||
      this.workspaceState.get<boolean>(SWITCH_HELD_NOTIFIED_KEY, false)
    ) {
      return;
    }
    await this.workspaceState.update(SWITCH_HELD_NOTIFIED_KEY, true);
    const { text, actions } = heldMessage(held, false);
    const answer = await window.showInformationMessage(
      text,
      ...actions,
      DISMISS,
    );
    await this.answerHeld(held, answer, "notice");
  }

  /**
   * In a held window where dbt Core mode cannot start (dbt-core is not
   * detected), says why the window was not switched, as an error, in place
   * of the general "dbt is not installed" one. False, showing nothing, when
   * the window was not held or was held for having dbt-core: the caller
   * shows its own error then.
   */
  async notifyHeldWithoutDbtCore(): Promise<boolean> {
    const held = this.switchHeld;
    if (!held || held.reason === "dbtCore") {
      return false;
    }
    // Before the first await: the activation's notice checks it next.
    this.heldErrorShown = true;
    const { text, actions } = heldMessage(held, true);
    const answer = await window.showErrorMessage(text, ...actions);
    await this.answerHeld(held, answer, "error");
    return true;
  }

  private async answerHeld(
    held: SwitchHeld,
    choice: string | undefined,
    shownAs: "notice" | "error",
  ): Promise<void> {
    const answers: Record<string, SwitchHeldAnswer> = {
      [USE_FUSION]: "useFusion",
      [SELECT_INTERPRETER]: "selectInterpreter",
      [INSTALL_DBT_CORE]: "installDbtCore",
      [OPEN_PROFILES]: "openFile",
      [OPEN_PROJECT_FILE]: "openFile",
      [OPEN_SETTINGS]: "openSetting",
    };
    const answer: SwitchHeldAnswer =
      (choice !== undefined ? answers[choice] : undefined) ?? "dismissed";
    this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeldAnswer", {
      reason: held.reason,
      answer,
      shownAs,
      binaryVersion: held.binary.version.join("."),
    });
    switch (choice) {
      case USE_FUSION:
        // Explicit from here on, so the window reloads in fusion mode.
        await workspace
          .getConfiguration("dbt")
          .update("dbtIntegration", "fusion", ConfigurationTarget.Workspace);
        break;
      case SELECT_INTERPRETER:
        commands.executeCommand("python.setInterpreter");
        break;
      case INSTALL_DBT_CORE:
        commands.executeCommand("dbtPowerUser.installDbt");
        break;
      case OPEN_PROFILES:
        if (held.profileProblem?.profilesFile) {
          await window.showTextDocument(
            Uri.file(held.profileProblem.profilesFile),
          );
        }
        break;
      case OPEN_PROJECT_FILE:
        if (held.profileProblem) {
          await window.showTextDocument(
            Uri.file(
              path.join(held.profileProblem.projectRoot, DBT_PROJECT_FILE),
            ),
          );
        }
        break;
      case OPEN_SETTINGS:
        commands.executeCommand(
          "workbench.action.openSettings",
          terminalEnvSetting(),
        );
        break;
    }
  }
}

/**
 * Why a held window was not switched, blocker first, and the buttons that
 * fix it. `coreMissing`: dbt Core mode cannot start either (dbt-core is not
 * detected), so the message also offers to install it where that helps.
 */
function heldMessage(
  held: SwitchHeld,
  coreMissing: boolean,
): { text: string; actions: string[] } {
  const fusion = `dbt Fusion ${held.binary.version.join(".")} (${held.binary.path})`;
  const lead = (subject: string, blocker: string) =>
    `Power User didn't switch ${subject} to ${fusion}: ${blocker}.`;
  const needs = CORE_MODE_NEEDS[held.dbtCoreCheck];
  const withNeeds = (text: string) => (needs ? `${text} ${needs}` : text);
  const installOr = (...actions: string[]) =>
    coreMissing ? [INSTALL_DBT_CORE, ...actions] : actions;
  switch (held.reason) {
    case "dbtCore":
      return {
        text: lead(
          "this window",
          "the selected interpreter has dbt-core, so the window keeps dbt Core mode",
        ),
        actions: [USE_FUSION],
      };
    case "adapterUnsupported":
      return {
        text: withNeeds(
          lead(
            "this window",
            held.unsupportedAdapters.length > 0
              ? adaptersPhrase(held.unsupportedAdapters, "does not support")
              : "the dbt profile uses an adapter dbt Fusion does not support",
          ),
        ),
        actions: installOr(USE_FUSION),
      };
    case "dbtLoom":
      return {
        text: withNeeds(
          lead(
            "this window",
            "a dbt-loom config is present, which only dbt Core mode reads",
          ),
        ),
        actions: installOr(USE_FUSION),
      };
    case "adapterExperimental": {
      const types = held.experimentalAdapters;
      const blocker =
        types.length > 1
          ? `the dbt profile targets use the ${listed(types)} adapters, which dbt Fusion runs only as experimental adapters`
          : `the dbt profile uses the ${listed(types)} adapter, which dbt Fusion runs only as an experimental adapter`;
      return {
        text: withNeeds(
          `${lead("this window", blocker)} To use dbt Fusion with it, add ${ALLOW_EXPERIMENTAL_ADAPTERS}=true to ${terminalEnvSetting()}, then reload the window.`,
        ),
        actions: [OPEN_SETTINGS, USE_FUSION],
      };
    }
    case "profileNotFound":
      return profileMessage(held, lead, installOr);
    case "dbtCoreUnknown":
      return {
        text: lead(
          "this window",
          "dbt-core could not be checked in the selected interpreter",
        ),
        actions: [SELECT_INTERPRETER, USE_FUSION],
      };
  }
}

function profileMessage(
  held: SwitchHeld,
  lead: (subject: string, blocker: string) => string,
  installOr: (...actions: string[]) => string[],
): { text: string; actions: string[] } {
  const problem = held.profileProblem;
  if (!problem) {
    return {
      text: lead("this window", "a project's dbt profile is missing"),
      actions: installOr(USE_FUSION),
    };
  }
  const project = path.basename(problem.projectRoot);
  const bothNeed = "dbt Fusion and dbt Core both need";
  switch (problem.check) {
    case "noProfileName":
      return {
        text: `${lead(project, "its dbt_project.yml names no profile")} ${bothNeed} one: add a profile: line, then reload the window.`,
        actions: [OPEN_PROJECT_FILE, USE_FUSION],
      };
    case "noProfilesFile": {
      const searched = problem.searched ?? [];
      const blocker =
        searched.length === 0
          ? "DBT_PROFILES_DIR is set but empty"
          : searched.length === 1
            ? `no profiles.yml in DBT_PROFILES_DIR (${searched[0]})`
            : `no profiles.yml found (looked in ${listed(searched)})`;
      return {
        text: `${lead(project, blocker)} ${bothNeed} it: add the profile, then reload the window.`,
        actions: installOr(USE_FUSION),
      };
    }
    case "profileMissing":
      return {
        text: `${lead(project, `profile '${problem.profile}' is not in ${problem.profilesFile}`)} ${bothNeed} it: add it, then reload the window.`,
        actions: [OPEN_PROFILES, USE_FUSION],
      };
    case "targetMissing": {
      const target = problem.target
        ? `target '${problem.target}'`
        : "the target dbt selects";
      return {
        text: `${lead(project, `${target} is not in profile '${problem.profile}' (${problem.profilesFile})`)} Add it or select another target, then reload the window.`,
        actions: [OPEN_PROFILES, USE_FUSION],
      };
    }
  }
}
