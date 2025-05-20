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
import { Readable } from "stream";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { AltimateRequest } from "../../altimate";
import { RateLimitException } from "../../exceptions/rateLimitException";

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

  it("getCredentialsMessage varies by config", () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("")
      .mockReturnValueOnce("");
    expect(request.getCredentialsMessage()).toContain(
      "API Key and an instance name",
    );

    mockPythonEnv.getResolvedConfigValue.mockImplementation((key: string) =>
      key === "altimateAiKey" ? "k" : "",
    );
    expect(request.getCredentialsMessage()).toContain("instance name");

    mockPythonEnv.getResolvedConfigValue.mockImplementation((key: string) =>
      key === "altimateInstanceName" ? "i" : "",
    );
    expect(request.getCredentialsMessage()).toContain("API key");

    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    expect(request.getCredentialsMessage()).toBeUndefined();
  });

  it("handlePreviewFeatures shows message when missing", () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("")
      .mockReturnValueOnce("");
    const spy = jest
      .spyOn(request as any, "showAPIKeyMessage")
      .mockResolvedValue(undefined);
    expect(request.handlePreviewFeatures()).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it("handlePreviewFeatures returns true when credentials exist", () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("k")
      .mockReturnValueOnce("i");
    const spy = jest.spyOn(request as any, "showAPIKeyMessage");
    expect(request.handlePreviewFeatures()).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it("readStreamToBlob collects stream data", async () => {
    const stream = Readable.from(["a", "b"]);
    const blob: any = await (request as any).readStreamToBlob(stream as any);
    const text = await blob.text();
    expect(text).toBe("ab");
  });

  it("uploadToS3 uploads file", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    const file = path.join(os.tmpdir(), "up.txt");
    fs.writeFileSync(file, "x");
    const mockRes = new Response("ok", { status: 200, statusText: "OK" });
    fetchMock.mockResolvedValue(mockRes);
    const res = await request.uploadToS3("http://s3", {}, file);
    expect(res.status).toBe(200);
    fs.rmSync(file);
  });

  it("uploadToS3 throws on failure", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    const file = path.join(os.tmpdir(), "up.txt");
    fs.writeFileSync(file, "x");
    const mockRes = new Response("bad", { status: 500, statusText: "ERR" });
    fetchMock.mockResolvedValue(mockRes);
    await expect(request.uploadToS3("http://s3", {}, file)).rejects.toThrow(
      "Failed to upload data",
    );
    fs.rmSync(file);
  });

  it("fetchAsStream throws NotFoundError", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    fetchMock.mockResolvedValue(
      new Response("", { status: 404, statusText: "NotFound" }),
    );
    await expect(request.fetchAsStream("foo", {}, jest.fn())).rejects.toThrow(
      "Resource Not found",
    );
  });

  it("fetchAsStream throws RateLimitException", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    fetchMock.mockResolvedValue(
      new Response("wait", {
        status: 429,
        statusText: "Too Many",
        headers: { "Retry-After": "1" },
      }),
    );
    await expect(request.fetchAsStream("foo", {}, jest.fn())).rejects.toThrow(
      RateLimitException,
    );
  });

  it("fetchAsStream throws ForbiddenError", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    fetchMock.mockResolvedValue(
      new Response("", { status: 403, statusText: "Forbidden" }),
    );
    await expect(request.fetchAsStream("foo", {}, jest.fn())).rejects.toThrow(
      "Invalid credentials",
    );
  });

  it("fetchAsStream returns null on empty body", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    const cb = jest.fn();
    const res = await request.fetchAsStream("foo", {}, cb);
    expect(res).toBeNull();
    expect(cb).not.toHaveBeenCalled();
  });

  it("fetchAsStream throws ExecutionsExhaustedException", async () => {
    mockPythonEnv.getResolvedConfigValue
      .mockReturnValueOnce("key")
      .mockReturnValueOnce("instance");
    fetchMock.mockResolvedValue(
      new Response('{"detail":"stop"}', { status: 402, statusText: "Limit" }),
    );
    await expect(request.fetchAsStream("foo", {}, jest.fn())).rejects.toThrow(
      "stop",
    );
  });
});
