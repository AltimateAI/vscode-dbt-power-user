import { window } from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

@provideSingleton(InstallDbtOsmosis)
export class InstallDbtOsmosis {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  async installDbtOsmosis() {
    await this.askForInstall();
  }

  private async askForInstall() {
    const answer = await window.showInformationMessage(
      "dbt Power User can now execute and visualize the result set of your models using an auxilliary package `dbt-osmosis`. Do you want to install `dbt-osmosis` now?",
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      this.dbtProjectContainer.installDbtOsmosis();
    }
  }
}