import { DBTManifestCacheChangedEvent } from "../dbtManifest";
import { window, StatusBarAlignment, StatusBarItem, ThemeColor, workspace } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { getProjectRootpath } from "../utils";
import { RunResultMetaMap } from "../domain";
dayjs.extend(relativeTime);

export class RunResultStatusBar {
  statusBar: StatusBarItem;
  private runResultMetaMap: Map<string, RunResultMetaMap> = new Map();

  constructor() {
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    window.onDidChangeActiveTextEditor(() => this.showRunResult());
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent, rootpath: string): void {
    this.runResultMetaMap.set(rootpath, event.runResultMetaMap);
    this.showRunResult();
  }

  showRunResult(): void {
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor !== undefined) {
      const currentFilePath = activeTextEditor.document.uri.path;
      const workspaceFolders = workspace.workspaceFolders;
      if (workspaceFolders === undefined) {
        return;
      }
      const projectRootpath = getProjectRootpath(workspaceFolders, currentFilePath);
      const runResultMap = this.runResultMetaMap.get(projectRootpath);
      if (runResultMap === undefined) {
        return;
      }
      const runResult = runResultMap.get(currentFilePath);
      const statusBar = this.statusBar;
      if (runResult === undefined || runResult.compiledPath === undefined) {
        statusBar.hide();
        return;
      };
      if (runResult.status === null) {
        statusBar.text = `✓ model compiled ${dayjs().to(dayjs(runResult.timestamp))}`;
        statusBar.color = undefined;
        statusBar.command = { command: 'navigateToFile', arguments: [runResult.compiledPath], title: 'Go to compiled SQL' };
      } else {
        if (runResult.error === null) {
          statusBar.text = `$(check) Model ran ${dayjs().to(dayjs(runResult.timestamp))}`;
          statusBar.command = { command: 'navigateToFile', arguments: [runResult.compiledPath], title: 'Go to compiled SQL' };

        } else {
          statusBar.text = `$(error) Model ran ${dayjs().to(dayjs(runResult.timestamp))}`;
          statusBar.command = { command: 'navigateToFileWithErrorMessage', arguments: [runResult.compiledPath, runResult.error], title: 'Go to compiled SQL' };
        }
      }
      statusBar.tooltip = 'Go to compiled SQL';
      statusBar.show();
    }
  }
}