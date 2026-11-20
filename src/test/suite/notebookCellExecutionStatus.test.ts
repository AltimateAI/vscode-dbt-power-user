import { describe, expect, it, jest } from "@jest/globals";

// A Python cell's error (NameError, a failed assert, ...) comes back from the
// kernel as an error output, not as an exception in the extension. The cell
// must still finish as failed, so VS Code shows a red mark, not a green check.
// These run the vendored notebook library's cell execution (src/lib).

const ERROR_MIME = "application/vnd.code.notebook.error";

const loadLib = () => {
  let lib: any;
  jest.isolateModules(() => {
    const vscode: any = require("vscode");
    vscode.NotebookCellKind = { Markup: 1, Code: 2 };
    vscode.NotebookCellOutputItem = {
      json: (value: unknown, mime: string) => ({ mime, value }),
      text: (value: unknown, mime: string) => ({ mime, value }),
      error: (value: unknown) => ({ mime: ERROR_MIME, value }),
    };
    vscode.NotebookCellOutput = class {
      constructor(public items: unknown[]) {}
    };
    jest.doMock("@lib", () => jest.requireActual("../../lib/index"));
    lib = require("@lib");
  });
  return lib;
};

const output = (...items: { mime: string; value: unknown }[]) => ({ items });
const errorOutput = output({
  mime: ERROR_MIME,
  value: { name: "NameError", message: "name 'x' is not defined" },
});
const stdout = (text: string) =>
  output({ mime: "application/vnd.code.notebook.stdout", value: text });
const stderr = (text: string) =>
  output({ mime: "application/vnd.code.notebook.stderr", value: text });

type Kernel = {
  streamed?: unknown[];
  returned?: unknown[];
  throws?: Error;
  cancelled?: boolean;
};

async function runPythonCell(kernel: Kernel) {
  let onCancel: (() => void) | undefined;
  const lib = loadLib();
  const controller = Object.create(lib.DatapilotNotebookController.prototype);
  Object.assign(controller, {
    executionOrder: 0,
    dbtTerminal: { debug: jest.fn(), error: jest.fn() },
    telemetry: {
      startTelemetryEvent: jest.fn(),
      endTelemetryEvent: jest.fn(),
    },
  });
  const appended: any[] = [];
  // Like VS Code's execution: it ends once and takes no output after that.
  let ended = false;
  const writable = () => {
    if (ended) {
      throw new Error("Cannot modify cell output after calling resolve");
    }
  };
  const execution = {
    start: jest.fn(),
    end: jest.fn(() => {
      if (ended) {
        throw new Error("Cannot call resolve twice");
      }
      ended = true;
    }),
    clearOutput: jest.fn(writable),
    replaceOutput: jest.fn(writable),
    appendOutput: jest.fn((o: any) => {
      writable();
      appended.push(...o);
    }),
    token: {
      isCancellationRequested: false,
      onCancellationRequested: jest.fn((listener: () => void) => {
        onCancel = () => {
          execution.token.isCancellationRequested = true;
          listener();
        };
      }),
    },
  };
  const client = {
    executePython: jest.fn(
      async (_code: string, _cell: unknown, onOutput: (o: any) => void) => {
        (kernel.streamed ?? []).forEach((o) => onOutput(o));
        if (kernel.cancelled) {
          onCancel?.();
        }
        if (kernel.throws) {
          throw kernel.throws;
        }
        return kernel.returned;
      },
    ),
  };
  const cell = {
    index: 0,
    metadata: { cellId: "python_abcde" },
    document: { languageId: "python", getText: () => "print(x)" },
  };

  await controller._doExecution(
    cell,
    { uri: { fsPath: "/project/a.notebook" } },
    false,
    { createNotebookCellExecution: () => execution },
    {},
    client,
  );

  return { end: execution.end, appended, telemetry: controller.telemetry };
}

describe("notebook Python cell execution status (vendored library)", () => {
  it("finishes as failed when the kernel returns an error output", async () => {
    const { end, appended } = await runPythonCell({
      returned: [stdout("before the error\n"), errorOutput],
    });

    expect(end).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(false, expect.any(Number));
    expect(appended.map((o) => o.items[0].mime)).toEqual([
      "application/vnd.code.notebook.stdout",
      ERROR_MIME,
    ]);
  });

  it("finishes as failed when the error output is streamed", async () => {
    const { end } = await runPythonCell({
      streamed: [errorOutput],
      returned: [],
    });

    expect(end).toHaveBeenCalledWith(false, expect.any(Number));
  });

  it("finishes as succeeded when the outputs hold no error, stderr included", async () => {
    const { end } = await runPythonCell({
      streamed: [stdout("2\n")],
      returned: [stderr("DeprecationWarning: ...\n"), stdout("done\n")],
    });

    expect(end).toHaveBeenCalledWith(true, expect.any(Number));
  });

  it("finishes as succeeded when the cell has no output", async () => {
    const { end } = await runPythonCell({ returned: [] });

    expect(end).toHaveBeenCalledWith(true, expect.any(Number));
  });

  it("ends a cancelled cell once, without a success flag, and drops its late outputs", async () => {
    const { end, appended, telemetry } = await runPythonCell({
      cancelled: true,
      returned: [stdout("finished after the cancel\n")],
    });

    expect(end).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(undefined, expect.any(Number));
    expect(appended).toEqual([]);
    expect(telemetry.endTelemetryEvent).not.toHaveBeenCalled();
  });

  it("ends a cancelled cell once when its run finishes with no output", async () => {
    const { end, telemetry } = await runPythonCell({
      cancelled: true,
      returned: undefined,
    });

    expect(end).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(undefined, expect.any(Number));
    expect(telemetry.endTelemetryEvent).not.toHaveBeenCalled();
  });

  it("still finishes as failed when the extension itself throws", async () => {
    const { end } = await runPythonCell({
      throws: new Error("Kernel not found"),
    });

    expect(end).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(false, expect.any(Number));
  });
});
