import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Command,
  Disposable,
} from "vscode";
import { DBTInstallationFoundEvent } from "../dbt_client/dbtVersionEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

@provideSingleton(VersionStatusBar)
export class VersionStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    10
  );
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.disposables.push(
      this.dbtProjectContainer.onDBTInstallationFound((e) =>
        this.onDBTInstallationFound(e)
      )
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
    this.statusBar.dispose();
  }

  private onDBTInstallationFound(event: DBTInstallationFoundEvent) {
    if (event.installed === undefined) {
      this.showTextInStatusBar("$(sync~spin) Detecting dbt");
      return;
    }
    if (!event.installed) {
      this.showTextInStatusBar("$(error) dbt is not installed", {
        title: "Install dbt",
        command: "dbtPowerUser.installDBT",
      });
      return;
    }
    if (!event.upToDate) {
      if(event.installedVersion !== undefined) {
        this.showTextInStatusBar(
          `$(error) dbt ${event.installedVersion} is not up to date`,
          { title: "Update dbt", command: "dbtPowerUser.updateDBT" }
        );
      } else {
        this.showTextInStatusBar(
          `$(check) dbt`
        );
      }      
      return;
    }
    this.showTextInStatusBar(`$(check) dbt ${event.installedVersion}`);
  }

  private showTextInStatusBar(text: string, command?: Command) {
    this.statusBar.text = text;
    this.statusBar.command = command;
    this.statusBar.show();
  }
}
