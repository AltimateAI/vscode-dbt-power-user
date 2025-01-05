import * as assert from "assert";
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

suite("CLIDBTCommandExecutionStrategy Tests", () => {
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

  setup(() => {
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
    mockTerminal = sandbox.createStubInstance(DBTTerminal);
    mockTelemetry = sandbox.createStubInstance(TelemetryService);

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

  teardown(() => {
    sandbox.restore();
  });

  test("execute should properly handle command with terminal logging", async () => {
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
    assert.strictEqual(
      result.stdout,
      "success",
      "Should return successful result",
    );

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

  test("execute should handle command without terminal logging", async () => {
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
    assert.strictEqual(
      result.stdout,
      "success",
      "Should return successful result",
    );

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

  test("execute should throw error when python environment is not available", async () => {
    // Arrange
    const command = new DBTCommand("Running dbt command", [
      "run",
      "--select",
      "my_model",
    ]);

    // Remove python environment
    (strategy as any).pythonEnvironment = {};

    // Act & Assert
    await assert.rejects(
      () => strategy.execute(command),
      /Could not launch command as python environment is not available/,
    );
  });
});

suite("DBTCommand Test Suite", () => {
  let sandbox: sinon.SinonSandbox;
  let mockExecutionStrategy: sinon.SinonStubbedInstance<CLIDBTCommandExecutionStrategy>;

  setup(() => {
    sandbox = sinon.createSandbox();
    mockExecutionStrategy = sandbox.createStubInstance(
      CLIDBTCommandExecutionStrategy,
    );
  });

  teardown(() => {
    sandbox.restore();
  });

  test("execute should throw error when no execution strategy is set", async () => {
    const command = new DBTCommand("Test command", ["test"]);
    await assert.rejects(async () => await command.execute(), {
      message: "Execution strategy is required to run dbt commands",
    });
  });

  test("getCommandAsString should format command correctly", () => {
    const command = new DBTCommand("Test command", [
      "run",
      "--select",
      "my_model",
    ]);
    assert.strictEqual(
      command.getCommandAsString(),
      "dbt run --select my_model",
    );
  });

  test("addArgument should append new arguments", () => {
    const command = new DBTCommand("Test command", ["run"]);
    command.addArgument("--select");
    command.addArgument("my_model");
    assert.strictEqual(
      command.getCommandAsString(),
      "dbt run --select my_model",
    );
  });

  test("execute should use execution strategy when set", async () => {
    const command = new DBTCommand("Test command", ["test"]);
    mockExecutionStrategy.execute.resolves({
      stdout: "success",
      stderr: "",
      fullOutput: "success",
    });
    command.setExecutionStrategy(mockExecutionStrategy);
    await command.execute();
    sinon.assert.calledOnce(mockExecutionStrategy.execute);
    sinon.assert.calledWith(mockExecutionStrategy.execute, command);
  });
});
