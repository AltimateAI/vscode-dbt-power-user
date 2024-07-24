import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Range,
  TextDocument,
} from "vscode";
import { provideSingleton } from "../utils";
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

    // Find the project name from the current active editor
    return this.queryManifestService.getProject()?.getProjectName();
  }

  public provideCodeLenses(
    document: TextDocument,
    token: CancellationToken,
  ): CodeLens[] | Thenable<CodeLens[]> {
    // Enable this code lens only for adhoc query files created using command: dbtPowerUser.createSqlFile
    if (
      document.uri.scheme !== "untitled" ||
      document.languageId !== "jinja-sql"
    ) {
      return [];
    }

    const topOfDocument = new Range(0, 0, 0, 0);
    const projectName = this.getProjectName();
    const projectSelectorCommand: Command = {
      title: `Project: ${projectName || "Select a project"}`,
      command: "dbtPowerUser.pickProject",
      arguments: [document.uri],
    };

    return [new CodeLens(topOfDocument, projectSelectorCommand)];
  }
}
