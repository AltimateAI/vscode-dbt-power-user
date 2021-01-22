import { Disposable } from "vscode";
import { VersionStatusBar } from "./versionStatusBar";
import { RunResultStatusBar } from "./runResultStatusBar";
import { provideSingleton } from "../utils";

@provideSingleton(StatusBars)
export class StatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtStatusBar: VersionStatusBar,
    private runResultStatusBar: RunResultStatusBar
  ) {
    this.disposables.push(this.dbtStatusBar, this.runResultStatusBar);
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
