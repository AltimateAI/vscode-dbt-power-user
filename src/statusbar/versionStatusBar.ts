import {
  Command,
  Disposable,
  StatusBarAlignment,
  StatusBarItem,
  ThemeColor,
  commands,
  window,
  workspace,
} from "vscode";
import { DBTInstallationVerificationEvent } from "../dbt_client/dbtVersionEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

enum DbtInstallationPromptAnswer {
  INSTALL = "Install dbt",
  VALIDATE = "Detect dbt",
}

enum PythonInterpreterPromptAnswer {
  SELECT = "Select Python interpreter",
}

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
      if (event.pythonInstalled) {
        const answer = await window.showInformationMessage(
          "dbt is not installed. Do you want to install dbt?",
          DbtInstallationPromptAnswer.INSTALL,
          DbtInstallationPromptAnswer.VALIDATE,
        );
        if (answer === DbtInstallationPromptAnswer.INSTALL) {
          commands.executeCommand("dbtPowerUser.installDbt");
        }
        if (answer === DbtInstallationPromptAnswer.VALIDATE) {
          commands.executeCommand("dbtPowerUser.checkIfDbtIsInstalled");
        }
      } else {
        const answer = await window.showInformationMessage(
          "No Python interpreter is selected or Python is not installed",
          PythonInterpreterPromptAnswer.SELECT,
        );
        if (answer === PythonInterpreterPromptAnswer.SELECT) {
          commands.executeCommand("command:python.setInterpreter");
        }
      }
      return;
    }

    const versionCheck: string =
      workspace.getConfiguration("dbt").get<string>("versionCheck") || "both";

    if (event.dbtInstallationFound) {
      if (
        !event.dbtInstallationFound.upToDate &&
        (versionCheck === "both" || versionCheck === "status bar")
      ) {
        if (event.dbtInstallationFound.installedVersion !== undefined) {
          this.showTextInStatusBar(
            `$(error) dbt ${event.dbtInstallationFound.installedVersion} is not up to date`,
            // "statusBarItem.warningBackground",
          );
        } else {
          this.showTextInStatusBar(`$(check) dbt`);
        }
        return;
      }
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
