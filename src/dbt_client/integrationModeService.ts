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
import { existsSync, readFileSync, statSync } from "fs";
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
  FusionTrialOutcome,
  FusionTrialResult,
  runFusionTrial,
} from "./fusionTrial";
import {
  ALLOW_EXPERIMENTAL_ADAPTERS,
  DBT_CORE_RECENT_MS,
  DbtCoreCheck,
  DbtIntegrationFacts,
  decideDbtIntegrationMode,
  experimentalAdaptersAllowed,
  FusionAdapterCheck,
  fusionAdapterSupport,
  getDbtIntegrationMode,
  projectAdapterCheck,
  pythonDbtCoreFromCheck,
  readConfiguredDbtIntegration,
  setEffectiveDbtIntegrationMode,
  SWITCH_GATE,
  SwitchGate,
  SwitchHeldReason,
  windowAdapterCheck,
} from "./integrationMode";
import {
  HeldNote,
  isInterpreterPath,
  PythonEnvironment,
} from "./pythonEnvironment";

/** workspaceState key: the project roots already told about the switch. */
export const AUTO_SWITCH_NOTIFIED_KEY = "dbtPowerUser.fusionAutoSwitchNotified";
/** workspaceState key: the workspace was told why it was not switched. */
export const SWITCH_HELD_NOTIFIED_KEY = "dbtPowerUser.fusionSwitchHeldNotified";
/** workspaceState key: the workspace was offered dbt Core after dbt Fusion
 * could not parse a project in an automatically switched window. */
export const PARSE_FAILED_OFFERED_KEY =
  "dbtPowerUser.fusionAutoSwitchParseFailedOffered";
/** globalState key: when a dbt Core mode window last read dbt 1.x on this machine. */
export const DBT_CORE_WORKED_KEY = "dbtPowerUser.dbtCoreWorkedAt";
/** workspaceState key: the last trial parse of a dbt Fusion binary (`RememberedTrial`). */
export const FUSION_TRIAL_KEY = "dbtPowerUser.fusionTrial";
/** A failed trial is tried again after a day: the project or setup may be fixed. */
const FAILED_TRIAL_RETRY_MS = 24 * 60 * 60 * 1000;
/** `dbtCoreWorked` writes at most once an hour. */
const DBT_CORE_WORKED_EVERY_MS = 60 * 60 * 1000;

const OPEN_SETTINGS = "Open setting";
const USE_FUSION = "Use dbt Fusion";
const DISMISS = "Dismiss";
const SELECT_INTERPRETER = "Select interpreter";
const INSTALL_DBT_CORE = "Install dbt Core";
const OPEN_PROFILES = "Open profiles.yml";
const OPEN_PROJECT_FILE = "Open dbt_project.yml";
const SWITCH_BACK = "Switch back to dbt Core";
const KEEP_FUSION = "Keep dbt Fusion";
const RELOAD_WITH_FUSION = "Reload with dbt Fusion";
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
  fusionOffered: "Power User doesn't switch to dbt Fusion on its own",
  dbtCoreRecent: "dbt Core worked on this machine in the last 7 days",
  fusionTrialFailed: "it failed its trial parse of the window's projects",
  fusionTrial: "it hasn't parsed the window's projects in a trial yet",
};
/**
 * Holds told nothing where dbt Core mode works: the window runs as the user
 * set it up. Where it can't start, `notifyHeldWithoutDbtCore` says why.
 */
const QUIET_WHERE_CORE_WORKS = new Set<SwitchHeldReason>([
  "dbtCoreRecent",
  "fusionOffered",
  "fusionTrialFailed",
  "fusionTrial",
]);
/**
 * Holds that say nothing against dbt Fusion in this window: without a usable
 * Python, the Python error offers dbt Fusion for them. Every other hold says
 * dbt Fusion would fail as well (its adapter, profile, dbt-loom config or
 * trial), or that dbt Core worked here recently, so the Python error gives
 * the hold's reason instead.
 */
const FUSION_WITHOUT_PYTHON = new Set<SwitchHeldReason>([
  "fusionOffered",
  "dbtCoreUnknown",
  "fusionTrial",
]);
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

/** Each `{{ env_var('NAME') }}` or `{{ env_var('NAME', 'default') }}` in a value. */
const ENV_VAR_CALL =
  /\{\{\s*env_var\(\s*(['"])([^'"]+)\1\s*(?:,\s*(['"])([^'"]*)\3\s*)?\)\s*\}\}/g;

/**
 * `value` with its `env_var` calls rendered as dbt renders them; undefined
 * when one names a variable that is not set and has no default.
 */
function renderEnvVars(
  value: string,
  env: EnvironmentVariables,
): string | undefined {
  let unset = false;
  const rendered = value.replace(
    ENV_VAR_CALL,
    (_call, _quote, name: string, _quote2, fallback: string | undefined) => {
      const resolved = env[name] !== undefined ? env[name] : fallback;
      unset ||= resolved === undefined;
      return resolved ?? "";
    },
  );
  return unset ? undefined : rendered;
}

/** Jinja dbt renders before it reads a value: an expression, a statement or a comment. */
const isTemplated = (value: string) => /\{[{%#]/.test(value);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * The target dbt selects for a profile, when it can be told without dbt:
 * `DBT_TARGET`, else the profile's `target:` when it is a plain name or a
 * single `env_var` call (resolved as `resolveProfileTargets` resolves it).
 * Undefined for any other template, which only dbt can render.
 */
function selectedTarget(
  profile: Record<string, unknown>,
  env: EnvironmentVariables,
): string | undefined {
  // Set to something other than a string (null in terminal.integrated.env):
  // only dbt can tell what it selects.
  const dbtTarget: unknown = env.DBT_TARGET;
  if (dbtTarget !== undefined) {
    return typeof dbtTarget === "string" ? dbtTarget : undefined;
  }
  const target = profile.target;
  if (typeof target !== "string") {
    return undefined;
  }
  if (!isTemplated(target)) {
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

/** A hold's own telemetry properties: what was missing, what showed dbt Core worked, the trial. */
function heldDetails(held: SwitchHeld): Record<string, string> {
  return {
    ...(held.profileProblem ? { profileCheck: held.profileProblem.check } : {}),
    ...(held.dbtCoreEvidence
      ? { dbtCoreEvidence: held.dbtCoreEvidence.source }
      : {}),
    ...(held.trial ? { trialOutcome: held.trial.outcome } : {}),
  };
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

/** What shows that dbt Core worked recently, for a "dbtCoreRecent" hold. */
export interface DbtCoreEvidence {
  /** A dbt Core mode window's record, or dbt Core's own partial parse file. */
  source: "record" | "partialParse";
  ageMs: number;
  /** The project whose partial parse file it is. */
  project?: string;
}

/** What `resolve` found about a window with a dbt 2.x binary. */
interface SwitchFindings {
  binary: DbtV2Binary;
  dbtCoreCheck: DbtCoreCheck;
  adapters: AdapterFindings;
  adapterTypes: string;
  dbtCoreEvidence?: DbtCoreEvidence;
  remembered?: RememberedTrial;
  projectRoots: string[];
  env: EnvironmentVariables;
}

/** A trial parse of one dbt Fusion binary, remembered per workspace. */
export interface RememberedTrial {
  path: string;
  version: string;
  outcome: FusionTrialOutcome;
  at: number;
  /** The names of the projects tried, in order. */
  projects: string[];
  /** The project that did not parse, and dbt Fusion's first error there. */
  failedProject?: string;
  firstError?: string;
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
  /** For "dbtCoreRecent". */
  dbtCoreEvidence?: DbtCoreEvidence;
  /** The trial's result, for "fusionTrialFailed" and a finished "fusionTrial". */
  trial?: RememberedTrial;
}

/** How the user answered a hold message, for telemetry. */
type SwitchHeldAnswer =
  | "useFusion"
  | "selectInterpreter"
  | "installDbtCore"
  | "openFile"
  | "openSetting"
  | "fixPython"
  | "reloadWithFusion"
  | "dismissed";

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
  runTrial: typeof runFusionTrial;
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
 * offers dbt Core once when dbt Fusion cannot parse a project. A window
 * switches only through its gate (`SWITCH_GATE`): with "trial", to a dbt
 * Fusion that parsed its projects in a background trial run while the window
 * keeps dbt Core mode; with "paused", never. Where dbt Core mode cannot start,
 * the window is offered dbt Fusion, with the trial's result.
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
  /** An error told this window why it was held: the hold's or a Python error. */
  private heldErrorShown = false;
  /**
   * Counts the errors that told this window why it was held. A trial's
   * result waits to be shown, and is dropped when a later error came after
   * it: a Python error, or a later detection's, which shows it instead.
   */
  private heldErrors = 0;
  private globalState?: Memento;
  /** The trial parse running in this window, for a "fusionTrial" hold. */
  private trial?: {
    controller: AbortController;
    done: Promise<RememberedTrial | undefined>;
  };

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
    private probes: IntegrationModeProbes = {
      findBinary: findDbtV2Binary,
      probeDbtCore: probePythonDbtCore,
      findProjectFiles,
      runTrial: runFusionTrial,
    },
    private probeTimeoutMs = DBT_CORE_PROBE_TIMEOUT_MS,
    /** "none": a window nothing holds switches without a trial. */
    private switchGate: SwitchGate | "none" = SWITCH_GATE,
  ) {}

  get autoSwitched(): AutoSwitch | undefined {
    return this.autoSwitch;
  }

  async resolve(
    workspaceState: Memento,
    globalState?: Memento,
  ): Promise<string> {
    this.workspaceState = workspaceState;
    this.globalState = globalState;
    let configured = readConfiguredDbtIntegration();
    let binary: DbtV2Binary | undefined;
    let dbtCoreCheck: DbtCoreCheck = "noInterpreter";
    let dbtLoom = false;
    let projectRoots: string[] = [];
    let env: EnvironmentVariables = {};
    let dbtCoreEvidence: DbtCoreEvidence | undefined;
    let remembered: RememberedTrial | undefined;
    let adapters: AdapterFindings = {
      check: "noProjects",
      types: [],
      unsupported: [],
      experimental: [],
    };
    if (!configured.explicit) {
      await this.pythonEnvironment.initialize();
      env = this.pythonEnvironment.getEnvironmentVariables();
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
        projectRoots = await this.listProjectRoots();
        dbtLoom =
          Boolean(env.DBT_LOOM_CONFIG_PATH) ||
          this.dbtLoomConfigured(projectRoots);
        adapters = this.checkAdapters(projectRoots, env, binary.version);
        dbtCoreEvidence = this.dbtCoreRecently(projectRoots, env);
        remembered = this.rememberedTrial(binary);
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
        dbtCoreRecent: dbtCoreEvidence !== undefined,
        fusionGate: this.fusionGate(remembered),
      },
    );
    setEffectiveDbtIntegrationMode(mode);
    if (binary) {
      const found: SwitchFindings = {
        binary,
        dbtCoreCheck,
        adapters,
        // Adapter names as telemetry sees them; anything else a profile holds is "other".
        adapterTypes: adapters.types
          .map((type) => (ADAPTER_NAME.test(type) ? type : "other"))
          .join(","),
        dbtCoreEvidence,
        remembered,
        projectRoots,
        env,
      };
      if (heldBack) {
        this.hold(heldBack, mode, found);
      }
      if (autoSwitched) {
        this.switched(configured.value, mode, found);
      }
    }
    return mode;
  }

  /** Keeps the window's mode for `reason`: logs, counts, and starts the trial. */
  private hold(
    reason: SwitchHeldReason,
    mode: string,
    found: SwitchFindings,
  ): void {
    const { binary, dbtCoreCheck, adapters, dbtCoreEvidence, remembered } =
      found;
    this.switchHeld = {
      reason,
      binary,
      dbtCoreCheck,
      fusionAdapterCheck: adapters.check,
      unsupportedAdapters: adapters.unsupported,
      experimentalAdapters: adapters.experimental,
      profileProblem:
        reason === "profileNotFound" ? adapters.profileProblem : undefined,
      dbtCoreEvidence: reason === "dbtCoreRecent" ? dbtCoreEvidence : undefined,
      trial: reason === "fusionTrialFailed" ? remembered : undefined,
    };
    this.terminal.info(
      "dbtIntegrationSwitchHeld",
      `${binary.path} is dbt ${binary.version.join(".")}, but ${heldCause(reason, adapters)}: keeping ${mode} (dbt-core check: ${dbtCoreCheck}, adapter check: ${adapters.check})`,
      false,
    );
    this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeld", {
      reason,
      binaryVersion: binary.version.join("."),
      binaryLocation: binary.location,
      dbtCoreCheck,
      fusionAdapterCheck: adapters.check,
      adapterTypes: found.adapterTypes,
      ...heldDetails(this.switchHeld),
    });
    if (reason === "fusionTrial" && found.projectRoots.length > 0) {
      this.startTrial(binary, found.projectRoots, found.env, dbtCoreCheck);
    }
  }

  /** Switches the window to dbt Fusion: logs, counts and tags telemetry. */
  private switched(from: string, mode: string, found: SwitchFindings): void {
    const { binary, dbtCoreCheck, adapters } = found;
    this.autoSwitch = {
      from,
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
      from,
      to: mode,
      binaryVersion: binary.version.join("."),
      binaryLocation: binary.location,
      dbtCoreCheck,
      fusionAdapterCheck: adapters.check,
      adapterTypes: found.adapterTypes,
      trial: found.remembered?.outcome === "parsed" ? "parsed" : "none",
    });
  }

  /**
   * Whether dbt Core worked on this machine within `DBT_CORE_RECENT_MS`: a
   * dbt Core mode window's record (`dbtCoreWorked`), else the partial parse
   * file dbt Core writes in a project's target path (dbt Fusion doesn't).
   */
  private dbtCoreRecently(
    projectRoots: string[],
    env: EnvironmentVariables,
  ): DbtCoreEvidence | undefined {
    const now = Date.now();
    const recent = (at: number) => Math.abs(now - at) <= DBT_CORE_RECENT_MS;
    const recorded = this.globalState?.get<unknown>(DBT_CORE_WORKED_KEY);
    if (typeof recorded === "number" && recent(recorded)) {
      return { source: "record", ageMs: now - recorded };
    }
    for (const root of projectRoots) {
      const file = path.join(
        this.targetPath(root, this.projectEnvironment(root, env)),
        "partial_parse.msgpack",
      );
      try {
        const { mtimeMs } = statSync(file);
        if (recent(mtimeMs)) {
          return {
            source: "partialParse",
            ageMs: now - mtimeMs,
            project: path.basename(root),
          };
        }
      } catch {
        // No partial parse file: dbt Core hasn't parsed this project here.
      }
    }
    return undefined;
  }

  /**
   * A project's target path as dbt Core resolves it: `DBT_TARGET_PATH`, else
   * dbt_project.yml's `target-path` with its `env_var` calls rendered, else
   * `target` (for any other template, which only dbt can render).
   */
  private targetPath(projectRoot: string, env: EnvironmentVariables): string {
    let target: unknown = env.DBT_TARGET_PATH;
    if (typeof target !== "string" || target === "") {
      try {
        const config: unknown = readAndParseProjectConfig(projectRoot);
        target = isRecord(config) ? config["target-path"] : undefined;
      } catch {
        target = undefined;
      }
      if (typeof target === "string") {
        target = renderEnvVars(target, env);
      }
    }
    return path.resolve(
      projectRoot,
      typeof target === "string" && target !== "" && !isTemplated(target)
        ? target
        : "target",
    );
  }

  /** The workspace's last trial of this binary, when it is the same binary and version. */
  private rememberedTrial(binary: DbtV2Binary): RememberedTrial | undefined {
    const trial = this.workspaceState?.get<RememberedTrial>(FUSION_TRIAL_KEY);
    return trial?.path === binary.path &&
      trial.version === binary.version.join(".")
      ? trial
      : undefined;
  }

  private fusionGate(
    remembered: RememberedTrial | undefined,
  ): DbtIntegrationFacts["fusionGate"] {
    switch (this.switchGate) {
      case "none":
        return undefined;
      case "paused":
        return "paused";
      case "trial":
        if (remembered?.outcome === "parsed") {
          return "trialPassed";
        }
        return remembered && Date.now() - remembered.at < FAILED_TRIAL_RETRY_MS
          ? "trialFailed"
          : "notTried";
    }
  }

  /**
   * Runs dbt Fusion's parse on the window's projects in the background,
   * without writing into them, and remembers the result for this binary:
   * the next window switches only if it parsed. Canceled when dbt Core
   * works in this window.
   */
  private startTrial(
    binary: DbtV2Binary,
    projectRoots: string[],
    env: EnvironmentVariables,
    dbtCoreCheck: DbtCoreCheck,
  ): void {
    const controller = new AbortController();
    const version = binary.version.join(".");
    const done = this.probes
      .runTrial({
        binary: binary.path,
        projectRoots,
        envFor: (root) => this.projectEnvironment(root, env),
        signal: controller.signal,
      })
      .then(async (result: FusionTrialResult) => {
        // dbt Core working in this window cancels the trial, even one whose
        // parse had already finished: nothing is remembered or shown then.
        const outcome = controller.signal.aborted ? "canceled" : result.outcome;
        const failed = result.failed;
        this.terminal.info(
          "dbtIntegrationFusionTrial",
          `Trial parse of ${projectRoots.length} project(s) with ${binary.path} (dbt ${version}): ${outcome}` +
            (failed?.firstError
              ? ` in ${path.basename(failed.root)}: ${failed.firstError}`
              : ""),
          false,
        );
        this.telemetry.sendTelemetryEvent(
          "dbtIntegrationFusionTrial",
          {
            outcome,
            binaryVersion: version,
            binaryLocation: binary.location,
            dbtCoreCheck,
            ...(failed?.firstErrorCode
              ? { firstErrorCode: failed.firstErrorCode }
              : {}),
          },
          {
            durationMs: result.durationMs,
            errorCount: failed?.errorCount ?? 0,
            projects: projectRoots.length,
          },
        );
        if (outcome === "canceled") {
          return undefined;
        }
        const trial: RememberedTrial = {
          path: binary.path,
          version,
          outcome,
          at: Date.now(),
          projects: projectRoots.map((root) => path.basename(root)),
          failedProject: failed ? path.basename(failed.root) : undefined,
          firstError: failed?.firstError,
        };
        await this.workspaceState?.update(FUSION_TRIAL_KEY, trial);
        return trial;
      })
      .catch((error) => {
        this.telemetry.sendTelemetryError(
          "dbtIntegrationFusionTrialError",
          error,
        );
        return undefined;
      });
    this.trial = { controller, done };
  }

  /**
   * A dbt Core mode window read dbt 1.x: remembers it for the machine, so
   * other windows aren't switched for `DBT_CORE_RECENT_MS`, and stops this
   * window's trial, which dbt Core working makes moot.
   */
  async dbtCoreWorked(): Promise<void> {
    this.trial?.controller.abort();
    const last = this.globalState?.get<unknown>(DBT_CORE_WORKED_KEY);
    const now = Date.now();
    if (
      typeof last === "number" &&
      now - last >= 0 &&
      now - last < DBT_CORE_WORKED_EVERY_MS
    ) {
      return;
    }
    await this.globalState?.update(DBT_CORE_WORKED_KEY, now);
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
    const checks: FusionAdapterCheck[] = [];
    const types = new Set<string>();
    const unsupported = new Set<string>();
    const experimental = new Set<string>();
    let profileProblem: ProfileProblem | undefined;
    for (const root of projectRoots) {
      // dbt runs each project with its own workspace folder's environment.
      const projectEnv = this.projectEnvironment(root, env);
      const allowExperimental = experimentalAdaptersAllowed(projectEnv);
      const { types: candidates, problem } = this.profileAdapterTypes(
        root,
        projectEnv,
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
   * The environment dbt runs a project with: its workspace folder's (that
   * folder's `.env`), as `DBTProject` reads `DBT_PROFILES_DIR`; the window's
   * when the project is in no folder.
   */
  private projectEnvironment(
    projectRoot: string,
    windowEnv: EnvironmentVariables,
  ): EnvironmentVariables {
    const folder = workspace.getWorkspaceFolder(Uri.file(projectRoot));
    if (!folder) {
      return windowEnv;
    }
    try {
      return this.pythonEnvironment.getEnvironmentVariables(folder);
    } catch {
      return windowEnv;
    }
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
      if (typeof profileName !== "string" || isTemplated(profileName)) {
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
      // The profile as its own key: a name like `__proto__` isn't a profile.
      const document: unknown = parseYaml(profilesYaml);
      const ownProfile =
        isRecord(document) &&
        Object.prototype.hasOwnProperty.call(document, profileName)
          ? document[profileName]
          : undefined;
      const profile = resolveProfileTargets(profilesYaml, profileName, env);
      if (!isRecord(ownProfile) || profile.unresolved === "no-profile") {
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
      // Held only for a target we can name: any other template is dbt's to render.
      const target = selectedTarget(ownProfile, env);
      if (profile.unresolved === "unknown-target" && target !== undefined) {
        return {
          types,
          problem: {
            check: "targetMissing",
            projectRoot,
            profilesFile,
            profile: profileName,
            target,
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
    if (errorCount === 0) {
      return;
    }
    // The trial this switch rested on no longer holds: the next window tries
    // dbt Fusion again before switching.
    if (this.workspaceState.get(FUSION_TRIAL_KEY) !== undefined) {
      await this.workspaceState.update(FUSION_TRIAL_KEY, undefined);
    }
    if (this.workspaceState.get<boolean>(PARSE_FAILED_OFFERED_KEY, false)) {
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
   * with a way to dbt Fusion. No-op unless the switch was held back, and
   * after `notifyHeldWithoutDbtCore` told this window already. A window held
   * only because the switch is paused hears nothing here: dbt Core mode
   * works or, when it can't start, `notifyHeldWithoutDbtCore` offers dbt
   * Fusion.
   */
  async notifySwitchHeld(): Promise<void> {
    const held = this.switchHeld;
    if (
      !held ||
      QUIET_WHERE_CORE_WORKS.has(held.reason) ||
      this.heldErrorShown ||
      !this.workspaceState ||
      this.workspaceState.get<boolean>(SWITCH_HELD_NOTIFIED_KEY, false)
    ) {
      return;
    }
    await this.workspaceState.update(SWITCH_HELD_NOTIFIED_KEY, true);
    // A detection during that write may have shown the hold as its error.
    if (this.heldErrorShown) {
      return;
    }
    const { text, actions } = heldMessage(held, "notice");
    const answer = await answerTo(
      window.showInformationMessage(text, ...actions, DISMISS),
    );
    if (answer === CANCELED) {
      return;
    }
    await this.answerHeld(held, answer, "notice");
  }

  /**
   * In a held window without a usable Python (no Python extension, no
   * interpreter, or one that no longer exists), what the Python error adds
   * next to its own fix, in place of Install dbt Core, which needs an
   * interpreter: dbt Fusion, which runs without Python, where nothing speaks
   * against it, and otherwise the hold's reason. Undefined, adding nothing,
   * when the window was not held or was held for having dbt-core. The
   * Python error stands for the hold's message, so no notice follows it.
   */
  heldWithoutPython(): HeldNote | undefined {
    const held = this.switchHeld;
    if (!held || held.reason === "dbtCore") {
      return undefined;
    }
    this.heldErrorShown = true;
    this.heldErrors++;
    return {
      ...(FUSION_WITHOUT_PYTHON.has(held.reason)
        ? { fusion: fusionLabel(held.binary) }
        : { reason: heldMessage(held, "pythonError").text }),
      answered: async (answer) => {
        if (answer === "useFusion") {
          await this.answerHeld(held, USE_FUSION, "pythonError");
          return;
        }
        this.telemetry.sendTelemetryEvent("dbtIntegrationSwitchHeldAnswer", {
          reason: held.reason,
          answer,
          shownAs: "pythonError",
          binaryVersion: held.binary.version.join("."),
        });
      },
    };
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
    const shown = ++this.heldErrors;
    const trial = held.reason === "fusionTrial" ? this.trial : undefined;
    if (trial) {
      // The trial can take minutes: this error is claimed now and shown with
      // its result. A canceled trial means dbt Core works after all.
      void trial.done
        .then((result) =>
          // dbt Core may have started working while the result was saved,
          // or a later error told the window already.
          result &&
          !trial.controller.signal.aborted &&
          shown === this.heldErrors
            ? this.showHeld({ ...held, trial: result })
            : undefined,
        )
        .catch((error) =>
          this.telemetry.sendTelemetryError(
            "dbtIntegrationFusionTrialNoticeError",
            error,
          ),
        );
      return true;
    }
    await this.showHeld(held);
    return true;
  }

  /** Shows a held window's message where dbt Core mode cannot start. */
  private async showHeld(held: SwitchHeld): Promise<void> {
    const { text, actions, info } = heldMessage(held, "error");
    const answer = await answerTo(
      info
        ? window.showInformationMessage(text, ...actions)
        : window.showErrorMessage(text, ...actions),
    );
    if (answer !== CANCELED) {
      await this.answerHeld(held, answer, "error");
    }
  }

  private async answerHeld(
    held: SwitchHeld,
    choice: string | undefined,
    shownAs: "notice" | "error" | "pythonError",
  ): Promise<void> {
    const answers: Record<string, SwitchHeldAnswer> = {
      [USE_FUSION]: "useFusion",
      [SELECT_INTERPRETER]: "selectInterpreter",
      [INSTALL_DBT_CORE]: "installDbtCore",
      [OPEN_PROFILES]: "openFile",
      [OPEN_PROJECT_FILE]: "openFile",
      [OPEN_SETTINGS]: "openSetting",
      [RELOAD_WITH_FUSION]: "reloadWithFusion",
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
      case RELOAD_WITH_FUSION:
        // The trial passed and is remembered: the reloaded window switches.
        commands.executeCommand("workbench.action.reloadWindow");
        break;
    }
  }
}

/** "dbt Fusion 2.0.12 (/home/me/.local/bin/dbt)" */
function fusionLabel(binary: DbtV2Binary): string {
  return `dbt Fusion ${binary.version.join(".")} (${binary.path})`;
}

/**
 * Why a held window was not switched, blocker first, and the buttons that
 * fix it, shown as:
 * - `notice`: dbt Core mode works;
 * - `error`: dbt Core mode cannot start either (dbt-core is not detected),
 *   so the message also offers to install it where that helps;
 * - `pythonError`: the reason alone, after a Python error that says what
 *   dbt Core mode needs. Its actions are not shown.
 */
function heldMessage(
  held: SwitchHeld,
  shownAs: "notice" | "error" | "pythonError",
): { text: string; actions: string[]; info?: boolean } {
  const coreMissing = shownAs === "error";
  const fusion = fusionLabel(held.binary);
  const lead = (subject: string, blocker: string) =>
    `Power User didn't switch ${subject} to ${fusion}: ${blocker}.`;
  const needs =
    shownAs === "pythonError" ? undefined : CORE_MODE_NEEDS[held.dbtCoreCheck];
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
        actions: installOr(OPEN_SETTINGS, USE_FUSION),
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
    case "fusionOffered":
      return offerFusion();
    case "dbtCoreRecent": {
      const evidence = held.dbtCoreEvidence;
      const blocker =
        evidence?.source === "partialParse" && evidence.project
          ? `dbt Core parsed ${evidence.project} in the last 7 days`
          : "dbt Core ran on this machine in the last 7 days";
      return {
        text: withNeeds(
          lead("this window", `${blocker}, so the window keeps dbt Core mode`),
        ),
        actions: coreMissing
          ? [SELECT_INTERPRETER, INSTALL_DBT_CORE, USE_FUSION]
          : [USE_FUSION],
      };
    }
    case "fusionTrial":
    case "fusionTrialFailed":
      return held.trial
        ? trialMessage(held.trial, fusion, withNeeds, installOr, shownAs)
        : offerFusion();
  }

  function offerFusion() {
    return {
      text: `${withNeeds(`${fusion} is on your path.`)} Install dbt Core, or use dbt Fusion for this workspace.`,
      actions: installOr(USE_FUSION),
    };
  }
}

/** A finished trial's message: Reload where it parsed, its first error where it didn't. */
function trialMessage(
  trial: RememberedTrial,
  fusion: string,
  withNeeds: (text: string) => string,
  installOr: (...actions: string[]) => string[],
  shownAs: "notice" | "error" | "pythonError",
): { text: string; actions: string[]; info?: boolean } {
  if (trial.outcome === "parsed") {
    return {
      text: `${withNeeds(`${fusion} parsed ${projectsPhrase(trial.projects)}.`)} Reload the window to use dbt Fusion.`,
      actions: [RELOAD_WITH_FUSION, INSTALL_DBT_CORE],
      info: true,
    };
  }
  const blocker = withNeeds(
    `${fusion} is on your path, but ${trialBlocker(trial)}.`,
  );
  return {
    text:
      shownAs === "pythonError"
        ? blocker
        : `${blocker} Install dbt Core, or use dbt Fusion anyway.`,
    actions: installOr(USE_FUSION),
  };
}

/** "jaffle_shop", "a and b", or "4 dbt projects". */
function projectsPhrase(projects: string[]): string {
  return projects.length > 3
    ? `${projects.length} dbt projects`
    : listed(projects);
}

/** Why a trial didn't pass, after "dbt Fusion … is on your path, but". */
function trialBlocker(trial: RememberedTrial): string {
  const project = trial.failedProject ?? projectsPhrase(trial.projects);
  switch (trial.outcome) {
    case "parseErrors":
      return trial.firstError
        ? `it couldn't parse ${project}: ${trial.firstError.trim().replace(/\.+$/, "")}`
        : `it couldn't parse ${project}`;
    case "timeout":
      return `its parse of ${project} didn't finish in time`;
    case "unsupportedFlags":
      return "this build is too old for Power User to try it on your projects (update it with dbt system update)";
    case "packagesMissing":
      // A failed install says why; without an error, a local package kept it
      // from being tried outside the project.
      return trial.firstError
        ? `Power User couldn't install ${project}'s dbt packages to try it: ${trial.firstError.trim().replace(/\.+$/, "")}`
        : `Power User couldn't try it on ${project}, which uses a local dbt package`;
    default:
      return "it couldn't be started";
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
