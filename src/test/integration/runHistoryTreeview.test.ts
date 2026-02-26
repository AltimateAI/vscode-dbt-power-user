import type { RunResultsEventData } from "@altimateai/dbt-integration";
import * as assert from "assert";
import "reflect-metadata";
import * as vscode from "vscode";
import { RunHistoryService } from "../../services/runHistoryService";
import {
  ResultTreeItem,
  RunTreeItem,
} from "../../treeview_provider/runHistoryTreeItems";
import { RunHistoryTreeviewProvider } from "../../treeview_provider/runHistoryTreeviewProvider";

function createEntry(
  overrides: Partial<RunResultsEventData> = {},
): RunResultsEventData {
  return {
    id: "inv-001",
    command: "run",
    args: [],
    completedAt: new Date(),
    projectName: "test-project",
    results: [
      {
        name: "my_model",
        uniqueId: "model.project.my_model",
        status: "success",
        executionTime: 1.5,
        resourceType: "model",
      },
    ],
    elapsedTime: 2.0,
    ...overrides,
  };
}

suite("Run History TreeView Integration", function () {
  this.timeout(10_000);

  let service: RunHistoryService;
  let provider: RunHistoryTreeviewProvider;
  let registration: vscode.Disposable;

  setup(function () {
    service = new RunHistoryService();
    provider = new RunHistoryTreeviewProvider(service);
    registration = vscode.window.registerTreeDataProvider(
      "run_history_treeview",
      provider,
    );
  });

  teardown(function () {
    registration.dispose();
    provider.dispose();
    service.dispose();
  });

  test("registers tree data provider without error", function () {
    assert.ok(registration, "Registration should return a disposable");
  });

  test("empty history returns no children", function () {
    const children = provider.getChildren();
    assert.strictEqual(children.length, 0);
  });

  test("added entry produces a RunTreeItem at root", function () {
    service.addEntry(createEntry());

    const children = provider.getChildren();
    assert.strictEqual(children.length, 1);
    assert.ok(children[0] instanceof RunTreeItem);
  });

  test("RunTreeItem has expected label and description", function () {
    service.addEntry(createEntry({ command: "build", args: ["+stg_orders+"] }));

    const item = provider.getChildren()[0] as RunTreeItem;
    assert.strictEqual(item.label, "dbt build +stg_orders+");
    assert.ok(
      typeof item.description === "string" && item.description.length > 0,
    );
  });

  test("RunTreeItem exposes real ThemeIcon", function () {
    service.addEntry(createEntry());

    const item = provider.getChildren()[0] as RunTreeItem;
    assert.ok(item.iconPath instanceof vscode.ThemeIcon);
  });

  test("expanding a RunTreeItem yields ResultTreeItems", function () {
    service.addEntry(
      createEntry({
        results: [
          {
            name: "m1",
            uniqueId: "model.p.m1",
            status: "success",
            executionTime: 1.0,
            resourceType: "model",
          },
          {
            name: "t1",
            uniqueId: "test.p.t1",
            status: "error",
            executionTime: 0.3,
            resourceType: "test",
          },
        ],
      }),
    );

    const runItem = provider.getChildren()[0] as RunTreeItem;
    const children = provider.getChildren(runItem);
    assert.strictEqual(children.length, 2);
    assert.ok(children[0] instanceof ResultTreeItem);
    assert.ok(children[1] instanceof ResultTreeItem);
  });

  test("ResultTreeItem is a leaf node", function () {
    service.addEntry(createEntry());

    const runItem = provider.getChildren()[0] as RunTreeItem;
    const resultItem = provider.getChildren(runItem)[0] as ResultTreeItem;
    assert.strictEqual(provider.getChildren(resultItem).length, 0);
  });

  test("onDidChangeTreeData fires on real EventEmitter", function (done) {
    provider.onDidChangeTreeData(() => done());
    service.addEntry(createEntry());
  });

  test("multiple entries appear in reverse chronological order", function () {
    service.addEntry(createEntry({ id: "first" }));
    service.addEntry(createEntry({ id: "second" }));

    const children = provider.getChildren() as RunTreeItem[];
    assert.strictEqual(children.length, 2);
    assert.strictEqual(children[0].entry.id, "second");
    assert.strictEqual(children[1].entry.id, "first");
  });
});
