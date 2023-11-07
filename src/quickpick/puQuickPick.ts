import {
  Command,
  Disposable,
  QuickInputButton,
  QuickPickItem,
  QuickPickItemKind,
  StatusBarAlignment,
  StatusBarItem,
  ThemeColor,
  ThemeIcon,
  Uri,
  commands,
  window,
  workspace,
} from "vscode";
import { DBTInstallationVerificationEvent } from "../dbt_client/dbtVersionEvent";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

@provideSingleton(PuQuickPick)
export class PuQuickPick {
  async openPuQuickPick() {
    const disposables: Disposable[] = [];
    try {
      return await new Promise<Uri | undefined>((resolve, reject) => {
        const dbtpuquickpick = window.createQuickPick<
          AltimateCommandCenterItem | QuickPickItem
        >();
        dbtpuquickpick.title = "Power User Control Panel";
        dbtpuquickpick.items = [
          new AltimateCommandCenterItem(
            "Setup Extension",
            "debug",
            "Open the extension setup walkthrough",
            "dbtPowerUser.openSetupWalkthrough",
          ),
          new AltimateCommandCenterItem(
            "dbt Power User Tutorials",
            "book",
            "Open the dbt Power User Tutorials",
            "dbtPowerUser.openTutorialWalkthrough",
          ),
          new AltimateCommandCenterItem(
            "Readme",
            "link-external",
            "View the detailed ReadMe for the extension",
            // This really is an older interface meant to work with executeCommand.
            // recommended is to use vscode.env.openExternal
            "vscode.open",
            [
              Uri.parse(
                "https://github.com/AltimateAI/vscode-dbt-power-user/blob/master/README.md",
              ),
            ],
          ),
          {
            label: "",
            kind: QuickPickItemKind.Separator,
          },
          new AltimateCommandCenterItem(
            "Run Project Healthcheck",
            "debug-start",
            "Run the Project healthcheck",
            "dbtPowerUser.altimateScan",
          ),
          new AltimateCommandCenterItem(
            "Clear Healthcheck Results",
            "debug-stop",
            "Clear all problems",
            "dbtPowerUser.clearAltimateScanResults",
          ),
          {
            label: "",
            kind: QuickPickItemKind.Separator,
          },
          new AltimateCommandCenterItem(
            "Join the Community",
            "add",
            "Join our slack community",
            "vscode.open",
            [Uri.parse("https://getdbt.slack.com/archives/C05KPDGRMDW")],
          ),
          new AltimateCommandCenterItem(
            "Feedback",
            "feed",
            "Give us Feedback!",
            "vscode.open",
            [
              Uri.parse(
                "https://docs.google.com/forms/d/e/1FAIpQLSf7X2nQ3cfqpP6-uYSTE-mFg41ZKigCh2ytPUuX1jz7FoZOnw/viewform?usp=sf_link",
              ),
            ],
          ),
        ];

        disposables.push(
          dbtpuquickpick.onDidChangeValue((value) => {
            dbtpuquickpick.busy = true;
          }),
          dbtpuquickpick.onDidChangeSelection((items) => {
            const item = items[0];
            if (item instanceof AltimateCommandCenterItem) {
              commands.executeCommand(item.command, ...item.commandArgs);
              dbtpuquickpick.hide();
            }
          }),
          dbtpuquickpick.onDidHide(() => {
            resolve(undefined);
            dbtpuquickpick.dispose();
          }),
        );
        dbtpuquickpick.show();
      });
    } finally {
      disposables.forEach((d) => d.dispose());
    }
  }
}

class AltimateCommandCenterItem implements QuickPickItem {
  label: string;
  iconPath?: ThemeIcon | Uri | { light: Uri; dark: Uri } | undefined;
  description?: string | undefined;
  command: string;
  commandArgs: any[];

  constructor(
    label: string,
    iconPath: string = "",
    description?: string | undefined,
    commandStr?: string,
    commandArgs?: any[],
  ) {
    this.label = label;
    this.iconPath = new ThemeIcon(iconPath);
    this.description = description || "";
    this.command = commandStr || "";
    this.commandArgs = commandArgs || [];
  }
}
