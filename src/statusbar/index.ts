import { Disposable } from "vscode";
import { VersionStatusBar } from "./versionStatusBar";
import { provideSingleton } from "../utils";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtStatusBar: VersionStatusBar
  ) {
    this.disposables.push(this.dbtStatusBar);
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
