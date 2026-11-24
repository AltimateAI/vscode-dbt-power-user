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
 * - "unsupported": no dbt Fusion is known to accept it.
 */
export type FusionAdapterSupport = "supported" | "unconfirmed" | "unsupported";

export function fusionAdapterSupport(
  type: string,
  version: readonly number[],
): FusionAdapterSupport {
  if (!Object.prototype.hasOwnProperty.call(FUSION_ADAPTERS, type)) {
    return "unsupported";
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
 * - "unknown": a project's adapter could not be read, or its candidates
 *   disagree; no project is unsupported.
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
): FusionAdapterCheck {
  const verdicts = types.map((type) =>
    type === undefined ? "unknown" : fusionAdapterSupport(type, version),
  );
  if (verdicts.length === 0) {
    return "unknown";
  }
  if (verdicts.every((verdict) => verdict === "unsupported")) {
    return "unsupported";
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
}

/**
 * Why a found dbt 2.x binary did not switch the window: dbt-core imports in
 * the interpreter, a project's adapter is one dbt Fusion does not accept, a
 * dbt-loom config is present, or the dbt-core check could not tell (unknown
 * counts as "may have dbt-core", so the window is held).
 */
export type SwitchHeldReason =
  | "dbtCore"
  | "adapterUnsupported"
  | "dbtLoom"
  | "dbtCoreUnknown";

/**
 * The mode to run in: an explicit setting always; otherwise dbt Fusion when
 * a dbt 2.x binary was found, the project cannot run in dbt Core mode (no
 * dbt-core in the interpreter, no dbt-loom config) and dbt Fusion accepts its
 * adapter, and the default when not. `heldBack` says why a found binary did
 * not switch the window.
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
  const heldBack: SwitchHeldReason | undefined =
    facts.pythonDbtCore === true
      ? "dbtCore"
      : facts.fusionAdapterUnsupported
        ? "adapterUnsupported"
        : facts.dbtLoom
          ? "dbtLoom"
          : facts.pythonDbtCore === "unknown"
            ? "dbtCoreUnknown"
            : undefined;
  if (heldBack) {
    return { mode: configured.value, autoSwitched: false, heldBack };
  }
  return { mode: "fusion", autoSwitched: true };
}
