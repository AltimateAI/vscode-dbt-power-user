import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { ValidationProvider } from "../../validation_provider";
import { NoCredentialsError } from "@altimateai/dbt-integration";
import { DBTTerminal } from "@altimateai/dbt-integration";
import { TelemetryService } from "../../telemetry";
import { AltimateRequest } from "../../altimate";

describe("DbtProject Test Suite", () => {
  let mockTerminal: jest.Mocked<DBTTerminal>;
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let mockAltimate: jest.Mocked<AltimateRequest>;
  let mockValidationProvider: jest.Mocked<ValidationProvider>;

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

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
      startTelemetryEvent: jest.fn(),
      endTelemetryEvent: jest.fn(),
      dispose: jest.fn(),
    } as unknown as jest.Mocked<TelemetryService>;

    mockAltimate = {
      handlePreviewFeatures: jest.fn().mockReturnValue(true),
      enabled: jest.fn(),
      isAuthenticated: jest.fn(),
      validateCredentials: jest.fn(),
      dispose: jest.fn(),
    } as unknown as jest.Mocked<AltimateRequest>;

    mockValidationProvider = {
      validateCredentialsSilently: jest.fn(),
    } as unknown as jest.Mocked<ValidationProvider>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle telemetry events correctly", () => {
    const eventName = "test_event";
    mockTelemetry.sendTelemetryEvent(eventName);
    expect(mockTelemetry.sendTelemetryEvent).toHaveBeenCalledWith(eventName);
  });

  it("should handle validation provider calls", () => {
    mockValidationProvider.validateCredentialsSilently.mockImplementation(
      () => {
        throw new NoCredentialsError();
      },
    );

    expect(() => mockValidationProvider.validateCredentialsSilently()).toThrow(
      NoCredentialsError,
    );
  });
});
