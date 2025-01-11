import { commands, debug, window } from "vscode";
import { provideSingleton } from "../utils";
import { VSCodeCommand } from "./vscodeCommand";

@provideSingleton(DebugJinjaTemplateCommand)
export class DebugJinjaTemplateCommand implements VSCodeCommand {
  command = "dbt-power-user.debug-jinja-template";

  async execute(): Promise<void> {
    const editor = window.activeTextEditor;
    if (!editor) {
      window.showErrorMessage("No active editor found");
      return;
    }

    if (editor.document.languageId !== "jinja-sql") {
      window.showErrorMessage("This command only works with dbt SQL files");
      return;
    }

    const config = {
      type: "dbt-jinja",
      name: "Debug dbt Jinja Template",
      request: "launch",
      program: editor.document.uri.fsPath,
    };

    await debug.startDebugging(undefined, config);
  }
}
