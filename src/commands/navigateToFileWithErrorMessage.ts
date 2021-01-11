import { window } from "vscode";
import navigateToFile from "./navigateToFile";

// TODO: we should not have this command, this should be
//  integrated into the navigateToFile command to detect the error there
const navigateToFileWithErrorMessage = async (
  url: string,
  errorMessage: string
) => {
  window.showErrorMessage(errorMessage);
  await navigateToFile(url);
};

export default navigateToFileWithErrorMessage;
