import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Range,
  TextDocument,
} from "vscode";
import { provideSingleton } from "../utils";
import { VirtualSqlContentProvider } from "../content_provider/virtualSqlContentProvider";
import { QueryManifestService } from "../services/queryManifestService";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";

@provideSingleton(VirtualSqlCodeLensProvider)
export class VirtualSqlCodeLensProvider implements CodeLensProvider {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryManifestService: QueryManifestService,
  ) {}
  private getProjectName() {
    const project = this.dbtProjectContainer.getFromWorkspaceState(
      "dbtPowerUser.projectSelected",
    );
    if (project?.label) {
      return project.label;
    }
    return this.queryManifestService.getProject()?.getProjectName();
  }
  public provideCodeLenses(
    document: TextDocument,
    token: CancellationToken,
  ): CodeLens[] | Thenable<CodeLens[]> {
    if (
      document.uri.scheme !== "untitled" &&
      document.uri.scheme !== VirtualSqlContentProvider.SCHEME
    ) {
      return [];
    }

    const topOfDocument = new Range(0, 0, 0, 0);
    const projectName = this.getProjectName();
    const command: Command = {
      title: `Project: ${projectName}`,
      command: "dbtPowerUser.pickProject", // This command must be implemented and registered in your extension
      arguments: [document.uri], // Optional: pass document URI or other arguments
    };

    return [new CodeLens(topOfDocument, command)];
  }
}
