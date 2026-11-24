import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Disposable,
  EventEmitter,
  NotebookCell,
  Range,
  TextDocument,
  workspace,
} from "vscode";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";

const NOTEBOOK_TYPE = "datapilot-notebook";

export class VirtualSqlCodeLensProvider
  implements CodeLensProvider, Disposable
{
  private disposables: Disposable[] = [];
  private _onDidChangeCodeLenses = new EventEmitter<void>();
  readonly onDidChangeCodeLenses = this._onDidChangeCodeLenses.event;

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryManifestService: QueryManifestService,
  ) {
    this.disposables.push(
      this._onDidChangeCodeLenses,
      // A new cell gets its id in a metadata edit after it is added, so its
      // lens is requested again on added cells and metadata changes (not on
      // every keystroke).
      workspace.onDidChangeNotebookDocument((event) => {
        if (
          event.notebook.notebookType === NOTEBOOK_TYPE &&
          (event.contentChanges.some(
            (change) => change.addedCells.length > 0,
          ) ||
            event.cellChanges.some((change) => change.metadata))
        ) {
          this._onDidChangeCodeLenses.fire();
        }
      }),
    );
  }

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

  private findNotebookCell(document: TextDocument): NotebookCell | undefined {
    const uri = document.uri.toString();
    for (const notebook of workspace.notebookDocuments) {
      if (notebook.notebookType !== NOTEBOOK_TYPE) {
        continue;
      }
      const cell = notebook
        .getCells()
        .find((c) => c.document.uri.toString() === uri);
      if (cell) {
        return cell;
      }
    }
    return undefined;
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

    // Notebook SQL cells: the kernel variable that holds this cell's result.
    // The id comes from the cell's own metadata, which the kernel uses too.
    // A compile-only cell renders text and stores nothing in the kernel.
    if (document.uri.scheme === "vscode-notebook-cell") {
      const metadata = this.findNotebookCell(document)?.metadata;
      const cellId = metadata?.cellId;
      if (!cellId || metadata?.execution_type === "compile") {
        return [];
      }
      const resultVariable = `cell_${cellId}['data']`;
      return [
        new CodeLens(topOfDocument, {
          title: `Python: ${resultVariable}`,
          tooltip: `After this cell runs, Python cells can read its rows as ${resultVariable}. Click to copy.`,
          command: "dbtPowerUser.copyNotebookCellResult",
          arguments: [resultVariable],
        }),
      ];
    }

    return [projectSelectorCodeLens];
  }
}
