import * as vscode from "vscode";

export interface OnSourceFileChanged {
  onSourceFileChanged: OnSourceFileChangedHandler;
}

export type OnSourceFileChangedHandler = (
  event: SourceFileChangedEvent
) => void;

export class SourceFileChangedEvent {
  projectRoot: vscode.Uri;

  constructor(projectRoot: vscode.Uri) {
    this.projectRoot = projectRoot;
  }
}
