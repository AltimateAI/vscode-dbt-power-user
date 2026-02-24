import {
  commands,
  Disposable,
  QuickPickItem,
  QuickPickItemKind,
  ThemeIcon,
  Uri,
  window,
} from "vscode";

export class DbtPowerUserControlCenterAction {
  async openActions() {
    const disposables: Disposable[] = [];
    try {
      return await new Promise<Uri | undefined>((resolve, reject) => {
        const dbtpuquickpick = window.createQuickPick<
          DbtPowerUserControlPanelItem | QuickPickItem
        >();
        dbtpuquickpick.title = "dbt Power User Control Panel";
        dbtpuquickpick.items = [
          new DbtPowerUserControlPanelItem(
            "Change dbt flavour",
            "compare-changes",
            "Switch between dbt core, cloud or fusion",
            "dbtPowerUser.openSetupWalkthrough",
          ),
          new DbtPowerUserControlPanelItem(
            "Troubleshooting",
            "debug",
            "Setup the extension",
            "dbtPowerUser.openOnboarding",
          ),
          new DbtPowerUserControlPanelItem(
            "Tutorials",
            "book",
            "How ot use the extension",
            "dbtPowerUser.openTutorialWalkthrough",
          ),
          new DbtPowerUserControlPanelItem(
            "Documentation",
            "link-external",
            "View the detailed Documentation for the extension",
            // This really is an older interface meant to work with executeCommand.
            // recommended is to use vscode.env.openExternal
            "vscode.open",
            [Uri.parse("https://docs.myaltimate.com")],
          ),
          {
            label: "",
            kind: QuickPickItemKind.Separator,
          },
          new DbtPowerUserControlPanelItem(
            "Run Project Healthcheck",
            "debug-start",
            "Run the Project healthcheck",
            "dbtPowerUser.altimateScan",
          ),
          new DbtPowerUserControlPanelItem(
            "Clear Healthcheck Results",
            "debug-stop",
            "Clear all problems",
            "dbtPowerUser.clearAltimateScanResults",
          ),
          new DbtPowerUserControlPanelItem(
            "Diagnostics",
            "tools",
            "Run diagnostics on the dbt project",
            "dbtPowerUser.diagnostics",
          ),
          {
            label: "",
            kind: QuickPickItemKind.Separator,
          },
          new DbtPowerUserControlPanelItem(
            "Join the Community",
            "add",
            "Join our slack community",
            "vscode.open",
            [Uri.parse("https://getdbt.slack.com/archives/C05KPDGRMDW")],
          ),
          new DbtPowerUserControlPanelItem(
            "Feedback",
            "feed",
            "Give us Feedback!",
            "vscode.open",
            [Uri.parse("https://form.jotform.com/251114282479154")],
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
