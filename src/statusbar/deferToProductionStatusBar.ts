import {
  StatusBarItem,
  StatusBarAlignment,
  window,
  Disposable,
  Command,
  TextEditor,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DeferConfig } from "../webview_provider/insightsPanel";

@provideSingleton(DeferToProductionStatusBar)
export class DeferToProductionStatusBar implements Disposable {
  readonly statusBar: StatusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Left,
    9,
  );
  private disposables: Disposable[] = [];

  constructor(private dbtProjectContainer: DBTProjectContainer) {
    this.dbtProjectContainer.onManifestChanged(async (event) => {
      // Set initial defer status icon after project is initialized
      const currentDocument = window.activeTextEditor?.document;
      if (!currentDocument?.uri) {
        this.showTextInStatusBar("$(sync~ignored) Defer");
        return;
      }

      const currentDocProjectModified =
        event.added?.find((p) =>
          currentDocument.uri.fsPath.includes(p.project.projectRoot.fsPath),
        ) ||
        event.removed?.find((p) =>
          currentDocument.uri.fsPath.includes(p.projectRoot.fsPath),
        );

      if (currentDocProjectModified) {
        await this.updateStatusBar();
      }
    });

    this.disposables.push(
      workspace.onDidChangeConfiguration(
        async (e) => {
          if (!e.affectsConfiguration("dbt.deferConfigPerProject")) {
            return;
          }
          await this.updateStatusBar();
        },
        this,
        this.disposables,
      ),
    );
    this.disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }

          await this.updateStatusBar();
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

  private async getCurrentProjectRoot() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      throw new Error("Invalid current file");
    }

    const currentProject =
      this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (!currentProject?.projectRoot) {
      throw new Error("Invalid current project root");
    }

    return getProjectRelativePath(currentProject.projectRoot);
  }

  private async updateStatusBar() {
    const currentDocument = window.activeTextEditor?.document;
    try {
      const currentProjectRoot = await this.getCurrentProjectRoot();
      const currentConfig: Record<string, DeferConfig> = await workspace
        .getConfiguration("dbt", currentDocument?.uri)
        .get("deferConfigPerProject", {});

      if (!currentProjectRoot) {
        return;
      }

      if (currentConfig[currentProjectRoot]?.deferToProduction) {
        this.showTextInStatusBar("$(sync) Defer");
        return;
      }
      this.showTextInStatusBar("$(sync-ignored) Defer");
    } catch (err) {
      console.error("Unable to update defer status bar", err);
    }
  }
}
