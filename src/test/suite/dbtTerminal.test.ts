import { DBTTerminal } from "@altimateai/dbt-integration";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { PythonException } from "python-bridge";
import * as vscode from "vscode";
import { VSCodeDBTTerminal } from "../../dbt_client/vscodeTerminal";

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

    terminal = new VSCodeDBTTerminal(mockTelemetry);
    // @ts-ignore - Manually set the output channel
    terminal.outputChannel = mockOutputChannel;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log messages with proper formatting", () => {
    const message = "Test message";
    terminal.log(message);
    expect(mockOutputChannel.info).toHaveBeenCalledWith(message, []);
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
    const newTerminal = new VSCodeDBTTerminal(mockTelemetry);
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
