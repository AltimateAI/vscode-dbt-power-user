import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import { DBTCoreDetection } from "../../dbt_client/dbtCoreIntegration";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../commandProcessExecution";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { workspace, Uri } from "vscode";

describe("DBTCoreDetection Tests", () => {
  let detection: DBTCoreDetection;
  let mockCommandProcessExecutionFactory: jest.Mocked<CommandProcessExecutionFactory>;
  let mockPythonEnvironment: jest.Mocked<PythonEnvironment>;
  let mockCommandProcessExecution: jest.Mocked<CommandProcessExecution>;
  let workspaceFoldersSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock workspace folders
    const mockWorkspaceFolders = [
      {
        uri: Uri.file("/test/workspace"),
        name: "test",
        index: 0,
      },
    ];

    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => mockWorkspaceFolders,
      configurable: true,
    });

    mockCommandProcessExecution = {
      complete: jest
        .fn()
        .mockResolvedValue({ stdout: "", stderr: "", fullOutput: "" }),
      completeWithTerminalOutput: jest
        .fn()
        .mockResolvedValue({ stdout: "", stderr: "", fullOutput: "" }),
      disposables: [],
      terminal: {} as any,
      command: "",
      spawn: jest.fn(),
      kill: jest.fn(),
      dispose: jest.fn(),
      formatText: jest.fn(),
    } as unknown as jest.Mocked<CommandProcessExecution>;

    mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: jest
        .fn()
        .mockReturnValue(mockCommandProcessExecution),
    } as unknown as jest.Mocked<CommandProcessExecutionFactory>;

    mockPythonEnvironment = {
      pythonPath: "/path/to/python",
      environmentVariables: { PATH: "/some/path" },
    } as unknown as jest.Mocked<PythonEnvironment>;

    detection = new DBTCoreDetection(
      mockPythonEnvironment as any,
      mockCommandProcessExecutionFactory as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Restore original workspaceFolders property
    Object.defineProperty(workspace, "workspaceFolders", {
      get: () => undefined,
      configurable: true,
    });
  });

  it("should return true when dbt is installed", async () => {
    const mockResponse = {
      stdout: "",
      stderr: "",
      fullOutput: "",
    };
    mockCommandProcessExecution.complete.mockResolvedValue(mockResponse);
    mockCommandProcessExecutionFactory.createCommandProcessExecution.mockReturnValue(
      mockCommandProcessExecution,
    );

    const result = await detection.detectDBT();

    expect(result).toBe(true);
    expect(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
    ).toHaveBeenCalledWith({
      command: "/path/to/python",
      args: ["-c", "import dbt"],
      cwd: "/test/workspace",
      envVars: { PATH: "/some/path" },
    });
    expect(mockCommandProcessExecution.complete).toHaveBeenCalled();
  });

  it("should return false when dbt import fails with stderr", async () => {
    mockCommandProcessExecution.complete.mockResolvedValue({
      stdout: "",
      stderr: "ModuleNotFoundError: No module named 'dbt'",
      fullOutput: "ModuleNotFoundError: No module named 'dbt'",
    });

    const result = await detection.detectDBT();

    expect(result).toBe(false);
  });

  it("should return false when command execution throws error", async () => {
    mockCommandProcessExecution.complete.mockRejectedValue(
      new Error("Command failed"),
    );

    const result = await detection.detectDBT();

    expect(result).toBe(false);
  });
});
