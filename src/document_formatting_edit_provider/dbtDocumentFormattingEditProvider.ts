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
  Range,
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

    if (document.lineCount === 0) {
      return textEdits;
    }

    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        // Build new content from add + normal changes (these are the lines
        // that should appear in the formatted output for this chunk's range).
        const newLines = chunk.changes
          .filter((c) => this.isAddChange(c) || this.isNormalChange(c))
          .map((c) => c.content.slice(1));
        const newContent =
          newLines.length > 0 ? newLines.join("\n") + "\n" : "";

        if (chunk.oldLines === 0) {
          // Pure insertion — no old lines to replace
          const insertLine = Math.min(chunk.oldStart, document.lineCount) - 1;
          textEdits.push(
            TextEdit.insert(
              document.lineAt(Math.max(insertLine, 0)).range.start,
              newContent,
            ),
          );
        } else {
          // Replace the chunk's old range with new content.
          // VSCode applies all TextEdits simultaneously against the original
          // document, so each chunk references original line positions.
          const startLine = Math.max(chunk.oldStart - 1, 0);
          const endLine = Math.min(
            startLine + chunk.oldLines - 1,
            document.lineCount - 1,
          );
          if (startLine >= document.lineCount) {
            return;
          }
          const range = new Range(
            document.lineAt(startLine).range.start,
            document.lineAt(endLine).rangeIncludingLineBreak.end,
          );
          textEdits.push(TextEdit.replace(range, newContent));
        }
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
