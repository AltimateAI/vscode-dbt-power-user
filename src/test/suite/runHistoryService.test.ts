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
      const entry = createEntry({ id: "test-123" });

      const result = service.addEntry(entry);

      expect(result).toBe(entry);
      expect(result.id).toBe("test-123");
    });

    it("should add new runs at the beginning of history", () => {
      service.addEntry(createEntry({ id: "first", command: "run" }));
      service.addEntry(createEntry({ id: "second", command: "build" }));

      const entries = service.entries;
      expect(entries[0].id).toBe("second");
      expect(entries[1].id).toBe("first");
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

    it("should cap history at MAX_ENTRIES", () => {
      for (let i = 0; i < 55; i++) {
        service.addEntry(createEntry({ id: `run-${i}`, args: [`model_${i}`] }));
      }

      expect(service.entries).toHaveLength(50);
      expect(service.entries[0].id).toBe("run-54");
      expect(service.entries[49].id).toBe("run-5");
    });
  });

  describe("deduplication", () => {
    it("should deduplicate by command + args + project, not invocation ID", () => {
      service.addEntry(
        createEntry({
          id: "inv-1",
          command: "build",
          args: ["int_customers"],
          elapsedTime: 1.0,
        }),
      );
      service.addEntry(
        createEntry({
          id: "inv-2",
          command: "build",
          args: ["int_customers"],
          elapsedTime: 2.0,
        }),
      );

      expect(service.entries).toHaveLength(1);
      expect(service.entries[0].id).toBe("inv-2");
      expect(service.entries[0].elapsedTime).toBe(2.0);
    });

    it("should keep separate entries for different commands", () => {
      service.addEntry(createEntry({ command: "run", args: ["my_model"] }));
      service.addEntry(createEntry({ command: "build", args: ["my_model"] }));

      expect(service.entries).toHaveLength(2);
    });

    it("should keep separate entries for different args", () => {
      service.addEntry(createEntry({ command: "build", args: ["model_a"] }));
      service.addEntry(createEntry({ command: "build", args: ["model_b"] }));

      expect(service.entries).toHaveLength(2);
    });

    it("should update existing entry in place preserving position", () => {
      service.addEntry(
        createEntry({ command: "run", args: ["model_a"], id: "first" }),
      );
      service.addEntry(
        createEntry({ command: "build", args: ["model_b"], id: "second" }),
      );
      service.addEntry(
        createEntry({
          command: "run",
          args: ["model_a"],
          id: "third",
          elapsedTime: 9.0,
        }),
      );

      expect(service.entries).toHaveLength(2);
      // Order preserved: second at [0], first (updated) at [1]
      expect(service.entries[0].id).toBe("second");
      expect(service.entries[1].id).toBe("third");
      expect(service.entries[1].elapsedTime).toBe(9.0);
    });

    it("should fire event for deduplicated entries", () => {
      const listener = jest.fn();
      service.onHistoryChanged(listener);

      service.addEntry(
        createEntry({ command: "build", args: ["my_model"], id: "inv-1" }),
      );
      service.addEntry(
        createEntry({
          command: "build",
          args: ["my_model"],
          id: "inv-2",
          elapsedTime: 5.0,
        }),
      );

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith(
        expect.objectContaining({ id: "inv-2", elapsedTime: 5.0 }),
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
