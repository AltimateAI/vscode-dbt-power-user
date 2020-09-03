import { DBTManifestInstance } from "../dbtManifest";
import { RunResultStatusBar } from "./runResultStatusBarProvider";
import { StatusBarItem } from "vscode";

export class StatusBarFactory {

  static createRunResultStatusBar(): StatusBarItem {
    const runResultStatusBar = new RunResultStatusBar();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => runResultStatusBar.onDBTManifestCacheChanged(event)
    );
    return runResultStatusBar.statusBar;
  }
}