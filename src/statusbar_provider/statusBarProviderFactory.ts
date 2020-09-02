import { DBTManifestInstance } from "../dbtManifest";
import { RunResultStatusBar } from "./runResultStatusBarProvider";

export class StatusBarProviderFactory {

  static createRunResultStatusBar(): RunResultStatusBar {
    const runResultStatusBar = new RunResultStatusBar();
    DBTManifestInstance.addOnDBTManifestCacheChangedHandler(
      (event) => runResultStatusBar.onDBTManifestCacheChanged(event)
    );
    return runResultStatusBar;
  }
}