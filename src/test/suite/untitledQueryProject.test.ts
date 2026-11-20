import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { EventEmitter } from "events";
import { commands, ExtensionContext, TextDocument, Uri, window } from "vscode";
import { VirtualSqlCodeLensProvider } from "../../code_lens_provider/virtualSqlCodeLensProvider";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { DbtPowerUserActionsCenter } from "../../quickpick";

// An untitled "New query" document has no path in any project, so the project
// it runs in has to come from somewhere else.

const fileUri = (fsPath: string) =>
  ({ scheme: "file", fsPath, toString: () => `file://${fsPath}` }) as Uri;
const untitled = (name: string) =>
  ({
    scheme: "untitled",
    fsPath: name,
    toString: () => `untitled:${name}`,
  }) as Uri;

const makeProject = (name: string, root: string) => ({
  projectRoot: fileUri(root),
  getProjectName: () => name,
  executeSQLOnQueryPanel: jest.fn(),
});
type Project = ReturnType<typeof makeProject>;

const flush = () => new Promise((resolve) => setImmediate(resolve));

describe("untitled query documents", () => {
  let container: DBTProjectContainer;
  let projects: Project[];
  let workspaceState: Map<string, unknown>;
  const jaffle = () => makeProject("jaffle_shop", "/ws/jaffle_shop");
  const second = () => makeProject("second_project", "/ws/second_project");

  const setup = (...list: Project[]) => {
    projects = list;
    const folder = {
      contains: (uri: Uri) =>
        projects.some((p) => uri.fsPath.startsWith(p.projectRoot.fsPath)),
      findDBTProject: (uri: Uri) =>
        projects.find((p) => uri.fsPath.startsWith(p.projectRoot.fsPath)),
      getProjects: () => projects,
      dispose: jest.fn(),
    };
    container = new DBTProjectContainer(
      {
        onDBTInstallationVerification: new EventEmitter().on,
      } as never,
      jest.fn() as never,
      { debug: jest.fn(), error: jest.fn(), dispose: jest.fn() } as never,
      {} as never,
      {} as never,
    );
    container.dbtWorkspaceFolders = [folder as never];
    workspaceState = new Map();
    container.setContext({
      workspaceState: {
        get: (key: string) => workspaceState.get(key),
        update: (key: string, value: unknown) => workspaceState.set(key, value),
      },
    } as unknown as ExtensionContext);
  };

  const execute = async (uri: Uri) => {
    container.executeSQL(uri, "select 42 as answer", "Untitled-1");
    await flush();
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("runs in the only project when nothing was picked", async () => {
    setup(jaffle());
    const doc = untitled("Untitled-1");
    await execute(doc);
    expect(projects[0].executeSQLOnQueryPanel).toHaveBeenCalledWith(
      "select 42 as answer",
      "Untitled-1",
      "inline",
      doc,
    );
  });

  it("runs in the project remembered for the document", async () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-1");
    container.setProjectForUntitledDocument(doc, fileUri("/ws/jaffle_shop"));
    await execute(doc);
    expect(projects[1].executeSQLOnQueryPanel).toHaveBeenCalledTimes(1);
    expect(projects[0].executeSQLOnQueryPanel).not.toHaveBeenCalled();
  });

  it("prefers the document's project over the workspace pick", async () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-2");
    container.setToWorkspaceState("dbtPowerUser.projectSelected", {
      label: "second_project",
      description: "/ws/second_project",
      uri: fileUri("/ws/second_project"),
    });
    container.setProjectForUntitledDocument(doc, fileUri("/ws/jaffle_shop"));
    await execute(doc);
    expect(projects[1].executeSQLOnQueryPanel).toHaveBeenCalledTimes(1);
    expect(projects[0].executeSQLOnQueryPanel).not.toHaveBeenCalled();
  });

  it("uses the workspace pick when it was restored as plain JSON", async () => {
    setup(second(), jaffle());
    // workspaceState after a window reload: the Uri is a plain object.
    container.setToWorkspaceState("dbtPowerUser.projectSelected", {
      label: "jaffle_shop",
      description: "/ws/jaffle_shop",
      uri: { $mid: 1, scheme: "file", path: "/ws/jaffle_shop" },
    });
    await execute(untitled("Untitled-1"));
    expect(projects[1].executeSQLOnQueryPanel).toHaveBeenCalledTimes(1);
  });

  it("falls back once the document's project is forgotten", async () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-1");
    container.setProjectForUntitledDocument(doc, fileUri("/ws/jaffle_shop"));
    container.forgetProjectForUntitledDocument(doc);
    expect(container.findProjectForUntitledDocument(doc)).toBeUndefined();
  });

  it("asks for a project when several exist and none applies, then runs", async () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-1");
    (commands.executeCommand as jest.Mock).mockImplementationOnce(
      async (...args: unknown[]) => {
        // What the pickProject command does with the document it is given.
        container.setProjectForUntitledDocument(
          args[1] as Uri,
          fileUri("/ws/second_project"),
        );
      },
    );
    await execute(doc);
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.pickProject",
      doc,
    );
    expect(projects[0].executeSQLOnQueryPanel).toHaveBeenCalledTimes(1);
  });

  it("runs nothing when the user dismisses the project pick", async () => {
    setup(second(), jaffle());
    await execute(untitled("Untitled-1"));
    expect(commands.executeCommand).toHaveBeenCalledWith(
      "dbtPowerUser.pickProject",
      expect.anything(),
    );
    expect(projects[0].executeSQLOnQueryPanel).not.toHaveBeenCalled();
    expect(projects[1].executeSQLOnQueryPanel).not.toHaveBeenCalled();
  });

  it("tells the user when the workspace has no dbt project", async () => {
    setup();
    await execute(untitled("Untitled-1"));
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      "No dbt project found in this workspace to run the query in.",
    );
  });

  it("leaves saved files on the path lookup", async () => {
    setup(second(), jaffle());
    const file = fileUri("/ws/jaffle_shop/models/customers.sql");
    container.executeSQL(file, "select 1", "customers");
    expect(projects[1].executeSQLOnQueryPanel).toHaveBeenCalledWith(
      "select 1",
      "customers",
      "inline",
      file,
    );
    expect(commands.executeCommand).not.toHaveBeenCalled();
  });

  it("shows the document's project in the code lens", () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-1");
    container.setProjectForUntitledDocument(doc, fileUri("/ws/jaffle_shop"));
    const provider = new VirtualSqlCodeLensProvider(
      container,
      { getProject: () => undefined } as never,
      {} as never,
    );
    const lenses = provider.provideCodeLenses(
      { uri: doc, languageId: "jinja-sql" } as TextDocument,
      {} as never,
    ) as { command?: { title: string } }[];
    expect(lenses.map((l) => l.command?.title)).toEqual([
      "Project: jaffle_shop",
    ]);
  });

  it("refreshes the code lens when the document's project changes", () => {
    setup(second(), jaffle());
    const provider = new VirtualSqlCodeLensProvider(
      container,
      { getProject: () => undefined } as never,
      {} as never,
    );
    const refreshed = jest.fn();
    provider.onDidChangeCodeLenses(refreshed);
    container.setProjectForUntitledDocument(
      untitled("Untitled-1"),
      fileUri("/ws/second_project"),
    );
    expect(refreshed).toHaveBeenCalledTimes(1);
  });

  it("the code lens pick applies to its document", async () => {
    setup(second(), jaffle());
    const doc = untitled("Untitled-1");
    const registered = new Map<string, (...args: unknown[]) => unknown>();
    (commands.registerCommand as jest.Mock).mockImplementation(((
      id: string,
      handler: (...args: unknown[]) => unknown,
    ) => {
      registered.set(id, handler);
      return { dispose: jest.fn() };
    }) as never);
    const picked = {
      label: "second_project",
      description: "/ws/second_project",
      uri: fileUri("/ws/second_project"),
    };
    new DbtPowerUserActionsCenter(
      {} as never,
      { projectPicker: async () => picked } as never,
      container,
      {} as never,
      {} as never,
      {} as never,
    );
    container.setProjectForUntitledDocument(doc, fileUri("/ws/jaffle_shop"));
    try {
      await registered.get("dbtPowerUser.pickProject")!(doc);
      expect(container.findProjectForUntitledDocument(doc)).toBe(projects[0]);
      expect(workspaceState.get("dbtPowerUser.projectSelected")).toBe(picked);
    } finally {
      (commands.registerCommand as jest.Mock)
        .mockReset()
        .mockReturnValue({ dispose: jest.fn() });
    }
  });
});
