import { workspace } from "vscode";
import { TelemetryService } from "./telemetry";

// Some features run on Python (a Jupyter kernel, the datapilot package) and
// have no dbt Fusion form. In Fusion mode they say so up front instead of
// failing partway through.

export const CORE_MODE_DOCS_URL =
  "https://docs.myaltimate.com/setup/reqdConfig/?utm_source=dbt-power-user&utm_medium=extension";

export const isFusionMode = (): boolean =>
  workspace.getConfiguration("dbt").get<string>("dbtIntegration", "core") ===
  "fusion";

// Records a blocked attempt on the feature's own event. `dbtIntegrationMode`
// is stamped on every event, so attempts are countable by mode. Telemetry
// must never stop the message from showing.
export const stampBlockedByFusion = (
  telemetry: TelemetryService,
  eventName: string,
): void => {
  try {
    telemetry.sendTelemetryEvent(eventName, { blockedByMode: "fusion" });
  } catch {
    // fail-safe: the user still gets the message
  }
};
