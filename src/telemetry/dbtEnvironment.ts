import {
  DBT_ENVIRONMENT_UNKNOWN,
  DbtEnvironmentTelemetryProperty,
  FUSION_FAILURE_CLASS_PROPERTY,
  FusionFailureClass,
} from "./events";

export interface DbtVersionLabels {
  full: string;
  minor: string;
}

const UNKNOWN_VERSION: DbtVersionLabels = {
  full: DBT_ENVIRONMENT_UNKNOWN,
  minor: DBT_ENVIRONMENT_UNKNOWN,
};

/**
 * `major.minor.patch` and `major.minor` of a version the integration reports
 * as `number[]`. Anything that is not three non-negative integers, and 0.0.0
 * (what an integration reports when it never read the version), is unknown.
 */
export function dbtVersionLabels(version: unknown): DbtVersionLabels {
  if (!Array.isArray(version) || version.length < 3) {
    return UNKNOWN_VERSION;
  }
  const [major, minor, patch] = version as unknown[];
  const parts = [major, minor, patch];
  if (
    !parts.every(
      (part): part is number =>
        typeof part === "number" && Number.isInteger(part) && part >= 0,
    )
  ) {
    return UNKNOWN_VERSION;
  }
  if (parts.every((part) => part === 0)) {
    return UNKNOWN_VERSION;
  }
  return { full: parts.join("."), minor: `${major}.${minor}` };
}

export function dbtAdapterLabel(adapter: unknown): string {
  if (typeof adapter !== "string") {
    return DBT_ENVIRONMENT_UNKNOWN;
  }
  const trimmed = adapter.trim();
  return trimmed ? trimmed : DBT_ENVIRONMENT_UNKNOWN;
}

/**
 * The setup properties to stamp, from what the integration reports. A reader
 * that throws counts as not detected. `dbtFusionVersion` is undefined outside
 * fusion mode, which tells the caller to remove it.
 */
export function dbtEnvironmentProperties(
  mode: string | undefined,
  readVersion: () => unknown,
  readAdapter: () => unknown,
): Record<DbtEnvironmentTelemetryProperty, string | undefined> {
  let version = UNKNOWN_VERSION;
  try {
    version = dbtVersionLabels(readVersion());
  } catch {
    // Not detected.
  }
  let adapter = DBT_ENVIRONMENT_UNKNOWN;
  try {
    adapter = dbtAdapterLabel(readAdapter());
  } catch {
    // Not detected.
  }
  return {
    [DbtEnvironmentTelemetryProperty.DbtVersion]: version.full,
    [DbtEnvironmentTelemetryProperty.DbtVersionMinor]: version.minor,
    [DbtEnvironmentTelemetryProperty.DbtAdapter]: adapter,
    [DbtEnvironmentTelemetryProperty.DbtFusionVersion]:
      mode === "fusion" ? version.full : undefined,
  };
}

// The known dbt Fusion failure events, by the event name the dbt integration
// (or this extension) sends them under.
const FUSION_FAILURE_EVENTS: Record<string, FusionFailureClass> = {
  dbtFusionCannotParseProjectCommandExecuteError:
    FusionFailureClass.ParseCommandFailed,
  DBTFusionCommandInitializeTargetError:
    FusionFailureClass.InitializeTargetFailed,
  dbtFusionParseProjectUserError: FusionFailureClass.ProjectParseError,
  RebuildManifestErrorsAndWarningsJSONParsingError:
    FusionFailureClass.ParseOutputUnreadable,
  DBTFusionProjectNameFromConfigExceptionError:
    FusionFailureClass.ProjectNameUnreadable,
  generateDocsUnsupported: FusionFailureClass.DocsUnsupported,
};

// The command runner rejects a spawn that fails with ENOENT with this message.
const COMMAND_NOT_FOUND_PREFIX = "Command not found";

// Reads the fields of any error-like object, not only a local `Error`: an
// error from another context, or a plain rejection value, carries them too.
function isCommandNotFound(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  try {
    const { code, message } = error as { code?: unknown; message?: unknown };
    if (code === "ENOENT") {
      return true;
    }
    return (
      typeof message === "string" &&
      message.startsWith(COMMAND_NOT_FOUND_PREFIX)
    );
  } catch {
    return false;
  }
}

/**
 * The failure class of a known dbt Fusion failure event, or undefined for any
 * other event. A parse command that failed because the binary is missing is
 * its own class.
 */
export function fusionFailureClass(
  eventName: string,
  error?: unknown,
): FusionFailureClass | undefined {
  const failureClass = Object.prototype.hasOwnProperty.call(
    FUSION_FAILURE_EVENTS,
    eventName,
  )
    ? FUSION_FAILURE_EVENTS[eventName]
    : undefined;
  if (
    failureClass === FusionFailureClass.ParseCommandFailed &&
    isCommandNotFound(error)
  ) {
    return FusionFailureClass.BinaryMissing;
  }
  return failureClass;
}

export function fusionFailureClassProperties(
  eventName: string,
  error?: unknown,
): { [key: string]: string } {
  try {
    const failureClass = fusionFailureClass(eventName, error);
    return failureClass
      ? { [FUSION_FAILURE_CLASS_PROPERTY]: failureClass }
      : {};
  } catch {
    return {};
  }
}
