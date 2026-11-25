import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { EventEmitter, Uri, window, workspace } from "vscode";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";
import { ProjectStartQueue } from "../../dbt_client/projectStartQueue";

/**
 * A window with many dbt projects starts them through one queue, a few at a
 * time: each start spawns Python, imports dbt and parses the project. The
 * project of the file being edited goes first, projects found later by the
 * watcher wait their turn, and one removed while it waits never starts.
 */
describe("DBTWorkspaceFolder: projects start a few at a time", () => {
  let root: string;
  let onCreate: ((uri: { fsPath: string }) => void) | undefined;
  let onDelete: ((uri: { fsPath: string }) => void) | undefined;
  /** Project roots, in the order they were created. */
  let created: string[];
  /** Each project's initialize, settled by the test. */
  let initializing: Map<string, () => void>;
  let running: number;
  let mostRunning: number;
  const originalActiveEditor = window.activeTextEditor;
  const uriFile = Uri.file as jest.Mock;
  const originalUriFile = uriFile.getMockImplementation();

  const projectRoot = (name: string) => path.join(root, name);

  function writeProject(name: string) {
    mkdirSync(projectRoot(name), { recursive: true });
    writeFileSync(
      path.join(projectRoot(name), "dbt_project.yml"),
      `name: ${name}\nversion: "1.0"\nprofile: ${name}\n`,
    );
  }

  function fakeProject(uri: { fsPath: string }) {
    created.push(uri.fsPath);
    return {
      projectRoot: uri,
      onRebuildManifestStatusChange: () => ({ dispose: jest.fn() }),
      initialize: () => {
        running++;
        mostRunning = Math.max(mostRunning, running);
        return new Promise<void>((resolve) =>
          initializing.set(uri.fsPath, () => {
            running--;
            resolve();
          }),
        );
      },
      getProjectName: () => path.basename(uri.fsPath),
      getPackageInstallPath: () => undefined,
      dispose: jest.fn(),
    };
  }

  function makeFolder(names: string[], queue: ProjectStartQueue) {
    for (const name of names) {
      writeProject(name);
    }
    (workspace as any).findFiles = jest.fn(async () =>
      names.map((name) => {
        const file = path.join(projectRoot(name), "dbt_project.yml");
        // A Uri's path always uses "/", on Windows too.
        return { fsPath: file, path: file.split(path.sep).join("/") };
      }),
    );
    (workspace.createFileSystemWatcher as jest.Mock).mockReturnValue({
      onDidChange: jest.fn().mockReturnValue({ dispose: jest.fn() }),
      onDidCreate: jest.fn((cb: unknown) => {
        onCreate = cb as typeof onCreate;
        return { dispose: jest.fn() };
      }),
      onDidDelete: jest.fn((cb: unknown) => {
        onDelete = cb as typeof onDelete;
        return { dispose: jest.fn() };
      }),
      dispose: jest.fn(),
    });
    return new DBTWorkspaceFolder(
      jest.fn((uri: { fsPath: string }) => fakeProject(uri)) as never,
      (() => ({
        discoverProjects: async (paths: string[]) => paths,
      })) as never,
      { sendTelemetryEvent: jest.fn(), sendTelemetryError: jest.fn() } as never,
      {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
      } as never,
      { uri: { fsPath: root }, name: "root", index: 0 } as never,
      new EventEmitter() as never,
      new EventEmitter() as never,
      queue,
    );
  }

  /** Lets queued starts run until nothing more moves. */
  const settle = async () => {
    for (let i = 0; i < 20; i++) {
      await new Promise((resolve) => setImmediate(resolve));
    }
  };

  const finish = async (name: string) => {
    initializing.get(projectRoot(name))!();
    await settle();
  };

  beforeEach(() => {
    root = mkdtempSync(path.join(tmpdir(), "dbt-start-queue-"));
    created = [];
    initializing = new Map();
    running = 0;
    mostRunning = 0;
    onCreate = undefined;
    onDelete = undefined;
    // As VS Code's Uri.file does: fsPath in the platform's form.
    uriFile.mockImplementation((file: unknown) => ({
      fsPath: path.normalize(file as string),
    }));
    (workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: (_key: string, dflt: unknown) => dflt,
      has: () => false,
      update: jest.fn(),
    });
  });

  afterEach(() => {
    (window as any).activeTextEditor = originalActiveEditor;
    uriFile.mockImplementation(originalUriFile!);
    rmSync(root, { recursive: true, force: true });
  });

  it("starts no more projects at once than the queue allows", async () => {
    const folder = makeFolder(
      ["a", "b", "c", "d", "e"],
      new ProjectStartQueue(2),
    );

    const discovered = folder.discoverProjects();
    await settle();
    expect(created).toEqual([projectRoot("a"), projectRoot("b")]);

    await finish("a");
    expect(created).toHaveLength(3);
    for (const name of ["b", "c", "d", "e"]) {
      await finish(name);
    }
    await discovered;

    expect(created).toHaveLength(5);
    expect(mostRunning).toBe(2);
    expect(folder.getProjects()).toHaveLength(5);
  });

  it("starts the project of the file being edited first", async () => {
    (window as any).activeTextEditor = {
      document: {
        uri: {
          scheme: "file",
          fsPath: path.join(projectRoot("d"), "models", "orders.sql"),
        },
      },
    };
    const folder = makeFolder(["a", "b", "c", "d"], new ProjectStartQueue(1));

    const discovered = folder.discoverProjects();
    await settle();
    expect(created).toEqual([projectRoot("d")]);

    for (const name of ["d", "a", "b", "c"]) {
      await finish(name);
    }
    await discovered;
    expect(created).toEqual(
      ["d", "a", "b", "c"].map((name) => projectRoot(name)),
    );
  });

  it("puts the open file's project first for a document of another scheme too", async () => {
    (window as any).activeTextEditor = {
      document: {
        uri: {
          scheme: "vscode-remote",
          fsPath: path.join(projectRoot("c"), "models", "orders.sql"),
        },
      },
    };
    const folder = makeFolder(["a", "b", "c"], new ProjectStartQueue(1));

    const discovered = folder.discoverProjects();
    await settle();
    expect(created).toEqual([projectRoot("c")]);

    for (const name of ["c", "a", "b"]) {
      await finish(name);
    }
    await discovered;
  });

  it("never starts a project whose dbt_project.yml is deleted while it waits", async () => {
    const folder = makeFolder(["a", "b", "c"], new ProjectStartQueue(1));

    const discovered = folder.discoverProjects();
    await settle();
    onDelete!({ fsPath: path.join(projectRoot("b"), "dbt_project.yml") });
    await finish("a");
    await finish("c");
    await discovered;

    expect(created).toEqual([projectRoot("a"), projectRoot("c")]);
  });

  it("queues a project the watcher finds behind those already waiting", async () => {
    const folder = makeFolder(["a", "b"], new ProjectStartQueue(1));

    const discovered = folder.discoverProjects();
    await settle();
    writeProject("late");
    onCreate!({ fsPath: path.join(projectRoot("late"), "dbt_project.yml") });
    await settle();
    expect(created).toEqual([projectRoot("a")]);

    await finish("a");
    await finish("b");
    await discovered;
    expect(created).toEqual([
      projectRoot("a"),
      projectRoot("b"),
      projectRoot("late"),
    ]);
    await finish("late");
  });

  it("starts nothing still waiting once the folder is closed", async () => {
    const folder = makeFolder(["a", "b"], new ProjectStartQueue(1));

    const discovered = folder.discoverProjects();
    await settle();
    folder.dispose();
    await finish("a");
    await discovered;

    expect(created).toEqual([projectRoot("a")]);
  });
});
