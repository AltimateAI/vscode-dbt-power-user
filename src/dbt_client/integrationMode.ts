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
}

/**
 * Why a found dbt 2.x binary did not switch the window: dbt-core imports in
 * the interpreter, a dbt-loom config is present, or the dbt-core check could
 * not tell (unknown counts as "may have dbt-core", so the window is held).
 */
export type SwitchHeldReason = "dbtCore" | "dbtLoom" | "dbtCoreUnknown";

/**
 * The mode to run in: an explicit setting always; otherwise dbt Fusion when
 * a dbt 2.x binary was found and the project cannot run in dbt Core mode
 * (no dbt-core in the interpreter, no dbt-loom config), and the default when
 * not. `heldBack` says why a found binary did not switch the window.
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
