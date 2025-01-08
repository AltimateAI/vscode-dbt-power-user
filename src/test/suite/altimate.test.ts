import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as sinon from "sinon";
import {
  AltimateRequest,
  NoCredentialsError,
  ForbiddenError,
  APIError,
} from "../../altimate";
import { TelemetryService } from "../../telemetry";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { workspace, window, WorkspaceConfiguration } from "vscode";

// Add base URL for testing
const TEST_BASE_URL = "https://api.test.altimate.ai";

describe("Altimate API Integration Tests", () => {
  let altimate: AltimateRequest;
  let mockTelemetry: sinon.SinonStubbedInstance<TelemetryService>;
  let mockTerminal: sinon.SinonStubbedInstance<DBTTerminal>;
  let mockPythonEnv: sinon.SinonStubbedInstance<PythonEnvironment>;
  let mockWorkspace: sinon.SinonStub;
  let mockWindow: sinon.SinonStub;
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    // Create mock instances
    mockTelemetry = sinon.createStubInstance(TelemetryService);
    mockTerminal = sinon.createStubInstance(DBTTerminal);
    mockPythonEnv = sinon.createStubInstance(PythonEnvironment);

    // Mock workspace and window with proper base URL
    const mockConfig = {
      get: sinon
        .stub()
        .withArgs("altimateUrl")
        .returns(TEST_BASE_URL)
        .withArgs("isLocalMode")
        .returns(false),
      has: sinon.stub().returns(true),
      inspect: sinon.stub(),
      update: sinon.stub().resolves(),
    } as unknown as WorkspaceConfiguration;

    mockWorkspace = sinon
      .stub(workspace, "getConfiguration")
      .returns(mockConfig);
    mockWindow = sinon.stub(window, "showInformationMessage");

    // Set up global fetch for testing
    global.fetch = sinon.stub();
    fetchStub = global.fetch as sinon.SinonStub;

    // Create instance with mocked base URL
    Object.defineProperty(AltimateRequest, "ALTIMATE_URL", {
      value: TEST_BASE_URL,
      writable: true,
    });

    altimate = new AltimateRequest(
      mockTelemetry,
      mockTerminal as unknown as DBTTerminal,
      mockPythonEnv,
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should initialize with correct configuration", async () => {
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateInstanceName")
      .returns("test-instance");
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateAiKey")
      .returns("test-key");

    expect(altimate.getInstanceName()).toBe("test-instance");
    expect(altimate.getAIKey()).toBe("test-key");
    expect(altimate.enabled()).toBe(true);
  });

  it("should handle missing credentials", async () => {
    mockPythonEnv.getResolvedConfigValue.returns(undefined);

    expect(altimate.enabled()).toBe(false);
    expect(altimate.getCredentialsMessage()).toBe(
      "To use this feature, please add an API Key and an instance name in the settings.",
    );
  });

  it("should validate credentials successfully", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    };
    fetchStub.resolves(mockResponse);

    const result = await altimate.validateCredentials(
      "test-instance",
      "test-key",
    );
    expect(result).toEqual({ success: true });
  });

  it("should handle invalid credentials", async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      statusText: "Forbidden",
      json: async () => ({ error: "Invalid credentials" }),
    };
    fetchStub.resolves(mockResponse);

    await expect(
      altimate.validateCredentials("test-instance", "invalid-key"),
    ).rejects.toThrow(ForbiddenError);

    try {
      await altimate.validateCredentials("test-instance", "invalid-key");
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenError);
      expect((error as Error).message).toBe(
        "Invalid credentials. Please check instance name and API Key.",
      );
    }
  });

  it("should handle authentication check", async () => {
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateInstanceName")
      .returns("test-instance");
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateAiKey")
      .returns("test-key");

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ status: "ok" }),
    };
    fetchStub.resolves(mockResponse);

    const result = await altimate.isAuthenticated();
    expect(result).toBe(true);

    sinon.assert.calledWith(
      fetchStub,
      `${TEST_BASE_URL}/auth_health`,
      sinon.match({
        method: "POST",
        headers: {
          "x-tenant": "test-instance",
          Authorization: "Bearer test-key",
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("should handle stream responses", async () => {
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateInstanceName")
      .returns("test-instance");
    mockPythonEnv.getResolvedConfigValue
      .withArgs("altimateAiKey")
      .returns("test-key");

    const encoder = new TextEncoder();
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ status: "success" }),
      body: new ReadableStream({
        start(controller) {
          const data = encoder.encode('{"status": "success"}');
          controller.enqueue(data);
          controller.close();
        },
      }),
    };

    fetchStub.resolves(mockResponse);

    const onProgress = sinon.spy();
    await altimate.fetchAsStream("/test-endpoint", {}, onProgress);

    sinon.assert.calledWith(
      fetchStub,
      sinon.match((value) => value.endsWith("/test-endpoint")),
      sinon.match({
        method: "POST",
        headers: {
          "x-tenant": "test-instance",
          Authorization: "Bearer test-key",
          "Content-Type": "application/json",
        },
      }),
    );

    sinon.assert.calledOnce(onProgress);
    expect(onProgress.firstCall.args[0]).toContain("success");
  });
});
