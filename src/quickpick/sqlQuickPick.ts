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
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(DbtSQLAction)
export class DbtSQLAction {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  async openQuickPick() {
    const disposables: Disposable[] = [];
    try {
      return await new Promise<Uri | undefined>(async (resolve, reject) => {
        const dbtpuquickpick = window.createQuickPick<
          DbtPowerUserControlPanelItem | QuickPickItem
        >();
        dbtpuquickpick.title = "SQL Actions";
        const items = [
          new DbtPowerUserControlPanelItem(
            "Explain query",
            "lightbulb-autofix",
            "Explain the sql query",
            "dbtPowerUser.summarizeQuery",
          ),
          new DbtPowerUserControlPanelItem(
            "Validate SQL",
            "circuit-board",
            "Validate the sql query",
            "dbtPowerUser.validateSql",
          ),
        ];

        const project = this.getProject();
        if (project) {
          const adapter = await project.getAdapterType();
          const dbtVersion = await project.getDBTVersion();
          if (
            adapter === "bigquery" &&
            dbtVersion[0] >= 1 &&
            dbtVersion[1] >= 6
          ) {
            items.push(
              new DbtPowerUserControlPanelItem(
                "Cost Estimate",
                "debug",
                "Estimate cost for BigQuery",
                "dbtPowerUser.bigqueryCostEstimate",
              ),
            );
          }
        }
        dbtpuquickpick.items = items;

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
