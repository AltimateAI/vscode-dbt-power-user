import {
  Disposable,
  QuickPickItem,
  QuickPickItemKind,
  ThemeIcon,
  Uri,
  commands,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";

@provideSingleton(DbtPowerUserControlCenterAction)
export class DbtPowerUserControlCenterAction {
  async openPuQuickPick() {
    const disposables: Disposable[] = [];
    const dbtIntegration = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    try {
      return await new Promise<Uri | undefined>((resolve, reject) => {
        const dbtpuquickpick = window.createQuickPick<
          DbtPowerUserControlPanelItem | QuickPickItem
        >();
        dbtpuquickpick.title = "dbt Power User Control Panel";
        dbtpuquickpick.items = [
          new DbtPowerUserControlPanelItem(
            dbtIntegration === "core"
              ? "Switch to dbt cloud"
              : "Switch to dbt core",
            "compare-changes",
            dbtIntegration === "core"
              ? "Are you using dbt cloud?"
              : "Are you using dbt core?",
            "dbtPowerUser.switchDbtIntegration",
          ),
          new DbtPowerUserControlPanelItem(
            "Setup Extension",
            "debug",
            "Open the extension setup walkthrough",
            "dbtPowerUser.openSetupWalkthrough",
          ),
          new DbtPowerUserControlPanelItem(
            "dbt Power User Tutorials",
            "book",
            "Open the dbt Power User Tutorials",
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
            [
              Uri.parse(
                "https://form.jotform.com/251114282479154",
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
