import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import { TelemetryService } from "../../telemetry";

// The vendored notebook library (src/lib) ends the Notebook/Execute event once
// per cell: Notebook/ExecuteSuccess when the cell runs, Notebook/ExecuteError
// with the thrown error when it fails.
const loadLib = () => {
  let lib: any;
  jest.isolateModules(() => {
    const isolatedVscode: any = require("vscode");
    isolatedVscode.NotebookCellKind = { Markup: 1, Code: 2 };
    isolatedVscode.NotebookCellOutputItem = {
      json: (value: unknown, mime: string) => ({ mime, value }),
      text: (value: unknown, mime: string) => ({ mime, value }),
      error: (value: unknown) => ({ mime: "error", value }),
    };
    isolatedVscode.NotebookCellOutput = class {
      constructor(public items: unknown[]) {}
    };
    jest.doMock("@lib", () => jest.requireActual("../../lib/index"));
    lib = require("@lib");
  });
  return lib;
};

const QUERY_RESULT = {
  table: { column_names: ["one"], column_types: ["integer"], rows: [[1]] },
  raw_sql: "select 1 as one",
  compiled_sql: "select 1 as one limit 500",
};

// Runs one SQL cell through the controller with the given query outcome.
const runSqlCell = async (
  telemetry: unknown,
  executeQuery: () => Promise<unknown>,
) => {
  const lib = loadLib();
  const controller = Object.create(lib.DatapilotNotebookController.prototype);
  Object.assign(controller, {
    executionOrder: 0,
    dbtTerminal: { debug: jest.fn(), error: jest.fn() },
    telemetry,
    _onNotebookCellEvent: { fire: jest.fn() },
  });
  const execution = {
    start: jest.fn(),
    end: jest.fn(),
    clearOutput: jest.fn(),
    replaceOutput: jest.fn(),
    appendOutput: jest.fn(),
    token: { onCancellationRequested: jest.fn() },
  };
  await controller._doExecution(
    {
      index: 0,
      metadata: { cellId: "jinja_sql_1" },
      document: { languageId: "jinja-sql", getText: () => "select 1 as one" },
    },
    { uri: { fsPath: "/project/a.notebook" } },
    false,
    { createNotebookCellExecution: () => execution },
    { executeSQL: jest.fn(() => Promise.resolve({ executeQuery })) },
    { storeDataInKernel: jest.fn(() => Promise.resolve()) },
  );
  return execution;
};

describe("notebook cell telemetry (vendored library)", () => {
  let telemetry: TelemetryService;
  let sendTelemetryEvent: jest.Mock;
  let sendTelemetryErrorEvent: jest.Mock;

  beforeEach(() => {
    (vscode as { env?: unknown }).env = {
      appName: "Visual Studio Code",
      createTelemetryLogger: jest.fn().mockReturnValue({
        onDidChangeEnableStates: jest
          .fn()
          .mockReturnValue({ dispose: jest.fn() }),
        isErrorsEnabled: false,
        isUsageEnabled: false,
        logUsage: jest.fn(),
        logError: jest.fn(),
        dispose: jest.fn(),
      }),
    };
    telemetry = new TelemetryService();
    sendTelemetryEvent = jest.fn();
    sendTelemetryErrorEvent = jest.fn();
    (telemetry as unknown as { telemetryReporter: unknown }).telemetryReporter =
      { sendTelemetryEvent, sendTelemetryErrorEvent, dispose: jest.fn() };
  });

  afterEach(() => {
    telemetry.dispose();
    delete (vscode as { env?: unknown }).env;
  });

  const sentNames = (spy: jest.Mock) => spy.mock.calls.map((call) => call[0]);

  it("reports a cell that runs as Notebook/ExecuteSuccess, not as an error", async () => {
    const execution = await runSqlCell(telemetry, () =>
      Promise.resolve(QUERY_RESULT),
    );

    expect(execution.end).toHaveBeenCalledWith(true, expect.any(Number));
    expect(sentNames(sendTelemetryErrorEvent)).not.toContain(
      "Notebook/ExecuteError",
    );
    expect(sentNames(sendTelemetryEvent)).toContain("Notebook/ExecuteSuccess");
    const [, properties, measurements] = sendTelemetryEvent.mock.calls.find(
      (call) => call[0] === "Notebook/ExecuteSuccess",
    ) as [string, Record<string, string>, Record<string, number>];
    expect(properties.language).toBe("jinja-sql");
    expect(measurements.duration).toEqual(expect.any(Number));
  });

  it("reports a cell that fails as Notebook/ExecuteError with its error", async () => {
    const execution = await runSqlCell(telemetry, () =>
      Promise.reject(new Error("relation does not exist")),
    );

    expect(execution.end).toHaveBeenCalledWith(false, expect.any(Number));
    expect(sentNames(sendTelemetryEvent)).not.toContain(
      "Notebook/ExecuteSuccess",
    );
    const [, properties] = sendTelemetryErrorEvent.mock.calls.find(
      (call) => call[0] === "Notebook/ExecuteError",
    ) as [string, Record<string, string>];
    expect(properties.language).toBe("jinja-sql");
    expect(properties.error_message).toContain("relation does not exist");
  });
});
