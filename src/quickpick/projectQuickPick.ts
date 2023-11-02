import { QuickPickItem, Uri, commands, window } from "vscode";
import { DBTProject } from "../manifest/dbtProject";
import { provideSingleton } from "../utils";

export interface ProjectQuickPickItem extends QuickPickItem {
  label: string;
  description: string;
  uri: Uri;
}

@provideSingleton(ProjectQuickPick)
export class ProjectQuickPick {
  async projectPicker(projects: DBTProject[]): Promise<any> {
    // in your code assuming you have a list of items that you map to this object
    const options: ProjectQuickPickItem[] = projects.map((item) => {
      return {
        label: item.getProjectName(),
        description: item.projectRoot.fsPath,
        uri: item.projectRoot,
      };
    });

    // this window is imported from 'vscode'
    const pick: ProjectQuickPickItem | undefined = await window.showQuickPick(
      options,
      {
        title: "Select a Project",
        canPickMany: false,
        // any other properties you need
      },
    );
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.walkthroughProjectSelected",
      true,
    );
    return pick;
  }
}
