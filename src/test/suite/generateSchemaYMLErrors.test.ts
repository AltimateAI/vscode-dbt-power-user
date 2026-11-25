import {
  DBTDiagnosticData,
  PythonException,
} from "@altimateai/dbt-integration";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { commands, Uri, window, workspace } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";

/**
 * Generate Documentation YML (`DBTProject.generateSchemaYML`) on a project
 * that didn't load, and when the column lookup fails: each failure gives one
 * toast the user can act on and one telemetry event.
 */

const GUARD =
  "Cannot resolve model reference: the dbt project is not initialized. Its last load failed: Runtime Error Could not find profile named 'no_such_profile' — fix that error and re-parse the project, then try again.";

const CONFIG_ERROR =
  "dbt configuration is invalid : Runtime Error Could not find profile named 'no_such_profile'";

function diagnostic(
  message: string,
  severity: DBTDiagnosticData["severity"] = "error",
): DBTDiagnosticData {
  return {
    filePath: "dbt_project.yml",
    message,
    severity,
    source: "dbt",
    category: "test",
  };
}

type Diagnostics = {
  pythonBridgeDiagnostics: DBTDiagnosticData[];
  rebuildManifestDiagnostics: DBTDiagnosticData[];
  projectConfigDiagnostics: DBTDiagnosticData[];
};

const noDiagnostics = (): Diagnostics => ({
  pythonBridgeDiagnostics: [],
  rebuildManifestDiagnostics: [],
  projectConfigDiagnostics: [],
});

function makeProject(opts: {
  getColumnsOfModel?: () => Promise<unknown>;
  diagnostics?: Diagnostics;
}) {
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  };
  const terminal = { debug: jest.fn(), error: jest.fn() };
  const getColumnsOfModel = jest.fn(
    opts.getColumnsOfModel ?? (async () => [{ column: "id", dtype: "int" }]),
  );
  const diagnostics = opts.diagnostics ?? noDiagnostics();
  const project = Object.assign(Object.create(DBTProject.prototype), {
    telemetry,
    terminal,
    projectRoot: Uri.file("/projects/jaffle_shop"),
    getAdapterType: () => "duckdb",
    getColumnsOfModel,
    dbtProjectIntegration: {
      getCurrentProjectIntegration: () => ({
        getDiagnostics: () => diagnostics,
      }),
    },
  }) as DBTProject;
  return { project, telemetry, terminal, getColumnsOfModel };
}

// The toast's action runs after generateSchemaYML returns.
const settle = () => new Promise((resolve) => setImmediate(resolve));

const errorToasts = () =>
  (window.showErrorMessage as jest.Mock).mock.calls.map((c) => c);

describe("Generate Documentation YML", () => {
  let root: string;
  let modelsDir: string;
  let modelPath: Uri;
  const schemaFile = () => path.join(modelsDir, "customers_schema.yml");
  const original = {
    showErrorMessage: window.showErrorMessage,
    showTextDocument: (window as any).showTextDocument,
    executeCommand: commands.executeCommand,
    openTextDocument: (workspace as any).openTextDocument,
  };

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "genschema-"));
  });

  afterAll(() => {
    window.showErrorMessage = original.showErrorMessage;
    (window as any).showTextDocument = original.showTextDocument;
    commands.executeCommand = original.executeCommand;
    (workspace as any).openTextDocument = original.openTextDocument;
    fs.rmSync(root, { recursive: true, force: true });
  });

  beforeEach(() => {
    // Each test writes into its own models folder.
    modelsDir = fs.mkdtempSync(path.join(root, "models-"));
    modelPath = Uri.file(path.join(modelsDir, "customers.sql"));
    window.showErrorMessage = jest
      .fn()
      .mockReturnValue(Promise.resolve(undefined)) as any;
    (window as any).showTextDocument = jest.fn();
    commands.executeCommand = jest
      .fn()
      .mockReturnValue(Promise.resolve(undefined)) as any;
    (workspace as any).openTextDocument = jest.fn(async () => ({}));
  });

  describe("on a project that didn't load", () => {
    it.each<[string, keyof Diagnostics]>([
      ["project config", "projectConfigDiagnostics"],
      ["manifest rebuild", "rebuildManifestDiagnostics"],
      ["Python bridge", "pythonBridgeDiagnostics"],
    ])("shows the %s error instead of calling dbt", async (_label, key) => {
      const diagnostics = noDiagnostics();
      diagnostics[key] = [diagnostic(CONFIG_ERROR)];
      const { project, telemetry, getColumnsOfModel } = makeProject({
        diagnostics,
      });

      await project.generateSchemaYML(modelPath, "customers");

      expect(getColumnsOfModel).not.toHaveBeenCalled();
      expect(errorToasts()).toEqual([
        [
          `Can't generate the documentation YML: the dbt project didn't load: ${CONFIG_ERROR}`,
          "Show problems",
          "Re-parse",
        ],
      ]);
      expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
      expect(telemetry.sendTelemetryEvent.mock.calls).toEqual([
        ["generateSchemaYMLProjectNotLoaded", { adapter: "duckdb" }],
      ]);
      expect(fs.existsSync(schemaFile())).toBe(false);
    });

    it("re-parses this project from the Re-parse action", async () => {
      (window.showErrorMessage as jest.Mock).mockReturnValue(
        Promise.resolve("Re-parse"),
      );
      const diagnostics = noDiagnostics();
      diagnostics.projectConfigDiagnostics = [diagnostic(CONFIG_ERROR)];
      const { project } = makeProject({ diagnostics });

      await project.generateSchemaYML(modelPath, "customers");
      await settle();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.reparseProject",
        project.projectRoot,
      );
    });

    it("still generates when the project only has warnings", async () => {
      const diagnostics = noDiagnostics();
      diagnostics.rebuildManifestDiagnostics = [
        diagnostic("Deprecated config", "warning"),
      ];
      const { project, getColumnsOfModel } = makeProject({ diagnostics });

      await project.generateSchemaYML(modelPath, "customers");

      expect(getColumnsOfModel).toHaveBeenCalledWith("customers");
      expect(errorToasts()).toEqual([]);
      expect(fs.readFileSync(schemaFile(), "utf8")).toContain(
        "  - name: customers\n",
      );
    });
  });

  it("reports a Python failure once, with the traceback in the log only", async () => {
    const exc = new PythonException({
      exception: {
        message: GUARD,
        args: [GUARD],
        type: { name: "Exception", module: "builtins" },
        format: [],
      },
      traceback: {
        lineno: 1006,
        strack: [],
        format: [
          'Traceback (most recent call last):\n  File "dbt_core_integration.py", line 1006, in get_ref_node\n',
        ],
      },
      // What the bridge sends: the whole formatted traceback.
      format: [
        "Traceback (most recent call last):\n",
        '  File "dbt_core_integration.py", line 1006, in get_ref_node\n',
        `Exception: ${GUARD}\n`,
      ],
    });
    const { project, telemetry, terminal } = makeProject({
      getColumnsOfModel: async () => {
        throw exc;
      },
    });

    await project.generateSchemaYML(modelPath, "customers");

    const toasts = errorToasts().map((c) => String(c[0]));
    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toContain(GUARD);
    expect(toasts[0]).not.toContain("Traceback");
    expect(telemetry.sendTelemetryError.mock.calls.map((c) => c[0])).toEqual([
      "generateSchemaYMLPythonError",
    ]);
    expect(terminal.error).toHaveBeenCalledWith(
      "dbtProject:generateSchemaYML",
      expect.any(String),
      exc,
      false,
    );
  });

  it("reports any other failure once", async () => {
    const { project, telemetry } = makeProject({
      getColumnsOfModel: async () => {
        throw new Error("boom");
      },
    });

    await project.generateSchemaYML(modelPath, "customers");

    expect(errorToasts().map((c) => String(c[0]))).toEqual([
      expect.stringContaining("Could not generate schema yaml: boom"),
    ]);
    expect(telemetry.sendTelemetryError.mock.calls.map((c) => c[0])).toEqual([
      "generateSchemaYMLUnknownError",
    ]);
  });
});
