import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as sinon from "sinon";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { PythonException } from "python-bridge";
import { MockEventEmitter } from "../setup";

describe("DBTTerminal Test Suite", () => {
  let mockTelemetry: sinon.SinonStubbedInstance<any>;
  let mockOutputChannel: sinon.SinonStubbedInstance<any>;
  let terminal: DBTTerminal;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockOutputChannel = {
      appendLine: sandbox.stub(),
      show: sandbox.stub(),
      clear: sandbox.stub(),
      info: sandbox.stub(),
      debug: sandbox.stub(),
      error: sandbox.stub(),
      warn: sandbox.stub(),
    };

    mockTelemetry = {
      sendTelemetryEvent: sandbox.stub(),
      sendTelemetryError: sandbox.stub(),
    };

    terminal = new DBTTerminal(mockTelemetry);
    // @ts-ignore - Manually set the output channel
    terminal.outputChannel = mockOutputChannel;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should log messages with proper formatting", () => {
    const message = "Test message";
    terminal.log(message);
    sinon.assert.calledWith(mockOutputChannel.info, message, []);
  });

  it("should send telemetry on info messages", () => {
    const name = "test_event";
    const message = "Test info message";
    terminal.info(name, message);
    sinon.assert.calledWith(mockOutputChannel.info, `${name}:${message}`, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, name, {
      message,
      level: "info",
    });
  });

  it("should send telemetry on warning messages", () => {
    const name = "test_warning";
    const message = "Test warning message";
    terminal.warn(name, message);
    sinon.assert.calledWith(mockOutputChannel.warn, `${name}:${message}`, []);
    sinon.assert.calledWith(mockTelemetry.sendTelemetryEvent, name, {
      message,
      level: "warn",
    });
  });

  it("should handle errors with proper error message formatting", () => {
    const name = "test_error";
    const message = "Test error message";
    const error = new Error("Test error details");
    terminal.error(name, message, error);
    sinon.assert.calledWith(
      mockOutputChannel.error,
      `${name}:${message}:${error.message}`,
      [],
    );
    sinon.assert.calledWith(mockTelemetry.sendTelemetryError, name, error, {
      message,
    });
  });

  it("should handle Python exceptions", () => {
    const name = "python_error";
    const message = "Python error occurred";
    const pythonError = {
      exception: { message: "Test Python error" },
      toString: () => "Test Python error",
    } as PythonException;
    terminal.error(name, message, pythonError);
    sinon.assert.calledWith(
      mockOutputChannel.error,
      `${name}:${message}:${pythonError.toString()}`,
      [],
    );
    sinon.assert.calledWith(
      mockTelemetry.sendTelemetryError,
      name,
      pythonError,
      {
        message,
      },
    );
  });

  it("should format and log blocks with horizontal rules", () => {
    const block = ["Line 1", "Line 2", "Line 3"];
    terminal.logBlock(block);

    // Verify horizontal rules and content
    sinon.assert.calledWith(
      mockOutputChannel.info,
      "--------------------------------------------------------------------------",
      [],
    );
    sinon.assert.calledWith(mockOutputChannel.info, "Line 1", []);
    sinon.assert.calledWith(mockOutputChannel.info, "Line 2", []);
    sinon.assert.calledWith(mockOutputChannel.info, "Line 3", []);
    sinon.assert.calledWith(
      mockOutputChannel.info,
      "--------------------------------------------------------------------------",
      [],
    );
  });

  it("should format and log blocks with headers", () => {
    const header = ["Header 1", "Header 2"];
    const block = ["Content 1", "Content 2"];
    terminal.logBlockWithHeader(header, block);

    // Verify horizontal rules, header, and content
    const calls = mockOutputChannel.info.getCalls();
    let callIndex = 0;

    // First horizontal rule
    expect(calls[callIndex++].args[0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++].args[0]).toBe("\r\n");

    // Header lines with newlines
    expect(calls[callIndex++].args[0]).toBe("Header 1");
    expect(calls[callIndex++].args[0]).toBe("\r\n");
    expect(calls[callIndex++].args[0]).toBe("Header 2");
    expect(calls[callIndex++].args[0]).toBe("\r\n");

    // Second horizontal rule
    expect(calls[callIndex++].args[0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++].args[0]).toBe("\r\n");

    // Content lines with newlines
    expect(calls[callIndex++].args[0]).toBe("Content 1");
    expect(calls[callIndex++].args[0]).toBe("\r\n");
    expect(calls[callIndex++].args[0]).toBe("Content 2");
    expect(calls[callIndex++].args[0]).toBe("\r\n");

    // Final horizontal rule
    expect(calls[callIndex++].args[0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++].args[0]).toBe("\r\n");
  });

  it("should show and hide terminal based on status", async () => {
    const mockTerminal = {
      show: sandbox.stub(),
      dispose: sandbox.stub(),
    };

    // Mock window.createTerminal to return our mock terminal
    const createTerminalStub = sandbox.stub().returns(mockTerminal);
    // @ts-ignore - Mocking window.createTerminal
    terminal.terminal = mockTerminal;

    // Test showing terminal
    await terminal.show(true);
    sinon.assert.calledWith(mockTerminal.show, true);

    // Reset the mock for the next test
    mockTerminal.show.resetHistory();

    // Test not showing terminal
    await terminal.show(false);
    sinon.assert.notCalled(mockTerminal.show);
  });
});
