import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Range,
  TextDocument,
  Disposable,
  window,
} from "vscode";
import { provideSingleton } from "../utils";
import { QueryManifestService } from "../services/queryManifestService";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { NotebookService } from "../lib/main";

@provideSingleton(VirtualSqlCodeLensProvider)
export class VirtualSqlCodeLensProvider
  implements CodeLensProvider, Disposable
{
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryManifestService: QueryManifestService,
    private notebookService: NotebookService,
  ) {}

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

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
      (document.uri.scheme !== "untitled" &&
        document.uri.scheme !== "vscode-notebook-cell") ||
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

    const projectSelectorCodeLens = new CodeLens(
      topOfDocument,
      projectSelectorCommand,
    );

    // Cell id code lens for notebook cells
    if (
      document.uri.scheme === "vscode-notebook-cell" &&
      window.activeNotebookEditor?.notebook
    ) {
      const cells = this.notebookService
        .getCellByNotebookAutocompleteMap()
        .get(window.activeNotebookEditor?.notebook.uri.fsPath);
      const cell = cells?.find((c) => c.fragment === document.uri.fragment);
      if (cell) {
        const cellIdLens = new CodeLens(topOfDocument, {
          title: `Cell id: cell_${cell.cellId}`,
          command: "", // TODO: Add command to allow user to modify cell id
          arguments: [document.uri],
        });

        return [cellIdLens];
      }
      return [];
    }

    return [projectSelectorCodeLens];
  }
}
