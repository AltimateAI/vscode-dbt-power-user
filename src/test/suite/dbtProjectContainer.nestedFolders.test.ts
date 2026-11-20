import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { workspace } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";
import { DBTProjectContainer } from "../../dbt_client/dbtProjectContainer";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";

/**
 * Which registered project a file resolves to when workspace folders nest:
 * a repo root "." listed next to the dbt project folder inside it, or the dbt
 * project as the outer folder with one of its subfolders added on its own.
 *
 * The folders and projects are real `DBTWorkspaceFolder` / `DBTProject`
 * prototypes, so `contains` and `findDBTProject` run their production code.
 */

const uri = (fsPath: string) => ({ fsPath }) as any;

const project = (root: string): DBTProject => {
  const p = Object.create(DBTProject.prototype);
  p.projectRoot = uri(root);
  return p;
};

const folder = (root: string, projects: DBTProject[]): DBTWorkspaceFolder => {
  const f = Object.create(DBTWorkspaceFolder.prototype);
  f.workspaceFolder = { uri: uri(root), name: root, index: 0 };
  f.dbtProjects = projects;
  f.dispose = jest.fn();
  return f;
};

const newContainer = () =>
  new DBTProjectContainer(
    {
      onDBTInstallationVerification: jest.fn(),
      dispose: jest.fn(),
    } as any,
    jest.fn() as any,
    { debug: jest.fn(), info: jest.fn(), error: jest.fn() } as any,
    {} as any,
    {} as any,
  );

const REPO = "/ws/repo";
const DBT = `${REPO}/dbt_vocab_ingest`;
const MODEL = `${DBT}/models/customers.sql`;

describe("DBTProjectContainer.findDBTProject with nested workspace folders", () => {
  let container: DBTProjectContainer;

  beforeEach(() => {
    container = newContainer();
  });

  it("finds the project when the outer folder is listed first and registered nothing (files.exclude hides the dbt folder)", () => {
    const dbtProject = project(DBT);
    container.dbtWorkspaceFolders = [
      folder(REPO, []),
      folder(DBT, [dbtProject]),
    ];

    expect(container.findDBTProject(uri(MODEL))).toBe(dbtProject);
    expect(container.getProjectRootpath(uri(MODEL))?.fsPath).toBe(DBT);
  });

  it("finds the project when the dbt folder is listed first", () => {
    const dbtProject = project(DBT);
    container.dbtWorkspaceFolders = [
      folder(DBT, [dbtProject]),
      folder(REPO, []),
    ];

    expect(container.findDBTProject(uri(MODEL))).toBe(dbtProject);
  });

  it("prefers the inner folder's copy when both folders registered the same project, in either order", () => {
    const outerCopy = project(DBT);
    const innerCopy = project(DBT);
    const outer = folder(REPO, [outerCopy]);
    const inner = folder(DBT, [innerCopy]);

    container.dbtWorkspaceFolders = [outer, inner];
    expect(container.findDBTProject(uri(MODEL))).toBe(innerCopy);

    container.dbtWorkspaceFolders = [inner, outer];
    expect(container.findDBTProject(uri(MODEL))).toBe(innerCopy);
  });

  it("falls back to the outer folder's project when the inner folder has none (a subfolder of the project added as its own folder)", () => {
    const PROJECT = "/ws/jaffle_shop";
    const STAGING = `${PROJECT}/models/staging`;
    const dbtProject = project(PROJECT);
    const outer = folder(PROJECT, [dbtProject]);
    const inner = folder(STAGING, []);

    for (const order of [
      [outer, inner],
      [inner, outer],
    ]) {
      container.dbtWorkspaceFolders = order;
      expect(
        container.findDBTProject(uri(`${STAGING}/stg_customers.sql`)),
      ).toBe(dbtProject);
      expect(
        container.findDBTProject(uri(`${PROJECT}/models/customers.sql`)),
      ).toBe(dbtProject);
    }
  });

  it("returns the deepest project root that contains the file, across folders", () => {
    const outerProject = project(`${REPO}/a`);
    const nestedProject = project(`${REPO}/a/b`);
    container.dbtWorkspaceFolders = [
      folder(`${REPO}/a`, [outerProject]),
      folder(REPO, [nestedProject]),
    ];

    expect(container.findDBTProject(uri(`${REPO}/a/b/models/x.sql`))).toBe(
      nestedProject,
    );
    expect(container.findDBTProject(uri(`${REPO}/a/models/x.sql`))).toBe(
      outerProject,
    );
  });

  it.each([
    ["before", false],
    ["after", true],
  ])(
    "resolves each of two sibling dbt folders listed %s the root folder that registered nothing",
    (_label, rootFirst) => {
      const alpha = project(`${REPO}/alpha`);
      const beta = project(`${REPO}/beta`);
      const siblings = [
        folder(`${REPO}/alpha`, [alpha]),
        folder(`${REPO}/beta`, [beta]),
      ];
      const root = folder(REPO, []);
      container.dbtWorkspaceFolders = rootFirst
        ? [root, ...siblings]
        : [...siblings, root];

      expect(container.findDBTProject(uri(`${REPO}/alpha/models/a.sql`))).toBe(
        alpha,
      );
      expect(container.findDBTProject(uri(`${REPO}/beta/models/b.sql`))).toBe(
        beta,
      );
      expect(
        container.findDBTProject(uri(`${REPO}/scripts/deploy.py`)),
      ).toBeUndefined();
    },
  );

  it("does not match a sibling folder that only shares a name prefix", () => {
    container.dbtWorkspaceFolders = [folder("/ws/dbt", [project("/ws/dbt")])];

    expect(
      container.findDBTProject(uri("/ws/dbt_other/models/x.sql")),
    ).toBeUndefined();
  });
});

describe("DBTProjectContainer unregisters the removed workspace folder only", () => {
  let changeHandler: (event: any) => Promise<void>;
  let container: DBTProjectContainer;

  beforeEach(() => {
    (workspace.onDidChangeWorkspaceFolders as any).mockImplementation(
      (handler: any) => {
        changeHandler = handler;
        return { dispose: jest.fn() };
      },
    );
    container = newContainer();
  });

  it.each([
    ["outer folder listed first", true],
    ["inner folder listed first", false],
  ])(
    "removing the inner folder disposes the inner folder, not the outer one (%s)",
    async (_label, outerFirst) => {
      const outer = folder(REPO, []);
      const inner = folder(DBT, [project(DBT)]);
      container.dbtWorkspaceFolders = outerFirst
        ? [outer, inner]
        : [inner, outer];

      await changeHandler({
        added: [],
        removed: [{ uri: uri(DBT), name: "dbt", index: 1 }],
      });

      expect(inner.dispose).toHaveBeenCalled();
      expect(outer.dispose).not.toHaveBeenCalled();
      expect(container.dbtWorkspaceFolders).toEqual([outer]);
    },
  );

  it("removing the outer folder keeps the inner folder", async () => {
    const outer = folder(REPO, []);
    const inner = folder(DBT, [project(DBT)]);
    container.dbtWorkspaceFolders = [inner, outer];

    await changeHandler({
      added: [],
      removed: [{ uri: uri(REPO), name: "repo", index: 0 }],
    });

    expect(outer.dispose).toHaveBeenCalled();
    expect(inner.dispose).not.toHaveBeenCalled();
    expect(container.dbtWorkspaceFolders).toEqual([inner]);
  });

  it("ignores a removed folder that was never registered, even one inside a registered folder", async () => {
    const outer = folder(REPO, []);
    container.dbtWorkspaceFolders = [outer];

    await changeHandler({
      added: [],
      removed: [{ uri: uri(DBT), name: "dbt", index: 1 }],
    });

    expect(outer.dispose).not.toHaveBeenCalled();
    expect(container.dbtWorkspaceFolders).toEqual([outer]);
  });
});
