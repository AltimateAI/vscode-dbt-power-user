import { commands, Disposable, window, TextEditor, workspace, ViewColumn, languages, ProgressLocation } from "vscode";
import { RunModel } from "./runModel";
import { provideSingleton } from "../utils";
import { RunModelType } from "../domain";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { reparseProject, isError } from "../osmosis_client";

@provideSingleton(VSCodeCommands)
export class VSCodeCommands implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private runModel: RunModel,
  ) {
    this.disposables.push(
      commands.registerCommand("dbtPowerUser.runCurrentModel", () =>
        this.runModel.runModelOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.testCurrentModel", () =>
        this.runModel.runTestsOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.compileCurrentModel", () =>
        this.runModel.compileModelOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.changeTarget", async () => {
        const target = await window.showInputBox({ placeHolder: "Target profile name" });
        const status = await window.withProgress(
          { title: "Parsing dbt project...", location: ProgressLocation.Notification },
          async () => reparseProject(target, true));
        if (isError(status)) {
          console.log(status.error);
          window.showErrorMessage(status.error.message);
        } else {
          window.showInformationMessage(status.result);
          if (window.visibleTextEditors.some(
            (editor) => editor.document.uri.path === SqlPreviewContentProvider.URI.path)) {
            SqlPreviewContentProvider.instance?.onDidChangeEmitter.fire(SqlPreviewContentProvider.URI);
          }
        }
      }),
      commands.registerTextEditorCommand('dbtPowerUser.showCompileWindow', async (editor: TextEditor) => {
        if (editor.document.uri.path === SqlPreviewContentProvider.URI.path) {
          return;
        }
        const doc = await workspace.openTextDocument(SqlPreviewContentProvider.URI);
        const isOpen = window.visibleTextEditors.some(e => e.document.uri.path === SqlPreviewContentProvider.URI.path);
        await window.showTextDocument(doc, ViewColumn.Beside, false);
        if (!isOpen) {
          await commands.executeCommand('workbench.action.lockEditorGroup');
          await commands.executeCommand('workbench.action.focusPreviousGroup');
        } else {
          await commands.executeCommand('workbench.action.closeActiveEditor');
          return;
        }
        await languages.setTextDocumentLanguage(doc, 'sql');
        SqlPreviewContentProvider.instance?.onDidChangeEmitter.fire(SqlPreviewContentProvider.URI);
      }),
      commands.registerCommand("dbtPowerUser.runTest", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.TEST)(model)
      ),
      commands.registerCommand("dbtPowerUser.runChildrenModels", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.CHILDREN)(model)
      ),
      commands.registerCommand("dbtPowerUser.runParentModels", (model) =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.PARENTS)(model)
      ),
      commands.registerCommand("dbtPowerUser.showRunSQL", () =>
        this.runModel.showRunSQLOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.showCompiledSQL", () =>
        this.runModel.showCompiledSQLOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.executeSQL", () =>
        this.runModel.executeQueryOnActiveWindow()
      ),
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
