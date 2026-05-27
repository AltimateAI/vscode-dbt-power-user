import * as vscode from "vscode";

export const TROUBLESHOOT_COMMAND = "dbtPowerUser.troubleshootError";

export class TroubleshootCodeActionProvider
  implements vscode.CodeActionProvider
{
  static readonly providedKinds = [vscode.CodeActionKind.QuickFix];

  provideCodeActions(
    document: vscode.TextDocument,
    _range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    _token: vscode.CancellationToken,
  ): vscode.CodeAction[] {
    return context.diagnostics
      .filter((d) => d.severity === vscode.DiagnosticSeverity.Error)
      .map((diagnostic) => this.createAction(document, diagnostic));
  }

  private createAction(
    document: vscode.TextDocument,
    diagnostic: vscode.Diagnostic,
  ): vscode.CodeAction {
    const action = new vscode.CodeAction(
      "Troubleshoot with Altimate Code",
      vscode.CodeActionKind.QuickFix,
    );
    action.diagnostics = [diagnostic];
    action.command = {
      command: TROUBLESHOOT_COMMAND,
      title: "Troubleshoot with Altimate Code",
      arguments: [
        {
          errorMessage: diagnostic.message,
          errorCode:
            typeof diagnostic.code === "object" && diagnostic.code !== null
              ? String((diagnostic.code as { value: string | number }).value)
              : String(diagnostic.code ?? ""),
          source: diagnostic.source ?? "",
          filePath: document.uri.fsPath,
          lineNumber: diagnostic.range.start.line + 1,
        },
      ],
    };
    return action;
  }
}
