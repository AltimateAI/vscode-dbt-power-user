import { describe, expect, it } from "@jest/globals";
import { TreeItemCollapsibleState } from "vscode";
import {
  getStatusIcon,
  ResultTreeItem,
  RunTreeItem,
} from "../../treeview_provider/runHistoryTreeItems";
import {
  createEntry,
  createResult,
  createTestResult,
} from "../fixtures/runHistory";

describe("RunHistoryTreeItems", () => {
  describe("RunTreeItem", () => {
    it("should format label with --select flag when args present", () => {
      const item = new RunTreeItem(
        createEntry({ command: "build", args: ["+my_model+"] }),
      );
      expect(item.label).toBe("dbt build --select +my_model+");
    });

    it("should format label without --select when args are empty", () => {
      const item = new RunTreeItem(createEntry({ command: "build", args: [] }));
      expect(item.label).toBe("dbt build");
    });

    it("should be collapsed by default when results exist", () => {
      const item = new RunTreeItem(createEntry({ results: [createResult()] }));
      expect(item.collapsibleState).toBe(TreeItemCollapsibleState.Collapsed);
    });

    it("should be None when results are empty regardless of run count", () => {
      const item = new RunTreeItem(createEntry({ results: [] }));
      expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
    });

    it("should show project name, duration, and pass count in description", () => {
      const allPass = new RunTreeItem(
        createEntry({
          projectName: "jaffle_shop",
          elapsedTime: 5.5,
          results: [
            createResult(),
            createResult({ name: "m2", uniqueId: "model.p.m2" }),
          ],
        }),
      );
      const someFail = new RunTreeItem(
        createEntry({
          projectName: "analytics",
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

      expect(allPass.description).toContain("jaffle_shop");
      expect(allPass.description).toContain("5.50s");
      expect(allPass.description).toContain("2 passed");
      expect(someFail.description).toContain("analytics");
      expect(someFail.description).toContain("1/2 passed");
    });

    it("should include project name in description", () => {
      const item = new RunTreeItem(
        createEntry({
          projectName: "my_dbt_project",
          elapsedTime: 1.0,
          results: [createResult()],
        }),
      );
      expect(item.description).toBe("my_dbt_project • 1.00s • 1 passed");
    });

    it("should use pass icon when all results succeed", () => {
      const item = new RunTreeItem(
        createEntry({ results: [createResult({ status: "success" })] }),
      );
      expect((item.iconPath as any).id).toBe("pass");
    });

    it("should use error icon when any result has error", () => {
      const item = new RunTreeItem(
        createEntry({ results: [createResult({ status: "error" })] }),
      );
      expect((item.iconPath as any).id).toBe("error");
    });

    it("should use skip icon when results are empty (no matches)", () => {
      const item = new RunTreeItem(createEntry({ results: [] }));
      expect((item.iconPath as any).id).toBe("debug-step-over");
      expect((item.iconPath as any).color.id).toBe("disabledForeground");
    });

    it("should show 'no matches' in description when results are empty", () => {
      const item = new RunTreeItem(
        createEntry({
          projectName: "jaffle_shop",
          elapsedTime: 0,
          results: [],
        }),
      );
      expect(item.description).toBe("jaffle_shop • 0.00s • no matches");
    });

    it("should use warning icon when results have warns but no errors", () => {
      const item = new RunTreeItem(
        createEntry({
          results: [
            createResult({ status: "success" }),
            createResult({
              name: "m2",
              uniqueId: "model.p.m2",
              status: "warn",
            }),
          ],
        }),
      );
      expect((item.iconPath as any).id).toBe("warning");
      expect((item.iconPath as any).color.id).toBe("charts.yellow");
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

    it("should handle completedAt as a string (JSON deserialization)", () => {
      const item = new RunTreeItem(
        createEntry({
          completedAt: "2024-01-15T10:30:00.000Z" as unknown as Date,
        }),
      );

      expect(item.tooltip).toContain("Completed:");
    });

    it("should have runHistoryEntry contextValue", () => {
      expect(new RunTreeItem(createEntry()).contextValue).toBe(
        "runHistoryEntry",
      );
    });
  });

  describe("ResultTreeItem", () => {
    it("should use model name as label with None collapsibleState", () => {
      const item = new ResultTreeItem(createResult({ name: "stg_customers" }));

      expect(item.label).toBe("stg_customers");
      expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
    });

    it("should display friendly test name instead of UUID", () => {
      const item = new ResultTreeItem(createTestResult());

      expect(item.label).toBe("not_null_orders_order_id");
    });

    it("should handle test uniqueId with compound test name", () => {
      const item = new ResultTreeItem(
        createTestResult({
          uniqueId:
            "test.my_project.accepted_values_orders_status.abc123def456",
        }),
      );

      expect(item.label).toBe("accepted_values_orders_status");
    });

    it("should fall back to name for non-test resources", () => {
      const item = new ResultTreeItem(
        createResult({ name: "my_model", resourceType: "model" }),
      );

      expect(item.label).toBe("my_model");
    });

    it("should fall back to name for tests with short uniqueId", () => {
      const item = new ResultTreeItem(
        createTestResult({
          name: "some_test",
          uniqueId: "test.project",
        }),
      );

      expect(item.label).toBe("some_test");
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

  describe("getStatusIcon", () => {
    it.each<[string, string, string]>([
      ["success", "check", "charts.green"],
      ["error", "x", "charts.red"],
      ["warn", "warning", "charts.yellow"],
      ["skipped", "debug-step-over", "disabledForeground"],
    ])(
      "should return correct icon for %s status",
      (status, expectedIcon, expectedColor) => {
        const result = getStatusIcon(status as any);
        expect(result.icon).toBe(expectedIcon);
        expect(result.color).toBe(expectedColor);
      },
    );
  });
});
