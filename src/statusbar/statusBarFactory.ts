import { RunResultStatusBar } from "./runResultStatusBarProvider";
import { StatusBarItem } from "vscode";
import { manifestContainer } from "../manifest/dbtProjectContainer";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    manifestContainer.addProvider(runResultStatusBar);
    return runResultStatusBar.statusBar;
  }
}