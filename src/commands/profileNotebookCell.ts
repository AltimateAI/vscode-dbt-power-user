import type { NotebookDependencies, NotebookDependency } from "@lib";
import {
  commands,
  NotebookCell,
  NotebookCellData,
  NotebookCellKind,
  NotebookEdit,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";
import { DBTProject } from "../dbt_client/dbtProject";

// The packages the profiling cell imports (the same ones the "Profile your
// query" notebook template asks for).
export const PROFILE_DEPENDENCIES: NotebookDependency[] = [
  { type: "python", package: "pandas" },
  { type: "python", package: "ydata_profiling" },
];

// A SQL cell's result is stored in the kernel as cell_<cellId>.
export const profileCellSource = (cellId: string): string =>
  [
    "import pandas as pd",
    "from ydata_profiling import ProfileReport",
    "",
    "# The rows of the SQL cell above",
    `data = cell_${cellId}['data']`,
    "",
    "df = pd.DataFrame(data)",
    'profile = ProfileReport(df, title="Profiling Report")',
    "profile.to_notebook_iframe()",
  ].join("\n");

// The notebook library throws this when the user declines the install.
const DECLINED_INSTALL = "User cancelled python package installation";

const runCell = (cell: NotebookCell, index: number) =>
  commands.executeCommand("notebook.cell.execute", {
    ranges: [{ start: index, end: index + 1 }],
    document: cell.notebook.uri,
  });

/**
 * "Profile your query" on a notebook SQL cell: once the profiling packages are
 * installed, adds a Python cell below that profiles this cell's own result,
 * runs the query and, only if it succeeded, runs the new cell. A failed query
 * leaves the kernel holding an earlier run's rows, which must not be profiled
 * as this query's.
 */
export async function profileNotebookCell(
  cell: NotebookCell | undefined,
  getProject: () => Promise<DBTProject | undefined>,
  notebookDependencies: NotebookDependencies,
): Promise<void> {
  const cellId = cell?.metadata?.cellId;
  if (!cell || !cellId) {
    return;
  }
  const project = await getProject();
  if (!project) {
    return;
  }
  try {
    await notebookDependencies.verifyAndInstallDependenciesIfNeeded(
      PROFILE_DEPENDENCIES,
      project,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message !== DECLINED_INSTALL) {
      window.showErrorMessage(
        `Couldn't prepare the profiling packages: ${message}`,
      );
    }
    return;
  }
  // The cell may have been deleted, or its notebook closed, while the
  // packages were being checked or installed.
  if (cell.index < 0 || cell.notebook.isClosed) {
    return;
  }
  const source = profileCellSource(cellId);
  const edit = new WorkspaceEdit();
  edit.set(cell.notebook.uri, [
    NotebookEdit.insertCells(cell.index + 1, [
      new NotebookCellData(NotebookCellKind.Code, source, "python"),
    ]),
  ]);
  if (!(await workspace.applyEdit(edit))) {
    return;
  }
  // Keep the inserted cell itself: the notebook can be edited while the
  // query runs, so its position below the SQL cell may change.
  const profileCell = cell.notebook
    .getCells()
    .slice(cell.index + 1)
    .find((c) => c.document.getText() === source);
  if (!profileCell) {
    return;
  }
  const started = Date.now();
  await runCell(cell, cell.index);
  const summary = cell.executionSummary;
  if (
    summary?.success === true &&
    (summary.timing?.endTime ?? 0) >= started &&
    profileCell.index >= 0 &&
    !profileCell.notebook.isClosed
  ) {
    await runCell(profileCell, profileCell.index);
  }
}
