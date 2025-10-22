import { commands, Disposable, window } from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { ProjectQuickPick } from "./projectQuickPick";
import { DbtPowerUserControlCenterAction } from "./puQuickPick";
import { DbtSQLAction } from "./sqlQuickPick";

export class DbtPowerUserActionsCenter implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private puLaunchQuickPick: DbtPowerUserControlCenterAction,
    private projectQuickPick: ProjectQuickPick,
    private dbtProjectContainer: DBTProjectContainer,
    private sqlQuickPick: DbtSQLAction,
  ) {
    commands.registerCommand("dbtPowerUser.puQuickPick", async () => {
      await this.puLaunchQuickPick.openPuQuickPick();
    });
    commands.registerCommand("dbtPowerUser.openInsights", async () => {
      await commands.executeCommand("dbtPowerUser.Insights.focus");
    });
    commands.registerCommand("dbtPowerUser.sqlQuickPick", async () => {
      await this.sqlQuickPick.openQuickPick();
    });
    commands.registerCommand("dbtPowerUser.pickProject", async () => {
      const pickedProject = await this.projectQuickPick.projectPicker(
        await this.dbtProjectContainer.getProjects(),
      );
      if (pickedProject) {
        this.dbtProjectContainer.setToWorkspaceState(
          "dbtPowerUser.projectSelected",
          pickedProject,
        );
        commands.executeCommand(
          "setContext",
          "dbtPowerUser.walkthroughProjectSelected",
          true,
        );
        window.showInformationMessage(
          "You have succesfully selected " + pickedProject.label + ".",
        );
      }
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
