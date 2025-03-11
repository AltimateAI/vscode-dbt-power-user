import { spawn, ChildProcess } from "child_process";
import * as path from "path";
import * as fs from "fs";
import { DBTPowerUserMCPServer } from "../mcpServer";

// Mock the child_process spawn function
jest.mock("child_process", () => ({
  spawn: jest.fn(() => ({
    stdout: {
      on: jest.fn(),
    },
    stderr: {
      on: jest.fn(),
    },
    on: jest.fn(),
  })),
}));

// Mock the logger
jest.mock("../logger", () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  })),
}));

describe("DBTPowerUserMCPServer", () => {
  const testProjectPath = "/test/project/path";
  const testProfilesPath = "/test/profiles/path";
  const testApiKey = "test-api-key";
  const testInstance = "test-instance";

  let server: DBTPowerUserMCPServer;
  let originalStdinOn: any;
  let originalStdoutWrite: any;

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Save original stdin/stdout methods
    originalStdinOn = process.stdin.on;
    originalStdoutWrite = process.stdout.write;

    // Mock stdin.on and stdout.write
    process.stdin.on = jest.fn();
    process.stdout.write = jest.fn();

    server = new DBTPowerUserMCPServer({
      projectPath: testProjectPath,
      dbtProfilesPath: testProfilesPath,
      altimateApiKey: testApiKey,
      altimateInstance: testInstance,
    });
  });

  afterEach(() => {
    // Restore original stdin/stdout methods
    process.stdin.on = originalStdinOn;
    process.stdout.write = originalStdoutWrite;
  });

  test("should initialize with provided options", () => {
    expect(server).toBeDefined();
  });

  test("should register tools on initialization", () => {
    // @ts-ignore - Accessing private property for testing
    expect(server.tools.length).toBeGreaterThan(0);
  });

  test("should handle tools/list request", () => {
    // Start the server
    server.start();

    // Get the callback registered for stdin.on
    const onMock = process.stdin.on as jest.Mock;
    expect(onMock).toHaveBeenCalledWith("data", expect.any(Function));

    // Get the data callback
    const dataCallback = onMock.mock.calls.find(
      (call) => call[0] === "data",
    )[1];

    // Simulate tools/list request
    const listRequest = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "tools/list",
    };

    // Call the callback with the tools/list request
    dataCallback(JSON.stringify(listRequest));

    // Verify the response
    const writeMock = process.stdout.write as jest.Mock;
    expect(writeMock).toHaveBeenCalled();
    const response = JSON.parse(writeMock.mock.calls[0][0]);
    expect(response.id).toEqual("test-id");
    expect(response.result.tools).toBeDefined();
    expect(Array.isArray(response.result.tools)).toBe(true);
  });

  test("should handle tools/call request", () => {
    // Mock a successful tool handler
    const mockHandler = jest.fn().mockResolvedValue({
      content: [{ type: "text", text: "Test result" }],
    });

    // @ts-ignore - Modify private property for testing
    server.tools = [
      {
        name: "test_tool",
        description: "Test tool",
        schema: { type: "object", properties: {} },
        handler: mockHandler,
      },
    ];

    // Start the server
    server.start();

    // Get the callback registered for stdin.on
    const onMock = process.stdin.on as jest.Mock;
    expect(onMock).toHaveBeenCalledWith("data", expect.any(Function));

    // Get the data callback
    const dataCallback = onMock.mock.calls.find(
      (call) => call[0] === "data",
    )[1];

    // Simulate tools/call request
    const callRequest = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "tools/call",
      params: {
        name: "test_tool",
        arguments: { arg1: "value1" },
      },
    };

    // Call the callback with the tools/call request
    dataCallback(JSON.stringify(callRequest));

    // Verify the handler was called with the right arguments
    expect(mockHandler).toHaveBeenCalledWith(
      { arg1: "value1" },
      {
        projectPath: testProjectPath,
        dbtProfilesPath: testProfilesPath,
        altimateApiKey: testApiKey,
        altimateInstance: testInstance,
      },
    );
  });

  test("should handle error in tools/call when tool not found", async () => {
    // Start the server
    server.start();

    // Get the callback registered for stdin.on
    const onMock = process.stdin.on as jest.Mock;
    expect(onMock).toHaveBeenCalledWith("data", expect.any(Function));

    // Get the data callback
    const dataCallback = onMock.mock.calls.find(
      (call) => call[0] === "data",
    )[1];

    // Simulate tools/call request with non-existent tool
    const callRequest = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "tools/call",
      params: {
        name: "non_existent_tool",
        arguments: {},
      },
    };

    // Call the callback with the tools/call request
    await dataCallback(JSON.stringify(callRequest));

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify the error response
    const writeMock = process.stdout.write as jest.Mock;
    expect(writeMock).toHaveBeenCalled();

    const calls = writeMock.mock.calls.map((call) => JSON.parse(call[0]));
    const errorResponse = calls.find(
      (resp) => resp.error && resp.error.message.includes("not found"),
    );

    expect(errorResponse).toBeDefined();
    expect(errorResponse.id).toEqual("test-id");
    expect(errorResponse.error.message).toContain("not found");
  });

  test("should handle error in tools/call when tool handler throws", async () => {
    // Mock a failing tool handler
    const mockHandler = jest.fn().mockRejectedValue(new Error("Test error"));

    // @ts-ignore - Modify private property for testing
    server.tools = [
      {
        name: "failing_tool",
        description: "Failing tool",
        schema: { type: "object", properties: {} },
        handler: mockHandler,
      },
    ];

    // Start the server
    server.start();

    // Get the callback registered for stdin.on
    const onMock = process.stdin.on as jest.Mock;
    expect(onMock).toHaveBeenCalledWith("data", expect.any(Function));

    // Get the data callback
    const dataCallback = onMock.mock.calls.find(
      (call) => call[0] === "data",
    )[1];

    // Simulate tools/call request
    const callRequest = {
      jsonrpc: "2.0",
      id: "test-id",
      method: "tools/call",
      params: {
        name: "failing_tool",
        arguments: {},
      },
    };

    // Call the callback with the tools/call request
    await dataCallback(JSON.stringify(callRequest));

    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify the error response
    const writeMock = process.stdout.write as jest.Mock;
    expect(writeMock).toHaveBeenCalled();
    const calls = writeMock.mock.calls.map((call) => JSON.parse(call[0]));
    const errorResponse = calls.find(
      (resp) => resp.error && resp.error.message === "Test error",
    );
    expect(errorResponse).toBeDefined();
    expect(errorResponse.id).toEqual("test-id");
  });
});
