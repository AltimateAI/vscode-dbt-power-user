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

/**
 * The mode to run in: an explicit setting always; otherwise dbt Fusion when
 * a dbt 2.x binary was found, and the default when not.
 */
export function decideDbtIntegrationMode(
  configured: ConfiguredDbtIntegration,
  dbtV2Found: boolean,
): { mode: string; autoSwitched: boolean } {
  if (
    !configured.explicit &&
    dbtV2Found &&
    AUTO_SWITCHABLE.includes(configured.value)
  ) {
    return { mode: "fusion", autoSwitched: true };
  }
  return { mode: configured.value, autoSwitched: false };
}
