import { Uri } from "vscode";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import { MockEventEmitter } from "../common";

/**
 * Creates a jest-mocked DBTProjectContainer with configurable behavior.
 */
export function createMockDBTProjectContainer(
  overrides: {
    projectRootFsPath?: string;
    packageName?: string;
  } = {},
): jest.Mocked<DBTProjectContainer> {
  const { projectRootFsPath = "/mock/project", packageName = "my_project" } =
    overrides;

  const manifestChangedEmitter =
    new MockEventEmitter<ManifestCacheChangedEvent>();

  const container = {
    getProjectRootpath: jest
      .fn()
      .mockReturnValue(
        projectRootFsPath ? ({ fsPath: projectRootFsPath } as Uri) : undefined,
      ),
    getPackageName: jest.fn().mockReturnValue(packageName),
    onManifestChanged: manifestChangedEmitter.event,
    runModelTest: jest.fn(),
    runTest: jest.fn(),
    runModel: jest.fn(),
    buildModel: jest.fn(),
    compileModel: jest.fn(),
    compileQuery: jest.fn(),
    executeSQL: jest.fn(),
    showCompiledSQL: jest.fn(),
    showRunSQL: jest.fn(),
    generateSchemaYML: jest.fn(),
    generateDocs: jest.fn(),
    findDBTProject: jest.fn(),
    getFromWorkspaceState: jest.fn().mockReturnValue(undefined),
    // Expose emitter so tests can fire events
    _manifestChangedEmitter: manifestChangedEmitter,
  } as any;

  return container;
}
