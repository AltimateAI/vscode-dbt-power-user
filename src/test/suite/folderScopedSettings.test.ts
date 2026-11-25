import {
  DBTCommandFactory,
  DBTConfiguration,
  DBTCoreProjectIntegration,
  DBTDiagnosticData,
  DeferConfig,
} from "@altimateai/dbt-integration";
import {
  afterAll,
  afterEach,
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

// Factories below construct TelemetryService and the Python environment
// provider; the shared vscode mock lacks `env` and `extensions`, and its
// output channel lacks the log methods (same stubs as
// dbtCloudFactoryWiring.test.ts).
import * as vscodeMock from "../mock/vscode";
const vscodeMockAny = vscodeMock as Record<string, unknown>;
vscodeMockAny.env = {
  appName: "vscode-test",
  machineId: "test-machine",
  sessionId: "test-session",
  isTelemetryEnabled: false,
  onDidChangeTelemetryEnabled: () => ({ dispose: () => {} }),
  createTelemetryLogger: () => ({
    logUsage: () => {},
    logError: () => {},
    dispose: () => {},
    onDidChangeEnableStates: () => ({ dispose: () => {} }),
  }),
};
const sharedWindow = vscodeMockAny.window as Record<string, unknown>;
sharedWindow.createOutputChannel = jest.fn(() => ({
  append: jest.fn(),
  appendLine: jest.fn(),
  clear: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  dispose: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  trace: jest.fn(),
  replace: jest.fn(),
  name: "Log - dbt",
  logLevel: 1,
  onDidChangeLogLevel: () => ({ dispose: () => {} }),
}));
vscodeMockAny.extensions = {
  getExtension: jest.fn(() => ({
    isActive: true,
    activate: () => Promise.resolve(),
    exports: {
      settings: {
        getExecutionDetails: () => ({ execCommand: ["python"] }),
        onDidChangeExecutionDetails: () => ({ dispose: () => {} }),
      },
      environment: {
        getEnvironmentPaths: async () => [],
        getEnvironmentDetails: async () => ({ executable: { uri: undefined } }),
      },
    },
  })),
};

import { Uri, window, workspace } from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";
import { DBTWorkspaceFolder } from "../../dbt_client/dbtWorkspaceFolder";
import { VSCodeDBTConfiguration } from "../../dbt_client/vscodeConfiguration";
import { DbtDocumentFormattingEditProvider } from "../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";
import { container } from "../../inversify.config";
import { isQuotedIdentifier } from "../../utils";
import { InsightsPanel } from "../../webview_provider/insightsPanel";
import { QueryResultPanel } from "../../webview_provider/queryResultPanel";

// Settings that belong to one dbt project. They are `resource`-scoped, so a
// dbt folder's own .vscode/settings.json applies in a multi-root workspace.
const RESOURCE_SETTINGS = [
  "dbt.allowListFolders",
  "dbt.buildModelCommandAdditionalParams",
  "dbt.dbtCustomRunnerImport",
  "dbt.deferConfigPerProject",
  "dbt.disableDepthsCalculation",
  "dbt.fileNameTemplateGenerateModel",
  "dbt.installDepsOnProjectInitialization",
  "dbt.prefixGenerateModel",
  "dbt.queryLimit",
  "dbt.queryTemplate",
  "dbt.runModelCommandAdditionalParams",
  "dbt.sqlFmtAdditionalParams",
  "dbt.sqlFmtPath",
  "dbt.unquotedCaseInsensitiveIdentifierRegex",
];
// Settings with one consumer per window (account, telemetry, UI panels, the
// MCP server, the interpreter and the integration mode).
const WINDOW_SETTINGS = [
  "dbt.altimateAiKey",
  "dbt.altimateInstanceName",
  "dbt.altimateUrl",
  "dbt.conversationsPollingInterval",
  "dbt.dbtIntegration",
  "dbt.dbtPythonPathOverride",
  "dbt.disableQueryHistory",
  "dbt.enableCollaboration",
  "dbt.enableMcpDataSourceQueryTools",
  "dbt.enableNewLineagePanel",
  "dbt.enableNotebooks",
  "dbt.lineage.defaultExpansion",
  "dbt.lineage.showNonSelectEdges",
  "dbt.lineage.showSelectEdges",
  "dbt.mcpSslCertKeyPath",
  "dbt.mcpSslCertPath",
  "dbt.perspectiveTheme",
  "dbt.queryScale",
  "dbt.showChangelogOnUpdate",
];

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../../package.json"), "utf8"),
);
const declaredDbtSettings: Record<string, { scope?: string }> = Object.assign(
  {},
  ...[packageJson.contributes.configuration]
    .flat()
    .map((c: { properties: Record<string, unknown> }) => c.properties),
);
for (const key of Object.keys(declaredDbtSettings)) {
  if (!key.startsWith("dbt.")) {
    delete declaredDbtSettings[key];
  }
}

describe("package.json: scope of every dbt.* setting", () => {
  it("declares a scope for every dbt.* setting", () => {
    const missing = Object.entries(declaredDbtSettings)
      .filter(([, schema]) => !schema.scope)
      .map(([key]) => key);
    expect(missing).toEqual([]);
  });

  it("scopes the per-project settings to the resource", () => {
    const resource = Object.entries(declaredDbtSettings)
      .filter(([, schema]) => schema.scope === "resource")
      .map(([key]) => key)
      .sort();
    expect(resource).toEqual(RESOURCE_SETTINGS);
  });

  it("keeps the one-per-window settings window-scoped", () => {
    const windowScoped = Object.entries(declaredDbtSettings)
      .filter(([, schema]) => schema.scope === "window")
      .map(([key]) => key)
      .sort();
    expect(windowScoped).toEqual(WINDOW_SETTINGS);
  });
});

// ---------------------------------------------------------------------------
// A `workspace.getConfiguration` that behaves like VS Code in a multi-root
// workspace: a workspace folder's value applies only when the read passes a
// resource inside that folder AND the setting is declared resource-scoped;
// otherwise the workspace / user value, then the caller's default.
// ---------------------------------------------------------------------------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "folder-scoped-settings-"));
const DOCS_FOLDER = path.join(tmp, "docs_site");
const DBT_FOLDER = path.join(tmp, "jaffle_shop");
const MODEL = path.join(DBT_FOLDER, "models", "customers.sql");

type Values = Record<string, unknown>;
let windowValues: Values = {};
let folderValues: Record<string, Values> = {};
const updates: {
  key: string;
  value: unknown;
  target: unknown;
  scope?: string;
}[] = [];

const scopePath = (scope: unknown): string | undefined => {
  if (!scope || typeof scope !== "object") {
    return undefined;
  }
  const s = scope as { fsPath?: string; uri?: { fsPath?: string } };
  return s.fsPath ?? s.uri?.fsPath;
};
const folderOf = (p: string | undefined) =>
  p === undefined
    ? undefined
    : Object.keys(folderValues).find(
        (folder) => p === folder || p.startsWith(folder + path.sep),
      );
const isResourceScoped = (key: string) =>
  declaredDbtSettings[key]?.scope === "resource";

const fakeGetConfiguration = (section?: string, scope?: unknown) => {
  const folder = folderOf(scopePath(scope));
  const full = (key: string) => (section ? `${section}.${key}` : key);
  const lookup = (key: string) => {
    const k = full(key);
    if (folder && isResourceScoped(k) && k in folderValues[folder]) {
      return { found: true, value: folderValues[folder][k] };
    }
    if (k in windowValues) {
      return { found: true, value: windowValues[k] };
    }
    return { found: false, value: undefined };
  };
  return {
    get: (key: string, defaultValue?: unknown) => {
      const r = lookup(key);
      return r.found ? r.value : defaultValue;
    },
    has: (key: string) => lookup(key).found,
    inspect: (key: string) => ({
      key: full(key),
      workspaceFolderValue: folder
        ? folderValues[folder][full(key)]
        : undefined,
      workspaceValue: windowValues[full(key)],
    }),
    update: jest.fn(async (key: string, value: unknown, target?: unknown) => {
      updates.push({ key: full(key), value, target, scope: scopePath(scope) });
    }),
  };
};

const workspaceAny = workspace as unknown as Record<string, unknown>;
const windowAny = window as unknown as Record<string, unknown>;
let originalGetConfiguration: unknown;
let originalGetWorkspaceFolder: unknown;
let originalFolders: unknown;
let originalActiveEditor: unknown;

beforeAll(() => {
  originalGetConfiguration = workspaceAny.getConfiguration;
  originalGetWorkspaceFolder = workspaceAny.getWorkspaceFolder;
  originalFolders = workspaceAny.workspaceFolders;
  originalActiveEditor = windowAny.activeTextEditor;
  workspaceAny.getConfiguration = jest.fn(fakeGetConfiguration);
  const folders = [DOCS_FOLDER, DBT_FOLDER].map((p, index) => ({
    uri: { fsPath: p },
    name: path.basename(p),
    index,
  }));
  workspaceAny.workspaceFolders = folders;
  workspaceAny.getWorkspaceFolder = jest.fn((uri: { fsPath: string }) =>
    folders.find(
      (f) =>
        uri.fsPath === f.uri.fsPath ||
        uri.fsPath.startsWith(f.uri.fsPath + path.sep),
    ),
  );
});

afterAll(() => {
  workspaceAny.getConfiguration = originalGetConfiguration;
  workspaceAny.getWorkspaceFolder = originalGetWorkspaceFolder;
  workspaceAny.workspaceFolders = originalFolders;
  windowAny.activeTextEditor = originalActiveEditor;
  fs.rmSync(tmp, { recursive: true, force: true });
});

// The reporter's layout: the workspace (or user) says 500, the dbt folder 10.
beforeEach(() => {
  windowValues = {
    "dbt.queryLimit": 500,
    "dbt.queryTemplate": "select * from ({query}) as q limit {limit}",
    "dbt.installDepsOnProjectInitialization": true,
    "dbt.runModelCommandAdditionalParams": [],
    "dbt.buildModelCommandAdditionalParams": [],
    "dbt.dbtCustomRunnerImport": "from dbt.cli.main import dbtRunner",
    "dbt.disableDepthsCalculation": false,
    "dbt.altimateUrl": "https://window.example",
    "dbt.dbtPythonPathOverride": "/window/python",
  };
  folderValues = {
    [DOCS_FOLDER]: {},
    [DBT_FOLDER]: {
      "dbt.queryLimit": 10,
      "dbt.queryTemplate": "select * from ({query}) as folder limit {limit}",
      "dbt.installDepsOnProjectInitialization": false,
      "dbt.runModelCommandAdditionalParams": ["--threads", "3"],
      "dbt.buildModelCommandAdditionalParams": ["--fail-fast"],
      "dbt.dbtCustomRunnerImport": "from folder import dbtRunner",
      "dbt.disableDepthsCalculation": true,
      "dbt.prefixGenerateModel": "stg",
      "dbt.fileNameTemplateGenerateModel": "{prefix}_{tableName}",
      "dbt.unquotedCaseInsensitiveIdentifierRegex": "^[a-z]+$",
      "dbt.sqlFmtPath": "/folder/sqlfmt",
      "dbt.sqlFmtAdditionalParams": ["--line-length", "100"],
      // window-scoped: ignored here, as VS Code does
      "dbt.altimateUrl": "https://folder.example",
      "dbt.dbtPythonPathOverride": "/folder/python",
    },
  };
  updates.length = 0;
});

const runArgs = (factory: DBTCommandFactory) =>
  factory.createRunModelCommand({
    plusOperatorLeft: "",
    modelName: "customers",
    plusOperatorRight: "",
  }).args;

describe("VSCodeDBTConfiguration.forResource", () => {
  const base = () => container.get<VSCodeDBTConfiguration>("DBTConfiguration");

  it("reads every per-project getter from the project's folder", () => {
    const config = base().forResource(Uri.file(DBT_FOLDER));
    expect(config.getQueryLimit()).toBe(10);
    expect(config.getQueryTemplate()).toBe(
      "select * from ({query}) as folder limit {limit}",
    );
    expect(config.getInstallDepsOnProjectInitialization()).toBe(false);
    expect(config.getRunModelCommandAdditionalParams()).toEqual([
      "--threads",
      "3",
    ]);
    expect(config.getBuildModelCommandAdditionalParams()).toEqual([
      "--fail-fast",
    ]);
    expect(config.getDbtCustomRunnerImport()).toBe(
      "from folder import dbtRunner",
    );
    expect(config.getDisableDepthsCalculation()).toBe(true);
  });

  it("keeps window-scoped values and the window-level instance as they were", () => {
    expect(base().forResource(Uri.file(DBT_FOLDER)).getAltimateUrl()).toBe(
      "https://window.example",
    );
    expect(base().getQueryLimit()).toBe(500);
  });

  it("falls back to the workspace / user value when the folder sets none", () => {
    expect(base().forResource(Uri.file(DOCS_FOLDER)).getQueryLimit()).toBe(500);
  });
});

describe("inversify factories hand each project its folder's settings", () => {
  type ProjectFactory<T> = (
    projectRoot: string,
    diagnostics: DBTDiagnosticData[],
    deferConfig: DeferConfig,
    onDiagnosticsChanged: () => void,
  ) => T;
  const make = <T>(id: string) =>
    container.get<ProjectFactory<T>>(id)(
      DBT_FOLDER,
      [],
      {} as DeferConfig,
      () => {},
    );
  const privateField = <T>(o: unknown, field: string) =>
    (o as Record<string, T>)[field];

  it("Python command strategy: folder settings, project working directory", () => {
    const strategy = container.get<(root: string) => unknown>(
      "Factory<PythonDBTCommandExecutionStrategy>",
    )(DBT_FOLDER);
    const config = privateField<DBTConfiguration>(strategy, "configuration");
    expect(config.getDbtCustomRunnerImport()).toBe(
      "from folder import dbtRunner",
    );
    expect(config.getWorkingDirectory()).toBe(DBT_FOLDER);
  });

  it.each([
    "Factory<DBTCoreProjectIntegration>",
    "Factory<DBTCoreCommandProjectIntegration>",
  ])("%s reads the query limit and template from the folder", (id) => {
    // no Python bridge process in a unit test
    jest
      .spyOn(
        DBTCoreProjectIntegration.prototype as unknown as {
          createPythonBridge: () => unknown;
        },
        "createPythonBridge",
      )
      .mockReturnValue({});
    const config = privateField<DBTConfiguration>(make(id), "dbtConfiguration");
    expect(config.getQueryLimit()).toBe(10);
    expect(config.getQueryTemplate()).toBe(
      "select * from ({query}) as folder limit {limit}",
    );
  });

  it("Factory<DBTCloudProjectIntegration>: folder settings for commands and the core engine", () => {
    const cloud = make("Factory<DBTCloudProjectIntegration>");
    expect(
      runArgs(privateField<DBTCommandFactory>(cloud, "dbtCommandFactory")),
    ).toEqual(expect.arrayContaining(["--threads", "3"]));
    const deps = privateField<{ dbtConfiguration: DBTConfiguration }>(
      cloud,
      "coreEngineDependencies",
    );
    expect(deps.dbtConfiguration.getQueryLimit()).toBe(10);
  });

  it("Factory<DBTFusionCommandProjectIntegration>: folder run parameters", () => {
    const fusion = make("Factory<DBTFusionCommandProjectIntegration>");
    expect(
      runArgs(privateField<DBTCommandFactory>(fusion, "dbtCommandFactory")),
    ).toEqual(expect.arrayContaining(["--threads", "3"]));
  });

  it("Factory<DBTProjectIntegrationAdapter>: configuration, commands and depth parser", () => {
    const adapter = container.get<
      (root: string, deferConfig: DeferConfig | undefined) => unknown
    >("Factory<DBTProjectIntegrationAdapter>")(DBT_FOLDER, undefined);
    const config = privateField<DBTConfiguration>(adapter, "dbtConfiguration");
    expect(config.getQueryLimit()).toBe(10);
    expect(config.getInstallDepsOnProjectInitialization()).toBe(false);
    expect(
      runArgs(privateField<DBTCommandFactory>(adapter, "dbtCommandFactory")),
    ).toEqual(expect.arrayContaining(["--threads", "3"]));
    const depthParser = privateField<unknown>(adapter, "modelDepthParser");
    expect(
      privateField<DBTConfiguration>(
        depthParser,
        "configuration",
      ).getDisableDepthsCalculation(),
    ).toBe(true);
  });
});

describe("reads in the extension pass the project, file or folder", () => {
  const project = () => {
    const p = Object.create(DBTProject.prototype) as DBTProject;
    (p as unknown as { projectRoot: Uri }).projectRoot = Uri.file(DBT_FOLDER);
    return p;
  };

  it("DBTProject.executeSQLOnQueryPanel uses the folder's query limit", async () => {
    const p = project();
    const withLimit = jest.fn(async () => undefined);
    (p as unknown as Record<string, unknown>).executeSQLWithLimitOnQueryPanel =
      withLimit;
    await p.executeSQLOnQueryPanel("select 1", "customers");
    expect(withLimit).toHaveBeenCalledWith(
      "select 1",
      "customers",
      10,
      "inline",
      undefined,
      undefined,
    );
  });

  it("DBTProject reads the defer config from the project's folder", () => {
    folderValues[DBT_FOLDER]["dbt.deferConfigPerProject"] = {
      "": { deferToProduction: true, favorState: false },
    };
    const config = (
      project() as unknown as {
        retrieveDeferConfigFromSettings: () => DeferConfig | undefined;
      }
    ).retrieveDeferConfigFromSettings();
    expect(config?.deferToProduction).toBe(true);
  });

  it("isQuotedIdentifier uses the project's identifier regex", () => {
    expect(isQuotedIdentifier("abc", "snowflake", Uri.file(DBT_FOLDER))).toBe(
      false,
    );
    expect(isQuotedIdentifier("ABC", "snowflake", Uri.file(DBT_FOLDER))).toBe(
      true,
    );
  });

  it("allowListFolders is read for the workspace folder being scanned", () => {
    const models = path.join(DBT_FOLDER, "models");
    fs.mkdirSync(models, { recursive: true });
    folderValues[DBT_FOLDER]["dbt.allowListFolders"] = ["models"];
    const folder = Object.create(
      DBTWorkspaceFolder.prototype,
    ) as DBTWorkspaceFolder;
    folder.workspaceFolder = {
      uri: Uri.file(DBT_FOLDER),
      name: "jaffle_shop",
      index: 1,
    } as DBTWorkspaceFolder["workspaceFolder"];
    expect(folder.getAllowListFolders()).toEqual([models]);
  });

  it("the sqlfmt formatter reads its path and parameters for the document", async () => {
    const pythonEnvironment = {
      getResolvedConfigValue: jest.fn((key: string, folder?: { uri: Uri }) =>
        workspace.getConfiguration("dbt", folder?.uri).get(key, ""),
      ),
    };
    const execution = {
      createCommandProcessExecution: jest.fn(() => ({
        complete: jest.fn(async () => ({ stderr: "" })),
      })),
    };
    const provider = new DbtDocumentFormattingEditProvider(
      execution as never,
      { sendTelemetryEvent: jest.fn(), sendTelemetryError: jest.fn() } as never,
      pythonEnvironment as never,
    );
    const document = { getText: () => "select 1", uri: Uri.file(MODEL) };
    expect(await provider.resolveSqlFmtPath(document.uri)).toBe(
      "/folder/sqlfmt",
    );
    await (
      provider as unknown as {
        executeSqlFmt: (d: typeof document) => Promise<unknown>;
      }
    ).executeSqlFmt(document);
    expect(execution.createCommandProcessExecution).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "/folder/sqlfmt",
        args: expect.arrayContaining(["--line-length", "100"]),
      }),
    );
  });

  describe("Query Results panel follows the active file's project", () => {
    beforeEach(() => {
      windowAny.activeTextEditor = {
        document: { uri: Uri.file(MODEL), getText: () => "select 1" },
      };
    });

    it("shows the folder's limit", async () => {
      const panel = Object.create(QueryResultPanel.prototype);
      const to = { postMessage: jest.fn(async () => true) };
      await panel.sendUpdatedContextToWebview(to);
      expect(to.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 10 }),
      );
    });

    it("sends the folder's limit with the panel config", () => {
      vscodeMockAny.ColorThemeKind ??= { Light: 1, HighContrastLight: 4 };
      windowAny.activeColorTheme = { kind: 2 };
      const panel = Object.create(QueryResultPanel.prototype);
      panel._panel = { webview: { postMessage: jest.fn() } };
      panel.altimate = { enabled: () => false };
      panel.transmitConfig();
      expect(panel._panel.webview.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 10 }),
      );
    });
  });

  it("the Insights panel updates the defer config the project's folder holds", async () => {
    folderValues[DBT_FOLDER]["dbt.deferConfigPerProject"] = {
      "": { deferToProduction: false, favorState: true },
    };
    const panel = Object.create(InsightsPanel.prototype);
    panel.dbtTerminal = { debug: jest.fn(), info: jest.fn(), error: jest.fn() };
    panel.sendResponseToWebview = jest.fn();
    const applyDeferConfig = jest.fn(async () => undefined);
    panel.dbtProjectContainer = {
      findDBTProject: jest.fn(() => ({ applyDeferConfig })),
    };
    await panel.updateDeferConfig(undefined, {
      projectRoot: DBT_FOLDER,
      config: [{ key: "deferToProduction", value: true }],
    });
    const write = updates.find((u) => u.key === "dbt.deferConfigPerProject");
    // the folder's favorState survives: it was read from the folder, not the
    // workspace
    expect(write?.value).toEqual({
      "": { deferToProduction: true, favorState: true },
    });
  });
});

afterEach(() => {
  windowAny.activeTextEditor = originalActiveEditor;
  jest.restoreAllMocks();
});
