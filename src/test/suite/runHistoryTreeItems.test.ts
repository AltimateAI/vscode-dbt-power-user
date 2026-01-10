import { describe, expect, it } from "@jest/globals";
import { TreeItemCollapsibleState } from "vscode";
import {
  ModelRunResult,
  RunHistoryEntry,
} from "../../services/runHistoryService";
import {
  ModelResultTreeItem,
  RunTreeItem,
} from "../../treeview_provider/runHistoryTreeItems";

describe("RunHistoryTreeItems", () => {
  describe("RunTreeItem", () => {
    const createEntry = (
      overrides: Partial<RunHistoryEntry> = {},
    ): RunHistoryEntry => ({
      id: "test-id",
      command: "run",
      args: [],
      completedAt: new Date("2024-01-15T10:30:00"),
      projectName: "test-project",
      models: [],
      elapsedTime: 5.5,
      ...overrides,
    });

    const createModel = (
      overrides: Partial<ModelRunResult> = {},
    ): ModelRunResult => ({
      name: "m1",
      uniqueId: "model.p.m1",
      status: "success",
      executionTime: 1,
      resourceType: "model",
      ...overrides,
    });

    it("should format label with command and args", () => {
      const item = new RunTreeItem(
        createEntry({ command: "build", args: ["+my_model+"] }),
      );
      expect(item.label).toBe("dbt build +my_model+");
    });

    it("should set collapsibleState based on models", () => {
      const withModels = new RunTreeItem(
        createEntry({ models: [createModel()] }),
      );
      const withoutModels = new RunTreeItem(createEntry({ models: [] }));

      expect(withModels.collapsibleState).toBe(
        TreeItemCollapsibleState.Expanded,
      );
      expect(withoutModels.collapsibleState).toBe(
        TreeItemCollapsibleState.None,
      );
    });

    it("should show duration and pass count in description", () => {
      const allPass = new RunTreeItem(
        createEntry({
          elapsedTime: 5.5,
          models: [
            createModel(),
            createModel({ name: "m2", uniqueId: "model.p.m2" }),
          ],
        }),
      );
      const someFail = new RunTreeItem(
        createEntry({
          models: [
            createModel({ status: "success" }),
            createModel({
              name: "m2",
              uniqueId: "model.p.m2",
              status: "error",
            }),
          ],
        }),
      );

      expect(allPass.description).toContain("5.50s");
      expect(allPass.description).toContain("2 passed");
      expect(someFail.description).toContain("1/2 passed");
    });

    it.each([
      ["success", "pass"],
      ["pass", "pass"],
      ["error", "error"],
      ["fail", "error"],
    ])("should use %s icon for %s status", (status, expectedIcon) => {
      const item = new RunTreeItem(
        createEntry({ models: [createModel({ status })] }),
      );
      expect((item.iconPath as any).id).toBe(expectedIcon);
    });

    it("should include project, duration, and invocation in tooltip", () => {
      const item = new RunTreeItem(
        createEntry({
          projectName: "my-project",
          elapsedTime: 12.34,
          id: "abc-123",
        }),
      );

      expect(item.tooltip).toContain("Project: my-project");
      expect(item.tooltip).toContain("Duration: 12.34s");
      expect(item.tooltip).toContain("Invocation: abc-123");
    });

    it("should have runHistoryEntry contextValue", () => {
      expect(new RunTreeItem(createEntry()).contextValue).toBe(
        "runHistoryEntry",
      );
    });
  });

  describe("ModelResultTreeItem", () => {
    const createResult = (
      overrides: Partial<ModelRunResult> = {},
    ): ModelRunResult => ({
      name: "test_model",
      uniqueId: "model.project.test_model",
      status: "success",
      executionTime: 2.5,
      resourceType: "model",
      ...overrides,
    });

    it("should use model name as label with None collapsibleState", () => {
      const item = new ModelResultTreeItem(
        createResult({ name: "stg_customers" }),
      );

      expect(item.label).toBe("stg_customers");
      expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
    });

    it("should include resource type and execution time in description", () => {
      const item = new ModelResultTreeItem(
        createResult({ resourceType: "test", executionTime: 3.45 }),
      );

      expect(item.description).toContain("test");
      expect(item.description).toContain("3.45s");
    });

    it.each([
      ["success", "check"],
      ["pass", "check"],
      ["error", "x"],
      ["fail", "x"],
      ["skipped", "debug-step-over"],
      ["skip", "debug-step-over"],
      ["unknown", "question"],
    ])("should use correct icon for %s status", (status, expectedIcon) => {
      const item = new ModelResultTreeItem(createResult({ status }));
      expect((item.iconPath as any).id).toBe(expectedIcon);
    });

    it("should include all fields in tooltip", () => {
      const item = new ModelResultTreeItem(
        createResult({
          name: "my_model",
          resourceType: "seed",
          status: "success",
          executionTime: 4.56,
          message: "Database error",
          uniqueId: "model.jaffle.customers",
        }),
      );

      expect(item.tooltip).toContain("Name: my_model");
      expect(item.tooltip).toContain("Type: seed");
      expect(item.tooltip).toContain("Status: success");
      expect(item.tooltip).toContain("Execution Time: 4.56s");
      expect(item.tooltip).toContain("Message: Database error");
      expect(item.tooltip).toContain("Unique ID: model.jaffle.customers");
    });

    it("should not include message in tooltip when absent", () => {
      const item = new ModelResultTreeItem(
        createResult({ message: undefined }),
      );
      expect(item.tooltip).not.toContain("Message:");
    });

    it.each(["model", "test", "seed", "snapshot"] as const)(
      "should set contextValue for %s resource type",
      (resourceType) => {
        const item = new ModelResultTreeItem(createResult({ resourceType }));
        expect(item.contextValue).toBe(`runHistoryModel.${resourceType}`);
      },
    );
  });
});
