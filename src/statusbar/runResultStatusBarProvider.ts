import {
  ManifestCacheChangedEvent,
  OnManifestCacheChanged,
} from "../manifest/manifestCacheChangedEvent";
import { window, StatusBarAlignment, StatusBarItem, ThemeColor } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { RunResultMetaMap } from "../domain";
import { manifestContainer } from "../manifest/dbtProjectContainer";
dayjs.extend(relativeTime);

export class RunResultStatusBar implements OnManifestCacheChanged {
  statusBar: StatusBarItem;
  private runResultMetaMap: Map<string, RunResultMetaMap> = new Map();

  constructor() {
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    window.onDidChangeActiveTextEditor(() => this.showRunResult());
  }

  onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    this.runResultMetaMap.set(event.projectRoot.fsPath, event.runResultMetaMap);
    this.showRunResult();
  }

  showRunResult(): void {
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor !== undefined) {
      const currentFilePath = activeTextEditor.document.uri;
      const projectRootpath = manifestContainer.getProjectRootpath(currentFilePath);
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
      };
      if (runResult.status === null) {
        statusBar.text = `$(check) Model compiled ${dayjs().to(dayjs(runResult.timestamp))}`;
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