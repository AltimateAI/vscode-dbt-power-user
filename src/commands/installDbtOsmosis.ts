import { window, workspace, commands } from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

@provideSingleton(InstallDbtOsmosis)
export class InstallDbtOsmosis {
  constructor(private dbtProjectContainer: DBTProjectContainer) { }

  async installDbtOsmosis() {
    const osmosisCheck: boolean = workspace
      .getConfiguration("dbt")
      .get<boolean>("osmosisCheck", true);
    if (osmosisCheck) {
      await this.askForInstall();
    }
  }

  private async askForInstall() {
    const answer = await window.showInformationMessage(
      "dbt Power User can now execute and visualize the result set of your models using an auxiliary package `dbt-osmosis`. Do you want to install `dbt-osmosis` now? (reloads window after install)",
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      await this.dbtProjectContainer.installDbtOsmosis();
      commands.executeCommand("workbench.action.reloadWindow");
    }
  }
}