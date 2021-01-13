import * as vscode from "vscode";
import navigateToFile from "./navigateToFile";
import {
  runModelOnNodeTreeItem,
  runModelOnActiveWindow,
  RunModelType,
} from "./runModel";
import navigateToFileWithErrorMessage from "./navigateToFileWithErrorMessage";
import installDBT from "./installDBT";
import updateDBT from "./updateDBT";
import { provideSingleton } from "../utils";

@provideSingleton(VSCodeCommandFactory)
export class VSCodeCommandFactory {
  createCommands(): { dispose(): any }[] {
    return [
      vscode.commands.registerCommand(
        "dbtPowerUser.runCurrentModel",
        runModelOnActiveWindow
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.runChildrenModels",
        runModelOnNodeTreeItem(RunModelType.CHILDREN)
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.runParentModels",
        runModelOnNodeTreeItem(RunModelType.PARENTS)
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.navigateToFile",
        navigateToFile
      ),
      vscode.commands.registerCommand(
        "dbtPowerUser.navigateToFileWithErrorMessage",
        navigateToFileWithErrorMessage
      ),
      vscode.commands.registerCommand("dbtPowerUser.installDBT", installDBT),
      vscode.commands.registerCommand("dbtPowerUser.updateDBT", updateDBT),
    ];
  }
}
