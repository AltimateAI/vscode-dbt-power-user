import { window, StatusBarAlignment, StatusBarItem, Disposable } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { RunResultMetaMap } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheChangedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
dayjs.extend(relativeTime);

@provideSingleton(RunResultStatusBar)
export class RunResultStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    0
  );
  private runResultMetaMap: Map<string, RunResultMetaMap> = new Map();
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(() => this.showRunResult()),
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event)
      ),
      this.statusBar,
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  showRunResult(): void {
    const activeTextEditor = window.activeTextEditor;
    const statusBar = this.statusBar;
    if (activeTextEditor === undefined) {
      statusBar.hide();
      return;
    }
    const currentFilePath = activeTextEditor.document.uri;
    const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
      currentFilePath
    );
    if (projectRootpath === undefined) {
      statusBar.hide();
      return;
    }
    const runResultMap = this.runResultMetaMap.get(projectRootpath.fsPath);
    if (runResultMap === undefined) {
      statusBar.hide();
      return;
    }
    const runResult = runResultMap.get(currentFilePath.fsPath);
    
    if (runResult === undefined || runResult.compiledPath === undefined) {
      statusBar.hide();
      return;
    }

    const compiledOrRan = runResult.status === null ? "compiled" : "ran";
    const successOrFail = runResult.error === null ? "$(check)" : "$(error)";

    statusBar.text = `${successOrFail} Model ${compiledOrRan} ${dayjs().to(
      dayjs(runResult.timestamp)
    )}`;
    statusBar.command = {
      command: "dbtPowerUser.navigateToCompiled",
      arguments: [currentFilePath],
      title: "Go to compiled SQL",
    };

    statusBar.tooltip = "Go to compiled SQL";
    statusBar.show();
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.runResultMetaMap.set(
        added.projectRoot.fsPath,
        added.runResultMetaMap
      );
    });
    event.removed?.forEach((removed) => {
      this.runResultMetaMap.delete(removed.projectRoot.fsPath);
    });
    this.showRunResult();
  }
}
