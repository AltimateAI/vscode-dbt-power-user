import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Uri, window } from "vscode";
import { RunModel } from "../../commands/runModel";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../../dbt_client/event/manifestCacheChangedEvent";
import { QueryManifestService } from "../../services/queryManifestService";

describe("RunModel singular test detection", () => {
  let mockContainer: jest.Mocked<DBTProjectContainer>;
  let mockQueryManifestService: jest.Mocked<QueryManifestService>;
  let runModel: RunModel;

  const singularTestPath =
    "/workspace/jaffle/tests/singular_nonnull_orders.sql";
  const modelPath = "/workspace/jaffle/models/marts/orders.sql";

  const makeEvent = (): ManifestCacheProjectAddedEvent => {
    const testMetaMap = new Map<string, any>();
    // Singular test: no test_metadata, path matches file on disk.
    testMetaMap.set("singular_nonnull_orders", {
      path: singularTestPath,
      database: "db",
      schema: "analytics",
      alias: "singular_nonnull_orders",
      raw_sql: "select * from {{ ref('orders') }} where customer_id is null",
      depends_on: { macros: [], nodes: [], sources: [] },
      unique_id: "test.jaffle.singular_nonnull_orders",
    });
    // Generic test: has test_metadata, should not match even if path matches
    // (generic tests live in schema.yml, not .sql files).
    testMetaMap.set("not_null_orders_customer_id", {
      path: "/workspace/jaffle/models/marts/schema.yml",
      database: "db",
      schema: "analytics",
      alias: "not_null_orders_customer_id",
      raw_sql: "",
      test_metadata: { name: "not_null", kwargs: {} as any },
      attached_node: "model.jaffle.orders",
      depends_on: { macros: [], nodes: [], sources: [] },
      unique_id: "test.jaffle.not_null_orders_customer_id",
    });

    return {
      project: {} as any,
      nodeMetaMap: new Map() as any,
      macroMetaMap: new Map() as any,
      metricMetaMap: new Map() as any,
      sourceMetaMap: new Map() as any,
      graphMetaMap: {} as any,
      testMetaMap: testMetaMap as any,
      docMetaMap: new Map() as any,
      exposureMetaMap: new Map() as any,
      functionMetaMap: new Map() as any,
      modelDepthMap: new Map() as any,
    };
  };

  const setActiveEditor = (fsPath: string | null) => {
    Object.defineProperty(window, "activeTextEditor", {
      value:
        fsPath === null
          ? undefined
          : {
              document: {
                uri: Uri.file(fsPath),
              },
            },
      writable: true,
      configurable: true,
    });
  };

  beforeEach(() => {
    mockContainer = {
      runModel: jest.fn(),
      runTest: jest.fn(),
      runModelTest: jest.fn(),
    } as unknown as jest.Mocked<DBTProjectContainer>;

    mockQueryManifestService = {
      getEventByDocument: jest.fn().mockReturnValue(makeEvent()),
    } as unknown as jest.Mocked<QueryManifestService>;

    runModel = new RunModel(mockContainer, mockQueryManifestService);
  });

  it("routes singular test files to runTest when 'Test dbt Model' is invoked", () => {
    setActiveEditor(singularTestPath);

    runModel.runTestsOnActiveWindow();

    expect(mockContainer.runTest).toHaveBeenCalledWith(
      expect.anything(),
      "singular_nonnull_orders",
    );
    expect(mockContainer.runModelTest).not.toHaveBeenCalled();
  });

  it("falls back to runModelTest for model files in 'Test dbt Model'", () => {
    setActiveEditor(modelPath);

    runModel.runTestsOnActiveWindow();

    expect(mockContainer.runModelTest).toHaveBeenCalled();
    expect(mockContainer.runTest).not.toHaveBeenCalled();
  });

  it("routes singular test files to runTest when 'Run Test' is invoked from command palette", () => {
    setActiveEditor(singularTestPath);

    // RunModelType.TEST from command palette arrives via runModelOnActiveWindow
    // (runModelOnNodeTreeItem falls through to runModelOnActiveWindow when
    // there is no tree item context).
    runModel.runModelOnActiveWindow();

    expect(mockContainer.runTest).toHaveBeenCalledWith(
      expect.anything(),
      "singular_nonnull_orders",
    );
    expect(mockContainer.runModel).not.toHaveBeenCalled();
  });

  it("runs regular models normally when the active file is not a test", () => {
    setActiveEditor(modelPath);

    runModel.runModelOnActiveWindow();

    expect(mockContainer.runModel).toHaveBeenCalled();
    expect(mockContainer.runTest).not.toHaveBeenCalled();
  });

  it("falls back to runModelTest when manifest has no matching test", () => {
    setActiveEditor(singularTestPath);
    mockQueryManifestService.getEventByDocument = jest
      .fn()
      .mockReturnValue(undefined) as any;

    runModel.runTestsOnActiveWindow();

    expect(mockContainer.runModelTest).toHaveBeenCalled();
    expect(mockContainer.runTest).not.toHaveBeenCalled();
  });
});
