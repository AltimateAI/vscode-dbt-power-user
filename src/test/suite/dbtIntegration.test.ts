import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as sinon from "sinon";
import { Uri } from "vscode";
import {
  CLIDBTCommandExecutionStrategy,
  DBTCommand,
} from "../../dbt_client/dbtIntegration";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  CommandProcessResult,
} from "../../commandProcessExecution";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { TelemetryService } from "../../telemetry";

describe("CLIDBTCommandExecutionStrategy Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let strategy: CLIDBTCommandExecutionStrategy;
  let mockCommandProcessExecutionFactory: {
    createCommandProcessExecution: sinon.SinonStub;
  };
  let mockPythonEnvironment: sinon.SinonStubbedInstance<PythonEnvironment>;
  let mockTerminal: sinon.SinonStubbedInstance<DBTTerminal>;
  let mockTelemetry: sinon.SinonStubbedInstance<TelemetryService>;
  let mockCommandProcessExecution: {
    complete: sinon.SinonStub;
    completeWithTerminalOutput: sinon.SinonStub;
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Create mock dependencies
    mockCommandProcessExecution = {
      complete: sandbox
        .stub()
        .resolves({ stdout: "success", stderr: "", exitCode: 0 }),
      completeWithTerminalOutput: sandbox
        .stub()
        .resolves({ stdout: "success", stderr: "", exitCode: 0 }),
    };

    const mockExecution = {
      ...mockCommandProcessExecution,
      disposables: [],
      terminal: {} as any,
      command: "",
      spawn: sandbox.stub(),
      kill: sandbox.stub(),
      dispose: sandbox.stub(),
      formatText: sandbox.stub(),
    } as unknown as CommandProcessExecution;

    mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: sandbox.stub().returns(mockExecution),
    };

    mockPythonEnvironment = {
      pythonPath: "/path/to/python",
      environmentVariables: { PATH: "/some/path" },
    } as any;
    mockTerminal = {
      show: sandbox.stub(),
      log: sandbox.stub(),
      trace: sandbox.stub(),
      debug: sandbox.stub(),
      info: sandbox.stub(),
      error: sandbox.stub(),
      dispose: sandbox.stub(),
    } as any;
    mockTelemetry = {
      sendTelemetryEvent: sandbox.stub(),
      sendTelemetryError: sandbox.stub(),
    } as any;

    // Create strategy instance
    strategy = new CLIDBTCommandExecutionStrategy(
      mockCommandProcessExecutionFactory as unknown as CommandProcessExecutionFactory,
      mockPythonEnvironment as any,
      mockTerminal as any,
      mockTelemetry as any,
      Uri.file("/test/workspace"),
      "dbt",
    );
  });

  afterEach(() => {
    sandbox.restore();
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
    sinon.assert.calledOnce(mockTerminal.show);

    // Verify telemetry was sent
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, "dbtCommand", {
      command: "dbt run --select my_model",
    });

    // Verify terminal logging
    sinon.assert.calledWith(
      mockTerminal.log,
      "> Executing task: dbt run --select my_model\n\r",
    );

    // Verify command process execution
    sinon.assert.calledWith(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
      {
        command: "dbt",
        args: ["run", "--select", "my_model"],
        tokens: [],
        cwd: "/test/workspace",
        envVars: { PATH: "/some/path" },
      },
    );

    // Verify completeWithTerminalOutput was called since logToTerminal is true
    sinon.assert.calledOnce(
      mockCommandProcessExecution.completeWithTerminalOutput,
    );
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
    sinon.assert.notCalled(mockTerminal.show);

    // Verify telemetry was still sent
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, "dbtCommand", {
      command: "dbt run --select my_model",
    });

    // Verify terminal was not logged to
    sinon.assert.notCalled(mockTerminal.log);

    // Verify command process execution
    sinon.assert.calledWith(
      mockCommandProcessExecutionFactory.createCommandProcessExecution,
      {
        command: "dbt",
        args: ["run", "--select", "my_model"],
        tokens: [],
        cwd: "/test/workspace",
        envVars: { PATH: "/some/path" },
      },
    );

    // Verify complete was called since logToTerminal is false
    sinon.assert.calledOnce(mockCommandProcessExecution.complete);
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
  let sandbox: sinon.SinonSandbox;
  let mockExecutionStrategy: sinon.SinonStubbedInstance<CLIDBTCommandExecutionStrategy>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockExecutionStrategy = sandbox.createStubInstance(
      CLIDBTCommandExecutionStrategy,
    );
  });

  afterEach(() => {
    sandbox.restore();
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
    mockExecutionStrategy.execute.resolves({
      stdout: "success",
      stderr: "",
      fullOutput: "success",
    });
    command.setExecutionStrategy(mockExecutionStrategy);
    await command.execute();
    expect(mockExecutionStrategy.execute.calledOnce).toBe(true);
    expect(mockExecutionStrategy.execute.calledWith(command)).toBe(true);
  });
});
