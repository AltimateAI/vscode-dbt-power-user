import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommand,
} from "../../dbt_integration/dbtIntegration";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../../dbt_integration/commandProcessExecution";
import { PythonEnvironment } from "../../dbt_integration/pythonEnvironment";
import { DBTTerminal } from "../../dbt_integration/terminal";
describe("CLIDBTCommandExecutionStrategy Tests", () => {
  let strategy: CLIDBTCommandExecutionStrategy;
  let mockCommandProcessExecutionFactory: jest.Mocked<CommandProcessExecutionFactory>;
  let mockPythonEnvironment: jest.Mocked<PythonEnvironment>;
  let mockTerminal: jest.Mocked<DBTTerminal>;
  let mockCommandProcessExecution: jest.Mocked<CommandProcessExecution>;

  beforeEach(() => {
    // Create mock dependencies
    mockCommandProcessExecution = {
      complete: jest
        .fn()
        .mockResolvedValue({ stdout: "success", stderr: "", exitCode: 0 }),
      completeWithTerminalOutput: jest
        .fn()
        .mockResolvedValue({ stdout: "success", stderr: "", exitCode: 0 }),
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

    mockTerminal = {
      show: jest.fn(),
      log: jest.fn(),
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      dispose: jest.fn(),
    } as unknown as jest.Mocked<DBTTerminal>;

    // Create strategy instance
    strategy = new CLIDBTCommandExecutionStrategy(
      mockCommandProcessExecutionFactory,
      mockPythonEnvironment,
      mockTerminal,
      "/test/workspace",
      "dbt",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should properly handle command with terminal logging", async () => {
    // Arrange
    const command = new DBTCommand(
      "Running dbt command",
      ["run", "--select", "my_model"],
      true,
      true,
      true,
    );

    // Act
    const result = await strategy.execute(command);

    // Assert
    expect(result.stdout).toBe("success");

    // Verify terminal was shown
    expect(mockTerminal.show).toHaveBeenCalled();

    // Verify telemetry was sent through terminal.info
    expect(mockTerminal.info).toHaveBeenCalledWith(
      "dbtCommand",
      "Executed dbt command: dbt run --select my_model",
      true,
      {
        command: "dbt run --select my_model",
        execution: "cli",
      },
    );

    // Verify terminal logging
    expect(mockTerminal.log).toHaveBeenCalledWith(
      "> Executing task: dbt run --select my_model\n\r",
    );

    // Verify command process execution
    expect(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
    ).toHaveBeenCalledWith({
      command: "dbt",
      args: ["run", "--select", "my_model"],
      signal: undefined,
      cwd: "/test/workspace",
      envVars: { PATH: "/some/path" },
    });

    // Verify completeWithTerminalOutput was called since logToTerminal is true
    expect(
      mockCommandProcessExecution.completeWithTerminalOutput,
    ).toHaveBeenCalled();
  });

  it("should handle command without terminal logging", async () => {
    // Arrange
    const command = new DBTCommand(
      "Running dbt command",
      ["run", "--select", "my_model"],
      false,
      true,
      false,
    );

    // Act
    const result = await strategy.execute(command);

    // Assert
    expect(result.stdout).toBe("success");

    // Verify terminal was not shown
    expect(mockTerminal.show).not.toHaveBeenCalled();

    // Verify telemetry was still sent through terminal.info
    expect(mockTerminal.info).toHaveBeenCalledWith(
      "dbtCommand",
      "Executed dbt command: dbt run --select my_model",
      true,
      {
        command: "dbt run --select my_model",
        execution: "cli",
      },
    );

    // Verify terminal was not logged to
    expect(mockTerminal.log).not.toHaveBeenCalled();

    // Verify command process execution
    expect(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
    ).toHaveBeenCalledWith({
      command: "dbt",
      args: ["run", "--select", "my_model"],
      signal: undefined,
      cwd: "/test/workspace",
      envVars: { PATH: "/some/path" },
    });

    // Verify complete was called since logToTerminal is false
    expect(mockCommandProcessExecution.complete).toHaveBeenCalled();
  });

  it("should throw error when python environment is not available", async () => {
    // Arrange
    const command = new DBTCommand("Running dbt command", [
      "run",
      "--select",
      "my_model",
    ]);

    // Remove python environment
    (strategy as any).pythonEnvironment = {};

    // Act & Assert
    await expect(strategy.execute(command)).rejects.toThrow(
      "Could not launch command as python environment is not available",
    );
  });
});

describe("DBTCommand Test Suite", () => {
  let mockExecutionStrategy: jest.Mocked<CLIDBTCommandExecutionStrategy>;

  beforeEach(() => {
    mockExecutionStrategy = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CLIDBTCommandExecutionStrategy>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when no execution strategy is set", async () => {
    const command = new DBTCommand("Test command", ["test"]);
    try {
      await command.execute();
      // If we get here, the test should fail because we expected an error
      expect(true).toBe(false);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Execution strategy is required to run dbt commands",
      );
    }
  });

  it("should format command correctly", () => {
    const command = new DBTCommand("Test command", [
      "run",
      "--select",
      "my_model",
    ]);
    expect(command.getCommandAsString()).toBe("dbt run --select my_model");
  });

  it("should append new arguments", () => {
    const command = new DBTCommand("Test command", ["run"]);
    command.addArgument("--select");
    command.addArgument("my_model");
    expect(command.getCommandAsString()).toBe("dbt run --select my_model");
  });

  it("should use execution strategy when set", async () => {
    const command = new DBTCommand("Test command", ["test"]);
    mockExecutionStrategy.execute.mockResolvedValue({
      stdout: "success",
      stderr: "",
      fullOutput: "success",
    });

    command.setExecutionStrategy(mockExecutionStrategy);
    const result = await command.execute();

    expect(result.stdout).toBe("success");
    expect(mockExecutionStrategy.execute).toHaveBeenCalledWith(
      command,
      undefined,
    );
  });
});
