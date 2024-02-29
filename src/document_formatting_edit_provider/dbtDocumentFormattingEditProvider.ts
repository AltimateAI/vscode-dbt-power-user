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
import {
  extendErrorWithSupportLinks,
  provideSingleton,
  substituteSettingsVariables,
} from "../utils";
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

  private getSqlFmtPathSetting(): string | undefined {
    const value = workspace
      .getConfiguration("dbt")
      .get<string>("sqlFmtPath", "");
    return value ? substituteSettingsVariables(value) : undefined;
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtPathSetting = this.getSqlFmtPathSetting();
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
      const sqlFmtPath = sqlFmtPathSetting || (await which("sqlfmt"));
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: sqlFmtPath,
            args: sqlFmtArgs,
            stdin: document.getText(),
          })
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
      let lastChunk: parseDiff.Chunk;
      diff.chunks.forEach((chunk) => {
        if (lastChunk) {
          // Move the lines in-between chunks to their new positions
          // (The lines after the last chunk don't need to be handled)
          for (
            let index = lastChunk.oldStart + lastChunk.oldLines, lineNb = 0;
            index < chunk.oldStart;
            index++, lineNb++
          ) {
            textEdits.push(
              ...this.replace(
                document,
                index - 1,
                lastChunk.newStart + lastChunk.newLines - 2 + lineNb,
                document.lineAt(index - 1).text + "\n",
              ),
            );
          }
        }
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
            textEdits.push(
              ...this.replace(
                document,
                change.ln1 - 1,
                Math.min(change.ln2, oldBoundChunk) - 1,
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
        lastChunk = chunk;
      });
    });
    return textEdits;
  }

  private replace(
    document: TextDocument,
    lineToDelete: number,
    lineToInsert: number,
    newText: string,
  ): TextEdit[] {
    // Reflect "replace" edits as delete & insert
    // First, delete line, then add line
    return [
      TextEdit.delete(document.lineAt(lineToDelete).rangeIncludingLineBreak),
      TextEdit.insert(document.lineAt(lineToInsert).range.start, newText),
    ];
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
