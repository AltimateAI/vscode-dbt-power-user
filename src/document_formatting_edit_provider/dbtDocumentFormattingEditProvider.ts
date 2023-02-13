import * as parseDiff from "parse-diff";
import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  TextDocument,
  TextEdit,
  window,
} from "vscode";
import * as which from "which";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { provideSingleton } from "../utils";

@provideSingleton(DbtDocumentFormattingEditProvider)
export class DbtDocumentFormattingEditProvider
  implements DocumentFormattingEditProvider
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory
  ) {}

  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    return this.executeSqlFmt(document);
  }

  private async executeSqlFmt(document: TextDocument) {
    const sqlFmtArgs = [
      "--diff",
      "--no-progressbar",
      "--quiet",
      document.uri.fsPath,
    ];
    try {
      // try to find sqlfmt on PATH
      const sqlFmtPath = await which("sqlfmt");
      try {
        await this.commandProcessExecutionFactory
          .createCommandProcessExecution(sqlFmtPath, sqlFmtArgs)
          .complete();
        return [];
      } catch (diffOutput) {
        return this.processDiffOutput(document, diffOutput as string);
      }
    } catch (error) {
      window.showErrorMessage(
        "Could not run sqlfmt. Did you install sqlfmt? Detailed error: " + error
      );
    }
    return [];
  }

  private processDiffOutput(
    document: TextDocument,
    diffOutput: string
  ): TextEdit[] {
    const textEdits: TextEdit[] = [];
    const diffs = parseDiff(diffOutput);
    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        chunk.changes.forEach((change) => {
          if (this.isAddChange(change)) {
            textEdits.push(
              TextEdit.insert(
                document.lineAt(change.ln - 1).range.start,
                change.content.slice(1) + "\n"
              )
            );
          }
          if (this.isNormalChange(change)) {
            // Reflect "replace" edits as delete & insert
            // First, delete line
            textEdits.push(
              TextEdit.delete(
                document.lineAt(change.ln1 - 1).rangeIncludingLineBreak
              )
            );

            // Add line
            textEdits.push(
              TextEdit.insert(
                document.lineAt(change.ln2 - 1).range.start,
                change.content.slice(1) + "\n"
              )
            );
          }
          if (this.isDeleteChange(change)) {
            textEdits.push(
              TextEdit.delete(
                document.lineAt(change.ln - 1).rangeIncludingLineBreak
              )
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
    change: parseDiff.Change
  ): change is parseDiff.NormalChange {
    return change.type === "normal";
  }

  private isDeleteChange(
    change: parseDiff.Change
  ): change is parseDiff.DeleteChange {
    return change.type === "del";
  }
}
