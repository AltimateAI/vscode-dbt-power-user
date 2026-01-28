import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import {
  RunHistoryEntry,
  RunHistoryService,
} from "../../services/runHistoryService";

/**
 * Create a RunHistoryEntry for testing.
 * This matches the unified format from @altimateai/dbt-integration.
 */
const createEntry = (
  overrides: Partial<RunHistoryEntry> = {},
): RunHistoryEntry => ({
  id: "test-invocation",
  command: "run",
  args: ["model1"],
  completedAt: new Date(),
  projectName: "test-project",
  results: [
    {
      name: "model1",
      uniqueId: "model.project.model1",
      status: "success",
      executionTime: 1.0,
      resourceType: "model",
    },
  ],
  elapsedTime: 1.0,
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

  describe("addEntry", () => {
    it("should store the entry and return it", () => {
      const entry = createEntry({ id: "test-123" });

      const result = service.addEntry(entry);

      expect(result).toBe(entry);
      expect(result.id).toBe("test-123");
    });

    it("should add new runs at the beginning of history", () => {
      service.addEntry(createEntry({ id: "first" }));
      service.addEntry(createEntry({ id: "second" }));

      const history = service.getHistory();
      expect(history[0].id).toBe("second");
      expect(history[1].id).toBe("first");
    });

    it("should fire onHistoryChanged event when entry is added", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      const entry = createEntry({ id: "test-invocation" });
      service.addEntry(entry);

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
      service.addEntry(createEntry());

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
