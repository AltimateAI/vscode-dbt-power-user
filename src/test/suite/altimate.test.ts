import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { TelemetryService } from "../../telemetry";
import { DBTTerminal } from "../../dbt_client/terminal";
import { DBTConfiguration } from "../../dbt_client/configuration";
import { AltimateRequest } from "../../altimate";

type FetchFn = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

describe("AltimateRequest Tests", () => {
  let mockTerminal: jest.Mocked<DBTTerminal>;
  let mockDBTConfiguration: jest.Mocked<DBTConfiguration>;
  let request: AltimateRequest;
  const fetchMock = jest.fn() as jest.MockedFunction<FetchFn>;
  jest.mock("node-fetch", () => ({
    __esModule: true,
    default: fetchMock,
  }));

  beforeEach(() => {
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

    mockDBTConfiguration = {
      getDbtCustomRunnerImport: jest
        .fn()
        .mockReturnValue("from dbt.cli.main import dbtRunner"),
      getDbtIntegration: jest.fn().mockReturnValue("core"),
      getRunModelCommandAdditionalParams: jest.fn().mockReturnValue([]),
      getBuildModelCommandAdditionalParams: jest.fn().mockReturnValue([]),
      getTestModelCommandAdditionalParams: jest.fn().mockReturnValue([]),
      getQueryTemplate: jest
        .fn()
        .mockReturnValue("select * from ({query}) as query limit {limit}"),
      getQueryLimit: jest.fn().mockReturnValue(500),
      getEnableNotebooks: jest.fn().mockReturnValue(false),
      getDisableQueryHistory: jest.fn().mockReturnValue(false),
      getWorkingDirectory: jest.fn().mockReturnValue("/test/workspace"),
      getAltimateUrl: jest.fn().mockReturnValue("https://api.myaltimate.com"),
      getIsLocalMode: jest.fn().mockReturnValue(false),
      getAltimateInstanceName: jest.fn().mockReturnValue("test-instance"),
      getAltimateAiKey: jest.fn().mockReturnValue("test-key"),
    } as unknown as jest.Mocked<DBTConfiguration>;

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

    request = new AltimateRequest(mockTerminal, mockDBTConfiguration);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle authentication check", async () => {
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

  it("should generate query strings", () => {
    const query = (request as any).getQueryString({ a: "b", c: 1 });
    expect(query).toBe("?a=b&c=1");
    const empty = (request as any).getQueryString({});
    expect(empty).toBe("");
  });

  it("should respect local mode configuration", () => {
    // Update the mock to return true for local mode
    mockDBTConfiguration.getIsLocalMode.mockReturnValue(true);

    expect(() =>
      (request as any).throwIfLocalMode("auth_health"),
    ).not.toThrow();
    expect(() => (request as any).throwIfLocalMode("unsupported")).toThrow(
      /not supported/,
    );
  });
});
