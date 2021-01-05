import { window } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

const askforDBTInstallation = async () => {
  const answer = await window.showErrorMessage(
    `DBT is not installed in this python environment. Do you want to install DBT?`,
    PromptAnswer.YES,
    PromptAnswer.NO
  );
  if (answer === PromptAnswer.YES) {
    dbtProjectContainer.installDBT();
  }
};

const installDBT = async () => {
  await askforDBTInstallation();
};

export default installDBT;
