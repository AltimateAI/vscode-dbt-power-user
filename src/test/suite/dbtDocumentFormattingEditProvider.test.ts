import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { window, workspace } from "vscode";
import { DbtDocumentFormattingEditProvider } from "../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";

// The formatter must NOT report a missing sqlfmt binary as a
// `formatDbtModelApplyDiffError` telemetry error — that's an expected,
// user-actionable config state. It emits a non-error
// `formatDbtModelSqlfmtNotInstalled` event + a warning instead, and reserves
// the error event for genuine sqlfmt execution / diff-processing failures.

function makeTelemetry() {
  return {
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  } as any;
}

function makeExecution(result: {
  stderr?: string;
  reject?: Error;
}) {
  return {
    createCommandProcessExecution: jest.fn(() => ({
      complete: jest.fn(() =>
        result.reject
          ? Promise.reject(result.reject)
          : Promise.resolve({ stderr: result.stderr ?? "" }),
      ),
    })),
  } as any;
}

const pythonEnvironment = {
  getResolvedConfigValue: jest.fn().mockReturnValue(""),
} as any;

const doc = { getText: () => "select 1", uri: { fsPath: "m.sql" } } as any;

function makeProvider(exec: any, telemetry: any) {
  return new DbtDocumentFormattingEditProvider(
    exec,
    telemetry,
    pythonEnvironment,
  );
}

describe("DbtDocumentFormattingEditProvider sqlfmt telemetry", () => {
  beforeEach(() => {
    // The default config mock's get() ignores the default arg; make it honor
    // it so `get("sqlFmtAdditionalParams", [])` returns [] instead of undefined.
    (workspace.getConfiguration as jest.Mock).mockReturnValue({
      get: jest.fn((_key: string, def: unknown) => def),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not emit an error event when sqlfmt is not installed", async () => {
    const telemetry = makeTelemetry();
    const provider = makeProvider(makeExecution({}), telemetry);
    jest
      .spyOn(provider as any, "resolveSqlFmtPath")
      .mockResolvedValue(undefined);

    const edits = await (provider as any).executeSqlFmt(doc);

    expect(edits).toEqual([]);
    expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith(
      "formatDbtModelSqlfmtNotInstalled",
    );
    expect(window.showWarningMessage).toHaveBeenCalledTimes(1);
    expect(window.showErrorMessage).not.toHaveBeenCalled();
  });

  it("emits formatDbtModel (not the not-installed event) on a successful run", async () => {
    const telemetry = makeTelemetry();
    const provider = makeProvider(makeExecution({ stderr: "" }), telemetry);
    jest
      .spyOn(provider as any, "resolveSqlFmtPath")
      .mockResolvedValue("/usr/bin/sqlfmt");

    const edits = await (provider as any).executeSqlFmt(doc);

    expect(edits).toEqual([]);
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledWith("formatDbtModel", {
      sqlFmtPath: "path",
    });
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
      "formatDbtModelSqlfmtNotInstalled",
    );
    expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
  });

  it("still emits formatDbtModelApplyDiffError for a genuine sqlfmt failure", async () => {
    const telemetry = makeTelemetry();
    const provider = makeProvider(
      makeExecution({ stderr: "sqlfmt exploded" }),
      telemetry,
    );
    jest
      .spyOn(provider as any, "resolveSqlFmtPath")
      .mockResolvedValue("/usr/bin/sqlfmt");
    // Force the diff-processing path to fail so the error branch is exercised.
    jest.spyOn(provider as any, "processDiffOutput").mockImplementation(() => {
      throw new Error("bad diff");
    });

    await (provider as any).executeSqlFmt(doc);

    expect(telemetry.sendTelemetryError).toHaveBeenCalledWith(
      "formatDbtModelApplyDiffError",
      expect.anything(),
    );
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalledWith(
      "formatDbtModelSqlfmtNotInstalled",
    );
  });
});
