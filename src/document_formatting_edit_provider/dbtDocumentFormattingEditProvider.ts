import which from "which";
import parseDiff, {
  Chunk,
  Change,
  File as FileDiff,
  AddChange,
  NormalChange,
  DeleteChange,
} from "parse-diff";
import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  TextDocument,
  TextEdit,
  window,
  workspace,
  Range,
  Position,
} from "vscode";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { PythonEnvironment } from "../manifest/pythonEnvironment";

@provideSingleton(DbtDocumentFormattingEditProvider)
export class DbtDocumentFormattingEditProvider
  implements DocumentFormattingEditProvider
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private telemetry: TelemetryService,
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
      const sqlFmtPath = sqlFmtPathSetting || (await which("sqlfmt"));
      this.telemetry.sendTelemetryEvent("formatDbtModel", {
        sqlFmtPath: sqlFmtPathSetting ? "setting" : "path",
      });
      try {
        const { stderr } = await this.commandProcessExecutionFactory
          .createCommandProcessExecution({
            command: sqlFmtPath,
            args: sqlFmtArgs,
            stdin: document.getText(),
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

  private processDiffOutput(
    document: TextDocument,
    diffOutput: string,
  ): TextEdit[] {
    const textEdits: TextEdit[] = [];
    const diffs = parseDiff(diffOutput);
    diffs.forEach((diff: FileDiff) => {
      let lastChunk: Chunk | null = null;
      diff.chunks.forEach((chunk: Chunk) => {
        if (lastChunk) {
          let index = lastChunk.oldStart + lastChunk.oldLines,
            lineNb = 0;
          for (; index < chunk.oldStart; index++, lineNb++) {
            textEdits.push(
              TextEdit.delete(
                new Range(
                  lastChunk.newStart + lastChunk.newLines - 2 + lineNb,
                  0,
                  lastChunk.newStart + lastChunk.newLines - 2 + lineNb,
                  0,
                ),
              ),
            );
          }
        }

        const oldBoundChunk = chunk.oldLines + chunk.oldStart - 1;
        chunk.changes.forEach((change: Change) => {
          if (this.isAddChange(change)) {
            textEdits.push(
              TextEdit.insert(new Position(change.ln - 1, 0), change.content),
            );
          }
          if (this.isNormalChange(change)) {
            textEdits.push(
              TextEdit.replace(
                new Range(
                  change.ln1! - 1,
                  0,
                  change.ln1! - 1,
                  document.lineAt(change.ln1! - 1).text.length,
                ),
                change.content,
              ),
            );
          }
          if (this.isDeleteChange(change)) {
            textEdits.push(
              TextEdit.delete(
                new Range(
                  change.ln! - 1,
                  0,
                  change.ln! - 1,
                  document.lineAt(change.ln! - 1).text.length,
                ),
              ),
            );
          }
        });
        lastChunk = chunk;
      });
    });
    return textEdits;
  }

  private isAddChange(change: Change): change is AddChange {
    return change.type === "add";
  }

  private isNormalChange(change: Change): change is NormalChange {
    return change.type === "normal";
  }

  private isDeleteChange(change: Change): change is DeleteChange {
    return change.type === "del";
  }
}
