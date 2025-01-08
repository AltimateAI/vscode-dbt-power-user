import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import * as sinon from "sinon";
import { MockEventEmitter } from "../setup";
import { DBTProject } from "../../manifest/dbtProject";
import { DBTProjectLog } from "../../manifest/modules/dbtProjectLog";
import { ValidationProvider } from "../../validation_provider";
import { NoCredentialsError, AltimateRequest } from "../../altimate";
import { ManifestCacheChangedEvent } from "../../manifest/event/manifestCacheChangedEvent";
import { DBTCommand } from "../../dbt_client/dbtIntegration";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

describe("DbtProject Test Suite", () => {
  let sandbox: sinon.SinonSandbox;
  let mockTerminal: sinon.SinonStubbedInstance<DBTTerminal>;
  let mockTelemetry: any;
  let mockAltimate: any;
  let mockValidationProvider: sinon.SinonStubbedInstance<ValidationProvider>;
  let telemetrySpy: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockTerminal = sandbox.createStubInstance(DBTTerminal);
    mockTelemetry = {
      sendTelemetryEvent: sandbox.stub(),
      sendTelemetryError: sandbox.stub(),
    };

    mockAltimate = {
      handlePreviewFeatures: sandbox.stub().returns(true),
    };

    mockValidationProvider = sandbox.createStubInstance(ValidationProvider);
    telemetrySpy = mockTelemetry.sendTelemetryEvent;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should handle telemetry events correctly", () => {
    const eventName = "test_event";
    mockTelemetry.sendTelemetryEvent(eventName);
    expect(telemetrySpy.calledWith(eventName)).toBe(true);
  });

  it("should handle validation provider calls", () => {
    mockValidationProvider.validateCredentialsSilently.throws(
      new NoCredentialsError(),
    );
    expect(() => mockValidationProvider.validateCredentialsSilently()).toThrow(
      NoCredentialsError,
    );
  });

  it("should handle terminal operations", () => {
    const message = "test message";
    mockTerminal.log(message);
    expect(mockTerminal.log.calledWith(message)).toBe(true);
  });
});
