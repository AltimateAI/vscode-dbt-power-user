import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { RunHistoryService } from "../../services/runHistoryService";

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
    it("should add a completed run to history", () => {
      const runResults = {
        metadata: {
          invocation_id: "test-invocation-123",
        },
        args: {
          which: "run",
          select: ["model1", "model2"],
        },
        results: [
          {
            unique_id: "model.project.model1",
            status: "success",
            execution_time: 1.5,
          },
        ],
        elapsed_time: 2.5,
      };

      const entry = service.addCompletedRun(runResults, "test-project");

      expect(entry.id).toBe("test-invocation-123");
      expect(entry.command).toBe("run");
      expect(entry.args).toEqual(["model1", "model2"]);
      expect(entry.projectName).toBe("test-project");
      expect(entry.elapsedTime).toBe(2.5);
      expect(entry.models).toHaveLength(1);
    });

    it("should generate id when invocation_id is missing", () => {
      const runResults = {
        metadata: {},
        results: [],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "test-project");

      expect(entry.id).toMatch(/^run-\d+$/);
    });

    it("should use 'unknown' command when args.which is missing", () => {
      const runResults = {
        metadata: {},
        results: [],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "test-project");

      expect(entry.command).toBe("unknown");
    });

    it("should use empty array when args.select is missing", () => {
      const runResults = {
        metadata: {},
        args: {},
        results: [],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "test-project");

      expect(entry.args).toEqual([]);
    });

    it("should add new runs at the beginning of history", () => {
      const runResults1 = {
        metadata: { invocation_id: "first" },
        results: [],
        elapsed_time: 1.0,
      };
      const runResults2 = {
        metadata: { invocation_id: "second" },
        results: [],
        elapsed_time: 1.0,
      };

      service.addCompletedRun(runResults1, "project");
      service.addCompletedRun(runResults2, "project");

      const history = service.getHistory();
      expect(history[0].id).toBe("second");
      expect(history[1].id).toBe("first");
    });

    it("should fire onHistoryChanged event when run is added", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      const runResults = {
        metadata: { invocation_id: "test" },
        results: [],
        elapsed_time: 1.0,
      };

      service.addCompletedRun(runResults, "project");

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({ id: "test" }),
      );
    });
  });

  describe("getHistory", () => {
    it("should return empty array when no runs added", () => {
      expect(service.getHistory()).toEqual([]);
    });

    it("should return a copy of history array", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [],
        elapsed_time: 1.0,
      };

      service.addCompletedRun(runResults, "project");

      const history1 = service.getHistory();
      const history2 = service.getHistory();

      expect(history1).not.toBe(history2);
      expect(history1).toEqual(history2);
    });
  });

  describe("parseResults", () => {
    it("should parse model results correctly", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [
          {
            unique_id: "model.jaffle_shop.stg_customers",
            status: "success",
            execution_time: 1.23,
            message: "OK",
          },
        ],
        elapsed_time: 2.0,
      };

      const entry = service.addCompletedRun(runResults, "project");
      const model = entry.models[0];

      expect(model.name).toBe("stg_customers");
      expect(model.uniqueId).toBe("model.jaffle_shop.stg_customers");
      expect(model.status).toBe("success");
      expect(model.executionTime).toBe(1.23);
      expect(model.message).toBe("OK");
      expect(model.resourceType).toBe("model");
    });

    it("should extract resource type from unique_id", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [
          { unique_id: "model.project.my_model", status: "success" },
          { unique_id: "test.project.my_test", status: "pass" },
          { unique_id: "seed.project.my_seed", status: "success" },
          { unique_id: "snapshot.project.my_snapshot", status: "success" },
        ],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].resourceType).toBe("model");
      expect(entry.models[1].resourceType).toBe("test");
      expect(entry.models[2].resourceType).toBe("seed");
      expect(entry.models[3].resourceType).toBe("snapshot");
    });

    it("should default to 'model' for unknown resource types", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [
          { unique_id: "unknown.project.something", status: "success" },
        ],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].resourceType).toBe("model");
    });

    it("should extract model name from unique_id", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [
          { unique_id: "model.jaffle_shop.stg_customers", status: "success" },
          {
            unique_id:
              "test.jaffle_shop.schema_test.accepted_values_customers_status",
            status: "pass",
          },
        ],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].name).toBe("stg_customers");
      expect(entry.models[1].name).toBe("accepted_values_customers_status");
    });

    it("should handle missing status with default 'error'", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [{ unique_id: "model.project.model1" }],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].status).toBe("error");
    });

    it("should handle missing execution_time with default 0", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [{ unique_id: "model.project.model1", status: "success" }],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].executionTime).toBe(0);
    });

    it("should handle unique_id without dots", () => {
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [{ unique_id: "simplemodel", status: "success" }],
        elapsed_time: 1.0,
      };

      const entry = service.addCompletedRun(runResults, "project");

      expect(entry.models[0].name).toBe("simplemodel");
      expect(entry.models[0].resourceType).toBe("model"); // defaults to model
    });
  });

  describe("dispose", () => {
    it("should dispose event emitter", () => {
      // Just verify dispose doesn't throw
      expect(() => service.dispose()).not.toThrow();
    });
  });
});
