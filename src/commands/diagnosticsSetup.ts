import {
  DbtV2Binary,
  EnvironmentVariables,
  findDbtV2Binary,
  FindDbtV2BinaryOptions,
} from "@altimateai/dbt-integration";
import { integrationNeedsPython } from "../dbt_client";

export interface DbtSetupState {
  dbtIntegrationMode: string;
  pythonPath: string | undefined;
  pythonExtensionAvailable: boolean;
  pythonInstalled: boolean | undefined;
  dbtInstalled: boolean | undefined;
  env: EnvironmentVariables;
  cwd: string | undefined;
}

export interface DbtSetupReport {
  lines: string[];
  /** Whether the diagnostics can go on to the workspaces and projects. */
  proceed: boolean;
}

/**
 * The interpreter and dbt checks of the diagnostics command. Python is
 * checked only for the modes that run through it; in Fusion mode the dbt
 * binary and its version are reported instead.
 */
export async function dbtSetupDiagnostics(
  state: DbtSetupState,
  findBinary: (
    options: FindDbtV2BinaryOptions,
  ) => Promise<DbtV2Binary | undefined> = findDbtV2Binary,
): Promise<DbtSetupReport> {
  const lines: string[] = [];
  if (state.dbtIntegrationMode === "fusion") {
    const binary = await findBinary({
      pythonPath: state.pythonPath || undefined,
      cwd: state.cwd,
      env: state.env,
      // Diagnostics checks every candidate, scripts included.
      skipScripts: false,
    });
    if (binary) {
      lines.push(
        `dbt Fusion binary=${binary.path}`,
        `dbt Fusion version=${binary.version.join(".")}`,
      );
    } else {
      lines.push(
        "dbt Fusion binary=not found (looked next to the Python interpreter, in ~/.local/bin and on PATH)",
      );
    }
    lines.push("Python is not needed in fusion mode");
  } else if (integrationNeedsPython(state.dbtIntegrationMode)) {
    if (!state.pythonInstalled) {
      if (!state.pythonExtensionAvailable) {
        lines.push(
          "The Python extension is not installed",
          `Can't proceed further: dbt ${state.dbtIntegrationMode} mode needs the Python extension`,
        );
      } else {
        lines.push(
          "Python is not installed",
          "Can't proceed further without fixing python installation",
        );
      }
      return { lines, proceed: false };
    }
    lines.push("Python is installed");
  }
  if (!state.dbtInstalled) {
    lines.push(
      "DBT is not installed",
      "Can't proceed further without fixing dbt installation",
    );
    return { lines, proceed: false };
  }
  lines.push("DBT is installed");
  return { lines, proceed: true };
}
