import {
  DBTDiagnosticData,
  NoCredentialsError,
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
 * Generate model (`DBTProject.generateModel`) on a project that didn't load,
 * without Altimate credentials in dbt Cloud mode, and when the column lookup
 * fails in Python: each failure gives one answer the user can act on and one
 * telemetry event.
 */

const GUARD =
  "Cannot resolve source: the dbt project is not initialized. Parsing failed or the warehouse connection could not be established — fix that error and re-parse the project, then try again.";

const CONFIG_ERROR =
  "dbt configuration is invalid : Compilation Error in model broken_model (models/broken_model.sql)\n  unexpected '}', expected ')'";

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
  getColumnsOfSource?: () => Promise<unknown>;
  diagnostics?: Diagnostics;
}) {
  const telemetry = {
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  };
  const terminal = { debug: jest.fn(), error: jest.fn() };
  const altimateAuthService = { handlePreviewFeatures: jest.fn() };
  const getColumnsOfSource = jest.fn(
    opts.getColumnsOfSource ?? (async () => [{ column: "id", dtype: "int" }]),
  );
  const diagnostics = opts.diagnostics ?? noDiagnostics();
  const project = Object.assign(Object.create(DBTProject.prototype), {
    telemetry,
    terminal,
    altimateAuthService,
    projectRoot: Uri.file("/projects/jaffle_shop"),
    getAdapterType: () => "duckdb",
    getColumnsOfSource,
    dbtProjectIntegration: {
      getCurrentProjectIntegration: () => ({
        getDiagnostics: () => diagnostics,
      }),
    },
  }) as DBTProject;
  return {
    project,
    telemetry,
    terminal,
    altimateAuthService,
    getColumnsOfSource,
  };
}

// The toast's action runs after generateModel returns.
const settle = () => new Promise((resolve) => setImmediate(resolve));

const errorToasts = () =>
  (window.showErrorMessage as jest.Mock).mock.calls.map((c) => c);

describe("Generate model", () => {
  let root: string;
  let sourceDir: string;
  const original = {
    showErrorMessage: window.showErrorMessage,
    showTextDocument: (window as any).showTextDocument,
    executeCommand: commands.executeCommand,
    openTextDocument: (workspace as any).openTextDocument,
  };

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "genmodel-"));
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
    sourceDir = fs.mkdtempSync(path.join(root, "models-"));
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
      const { project, telemetry, getColumnsOfSource } = makeProject({
        diagnostics,
      });

      await project.generateModel("raw", "raw_customers", sourceDir);

      expect(getColumnsOfSource).not.toHaveBeenCalled();
      expect(errorToasts()).toEqual([
        [
          `Can't generate the model: the dbt project didn't load: ${CONFIG_ERROR}`,
          "Show problems",
          "Re-parse",
        ],
      ]);
      expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
      expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
        "generateModelProjectNotLoaded",
        { adapter: "duckdb" },
      );
    });

    it("re-parses this project from the Re-parse action", async () => {
      (window.showErrorMessage as jest.Mock).mockReturnValue(
        Promise.resolve("Re-parse"),
      );
      const diagnostics = noDiagnostics();
      diagnostics.projectConfigDiagnostics = [diagnostic(CONFIG_ERROR)];
      const { project } = makeProject({ diagnostics });

      await project.generateModel("raw", "raw_customers", sourceDir);
      await settle();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "dbtPowerUser.reparseProject",
        project.projectRoot,
      );
    });

    it("opens Problems from the Show problems action", async () => {
      (window.showErrorMessage as jest.Mock).mockReturnValue(
        Promise.resolve("Show problems"),
      );
      const diagnostics = noDiagnostics();
      diagnostics.rebuildManifestDiagnostics = [diagnostic(CONFIG_ERROR)];
      const { project } = makeProject({ diagnostics });

      await project.generateModel("raw", "raw_customers", sourceDir);
      await settle();

      expect(commands.executeCommand).toHaveBeenCalledWith(
        "workbench.actions.view.problems",
      );
    });

    it("still generates when the project only has warnings", async () => {
      const diagnostics = noDiagnostics();
      diagnostics.rebuildManifestDiagnostics = [
        diagnostic("Deprecated config", "warning"),
      ];
      const { project, getColumnsOfSource } = makeProject({ diagnostics });

      await project.generateModel("raw", "raw_orders", sourceDir);

      expect(getColumnsOfSource).toHaveBeenCalledWith("raw", "raw_orders");
      expect(errorToasts()).toEqual([]);
      expect(fs.readdirSync(sourceDir)).toHaveLength(1);
    });
  });

  it("asks for an API key when Altimate credentials are missing (dbt Cloud)", async () => {
    const { project, telemetry, altimateAuthService } = makeProject({
      getColumnsOfSource: async () => {
        throw new NoCredentialsError(
          "To use this feature, please add an API Key and an instance name in the settings.",
        );
      },
    });

    await project.generateModel("info", "tables", sourceDir);

    expect({
      apiKeyPrompt: altimateAuthService.handlePreviewFeatures.mock.calls.length,
      errorEvents: telemetry.sendTelemetryError.mock.calls.length,
      errorToasts: errorToasts(),
    }).toEqual({ apiKeyPrompt: 1, errorEvents: 0, errorToasts: [] });
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
        lineno: 979,
        strack: [],
        format: [
          'Traceback (most recent call last):\n  File "dbt_core_integration.py", line 1021, in get_source_node\n',
        ],
      },
      // What the bridge sends: the whole formatted traceback.
      format: [
        "Traceback (most recent call last):\n",
        '  File "dbt_core_integration.py", line 1021, in get_source_node\n',
        `Exception: ${GUARD}\n`,
      ],
    });
    const { project, telemetry, terminal } = makeProject({
      getColumnsOfSource: async () => {
        throw exc;
      },
    });

    await project.generateModel("raw", "raw_customers", sourceDir);

    const toasts = errorToasts().map((c) => String(c[0]));
    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toContain(GUARD);
    expect(toasts[0]).not.toContain("Traceback");
    expect(telemetry.sendTelemetryError.mock.calls.map((c) => c[0])).toEqual([
      "generateModelPythonError",
    ]);
    expect(terminal.error).toHaveBeenCalledWith(
      "dbtProject:generateModel",
      expect.any(String),
      exc,
      false,
    );
  });

  it("reports any other failure once", async () => {
    const { project, telemetry } = makeProject({
      getColumnsOfSource: async () => {
        throw new Error("boom");
      },
    });

    await project.generateModel("raw", "raw_customers", sourceDir);

    expect(errorToasts()).toHaveLength(1);
    expect(telemetry.sendTelemetryError.mock.calls.map((c) => c[0])).toEqual([
      "generateModelUnknownError",
    ]);
  });
});
