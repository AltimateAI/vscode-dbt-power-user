import * as assert from "assert";
import { TestParser } from "../../manifest/parsers/testParser";
import { DBTProject } from "../../manifest/dbtProject";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { EventEmitter } from "vscode";

suite("TestParser Test Suite", () => {
  let testParser: TestParser;
  let mockProject: DBTProject;
  let mockTerminal: DBTTerminal;

  setup(() => {
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

  test("createTestMetaMap should handle null/undefined testsMap", async () => {
    const result = await testParser.createTestMetaMap([], mockProject);
    assert.strictEqual(result.size, 0);
  });

  test("createTestMetaMap should parse test metadata correctly", async () => {
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
        depends_on: ["model.test_model"],
        unique_id: "test.test_1",
      },
    ];

    const result = await testParser.createTestMetaMap(
      mockTestsMap,
      mockProject,
    );

    assert.strictEqual(result.size, 1);
    const testMeta = result.get("test_1");
    assert.strictEqual(testMeta?.column_name, "Test Column");
    assert.strictEqual(testMeta?.test_metadata?.name, "not_null");
  });
});
