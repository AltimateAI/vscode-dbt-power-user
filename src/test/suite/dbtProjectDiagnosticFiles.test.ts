import { DBTDiagnosticData } from "@altimateai/dbt-integration";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { EventEmitter } from "events";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import * as vscode from "vscode";
import { DBTProject } from "../../dbt_client/dbtProject";

// Diagnostics from a parse go on the file each one names: dbt Fusion reports
// the file and line of every parse error and warning.

// The shared vscode mock's `Range` keeps only two arguments and its
// collections are one shared object; the extension's modules are loaded by the
// jest setup file, so these stand-ins are patched onto the mock module.
class FourNumberRange {
  start: { line: number; character: number };
  end: { line: number; character: number };
  constructor(...args: number[]) {
    this.start = { line: args[0], character: args[1] };
    this.end = { line: args[2], character: args[3] };
  }
}

function fakeCollection() {
  const entries = new Map<string, any[]>();
  return {
    entries,
    clear: jest.fn(() => entries.clear()),
    set: jest.fn((uriOrEntries: any, diagnostics?: any[]) => {
      if (Array.isArray(uriOrEntries)) {
        for (const [uri, list] of uriOrEntries) {
          entries.set(uri.fsPath, list);
        }
      } else {
        entries.set(uriOrEntries.fsPath, diagnostics ?? []);
      }
    }),
    delete: jest.fn(),
    dispose: jest.fn(),
  };
}

const vscodeMock = vscode as any;
const originalRange = vscodeMock.Range;
const originalCreateCollection =
  vscodeMock.languages.createDiagnosticCollection;

beforeAll(() => {
  vscodeMock.Range = FourNumberRange;
  vscodeMock.languages.createDiagnosticCollection = jest.fn(fakeCollection);
});

afterAll(() => {
  vscodeMock.Range = originalRange;
  vscodeMock.languages.createDiagnosticCollection = originalCreateCollection;
});

let projectRoot: string;

beforeAll(() => {
  projectRoot = mkdtempSync(path.join(tmpdir(), "dbt-diagnostic-files-"));
  for (const file of [
    "dbt_project.yml",
    "models/orders.sql",
    "models/customers.sql",
  ]) {
    mkdirSync(path.dirname(path.join(projectRoot, file)), { recursive: true });
    writeFileSync(path.join(projectRoot, file), "");
  }
});

afterAll(() => rmSync(projectRoot, { recursive: true, force: true }));

let project: DBTProject | undefined;

afterEach(() => {
  project?.dispose();
  project = undefined;
});

function projectWith(rebuildManifestDiagnostics: DBTDiagnosticData[]) {
  (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
    get: jest.fn((key: string, fallback?: unknown) =>
      key === "dbtIntegration" ? "fusion" : fallback,
    ),
    has: jest.fn(),
    update: jest.fn(),
  });
  const events = new EventEmitter();
  const integration: any = {
    on: jest.fn((event: any, listener: any) => events.on(event, listener)),
    getDiagnostics: jest.fn(() => ({
      pythonBridgeDiagnostics: [],
      rebuildManifestDiagnostics,
      projectConfigDiagnostics: [],
    })),
    dispose: jest.fn(),
    getProjectName: jest.fn(() => "test-project"),
    cleanupConnections: jest.fn(),
  };
  integration.getCurrentProjectIntegration = jest.fn(() => integration);
  project = new DBTProject(
    {
      onPythonEnvironmentChanged: jest.fn(() => ({ dispose: jest.fn() })),
      initialize: jest.fn(() => Promise.resolve()),
    } as any,
    jest.fn(() => ({ dispose: jest.fn() })) as any,
    {} as any,
    {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    } as any,
    {} as any,
    { sendTelemetryEvent: jest.fn(), sendTelemetryError: jest.fn() } as any,
    {} as any,
    jest.fn(() => integration) as any,
    {} as any,
    { validateCredentialsSilently: jest.fn() } as any,
    {} as any,
    { addEntry: jest.fn() } as any,
    vscode.Uri.file(projectRoot),
    {},
    { event: jest.fn(), fire: jest.fn(), dispose: jest.fn() } as any,
  );
  project.updateDiagnosticsInProblemsPanel();
  return project;
}

const diagnostic = (
  filePath: string | undefined,
  message: string,
  range?: DBTDiagnosticData["range"],
): DBTDiagnosticData =>
  ({
    filePath,
    message,
    range,
    severity: "error",
    source: "dbt-fusion",
    category: "manifest-rebuild",
  }) as DBTDiagnosticData;

/** File relative to the project, each diagnostic's message and range as [startLine, startCol, endLine, endCol]. */
function rebuildPanel(p: DBTProject) {
  const entries = (p.rebuildManifestDiagnostics as any).entries as Map<
    string,
    any[]
  >;
  return Object.fromEntries(
    [...entries].map(([file, list]) => [
      path.relative(projectRoot, file),
      list.map((d) => [
        d.message,
        d.range.start.line,
        d.range.start.character,
        d.range.end.line,
        d.range.end.character,
      ]),
    ]),
  );
}

describe("parse diagnostics in the Problems panel", () => {
  it("puts each diagnostic on the file it names", () => {
    const p = projectWith([
      diagnostic(path.join(projectRoot, "models/customers.sql"), "bad config", {
        startLine: 0,
        startColumn: 0,
        endLine: 0,
        endColumn: 999,
      }),
      diagnostic(path.join(projectRoot, "models/orders.sql"), "missing ref", {
        startLine: 10,
        startColumn: 18,
        endLine: 10,
        endColumn: 999,
      }),
      diagnostic(path.join(projectRoot, "models/orders.sql"), "second", {
        startLine: 3,
        startColumn: 0,
        endLine: 3,
        endColumn: 999,
      }),
    ]);
    expect(rebuildPanel(p)).toEqual({
      "models/customers.sql": [["bad config", 0, 0, 0, 999]],
      "models/orders.sql": [
        ["missing ref", 10, 18, 10, 999],
        ["second", 3, 0, 3, 999],
      ],
    });
  });

  it("resolves a file path relative to the project root", () => {
    const p = projectWith([
      diagnostic("models/orders.sql", "relative", {
        startLine: 2,
        startColumn: 4,
        endLine: 2,
        endColumn: 999,
      }),
    ]);
    expect(rebuildPanel(p)).toEqual({
      "models/orders.sql": [["relative", 2, 4, 2, 999]],
    });
  });

  it("keeps a line-1 diagnostic on line 1 instead of underlining the whole file", () => {
    const p = projectWith([
      diagnostic("dbt_project.yml", "line one", {
        startLine: 0,
        startColumn: 0,
        endLine: 0,
        endColumn: 0,
      }),
    ]);
    expect(rebuildPanel(p)).toEqual({
      "dbt_project.yml": [["line one", 0, 0, 0, 0]],
    });
  });

  it("puts a diagnostic on dbt_project.yml when its file is missing or doesn't exist", () => {
    const p = projectWith([
      diagnostic(undefined, "no file"),
      diagnostic("", "empty file"),
      diagnostic("models/deleted.sql", "gone", {
        startLine: 5,
        startColumn: 1,
        endLine: 5,
        endColumn: 999,
      }),
    ]);
    expect(rebuildPanel(p)).toEqual({
      "dbt_project.yml": [
        ["no file", 0, 0, 999, 999],
        ["empty file", 0, 0, 999, 999],
        ["gone", 5, 1, 5, 999],
      ],
    });
  });

  it("shows today's dbt_project.yml diagnostics exactly as before", () => {
    const p = projectWith([
      diagnostic(path.join(projectRoot, "dbt_project.yml"), "parse failed", {
        startLine: 0,
        startColumn: 0,
        endLine: 999,
        endColumn: 999,
      }),
    ]);
    expect(rebuildPanel(p)).toEqual({
      "dbt_project.yml": [["parse failed", 0, 0, 999, 999]],
    });
  });

  it("clears diagnostics from files a newer parse no longer reports", () => {
    const p = projectWith([
      diagnostic("models/orders.sql", "missing ref", {
        startLine: 10,
        startColumn: 18,
        endLine: 10,
        endColumn: 999,
      }),
    ]);
    expect(Object.keys(rebuildPanel(p))).toEqual(["models/orders.sql"]);
    (
      (p as any).dbtProjectIntegration.getDiagnostics as jest.Mock
    ).mockReturnValue({
      pythonBridgeDiagnostics: [],
      rebuildManifestDiagnostics: [],
      projectConfigDiagnostics: [],
    });
    p.updateDiagnosticsInProblemsPanel();
    expect(rebuildPanel(p)).toEqual({});
  });
});
