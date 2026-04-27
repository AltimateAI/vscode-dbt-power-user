import { beforeEach, describe, expect, it } from "@jest/globals";
import { Uri, workspace } from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";
import {
  StaticRuntimePythonEnvironment,
  VSCodeRuntimePythonEnvironmentProvider,
} from "../../dbt_client/runtimePythonEnvironmentProvider";

describe("StaticRuntimePythonEnvironment", () => {
  let mockVscodeEnvironment: jest.Mocked<
    Pick<
      PythonEnvironment,
      "pythonPath" | "environmentVariables" | "getEnvironmentVariables"
    >
  >;
  let staticEnv: StaticRuntimePythonEnvironment;

  beforeEach(() => {
    mockVscodeEnvironment = {
      pythonPath: "/usr/bin/python3",
      environmentVariables: { HOME: "/home/user" },
      getEnvironmentVariables: jest
        .fn()
        .mockReturnValue({ HOME: "/home/user" }),
    } as any;

    // Construct without DI — pass mock directly
    staticEnv = Object.create(StaticRuntimePythonEnvironment.prototype);
    (staticEnv as any).vscodeEnvironment = mockVscodeEnvironment;
  });

  it("should return pythonPath from vscodeEnvironment", () => {
    expect(staticEnv.pythonPath).toBe("/usr/bin/python3");
  });

  it("should resolve workspace folder when path is provided", () => {
    const mockFolder = {
      uri: { fsPath: "/workspace/project" },
      name: "project",
      index: 0,
    };
    const folderEnv = { DBT_TARGET: "dev" };
    mockVscodeEnvironment.getEnvironmentVariables.mockReturnValue(folderEnv);

    // Mock workspace.getWorkspaceFolder
    const originalGetWorkspaceFolder = (workspace as any).getWorkspaceFolder;
    (workspace as any).getWorkspaceFolder = jest
      .fn()
      .mockReturnValue(mockFolder);

    const result = staticEnv.getEnvironmentVariables("/workspace/project");

    expect((workspace as any).getWorkspaceFolder).toHaveBeenCalledWith(
      Uri.file("/workspace/project"),
    );
    expect(mockVscodeEnvironment.getEnvironmentVariables).toHaveBeenCalledWith(
      mockFolder,
    );
    expect(result).toEqual(folderEnv);

    // Restore
    (workspace as any).getWorkspaceFolder = originalGetWorkspaceFolder;
  });

  it("should fall back to default env when workspacePath is undefined", () => {
    const defaultEnv = { HOME: "/home/user" };
    mockVscodeEnvironment.getEnvironmentVariables.mockReturnValue(defaultEnv);

    // Simulate dbt-integration calling without args (before PR #33 lands)
    const result = (staticEnv as any).getEnvironmentVariables(undefined);

    expect(mockVscodeEnvironment.getEnvironmentVariables).toHaveBeenCalledWith(
      undefined,
    );
    expect(result).toEqual(defaultEnv);
  });

  it("should pass undefined folder when workspace path is not found", () => {
    const defaultEnv = { HOME: "/home/user" };
    mockVscodeEnvironment.getEnvironmentVariables.mockReturnValue(defaultEnv);

    const originalGetWorkspaceFolder = (workspace as any).getWorkspaceFolder;
    (workspace as any).getWorkspaceFolder = jest
      .fn()
      .mockReturnValue(undefined);

    const result = staticEnv.getEnvironmentVariables("/unknown/path");

    expect((workspace as any).getWorkspaceFolder).toHaveBeenCalledWith(
      Uri.file("/unknown/path"),
    );
    expect(mockVscodeEnvironment.getEnvironmentVariables).toHaveBeenCalledWith(
      undefined,
    );
    expect(result).toEqual(defaultEnv);

    (workspace as any).getWorkspaceFolder = originalGetWorkspaceFolder;
  });
});

describe("VSCodeRuntimePythonEnvironmentProvider", () => {
  let mockVscodeEnvironment: jest.Mocked<
    Pick<
      PythonEnvironment,
      | "pythonPath"
      | "environmentVariables"
      | "getEnvironmentVariables"
      | "initialize"
      | "onPythonEnvironmentChanged"
    >
  >;
  let provider: VSCodeRuntimePythonEnvironmentProvider;

  beforeEach(() => {
    mockVscodeEnvironment = {
      pythonPath: "/usr/bin/python3",
      environmentVariables: { KEY: "value" },
      getEnvironmentVariables: jest.fn().mockReturnValue({ KEY: "value" }),
      initialize: jest.fn().mockResolvedValue(undefined),
      onPythonEnvironmentChanged: jest.fn(),
    } as any;

    // Construct without DI
    provider = Object.create(VSCodeRuntimePythonEnvironmentProvider.prototype);
    (provider as any).vscodeEnvironment = mockVscodeEnvironment;
    (provider as any).callbacks = [];
  });

  it("should return environment with correct pythonPath", () => {
    const env = provider.getCurrentEnvironment();
    expect(env.pythonPath).toBe("/usr/bin/python3");
  });

  it("should return environment with getEnvironmentVariables that resolves workspace paths", () => {
    const mockFolder = {
      uri: { fsPath: "/workspace/project" },
      name: "project",
      index: 0,
    };
    const folderEnv = { DBT_TARGET: "prod" };
    mockVscodeEnvironment.getEnvironmentVariables.mockReturnValue(folderEnv);

    const originalGetWorkspaceFolder = (workspace as any).getWorkspaceFolder;
    (workspace as any).getWorkspaceFolder = jest
      .fn()
      .mockReturnValue(mockFolder);

    const env = provider.getCurrentEnvironment();
    const result = env.getEnvironmentVariables("/workspace/project");

    expect(result).toEqual(folderEnv);
    expect(mockVscodeEnvironment.getEnvironmentVariables).toHaveBeenCalledWith(
      mockFolder,
    );

    (workspace as any).getWorkspaceFolder = originalGetWorkspaceFolder;
  });

  it("should register and unregister change callbacks", () => {
    const callback = jest.fn();
    const unregister = provider.onEnvironmentChanged(callback);

    expect((provider as any).callbacks).toContain(callback);

    unregister();
    expect((provider as any).callbacks).not.toContain(callback);
  });
});
