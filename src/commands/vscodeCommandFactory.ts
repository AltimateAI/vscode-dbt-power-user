import * as vscode from "vscode";
import navigateToFile from "./navigateToFile";
import { RunModel, RunModelType } from "./runModel";
import navigateToFileWithErrorMessage from "./navigateToFileWithErrorMessage";
import { provideSingleton } from "../utils";
import { InstallDBT } from "./installDBT";
import { UpdateDBT } from "./updateDBT";

@provideSingleton(VSCodeCommandFactory)
export class VSCodeCommandFactory {
  constructor(
    private installDBT: InstallDBT,
    private updateDBT: UpdateDBT,
    private runModel: RunModel
  ) {}
  createCommands(): { dispose(): any }[] {
    return [
      vscode.commands.registerCommand("dbtPowerUser.runCurrentModel", () =>
        this.runModel.runModelOnActiveWindow()
      ),
      vscode.commands.registerCommand("dbtPowerUser.runChildrenModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.CHILDREN)()
      ),
      vscode.commands.registerCommand("dbtPowerUser.runParentModels", () =>
        this.runModel.runModelOnNodeTreeItem(RunModelType.PARENTS)()
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.navigateToFile",
        navigateToFile
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.navigateToFileWithErrorMessage",
        navigateToFileWithErrorMessage
      ),
      vscode.commands.registerCommand("dbtPowerUser.installDBT", () =>
        this.installDBT.installDBTCommand()
      ),
      vscode.commands.registerCommand("dbtPowerUser.updateDBT", () =>
        this.updateDBT.updateDBTCommand()
      ),
    ];
  }
}
