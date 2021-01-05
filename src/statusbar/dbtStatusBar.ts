import { StatusBarItem, StatusBarAlignment, window, Command } from "vscode";
import { DBTInstallationFoundEvent, OnDBTInstallationFound } from "../manifest/event/dbtVersionEvent";

export class DBTStatusBar implements OnDBTInstallationFound {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 10);

  onDBTInstallationFound(event: DBTInstallationFoundEvent) {
    if(event.installed === undefined) {
      this.showTextInStatusBar('$(sync~spin) Checking DBT installation');
      return;
    }
    if(!event.installed) {
      this.showTextInStatusBar('$(error) DBT not installed', {title: 'Install DBT', command: "installDBT"});
      return;
    }
    if(!event.upToDate) {
      this.showTextInStatusBar(`$(error) DBT ${event.installedVersion!} is not up to date`, {title: 'Update DBT', command: "updateDBT"});
      return;
    }
    this.showTextInStatusBar(`$(check) DBT ${event.installedVersion}`);
  }

  private showTextInStatusBar(text: string, command?: Command) {
    this.statusBar.text = text;
    this.statusBar.command = command;
    this.statusBar.show();
  }
}