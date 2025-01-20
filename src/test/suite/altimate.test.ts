import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { TelemetryService } from "../../telemetry";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { window, workspace, ConfigurationTarget } from "vscode";
import { AltimateRequest } from "../../altimate";

type FetchFn = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

describe("AltimateRequest Tests", () => {
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let mockTerminal: jest.Mocked<DBTTerminal>;
  let mockPythonEnv: jest.Mocked<PythonEnvironment>;
  let mockWorkspaceConfig: ReturnType<typeof jest.spyOn>;
  let mockWindowMessage: ReturnType<typeof jest.spyOn>;
  let request: AltimateRequest;
  const fetchMock = jest.fn() as jest.MockedFunction<FetchFn>;
  jest.mock("node-fetch", () => ({
    __esModule: true,
    default: fetchMock,
  }));

  beforeEach(() => {
    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
      startTelemetryEvent: jest.fn(),
      endTelemetryEvent: jest.fn(),
      dispose: jest.fn(),
    } as unknown as jest.Mocked<TelemetryService>;

    mockTerminal = {
      show: jest.fn(),
      log: jest.fn(),
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      dispose: jest.fn(),
      logNewLine: jest.fn(),
      logLine: jest.fn(),
      logHorizontalRule: jest.fn(),
      logBlock: jest.fn(),
      warn: jest.fn(),
    } as unknown as jest.Mocked<DBTTerminal>;

    mockPythonEnv = {
      pythonPath: "/path/to/python",
      environmentVariables: { PATH: "/some/path" },
      allPythonPaths: [],
      isPython3: true,
      dispose: jest.fn(),
      printEnvVars: jest.fn(),
      getResolvedConfigValue: jest.fn(),
    } as unknown as jest.Mocked<PythonEnvironment>;

    const mockConfig = {
      get: jest
        .fn()
        .mockImplementation((key: unknown, defaultValue?: unknown) => {
          if (key === "dbt.isLocalMode" || key === "isLocalMode") {
            return false;
          }
          return defaultValue ?? "test-value";
        }),
      has: jest.fn().mockReturnValue(true),
      inspect: jest.fn(),
      update: jest.fn().mockReturnValue(Promise.resolve()),
    };

    mockWorkspaceConfig = jest
      .spyOn(workspace, "getConfiguration")
      .mockImplementation((section?: string) => {
        if (section === "dbt") {
          return mockConfig as any;
        }
        return mockConfig as any;
      });

    mockWindowMessage = jest
      .spyOn(window, "showInformationMessage")
      .mockResolvedValue("Yes" as any);

    request = new AltimateRequest(mockTelemetry, mockTerminal, mockPythonEnv);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle authentication check", async () => {
    mockPythonEnv.getResolvedConfigValue.mockImplementation((key: string) => {
      if (key === "altimateAiKey") {
        return "test-key";
      }
      if (key === "altimateInstanceName") {
        return "test-instance";
      }
      return "";
    });
    const mockResponse = new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });
    fetchMock.mockResolvedValue(mockResponse);

    const result = await request.isAuthenticated();
    expect(result).toBe(true);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/auth_health"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("should handle stream responses", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("test-key") // altimateAiKey
      .mockReturnValueOnce("test-instance"); // altimateInstanceName

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const data = encoder.encode('{"status": "success"}');
        controller.enqueue(data);
        controller.close();
      },
    });

    const mockResponse = new Response(stream, {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });
    fetchMock.mockResolvedValue(mockResponse);

    const onProgress = jest.fn();
    await request.fetchAsStream("/test-endpoint", { test: true }, onProgress);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/test-endpoint"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-tenant": "test-instance",
          Authorization: "Bearer test-key",
        }),
        body: JSON.stringify({ test: true }),
      }),
    );

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(expect.stringContaining("success"));
  });
});
