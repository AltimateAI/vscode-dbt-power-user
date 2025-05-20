import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as vscode from "vscode";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { PythonException } from "python-bridge";

// Set test environment
process.env.NODE_ENV = "test";

describe("DBTTerminal Test Suite", () => {
  let mockTelemetry: jest.Mocked<any>;
  let mockOutputChannel: jest.Mocked<any>;
  let terminal: DBTTerminal;

  beforeEach(() => {
    mockOutputChannel = {
      appendLine: jest.fn(),
      show: jest.fn(),
      clear: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    };

    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "debug").mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});

    terminal = new DBTTerminal(mockTelemetry);
    // @ts-ignore - Manually set the output channel
    terminal.outputChannel = mockOutputChannel;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log messages with proper formatting", () => {
    const message = "Test message";
    terminal.log(message);
    expect(mockOutputChannel.info).toHaveBeenCalledWith(message, []);
  });

  it("logLine writes message and newline", () => {
    const spy = jest.spyOn(terminal, "log");
    terminal.logLine("abc");
    expect(spy).toHaveBeenCalledWith("abc");
    expect(spy).toHaveBeenCalledWith("\r\n");
  });

  it("logNewLine logs CRLF", () => {
    const spy = jest.spyOn(terminal, "log");
    terminal.logNewLine();
    expect(spy).toHaveBeenCalledWith("\r\n");
  });

  it("should write to terminal when active", () => {
    const message = "hello";
    // @ts-ignore - access private
    terminal.terminal = { show: jest.fn(), dispose: jest.fn() } as any;
    const fireSpy = jest.spyOn((terminal as any).writeEmitter, "fire");
    terminal.log(message);
    expect(fireSpy).toHaveBeenCalledWith(message);
  });

  it("should send telemetry on info messages", () => {
    const name = "test_event";
    const message = "Test info message";
    terminal.info(name, message);
    expect(mockOutputChannel.info).toHaveBeenCalledWith(
      `${name}:${message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryEvent).toHaveBeenCalledWith(name, {
      message,
      level: "info",
    });
  });

  it("should send telemetry on warning messages", () => {
    const name = "test_warning";
    const message = "Test warning message";
    terminal.warn(name, message);
    expect(mockOutputChannel.warn).toHaveBeenCalledWith(
      `${name}:${message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryEvent).toHaveBeenCalledWith(name, {
      message,
      level: "warn",
    });
  });

  it("should handle errors with proper error message formatting", () => {
    const name = "test_error";
    const message = "Test error message";
    const error = new Error("Test error details");
    terminal.error(name, message, error);
    expect(mockOutputChannel.error).toHaveBeenCalledWith(
      `${name}:${message}:${error.message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryError).toHaveBeenCalledWith(name, error, {
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
    expect(mockOutputChannel.error).toHaveBeenCalledWith(
      `${name}:${message}:${pythonError.toString()}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryError).toHaveBeenCalledWith(
      name,
      pythonError,
      {
        message,
      },
    );
  });

  it("should handle string errors", () => {
    terminal.error("name", "msg", "oops");
    expect(mockOutputChannel.error).toHaveBeenCalledWith("name:msg:oops", []);
  });

  it("should format and log blocks with horizontal rules", () => {
    const block = ["Line 1", "Line 2", "Line 3"];
    terminal.logBlock(block);

    // Verify horizontal rules and content
    expect(mockOutputChannel.info).toHaveBeenCalledWith(
      "--------------------------------------------------------------------------",
      [],
    );
    expect(mockOutputChannel.info).toHaveBeenCalledWith("Line 1", []);
    expect(mockOutputChannel.info).toHaveBeenCalledWith("Line 2", []);
    expect(mockOutputChannel.info).toHaveBeenCalledWith("Line 3", []);
    expect(mockOutputChannel.info).toHaveBeenCalledWith(
      "--------------------------------------------------------------------------",
      [],
    );
  });

  it("should format and log blocks with headers", () => {
    const header = ["Header 1", "Header 2"];
    const block = ["Content 1", "Content 2"];
    terminal.logBlockWithHeader(header, block);

    const calls = mockOutputChannel.info.mock.calls;
    let callIndex = 0;

    // First horizontal rule
    expect(calls[callIndex++][0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++][0]).toBe("\r\n");

    // Header lines with newlines
    expect(calls[callIndex++][0]).toBe("Header 1");
    expect(calls[callIndex++][0]).toBe("\r\n");
    expect(calls[callIndex++][0]).toBe("Header 2");
    expect(calls[callIndex++][0]).toBe("\r\n");

    // Second horizontal rule
    expect(calls[callIndex++][0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++][0]).toBe("\r\n");

    // Content lines with newlines
    expect(calls[callIndex++][0]).toBe("Content 1");
    expect(calls[callIndex++][0]).toBe("\r\n");
    expect(calls[callIndex++][0]).toBe("Content 2");
    expect(calls[callIndex++][0]).toBe("\r\n");

    // Final horizontal rule
    expect(calls[callIndex++][0]).toBe(
      "--------------------------------------------------------------------------",
    );
    expect(calls[callIndex++][0]).toBe("\r\n");
  });

  it("should show and hide terminal based on status", async () => {
    const mockTerminal = {
      show: jest.fn(),
      dispose: jest.fn(),
    };

    // @ts-ignore - Mocking terminal
    terminal.terminal = mockTerminal;

    // Test showing terminal
    await terminal.show(true);
    expect(mockTerminal.show).toHaveBeenCalledWith(false);

    // Reset the mock for the next test
    jest.clearAllMocks();

    // Test not showing terminal
    await terminal.show(false);
    expect(mockTerminal.show).not.toHaveBeenCalled();
  });

  it("should properly handle trace messages", () => {
    const message = "Test trace message";
    terminal.trace(message);
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(message);
  });

  it("should properly handle debug messages", () => {
    const name = "test_debug";
    const message = "Test debug message";
    terminal.debug(name, message);
    expect(mockOutputChannel.debug).toHaveBeenCalledWith(
      `${name}:${message}`,
      [],
    );
  });

  it("should not send telemetry when sendTelemetry is false for info messages", () => {
    const name = "test_event_no_telemetry";
    const message = "Test info message without telemetry";
    terminal.info(name, message, false);
    expect(mockOutputChannel.info).toHaveBeenCalledWith(
      `${name}:${message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryEvent).not.toHaveBeenCalled();
  });

  it("should not send telemetry when sendTelemetry is false for warning messages", () => {
    const name = "test_warning_no_telemetry";
    const message = "Test warning message without telemetry";
    terminal.warn(name, message, false);
    expect(mockOutputChannel.warn).toHaveBeenCalledWith(
      `${name}:${message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryEvent).not.toHaveBeenCalled();
  });

  it("should not send telemetry when sendTelemetry is false for error messages", () => {
    const name = "test_error_no_telemetry";
    const message = "Test error message without telemetry";
    const error = new Error("Test error details");
    terminal.error(name, message, error, false);
    expect(mockOutputChannel.error).toHaveBeenCalledWith(
      `${name}:${message}:${error.message}`,
      [],
    );
    expect(mockTelemetry.sendTelemetryError).not.toHaveBeenCalled();
  });

  it("should properly dispose of all disposables", () => {
    const mockDisposable1 = { dispose: jest.fn() };
    const mockDisposable2 = { dispose: jest.fn() };
    // @ts-ignore - Set private disposables for testing
    terminal.disposables = [mockDisposable1, mockDisposable2];
    terminal.dispose();
    expect(mockDisposable1.dispose).toHaveBeenCalled();
    expect(mockDisposable2.dispose).toHaveBeenCalled();
    // @ts-ignore - Check private disposables for testing
    expect(terminal.disposables.length).toBe(0);
  });

  it("should properly initialize and dispose terminal", async () => {
    // Mock vscode.window.createTerminal
    const mockTerminal = {
      dispose: jest.fn(),
      show: jest.fn(),
    };

    const createTerminalMock = jest
      .spyOn(vscode.window, "createTerminal")
      .mockReturnValue(mockTerminal as unknown as vscode.Terminal);

    // Create a new terminal instance
    const newTerminal = new DBTTerminal(mockTelemetry);
    await newTerminal.show(true);

    // Verify terminal was created with correct parameters
    expect(createTerminalMock).toHaveBeenCalled();
    const createTerminalArgs = createTerminalMock.mock.calls[0][0];
    expect(createTerminalArgs.name).toBe("Tasks - dbt");
    expect(typeof createTerminalArgs.pty.onDidWrite).toBe("function");
    expect(typeof createTerminalArgs.pty.open).toBe("function");
    expect(typeof createTerminalArgs.pty.close).toBe("function");

    // Test terminal disposal
    newTerminal.dispose();
    expect(mockTerminal.dispose).toHaveBeenCalled();

    // Cleanup
    createTerminalMock.mockRestore();
  });
});
