import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { window } from "vscode";
import { SqlPreviewContentProvider } from "../../content_provider/sqlPreviewContentProvider";
import { DBTProject } from "../../dbt_client/dbtProject";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";
import { isPathInside } from "../../utils";

/**
 * On Windows and macOS the file system ignores case, so
 * <root>/wincase/jaffle_shop/models/customers.sql is the same file as
 * <root>/WinCase/Jaffle_Shop/models/customers.sql. A model opened through the
 * other spelling (a terminal link, a symlink, `code` run from a lowercase
 * path) must still belong to its project: otherwise the compiled preview says
 * "Still loading dbt project", lineage finds no node and Execute does nothing.
 *
 * Paths are in the platform's form (CI runs this on Linux, macOS and Windows);
 * `process.platform` is set to state the rule the lookup follows on each.
 */

const realPlatform = process.platform;
const onPlatform = (platform: NodeJS.Platform) =>
  Object.defineProperty(process, "platform", { value: platform });

const p = (...segments: string[]) => path.join(path.sep, "a", ...segments);
const ROOT = p("WinCase", "Jaffle_Shop");
const MODEL = p("WinCase", "Jaffle_Shop", "models", "customers.sql");
const OTHER_CASE_MODEL = p("wincase", "jaffle_shop", "models", "customers.sql");

const uri = (fsPath: string) => ({ fsPath, scheme: "file" }) as any;

const project = (root: string): DBTProject => {
  const dbtProject = Object.create(DBTProject.prototype);
  dbtProject.projectRoot = uri(root);
  return dbtProject;
};

const folder = (root: string, projects: DBTProject[]): DBTWorkspaceFolder => {
  const f = Object.create(DBTWorkspaceFolder.prototype);
  f.workspaceFolder = { uri: uri(root), name: root, index: 0 };
  f.dbtProjects = projects;
  return f;
};

const container = (folders: DBTWorkspaceFolder[]) => {
  const c = Object.create(DBTProjectContainer.prototype);
  c.dbtWorkspaceFolders = folders;
  return c as DBTProjectContainer;
};

afterEach(() => {
  onPlatform(realPlatform);
});

describe("isPathInside", () => {
  it.each<NodeJS.Platform>(["win32", "darwin"])(
    "ignores folder case on %s",
    (platform) => {
      onPlatform(platform);
      expect(isPathInside(OTHER_CASE_MODEL, ROOT)).toBe(true);
      expect(isPathInside(p("wincase", "jaffle_shop"), ROOT)).toBe(true);
    },
  );

  it("keeps case on Linux, where the file system does", () => {
    onPlatform("linux");
    expect(isPathInside(OTHER_CASE_MODEL, ROOT)).toBe(false);
    expect(isPathInside(MODEL, ROOT)).toBe(true);
  });

  it("matches the folder itself and what is inside it, not a sibling sharing its name's start", () => {
    onPlatform("win32");
    expect(isPathInside(ROOT, ROOT)).toBe(true);
    expect(isPathInside(MODEL, ROOT)).toBe(true);
    expect(
      isPathInside(p("WinCase", "Jaffle_Shop2", "models", "x.sql"), ROOT),
    ).toBe(false);
    expect(isPathInside(p("WinCase"), ROOT)).toBe(false);
  });

  it("takes a folder given with a trailing separator", () => {
    expect(isPathInside(MODEL, ROOT + path.sep)).toBe(true);
    expect(isPathInside(ROOT, ROOT + path.sep)).toBe(true);
    expect(isPathInside(MODEL, path.sep)).toBe(true);
  });
});

describe("which project a file opened through other folder casing belongs to", () => {
  it("DBTProject.contains holds it (win32)", () => {
    onPlatform("win32");
    expect(project(ROOT).contains(uri(OTHER_CASE_MODEL))).toBe(true);
  });

  it("DBTWorkspaceFolder.contains holds it (win32)", () => {
    onPlatform("win32");
    expect(folder(ROOT, []).contains(uri(OTHER_CASE_MODEL))).toBe(true);
  });

  it("the container finds its project (darwin)", () => {
    onPlatform("darwin");
    const jaffle = project(ROOT);
    const c = container([folder(ROOT, [jaffle])]);
    expect(c.findDBTProject(uri(OTHER_CASE_MODEL))).toBe(jaffle);
  });

  it("still holds the exact casing", () => {
    expect(project(ROOT).contains(uri(MODEL))).toBe(true);
  });
});

describe("Execute", () => {
  const showWarningMessage = window.showWarningMessage as jest.Mock;

  afterEach(() => {
    showWarningMessage.mockClear();
  });

  it("runs the query on the project of a file opened through other folder casing (win32)", () => {
    onPlatform("win32");
    const jaffle = project(ROOT);
    (jaffle as any).executeSQLOnQueryPanel = jest.fn();
    const c = container([folder(ROOT, [jaffle])]);

    c.executeSQL(uri(OTHER_CASE_MODEL), "select 1", "customers");

    expect((jaffle as any).executeSQLOnQueryPanel).toHaveBeenCalledWith(
      "select 1",
      "customers",
      "inline",
      uri(OTHER_CASE_MODEL),
    );
    expect(showWarningMessage).not.toHaveBeenCalled();
  });

  it("says why when the file is in no loaded project, instead of doing nothing", () => {
    const c = container([folder(ROOT, [project(ROOT)])]);

    c.executeSQL(
      uri(path.join(path.sep, "elsewhere", "scratch.sql")),
      "select 1",
      "scratch",
    );

    expect(showWarningMessage).toHaveBeenCalledWith(
      "Can't execute the query: scratch.sql isn't in a dbt project Power User has loaded. If its project is still loading, try again once it's ready.",
    );
  });
});

describe("the compiled preview of a model in a folder whose name has a %", () => {
  let root: string;

  beforeAll(() => {
    root = mkdtempSync(path.join(tmpdir(), "preview-percent-"));
  });

  afterAll(() => rmSync(root, { recursive: true, force: true }));

  it.each(["50% off", "100%25 mart"])(
    "compiles a model under %s",
    async (name) => {
      const file = path.join(root, name, "models", "orders.sql");
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, "select 1 as id");
      const lookedUp: string[] = [];
      const dbtProjectContainer = {
        onManifestChanged: () => ({ dispose: () => undefined }),
        findDBTProject: (u: { fsPath: string }) => {
          lookedUp.push(u.fsPath);
          return {
            refreshProjectConfig: async () => undefined,
            previewCanUseNode: () => false,
            compileQueryForPreview: async () => "compiled",
          };
        },
      } as unknown as DBTProjectContainer;
      const provider = new SqlPreviewContentProvider(dbtProjectContainer, {
        sendTelemetryEvent: () => undefined,
        sendTelemetryError: () => undefined,
      } as any);
      // A query-preview URI's fsPath is already decoded, as VS Code gives it.
      const previewUri = {
        fsPath: file,
        toString: () => `query-preview:${encodeURI(file)}`,
        with: () => ({ toString: () => `file:${encodeURI(file)}` }),
      } as any;

      const content = await provider.provideTextDocumentContent(previewUri);

      expect(content).toBe("compiled");
      expect(lookedUp).toEqual([file]);
      provider.dispose();
    },
  );
});
