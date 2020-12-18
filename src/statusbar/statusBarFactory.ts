import { RunResultStatusBar } from "./runResultStatusBarProvider";
import { StatusBarItem } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    dbtProjectContainer.addProvider(runResultStatusBar);
    return runResultStatusBar.statusBar;
  }
}