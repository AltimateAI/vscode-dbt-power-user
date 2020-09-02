import { DBTManifestCacheChangedEvent, RunResultMetaMap } from "../dbtManifest";
import { window, StatusBarAlignment, StatusBarItem, ThemeColor } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import * as path from "path";
dayjs.extend(relativeTime);

export class RunResultStatusBar {
  private runResultMetaMap: RunResultMetaMap = new Map();
  statusBar: StatusBarItem;

  constructor() {
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    window.onDidChangeActiveTextEditor(this.showRunResult, this);
  }

  onDBTManifestCacheChanged(event: DBTManifestCacheChangedEvent): void {
    this.runResultMetaMap = event.runResultMetaMap;
    this.showRunResult();
  }

  showRunResult(): void {
    const activeTextEditor = window.activeTextEditor;
    if (activeTextEditor !== undefined) {
      const currentFilePath = activeTextEditor.document.uri.path;
      const runResult = this.runResultMetaMap.get(currentFilePath);
      const statusBar = this.statusBar;
      if (runResult === undefined) {
        statusBar.hide();
        return;
      };
      if (runResult.error === null) {
        statusBar.text = `✓ ran ${dayjs().to(dayjs(runResult.timestamp))}`;
        statusBar.color = undefined;
        statusBar.command = { command: 'navigateToFile', arguments: [runResult.buildPath], title: 'Go to compiled SQL' };

      } else {
        statusBar.text = `x ran ${dayjs().to(dayjs(runResult.timestamp))}`;
        statusBar.color = new ThemeColor('errorForeground');
        statusBar.command = { command: 'navigateToFileWithErrorMessage', arguments: [runResult.buildPath, runResult.error], title: 'Go to compiled SQL' };
      }
      statusBar.tooltip = 'Go to compiled SQL';
      statusBar.show();
    }
  }
}