import { describe, expect, it } from "@jest/globals";
import { TreeItemCollapsibleState } from "vscode";
import {
  RunHistoryEntry,
  RunResultEntry,
} from "../../services/runHistoryService";
import {
  ResultTreeItem,
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
      results: [],
      elapsedTime: 5.5,
      ...overrides,
    });

    const createResult = (
      overrides: Partial<RunResultEntry> = {},
    ): RunResultEntry => ({
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

    it("should set collapsibleState based on results", () => {
      const withResults = new RunTreeItem(
        createEntry({ results: [createResult()] }),
      );
      const withoutResults = new RunTreeItem(createEntry({ results: [] }));

      expect(withResults.collapsibleState).toBe(
        TreeItemCollapsibleState.Expanded,
      );
      expect(withoutResults.collapsibleState).toBe(
        TreeItemCollapsibleState.None,
      );
    });

    it("should show duration and pass count in description", () => {
      const allPass = new RunTreeItem(
        createEntry({
          elapsedTime: 5.5,
          results: [
            createResult(),
            createResult({ name: "m2", uniqueId: "model.p.m2" }),
          ],
        }),
      );
      const someFail = new RunTreeItem(
        createEntry({
          results: [
            createResult({ status: "success" }),
            createResult({
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

    it("should use pass icon for success status", () => {
      const item = new RunTreeItem(
        createEntry({ results: [createResult({ status: "success" })] }),
      );
      expect((item.iconPath as any).id).toBe("pass");
    });

    it("should use error icon for error status", () => {
      const item = new RunTreeItem(
        createEntry({ results: [createResult({ status: "error" })] }),
      );
      expect((item.iconPath as any).id).toBe("error");
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

  describe("ResultTreeItem", () => {
    const createResult = (
      overrides: Partial<RunResultEntry> = {},
    ): RunResultEntry => ({
      name: "test_model",
      uniqueId: "model.project.test_model",
      status: "success",
      executionTime: 2.5,
      resourceType: "model",
      ...overrides,
    });

    it("should use model name as label with None collapsibleState", () => {
      const item = new ResultTreeItem(createResult({ name: "stg_customers" }));

      expect(item.label).toBe("stg_customers");
      expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
    });

    it("should include resource type and execution time in description", () => {
      const item = new ResultTreeItem(
        createResult({ resourceType: "test", executionTime: 3.45 }),
      );

      expect(item.description).toContain("test");
      expect(item.description).toContain("3.45s");
    });

    it("should use check icon for success status", () => {
      const item = new ResultTreeItem(createResult({ status: "success" }));
      expect((item.iconPath as any).id).toBe("check");
    });

    it("should use x icon for error status", () => {
      const item = new ResultTreeItem(createResult({ status: "error" }));
      expect((item.iconPath as any).id).toBe("x");
    });

    it("should use debug-step-over icon for skipped status", () => {
      const item = new ResultTreeItem(createResult({ status: "skipped" }));
      expect((item.iconPath as any).id).toBe("debug-step-over");
    });

    it("should include all fields in tooltip", () => {
      const item = new ResultTreeItem(
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
      const item = new ResultTreeItem(createResult({ message: undefined }));
      expect(item.tooltip).not.toContain("Message:");
    });

    it.each(["model", "test", "seed", "snapshot"] as const)(
      "should set contextValue for %s resource type",
      (resourceType) => {
        const item = new ResultTreeItem(createResult({ resourceType }));
        expect(item.contextValue).toBe(`runHistoryResult.${resourceType}`);
      },
    );
  });
});
