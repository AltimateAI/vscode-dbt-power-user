import * as vscode from "vscode";

export class NotebookStatusBarProvider
  implements vscode.NotebookCellStatusBarItemProvider, vscode.Disposable
{
  private _disposables: vscode.Disposable[] = [];

  dispose() {
    this._disposables.forEach((d) => d.dispose());
  }
  provideCellStatusBarItems(
    cell: vscode.NotebookCell,
  ): vscode.NotebookCellStatusBarItem[] | undefined {
    const leftItem = new vscode.NotebookCellStatusBarItem(
      "$(globe) Left item",
      vscode.NotebookCellStatusBarAlignment.Left,
    );
    leftItem.command = "dbtPowerUser.notebookItem";
    leftItem.tooltip = "Cell item tooltip";

    const rightItem = new vscode.NotebookCellStatusBarItem(
      "$(globe) Right item",
      vscode.NotebookCellStatusBarAlignment.Right,
    );
    rightItem.command = "dbtPowerUser.notebookItem";
    rightItem.tooltip = "Cell item tooltip";

    return [leftItem, rightItem];
  }
}
