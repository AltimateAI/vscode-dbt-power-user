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
    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        // Process all changes in the chunk
        chunk.changes.forEach((change) => {
          if (this.isAddChange(change)) {
            // For add changes, use the line number directly without bounds checking
            // The line number from the diff should be correct
            const lineIndex = change.ln - 1;
            if (lineIndex <= document.lineCount) {
              textEdits.push(
                TextEdit.insert(
                  lineIndex < document.lineCount 
                    ? document.lineAt(lineIndex).range.start
                    : document.lineAt(document.lineCount - 1).range.end,
                  change.content.slice(1) + "\n",
                ),
              );
            }
          }
          if (this.isNormalChange(change)) {
            // For normal changes, ensure we're within document bounds
            const oldLineIndex = change.ln1 - 1;
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
            // For delete changes, ensure we're within document bounds
            const lineIndex = change.ln - 1;
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
