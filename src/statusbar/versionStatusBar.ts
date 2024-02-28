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
import { RebuildManifestCombinedStatusChange } from "../manifest/event/manifestCacheChangedEvent";

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
      this.dbtProjectContainer.onRebuildManifestStatusChange((e) =>
        this.onRebuildManifestStatusChange(e),
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

  private onRebuildManifestStatusChange(
    event: RebuildManifestCombinedStatusChange,
  ) {
    if (!event.inProgress) {
      this.showTextInStatusBar(`$(check) dbt`);
      return;
    }
    if (event.projects.length === 1) {
      this.showTextInStatusBar(
        `$(sync~spin) Parsing ${event.projects[0].getProjectName()}`,
      );
      return;
    }
    this.showTextInStatusBar("$(sync~spin) Parsing manifests");
  }

  private async onDBTInstallationVerification(
    event: DBTInstallationVerificationEvent,
  ) {
    if (event.inProgress === true) {
      this.showTextInStatusBar("$(sync~spin) Detecting dbt");
      return;
    }
    if (!event.installed) {
      this.showTextInStatusBar(
        "$(error) dbt is not installed",
        // "statusBarItem.errorBackground",
      );
      return;
    }
    this.showTextInStatusBar(`$(check) dbt`);
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
