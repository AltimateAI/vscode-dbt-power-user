import { window } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";

enum PromptAnswer {
  YES = "Yes",
  NO = "No",
}

const askforDBTInstallation = async () => {
  const answer = await window.showErrorMessage(
    `dbt is not installed in this python environment. Do you want to install dbt?`,
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
