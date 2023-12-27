import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Disposable,
  Command,
} from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(DeferStatusBar)
export class DeferStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    9,
  );
  private defaultColor: string = "statusBarItem.activeBackground";
  private disposables: Disposable[] = [];

  constructor() {
    this.showTextInStatusBar("$(sync) Defer");
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    this.statusBar.dispose();
  }

  private showTextInStatusBar(text: string) {
    this.statusBar.text = text;
    this.statusBar.command = {
      title: "Open Insights Panel",
      command: "dbtPowerUser.openInsights",
    };
    this.statusBar.show();
  }
}
