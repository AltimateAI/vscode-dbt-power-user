import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { extensions } from "vscode";
import { DbtPowerUserMcpServer } from "../../mcp";

const getExtensionMock = extensions.getExtension as jest.Mock;

interface MockTerminal {
  info: jest.Mock;
  error: jest.Mock;
  debug: jest.Mock;
  warn: jest.Mock;
  log: jest.Mock;
  trace: jest.Mock;
  show: jest.Mock;
  dispose: jest.Mock;
}

function buildTerminal(): MockTerminal {
  return {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
    trace: jest.fn(),
    show: jest.fn(),
    dispose: jest.fn(),
  };
}

function buildEventEmitter(): { eventEmitter: { event: jest.Mock } } {
  return {
    eventEmitter: {
      event: jest.fn().mockReturnValue({ dispose: jest.fn() }),
    },
  };
}

function newServer(terminal: MockTerminal) {
  // Cast through unknown — we only exercise the dependencies the method under
  // test actually touches.
  return new DbtPowerUserMcpServer(
    {} as unknown as ConstructorParameters<typeof DbtPowerUserMcpServer>[0],
    terminal as unknown as ConstructorParameters<
      typeof DbtPowerUserMcpServer
    >[1],
    {} as unknown as ConstructorParameters<typeof DbtPowerUserMcpServer>[2],
    buildEventEmitter() as unknown as ConstructorParameters<
      typeof DbtPowerUserMcpServer
    >[3],
    {} as unknown as ConstructorParameters<typeof DbtPowerUserMcpServer>[4],
  );
}

describe("DbtPowerUserMcpServer.updateMcpExtensionApi", () => {
  beforeEach(() => {
    getExtensionMock.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("logs an error and returns when the MCP extension is not installed", async () => {
    getExtensionMock.mockReturnValue(undefined);
    const terminal = buildTerminal();
    const server = newServer(terminal);

    await server.updateMcpExtensionApi();

    expect(terminal.error).toHaveBeenCalledTimes(1);
    expect(terminal.error.mock.calls[0][0]).toBe(
      "DbtPowerUserMcpServer: enableMcpExtensionIntegration",
    );
    // The message arg must carry the user-visible explanation directly —
    // previously the second arg was a generic "Failed to install MCP extension"
    // and the third was `{ message: "..." }`, which rendered as
    // `[object Object]` in the dbt output channel.
    expect(terminal.error.mock.calls[0][1]).toBe(
      "Failed to install Altimate MCP Server extension",
    );
    expect(terminal.error.mock.calls[0][2]).toBeUndefined();
    expect(terminal.info).not.toHaveBeenCalled();
  });

  it("forwards the real Error to dbtTerminal.error when integration registration throws", async () => {
    // Regression guard for the `[object Object]` log corruption: catch blocks
    // used to wrap `error` in `{ message: e.message }`, which then stringified
    // as `[object Object]` in the dbt output channel and stripped the stack
    // from `sendTelemetryError`. The catch must forward the original Error.
    const thrown = new Error("addMcpIntegrationConfig blew up");
    const addMcpIntegrationConfig = jest
      .fn<() => Promise<void>>()
      .mockRejectedValue(thrown);
    getExtensionMock.mockReturnValue({
      isActive: true,
      activate: jest.fn(),
      exports: { addMcpIntegrationConfig },
    });
    const terminal = buildTerminal();
    const server = newServer(terminal);

    await server.updateMcpExtensionApi();

    expect(terminal.error).toHaveBeenCalledTimes(1);
    expect(terminal.error.mock.calls[0][0]).toBe(
      "DbtPowerUserMcpServer:updateMcpExtensionApiError",
    );
    expect(terminal.error.mock.calls[0][2]).toBe(thrown);
    // The third arg must be an actual Error instance, not a plain
    // `{ message }` wrapper that serializes as `[object Object]`.
    expect(terminal.error.mock.calls[0][2]).toBeInstanceOf(Error);
  });

  it("logs info and returns without throwing when MCP server is disabled (exports undefined)", async () => {
    // Reproduces the 0.60.7 telemetry signal:
    // 27 events / 17 machines hitting "Cannot read properties of undefined
    // (reading 'ready')" because the MCP server's activate() returns undefined
    // when `altimate.disableMcpServer === true`.
    const activate = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    getExtensionMock.mockReturnValue({
      isActive: false,
      activate,
      exports: undefined,
    });
    const terminal = buildTerminal();
    const server = newServer(terminal);

    await expect(server.updateMcpExtensionApi()).resolves.toBeUndefined();

    expect(activate).toHaveBeenCalledTimes(1);
    expect(terminal.error).not.toHaveBeenCalled();
    expect(terminal.info).toHaveBeenCalledTimes(1);
    expect(terminal.info.mock.calls[0][0]).toBe(
      "DbtPowerUserMcpServer: updateMcpExtensionApi",
    );
    expect(terminal.info.mock.calls[0][1]).toContain("disableMcpServer");
  });

  it("awaits exports.ready and registers integration when MCP exports an API", async () => {
    let readyResolved = false;
    const ready = new Promise<void>((resolve) =>
      setTimeout(() => {
        readyResolved = true;
        resolve();
      }, 0),
    );
    const addMcpIntegrationConfig = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    getExtensionMock.mockReturnValue({
      isActive: true,
      activate: jest.fn(),
      exports: { ready, addMcpIntegrationConfig },
    });
    const terminal = buildTerminal();
    const server = newServer(terminal);

    await server.updateMcpExtensionApi();

    expect(readyResolved).toBe(true);
    expect(addMcpIntegrationConfig).toHaveBeenCalledTimes(1);
    expect(terminal.error).not.toHaveBeenCalled();
    expect(terminal.info).not.toHaveBeenCalled();
  });

  it("registers integration without awaiting when exports has no ready promise", async () => {
    const addMcpIntegrationConfig = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined);
    getExtensionMock.mockReturnValue({
      isActive: true,
      activate: jest.fn(),
      exports: { addMcpIntegrationConfig },
    });
    const terminal = buildTerminal();
    const server = newServer(terminal);

    await server.updateMcpExtensionApi();

    expect(addMcpIntegrationConfig).toHaveBeenCalledTimes(1);
    expect(terminal.error).not.toHaveBeenCalled();
    expect(terminal.info).not.toHaveBeenCalled();
  });
});
