import { RunResultStatusBar } from "./runResultStatusBarProvider";
import { StatusBarItem } from "vscode";
import { manifestContainer } from "../manifest/manifestContainer";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    manifestContainer.addEventHandler(runResultStatusBar);
    return runResultStatusBar.statusBar;
  }
}