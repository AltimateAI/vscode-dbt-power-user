import { commands, Disposable, window } from "vscode";
import { sep } from "path";
import { RunModel } from "./runModel";
import { provideSingleton } from "../utils";
import { RunModelType } from "../domain";
import { CompileSqlPanel } from "../webview_provider";

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
      commands.registerCommand("dbtPowerUser.showCompileWindow", async () => {
        CompileSqlPanel.createOrShow();
        globalThis.currentSql = window.activeTextEditor?.document.getText() ?? "";
        const parts = window.activeTextEditor?.document.fileName.split(sep);
        if (parts) {
          globalThis.currentSqlFile = parts.slice(
            parts.length >= 3 ? -3 : -parts.length
          ).join(" > ");
        }
        await CompileSqlPanel.currentPanel?.getRenderedHTML();
      }
      ),
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
      commands.registerCommand("dbtPowerUser.previewSQL", () =>
        this.runModel.previewModelOnActiveWindow()
      ),
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
