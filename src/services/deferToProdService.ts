import { Uri, window, workspace } from "vscode";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DeferConfig } from "../webview_provider/insightsPanel";

@provideSingleton(DeferToProdService)
export class DeferToProdService {
  public getDeferConfigByWorkspace() {
    const currentDocument = window.activeTextEditor?.document;
    return workspace
      .getConfiguration("dbt", currentDocument?.uri)
      .get("deferConfigPerProject", {});
  }

  public getDeferConfigByProjectRoot(projectRoot: string): DeferConfig {
    const relativePath = getProjectRelativePath(Uri.file(projectRoot));
    const currentConfig: Record<string, DeferConfig> =
      this.getDeferConfigByWorkspace();

    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    if (currentConfig[relativePath]) {
      return currentConfig[relativePath];
    }

    // In dbt cloud, defer is enabled by default
    if (dbtIntegrationMode === "cloud") {
      return {
        deferToProduction: true,
      } as DeferConfig;
    }
    return {} as DeferConfig;
  }
}
