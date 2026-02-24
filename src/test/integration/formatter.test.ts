import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import "reflect-metadata";
import * as vscode from "vscode";
import { PythonEnvironment } from "../../dbt_client/pythonEnvironment";
import { DbtDocumentFormattingEditProvider } from "../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";
import { TelemetryService } from "../../telemetry";
import {
  FormatterFixture,
  loadFormatterFixtures,
} from "./helpers/fixtureLoader";
import { findSqlfmt, runSqlfmt, runSqlfmtFormat } from "./helpers/sqlfmtRunner";

suite("Formatter Integration Tests", function () {
  this.timeout(30_000);

  const extensionRoot = path.resolve(__dirname, "../../../");
  let fixtures: FormatterFixture[];
  let tempDir: string;

  suiteSetup(function () {
    if (!findSqlfmt()) {
      this.skip();
    }

    fixtures = loadFormatterFixtures(extensionRoot);
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "formatter-test-"));
  });

  suiteTeardown(function () {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("sqlfmt is available on PATH", function () {
    const sqlfmtPath = findSqlfmt();
    assert.ok(sqlfmtPath, "sqlfmt should be found on PATH");
  });

  test("fixtures are loaded", function () {
    assert.ok(fixtures.length > 0, "Should have at least one fixture");
  });

  suite("fixture tests", function () {
    // Dynamically create tests for each fixture after suiteSetup runs.
    // Mocha requires tests to be registered synchronously, so we use a
    // two-phase approach: register all fixtures, skip at runtime if needed.

    const extensionRoot = path.resolve(__dirname, "../../../");
    const fixtureDir = path.join(
      extensionRoot,
      "src",
      "test",
      "fixtures",
      "formatter",
    );

    // Read fixture names synchronously at test registration time
    let fixtureNames: string[];
    try {
      fixtureNames = fs
        .readdirSync(fixtureDir)
        .filter((f) => f.endsWith(".sql"))
        .map((f) => f.replace(/\.sql$/, ""))
        .sort();
    } catch {
      fixtureNames = [];
    }

    for (const fixtureName of fixtureNames) {
      if (fixtureName === "no-changes-needed") {
        test(`${fixtureName}: sqlfmt reports no changes, zero edits`, async function () {
          if (!findSqlfmt()) {
            this.skip();
          }

          const input = fs.readFileSync(
            path.join(fixtureDir, `${fixtureName}.sql`),
            "utf-8",
          );

          const diffResult = runSqlfmt(input);
          assert.ok(diffResult.available, "sqlfmt should be available");
          assert.strictEqual(
            diffResult.hasChanges,
            false,
            "sqlfmt should report no changes",
          );

          // Verify sqlfmt format output matches input
          const formatResult = runSqlfmtFormat(input);
          assert.ok(formatResult.available, "sqlfmt should be available");
          assert.strictEqual(
            formatResult.formatted,
            input,
            "sqlfmt formatted output should equal input when no changes needed",
          );
        });
        continue;
      }

      test(`${fixtureName}: input → sqlfmt → processDiffOutput → applyEdit → matches sqlfmt output`, async function () {
        if (!findSqlfmt()) {
          this.skip();
        }

        const input = fs.readFileSync(
          path.join(fixtureDir, `${fixtureName}.sql`),
          "utf-8",
        );

        // 1. Run sqlfmt to get the canonical formatted output (source of truth)
        const formatResult = runSqlfmtFormat(input);
        assert.ok(formatResult.available, "sqlfmt should be available");
        assert.ok(
          formatResult.hasChanges,
          `sqlfmt should report changes for fixture ${fixtureName}`,
        );
        const sqlfmtFormatted = formatResult.formatted;

        // 2. Run sqlfmt in diff mode for processDiffOutput
        const diffResult = runSqlfmt(input);
        assert.ok(diffResult.available, "sqlfmt should be available");
        assert.ok(
          diffResult.hasChanges,
          `sqlfmt diff should report changes for fixture ${fixtureName}`,
        );

        // 3. Write input to temp file, open as real vscode.TextDocument
        const tempFile = path.join(tempDir, `${fixtureName}.sql`);
        fs.writeFileSync(tempFile, input);
        const uri = vscode.Uri.file(tempFile);
        const document = await vscode.workspace.openTextDocument(uri);

        // 4. Call processDiffOutput on the real document
        const provider = new DbtDocumentFormattingEditProvider(
          {} as CommandProcessExecutionFactory,
          {} as TelemetryService,
          {} as PythonEnvironment,
        );
        const edits: vscode.TextEdit[] = (provider as any).processDiffOutput(
          document,
          diffResult.diffOutput,
        );

        assert.ok(
          edits.length > 0,
          `Should produce at least one edit for fixture ${fixtureName}`,
        );

        // 5. Apply edits via real vscode.workspace.applyEdit
        const wsEdit = new vscode.WorkspaceEdit();
        wsEdit.set(document.uri, edits);
        const applied = await vscode.workspace.applyEdit(wsEdit);
        assert.ok(applied, "workspace.applyEdit should succeed");

        // 6. Compare vscode document (after edits) with sqlfmt formatted output
        const resultText = document.getText();
        assert.strictEqual(
          resultText,
          sqlfmtFormatted,
          `VS Code document after edits should match sqlfmt formatted output for fixture ${fixtureName}`,
        );
      });
    }
  });

  suite("edge cases", function () {
    test("empty diff string produces no edits", async function () {
      if (!findSqlfmt()) {
        this.skip();
      }

      const tempFile = path.join(tempDir, "edge-empty-diff.sql");
      fs.writeFileSync(tempFile, "select 1\n");
      const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(tempFile),
      );

      const provider = new DbtDocumentFormattingEditProvider(
        {} as CommandProcessExecutionFactory,
        {} as TelemetryService,
        {} as PythonEnvironment,
      );
      const edits: vscode.TextEdit[] = (provider as any).processDiffOutput(
        document,
        "",
      );

      assert.strictEqual(edits.length, 0, "Empty diff should produce no edits");
    });

    test("diff with only summary lines produces no edits", async function () {
      if (!findSqlfmt()) {
        this.skip();
      }

      const tempFile = path.join(tempDir, "edge-summary-only.sql");
      fs.writeFileSync(tempFile, "select 1\n");
      const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(tempFile),
      );

      const provider = new DbtDocumentFormattingEditProvider(
        {} as CommandProcessExecutionFactory,
        {} as TelemetryService,
        {} as PythonEnvironment,
      );
      const edits: vscode.TextEdit[] = (provider as any).processDiffOutput(
        document,
        "1 file passed formatting check.\n",
      );

      assert.strictEqual(
        edits.length,
        0,
        "Summary-only diff should produce no edits",
      );
    });
  });
});
