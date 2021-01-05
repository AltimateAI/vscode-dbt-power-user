import { window } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

const askForDBTUpdate = async () => {
  const answer = await window.showErrorMessage(
    "DBT is not up to date. Do you want to update DBT?",
    PromptAnswer.YES,
    PromptAnswer.NO
  );
  if (answer === PromptAnswer.YES) {
    dbtProjectContainer.updateDBT();
  }
};

const updateDBT = async () => {
  await askForDBTUpdate();
};

export default updateDBT;
