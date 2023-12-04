import {
  Command,
  Disposable,
  StatusBarAlignment,
  StatusBarItem,
  ThemeColor,
  window,
  workspace,
} from "vscode";
import { DBTInstallationVerificationEvent } from "../dbt_client/dbtVersionEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

@provideSingleton(VersionStatusBar)
export class VersionStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    10,
  );
  private defaultColor: string = "statusBarItem.activeBackground";
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      this.dbtProjectContainer.onDBTInstallationVerification((e) =>
        this.onDBTInstallationVerification(e),
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

  private async onDBTInstallationVerification(
    event: DBTInstallationVerificationEvent,
  ) {
    if (event.inProgress === true) {
      this.showTextInStatusBar("$(sync~spin) Detecting dbt");
      return;
    }
    if (!event.dbtInstallationFound!.installed) {
      this.showTextInStatusBar(
        "$(error) dbt is not installed",
        // "statusBarItem.errorBackground",
      );
      return;
    }
    if (event.dbtInstallationFound) {
      this.showTextInStatusBar(`$(check) dbt`);
    }
  }

  private showTextInStatusBar(
    text: string,
    //statusColor: string = this.defaultColor,
    command?: Command,
  ) {
    this.statusBar.text = text;
    this.statusBar.command = command || {
      title: "Open Pu Control Panel",
      command: "dbtPowerUser.puQuickPick",
    };
    //this.statusBar.backgroundColor = new ThemeColor(statusColor);
    this.statusBar.show();
  }
  private setStatusBarColor(color: string) {
    this.statusBar.backgroundColor = new ThemeColor(color);
  }
  private resetStatusBarColor() {
    this.statusBar.backgroundColor = new ThemeColor(this.defaultColor);
  }
}
