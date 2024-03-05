import { Uri, window, workspace } from "vscode";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DeferConfig } from "../webview_provider/insightsPanel";

@provideSingleton(DeferToProdService)
export class DeferToProdService {
  public constructor(private dbtProjectContainer: DBTProjectContainer) {}

  private getCurrentProjectRoot(): string {
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

  public getDeferConfigByWorkspace() {
    const currentDocument = window.activeTextEditor?.document;
    return workspace
      .getConfiguration("dbt", currentDocument?.uri)
      .get("deferConfigPerProject", {});
  }

  public getDeferConfigByProjectRoot(projectRoot: string) {
    const relativePath = getProjectRelativePath(Uri.parse(projectRoot));
    const currentConfig: Record<string, DeferConfig> =
      this.getDeferConfigByWorkspace();

    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    if (dbtIntegrationMode === "core" || currentConfig[relativePath]) {
      return currentConfig[relativePath];
    }

    // In dbt cloud, defer is enabled by default
    return {
      deferToProduction: true,
    } as DeferConfig;
  }

  public getDeferConfigInCurrentProject() {
    const currentProjectRoot = this.getCurrentProjectRoot();
    return this.getDeferConfigByProjectRoot(currentProjectRoot);
  }
}
