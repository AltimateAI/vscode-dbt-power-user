import { commands, Disposable } from "vscode";
import { RunModel } from "./runModel";
import { provideSingleton } from "../utils";
import { InstallDBT } from "./installDBT";
import { UpdateDBT } from "./updateDBT";
import { RunModelType } from "../domain";

@provideSingleton(VSCodeCommands)
export class VSCodeCommands implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private installDBT: InstallDBT,
    private updateDBT: UpdateDBT,
    private runModel: RunModel,
  ) {
    this.disposables.push(
      commands.registerCommand("dbtPowerUser.runCurrentModel", () =>
        this.runModel.runModelOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.compileCurrentModel", () =>
        this.runModel.compileModelOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.runChildrenModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.CHILDREN)()
      ),
      commands.registerCommand("dbtPowerUser.runParentModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.PARENTS)()
      ),
      commands.registerCommand("dbtPowerUser.showRanSQL", () =>
        this.runModel.showRanSQLOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.showCompiledSQL", () =>
        this.runModel.showCompiledSQLOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.installDBT", () =>
        this.installDBT.installDBTCommand()
      ),
      commands.registerCommand("dbtPowerUser.updateDBT", () =>
        this.updateDBT.updateDBTCommand()
      )
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
