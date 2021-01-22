import { commands, Disposable } from "vscode";
import { RunModel, RunModelType } from "./runModel";
import { provideSingleton } from "../utils";
import { InstallDBT } from "./installDBT";
import { UpdateDBT } from "./updateDBT";
import { NavigateToCompiled } from "./navigateToCompiled";
import { Uri } from "vscode";

@provideSingleton(VSCodeCommands)
export class VSCodeCommands implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private installDBT: InstallDBT,
    private updateDBT: UpdateDBT,
    private runModel: RunModel,
    private navigateToCompiled: NavigateToCompiled
  ) {
    this.disposables.push(
      commands.registerCommand("dbtPowerUser.runCurrentModel", () =>
        this.runModel.runModelOnActiveWindow()
      ),
      commands.registerCommand("dbtPowerUser.runChildrenModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.CHILDREN)()
      ),
      commands.registerCommand("dbtPowerUser.runParentModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.PARENTS)()
      ),
      commands.registerCommand("dbtPowerUser.navigateToCompiled", (url?: Uri) =>
        this.navigateToCompiled.navigateToCompiled(url)
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
