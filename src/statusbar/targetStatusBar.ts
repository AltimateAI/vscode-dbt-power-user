import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Disposable,
  TextEditor,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "@extension";

@provideSingleton(TargetStatusBar)
export class TargetStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    9,
  );
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
    private queryManifestService: QueryManifestService,
  ) {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          this.updateStatusBar();
        },
      ),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    this.statusBar.dispose();
  }

  public async updateStatusBar() {
    try {
      const currentProject = this.getCurrentProject();
      const targets = await currentProject.getTargetNames();
      const selectedTarget = await currentProject.getSelectedTarget();
      if (selectedTarget) {
        const maxLength = 10;
        this.statusBar.text = `$(target) ${selectedTarget.length >= maxLength ? selectedTarget.substring(0, maxLength) + "..." : selectedTarget}`;
        this.statusBar.tooltip = `The currently selected target for project ${currentProject.getProjectName()} is ${selectedTarget}`;
        this.statusBar.command = {
          title: "Open Target selector",
          command: "dbtPowerUser.openTargetSelector",
          arguments: [targets, currentProject, this],
        };
        this.statusBar.show();
      }
    } catch (err) {
      this.statusBar.hide();
      this.dbtTerminal.debug(
        "TargetStatusBar",
        "Unable to update target status bar",
        err,
      );
    }
  }

  private getCurrentProject() {
    const projects = this.dbtProjectContainer.getProjects();
    if (projects.length === 1) {
      return projects[0];
    }
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      throw new Error("No file selected in the editor");
    }
    const currentProject =
      this.dbtProjectContainer.findDBTProject(currentFilePath);

    if (!currentProject) {
      throw new Error("no Project found for selected document");
    }
    return currentProject;
  }
}
