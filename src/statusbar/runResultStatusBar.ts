import { window, StatusBarAlignment, StatusBarItem, Disposable } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { RunResultMetaMap } from "../domain";
import { DbtProjectContainer } from "../manifest/dbtProjectContainer";
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

  constructor(private dbtProjectContainer: DbtProjectContainer) {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(() => this.showRunResult()),
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event)
      )
    );
  }

  dispose() {
    this.statusBar.dispose();
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  showRunResult(): void {
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor !== undefined) {
      const currentFilePath = activeTextEditor.document.uri;
      const projectRootpath = this.dbtProjectContainer.getProjectRootpath(
        currentFilePath
      );
      if (projectRootpath === undefined) {
        return;
      }
      const runResultMap = this.runResultMetaMap.get(projectRootpath.fsPath);
      if (runResultMap === undefined) {
        return;
      }
      const runResult = runResultMap.get(currentFilePath.fsPath);
      const statusBar = this.statusBar;
      if (runResult === undefined || runResult.compiledPath === undefined) {
        statusBar.hide();
        return;
      }
      if (runResult.status === null) {
        statusBar.text = `$(check) Model compiled ${dayjs().to(
          dayjs(runResult.timestamp)
        )}`;
        statusBar.command = {
          command: "dbtPowerUser.navigateToFile",
          arguments: [runResult.compiledPath],
          title: "Go to compiled SQL",
        };
      } else {
        if (runResult.error === null) {
          statusBar.text = `$(check) Model ran ${dayjs().to(
            dayjs(runResult.timestamp)
          )}`;
          statusBar.command = {
            command: "dbtPowerUser.navigateToFile",
            arguments: [runResult.compiledPath],
            title: "Go to compiled SQL",
          };
        } else {
          statusBar.text = `$(error) Model ran ${dayjs().to(
            dayjs(runResult.timestamp)
          )}`;
          statusBar.command = {
            command: "dbtPowerUser.navigateToFileWithErrorMessage",
            arguments: [runResult.compiledPath, runResult.error],
            title: "Go to compiled SQL",
          };
        }
      }
      statusBar.tooltip = "Go to compiled SQL";
      statusBar.show();
    }
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.runResultMetaMap.set(
        added.projectRoot.fsPath,
        added.runResultMetaMap
      );
      this.showRunResult();
    });
    event.removed?.forEach((removed) => {
      this.runResultMetaMap.delete(removed.projectRoot.fsPath);
    });
  }
}
