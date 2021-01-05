import { window } from "vscode";
import navigateToFile from "./navigateToFile";

const navigateToFileWithErrorMessage = async (
  url: string,
  errorMessage: string
) => {
  window.showErrorMessage(errorMessage);
  await navigateToFile(url);
};

export default navigateToFileWithErrorMessage;
