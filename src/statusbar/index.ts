import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { VersionStatusBar } from "./versionStatusBar";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private dbtStatusBar: VersionStatusBar) {
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
