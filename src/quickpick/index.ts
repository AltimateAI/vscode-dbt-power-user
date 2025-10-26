import { commands, Disposable, window } from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { SharedStateService } from "../services/sharedStateService";
import { OnboardingPanel } from "../webview_provider/onboardingPanel";
import { DbtPowerUserControlCenterAction } from "./actionsQuickPick";
import { ProjectQuickPick } from "./projectQuickPick";
import { DbtSQLAction } from "./sqlQuickPick";

export class DbtPowerUserActionsCenter implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private puLaunchQuickPick: DbtPowerUserControlCenterAction,
    private projectQuickPick: ProjectQuickPick,
    private dbtProjectContainer: DBTProjectContainer,
    private sqlQuickPick: DbtSQLAction,
    private emitterService: SharedStateService,
    private onboardingPanel: OnboardingPanel,
  ) {
    commands.registerCommand("dbtPowerUser.puQuickPick", async () => {
      await this.puLaunchQuickPick.openActions();
    });
    commands.registerCommand("dbtPowerUser.openInsights", async () => {
      await commands.executeCommand("dbtPowerUser.Insights.focus");
    });
    commands.registerCommand("dbtPowerUser.openOnboarding", async () => {
      this.emitterService.eventEmitter.fire({
        command: "onboarding:render",
        payload: {},
      });
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
