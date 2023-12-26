import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { VersionStatusBar } from "./versionStatusBar";
import { DeferStatusBar } from "./deferStatusBar";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtStatusBar: VersionStatusBar,
    private deferStatusBar: DeferStatusBar,
  ) {
    this.disposables.push(this.dbtStatusBar);
    this.disposables.push(this.deferStatusBar);
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
