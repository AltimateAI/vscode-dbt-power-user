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
      service.addEntry(createEntry({ id: "first" }));
      service.addEntry(createEntry({ id: "second" }));

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
        service.addEntry(createEntry({ id: `run-${i}` }));
      }

      expect(service.entries).toHaveLength(50);
      expect(service.entries[0].id).toBe("run-54");
      expect(service.entries[49].id).toBe("run-5");
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
