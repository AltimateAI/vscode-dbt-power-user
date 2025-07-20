import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { VersionStatusBar } from "./versionStatusBar";
import { DeferToProductionStatusBar } from "./deferToProductionStatusBar";
import { TargetStatusBar } from "./targetStatusBar";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtStatusBar: VersionStatusBar,
    private deferToProductionStatusBar: DeferToProductionStatusBar,
    private targetStatusBar: TargetStatusBar,
  ) {
    this.disposables.push(this.dbtStatusBar);
    this.disposables.push(this.deferToProductionStatusBar);
    this.disposables.push(this.targetStatusBar);
  }

  initialize() {
    this.deferToProductionStatusBar.updateStatusBar();
    this.targetStatusBar.updateStatusBar();
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
