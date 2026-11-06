import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { Uri } from "vscode";
import { ScanContext } from "../../commands/tests/scanContext";
import { StaleModelColumnTest } from "../../commands/tests/staleModelColumnTest";

jest.mock("vscode", () => jest.requireActual("../mock/vscode"));

const SCHEMA_YML = `version: 2
models:
  - name: orders
    columns:
      - name: id
      - name: removed_col
`;

let projectDir: string;

function makeProject(packageInstallPath: string | undefined) {
  return {
    getProjectName: () => "proj",
    projectRoot: Uri.file(projectDir),
    getAdapterType: () => "postgres",
    getPackageInstallPath: () => packageInstallPath,
  };
}

function makeModel(packageName: string) {
  return {
    name: "orders",
    alias: "orders",
    database: "db",
    schema: "public",
    package_name: packageName,
    patch_path: `${packageName}://models/schema.yml`,
    config: { materialized: "table" },
    columns: { id: {}, removed_col: {} },
  };
}

function makeContext(
  packageInstallPath: string | undefined,
  packageName: string,
): ScanContext {
  const project = makeProject(packageInstallPath);
  const model = makeModel(packageName);
  const context = new ScanContext(
    project as never,
    {
      nodeMetaMap: { nodes: () => [model] },
    } as never,
  );
  const modelKey = JSON.stringify({
    projectroot: project.projectRoot.fsPath,
    project: "proj",
    database: "db",
    schema: "public",
    name: "orders",
  });
  // The catalog knows only `id`: `removed_col` is stale.
  context.catalog = {
    ["proj" + project.projectRoot]: {
      [modelKey]: [{ column_name: "id" }] as never,
    },
  };
  return context;
}

describe("StaleModelColumnTest", () => {
  // A real project dir: the step reads the schema file from disk.
  beforeEach(() => {
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), "stale-column-"));
    fs.mkdirSync(path.join(projectDir, "models"));
    fs.writeFileSync(path.join(projectDir, "models", "schema.yml"), SCHEMA_YML);
  });

  afterEach(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  it("reports a stale column for the project's own model when the package install path is unknown", async () => {
    const context = makeContext(undefined, "proj");

    await new StaleModelColumnTest().run(context);

    const files = Object.keys(context.diagnostics);
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(path.join(projectDir, "models", "schema.yml"));
    expect(context.diagnostics[files[0]]).toHaveLength(1);
    expect(context.diagnostics[files[0]][0].message).toContain("removed_col");
  });

  it("skips a model from another package when the package install path is unknown", async () => {
    const context = makeContext(undefined, "some_package");

    await expect(
      new StaleModelColumnTest().run(context),
    ).resolves.toBeUndefined();

    expect(context.diagnostics).toEqual({});
  });

  it("still reports the stale column when the package install path is known", async () => {
    const context = makeContext("/proj/dbt_packages", "proj");

    await new StaleModelColumnTest().run(context);

    const files = Object.keys(context.diagnostics);
    expect(files).toHaveLength(1);
    expect(context.diagnostics[files[0]][0].message).toContain("removed_col");
  });
});
