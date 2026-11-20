import type { NotebookDependencies, NotebookDependency } from "@lib";
import {
  commands,
  NotebookCell,
  NotebookCellData,
  NotebookCellKind,
  NotebookEdit,
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

/**
 * "Profile your query" on a notebook SQL cell: once the profiling packages are
 * installed, adds a Python cell below that profiles this cell's own result,
 * then runs the query and the new cell.
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
  } catch {
    // The user declined the install; the library already recorded it.
    return;
  }
  const edit = new WorkspaceEdit();
  edit.set(cell.notebook.uri, [
    NotebookEdit.insertCells(cell.index + 1, [
      new NotebookCellData(
        NotebookCellKind.Code,
        profileCellSource(cellId),
        "python",
      ),
    ]),
  ]);
  if (!(await workspace.applyEdit(edit))) {
    return;
  }
  await commands.executeCommand("notebook.cell.execute", {
    ranges: [{ start: cell.index, end: cell.index + 2 }],
    document: cell.notebook.uri,
  });
}
