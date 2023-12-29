import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { VersionStatusBar } from "./versionStatusBar";
import { DeferToProductionStatusBar } from "./deferToProductionStatusBar";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtStatusBar: VersionStatusBar,
    private deferToProductionStatusBar: DeferToProductionStatusBar,
  ) {
    this.disposables.push(this.dbtStatusBar);
    this.disposables.push(this.deferToProductionStatusBar);
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
