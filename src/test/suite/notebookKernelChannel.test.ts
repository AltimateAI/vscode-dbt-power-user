import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { mkdtempSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";

// These run the vendored notebook library (src/lib) for real: the raw-kernel
// socket that talks Jupyter's ZeroMQ wire protocol, and the SQL cell path.
const KEY = "test-key";
const SCHEME = "hmac-sha256";
const DELIM = "<IDS|MSG>";

const loadLib = () => {
  let lib: any;
  let vscode: any;
  jest.isolateModules(() => {
    vscode = require("vscode");
    vscode.NotebookCellKind = { Markup: 1, Code: 2 };
    vscode.NotebookCellOutputItem = {
      json: (value: unknown, mime: string) => ({ mime, value }),
      text: (value: unknown, mime: string) => ({ mime, value }),
      error: (value: unknown) => ({ mime: "error", value }),
    };
    vscode.NotebookCellOutput = class {
      constructor(public items: unknown[]) {}
    };
    jest.doMock("@lib", () => jest.requireActual("../../lib/index"));
    lib = require("@lib");
  });
  return { lib, vscode };
};

describe("notebook kernel channel (vendored library)", () => {
  const zmq = jest.requireActual("zeromq") as any;
  const wire = jest.requireActual(
    "@nteract/messaging/lib/wire-protocol",
  ) as any;
  let shell: any;
  let iopub: any;
  let others: any[];
  let client: any;

  const port = (socket: any) => Number(socket.lastEndpoint.split(":").pop());

  // A stand-in kernel: the sockets a Jupyter kernel binds, and a connection
  // file pointing at them, served through a stubbed Python bridge.
  const startKernel = async () => {
    shell = new zmq.Router();
    iopub = new zmq.Publisher();
    others = [new zmq.Router(), new zmq.Router(), new zmq.Router()];
    for (const s of [shell, iopub, ...others]) {
      await s.bind("tcp://127.0.0.1:*");
    }
    const file = path.join(
      mkdtempSync(path.join(tmpdir(), "nb-kernel-")),
      "kernel.json",
    );
    writeFileSync(
      file,
      JSON.stringify({
        shell_port: port(shell),
        iopub_port: port(iopub),
        stdin_port: port(others[0]),
        control_port: port(others[1]),
        hb_port: port(others[2]),
        ip: "127.0.0.1",
        key: KEY,
        transport: "tcp",
        signature_scheme: SCHEME,
        kernel_name: "python3",
      }),
    );
    const tag = (strings: TemplateStringsArray) =>
      strings.join("").includes("get_connection_file") ? file : 4242;
    const bridge = {
      ex: jest.fn(() => Promise.resolve()),
      lock: jest.fn((fn: any) => Promise.resolve(fn(tag))),
    };
    const { lib } = loadLib();
    client = new lib.NotebookKernelClient(
      "/project/analysis.notebook",
      { createPythonBridge: () => bridge },
      {
        validateAndInstallNotebookDependencies: () => Promise.resolve(true),
        getDependenciesVersion: () => Promise.resolve({}),
      },
      { debug: jest.fn(), log: jest.fn(), error: jest.fn(), warn: jest.fn() },
    );
    // `getKernel()` resolves the raw kernel: the jupyterlab connection and
    // the socket under it.
    const raw = await client.getKernel();
    return raw?.realKernel;
  };

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(async () => {
    try {
      client?.kernel?.rawKernel?.realKernel?.dispose();
      client?.kernel?.rawKernel?.socket?.close();
    } catch {
      // already closed
    }
    for (const s of [shell, iopub, ...(others ?? [])]) {
      s?.close();
    }
    jest.restoreAllMocks();
  });

  it("opens the kernel connection instead of marking the kernel dead", async () => {
    const realKernel = await startKernel();

    expect(realKernel).toBeDefined();
    expect(realKernel.status).not.toBe("dead");
  }, 20_000);

  it("sends signed wire-protocol frames and reads the kernel's signed replies", async () => {
    const realKernel = await startKernel();

    let settled = false;
    const reply = realKernel.requestKernelInfo().finally(() => {
      settled = true;
    });
    // Answer every shell request (the connection asks for kernel info on its
    // own too) until ours is answered.
    const received: Buffer[][] = [];
    // One receive at a time per socket: keep the pending one across waits.
    let pending: Promise<Buffer[]> | undefined;
    while (!settled) {
      pending ??= shell.receive();
      const frames = await Promise.race([
        pending,
        new Promise<undefined>((r) => setTimeout(() => r(undefined), 200)),
      ]);
      if (!frames) {
        continue;
      }
      pending = undefined;
      received.push(frames);
      const request = wire.decode(frames.slice(1), KEY, SCHEME);
      await shell.send([
        frames[0],
        ...wire.encode(
          {
            header: {
              msg_id: `reply-${received.length}`,
              msg_type: "kernel_info_reply",
              session: request.header.session,
              username: "kernel",
              date: new Date().toISOString(),
              version: "5.3",
            },
            parent_header: request.header,
            metadata: {},
            content: {
              status: "ok",
              protocol_version: "5.3",
              implementation: "fake",
            },
            buffers: [],
            idents: [],
          },
          KEY,
          SCHEME,
        ),
      ]);
      // A request is done once the kernel also reports idle for it.
      await iopub.send(
        wire.encode(
          {
            header: {
              msg_id: `idle-${received.length}`,
              msg_type: "status",
              session: request.header.session,
              username: "kernel",
              date: new Date().toISOString(),
              version: "5.3",
            },
            parent_header: request.header,
            metadata: {},
            content: { execution_state: "idle" },
            buffers: [],
            idents: [],
          },
          KEY,
          SCHEME,
        ),
      );
    }
    expect(received.length).toBeGreaterThan(0);
    for (const frames of received) {
      expect(frames.map((f) => f.toString())).toContain(DELIM);
      expect(wire.decode(frames.slice(1), KEY, SCHEME).header.msg_type).toBe(
        "kernel_info_request",
      );
    }
    const msg = await reply;
    expect(msg?.content).toMatchObject({
      status: "ok",
      implementation: "fake",
    });
  }, 20_000);

  it("receives kernel status published on iopub", async () => {
    const realKernel = await startKernel();
    const busy = {
      header: {
        msg_id: "status-1",
        msg_type: "status",
        session: "s",
        username: "kernel",
        date: new Date().toISOString(),
        version: "5.3",
      },
      parent_header: {},
      metadata: {},
      content: { execution_state: "busy" },
      buffers: [],
      idents: [],
    };
    // A subscriber joins late: publish until it hears one.
    const end = Date.now() + 10_000;
    while (realKernel.status !== "busy" && Date.now() < end) {
      await iopub.send(wire.encode(busy, KEY, SCHEME));
      await new Promise((r) => setTimeout(r, 100));
    }
    expect(realKernel.status).toBe("busy");
  }, 20_000);
});

describe("notebook SQL cell (vendored library)", () => {
  it("renders the query's rows, not the query handle", async () => {
    const { lib } = loadLib();
    const controller = Object.create(lib.DatapilotNotebookController.prototype);
    Object.assign(controller, {
      executionOrder: 0,
      dbtTerminal: { debug: jest.fn(), error: jest.fn() },
      telemetry: {
        startTelemetryEvent: jest.fn(),
        endTelemetryEvent: jest.fn(),
      },
      _onNotebookCellEvent: { fire: jest.fn() },
    });
    const appended: any[] = [];
    const execution = {
      start: jest.fn(),
      end: jest.fn(),
      clearOutput: jest.fn(),
      replaceOutput: jest.fn((o: any) => appended.push(...o)),
      appendOutput: jest.fn((o: any) => appended.push(o)),
      token: { onCancellationRequested: jest.fn() },
    };
    const project = {
      executeSQL: jest.fn(() =>
        Promise.resolve({
          executeQuery: () =>
            Promise.resolve({
              table: {
                column_names: ["one"],
                column_types: ["integer"],
                rows: [[1]],
              },
              raw_sql: "select 1 as one",
              compiled_sql: "select 1 as one limit 500",
            }),
        }),
      ),
    };
    const cell = {
      index: 0,
      metadata: { cellId: "jinja_sql_1" },
      document: { languageId: "jinja-sql", getText: () => "select 1 as one" },
    };
    const storeDataInKernel = jest.fn(() => Promise.resolve());

    await controller._doExecution(
      cell,
      { uri: { fsPath: "/project/a.notebook" } },
      false,
      { createNotebookCellExecution: () => execution },
      project,
      { storeDataInKernel },
    );

    expect(execution.end).toHaveBeenCalledWith(true, expect.any(Number));
    const rendered = appended[0].items[0];
    expect(rendered.mime).toBe("application/perspective-json");
    expect(rendered.value).toEqual({
      columnNames: ["one"],
      columnTypes: ["integer"],
      data: [{ one: 1 }],
      raw_sql: "select 1 as one",
      compiled_sql: "select 1 as one limit 500",
    });
    expect(storeDataInKernel).toHaveBeenCalledWith(
      "jinja_sql_1",
      rendered.value,
    );
  });
});
