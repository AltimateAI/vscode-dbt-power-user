import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { window, workspace } from "vscode";
import { WalkthroughCommands } from "../../commands/walkthroughCommands";

/**
 * Exercises the full installDbtCore orchestration against a fake command factory
 * that mimics a PEP 668 externally-managed (Homebrew) interpreter: the global
 * pip install fails with externally-managed-environment, venv creation succeeds,
 * and the install into the venv succeeds. Asserts the command routes to the venv
 * remediation and repoints the interpreter — the glue around the runtime
 * behavior that is itself validated against real brew.
 */
describe("WalkthroughCommands.installDbt — externally-managed flow", () => {
  const brewPython = "/opt/brew/bin/python3";
  let workspaceDir: string;
  let venvPython: string;
  let commands: WalkthroughCommands;
  let runCommands: { command: string; args: string[] }[];
  let configUpdates: { key: string; value: unknown }[];
  let dbtProjectContainer: { detectDBT: jest.Mock; initialize: jest.Mock };

  // Save originals to restore after each test.
  const orig = {
    showQuickPick: (window as any).showQuickPick,
    showErrorMessage: (window as any).showErrorMessage,
    showInformationMessage: (window as any).showInformationMessage,
    getConfiguration: (workspace as any).getConfiguration,
    workspaceFolders: (workspace as any).workspaceFolders,
  };

  beforeEach(() => {
    workspaceDir = mkdtempSync(join(tmpdir(), "dbt-install-"));
    // Mirror the runtime venv interpreter layout (Scripts/python.exe on Windows).
    venvPython =
      process.platform === "win32"
        ? join(workspaceDir, ".venv", "Scripts", "python.exe")
        : join(workspaceDir, ".venv", "bin", "python");
    runCommands = [];
    configUpdates = [];

    // Quick-picks: dbt version then adapter.
    const picks = [{ label: "1.9" }, { label: "duckdb" }];
    (window as any).showQuickPick = jest.fn(() =>
      Promise.resolve(picks.shift()),
    );
    // Choose "Create virtual environment" at the remediation prompt.
    (window as any).showErrorMessage = jest.fn(() =>
      Promise.resolve("Create virtual environment"),
    );
    (window as any).showInformationMessage = jest.fn(() => Promise.resolve());

    (workspace as any).workspaceFolders = [
      { uri: { fsPath: workspaceDir }, name: "proj", index: 0 },
    ];
    (workspace as any).getConfiguration = jest.fn(() => ({
      get: jest.fn((_k: string, d: unknown) => d),
      has: jest.fn(),
      update: jest.fn((key: string, value: unknown) => {
        configUpdates.push({ key, value });
        return Promise.resolve();
      }),
    }));

    // Fake command factory mimicking a Homebrew externally-managed interpreter.
    const commandProcessExecutionFactory = {
      createCommandProcessExecution: ({
        command,
        args,
      }: {
        command: string;
        args: string[];
      }) => ({
        completeWithTerminalOutput: async () => {
          runCommands.push({ command, args });
          if (args.includes("venv")) {
            // Materialize the venv interpreter so existsSync() sees it.
            mkdirSync(dirname(venvPython), { recursive: true });
            writeFileSync(venvPython, "");
            return { stdout: "", stderr: "", fullOutput: "" };
          }
          if (args.includes("pip")) {
            if (command === brewPython) {
              const err =
                "error: externally-managed-environment\n" +
                "× This environment is externally managed";
              return { stdout: "", stderr: err, fullOutput: err };
            }
            const ok = "Successfully installed dbt-core dbt-duckdb";
            return { stdout: ok, stderr: "", fullOutput: ok };
          }
          return { stdout: "", stderr: "", fullOutput: "" };
        },
      }),
    };

    const pythonEnvironment = {
      pythonPath: brewPython,
      pythonVersion: "3.12.0",
      getEnvironmentVariables: () => ({}),
    };
    dbtProjectContainer = {
      detectDBT: jest.fn(() => Promise.resolve()),
      initialize: jest.fn(),
    };
    const telemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    };

    commands = new (WalkthroughCommands as any)(
      dbtProjectContainer,
      telemetry,
      commandProcessExecutionFactory,
      pythonEnvironment,
      { debug: jest.fn(), error: jest.fn() },
    );
  });

  afterEach(() => {
    rmSync(workspaceDir, { recursive: true, force: true });
    (window as any).showQuickPick = orig.showQuickPick;
    (window as any).showErrorMessage = orig.showErrorMessage;
    (window as any).showInformationMessage = orig.showInformationMessage;
    (workspace as any).getConfiguration = orig.getConfiguration;
    (workspace as any).workspaceFolders = orig.workspaceFolders;
    jest.clearAllMocks();
  });

  it("creates a venv, installs dbt there, and repoints the interpreter", async () => {
    await commands.installDbt();

    // Global install attempted against the brew interpreter (and failed).
    const globalInstall = runCommands.find(
      (c) => c.command === brewPython && c.args.includes("pip"),
    );
    expect(globalInstall).toBeDefined();

    // venv created with the brew interpreter.
    const venvCreate = runCommands.find((c) => c.args.includes("venv"));
    expect(venvCreate).toBeDefined();
    expect(venvCreate!.command).toBe(brewPython);

    // dbt installed INTO the venv interpreter.
    const venvInstall = runCommands.find(
      (c) => c.command === venvPython && c.args.includes("pip"),
    );
    expect(venvInstall).toBeDefined();

    // Interpreter repointed to the venv.
    expect(configUpdates).toContainEqual({
      key: "dbtPythonPathOverride",
      value: venvPython,
    });
    expect(window.showInformationMessage).toHaveBeenCalled();
  });

  it("does not force --break-system-packages when creating a venv", async () => {
    await commands.installDbt();
    const forced = runCommands.some((c) =>
      c.args.includes("--break-system-packages"),
    );
    expect(forced).toBe(false);
  });

  it("restores the previous interpreter override if post-install detection fails", async () => {
    dbtProjectContainer.detectDBT = jest.fn(() =>
      Promise.reject(new Error("detect failed")),
    );

    await commands.installDbt();

    // Override is set to the venv, then rolled back to the prior value
    // (undefined here) so the workspace isn't left on a half-applied interpreter.
    expect(configUpdates).toEqual([
      { key: "dbtPythonPathOverride", value: venvPython },
      { key: "dbtPythonPathOverride", value: undefined },
    ]);
    expect(window.showErrorMessage).toHaveBeenCalled();
  });
});
