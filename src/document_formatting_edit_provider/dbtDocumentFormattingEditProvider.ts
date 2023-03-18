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
        try {
          return this.processDiffOutput(document, diffOutput as string);
        }
          catch (error) {
            window.showErrorMessage(
              "Could not process difference output from sqlfmt. Detailed error: " + error
            );
          }
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
    const lineCount = document.lineCount;
    diffs.forEach((diff) => {
      diff.chunks.forEach((chunk) => {
        const lastLineChunk = chunk.newLines
        chunk.changes.forEach((change) => {
          if (this.isAddChange(change)) {
            console.log(change)
            // Ensure lines addded are not out of bounds
            var targetLine = Math.min(change.ln, lineCount);
            textEdits.push(
              TextEdit.insert(
                document.lineAt(targetLine - 1).range.start,
                change.content.slice(1) + "\n"
              )
            );
          }
          if (this.isNormalChange(change)) {
            // Reflect "replace" edits as delete & insert
            // First, delete line
            console.log(change)
            
            textEdits.push(
              TextEdit.delete(
                document.lineAt(change.ln1 - 1).rangeIncludingLineBreak
              )
            );

            // Add line
            // Ensure lines addded are not out of bounds
            let targetLine = Math.min(change.ln2, lineCount);
            // Prevent interference at end of chunk
            if (targetLine == lastLineChunk) {
              targetLine--
            }
            textEdits.push(
              TextEdit.insert(
                document.lineAt(targetLine - 1).range.start,
                change.content.slice(1) + "\n"
              )
            );
          }
          if (this.isDeleteChange(change)) {
            console.log(change)
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
    return (
      /*  
          parseDiff reads sqlfmt's "\ No newline at end of file" diff output as a delete change. 
          This deceptive delete change should be skipped. So, adding an edge case to the expression.
      */
      change.type === "del" && change.content !== "\\ No newline at end of file"
    );
  }
}
