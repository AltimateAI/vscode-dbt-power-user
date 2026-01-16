/**
 * Integration tests for RunResultsData structure compatibility with @altimateai/dbt-integration
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { RunHistoryService } from "../../services/runHistoryService";

// TODO: Remove when @altimateai/dbt-integration exports these types
interface DbtIntegrationRunResultItem {
  unique_id: string;
  status?: string;
  execution_time?: number;
  message?: string;
}

interface DbtIntegrationRunResultsData {
  results: DbtIntegrationRunResultItem[];
  metadata?: {
    dbt_schema_version?: string;
    dbt_version?: string;
    generated_at?: string;
    invocation_id?: string;
  };
  args?: {
    which?: string;
    select?: string[];
  };
  elapsed_time?: number;
}

describe("RunResultsData Integration Tests", () => {
  let service: RunHistoryService;

  beforeEach(() => {
    service = new RunHistoryService();
  });

  afterEach(() => {
    service.dispose();
    jest.clearAllMocks();
  });

  it("should parse full RunResultsData structure from dbt-integration", () => {
    const runResults: DbtIntegrationRunResultsData = {
      metadata: {
        dbt_schema_version:
          "https://schemas.getdbt.com/dbt/run-results/v6.json",
        dbt_version: "1.10.0",
        generated_at: "2026-01-02T22:28:15.822938Z",
        invocation_id: "test-invocation-123",
      },
      args: {
        which: "run",
        select: ["model1", "+model2"],
      },
      results: [
        {
          unique_id: "model.project.my_model",
          status: "success",
          execution_time: 1.5,
          message: "CREATE TABLE",
        },
        {
          unique_id: "test.project.not_null_my_model_id",
          status: "pass",
          execution_time: 0.2,
        },
        {
          unique_id: "seed.project.raw_data",
          status: "success",
          execution_time: 0.5,
        },
        {
          unique_id: "snapshot.project.orders_snapshot",
          status: "success",
          execution_time: 2.0,
          message: "OK 50 inserted",
        },
      ],
      elapsed_time: 4.2,
    };

    const entry = service.addCompletedRun(runResults as any, "test-project");

    expect(entry.id).toBe("test-invocation-123");
    expect(entry.command).toBe("run");
    expect(entry.args).toEqual(["model1", "+model2"]);
    expect(entry.elapsedTime).toBe(4.2);
    expect(entry.projectName).toBe("test-project");
    expect(entry.models).toHaveLength(4);

    expect(entry.models[0].resourceType).toBe("model");
    expect(entry.models[1].resourceType).toBe("test");
    expect(entry.models[2].resourceType).toBe("seed");
    expect(entry.models[3].resourceType).toBe("snapshot");

    expect(entry.models[0].uniqueId).toBe("model.project.my_model");
    expect(entry.models[0].name).toBe("my_model");
    expect(entry.models[0].status).toBe("success");
    expect(entry.models[0].executionTime).toBe(1.5);
    expect(entry.models[0].message).toBe("CREATE TABLE");
  });

  it("should handle minimal/missing fields with defaults", () => {
    const minimalRunResults: DbtIntegrationRunResultsData = {
      results: [{ unique_id: "model.project.minimal" }],
      elapsed_time: 0.5,
    };

    const entry = service.addCompletedRun(minimalRunResults as any, "project");

    expect(entry.id).toMatch(/^run-\d+$/);
    expect(entry.command).toBe("unknown");
    expect(entry.args).toEqual([]);
    expect(entry.models[0].status).toBe("unknown");
    expect(entry.models[0].executionTime).toBeNull();
  });

  it("should handle various status types", () => {
    const runResults: DbtIntegrationRunResultsData = {
      results: [
        { unique_id: "model.p.success_model", status: "success" },
        {
          unique_id: "model.p.error_model",
          status: "error",
          message: "DB error",
        },
        {
          unique_id: "test.p.fail_test",
          status: "fail",
          message: "Test failed",
        },
        { unique_id: "model.p.skipped_model", status: "skipped" },
      ],
      elapsed_time: 1.0,
    };

    const entry = service.addCompletedRun(runResults as any, "project");

    expect(entry.models.map((m) => m.status)).toEqual([
      "success",
      "error",
      "fail",
      "skipped",
    ]);
    expect(entry.models[1].message).toBe("DB error");
    expect(entry.models[2].message).toBe("Test failed");
  });
});
