import { commands, QuickPickItem, window } from "vscode";

export interface NotebookQuickPickItem extends QuickPickItem {
  label: string;
  description: string;
  command: string;
  arguments: any[];
}

export class NotebookQuickPick {
  async showNotebookPicker(): Promise<void> {
    const notebooks: NotebookQuickPickItem[] = [
      {
        label: "Profile this query",
        description: "Profile this query",
        command: "dbtPowerUser.createDatapilotNotebook",
        arguments: [{ template: "Profile your query" }],
      },
      {
        label: "Get test suggestions",
        description: "Get test suggestions",
        command: "dbtPowerUser.createDatapilotNotebook",
        arguments: [{ template: "Get test suggestions" }],
      },
      {
        label: "Generate dbt base model sql",
        description: "Generate dbt base model sql",
        command: "dbtPowerUser.createDatapilotNotebook",
        arguments: [
          {
            template: "Generate dbt base model sql",
          },
        ],
      },
      {
        label: "Generate dbt model yaml",
        description: "Generate dbt model yaml",
        command: "dbtPowerUser.createDatapilotNotebook",
        arguments: [
          {
            template: "Generate dbt model yaml",
          },
        ],
      },
      {
        label: "Generate dbt model CTE",
        description: "Generate dbt model CTE",
        command: "dbtPowerUser.createDatapilotNotebook",
        arguments: [
          {
            template: "Generate dbt model CTE",
          },
        ],
      },
    ];

    const pick = await window.showQuickPick(notebooks, {
      title: "Select a Notebook",
      canPickMany: false,
    });

    if (pick) {
      try {
        await commands.executeCommand(pick.command, ...pick.arguments);
      } catch (error) {
        window.showErrorMessage(`Failed to execute notebook command: ${error}`);
      }
    }
  }
}
