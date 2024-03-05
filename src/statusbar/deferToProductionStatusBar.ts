import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Disposable,
  TextEditor,
  workspace,
  Uri,
} from "vscode";
import { DeferToProdService } from "../services/deferToProdService";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(DeferToProductionStatusBar)
export class DeferToProductionStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    9,
  );
  private disposables: Disposable[] = [];

  constructor(
    private deferToProdService: DeferToProdService,
    private dbtProjectContainer: DBTProjectContainer,
  ) {
    this.disposables.push(
      workspace.onDidChangeConfiguration(
        async (e) => {
          if (!e.affectsConfiguration("dbt.deferConfigPerProject")) {
            return;
          }
          this.updateStatusBar();
        },
        this,
        this.disposables,
      ),
    );
    this.disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            this.statusBar.hide();
          }
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

  private showTextInStatusBar(text: string) {
    this.statusBar.text = text;
    this.statusBar.command = {
      title: "Open Insights Panel",
      command: "dbtPowerUser.openInsights",
    };
    this.statusBar.show();
  }

  public updateStatusBar(projectRoot?: string) {
    try {
      if (!projectRoot) {
        const currentProject = this.getCurrentProject();
        projectRoot = currentProject.projectRoot.fsPath;
      }
      const config =
        this.deferToProdService.getDeferConfigByProjectRoot(projectRoot);
      if (config?.deferToProduction) {
        this.showTextInStatusBar("$(sync) Defer");
        this.statusBar.show();
        return;
      }
      this.showTextInStatusBar("$(sync-ignored) Defer");
      this.statusBar.show();
    } catch (err) {
      this.statusBar.hide();
      console.error("Unable to update defer status bar", err);
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
