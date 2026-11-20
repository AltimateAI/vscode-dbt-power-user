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
    applyEdit = jest.fn(async () => true);
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
  });

  // Running the SQL cell ends with this execution summary on it.
  const queryEnds = (cell: any, success: boolean, endTime?: number) =>
    executeCommand.mockImplementation(async (_command: unknown, args: any) => {
      if (args.ranges[0].start === cell.index) {
        cell.executionSummary = {
          success,
          timing: { startTime: 0, endTime: endTime ?? Date.now() },
        };
      }
    });
  const executedRanges = () =>
    executeCommand.mock.calls.map(([command, args]: any[]) => [
      command,
      args.ranges,
      args.document,
    ]);

  const run = (cell: any, getProject = async () => project) =>
    profileNotebookCell(cell, getProject, {
      verifyAndInstallDependenciesIfNeeded,
    } as any);

  it("adds a Python cell below that reads this cell's result, runs the query, then the new cell", async () => {
    const cell = sqlCell({ cellId: "python_9s5o3" });
    queryEnds(cell, true);

    await run(cell);

    expect(verifyAndInstallDependenciesIfNeeded).toHaveBeenCalledWith(
      PROFILE_DEPENDENCIES,
      project,
    );
    expect(edits).toHaveLength(1);
    expect(edits[0].uri).toBe(cell.notebook.uri);
    const [insert] = edits[0].changes;
    expect(insert.index).toBe(3);
    expect(insert.cells).toHaveLength(1);
    expect(insert.cells[0].kind).toBe(2);
    expect(insert.cells[0].languageId).toBe("python");
    expect(insert.cells[0].value).toBe(profileCellSource("python_9s5o3"));
    expect(insert.cells[0].value).toContain("data = cell_python_9s5o3['data']");
    expect(executedRanges()).toEqual([
      ["notebook.cell.execute", [{ start: 2, end: 3 }], cell.notebook.uri],
      ["notebook.cell.execute", [{ start: 3, end: 4 }], cell.notebook.uri],
    ]);
  });

  it("does not run the profiling cell when the query fails", async () => {
    const cell = sqlCell({ cellId: "python_9s5o3" });
    queryEnds(cell, false);

    await run(cell);

    expect(edits).toHaveLength(1);
    expect(executedRanges()).toEqual([
      ["notebook.cell.execute", [{ start: 2, end: 3 }], cell.notebook.uri],
    ]);
  });

  it("does not run the profiling cell on an earlier run's success", async () => {
    const cell = sqlCell({ cellId: "python_9s5o3" });
    queryEnds(cell, true, 1);

    await run(cell);

    expect(executedRanges()).toEqual([
      ["notebook.cell.execute", [{ start: 2, end: 3 }], cell.notebook.uri],
    ]);
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

    await run(sqlCell({ cellId: "python_9s5o3" }));

    expect(edits).toHaveLength(0);
    expect(executeCommand).not.toHaveBeenCalled();
    expect(vscode.window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("shows any other failure of the package check, and adds nothing", async () => {
    verifyAndInstallDependenciesIfNeeded.mockImplementation(async () => {
      throw new Error("spawn EACCES");
    });

    await run(sqlCell({ cellId: "python_9s5o3" }));

    expect(edits).toHaveLength(0);
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      "Couldn't prepare the profiling packages: spawn EACCES",
    );
  });

  it("adds nothing without a dbt project", async () => {
    await run(sqlCell({ cellId: "python_9s5o3" }), async () => undefined);

    expect(verifyAndInstallDependenciesIfNeeded).not.toHaveBeenCalled();
    expect(edits).toHaveLength(0);
  });

  it("adds nothing for a cell without an id", async () => {
    const getProject = jest.fn(async () => project);

    await run(sqlCell({}), getProject);

    expect(getProject).not.toHaveBeenCalled();
    expect(edits).toHaveLength(0);
  });

  it("runs nothing when the edit is not applied", async () => {
    applyEdit.mockImplementation(async () => false);

    await run(sqlCell({ cellId: "python_9s5o3" }));

    expect(executeCommand).not.toHaveBeenCalled();
  });
});
