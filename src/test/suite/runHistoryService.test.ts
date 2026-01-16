import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { RunHistoryService } from "../../services/runHistoryService";

// Matches structure from @altimateai/dbt-integration RunResultsData
const createRunResults = (overrides: Record<string, unknown> = {}) => ({
  metadata: { invocation_id: "test-invocation" },
  args: { which: "run", select: ["model1"] },
  results: [{ unique_id: "model.project.model1", status: "success" }],
  elapsed_time: 1.0,
  ...overrides,
});

describe("RunHistoryService", () => {
  let service: RunHistoryService;

  beforeEach(() => {
    service = new RunHistoryService();
  });

  afterEach(() => {
    service.dispose();
    jest.clearAllMocks();
  });

  describe("addCompletedRun", () => {
    it("should parse RunResultsData structure correctly", () => {
      const runResults = createRunResults({
        metadata: { invocation_id: "test-123" },
        args: { which: "build", select: ["+my_model+"] },
        results: [
          {
            unique_id: "model.jaffle.stg_customers",
            status: "success",
            execution_time: 1.23,
            message: "CREATE TABLE",
          },
        ],
        elapsed_time: 2.5,
      });

      const entry = service.addCompletedRun(runResults, "test-project");

      expect(entry.id).toBe("test-123");
      expect(entry.command).toBe("build");
      expect(entry.args).toEqual(["+my_model+"]);
      expect(entry.elapsedTime).toBe(2.5);
      expect(entry.projectName).toBe("test-project");
      expect(entry.models[0]).toMatchObject({
        name: "stg_customers",
        uniqueId: "model.jaffle.stg_customers",
        status: "success",
        executionTime: 1.23,
        message: "CREATE TABLE",
        resourceType: "model",
      });
    });

    it("should handle minimal/missing fields with defaults", () => {
      const entry = service.addCompletedRun(
        { results: [{ unique_id: "model.p.m" }], elapsed_time: 0.5 },
        "project",
      );

      expect(entry.id).toMatch(/^run-\d+$/);
      expect(entry.command).toBe("unknown");
      expect(entry.args).toEqual([]);
      expect(entry.models[0].status).toBe("unknown");
      expect(entry.models[0].executionTime).toBeNull();
    });

    it.each([
      ["model.project.my_model", "model", "my_model"],
      ["test.project.not_null_id", "test", "not_null_id"],
      ["seed.project.raw_data", "seed", "raw_data"],
      ["snapshot.project.orders_snap", "snapshot", "orders_snap"],
      ["unknown.project.something", "model", "something"],
      ["simplemodel", "model", "simplemodel"],
    ])(
      "should parse unique_id %s as resourceType=%s, name=%s",
      (uniqueId, expectedType, expectedName) => {
        const entry = service.addCompletedRun(
          { results: [{ unique_id: uniqueId }], elapsed_time: 0.5 },
          "project",
        );

        expect(entry.models[0].resourceType).toBe(expectedType);
        expect(entry.models[0].name).toBe(expectedName);
      },
    );

    it("should add new runs at the beginning of history", () => {
      service.addCompletedRun(
        createRunResults({ metadata: { invocation_id: "first" } }),
        "project",
      );
      service.addCompletedRun(
        createRunResults({ metadata: { invocation_id: "second" } }),
        "project",
      );

      const history = service.getHistory();
      expect(history[0].id).toBe("second");
      expect(history[1].id).toBe("first");
    });

    it("should fire onHistoryChanged event when run is added", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      service.addCompletedRun(createRunResults(), "project");

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({ id: "test-invocation" }),
      );
    });
  });

  describe("getHistory", () => {
    it("should return empty array when no runs added", () => {
      expect(service.getHistory()).toEqual([]);
    });

    it("should return a copy of history array", () => {
      service.addCompletedRun(createRunResults(), "project");

      const history1 = service.getHistory();
      const history2 = service.getHistory();

      expect(history1).not.toBe(history2);
      expect(history1).toEqual(history2);
    });
  });

  describe("dispose", () => {
    it("should dispose without throwing", () => {
      expect(() => service.dispose()).not.toThrow();
    });
  });
});
