import { CommandProcessExecutionFactory } from "@altimateai/dbt-integration";
import fs from "fs";
import { inject } from "inversify";
import parseDiff from "parse-diff";
import path from "path";
import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  TextDocument,
  TextEdit,
  window,
  workspace,
} from "vscode";
import which from "which";
import { PythonEnvironment } from "../dbt_client/pythonEnvironment";
import { TelemetryService } from "../telemetry";
import { extendErrorWithSupportLinks, getFirstWorkspacePath } from "../utils";

export class DbtDocumentFormattingEditProvider
  implements DocumentFormattingEditProvider
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
    @inject(PythonEnvironment)
    private pythonEnvironment: PythonEnvironment,
  ) {}

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken,
  ): ProviderResult<TextEdit[]> {
    return this.executeSqlFmt(document);
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtPathSetting =
      this.pythonEnvironment.getResolvedConfigValue("sqlFmtPath");
    const sqlFmtAdditionalParamsSetting = workspace
      .getConfiguration("dbt")
      .get<string[]>("sqlFmtAdditionalParams", [])
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");

    const sqlFmtArgs = [
      "-",
      "--diff",
      "--no-progressbar",
      "--quiet",
      ...sqlFmtAdditionalParamsSetting,
    ];
    try {
      // try to find sqlfmt on PATH if not set
      const sqlFmtPath = sqlFmtPathSetting || (await this.findSqlFmtPath());
      if (!sqlFmtPath) {
        throw new Error("sqlfmt not found");
      }
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        const { stderr } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: sqlFmtPath,
            args: sqlFmtArgs,
            stdin: document.getText(),
            cwd: getFirstWorkspacePath(),
          })
          .complete();
        if (stderr) {
          throw new Error(stderr);
        }
        return [];
      } catch (e) {
        try {
          return this.processDiffOutput(document, (e as Error).message);
        } catch (error) {
          this.telemetry.sendTelemetryError(
            "formatDbtModelApplyDiffFailed",
            error,
          );
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "Could not process difference output from sqlfmt. Detailed error: " +
                error +
                ".",
            ),
          );
        }
      }
    } catch (error) {
      this.telemetry.sendTelemetryError("formatDbtModelApplyDiffFailed", error);
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not run sqlfmt. Did you install sqlfmt? Detailed error: " +
            error +
            ".",
        ),
      );
    }
    return [];
  }

  private async findSqlFmtPath(): Promise<string | undefined> {
    const pythonPath = this.pythonEnvironment.pythonPath;
    if (pythonPath) {
      const candidatePath = path.join(path.dirname(pythonPath), "sqlfmt");
      if (fs.existsSync(candidatePath)) {
        return candidatePath;
      }
    }
    return await which("sqlfmt");
  }

  private processDiffOutput(
    document: TextDocument,
    diffOutput: string,
  ): TextEdit[] {
    const textEdits: TextEdit[] = [];
    const diffs = parseDiff(diffOutput);

    // Handle empty documents - no edits possible
    if (document.lineCount === 0) {
      return textEdits;
    }

    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        // Track where we are in the old document for insertions
        // chunk.oldStart is 1-indexed, convert to 0-indexed
        let lastOldLineProcessed = chunk.oldStart - 1;
        // Track consecutive ADDs to offset insertion points
        let consecutiveAddCount = 0;

        chunk.changes.forEach((change) => {
          if (this.isAddChange(change)) {
            // For add changes, insert at the position after the last old line we processed
            // Offset by consecutiveAddCount to handle multiple ADDs at same position
            const insertLine = lastOldLineProcessed + consecutiveAddCount;
            if (insertLine < document.lineCount) {
              textEdits.push(
                TextEdit.insert(
                  document.lineAt(insertLine).range.start,
                  change.content.slice(1) + "\n",
                ),
              );
            } else if (document.lineCount > 0) {
              // Insert at end of document
              textEdits.push(
                TextEdit.insert(
                  document.lineAt(document.lineCount - 1).range.end,
                  change.content.slice(1) + "\n",
                ),
              );
            }
            consecutiveAddCount++;
          }

          if (this.isNormalChange(change)) {
            // For normal changes, use ln1 (old file line number)
            const oldLineIndex = change.ln1 - 1;
            lastOldLineProcessed = oldLineIndex + 1;
            consecutiveAddCount = 0; // Reset ADD counter
            if (oldLineIndex < document.lineCount) {
              textEdits.push(
                TextEdit.replace(
                  document.lineAt(oldLineIndex).rangeIncludingLineBreak,
                  change.content.slice(1) + "\n",
                ),
              );
            }
          }

          if (this.isDeleteChange(change)) {
            // For delete changes, use ln (old file line number)
            const lineIndex = change.ln - 1;
            lastOldLineProcessed = lineIndex + 1;
            consecutiveAddCount = 0; // Reset ADD counter
            if (lineIndex < document.lineCount) {
              textEdits.push(
                TextEdit.delete(
                  document.lineAt(lineIndex).rangeIncludingLineBreak,
                ),
              );
            }
          }
        });
      });
    });

    return textEdits;
  }

  private isAddChange(change: parseDiff.Change): change is parseDiff.AddChange {
    return change.type === "add";
  }

  private isNormalChange(
    change: parseDiff.Change,
  ): change is parseDiff.NormalChange {
    return change.type === "normal";
  }

  private isDeleteChange(
    change: parseDiff.Change,
  ): change is parseDiff.DeleteChange {
    return (
      /*  
          parseDiff reads sqlfmt's "\ No newline at end of file" diff output as a delete change. 
          This deceptive delete change should be skipped. So, adding an edge case to the expression.
      */
      change.type === "del" && change.content !== "\\ No newline at end of file"
    );
  }
}
