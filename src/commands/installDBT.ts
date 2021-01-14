import { window } from "vscode";
import { DbtProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

@provideSingleton(InstallDBT)
export class InstallDBT {
  constructor(private dbtProjectContainer: DbtProjectContainer) {}

  async installDBTCommand() {
    await this.askforDBTInstallation();
  }

  private async askforDBTInstallation() {
    const answer = await window.showErrorMessage(
      `dbt is not installed in this python environment. Do you want to install dbt?`,
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      this.dbtProjectContainer.installDBT();
    }
  }
}
