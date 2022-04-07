import { window } from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { provideSingleton } from "../utils";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

@provideSingleton(UpdateDBT)
export class UpdateDBT {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  async updateDBTCommand() {
    await this.askForDBTUpdate();
  }

  private async askForDBTUpdate() {
    const answer = await window.showErrorMessage(
      "DBT is not up to date. Do you want to update DBT?",
      PromptAnswer.YES,
      PromptAnswer.NO
    );
    if (answer === PromptAnswer.YES) {
      this.dbtProjectContainer.updateDBT();
    }
  }
}
