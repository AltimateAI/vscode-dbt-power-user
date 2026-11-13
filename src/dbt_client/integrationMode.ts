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

/** Modes a dbt 2.x binary is routed away from when the setting is left at its default. */
const AUTO_SWITCHABLE = ["core", "corecommand"];

/** What `IntegrationModeService` found before deciding the mode. */
export interface DbtIntegrationFacts {
  /** A dbt 2.x binary is on the project's path. */
  dbtV2Found: boolean;
  /** dbt-core imports in the selected Python interpreter. */
  pythonDbtCore: boolean;
  /** A dbt-loom config is present, which only dbt Core mode reads. */
  dbtLoom: boolean;
}

/** Why a dbt 2.x binary did not switch the window to dbt Fusion. */
export type SwitchHeldReason = "dbtCore" | "dbtLoom";

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
  if (facts.pythonDbtCore || facts.dbtLoom) {
    return {
      mode: configured.value,
      autoSwitched: false,
      heldBack: facts.pythonDbtCore ? "dbtCore" : "dbtLoom",
    };
  }
  return { mode: "fusion", autoSwitched: true };
}
