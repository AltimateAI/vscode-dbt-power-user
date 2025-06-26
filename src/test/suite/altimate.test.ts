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

    const mockAltimateHttpClient = {
      fetch: jest.fn(),
      fetchAsStream: jest.fn(),
      uploadToS3: jest.fn(),
      getConfig: jest
        .fn()
        .mockReturnValue({ key: "test-key", instance: "test-instance" }),
      getAltimateUrl: jest.fn().mockReturnValue("https://api.altimate.ai"),
      throwIfLocalMode: jest.fn(),
      internalFetch: fetchMock,
    };

    request = new AltimateRequest(
      mockTerminal,
      mockDBTConfiguration,
      mockAltimateHttpClient as any,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle authentication check", async () => {
    // Mock the fetch method on AltimateHttpClient to resolve successfully
    const mockAltimateHttpClient = (request as any).altimateHttpClient;
    mockAltimateHttpClient.fetch.mockResolvedValue(undefined);

    const result = await request.isAuthenticated();
    expect(result).toBe(true);

    expect(mockAltimateHttpClient.fetch).toHaveBeenCalledWith(
      "auth_health",
      {
        method: "POST",
      },
      120000,
    );
  });

  it("should handle stream responses", async () => {
    const mockAltimateHttpClient = (request as any).altimateHttpClient;
    const onProgress = jest.fn();

    mockAltimateHttpClient.fetchAsStream.mockResolvedValue(
      '{"status": "success"}',
    );

    const result = await request.fetchAsStream(
      "/test-endpoint",
      { test: true },
      onProgress,
    );

    expect(mockAltimateHttpClient.fetchAsStream).toHaveBeenCalledWith(
      "/test-endpoint",
      { test: true },
      onProgress,
      120000,
    );

    expect(result).toBe('{"status": "success"}');
  });

  it("should generate query strings", () => {
    const query = (request as any).getQueryString({ a: "b", c: 1 });
    expect(query).toBe("?a=b&c=1");
    const empty = (request as any).getQueryString({});
    expect(empty).toBe("");
  });

  it("should respect local mode configuration", () => {
    const mockAltimateHttpClient = (request as any).altimateHttpClient;

    // Mock AltimateHttpClient to throw for unsupported endpoints
    mockAltimateHttpClient.throwIfLocalMode.mockImplementation(
      (endpoint: string) => {
        if (endpoint === "unsupported") {
          throw new Error(
            "Cannot use unsupported in local mode. Please switch to cloud mode in settings.",
          );
        }
      },
    );

    expect(() =>
      (request as any).throwIfLocalMode("auth_health"),
    ).not.toThrow();
    expect(() => (request as any).throwIfLocalMode("unsupported")).toThrow(
      /local mode/,
    );
  });
});
