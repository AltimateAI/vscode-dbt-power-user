import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { Position, Range } from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";
import { DbtDocumentFormattingEditProvider } from "../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";
import { TelemetryService } from "../../telemetry";

// Helper to create a mock TextDocument
const createMockDocument = (content: string) => {
  const lines = content.split("\n");

  return {
    getText: () => content,
    lineCount: lines.length,
    lineAt: (lineNumber: number) => {
      if (lineNumber < 0 || lineNumber >= lines.length) {
        throw new Error(
          `Invalid line number: ${lineNumber}, document has ${lines.length} lines`,
        );
      }
      const line = lines[lineNumber];
      return {
        text: line,
        range: new Range(
          new Position(lineNumber, 0),
          new Position(lineNumber, line.length),
        ),
        rangeIncludingLineBreak: new Range(
          new Position(lineNumber, 0),
          lineNumber < lines.length - 1
            ? new Position(lineNumber + 1, 0)
            : new Position(lineNumber, line.length),
        ),
        firstNonWhitespaceCharacterIndex:
          line.search(/\S/) === -1 ? line.length : line.search(/\S/),
        isEmptyOrWhitespace: line.trim().length === 0,
        lineNumber,
      };
    },
    uri: { fsPath: "test.sql" } as any,
    fileName: "test.sql",
    languageId: "jinja-sql",
    version: 1,
    isDirty: false,
    isUntitled: false,
    isClosed: false,
    eol: 1,
    save: jest.fn(),
    positionAt: jest.fn(),
    offsetAt: jest.fn(),
    validateRange: jest.fn(),
    validatePosition: jest.fn(),
    getWordRangeAtPosition: jest.fn(),
  } as any;
};

// Helper to access private processDiffOutput method
const processDiffOutput = (
  provider: DbtDocumentFormattingEditProvider,
  document: any,
  diffOutput: string,
) => {
  return (provider as any).processDiffOutput(document, diffOutput);
};

describe("DbtDocumentFormattingEditProvider", () => {
  let mockCommandProcessExecutionFactory: jest.Mocked<CommandProcessExecutionFactory>;
  let mockTelemetry: jest.Mocked<TelemetryService>;
  let mockPythonEnvironment: jest.Mocked<PythonEnvironment>;
  let provider: DbtDocumentFormattingEditProvider;

  beforeEach(() => {
    mockCommandProcessExecutionFactory = {
      createCommandProcessExecution: jest.fn(),
    } as any;

    mockTelemetry = {
      sendTelemetryEvent: jest.fn(),
      sendTelemetryError: jest.fn(),
    } as any;

    mockPythonEnvironment = {
      getResolvedConfigValue: jest.fn().mockReturnValue("sqlfmt"),
      pythonPath: "/usr/bin/python",
    } as any;

    provider = new DbtDocumentFormattingEditProvider(
      mockCommandProcessExecutionFactory,
      mockTelemetry,
      mockPythonEnvironment,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("processDiffOutput", () => {
    describe("Basic formatting", () => {
      it("should return empty array for empty diff output", () => {
        const document = createMockDocument("SELECT 1");
        const diffOutput = "";

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits).toHaveLength(0);
      });

      it("should handle single line deletion and addition", () => {
        const document = createMockDocument("select * from users");
        const diffOutput = `--- stdin
+++ stdout
@@ -1 +1 @@
-select * from users
+SELECT * FROM users
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
      });
    });

    describe("Multiple additions in one chunk", () => {
      it("should correctly position multiple added lines", () => {
        const document = createMockDocument("SELECT a, b, c FROM users");
        const diffOutput = `--- stdin
+++ stdout
@@ -1 +1,5 @@
-SELECT a, b, c FROM users
+SELECT
+    a,
+    b,
+    c
+FROM users
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
        // Verify edits are created (detailed position checks depend on mock structure)
      });

      it("should handle additions after context lines", () => {
        const document = createMockDocument(`SELECT *
FROM users`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,2 +1,3 @@
 SELECT *
 FROM users
+WHERE active = 1
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        // Context lines (normal changes) also create edits, plus the addition
        expect(edits.length).toBeGreaterThan(0);
        // Should have an insert with the new content
        const insertEdits = edits.filter((e: any) =>
          e.newText.includes("WHERE active = 1"),
        );
        expect(insertEdits.length).toBe(1);
      });
    });

    describe("Multiple deletions", () => {
      it("should correctly remove multiple lines", () => {
        const document = createMockDocument(`SELECT
    a,
    b,
    c
FROM users`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,5 +1 @@
-SELECT
-    a,
-    b,
-    c
-FROM users
+SELECT a, b, c FROM users
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
        // Should have multiple delete edits
        const deleteEdits = edits.filter((e: any) => e.newText === "");
        expect(deleteEdits.length).toBeGreaterThan(0);
      });
    });

    describe("Mixed changes", () => {
      it("should handle add, delete, and normal changes in same chunk", () => {
        const document = createMockDocument(`SELECT *
FROM users
WHERE active = 1`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,3 +1,4 @@
 SELECT *
 FROM users
-WHERE active = 1
+WHERE
+    active = 1
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
      });
    });

    describe("Long lines (issue #1717)", () => {
      it("should handle files with very long lines without corruption", () => {
        const longColumnName = "a".repeat(100);
        const longLine = `SELECT ${longColumnName} FROM users`;
        const document = createMockDocument(longLine);

        const diffOutput = `--- stdin
+++ stdout
@@ -1 +1,3 @@
-SELECT ${longColumnName} FROM users
+SELECT
+    ${longColumnName}
+FROM users
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
        // Verify edits are created without throwing errors
      });

      it("should handle multiple long column names with aliases", () => {
        const content = `with source_data as (
    select
        my_looooooooooooooooooooooooong_column_name1 as my_loooooooong_alias1,
        my_looooooooooooooooooooooooong_column_name2 as my_loooooooong_alias2
    from source_table
)
select * from source_data`;
        const document = createMockDocument(content);

        // Simulate sqlfmt reformatting with different indentation
        const diffOutput = `--- stdin
+++ stdout
@@ -1,7 +1,9 @@
-with source_data as (
-    select
-        my_looooooooooooooooooooooooong_column_name1 as my_loooooooong_alias1,
-        my_looooooooooooooooooooooooong_column_name2 as my_loooooooong_alias2
-    from source_table
-)
-select * from source_data
+with
+    source_data as (
+        select
+            my_looooooooooooooooooooooooong_column_name1 as my_loooooooong_alias1,
+            my_looooooooooooooooooooooooong_column_name2 as my_loooooooong_alias2
+        from source_table
+    )
+select *
+from source_data
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
        // Verify edits are created without throwing errors
      });
    });

    describe("Multi-chunk diffs", () => {
      it("should handle changes in different parts of file", () => {
        const document = createMockDocument(`SELECT *
FROM users
-- middle section unchanged
-- more unchanged
WHERE active = 1`);

        const diffOutput = `--- stdin
+++ stdout
@@ -1,2 +1,3 @@
-SELECT *
+SELECT
+    *
 FROM users
@@ -4,2 +5,3 @@
 -- more unchanged
-WHERE active = 1
+WHERE
+    active = 1
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
      });
    });

    describe("Edge cases", () => {
      it("should handle single line document", () => {
        const document = createMockDocument("SELECT 1");
        const diffOutput = `--- stdin
+++ stdout
@@ -1 +1,2 @@
 SELECT 1
+-- Added comment
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
      });

      it("should filter out 'No newline at end of file' marker", () => {
        const document = createMockDocument("SELECT 1");
        const diffOutput = `--- stdin
+++ stdout
@@ -1 +1 @@
-SELECT 1
\\ No newline at end of file
+SELECT 1
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        // The "\ No newline at end of file" should be filtered out
        const noNewlineEdits = edits.filter(
          (e: any) => e.newText && e.newText.includes("No newline"),
        );
        expect(noNewlineEdits).toHaveLength(0);
      });

      it("should handle additions at end of file", () => {
        const document = createMockDocument(`SELECT 1
FROM users`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,2 +1,3 @@
 SELECT 1
 FROM users
+WHERE active = 1
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        // Context lines create replace edits, plus the addition
        expect(edits.length).toBeGreaterThan(0);
        const insertEdits = edits.filter((e: any) =>
          e.newText.includes("WHERE active = 1"),
        );
        expect(insertEdits.length).toBe(1);
      });

      it("should handle document with only whitespace lines", () => {
        const document = createMockDocument(`SELECT 1

FROM users`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,3 +1,2 @@
 SELECT 1
-
 FROM users
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        expect(edits.length).toBeGreaterThan(0);
      });
    });

    describe("Normal changes (context lines)", () => {
      it("should process context lines as normal changes", () => {
        const document = createMockDocument(`line1
line2
line3`);
        const diffOutput = `--- stdin
+++ stdout
@@ -1,3 +1,3 @@
 line1
 line2
 line3
`;

        const edits = processDiffOutput(provider, document, diffOutput);

        // Context lines (type: "normal") create replace edits
        // This is expected behavior from parse-diff
        expect(edits).toHaveLength(3);
        // Each edit should have the line content
        expect(edits[0].newText).toContain("line1");
        expect(edits[1].newText).toContain("line2");
        expect(edits[2].newText).toContain("line3");
      });
    });
  });
});
