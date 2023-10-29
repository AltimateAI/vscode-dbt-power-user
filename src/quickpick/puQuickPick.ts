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
            "Debug Extension Setup",
            "star-empty",
            "Open the debug extension setup walkthrough",
            "dbtPowerUser.openSetupWalkthrough",
          ),
          new AltimateCommandCenterItem(
            "Open Lineage",
            "link-external",
            "Open the lineage panel",
            "dbtPowerUser.Lineage.focus",
          ),
          new AltimateCommandCenterItem(
            "Set up Altimate Account",
            "link-external",
            "Register for Altimate and set up your account",
            // This really is an older interface meant to work with executeCommand.
            // recommended is to use vscode.env.openExternal
            "vscode.open",
            [Uri.parse("https://app.myaltimate.com/register")],
          ),
          {
            label: "",
            kind: QuickPickItemKind.Separator,
          },
          new AltimateCommandCenterItem(
            "Scan for errors",
            "debug-start",
            "Run the Project healthcheck",
            "dbtPowerUser.runProjectHealthcheck",
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
