import { expect, describe, it, beforeEach } from "@jest/globals";
import { TestParser } from "../../manifest/parsers/testParser";
import { DBTProject } from "../../manifest/dbtProject";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import * as path from "path";
import { EventEmitter } from "vscode";

describe("TestParser Test Suite", () => {
  let testParser: TestParser;
  let mockProject: DBTProject;
  let mockTerminal: DBTTerminal;

  beforeEach(() => {
    // Create a proper mock of DBTTerminal with all required methods
    mockTerminal = {
      debug: () => {},
      log: () => {},
      error: () => {},
      warn: () => {},
      logNewLine: () => {},
      logLine: () => {},
      logHorizontalRule: () => {},
      logBlock: () => {},
      logError: () => {},
      logWarning: () => {},
      logSuccess: () => {},
      disposables: [],
      writeEmitter: new EventEmitter<string>(),
      outputChannel: {
        append: () => {},
        appendLine: () => {},
        clear: () => {},
        show: () => {},
      },
      telemetry: {
        sendTelemetryEvent: () => {},
      },
      onDidWrite: new EventEmitter<string>().event,
      clear: () => {},
      show: () => {},
      dispose: () => {},
      write: () => {},
      processQueue: () => Promise.resolve(),
    } as unknown as DBTTerminal; // Use unknown to force the type cast

    testParser = new TestParser(mockTerminal);
    mockProject = {
      projectRoot: { fsPath: "/mock/project/path" },
      getProjectName: () => "mock_project",
    } as DBTProject;
  });

  it("should handle null/undefined testsMap", async () => {
    const result = await testParser.createTestMetaMap([], mockProject);
    expect(result.size).toBe(0);
  });

  it("should parse test metadata correctly", async () => {
    const mockTestsMap = [
      {
        name: "test_1",
        resource_type: "test",
        raw_sql: "SELECT * FROM table",
        original_file_path: "tests/test_1.sql",
        database: "test_db",
        schema: "test_schema",
        alias: "test_alias",
        column_name: '"Test Column"',
        test_metadata: {
          name: "not_null",
          kwargs: { column_name: "test_column" },
        },
        attached_node: "model.test_model",
        depends_on: {
          macros: ["macro1"],
          nodes: ["model.test_model"],
          sources: [],
        },
        unique_id: "test.test_1",
      },
    ];

    const result = await testParser.createTestMetaMap(
      mockTestsMap,
      mockProject,
    );
    expect(result.size).toBe(1);
    const testMeta = result.get("test_1");
    expect(testMeta).toBeTruthy();
    expect(testMeta?.uniqueId).toBe("test.test_1");
    expect(testMeta?.raw_sql).toBe("SELECT * FROM table");
    expect(testMeta?.path).toBe(
      path.join(mockProject.projectRoot.fsPath, "tests/test_1.sql"),
    );
  });

  it("should handle column-level tests correctly", async () => {
    const mockTestsMap = [
      {
        name: "not_null_column_test",
        resource_type: "test",
        raw_sql: "SELECT * FROM table WHERE column IS NULL",
        original_file_path: "tests/column_tests.sql",
        test_metadata: {
          name: "not_null",
          kwargs: { column_name: "test_column" },
        },
        column_name: "test_column",
        attached_node: "model.test_model",
        unique_id: "test.not_null_column_test",
        database: "test_db",
        schema: "test_schema",
        alias: "test_alias",
        depends_on: {
          macros: [],
          nodes: ["model.test_model"],
          sources: [],
        },
      },
    ];

    const result = await testParser.createTestMetaMap(
      mockTestsMap,
      mockProject,
    );
    const testMeta = result.get("not_null_column_test");
    expect(testMeta).toBeTruthy();
    expect(testMeta?.column_name).toBe("test_column");
    expect(testMeta?.test_metadata).toBeTruthy();
    expect(testMeta?.test_metadata?.name).toBe("not_null");
  });

  it("should handle custom test configurations", async () => {
    const mockTestsMap = [
      {
        name: "custom_test",
        resource_type: "test",
        raw_sql: "SELECT * FROM table WHERE condition",
        original_file_path: "tests/custom_tests.sql",
        test_metadata: {
          name: "custom",
          kwargs: {
            column_name: "test_column",
            model: "test_model",
            condition: "value > 0",
            severity: "warn",
          },
        },
        attached_node: "model.test_model",
        unique_id: "test.custom_test",
        database: "test_db",
        schema: "test_schema",
        alias: "test_alias",
        depends_on: {
          macros: [],
          nodes: ["model.test_model"],
          sources: [],
        },
      },
    ];

    const result = await testParser.createTestMetaMap(
      mockTestsMap,
      mockProject,
    );
    const testMeta = result.get("custom_test");
    expect(testMeta).toBeTruthy();
    expect(testMeta?.test_metadata).toBeTruthy();
    expect(testMeta?.test_metadata?.name).toBe("custom");
    expect(testMeta?.test_metadata?.kwargs).toEqual({
      column_name: "test_column",
      model: "test_model",
      condition: "value > 0",
      severity: "warn",
    });
  });

  it("should handle test dependencies correctly", async () => {
    const mockTestsMap = [
      {
        name: "dependent_test",
        resource_type: "test",
        raw_sql: "SELECT * FROM {{ ref('other_model') }}",
        original_file_path: "tests/dependent_tests.sql",
        test_metadata: {
          name: "custom",
          kwargs: {
            column_name: "test_column",
            model: "test_model",
          },
        },
        attached_node: "model.test_model",
        unique_id: "test.dependent_test",
        database: "test_db",
        schema: "test_schema",
        alias: "test_alias",
        depends_on: {
          macros: [],
          nodes: ["model.test_model", "model.other_model"],
          sources: [],
        },
      },
    ];

    const result = await testParser.createTestMetaMap(
      mockTestsMap,
      mockProject,
    );
    const testMeta = result.get("dependent_test");
    expect(testMeta).toBeTruthy();
    expect(testMeta?.depends_on).toEqual({
      macros: [],
      nodes: ["model.test_model", "model.other_model"],
      sources: [],
    });
  });
});
