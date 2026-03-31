import { QuickPickItem, Uri, window } from "vscode";
import { DBTProject } from "../dbt_client/dbtProject";

export interface ProjectQuickPickItem extends QuickPickItem {
  label: string;
  description: string;
  uri: Uri;
}

/** Build a ProjectQuickPickItem from a DBTProject for workspace state storage. */
export function toProjectQuickPickItem(
  project: DBTProject,
): ProjectQuickPickItem {
  return {
    label: project.getProjectName(),
    description: project.projectRoot.fsPath,
    uri: project.projectRoot,
  };
}

export class ProjectQuickPick {
  async projectPicker(
    projects: DBTProject[],
  ): Promise<ProjectQuickPickItem | undefined> {
    const options: ProjectQuickPickItem[] = projects.map(
      toProjectQuickPickItem,
    );

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
