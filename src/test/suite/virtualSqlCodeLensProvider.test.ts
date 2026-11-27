import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { CodeLens, workspace } from "vscode";
import { VirtualSqlCodeLensProvider } from "../../code_lens_provider/virtualSqlCodeLensProvider";

// A notebook SQL cell's result is stored in the kernel as cell_<cellId>, where
// cellId is the cell's own metadata.cellId. The lens names that variable. It
// must read the id from the cell itself (so it shows as soon as a saved
// notebook opens, before the kernel starts) and be requested again once a new
// cell is given its id.

const NOTEBOOK_TYPE = "datapilot-notebook";

function makeUri(scheme: string, value: string): any {
  return { scheme, toString: () => value };
}

function makeCell(
  notebookPath: string,
  fragment: string,
  languageId: string,
  metadata: Record<string, unknown>,
): any {
  return {
    metadata,
    document: {
      languageId,
      uri: makeUri(
        "vscode-notebook-cell",
        `vscode-notebook-cell:${notebookPath}#${fragment}`,
      ),
    },
  };
}

function makeNotebook(notebookType: string, cells: any[]): any {
  return { notebookType, getCells: () => cells };
}

function makeProvider() {
  const dbtProjectContainer = {
    getFromWorkspaceState: jest.fn().mockReturnValue({ label: "jaffle_shop" }),
    onDidChangeUntitledDocumentProject: jest
      .fn()
      .mockReturnValue({ dispose: jest.fn() }),
    findProjectForUntitledDocument: jest
      .fn()
      .mockReturnValue({ getProjectName: () => "jaffle_shop" }),
  } as any;
  const queryManifestService = { getProject: jest.fn() } as any;
  return new VirtualSqlCodeLensProvider(
    dbtProjectContainer,
    queryManifestService,
  );
}

const token = {} as any;
const lensesOf = (provider: VirtualSqlCodeLensProvider, document: any) =>
  provider.provideCodeLenses(document, token) as CodeLens[];

const onDidChangeNotebookDocument =
  workspace.onDidChangeNotebookDocument as unknown as jest.Mock;

describe("VirtualSqlCodeLensProvider notebook result lens", () => {
  let notebookListener: ((event: any) => void) | undefined;
  let notebookSubscription: { dispose: jest.Mock };

  beforeEach(() => {
    notebookSubscription = { dispose: jest.fn() };
    onDidChangeNotebookDocument.mockImplementation((listener: any) => {
      notebookListener = listener;
      return notebookSubscription;
    });
  });

  afterEach(() => {
    (workspace as any).notebookDocuments = [];
    notebookListener = undefined;
    onDidChangeNotebookDocument.mockReset();
    onDidChangeNotebookDocument.mockReturnValue({ dispose: jest.fn() });
  });

  it("names the kernel variable from the cell's own id, with no kernel or cell map", () => {
    const sqlCell = makeCell("/p/report.notebook", "W0sZmlsZQ==", "jinja-sql", {
      cellId: "python_9s5o3",
    });
    (workspace as any).notebookDocuments = [
      makeNotebook(NOTEBOOK_TYPE, [sqlCell]),
    ];

    const lenses = lensesOf(makeProvider(), sqlCell.document);

    expect(lenses).toHaveLength(1);
    expect(lenses[0].command).toEqual({
      title: "Python: cell_python_9s5o3['data']",
      tooltip:
        "After this cell runs, Python cells can read its rows as cell_python_9s5o3['data']. Click to copy.",
      command: "dbtPowerUser.copyNotebookCellResult",
      arguments: ["cell_python_9s5o3['data']"],
    });
  });

  it("finds the cell among several open notebooks", () => {
    const other = makeCell("/p/a.notebook", "W0sZmlsZQ==", "jinja-sql", {
      cellId: "jinja_sql_aaaaa",
    });
    const target = makeCell("/p/b.notebook", "W0sZmlsZQ==", "jinja-sql", {
      cellId: "jinja_sql_bbbbb",
    });
    (workspace as any).notebookDocuments = [
      makeNotebook(NOTEBOOK_TYPE, [other]),
      makeNotebook(NOTEBOOK_TYPE, [target]),
    ];

    const lenses = lensesOf(makeProvider(), target.document);

    expect(lenses.map((l) => l.command?.title)).toEqual([
      "Python: cell_jinja_sql_bbbbb['data']",
    ]);
  });

  it("shows no lens on a cell that has no id yet", () => {
    const newCell = makeCell(
      "/p/report.notebook",
      "X1sZmlsZQ==",
      "jinja-sql",
      {},
    );
    (workspace as any).notebookDocuments = [
      makeNotebook(NOTEBOOK_TYPE, [newCell]),
    ];

    expect(lensesOf(makeProvider(), newCell.document)).toEqual([]);
  });

  it("shows no lens on a compile-only cell, which stores nothing in the kernel", () => {
    const compileCell = makeCell(
      "/p/tests.notebook",
      "W0sZmlsZQ==",
      "jinja-sql",
      {
        cellId: "jinja_sql_cu6pt",
        execution_type: "compile",
        output_mime_type: "text/x-yaml",
      },
    );
    (workspace as any).notebookDocuments = [
      makeNotebook(NOTEBOOK_TYPE, [compileCell]),
    ];

    expect(lensesOf(makeProvider(), compileCell.document)).toEqual([]);
  });

  it("shows no lens on a Python cell", () => {
    const pythonCell = makeCell("/p/report.notebook", "Y1sZmlsZQ==", "python", {
      cellId: "jinja_sql_snbdv",
    });
    (workspace as any).notebookDocuments = [
      makeNotebook(NOTEBOOK_TYPE, [pythonCell]),
    ];

    expect(lensesOf(makeProvider(), pythonCell.document)).toEqual([]);
  });

  it("shows no lens on a cell of another notebook type", () => {
    const cell = makeCell("/p/a.ipynb", "W0sZmlsZQ==", "jinja-sql", {
      cellId: "jinja_sql_ccccc",
    });
    (workspace as any).notebookDocuments = [
      makeNotebook("jupyter-notebook", [cell]),
    ];

    expect(lensesOf(makeProvider(), cell.document)).toEqual([]);
  });

  it("keeps the project lens on an untitled jinja-sql file", () => {
    const document = {
      languageId: "jinja-sql",
      uri: makeUri("untitled", "untitled:Untitled-1"),
    };

    const lenses = lensesOf(makeProvider(), document);

    expect(lenses.map((l) => l.command?.title)).toEqual([
      "Project: jaffle_shop",
    ]);
  });

  it("asks for lenses again when cells are added or their metadata changes, not on text edits or removals", () => {
    const provider = makeProvider();
    const fired = jest.fn();
    provider.onDidChangeCodeLenses(fired);
    const notebook = makeNotebook(NOTEBOOK_TYPE, []);

    notebookListener!({ notebook, contentChanges: [], cellChanges: [{}] });
    expect(fired).toHaveBeenCalledTimes(0);

    notebookListener!({
      notebook,
      contentChanges: [{ addedCells: [], removedCells: [{}] }],
      cellChanges: [],
    });
    expect(fired).toHaveBeenCalledTimes(0);

    notebookListener!({
      notebook,
      contentChanges: [{ addedCells: [{}], removedCells: [] }],
      cellChanges: [],
    });
    expect(fired).toHaveBeenCalledTimes(1);

    notebookListener!({
      notebook,
      contentChanges: [],
      cellChanges: [{ metadata: { cellId: "jinja_sql_gsv5d" } }],
    });
    expect(fired).toHaveBeenCalledTimes(2);

    notebookListener!({
      notebook: makeNotebook("jupyter-notebook", []),
      contentChanges: [{ addedCells: [{}], removedCells: [] }],
      cellChanges: [{ metadata: {} }],
    });
    expect(fired).toHaveBeenCalledTimes(2);
  });

  it("stops listening to notebook changes when disposed", () => {
    const provider = makeProvider();

    provider.dispose();

    expect(notebookSubscription.dispose).toHaveBeenCalledTimes(1);
  });
});
