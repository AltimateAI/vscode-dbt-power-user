import { commands, Disposable, window, TextEditor, workspace, ViewColumn, languages, ProgressLocation, Uri } from "vscode";
import { RunModel } from "./runModel";
import { provideSingleton } from "../utils";
import { RunModelType } from "../domain";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";
import { InstallDbtOsmosis } from "./installDbtOsmosis";


@provideSingleton(VSCodeCommands)
export class VSCodeCommands implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private runModel: RunModel,
    private installDbtOsmois: InstallDbtOsmosis,
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
      commands.registerTextEditorCommand('dbtPowerUser.sqlPreview', async (editor: TextEditor) => {
        const uri = editor.document.uri.with({ scheme: SqlPreviewContentProvider.SCHEME });
        const doc = await workspace.openTextDocument(uri);
        const isOpen = window.visibleTextEditors.some(e => e.document.uri === uri);
        await window.showTextDocument(doc, ViewColumn.Beside, false);
        await languages.setTextDocumentLanguage(doc, 'sql');
        if (!isOpen) {
          await commands.executeCommand('workbench.action.lockEditorGroup');
          await commands.executeCommand('workbench.action.focusPreviousGroup');
        } else {
          await commands.executeCommand('workbench.action.closeActiveEditor');
          return;
        }
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
      commands.registerCommand("dbtPowerUser.installDbtOsmosis", () =>
        this.installDbtOsmois.installDbtOsmosis()
      )
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
