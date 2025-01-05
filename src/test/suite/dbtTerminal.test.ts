import * as assert from "assert";
import * as sinon from "sinon";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { EventEmitter } from "vscode";
import { PythonException } from "python-bridge";

suite("DBTTerminal Test Suite", () => {
  let mockTelemetry: any;
  let mockOutputChannel: any;
  let mockTerminal: any;
  let terminal: DBTTerminal;
  let sandbox: sinon.SinonSandbox;
  let writeEmitter: EventEmitter<string>;

  setup(() => {
    sandbox = sinon.createSandbox();
    writeEmitter = new EventEmitter<string>();

    mockTelemetry = {
      sendTelemetryEvent: sandbox.spy(),
      sendTelemetryError: sandbox.spy(),
    };

    mockOutputChannel = {
      info: sandbox.spy(),
      debug: sandbox.spy(),
      warn: sandbox.spy(),
      error: sandbox.spy(),
      appendLine: sandbox.spy(),
    };

    mockTerminal = {
      show: sandbox.spy(),
      dispose: sandbox.spy(),
    };

    // Mock the window API
    const mockVSCode = require("../mock/vscode").default;
    mockVSCode.window.createOutputChannel = () => mockOutputChannel;
    mockVSCode.window.createTerminal = (options: any) => {
      assert.strictEqual(options.name, "Tasks - dbt");
      assert.strictEqual(typeof options.pty.onDidWrite, "function");
      assert.strictEqual(typeof options.pty.open, "function");
      assert.strictEqual(typeof options.pty.close, "function");
      return mockTerminal;
    };

    terminal = new DBTTerminal(mockTelemetry);
  });

  teardown(() => {
    sandbox.restore();
  });

  test("should log messages with proper formatting", async () => {
    const message = "Test message";
    terminal.log(message);

    sinon.assert.calledWith(mockOutputChannel.info, message, []);
  });

  test("should properly handle trace messages", () => {
    const message = "Test trace message";
    terminal.trace(message);

    sinon.assert.calledWith(mockOutputChannel.appendLine, message);
  });

  test("should properly handle debug messages", () => {
    const name = "test_debug";
    const message = "Test debug message";
    const args = ["arg1", "arg2"];
    terminal.debug(name, message, ...args);

    sinon.assert.calledWith(
      mockOutputChannel.debug,
      `${name}:${message}`,
      args,
    );
  });

  test("should send telemetry on info messages", () => {
    const name = "test_event";
    const message = "Test info message";
    terminal.info(name, message);

    sinon.assert.calledWith(mockOutputChannel.info, `${name}:${message}`, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, name, {
      message,
      level: "info",
    });
  });

  test("should not send telemetry when sendTelemetry is false", () => {
    const name = "test_event";
    const message = "Test info message";
    terminal.info(name, message, false);

    sinon.assert.calledWith(mockOutputChannel.info, `${name}:${message}`, []);
    sinon.assert.notCalled(mockTelemetry.sendTelemetryEvent);
  });

  test("should create and initialize terminal when required", async () => {
    // First terminal creation
    await terminal.show(true);
    assert.strictEqual(mockTerminal.show.callCount, 1);

    // Test terminal disposal
    mockTerminal.dispose();

    // Test reopening terminal after disposal
    await terminal.show(true);
    assert.strictEqual(mockTerminal.show.callCount, 2);
  });

  test("should properly handle PythonException errors", () => {
    const name = "test_python_error";
    const message = "Test error message";
    const errorMessage = "Python error occurred";

    const pythonError = new Error(errorMessage) as PythonException;
    pythonError.exception = {
      message: errorMessage,
      args: [],
      type: { name: "TestError", module: "test" },
      format: [],
    };

    terminal.error(name, message, pythonError);

    sinon.assert.calledWith(
      mockOutputChannel.error,
      `${name}:${message}:${errorMessage}`,
      [],
    );

    sinon.assert.calledWith(
      mockTelemetry.sendTelemetryError,
      name,
      pythonError,
      {
        message: `${message}:${errorMessage}`,
      },
    );
  });
});
