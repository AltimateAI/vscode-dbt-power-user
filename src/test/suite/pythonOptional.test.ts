import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { readFileSync } from "fs";
import * as path from "path";
import { commands, extensions, window, workspace } from "vscode";
import { dbtSetupDiagnostics } from "../../commands/diagnosticsSetup";
import { DBTClient } from "../../dbt_client";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

/**
 * Power User for dbt works without the Python extension in the modes that
 * don't run dbt through Python (fusion, cloud).
 *
 * Before, the Python extension was a hard extension dependency,
 * `PythonEnvironment.initialize` dereferenced it unconditionally, a missing
 * dbt Fusion was reported as a missing Python interpreter, and the
 * diagnostics command stopped at "Python is not installed" in every mode.
 */

type Settings = Record<string, unknown>;

function useSettings(settings: Settings) {
  (workspace.getConfiguration as jest.Mock).mockImplementation(() => ({
    get: (key: string, fallback?: unknown) =>
      key in settings ? settings[key] : fallback,
    has: jest.fn(),
    update: jest.fn(),
    inspect: jest.fn(),
  }));
}

const terminal = () =>
  ({
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
  }) as any;

beforeEach(() => {
  jest.clearAllMocks();
  (extensions.getExtension as jest.Mock).mockReturnValue(undefined);
  useSettings({});
});

afterEach(() => {
  (workspace.getConfiguration as jest.Mock).mockReset();
  (workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: jest.fn(),
    has: jest.fn(),
    update: jest.fn(),
  });
});

describe("package.json", () => {
  it("does not require the Python extension", () => {
    const manifest = JSON.parse(
      readFileSync(path.join(__dirname, "../../../package.json"), "utf8"),
    );
    expect(manifest.extensionDependencies).not.toContain("ms-python.python");
    expect(manifest.extensionPack ?? []).not.toContain("ms-python.python");
  });
});

describe("PythonEnvironment without the Python extension", () => {
  it("initializes with no interpreter and the process environment", async () => {
    const env = new PythonEnvironment(terminal());
    await expect(env.initialize()).resolves.toBeUndefined();
    expect(env.pythonExtensionAvailable).toBe(false);
    expect(env.pythonPath).toBe("");
    expect(env.allPythonPaths).toEqual([]);
    expect(env.getEnvironmentVariables().PATH).toBe(process.env.PATH);
    const subscription = env.onPythonEnvironmentChanged(() => {});
    expect(typeof subscription.dispose).toBe("function");
  });

  it("uses dbt.dbtPythonPathOverride when one is set", async () => {
    useSettings({ dbtPythonPathOverride: process.execPath });
    const env = new PythonEnvironment(terminal());
    await env.initialize();
    expect(env.pythonPath).toBe(process.execPath);
  });

  it("merges terminal.integrated.env into the environment", async () => {
    useSettings({ "integrated.env": { linux: { FUSION_TEST_VAR: "on" } } });
    const env = new PythonEnvironment(terminal());
    await env.initialize();
    expect(env.getEnvironmentVariables().FUSION_TEST_VAR).toBe("on");
  });

  it("continues without the Python extension when it fails to activate", async () => {
    (extensions.getExtension as jest.Mock).mockReturnValue({
      isActive: false,
      activate: jest.fn(() => Promise.reject(new Error("activation failed"))),
    });
    const env = new PythonEnvironment(terminal());
    await expect(env.initialize()).resolves.toBeUndefined();
    expect(env.pythonExtensionAvailable).toBe(false);
  });
});

describe("DBTClient without the Python extension", () => {
  async function client(dbtInstalled: boolean) {
    const env = new PythonEnvironment(terminal());
    const dbtClient = new DBTClient(env, () => ({
      detectDBT: () => Promise.resolve(dbtInstalled),
    }));
    await dbtClient.detectDBT();
    return dbtClient;
  }

  const messages = () =>
    (window.showErrorMessage as jest.Mock).mock.calls.map((call) => call[0]);

  it("reports a missing dbt Fusion, not a missing interpreter, in fusion mode", async () => {
    useSettings({ dbtIntegration: "fusion" });
    await client(false);
    await new Promise((resolve) => setImmediate(resolve));
    expect(messages()).toEqual([
      expect.stringContaining("dbt Fusion was not found"),
    ]);
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.any(String),
      "Install dbt Fusion",
      "Troubleshoot",
    );
  });

  it("shows nothing in fusion mode when dbt Fusion is installed", async () => {
    useSettings({ dbtIntegration: "fusion" });
    const dbtClient = await client(true);
    expect(dbtClient.dbtInstalled).toBe(true);
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("offers to install the Python extension in core mode", async () => {
    useSettings({ dbtIntegration: "core" });
    (window.showErrorMessage as jest.Mock).mockReturnValueOnce(
      Promise.resolve("Install Python extension"),
    );
    await client(false);
    await new Promise((resolve) => setImmediate(resolve));
    expect(messages()).toEqual([
      expect.stringContaining("Python extension, which is not installed"),
    ]);
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "workbench.extensions.installExtension",
      "ms-python.python",
    );
  });
});

describe("dbtSetupDiagnostics", () => {
  const base = {
    pythonPath: "",
    pythonExtensionAvailable: false,
    pythonInstalled: false,
    env: {},
    cwd: "/projects/jaffle",
  };

  it("reports the dbt Fusion binary and version without Python", async () => {
    const findBinary = jest.fn(() =>
      Promise.resolve({
        path: "/home/user/.local/bin/dbt",
        version: [2, 0, 9],
        location: "installer" as const,
      }),
    );
    const report = await dbtSetupDiagnostics(
      { ...base, dbtIntegrationMode: "fusion", dbtInstalled: true },
      findBinary,
    );
    expect(report).toEqual({
      lines: [
        "dbt Fusion binary=/home/user/.local/bin/dbt",
        "dbt Fusion version=2.0.9",
        "Python is not needed in fusion mode",
        "DBT is installed",
      ],
      proceed: true,
    });
    expect(findBinary).toHaveBeenCalledWith(
      expect.objectContaining({ cwd: "/projects/jaffle", skipScripts: false }),
    );
  });

  it("says dbt Fusion was not found", async () => {
    const report = await dbtSetupDiagnostics(
      { ...base, dbtIntegrationMode: "fusion", dbtInstalled: false },
      () => Promise.resolve(undefined),
    );
    expect(report.proceed).toBe(false);
    expect(report.lines[0]).toMatch(/^dbt Fusion binary=not found/);
    expect(report.lines).not.toContain("Python is not installed");
  });

  it("stops in core mode without the Python extension", async () => {
    const findBinary = jest.fn(() => Promise.resolve(undefined));
    const report = await dbtSetupDiagnostics(
      { ...base, dbtIntegrationMode: "core", dbtInstalled: false },
      findBinary,
    );
    expect(report).toEqual({
      lines: [
        "The Python extension is not installed",
        "Can't proceed further: dbt core mode needs the Python extension",
      ],
      proceed: false,
    });
    expect(findBinary).not.toHaveBeenCalled();
  });

  it("keeps today's lines in core mode with Python", async () => {
    const report = await dbtSetupDiagnostics(
      {
        ...base,
        pythonPath: "/venv/bin/python",
        pythonExtensionAvailable: true,
        pythonInstalled: true,
        dbtIntegrationMode: "core",
        dbtInstalled: true,
      },
      () => Promise.resolve(undefined),
    );
    expect(report).toEqual({
      lines: ["Python is installed", "DBT is installed"],
      proceed: true,
    });
  });
});
