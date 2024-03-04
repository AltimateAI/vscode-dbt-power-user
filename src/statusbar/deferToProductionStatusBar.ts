import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Disposable,
  TextEditor,
  workspace,
} from "vscode";
import { DeferToProdService } from "../services/deferToProdService";
import { provideSingleton } from "../utils";

@provideSingleton(DeferToProductionStatusBar)
export class DeferToProductionStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    9,
  );
  private disposables: Disposable[] = [];

  constructor(private deferToProdService: DeferToProdService) {
    this.disposables.push(
      workspace.onDidChangeConfiguration(
        async (e) => {
          if (!e.affectsConfiguration("dbt.deferConfigPerProject")) {
            return;
          }
          this.updateStatusBar();
        },
        this,
        this.disposables,
      ),
    );
    this.disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }

          this.updateStatusBar();
        },
      ),
    );
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

  private updateStatusBar() {
    try {
      const config = this.deferToProdService.getDeferConfigInCurrentProject();
      if (config?.deferToProduction) {
        this.showTextInStatusBar("$(sync) Defer");
        return;
      }
      this.showTextInStatusBar("$(sync-ignored) Defer");
    } catch (err) {
      console.error("Unable to update defer status bar", err);
    }
  }
}
