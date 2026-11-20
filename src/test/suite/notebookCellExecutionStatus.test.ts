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
  const execution = {
    start: jest.fn(),
    end: jest.fn(),
    clearOutput: jest.fn(),
    replaceOutput: jest.fn(),
    appendOutput: jest.fn((o: any) => appended.push(...o)),
    token: {
      onCancellationRequested: jest.fn((listener: () => void) => {
        onCancel = listener;
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

  return { end: execution.end, appended };
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

  it("ends a cancelled cell without a success flag", async () => {
    const { end } = await runPythonCell({ cancelled: true, returned: [] });

    expect(end.mock.calls[0]).toEqual([undefined, expect.any(Number)]);
  });

  it("still finishes as failed when the extension itself throws", async () => {
    const { end } = await runPythonCell({
      throws: new Error("Kernel not found"),
    });

    expect(end).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(false, expect.any(Number));
  });
});
