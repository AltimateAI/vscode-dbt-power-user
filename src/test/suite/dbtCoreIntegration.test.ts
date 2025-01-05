import * as assert from "assert";
import * as sinon from "sinon";
import { DBTCoreProjectIntegration } from "../../dbt_client/dbtCoreIntegration";
import { Container } from "inversify";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import {
  DBTCommandExecutionInfrastructure,
  PythonDBTCommandExecutionStrategy,
} from "../../dbt_client/dbtIntegration";
import { PythonBridge } from "python-bridge";
import { PythonEnvironment } from "../../manifest/pythonEnvironment";
import { TelemetryService } from "../../telemetry";
import { DBTProjectContainer } from "../../manifest/dbtProjectContainer";
import { AltimateRequest } from "../../altimate";
import { ValidationProvider } from "../../validation_provider";
import { DeferToProdService } from "../../services/deferToProdService";
import { Uri, languages, EventEmitter } from "vscode";

suite("DBTCoreProjectIntegration Tests", () => {
  let sandbox: sinon.SinonSandbox;
  let dbtCoreProjectIntegration: DBTCoreProjectIntegration;
  let mockPythonBridge: any;

  setup(() => {
    sandbox = sinon.createSandbox();
    // Create mock dependencies
    const container = new Container();

    // Mock all required dependencies
    mockPythonBridge = {
      lock: sandbox.stub(),
    };

    const mockExecutionInfrastructure = {
      createPythonBridge: () => mockPythonBridge,
      createQueue: () => {},
    };

    const mockUri = Uri.file("/test/project/root");
    const mockDiagnosticCollection =
      languages.createDiagnosticCollection("dbt-project-config");

    // Create mock event emitter for Python environment changes
    const mockPythonEnvChangeEmitter = new EventEmitter<Uri | undefined>();

    // Create the instance directly with constructor injection
    dbtCoreProjectIntegration = new DBTCoreProjectIntegration(
      mockExecutionInfrastructure as any,
      {
        onPythonEnvironmentChanged: mockPythonEnvChangeEmitter.event,
        pythonPath: "/usr/bin/python3",
        environmentVariables: {},
      } as any,
      {} as TelemetryService,
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

  teardown(() => {
    sandbox.restore();
  });

  test("validateSql should return validation result for valid SQL", async () => {
    // Arrange
    const query = "SELECT * FROM my_table";
    const dialect = "postgres";
    const models = {};
    const expectedResult = {
      valid: true,
      errors: [],
    };

    mockPythonBridge.lock.resolves(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    assert.deepStrictEqual(result, expectedResult);
    assert.ok(mockPythonBridge.lock.calledOnce);
    const lockCall = mockPythonBridge.lock.getCall(0);
    assert.ok(lockCall.args[0].toString().includes("validate_sql"));
  });

  test("validateSql should handle invalid SQL", async () => {
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

    mockPythonBridge.lock.resolves(expectedResult);

    // Act
    const result = await dbtCoreProjectIntegration.validateSql(
      query,
      dialect,
      models,
    );

    // Assert
    assert.deepStrictEqual(result, expectedResult);
    assert.ok(mockPythonBridge.lock.calledOnce);
  });
});
