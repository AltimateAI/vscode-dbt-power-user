import * as parseDiff from "parse-diff";
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
import * as which from "which";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";

@provideSingleton(DbtDocumentFormattingEditProvider)
export class DbtDocumentFormattingEditProvider
  implements DocumentFormattingEditProvider
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
  ) {}

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken,
  ): ProviderResult<TextEdit[]> {
    return this.executeSqlFmt(document);
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtPathSetting = workspace
      .getConfiguration("dbt")
      .get<string>("sqlFmtPath", "");
    const sqlFmtAdditionalParamsSetting = workspace
      .getConfiguration("dbt")
      .get<string[]>("sqlFmtAdditionalParams", [])
      .join(" ")
      .split(" ")
      .filter((s) => s !== "");

    const sqlFmtArgs = [
      "--diff",
      "--no-progressbar",
      "--quiet",
      ...sqlFmtAdditionalParamsSetting,
      document.uri.fsPath,
    ];
    try {
      // try to find sqlfmt on PATH if not set
      const sqlFmtPath = sqlFmtPathSetting || (await which("sqlfmt"));
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        await this.commandProcessExecutionFactory
          .createCommandProcessExecution(sqlFmtPath, sqlFmtArgs)
          .complete();
        return [];
      } catch (diffOutput) {
        try {
          return this.processDiffOutput(document, diffOutput as string);
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

  private processDiffOutput(
    document: TextDocument,
    diffOutput: string,
  ): TextEdit[] {
    const textEdits: TextEdit[] = [];
    const diffs = parseDiff(diffOutput);
    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        // Ensure lines added are not out of bounds of chunk
        const oldBoundChunk = chunk.oldLines + chunk.oldStart - 1;
        chunk.changes.forEach((change) => {
          if (this.isAddChange(change)) {
            textEdits.push(
              TextEdit.insert(
                document.lineAt(Math.min(change.ln, oldBoundChunk) - 1).range
                  .start,
                change.content.slice(1) + "\n",
              ),
            );
          }
          if (this.isNormalChange(change)) {
            // Reflect "replace" edits as delete & insert
            // First, delete line
            textEdits.push(
              TextEdit.delete(
                document.lineAt(change.ln1 - 1).rangeIncludingLineBreak,
              ),
            );
            // Add line
            textEdits.push(
              TextEdit.insert(
                document.lineAt(Math.min(change.ln2, oldBoundChunk) - 1).range
                  .start,
                change.content.slice(1) + "\n",
              ),
            );
          }
          if (this.isDeleteChange(change)) {
            textEdits.push(
              TextEdit.delete(
                document.lineAt(change.ln - 1).rangeIncludingLineBreak,
              ),
            );
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
