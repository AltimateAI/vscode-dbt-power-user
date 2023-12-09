import {
  commands,
  Disposable,
  QuickPickItem,
  ThemeIcon,
  Uri,
  window,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import * as path from "path";

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
          SQLActionItem | QuickPickItem
        >();
        dbtpuquickpick.title = "SQL Actions";
        const items = [
          new SQLActionItem(
            "Explain query",
            {
              light: Uri.file(
                path.join(
                  path.resolve(__dirname),
                  "../media/images/lightbulb_light.svg",
                ),
              ),
              dark: Uri.file(
                path.join(
                  path.resolve(__dirname),
                  "../media/images/lightbulb_dark.svg",
                ),
              ),
            },
            "Explain the sql query (Preview feature)",
            "dbtPowerUser.summarizeQuery",
          ),
          new SQLActionItem(
            "Validate SQL",
            new ThemeIcon("circuit-board"),
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
            dbtVersion &&
            dbtVersion[0] >= 1 &&
            dbtVersion[1] >= 6
          ) {
            items.push(
              new SQLActionItem(
                "BigQuery Cost Estimate",
                new ThemeIcon("dashboard"),
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
            if (item instanceof SQLActionItem) {
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

class SQLActionItem implements QuickPickItem {
  label: string;
  iconPath?: ThemeIcon | Uri | { light: Uri; dark: Uri } | undefined;
  description?: string | undefined;
  command: string;
  commandArgs: any[];

  constructor(
    label: string,
    iconPath: ThemeIcon | Uri | { light: Uri; dark: Uri } | undefined,
    description?: string | undefined,
    commandStr?: string,
    commandArgs?: any[],
  ) {
    this.label = label;
    this.iconPath = iconPath;
    this.description = description || "";
    this.command = commandStr || "";
    this.commandArgs = commandArgs || [];
  }
}
