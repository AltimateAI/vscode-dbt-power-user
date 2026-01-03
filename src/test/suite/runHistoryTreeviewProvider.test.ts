import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { RunHistoryService } from "../../services/runHistoryService";
import {
  ModelResultTreeItem,
  RunTreeItem,
} from "../../treeview_provider/runHistoryTreeItems";
import { RunHistoryTreeviewProvider } from "../../treeview_provider/runHistoryTreeviewProvider";

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
      const runResults = {
        metadata: { invocation_id: "test" },
        results: [],
        elapsed_time: 1.0,
      };
      const entry = service.addCompletedRun(runResults, "project");
      const treeItem = new RunTreeItem(entry);

      const result = provider.getTreeItem(treeItem);

      expect(result).toBe(treeItem);
    });
  });

  describe("getChildren", () => {
    it("should return empty array when no history", () => {
      const children = provider.getChildren();

      expect(children).toEqual([]);
    });

    it("should return RunTreeItems for root level", () => {
      const runResults = {
        metadata: { invocation_id: "test-1" },
        results: [{ unique_id: "model.project.model1", status: "success" }],
        elapsed_time: 1.0,
      };
      service.addCompletedRun(runResults, "project");

      const children = provider.getChildren();

      expect(children).toHaveLength(1);
      // Check it's a RunTreeItem by verifying it has the entry property
      expect((children[0] as RunTreeItem).entry).toBeDefined();
      expect((children[0] as RunTreeItem).entry.id).toBe("test-1");
    });

    it("should return ModelResultTreeItems for RunTreeItem children", () => {
      const runResults = {
        metadata: { invocation_id: "test-1" },
        results: [
          { unique_id: "model.project.model1", status: "success" },
          { unique_id: "model.project.model2", status: "error" },
        ],
        elapsed_time: 1.0,
      };
      service.addCompletedRun(runResults, "project");

      // Get the RunTreeItem from the provider
      const rootChildren = provider.getChildren();
      const runTreeItem = rootChildren[0] as RunTreeItem;

      const children = provider.getChildren(runTreeItem);

      expect(children).toHaveLength(2);
      // Check they are ModelResultTreeItems by verifying they have the result property
      expect((children[0] as ModelResultTreeItem).result).toBeDefined();
      expect((children[0] as ModelResultTreeItem).result.name).toBe("model1");
      expect((children[1] as ModelResultTreeItem).result.name).toBe("model2");
    });

    it("should return empty array for ModelResultTreeItem children", () => {
      const runResults = {
        metadata: { invocation_id: "test-1" },
        results: [{ unique_id: "model.project.model1", status: "success" }],
        elapsed_time: 1.0,
      };
      service.addCompletedRun(runResults, "project");

      // Get a ModelResultTreeItem through the provider
      const rootChildren = provider.getChildren();
      const runTreeItem = rootChildren[0] as RunTreeItem;
      const modelChildren = provider.getChildren(runTreeItem);
      const modelItem = modelChildren[0] as ModelResultTreeItem;

      const children = provider.getChildren(modelItem);

      expect(children).toEqual([]);
    });

    it("should return runs in reverse chronological order", () => {
      service.addCompletedRun(
        {
          metadata: { invocation_id: "first" },
          results: [],
          elapsed_time: 1.0,
        },
        "project",
      );
      service.addCompletedRun(
        {
          metadata: { invocation_id: "second" },
          results: [],
          elapsed_time: 1.0,
        },
        "project",
      );

      const children = provider.getChildren() as RunTreeItem[];

      expect(children[0].entry.id).toBe("second");
      expect(children[1].entry.id).toBe("first");
    });
  });

  describe("onDidChangeTreeData", () => {
    it("should fire when history changes", () => {
      const listener = jest.fn();
      provider.onDidChangeTreeData(listener);

      service.addCompletedRun(
        { metadata: { invocation_id: "test" }, results: [], elapsed_time: 1.0 },
        "project",
      );

      expect(listener).toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("should dispose without throwing", () => {
      expect(() => provider.dispose()).not.toThrow();
    });
  });
});
