import { afterEach, describe, expect, it, jest } from "@jest/globals";
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
  afterEach(() => {
    jest.clearAllMocks();
  });

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

    describe("label", () => {
      it("should format label as 'dbt <command>'", () => {
        const entry = createEntry({ command: "run" });
        const item = new RunTreeItem(entry);

        expect(item.label).toBe("dbt run");
      });

      it("should include args in label", () => {
        const entry = createEntry({
          command: "run",
          args: ["model1", "model2"],
        });
        const item = new RunTreeItem(entry);

        expect(item.label).toBe("dbt run model1 model2");
      });

      it("should handle build command", () => {
        const entry = createEntry({ command: "build", args: ["+my_model+"] });
        const item = new RunTreeItem(entry);

        expect(item.label).toBe("dbt build +my_model+");
      });
    });

    describe("collapsibleState", () => {
      it("should be Expanded when models exist", () => {
        const entry = createEntry({
          models: [
            {
              name: "model1",
              uniqueId: "model.p.model1",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect(item.collapsibleState).toBe(TreeItemCollapsibleState.Expanded);
      });

      it("should be None when no models", () => {
        const entry = createEntry({ models: [] });
        const item = new RunTreeItem(entry);

        expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
      });
    });

    describe("description", () => {
      it("should show duration", () => {
        const entry = createEntry({ elapsedTime: 5.5, models: [] });
        const item = new RunTreeItem(entry);

        expect(item.description).toContain("5.50s");
      });

      it("should show all passed when no failures", () => {
        const entry = createEntry({
          models: [
            {
              name: "m1",
              uniqueId: "model.p.m1",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
            {
              name: "m2",
              uniqueId: "model.p.m2",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect(item.description).toContain("2 passed");
      });

      it("should show pass/total when failures exist", () => {
        const entry = createEntry({
          models: [
            {
              name: "m1",
              uniqueId: "model.p.m1",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
            {
              name: "m2",
              uniqueId: "model.p.m2",
              status: "error",
              executionTime: 1,
              resourceType: "model",
            },
            {
              name: "m3",
              uniqueId: "model.p.m3",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect(item.description).toContain("2/3 passed");
      });

      it("should count 'pass' status as success", () => {
        const entry = createEntry({
          models: [
            {
              name: "t1",
              uniqueId: "test.p.t1",
              status: "pass",
              executionTime: 1,
              resourceType: "test",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect(item.description).toContain("1 passed");
      });

      it("should count 'fail' status as error", () => {
        const entry = createEntry({
          models: [
            {
              name: "t1",
              uniqueId: "test.p.t1",
              status: "pass",
              executionTime: 1,
              resourceType: "test",
            },
            {
              name: "t2",
              uniqueId: "test.p.t2",
              status: "fail",
              executionTime: 1,
              resourceType: "test",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect(item.description).toContain("1/2 passed");
      });
    });

    describe("iconPath", () => {
      it("should use pass icon when all models succeed", () => {
        const entry = createEntry({
          models: [
            {
              name: "m1",
              uniqueId: "model.p.m1",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect((item.iconPath as any).id).toBe("pass");
      });

      it("should use error icon when any model fails", () => {
        const entry = createEntry({
          models: [
            {
              name: "m1",
              uniqueId: "model.p.m1",
              status: "success",
              executionTime: 1,
              resourceType: "model",
            },
            {
              name: "m2",
              uniqueId: "model.p.m2",
              status: "error",
              executionTime: 1,
              resourceType: "model",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect((item.iconPath as any).id).toBe("error");
      });

      it("should use error icon when any model has 'fail' status", () => {
        const entry = createEntry({
          models: [
            {
              name: "t1",
              uniqueId: "test.p.t1",
              status: "fail",
              executionTime: 1,
              resourceType: "test",
            },
          ],
        });
        const item = new RunTreeItem(entry);

        expect((item.iconPath as any).id).toBe("error");
      });
    });

    describe("tooltip", () => {
      it("should include project name", () => {
        const entry = createEntry({ projectName: "my-dbt-project" });
        const item = new RunTreeItem(entry);

        expect(item.tooltip).toContain("Project: my-dbt-project");
      });

      it("should include duration", () => {
        const entry = createEntry({ elapsedTime: 12.34 });
        const item = new RunTreeItem(entry);

        expect(item.tooltip).toContain("Duration: 12.34s");
      });

      it("should include invocation id", () => {
        const entry = createEntry({ id: "abc-123-def" });
        const item = new RunTreeItem(entry);

        expect(item.tooltip).toContain("Invocation: abc-123-def");
      });
    });

    describe("contextValue", () => {
      it("should be runHistoryEntry", () => {
        const entry = createEntry();
        const item = new RunTreeItem(entry);

        expect(item.contextValue).toBe("runHistoryEntry");
      });
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

    describe("label", () => {
      it("should be the model name", () => {
        const result = createResult({ name: "stg_customers" });
        const item = new ModelResultTreeItem(result);

        expect(item.label).toBe("stg_customers");
      });
    });

    describe("collapsibleState", () => {
      it("should always be None", () => {
        const result = createResult();
        const item = new ModelResultTreeItem(result);

        expect(item.collapsibleState).toBe(TreeItemCollapsibleState.None);
      });
    });

    describe("description", () => {
      it("should include resource type", () => {
        const result = createResult({ resourceType: "model" });
        const item = new ModelResultTreeItem(result);

        expect(item.description).toContain("model");
      });

      it("should include execution time", () => {
        const result = createResult({ executionTime: 3.45 });
        const item = new ModelResultTreeItem(result);

        expect(item.description).toContain("3.45s");
      });

      it("should show test resource type", () => {
        const result = createResult({ resourceType: "test" });
        const item = new ModelResultTreeItem(result);

        expect(item.description).toContain("test");
      });
    });

    describe("iconPath", () => {
      it("should use check icon for success", () => {
        const result = createResult({ status: "success" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("check");
      });

      it("should use check icon for pass", () => {
        const result = createResult({ status: "pass" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("check");
      });

      it("should use x icon for error", () => {
        const result = createResult({ status: "error" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("x");
      });

      it("should use x icon for fail", () => {
        const result = createResult({ status: "fail" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("x");
      });

      it("should use debug-step-over icon for skipped", () => {
        const result = createResult({ status: "skipped" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("debug-step-over");
      });

      it("should use debug-step-over icon for skip", () => {
        const result = createResult({ status: "skip" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("debug-step-over");
      });

      it("should use question icon for unknown status", () => {
        const result = createResult({ status: "unknown" });
        const item = new ModelResultTreeItem(result);

        expect((item.iconPath as any).id).toBe("question");
      });
    });

    describe("tooltip", () => {
      it("should include name", () => {
        const result = createResult({ name: "my_model" });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Name: my_model");
      });

      it("should include type", () => {
        const result = createResult({ resourceType: "seed" });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Type: seed");
      });

      it("should include status", () => {
        const result = createResult({ status: "success" });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Status: success");
      });

      it("should include execution time", () => {
        const result = createResult({ executionTime: 4.56 });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Execution Time: 4.56s");
      });

      it("should include message when present", () => {
        const result = createResult({ message: "Database error occurred" });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Message: Database error occurred");
      });

      it("should not include message when absent", () => {
        const result = createResult({ message: undefined });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).not.toContain("Message:");
      });

      it("should include unique id", () => {
        const result = createResult({ uniqueId: "model.jaffle.customers" });
        const item = new ModelResultTreeItem(result);

        expect(item.tooltip).toContain("Unique ID: model.jaffle.customers");
      });
    });

    describe("contextValue", () => {
      it("should include resource type for model", () => {
        const result = createResult({ resourceType: "model" });
        const item = new ModelResultTreeItem(result);

        expect(item.contextValue).toBe("runHistoryModel.model");
      });

      it("should include resource type for test", () => {
        const result = createResult({ resourceType: "test" });
        const item = new ModelResultTreeItem(result);

        expect(item.contextValue).toBe("runHistoryModel.test");
      });

      it("should include resource type for seed", () => {
        const result = createResult({ resourceType: "seed" });
        const item = new ModelResultTreeItem(result);

        expect(item.contextValue).toBe("runHistoryModel.seed");
      });

      it("should include resource type for snapshot", () => {
        const result = createResult({ resourceType: "snapshot" });
        const item = new ModelResultTreeItem(result);

        expect(item.contextValue).toBe("runHistoryModel.snapshot");
      });
    });
  });
});
