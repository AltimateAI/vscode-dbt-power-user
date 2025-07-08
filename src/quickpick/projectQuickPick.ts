import { QuickPickItem, Uri, window } from "vscode";
import { DBTProject } from "../dbt_client/dbtProject";

export interface ProjectQuickPickItem extends QuickPickItem {
  label: string;
  description: string;
  uri: Uri;
}

export class ProjectQuickPick {
  async projectPicker(
    projects: DBTProject[],
  ): Promise<ProjectQuickPickItem | undefined> {
    const options: ProjectQuickPickItem[] = projects.map((item) => {
      return {
        label: item.getProjectName(),
        description: item.projectRoot.fsPath,
        uri: item.projectRoot,
      };
    });

    const pick: ProjectQuickPickItem | undefined = await window.showQuickPick(
      options,
      {
        title: "Select a Project",
        canPickMany: false,
      },
    );
    if (!pick) {
      return;
    }
    return pick;
  }
}
