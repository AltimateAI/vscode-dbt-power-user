import { RunResultStatusBar } from "./runResultStatusBar";
import { StatusBarItem } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTStatusBar } from "./dbtStatusBar";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    dbtProjectContainer.addOnManifestCacheChangedHandler(runResultStatusBar);
    return runResultStatusBar.statusBar;
  }
}
