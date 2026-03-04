import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { RunHistoryService } from "../../services/runHistoryService";
import { createEntry } from "../fixtures/runHistory";

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
      const entry = createEntry({ id: "test-123", command: "dbt run" });

      const result = service.addEntry(entry);

      expect(result).toBe(entry);
      expect(result.id).toBe("test-123");
    });

    it("should add new runs at the beginning of history", () => {
      service.addEntry(createEntry({ id: "first", command: "dbt run" }));
      service.addEntry(createEntry({ id: "second", command: "dbt build" }));

      const entries = service.entries;
      expect(entries[0].id).toBe("second");
      expect(entries[1].id).toBe("first");
    });

    it("should fire onHistoryChanged event when entry is added", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      const entry = createEntry({ id: "test-invocation", command: "dbt run" });
      service.addEntry(entry);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({ id: "test-invocation" }),
      );
    });

    it("should cap history at MAX_ENTRIES", () => {
      for (let i = 0; i < 55; i++) {
        service.addEntry(
          createEntry({
            id: `run-${i}`,
            command: "dbt run",
            args: [`model_${i}`],
          }),
        );
      }

      expect(service.entries).toHaveLength(50);
      expect(service.entries[0].id).toBe("run-54");
      expect(service.entries[49].id).toBe("run-5");
    });
  });

  describe("deduplication", () => {
    it("should deduplicate by invocation ID (fs.watch double-fire guard)", () => {
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "dbt build",
          args: ["my_model"],
          elapsedTime: 1.0,
        }),
      );
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "dbt build",
          args: ["my_model"],
          elapsedTime: 1.0,
        }),
      );

      expect(service.entries).toHaveLength(1);
    });

    it("should keep separate entries for same command with different invocation IDs", () => {
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "dbt build",
          args: ["my_model"],
          elapsedTime: 1.0,
        }),
      );
      service.addEntry(
        createEntry({
          id: "inv-2",
          command: "dbt build",
          args: ["my_model"],
          elapsedTime: 2.0,
        }),
      );

      expect(service.entries).toHaveLength(2);
      expect(service.entries[0].id).toBe("inv-2");
      expect(service.entries[0].elapsedTime).toBe(2.0);
      expect(service.entries[1].id).toBe("inv-1");
      expect(service.entries[1].elapsedTime).toBe(1.0);
    });

    it("should keep separate entries for different commands", () => {
      service.addEntry(
        createEntry({ id: "inv-1", command: "dbt run", args: ["my_model"] }),
      );
      service.addEntry(
        createEntry({ id: "inv-2", command: "dbt build", args: ["my_model"] }),
      );

      expect(service.entries).toHaveLength(2);
    });

    it("should update in place when same invocation ID is added again", () => {
      service.addEntry(
        createEntry({ id: "inv-1", command: "dbt run", args: ["model_a"] }),
      );
      service.addEntry(
        createEntry({ id: "inv-2", command: "dbt build", args: ["model_b"] }),
      );
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "dbt run",
          args: ["model_a"],
          elapsedTime: 9.0,
        }),
      );

      expect(service.entries).toHaveLength(2);
      // Position preserved: inv-2 at [0], inv-1 (updated) at [1]
      expect(service.entries[0].id).toBe("inv-2");
      expect(service.entries[1].id).toBe("inv-1");
      expect(service.entries[1].elapsedTime).toBe(9.0);
    });

    it("should fire event for deduplicated entries", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      service.addEntry(
        createEntry({ id: "inv-1", command: "dbt build", args: ["my_model"] }),
      );
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "dbt build",
          args: ["my_model"],
          elapsedTime: 5.0,
        }),
      );

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({ id: "inv-1", elapsedTime: 5.0 }),
      );
    });
  });

  describe("entries", () => {
    it("should return empty array when no runs added", () => {
      expect(service.entries).toEqual([]);
    });
  });

  describe("dispose", () => {
    it("should dispose without throwing", () => {
      expect(() => service.dispose()).not.toThrow();
    });
  });
});
