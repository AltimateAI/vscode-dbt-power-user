import {
  commands,
  Disposable,
  QuickPickItem,
  QuickPickItemKind,
  ThemeIcon,
  Uri,
  window,
} from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(DbtSQLRelatedAction)
export class DbtSQLRelatedAction {
  async openQuickPick() {
    const disposables: Disposable[] = [];
    try {
      return await new Promise<Uri | undefined>((resolve, reject) => {
        const dbtpuquickpick = window.createQuickPick<
          DbtPowerUserControlPanelItem | QuickPickItem
        >();
        dbtpuquickpick.title = "SQL related action";
        dbtpuquickpick.items = [
          new DbtPowerUserControlPanelItem(
            "Setup Extension",
            "debug",
            "Open the extension setup walkthrough",
            "dbtPowerUser.openSetupWalkthrough",
          ),
        ];
        disposables.push(
          dbtpuquickpick.onDidChangeValue((value) => {
            dbtpuquickpick.busy = true;
          }),
          dbtpuquickpick.onDidChangeSelection((items) => {
            const item = items[0];
            if (item instanceof DbtPowerUserControlPanelItem) {
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

class DbtPowerUserControlPanelItem implements QuickPickItem {
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
