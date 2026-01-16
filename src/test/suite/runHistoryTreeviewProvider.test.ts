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

const createRunResults = (overrides: Record<string, unknown> = {}) => ({
  metadata: { invocation_id: "test-invocation" },
  results: [{ unique_id: "model.project.model1", status: "success" }],
  elapsed_time: 1.0,
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
      const entry = service.addCompletedRun(createRunResults(), "project");
      const treeItem = new RunTreeItem(entry);

      expect(provider.getTreeItem(treeItem)).toBe(treeItem);
    });
  });

  describe("getChildren", () => {
    it("should return empty array when no history", () => {
      expect(provider.getChildren()).toEqual([]);
    });

    it("should return RunTreeItems at root level in reverse chronological order", () => {
      service.addCompletedRun(
        createRunResults({ metadata: { invocation_id: "first" } }),
        "project",
      );
      service.addCompletedRun(
        createRunResults({
          metadata: { invocation_id: "second" },
          results: [
            { unique_id: "model.project.m1", status: "success" },
            { unique_id: "model.project.m2", status: "error" },
          ],
        }),
        "project",
      );

      const rootChildren = provider.getChildren() as RunTreeItem[];

      expect(rootChildren).toHaveLength(2);
      expect(rootChildren[0].entry.id).toBe("second");
      expect(rootChildren[1].entry.id).toBe("first");
    });

    it("should return ModelResultTreeItems for RunTreeItem children", () => {
      service.addCompletedRun(
        createRunResults({
          results: [
            { unique_id: "model.project.model1", status: "success" },
            { unique_id: "model.project.model2", status: "error" },
          ],
        }),
        "project",
      );

      const runTreeItem = provider.getChildren()[0] as RunTreeItem;
      const children = provider.getChildren(
        runTreeItem,
      ) as ModelResultTreeItem[];

      expect(children).toHaveLength(2);
      expect(children[0].result.name).toBe("model1");
      expect(children[1].result.name).toBe("model2");
    });

    it("should return empty array for ModelResultTreeItem children", () => {
      service.addCompletedRun(createRunResults(), "project");

      const runTreeItem = provider.getChildren()[0] as RunTreeItem;
      const modelItem = provider.getChildren(
        runTreeItem,
      )[0] as ModelResultTreeItem;

      expect(provider.getChildren(modelItem)).toEqual([]);
    });
  });

  describe("onDidChangeTreeData", () => {
    it("should fire when history changes", () => {
      const listener = jest.fn();
      provider.onDidChangeTreeData(listener);

      service.addCompletedRun(createRunResults(), "project");

      expect(listener).toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("should dispose without throwing", () => {
      expect(() => provider.dispose()).not.toThrow();
    });
  });
});
