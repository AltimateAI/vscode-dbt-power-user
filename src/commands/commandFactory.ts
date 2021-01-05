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

export class CommandFactory {
  static createCommands(): { dispose(): any }[] {
    return [
      vscode.commands.registerCommand(
        "run.dbt.currentModel",
        runModelOnActiveWindow
      ),
      vscode.commands.registerCommand(
        "run.dbt.childrenModels",
        runModelOnNodeTreeItem(RunModelType.CHILDREN)
      ),
      vscode.commands.registerCommand(
        "run.dbt.parentModels",
        runModelOnNodeTreeItem(RunModelType.PARENTS)
      ),
      vscode.commands.registerCommand("navigateToFile", navigateToFile),
      vscode.commands.registerCommand(
        "navigateToFileWithErrorMessage",
        navigateToFileWithErrorMessage
      ),
      vscode.commands.registerCommand("installDBT", installDBT),
      vscode.commands.registerCommand("updateDBT", updateDBT),
    ];
  }
}
