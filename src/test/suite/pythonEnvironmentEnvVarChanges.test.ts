import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { extensions, Uri, workspace } from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";

/**
 * dbt reads its environment variables when its process starts, from the
 * process, the `terminal.integrated.env` settings and a `.env` file. A change
 * to the last two is announced, so a failing project can be checked again.
 */
describe("PythonEnvironment.onEnvironmentVariablesChanged", () => {
  afterEach(() => {
    (workspace.onDidChangeConfiguration as jest.Mock).mockReset();
    (workspace.onDidChangeConfiguration as jest.Mock).mockReturnValue({
      dispose: jest.fn(),
    });
    (extensions.getExtension as jest.Mock).mockReset();
  });

  const terminal = () =>
    ({ debug: jest.fn(), warn: jest.fn(), error: jest.fn() }) as any;

  it("fires on a change to the terminal.integrated.env settings, and not on other settings", () => {
    let onConfig: ((event: any) => void) | undefined;
    (workspace.onDidChangeConfiguration as jest.Mock).mockImplementation(
      (listener: any) => {
        onConfig = listener;
        return { dispose: jest.fn() };
      },
    );
    const env = new PythonEnvironment(terminal());
    const changes: (Uri | undefined)[] = [];
    env.onEnvironmentVariablesChanged((folder) => changes.push(folder));

    onConfig!({
      affectsConfiguration: (key: string) => key === "editor.fontSize",
    });
    onConfig!({
      affectsConfiguration: (key: string) => key === "terminal.integrated.env",
    });

    // Strict: toEqual takes [] for [undefined].
    expect(changes).toStrictEqual([undefined]);
  });

  it("fires with the workspace folder when the Python extension reports a .env change", async () => {
    let onEnvFile: ((event: any) => void) | undefined;
    (extensions.getExtension as jest.Mock).mockReturnValue({
      isActive: true,
      exports: {
        ready: Promise.resolve(),
        environments: {
          onDidEnvironmentVariablesChange: (listener: any) => {
            onEnvFile = listener;
            return { dispose: jest.fn() };
          },
          getEnvironmentVariables: () => ({}),
        },
        environment: {
          getEnvironmentPaths: async () => [],
          getEnvironmentDetails: async () => ({ version: [3, 12, 0] }),
        },
        settings: {
          getExecutionDetails: () => ({ execCommand: ["/venv/bin/python"] }),
          onDidChangeExecutionDetails: () => ({ dispose: jest.fn() }),
        },
      },
    });
    const env = new PythonEnvironment(terminal());
    const changes: (Uri | undefined)[] = [];
    env.onEnvironmentVariablesChanged((folder) => changes.push(folder));

    await (env as any).activatePythonExtension();
    const folder = Uri.file("/ws");
    onEnvFile!({ resource: { uri: folder, name: "ws", index: 0 }, env: {} });

    expect(changes).toEqual([folder]);
  });
});
