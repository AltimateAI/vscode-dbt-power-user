import { PythonDbtCoreUnknownReason } from "@altimateai/dbt-integration";
import { workspace } from "vscode";

/**
 * The dbt integration mode this window runs in. It is `dbt.dbtIntegration`
 * unless the window was switched to dbt Fusion automatically at activation
 * (see `IntegrationModeService`); every reader of the mode goes through here.
 */
let effectiveMode: string | undefined;

export function getDbtIntegrationMode(): string {
  return (
    effectiveMode ??
    workspace.getConfiguration("dbt").get<string>("dbtIntegration", "core")
  );
}

export function setEffectiveDbtIntegrationMode(mode: string | undefined): void {
  effectiveMode = mode;
}

export interface ConfiguredDbtIntegration {
  /** The setting's value, the default ("core") included. */
  value: string;
  /** Whether the user set it, at any level, rather than leaving the default. */
  explicit: boolean;
}

/** `dbt.dbtIntegration` and whether it was set explicitly, from `inspect()`. */
export function readConfiguredDbtIntegration(): ConfiguredDbtIntegration {
  const inspected = workspace
    .getConfiguration("dbt")
    .inspect<string>("dbtIntegration");
  const explicitValue =
    inspected?.workspaceFolderValue ??
    inspected?.workspaceValue ??
    inspected?.globalValue ??
    inspected?.workspaceFolderLanguageValue ??
    inspected?.workspaceLanguageValue ??
    inspected?.globalLanguageValue;
  return explicitValue !== undefined
    ? { value: explicitValue, explicit: true }
    : { value: inspected?.defaultValue ?? "core", explicit: false };
}

/**
 * The outcome of the dbt-core check in the selected interpreter:
 * - "importable" / "notInstalled": the check answered.
 * - "noInterpreter": neither the Python extension nor
 *   `dbt.dbtPythonPathOverride` gives one, so dbt Core mode cannot run.
 * - "unresolvedInterpreter": the Python extension has not resolved the
 *   workspace's interpreter yet (an empty path or a bare command such as
 *   `python`), so it was not checked.
 * - the library's other unknown reasons ("spawnError", "timeout", "failed",
 *   "noVersion"): the check ran and could not tell.
 */
export type DbtCoreCheck =
  | "importable"
  | "notInstalled"
  | "unresolvedInterpreter"
  | PythonDbtCoreUnknownReason;

/**
 * `DbtIntegrationFacts.pythonDbtCore` for a check: only "notInstalled" and
 * "noInterpreter" mean the project cannot run in dbt Core mode; any check
 * that could not tell is "unknown", which holds the switch back.
 */
export function pythonDbtCoreFromCheck(
  check: DbtCoreCheck,
): boolean | "unknown" {
  switch (check) {
    case "importable":
      return true;
    case "notInstalled":
    case "noInterpreter":
      return false;
    default:
      return "unknown";
  }
}

/**
 * The adapter types (`outputs.<target>.type` in profiles.yml) dbt Fusion
 * accepts, each with the first version from which every build seen accepts
 * it. Read from dbt Fusion's own error for an unknown type ("unknown variant
 * `x`, expected one of ..."): 2.0.6, 2.0.8, 2.0.9, 2.0.11 and 2.0.12 all list
 * these 14. Builds that report 2.0.0 (pre-releases, suffix dropped) list
 * between 7 and 14 of them; only the 2.0.0 entries are on every such list.
 */
const FUSION_ADAPTERS: Record<string, readonly number[]> = {
  redshift: [2, 0, 0],
  snowflake: [2, 0, 0],
  postgres: [2, 0, 0],
  bigquery: [2, 0, 0],
  trino: [2, 0, 0],
  datafusion: [2, 0, 0],
  databricks: [2, 0, 0],
  salesforce: [2, 0, 6],
  spark: [2, 0, 6],
  duckdb: [2, 0, 6],
  fabric: [2, 0, 6],
  exasol: [2, 0, 6],
  clickhouse: [2, 0, 6],
  lakecompute: [2, 0, 6],
};

/**
 * The adapters dbt Fusion runs without an opt-in, as its own refusal of the
 * others names them (2.0.9 and 2.0.12): "The 'postgres' adapter is not yet
 * supported by dbt. Supported adapters: snowflake, bigquery, databricks,
 * redshift, duckdb, salesforce, clickhouse. To use an experimental adapter,
 * set the environment variable DBT_ALLOW_EXPERIMENTAL_ADAPTERS=true." The
 * rest of `FUSION_ADAPTERS` is experimental.
 */
const FUSION_GA_ADAPTERS = new Set([
  "snowflake",
  "bigquery",
  "databricks",
  "redshift",
  "duckdb",
  "salesforce",
  "clickhouse",
]);

/** The environment variable that lets dbt Fusion run its experimental adapters. */
export const ALLOW_EXPERIMENTAL_ADAPTERS = "DBT_ALLOW_EXPERIMENTAL_ADAPTERS";

/**
 * Whether `DBT_ALLOW_EXPERIMENTAL_ADAPTERS` lets dbt Fusion run an
 * experimental adapter. 2.0.9 and 2.0.12 take "true", "1", "yes" and "on" in
 * any case, and refuse anything else, " true" and "y" included.
 */
export function experimentalAdaptersAllowed(
  env: Record<string, string | undefined>,
): boolean {
  // `terminal.integrated.env` can hold null (unset): only a string counts.
  const value: unknown = env[ALLOW_EXPERIMENTAL_ADAPTERS];
  return (
    typeof value === "string" &&
    ["true", "1", "yes", "on"].includes(value.toLowerCase())
  );
}

function versionAtLeast(
  version: readonly number[],
  minimum: readonly number[],
): boolean {
  for (let i = 0; i < minimum.length; i++) {
    const part = version[i] ?? 0;
    if (part !== minimum[i]) {
      return part > minimum[i];
    }
  }
  return true;
}

/**
 * How dbt Fusion takes one profile adapter type, as written:
 * - "supported": this version accepts it.
 * - "unconfirmed": dbt Fusion accepts it from a later version than this one
 *   is known to be, so this build may or may not.
 * - "experimental": dbt Fusion runs it only with
 *   `DBT_ALLOW_EXPERIMENTAL_ADAPTERS`, which is not set.
 * - "unsupported": no dbt Fusion is known to accept it.
 */
export type FusionAdapterSupport =
  | "supported"
  | "unconfirmed"
  | "experimental"
  | "unsupported";

export function fusionAdapterSupport(
  type: string,
  version: readonly number[],
  allowExperimental = false,
): FusionAdapterSupport {
  if (!Object.prototype.hasOwnProperty.call(FUSION_ADAPTERS, type)) {
    return "unsupported";
  }
  if (!allowExperimental && !FUSION_GA_ADAPTERS.has(type)) {
    return "experimental";
  }
  return versionAtLeast(version, FUSION_ADAPTERS[type])
    ? "supported"
    : "unconfirmed";
}

/**
 * Whether the found dbt Fusion accepts the adapter of a dbt project, or of
 * every project in the window:
 * - "supported": it accepts each adapter.
 * - "unsupported": it accepts none of a project's candidate adapters.
 * - "experimental": it runs a project's candidate adapters only with
 *   `DBT_ALLOW_EXPERIMENTAL_ADAPTERS` (the rest, if any, not at all); no
 *   project is unsupported.
 * - "unknown": a project's adapter could not be read, or its candidates
 *   disagree; no project is unsupported or experimental.
 * - "unconfirmed": each adapter is one dbt Fusion accepts, but some only from
 *   a later version than this one is known to be.
 * - "noProjects": no dbt project was found to read.
 */
export type FusionAdapterCheck =
  | FusionAdapterSupport
  | "unknown"
  | "noProjects";

/**
 * A project's check from its candidate adapter types: the default target's
 * type, or each output's when the default target could not be resolved.
 * `undefined` is an output whose type could not be read.
 */
export function projectAdapterCheck(
  types: (string | undefined)[],
  version: readonly number[],
  allowExperimental = false,
): FusionAdapterCheck {
  const verdicts = types.map((type) =>
    type === undefined
      ? "unknown"
      : fusionAdapterSupport(type, version, allowExperimental),
  );
  if (verdicts.length === 0) {
    return "unknown";
  }
  if (verdicts.every((verdict) => verdict === "unsupported")) {
    return "unsupported";
  }
  // Whichever target dbt picks, dbt Fusion refuses it without the opt-in.
  if (
    verdicts.every(
      (verdict) => verdict === "experimental" || verdict === "unsupported",
    )
  ) {
    return "experimental";
  }
  if (
    verdicts.some(
      (verdict) => verdict !== "supported" && verdict !== "unconfirmed",
    )
  ) {
    return "unknown";
  }
  return verdicts.includes("unconfirmed") ? "unconfirmed" : "supported";
}

const ADAPTER_CHECK_PRECEDENCE: FusionAdapterCheck[] = [
  "unsupported",
  "experimental",
  "unknown",
  "unconfirmed",
  "supported",
];

/** The window's check: its least favourable project's, or "noProjects". */
export function windowAdapterCheck(
  checks: FusionAdapterCheck[],
): FusionAdapterCheck {
  return (
    ADAPTER_CHECK_PRECEDENCE.find((check) => checks.includes(check)) ??
    "noProjects"
  );
}

/** Modes a dbt 2.x binary is routed away from when the setting is left at its default. */
const AUTO_SWITCHABLE = ["core", "corecommand"];

/** What `IntegrationModeService` found before deciding the mode. */
export interface DbtIntegrationFacts {
  /** A dbt 2.x binary is on the project's path. */
  dbtV2Found: boolean;
  /**
   * dbt-core imports in the selected Python interpreter; "unknown" when the
   * check could not tell (see `pythonDbtCoreFromCheck`).
   */
  pythonDbtCore: boolean | "unknown";
  /** A dbt-loom config is present, which only dbt Core mode reads. */
  dbtLoom: boolean;
  /**
   * A dbt project's profile uses an adapter no dbt Fusion is known to accept
   * (`windowAdapterCheck` is "unsupported"). A profile that could not be read,
   * and an adapter only a later dbt Fusion is known to accept, do not count.
   */
  fusionAdapterUnsupported: boolean;
  /**
   * A dbt project's profile uses only adapters dbt Fusion runs with
   * `DBT_ALLOW_EXPERIMENTAL_ADAPTERS`, which is not set (`windowAdapterCheck`
   * is "experimental").
   */
  fusionAdapterExperimental: boolean;
  /**
   * A dbt project's profile is certainly missing where dbt looks for it: no
   * `profile:` in dbt_project.yml, no profiles.yml, the profile not in it, or
   * its target not in the profile. A profile that could not be read (a
   * template, YAML that does not parse) does not count.
   */
  profileNotFound: boolean;
}

/**
 * Why a found dbt 2.x binary did not switch the window: dbt-core imports in
 * the interpreter, a project's adapter is one dbt Fusion does not accept, a
 * dbt-loom config is present, a project's profile is missing, a project's
 * adapters are ones dbt Fusion runs only as experimental, or the dbt-core
 * check could not tell (unknown counts as "may have dbt-core", so the window
 * is held). Checked in this order; the first that applies is the reason.
 */
export type SwitchHeldReason =
  | "dbtCore"
  | "adapterUnsupported"
  | "dbtLoom"
  | "profileNotFound"
  | "adapterExperimental"
  | "dbtCoreUnknown";

/** The hold reasons in the order they are checked; the first that holds is the reason. */
const HOLD_ORDER: [
  SwitchHeldReason,
  (facts: DbtIntegrationFacts) => boolean,
][] = [
  ["dbtCore", (facts) => facts.pythonDbtCore === true],
  ["adapterUnsupported", (facts) => facts.fusionAdapterUnsupported],
  ["dbtLoom", (facts) => facts.dbtLoom],
  ["profileNotFound", (facts) => facts.profileNotFound],
  ["adapterExperimental", (facts) => facts.fusionAdapterExperimental],
  ["dbtCoreUnknown", (facts) => facts.pythonDbtCore === "unknown"],
];

/**
 * The mode to run in: an explicit setting always; otherwise dbt Fusion when
 * a dbt 2.x binary was found, the project cannot run in dbt Core mode (no
 * dbt-core in the interpreter, no dbt-loom config), its profile is where dbt
 * looks and dbt Fusion runs its adapter without an opt-in, and the default
 * when not. `heldBack` says why a found binary did not switch the window.
 * A missing profile comes before an adapter dbt Fusion runs only as
 * experimental and before a dbt-core check that could not tell: it stops both
 * modes. An importable dbt-core, an unsupported adapter and a dbt-loom config
 * come first, as before.
 */
export function decideDbtIntegrationMode(
  configured: ConfiguredDbtIntegration,
  facts: DbtIntegrationFacts,
): { mode: string; autoSwitched: boolean; heldBack?: SwitchHeldReason } {
  if (
    configured.explicit ||
    !facts.dbtV2Found ||
    !AUTO_SWITCHABLE.includes(configured.value)
  ) {
    return { mode: configured.value, autoSwitched: false };
  }
  const heldBack = HOLD_ORDER.find(([, holds]) => holds(facts))?.[0];
  if (heldBack) {
    return { mode: configured.value, autoSwitched: false, heldBack };
  }
  return { mode: "fusion", autoSwitched: true };
}
