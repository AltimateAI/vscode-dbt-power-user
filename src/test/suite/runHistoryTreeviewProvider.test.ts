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
import {
  ResultTreeItem,
  RunTreeItem,
} from "../../treeview_provider/runHistoryTreeItems";
import { RunHistoryTreeviewProvider } from "../../treeview_provider/runHistoryTreeviewProvider";

/**
 * Create a RunHistoryEntry for testing.
 * This matches the unified format from @altimateai/dbt-integration.
 */
const createEntry = (
  overrides: Partial<RunHistoryEntry> = {},
): RunHistoryEntry => ({
  id: "test-invocation",
  command: "run",
  args: [],
  completedAt: new Date(),
  projectName: "project",
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

describe("RunHistoryTreeviewProvider", () => {
  let service: RunHistoryService;
  let provider: RunHistoryTreeviewProvider;

  beforeEach(() => {
    service = new RunHistoryService();
    provider = new RunHistoryTreeviewProvider(service);
  });

  afterEach(() => {
    provider.dispose();
    service.dispose();
    jest.clearAllMocks();
  });

  describe("getTreeItem", () => {
    it("should return the element itself", () => {
      const entry = createEntry();
      service.addEntry(entry);
      const treeItem = new RunTreeItem(entry);

      expect(provider.getTreeItem(treeItem)).toBe(treeItem);
    });
  });

  describe("getChildren", () => {
    it("should return empty array when no history", () => {
      expect(provider.getChildren()).toEqual([]);
    });

    it("should return RunTreeItems at root level in reverse chronological order", () => {
      service.addEntry(createEntry({ id: "first" }));
      service.addEntry(
        createEntry({
          id: "second",
          results: [
            {
              name: "m1",
              uniqueId: "model.project.m1",
              status: "success",
              executionTime: 1.0,
              resourceType: "model",
            },
            {
              name: "m2",
              uniqueId: "model.project.m2",
              status: "error",
              executionTime: 0.5,
              resourceType: "model",
            },
          ],
        }),
      );

      const rootChildren = provider.getChildren() as RunTreeItem[];

      expect(rootChildren).toHaveLength(2);
      expect(rootChildren[0].entry.id).toBe("second");
      expect(rootChildren[1].entry.id).toBe("first");
    });

    it("should return ResultTreeItems for RunTreeItem children", () => {
      service.addEntry(
        createEntry({
          results: [
            {
              name: "model1",
              uniqueId: "model.project.model1",
              status: "success",
              executionTime: 1.0,
              resourceType: "model",
            },
            {
              name: "model2",
              uniqueId: "model.project.model2",
              status: "error",
              executionTime: 0.5,
              resourceType: "model",
            },
          ],
        }),
      );

      const runTreeItem = provider.getChildren()[0] as RunTreeItem;
      const children = provider.getChildren(runTreeItem) as ResultTreeItem[];

      expect(children).toHaveLength(2);
      expect(children[0].result.name).toBe("model1");
      expect(children[1].result.name).toBe("model2");
    });

    it("should return empty array for ResultTreeItem children", () => {
      service.addEntry(createEntry());

      const runTreeItem = provider.getChildren()[0] as RunTreeItem;
      const resultItem = provider.getChildren(runTreeItem)[0] as ResultTreeItem;

      expect(provider.getChildren(resultItem)).toEqual([]);
    });
  });

  describe("onDidChangeTreeData", () => {
    it("should fire when history changes", () => {
      const listener = jest.fn();
      provider.onDidChangeTreeData(listener);

      service.addEntry(createEntry());

      expect(listener).toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("should dispose without throwing", () => {
      expect(() => provider.dispose()).not.toThrow();
    });
  });
});
