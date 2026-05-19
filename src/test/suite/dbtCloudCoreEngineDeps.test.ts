import {
  DBTCloudProjectIntegration,
  DBTCommandExecutionInfrastructure,
  DBTCommandFactory,
  DBTConfiguration,
  DBTDiagnosticData,
  DBTTerminal,
  DbtCloudVariantDetector,
  DbtIntegrationClient,
  DeferConfig,
  PythonDBTCommandExecutionStrategy,
  PythonEnvironmentProvider,
  RuntimePythonEnvironment,
} from "@altimateai/dbt-integration";
import { describe, expect, it, jest } from "@jest/globals";

// Documents the runtime contract that Factory<DBTCloudProjectIntegration> must
// satisfy. The Cloud integration only constructs its engine inside
// refreshProjectConfig(), and for any non-Fusion variant (including the
// "no ~/.dbt/dbt_cloud.yml" / "API call failed" case where detect() returns
// null) it routes through CloudCoreCommandIntegration — which requires
// coreEngineDependencies to be passed in. Without those, the engine is never
// constructed and every subsequent dialect call throws "engine not initialized".

const noopTerminal = (): DBTTerminal =>
  ({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
    show: jest.fn(),
  }) as unknown as DBTTerminal;

const stubVariantDetectorReturningNull = (): DbtCloudVariantDetector =>
  ({
    detect: jest.fn(async () => null),
  }) as unknown as DbtCloudVariantDetector;

const buildIntegration = (opts: {
  withCoreEngineDeps: boolean;
}): DBTCloudProjectIntegration => {
  const terminal = noopTerminal();
  const detector = stubVariantDetectorReturningNull();
  const onDiagnosticsChanged = () => {};
  const coreEngineDeps = opts.withCoreEngineDeps
    ? {
        pythonDBTCommandExecutionStrategy:
          {} as unknown as PythonDBTCommandExecutionStrategy,
        dbtConfiguration: {} as unknown as DBTConfiguration,
        dbtIntegrationClient: {} as unknown as DbtIntegrationClient,
      }
    : undefined;
  return new DBTCloudProjectIntegration(
    {} as unknown as DBTCommandExecutionInfrastructure,
    {} as unknown as DBTCommandFactory,
    () => ({}) as never,
    {} as unknown as RuntimePythonEnvironment,
    {} as unknown as PythonEnvironmentProvider,
    terminal,
    "/tmp/project",
    [] as DBTDiagnosticData[],
    {} as DeferConfig,
    onDiagnosticsChanged,
    detector,
    coreEngineDeps,
  );
};

describe("DBTCloudProjectIntegration coreEngineDependencies contract", () => {
  it("createEngine throws on a non-Fusion variant when coreEngineDependencies is omitted (the v0.61.0 regression — Factory<DBTCloudProjectIntegration> must wire these up)", () => {
    const integration = buildIntegration({ withCoreEngineDeps: false });
    expect(() =>
      (
        integration as unknown as {
          createEngine: () => unknown;
        }
      ).createEngine(),
    ).toThrow(/cannot construct CloudCoreCommandIntegration/);
  });

  it("createEngine clears the coreEngineDependencies guard once they are provided", () => {
    // Pinpoints the guard at the top of createEngine. Construction past the
    // guard reaches into CloudCoreCommandIntegration's super-chain which needs
    // real DBTCommandExecutionInfrastructure / RuntimePythonEnvironment
    // wiring; here we only prove the missing-deps gate is no longer hit.
    const integration = buildIntegration({ withCoreEngineDeps: true });
    expect(() =>
      (
        integration as unknown as {
          createEngine: () => unknown;
        }
      ).createEngine(),
    ).not.toThrow(/cannot construct CloudCoreCommandIntegration/);
  });
});
