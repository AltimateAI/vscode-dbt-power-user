import {
  DBTCloudProjectIntegration,
  DBTDiagnosticData,
  DeferConfig,
} from "@altimateai/dbt-integration";
import { describe, expect, it, jest } from "@jest/globals";

// The shared vscode mock at src/test/mock/vscode.ts has no `env` or
// `extensions` namespaces. Stub them in before importing inversify.config —
// the Cloud factory transitively constructs TelemetryService (reads env.appName
// + creates a TelemetryReporter, which calls env.createTelemetryLogger) and
// VSCodeRuntimePythonEnvironmentProvider (reads extensions.getExtension).
import * as vscodeMock from "../mock/vscode";
const vscodeMockAny = vscodeMock as Record<string, unknown>;
vscodeMockAny.env = {
  appName: "vscode-test",
  machineId: "test-machine",
  sessionId: "test-session",
  isTelemetryEnabled: false,
  onDidChangeTelemetryEnabled: () => ({ dispose: () => {} }),
  createTelemetryLogger: () => ({
    logUsage: () => {},
    logError: () => {},
    dispose: () => {},
    onDidChangeEnableStates: () => ({ dispose: () => {} }),
  }),
};
// VSCodeDBTTerminal calls outputChannel.debug/info/warn/error — the shared
// mock channel only has append/appendLine/clear/show/hide/dispose.
const sharedWindow = vscodeMockAny.window as Record<string, unknown>;
sharedWindow.createOutputChannel = jest.fn(() => ({
  append: jest.fn(),
  appendLine: jest.fn(),
  clear: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  dispose: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  trace: jest.fn(),
  replace: jest.fn(),
  name: "Log - dbt",
  logLevel: 1,
  onDidChangeLogLevel: () => ({ dispose: () => {} }),
}));
vscodeMockAny.extensions = {
  getExtension: jest.fn(() => ({
    isActive: true,
    activate: () => Promise.resolve(),
    exports: {
      settings: {
        getExecutionDetails: () => ({ execCommand: ["python"] }),
        onDidChangeExecutionDetails: () => ({ dispose: () => {} }),
      },
      environment: {
        getEnvironmentPaths: async () => [],
        getEnvironmentDetails: async () => ({ executable: { uri: undefined } }),
      },
    },
  })),
};

import { container } from "../../inversify.config";

describe("Factory<DBTCloudProjectIntegration>", () => {
  it("constructs the Cloud integration with coreEngineDependencies wired up so non-Fusion variants can build a CloudCoreCommandIntegration engine", () => {
    type CloudFactory = (
      projectRoot: string,
      projectConfigDiagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig,
      onDiagnosticsChanged: () => void,
    ) => DBTCloudProjectIntegration;

    const factory = container.get<CloudFactory>(
      "Factory<DBTCloudProjectIntegration>",
    );
    const integration = factory(
      "/tmp/project",
      [],
      {} as DeferConfig,
      () => {},
    );

    const deps = (
      integration as unknown as {
        coreEngineDependencies?: {
          pythonDBTCommandExecutionStrategy: unknown;
          dbtConfiguration: unknown;
          dbtIntegrationClient: unknown;
        };
      }
    ).coreEngineDependencies;

    expect(deps).toBeDefined();
    expect(deps?.pythonDBTCommandExecutionStrategy).toBeDefined();
    expect(deps?.dbtConfiguration).toBeDefined();
    expect(deps?.dbtIntegrationClient).toBeDefined();
  });
});
