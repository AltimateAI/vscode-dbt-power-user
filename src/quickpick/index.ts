import { Disposable, commands } from "vscode";
import { provideSingleton } from "../utils";
import { PuQuickPick } from "./puQuickPick";
import { ProjectQuickPick } from "./projectQuickPick";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(PUStatusBars)
export class PUStatusBars implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private puLaunchQuickPick: PuQuickPick,
    private projectQuickPick: ProjectQuickPick,
    private dbtProjectContainer: DBTProjectContainer,
  ) {
    commands.registerCommand("dbtPowerUser.puQuickPick", async () => {
      await this.puLaunchQuickPick.openPuQuickPick();
    });
    commands.registerCommand("dbtPowerUser.pickProject", async () => {
      const pickedProject = await this.projectQuickPick.projectPicker(
        await this.dbtProjectContainer.findAllDBTProjects(),
      );
      if (pickedProject) {
        this.dbtProjectContainer.context?.workspaceState.update(
          "dbtPowerUser.projectSelected",
          pickedProject,
        );
      }
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
