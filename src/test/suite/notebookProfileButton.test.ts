import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import {
  PROFILE_DEPENDENCIES,
  profileCellSource,
  profileNotebookCell,
} from "../../commands/profileNotebookCell";

// "Profile your query" on a notebook SQL cell: the vendored library's cell
// status-bar provider shows the button, and the command adds a Python cell
// that profiles that SQL cell's own result (cell_<cellId>['data']).

const sqlCell = (
  metadata: Record<string, unknown>,
  languageId = "jinja-sql",
) => ({
  index: 2,
  metadata,
  notebook: { uri: { toString: () => "datapilot:/p/report.notebook" } },
  document: { languageId },
});

describe("Profile your query button (vendored status-bar provider)", () => {
  // Registers the library's notebook providers and returns the status-bar one.
  const loadProvider = () => {
    let provider: any;
    jest.isolateModules(() => {
      const v: any = require("vscode");
      v.NotebookCellKind = { Markup: 1, Code: 2 };
      v.NotebookCellStatusBarAlignment = { Left: 1, Right: 2 };
      v.NotebookCellStatusBarItem = class {
        command: unknown;
        tooltip: unknown;
        constructor(
          public text: string,
          public alignment: number,
        ) {}
      };
      v.notebooks = {
        registerNotebookCellStatusBarItemProvider: jest.fn(
          (_type: string, p: unknown) => {
            provider = p;
            return { dispose: jest.fn() };
          },
        ),
      };
      v.workspace.registerNotebookSerializer = jest.fn(() => ({
        dispose: jest.fn(),
      }));
      v.workspace.registerFileSystemProvider = jest.fn(() => ({
        dispose: jest.fn(),
      }));
      jest.doMock("@lib", () => jest.requireActual("../../lib/index"));
      const lib = require("@lib");
      const providers = Object.create(lib.NotebookProviders.prototype);
      Object.assign(providers, {
        disposables: [],
        dbtTerminal: { log: jest.fn() },
        notebookController: { dispose: jest.fn() },
        notebookProvider: {},
        notebookFileSystemProvider: {},
      });
      (v.workspace.getConfiguration as jest.Mock).mockReturnValueOnce({
        get: () => true,
      });
      providers.bindNotebookActions();
    });
    return provider;
  };

  it("shows the button on a SQL cell that has an id, with the cell as argument", () => {
    const cell = sqlCell({ cellId: "jinja_sql_abc12" });

    const items = loadProvider().provideCellStatusBarItems(cell);

    expect(items).toHaveLength(1);
    expect(items[0].text).toBe("$(globe) Profile your query");
    expect(items[0].command).toEqual({
      title: "Profile your query",
      command: "dbtPowerUser.datapilotProfileYourQuery",
      arguments: [cell],
    });
  });

  it("shows no button on a SQL cell without an id yet", () => {
    expect(loadProvider().provideCellStatusBarItems(sqlCell({}))).toBe(
      undefined,
    );
  });

  it("shows no button on a compile-only SQL cell, which stores no result", () => {
    const cell = sqlCell({
      cellId: "jinja_sql_cu6pt",
      execution_type: "compile",
    });

    expect(loadProvider().provideCellStatusBarItems(cell)).toBe(undefined);
  });

  it("shows no button on a Python cell", () => {
    const cell = sqlCell({ cellId: "python_abc12" }, "python");

    expect(loadProvider().provideCellStatusBarItems(cell)).toBe(undefined);
  });
});

describe("Profile your query command", () => {
  const v = vscode as any;
  const saved: Record<string, unknown> = {};
  let edits: { uri: unknown; changes: any[] }[];
  let applyEdit: jest.Mock;
  let executeCommand: jest.Mock;
  let verifyAndInstallDependenciesIfNeeded: jest.Mock;
  const project = { projectRoot: "/p" } as any;

  // A notebook whose cells know their own index, like VS Code's (-1 once removed).
  type FakeCell = {
    readonly index: number;
    metadata: Record<string, unknown>;
    notebook: FakeNotebook;
    document: { languageId: string; getText: () => string };
    executionSummary?: unknown;
  };
  type FakeNotebook = {
    uri: { toString: () => string };
    isClosed: boolean;
    cells: FakeCell[];
    getCells: () => FakeCell[];
  };
  const makeNotebook = (): FakeNotebook => {
    const notebook: FakeNotebook = {
      uri: { toString: () => "datapilot:/p/report.notebook" },
      isClosed: false,
      cells: [],
      getCells: () => notebook.cells,
    };
    return notebook;
  };
  const addCell = (
    notebook: FakeNotebook,
    at: number,
    text: string,
    languageId: string,
    metadata: Record<string, unknown> = {},
  ): FakeCell => {
    const cell: FakeCell = {
      get index() {
        return notebook.cells.indexOf(cell);
      },
      metadata,
      notebook,
      document: { languageId, getText: () => text },
    };
    notebook.cells.splice(at, 0, cell);
    return cell;
  };
  // [python, python, SQL (index 2), python]
  const notebookWithSql = (metadata: Record<string, unknown>) => {
    const notebook = makeNotebook();
    addCell(notebook, 0, "print(0)", "python");
    addCell(notebook, 1, "print(1)", "python");
    const sql = addCell(notebook, 2, "select 1", "jinja-sql", metadata);
    addCell(notebook, 3, "print(3)", "python");
    return { notebook, sql };
  };

  beforeEach(() => {
    for (const k of [
      "WorkspaceEdit",
      "NotebookEdit",
      "NotebookCellData",
      "NotebookCellKind",
    ]) {
      saved[k] = v[k];
    }
    saved.applyEdit = v.workspace.applyEdit;
    edits = [];
    v.WorkspaceEdit = class {
      set(uri: unknown, changes: any[]) {
        edits.push({ uri, changes });
      }
    };
    v.NotebookEdit = {
      insertCells: (index: number, cells: unknown[]) => ({ index, cells }),
    };
    v.NotebookCellData = class {
      constructor(
        public kind: number,
        public value: string,
        public languageId: string,
      ) {}
    };
    v.NotebookCellKind = { Markup: 1, Code: 2 };
    // Applies the insert to the fake notebook the edit targets.
    applyEdit = jest.fn(async () => {
      for (const { changes } of edits) {
        for (const { index, cells } of changes) {
          cells.forEach((c: any, k: number) =>
            addCell(current!, index + k, c.value, c.languageId),
          );
        }
      }
      return true;
    });
    v.workspace.applyEdit = applyEdit;
    executeCommand = v.commands.executeCommand as jest.Mock;
    executeCommand.mockClear();
    (v.window.showErrorMessage as jest.Mock).mockClear();
    verifyAndInstallDependenciesIfNeeded = jest.fn(async () => undefined);
  });

  afterEach(() => {
    for (const k of [
      "WorkspaceEdit",
      "NotebookEdit",
      "NotebookCellData",
      "NotebookCellKind",
    ]) {
      v[k] = saved[k];
    }
    v.workspace.applyEdit = saved.applyEdit;
    executeCommand.mockReset();
    executeCommand.mockReturnValue(Promise.resolve());
    current = undefined;
  });

  let current: FakeNotebook | undefined;
  // Running the SQL cell ends with this execution summary on it; `during`
  // runs while the query runs (to edit the notebook meanwhile).
  const queryEnds = (
    sql: FakeCell,
    success: boolean,
    endTime?: number,
    during?: () => void,
  ) =>
    executeCommand.mockImplementation(async (_command: unknown, args: any) => {
      if (args.ranges[0].start === sql.index) {
        during?.();
        sql.executionSummary = {
          success,
          timing: { startTime: 0, endTime: endTime ?? Date.now() },
        };
      }
    });
  const executedTexts = () =>
    executeCommand.mock.calls.map(([command, args]: any[]) => {
      expect(command).toBe("notebook.cell.execute");
      expect(args.document).toBe(current!.uri);
      expect(args.ranges).toHaveLength(1);
      const { start, end } = args.ranges[0];
      expect(end).toBe(start + 1);
      return current!.cells[start].document.getText();
    });

  const run = (cell: any, getProject = async () => project) => {
    current = cell?.notebook;
    return profileNotebookCell(cell, getProject, {
      verifyAndInstallDependenciesIfNeeded,
    } as any);
  };
  const source = profileCellSource("python_9s5o3");

  it("adds a Python cell below that reads this cell's result, runs the query, then the new cell", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, true);

    await run(sql);

    expect(verifyAndInstallDependenciesIfNeeded).toHaveBeenCalledWith(
      PROFILE_DEPENDENCIES,
      project,
    );
    expect(edits).toHaveLength(1);
    expect(edits[0].uri).toBe(notebook.uri);
    const [insert] = edits[0].changes;
    expect(insert.index).toBe(3);
    expect(insert.cells).toHaveLength(1);
    expect(insert.cells[0].kind).toBe(2);
    expect(insert.cells[0].languageId).toBe("python");
    expect(insert.cells[0].value).toBe(source);
    expect(source).toContain("data = cell_python_9s5o3['data']");
    expect(notebook.cells[3].document.getText()).toBe(source);
    expect(executedTexts()).toEqual(["select 1", source]);
  });

  it("runs the inserted cell itself when the notebook changes while the query runs", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, true, undefined, () =>
      addCell(notebook, 3, "print('added by the user')", "python"),
    );

    await run(sql);

    expect(executedTexts()).toEqual(["select 1", source]);
    expect(notebook.cells[4].document.getText()).toBe(source);
  });

  it("does not run the profiling cell when it was deleted while the query ran", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, true, undefined, () => notebook.cells.splice(3, 1));

    await run(sql);

    expect(executedTexts()).toEqual(["select 1"]);
  });

  it("does not run the profiling cell when the notebook was closed while the query ran", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, true, undefined, () => {
      notebook.isClosed = true;
    });

    await run(sql);

    expect(executedTexts()).toEqual(["select 1"]);
  });

  it("does not run the profiling cell when the query fails", async () => {
    const { sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, false);

    await run(sql);

    expect(edits).toHaveLength(1);
    expect(executedTexts()).toEqual(["select 1"]);
  });

  it("does not run the profiling cell on an earlier run's success", async () => {
    const { sql } = notebookWithSql({ cellId: "python_9s5o3" });
    queryEnds(sql, true, 1);

    await run(sql);

    expect(executedTexts()).toEqual(["select 1"]);
  });

  it("asks for pandas and ydata-profiling", () => {
    expect(PROFILE_DEPENDENCIES).toEqual([
      { type: "python", package: "pandas" },
      { type: "python", package: "ydata_profiling" },
    ]);
  });

  it("adds nothing when the user declines the package install", async () => {
    verifyAndInstallDependenciesIfNeeded.mockImplementation(async () => {
      throw new Error("User cancelled python package installation");
    });

    await run(notebookWithSql({ cellId: "python_9s5o3" }).sql);

    expect(edits).toHaveLength(0);
    expect(executeCommand).not.toHaveBeenCalled();
    expect(vscode.window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("shows any other failure of the package check, and adds nothing", async () => {
    verifyAndInstallDependenciesIfNeeded.mockImplementation(async () => {
      throw new Error("spawn EACCES");
    });

    await run(notebookWithSql({ cellId: "python_9s5o3" }).sql);

    expect(edits).toHaveLength(0);
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      "Couldn't prepare the profiling packages: spawn EACCES",
    );
  });

  it("adds nothing without a dbt project", async () => {
    await run(
      notebookWithSql({ cellId: "python_9s5o3" }).sql,
      async () => undefined,
    );

    expect(verifyAndInstallDependenciesIfNeeded).not.toHaveBeenCalled();
    expect(edits).toHaveLength(0);
  });

  it("adds nothing for a cell without an id", async () => {
    const getProject = jest.fn(async () => project);

    await run(notebookWithSql({}).sql, getProject);

    expect(getProject).not.toHaveBeenCalled();
    expect(edits).toHaveLength(0);
  });

  it("adds nothing when the cell was deleted while the packages were checked", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    verifyAndInstallDependenciesIfNeeded.mockImplementation(async () => {
      notebook.cells.splice(sql.index, 1);
    });

    await run(sql);

    expect(sql.index).toBe(-1);
    expect(edits).toHaveLength(0);
    expect(executeCommand).not.toHaveBeenCalled();
  });

  it("adds nothing when the notebook was closed while the packages were checked", async () => {
    const { notebook, sql } = notebookWithSql({ cellId: "python_9s5o3" });
    verifyAndInstallDependenciesIfNeeded.mockImplementation(async () => {
      notebook.isClosed = true;
    });

    await run(sql);

    expect(edits).toHaveLength(0);
    expect(executeCommand).not.toHaveBeenCalled();
  });

  it("runs nothing when the edit is not applied", async () => {
    applyEdit.mockImplementation(async () => false);

    await run(notebookWithSql({ cellId: "python_9s5o3" }).sql);

    expect(executeCommand).not.toHaveBeenCalled();
  });
});
