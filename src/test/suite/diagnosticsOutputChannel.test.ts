import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import * as vscode from "vscode";
import { DiagnosticsOutputChannel } from "../../services/diagnosticsOutputChannel";

// Set test environment
process.env.NODE_ENV = "test";

describe("DiagnosticsOutputChannel Test Suite", () => {
  let mockOutputChannel: jest.Mocked<any>;
  let diagnosticsChannel: DiagnosticsOutputChannel;

  beforeEach(() => {
    mockOutputChannel = {
      appendLine: jest.fn(),
      show: jest.fn(),
      clear: jest.fn(),
      dispose: jest.fn(),
    };

    // Mock vscode.window.createOutputChannel
    jest
      .spyOn(vscode.window, "createOutputChannel")
      .mockReturnValue(mockOutputChannel);

    diagnosticsChannel = new DiagnosticsOutputChannel();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should create output channel with correct name", () => {
    expect(vscode.window.createOutputChannel).toHaveBeenCalledWith(
      "dbt Power User - Diagnostics",
      "log",
    );
  });

  it("should show output channel", () => {
    diagnosticsChannel.show();
    expect(mockOutputChannel.show).toHaveBeenCalledWith(true);
  });

  it("should log messages", () => {
    const message = "Test message";
    diagnosticsChannel.log(message);
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(message);
  });

  it("should log new lines", () => {
    diagnosticsChannel.logNewLine();
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("");
  });

  it("should log lines", () => {
    const line = "Test line";
    diagnosticsChannel.logLine(line);
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(line);
  });

  it("should log horizontal rules", () => {
    diagnosticsChannel.logHorizontalRule();
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      "--------------------------------------------------------------------------",
    );
  });

  it("should format and log blocks with horizontal rules", () => {
    const block = ["Line 1", "Line 2", "Line 3"];
    diagnosticsChannel.logBlock(block);

    // Verify horizontal rules and content
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      "--------------------------------------------------------------------------",
    );
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("Line 1");
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("Line 2");
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("Line 3");
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      "--------------------------------------------------------------------------",
    );
  });

  it("should format and log blocks with headers", () => {
    const header = ["Header 1", "Header 2"];
    const block = ["Content 1", "Content 2"];
    diagnosticsChannel.logBlockWithHeader(header, block);

    const calls = mockOutputChannel.appendLine.mock.calls.map(
      (call: any) => call[0],
    );

    expect(calls).toEqual([
      "--------------------------------------------------------------------------",
      "Header 1",
      "Header 2",
      "--------------------------------------------------------------------------",
      "Content 1",
      "Content 2",
      "--------------------------------------------------------------------------",
    ]);
  });

  it("should handle empty lines in blocks", () => {
    const block = ["Line 1", "", "Line 3"];
    diagnosticsChannel.logBlock(block);

    // Should skip empty lines
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("Line 1");
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith("Line 3");
    expect(mockOutputChannel.appendLine).not.toHaveBeenCalledWith("");
  });

  it("should dispose output channel", () => {
    diagnosticsChannel.dispose();
    expect(mockOutputChannel.dispose).toHaveBeenCalled();
  });
});
