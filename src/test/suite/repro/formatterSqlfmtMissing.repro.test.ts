/**
 * Reproduction of the highest-volume formatter field error:
 *   formatDbtModelApplyDiffError  (App Insights: 31,334 / 30d)
 *   dominant message: "sqlfmt not found"  (35,757 / 30d)
 *
 * Field facts (innoverio.vscode-dbt-power-user, 30 days):
 *   - formatDbtModelApplyDiffError is sent from
 *     DbtDocumentFormattingEditProvider.executeSqlFmt when sqlfmt cannot be
 *     located on the user's machine.
 *   - The single most common Error message attached to that telemetry event is
 *     literally "sqlfmt not found" — thrown at line 68 of
 *     src/document_formatting_edit_provider/dbtDocumentFormattingEditProvider.ts
 *     when findSqlFmtPath() resolves to undefined.
 *
 * This test drives the REAL provider through the REAL executeSqlFmt code path.
 * The only things mocked are the OS-discovery primitives (fs.existsSync, the
 * `which` lookup, and child_process.exec used by `uv tool dir`) so that sqlfmt
 * is provably absent — exactly the condition that produces the field error.
 *
 * Verdict: working-as-intended. A missing external binary (shandy-sqlfmt) is
 * surfaced to the user as an actionable error message plus a telemetry event.
 * is_real_bug = false. This test GUARDS that behaviour so a regression
 * (silent failure, wrong event name, or a thrown exception escaping the
 * provider) would be caught.
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// --- Mock the OS-discovery primitives so sqlfmt is provably NOT found. ---
// fs.existsSync must return false for every candidate path that
// discoverSqlFmtPath() probes (venv bin dir, ~/.local/bin, pipx, uv tool dir).
jest.mock("fs", () => ({
  __esModule: true,
  default: { existsSync: jest.fn(() => false) },
  existsSync: jest.fn(() => false),
}));

// `which("sqlfmt")` is the final PATH fallback; reject so it contributes
// nothing — mirroring a machine where sqlfmt is not on PATH.
jest.mock("which", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.reject(new Error("not found: sqlfmt"))),
}));

// child_process.exec backs execAsync("uv tool dir"). Invoke the callback with
// an error so promisify(exec) rejects and findSqlFmtInUvTools() returns
// undefined (the catch branch in the source). util.promisify uses the real
// util; only exec is faked.
jest.mock("child_process", () => ({
  __esModule: true,
  exec: jest.fn(
    (
      _cmd: string,
      _opts: unknown,
      cb?: (e: Error | null, out?: unknown) => void,
    ) => {
      const callback = typeof _opts === "function" ? _opts : cb;
      if (callback) {
        callback(new Error("uv: command not found"));
      }
    },
  ),
}));

import { window, workspace } from "vscode";
import { DbtDocumentFormattingEditProvider } from "../../../document_formatting_edit_provider/dbtDocumentFormattingEditProvider";

// Minimal TextDocument stand-in. executeSqlFmt only reaches document.getText()
// AFTER a sqlfmt binary is found, so in the "not found" path getText() is never
// called — but we provide it anyway to be faithful to the interface.
const makeDocument = () =>
  ({
    getText: jest.fn(() => "select 1 as a"),
    lineCount: 1,
  }) as any;

// PythonEnvironment stand-in. getResolvedConfigValue("sqlFmtPath") returns
// undefined (no user-configured path) so the provider falls through to
// findSqlFmtPath(). pythonPath is a non-existent interpreter — its dirname is
// probed via fs.existsSync (mocked false), so it yields no sqlfmt either.
const makePythonEnvironment = () =>
  ({
    getResolvedConfigValue: jest.fn(() => undefined),
    pythonPath: "/nonexistent/venv/bin/python",
  }) as any;

const makeTelemetry = () =>
  ({
    sendTelemetryEvent: jest.fn(),
    sendTelemetryError: jest.fn(),
  }) as any;

// The command factory must NEVER be invoked in the "not found" path — sqlfmt is
// never located, so createCommandProcessExecution is unreachable. We assert
// that below.
const makeCommandFactory = () =>
  ({
    createCommandProcessExecution: jest.fn(),
  }) as any;

describe("formatDbtModelApplyDiffError repro — 'sqlfmt not found'", () => {
  let telemetry: ReturnType<typeof makeTelemetry>;
  let commandFactory: ReturnType<typeof makeCommandFactory>;
  let pythonEnvironment: ReturnType<typeof makePythonEnvironment>;
  let provider: DbtDocumentFormattingEditProvider;

  beforeEach(() => {
    (window.showErrorMessage as jest.Mock).mockClear();

    // executeSqlFmt reads workspace.getConfiguration("dbt").get(
    //   "sqlFmtAdditionalParams", []) then calls .join(" ") on the result.
    // The bundled vscode mock's get() ignores the default arg and returns
    // undefined, which would NPE on .join — so we pin it to an empty array,
    // faithfully representing the default (no extra sqlfmt params configured).
    jest.spyOn(workspace, "getConfiguration").mockReturnValue({
      get: jest.fn((_key: string, _default?: unknown) => []),
      has: jest.fn(),
      update: jest.fn(),
    } as any);

    telemetry = makeTelemetry();
    commandFactory = makeCommandFactory();
    pythonEnvironment = makePythonEnvironment();
    provider = new DbtDocumentFormattingEditProvider(
      commandFactory,
      telemetry,
      pythonEnvironment,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("sends formatDbtModelApplyDiffError telemetry with the exact 'sqlfmt not found' Error", async () => {
    const result = await provider.provideDocumentFormattingEdits(
      makeDocument(),
      {} as any,
      {} as any,
    );

    // Telemetry is sent exactly once, with the documented event name and the
    // literal "sqlfmt not found" error that dominates the field data.
    expect(telemetry.sendTelemetryError).toHaveBeenCalledTimes(1);
    const [eventName, errorArg] = (telemetry.sendTelemetryError as jest.Mock)
      .mock.calls[0] as [string, unknown];
    expect(eventName).toBe("formatDbtModelApplyDiffError");
    expect(errorArg).toBeInstanceOf(Error);
    expect((errorArg as Error).message).toBe("sqlfmt not found");

    // The "happy path" telemetry event must NOT fire when the binary is absent.
    expect(telemetry.sendTelemetryEvent).not.toHaveBeenCalled();

    // The provider returns an empty edit list (no formatting applied), so the
    // user's document is left untouched rather than corrupted.
    expect(result).toEqual([]);
  });

  test("shows the actionable install/setup error message and never spawns sqlfmt", async () => {
    await provider.provideDocumentFormattingEdits(
      makeDocument(),
      {} as any,
      {} as any,
    );

    expect(window.showErrorMessage).toHaveBeenCalledTimes(1);
    const shown = (window.showErrorMessage as jest.Mock).mock
      .calls[0][0] as string;
    // The message guides the user to install sqlfmt or set dbt.sqlFmtPath, and
    // carries the underlying "sqlfmt not found" detail.
    expect(shown).toContain("Could not run sqlfmt.");
    expect(shown).toContain("dbt.sqlFmtPath");
    expect(shown).toContain("shandy-sqlfmt[jinjafmt]");
    expect(shown).toContain("Error: sqlfmt not found.");

    // Because sqlfmt was never located, the command process is never created —
    // we never try to spawn a non-existent binary.
    expect(commandFactory.createCommandProcessExecution).not.toHaveBeenCalled();
  });

  test("pins working-as-intended: a user-configured sqlFmtPath bypasses discovery and skips the not-found error", async () => {
    // Counter-case proving the not-found branch is gated on discovery, not an
    // unconditional failure. With a configured path, sqlfmt is considered
    // present: the formatDbtModel telemetry fires and the command IS created.
    // getFirstWorkspacePath() reads workspace.workspaceFolders[0].uri.fsPath,
    // so a folder must be present for the command-creation path.
    (workspace as any).workspaceFolders = [{ uri: { fsPath: "/tmp/project" } }];
    pythonEnvironment.getResolvedConfigValue = jest.fn(() => "/usr/bin/sqlfmt");
    const completeMock = jest.fn(() => Promise.resolve({ stderr: "" }));
    commandFactory.createCommandProcessExecution = jest.fn(() => ({
      complete: completeMock,
    }));
    const configuredProvider = new DbtDocumentFormattingEditProvider(
      commandFactory,
      telemetry,
      pythonEnvironment,
    );

    const result = await configuredProvider.provideDocumentFormattingEdits(
      makeDocument(),
      {} as any,
      {} as any,
    );

    expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
    expect(telemetry.sendTelemetryEvent).toHaveBeenCalledTimes(1);
    expect((telemetry.sendTelemetryEvent as jest.Mock).mock.calls[0]).toEqual([
      "formatDbtModel",
      { sqlFmtPath: "setting" },
    ]);
    expect(commandFactory.createCommandProcessExecution).toHaveBeenCalledTimes(
      1,
    );
    // Empty stderr + no diff output => no edits, clean return.
    expect(result).toEqual([]);

    (workspace as any).workspaceFolders = [];
  });
});
