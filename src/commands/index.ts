import { commands, Disposable } from "vscode";
import { RunModel } from "./runModel";
import { provideSingleton } from "../utils";
import { RunModelType } from "../domain";

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
      commands.registerCommand("dbtPowerUser.compileCurrentModel", () =>
        this.runModel.compileModelOnActiveWindow()
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
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
