import { expect } from "@jest/globals";
import { DBTCoreProjectIntegration } from "../../dbt_client/dbtCoreIntegration";
import { Container } from "inversify";
import {
  DBTCommandExecutionInfrastructure,
  PythonDBTCommandExecutionStrategy,
} from "../../dbt_client/dbtIntegration";
import { TelemetryService } from "../../telemetry";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { AltimateRequest } from "../../altimate";
import { ValidationProvider } from "../../validation_provider";
import { DeferToProdService } from "../../services/deferToProdService";
import { Uri, languages } from "vscode";
import { MockEventEmitter } from "../setup";

describe("DBTCoreProjectIntegration Tests", () => {
  let dbtCoreProjectIntegration: DBTCoreProjectIntegration;
  let mockPythonBridge: jest.Mocked<any>;
  let mockTelemetry: jest.Mocked<TelemetryService>;

  beforeEach(() => {
    // Create mock dependencies
    const container = new Container();

    // Mock all required dependencies
    mockPythonBridge = {
      lock: jest.fn(),
    };

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
      setTelemetryCustomAttribute: jest.fn(),
    } as any;

    const mockExecutionInfrastructure = {
      createPythonBridge: () => mockPythonBridge,
      createQueue: () => {},
    };

    const mockUri = Uri.file("/test/project/root");
    const mockDiagnosticCollection =
      languages.createDiagnosticCollection("dbt-project-config");

    // Create mock event emitter for Python environment changes
    const mockPythonEnvChangeEmitter = new MockEventEmitter<Uri | undefined>();

    // Create the instance directly with constructor injection
    dbtCoreProjectIntegration = new DBTCoreProjectIntegration(
      mockExecutionInfrastructure as any,
      {
        onPythonEnvironmentChanged: mockPythonEnvChangeEmitter.event,
        pythonPath: "/usr/bin/python3",
        environmentVariables: {},
      } as any,
      mockTelemetry,
      {} as PythonDBTCommandExecutionStrategy,
      {} as DBTProjectContainer,
      {} as AltimateRequest,
      {
        debug: () => {},
        error: () => {},
        log: () => {},
      } as any,
      {} as ValidationProvider,
      {} as DeferToProdService,
      mockUri,
      mockDiagnosticCollection,
    );

    (dbtCoreProjectIntegration as any).python = mockPythonBridge;
  });

  it("validateSql should return validation result for valid SQL", async () => {
    // Arrange
    const query = "SELECT * FROM my_table";
    const dialect = "postgres";
    const models = {};
    const expectedResult = {
      valid: true,
      errors: [],
    };

    mockPythonBridge.lock.mockResolvedValue(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockPythonBridge.lock).toHaveBeenCalledTimes(1);
    const lockCall = mockPythonBridge.lock.mock.calls[0][0];
    expect(lockCall.toString()).toContain("validate_sql");
  });

  it("validateSql should handle invalid SQL", async () => {
    const query = "SELECT * FREM my_table"; // Intentional typo
    const dialect = "postgres";
    const models = {};
    const expectedResult = {
      valid: false,
      errors: [
        {
          message: 'syntax error at or near "FREM"',
          line: 1,
          column: 8,
        },
      ],
    };

    mockPythonBridge.lock.mockResolvedValue(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockPythonBridge.lock).toHaveBeenCalledTimes(1);
  });
});
