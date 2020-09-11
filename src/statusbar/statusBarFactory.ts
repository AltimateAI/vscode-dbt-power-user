import { DBTManifestInstance } from "../dbtManifest";
import { RunResultStatusBar } from "./runResultStatusBarProvider";
import { StatusBarItem } from "vscode";
import { manifestContainer } from "../manifestContainer";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    manifestContainer.addEventHandler(runResultStatusBar);
    return runResultStatusBar.statusBar;
  }
}