import { DBTManifestCacheChangedEvent, RunResultMetaMap } from "../dbtManifest";
import { window, StatusBarAlignment, StatusBarItem, ThemeColor, Command } from "vscode";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export class RunResultStatusBar {
  statusBar: StatusBarItem;
  private runResultMetaMap: RunResultMetaMap = new Map();

  constructor() {
    this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0);
    window.onDidChangeActiveTextEditor(() => this.showRunResult());
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
      if (runResult === undefined || runResult.compiledPath === undefined) {
        statusBar.hide();
        return;
      };
      if(runResult.status === null) {
        statusBar.text = `✓ model compiled ${dayjs().to(dayjs(runResult.timestamp))}`;
          statusBar.color = undefined;
          statusBar.command = { command: 'navigateToFile', arguments: [runResult.compiledPath], title: 'Go to compiled SQL' };
      } else {
        if (runResult.error === null) {
          statusBar.text = `✓ model ran ${dayjs().to(dayjs(runResult.timestamp))}`;
          statusBar.color = undefined;
          statusBar.command = { command: 'navigateToFile', arguments: [runResult.compiledPath], title: 'Go to compiled SQL' };
  
        } else {
          statusBar.text = `x model ran ${dayjs().to(dayjs(runResult.timestamp))}`;
          statusBar.color = new ThemeColor('errorForeground');
          statusBar.command = { command: 'navigateToFileWithErrorMessage', arguments: [runResult.compiledPath, runResult.error], title: 'Go to compiled SQL' };
        }
      }
      statusBar.tooltip = 'Go to compiled SQL';
      statusBar.show();
    }
  }
}