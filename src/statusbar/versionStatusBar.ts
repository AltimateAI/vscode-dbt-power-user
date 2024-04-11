import {
  Command,
  Disposable,
  StatusBarAlignment,
  StatusBarItem,
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
  private disposables: Disposable[] = [];
  private installed: boolean | undefined;

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

  private getDbtText() {
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    return dbtIntegrationMode === "cloud" ? "dbt cli" : "dbt";
  }

  private onRebuildManifestStatusChange(
    event: RebuildManifestCombinedStatusChange,
  ) {
    if (!event.inProgress) {
      if (!this.installed) {
        this.showTextInStatusBar(
          `$(error) ${this.getDbtText()} is not installed`,
        );

        return;
      }
      this.showTextInStatusBar(`$(check) ${this.getDbtText()}`);
      return;
    }
    if (event.projects.length === 1) {
      this.showTextInStatusBar(
        `$(sync~spin) Parsing ${event.projects[0].getProjectName()}`,
      );
      return;
    }
    this.showTextInStatusBar("$(sync~spin) Parsing projects");
  }

  private async onDBTInstallationVerification(
    event: DBTInstallationVerificationEvent,
  ) {
    this.installed = event.installed;
    if (event.inProgress === true) {
      this.showTextInStatusBar("$(sync~spin) Detecting dbt");
      return;
    }
    if (!event.installed) {
      this.showTextInStatusBar(
        `$(error) ${this.getDbtText()} is not installed`,
      );
      return;
    }
    this.showTextInStatusBar(`$(check) ${this.getDbtText()}`);
  }

  private showTextInStatusBar(text: string, command?: Command) {
    this.statusBar.text = text;
    this.statusBar.command = command || {
      title: "Open Control Panel",
      command: "dbtPowerUser.puQuickPick",
    };
    this.statusBar.show();
  }
}
