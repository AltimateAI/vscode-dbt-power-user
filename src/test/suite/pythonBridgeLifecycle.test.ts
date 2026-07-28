import { afterEach, describe, expect, it, jest } from "@jest/globals";
import type { ChildProcess } from "child_process";
import { EventEmitter } from "events";

const childProcess = require("child_process") as typeof import("child_process");

type FakeChildProcess = EventEmitter & {
  connected: boolean;
  pid: number;
  stdin: NodeJS.WritableStream;
  stdout: NodeJS.ReadableStream;
  stderr: NodeJS.ReadableStream;
  disconnect: jest.Mock;
  kill: jest.Mock;
  send: jest.Mock;
};

function createFakeChildProcess(): FakeChildProcess {
  const child = new EventEmitter() as FakeChildProcess;
  child.connected = true;
  child.pid = 123;
  child.stdin = {} as NodeJS.WritableStream;
  child.stdout = {} as NodeJS.ReadableStream;
  child.stderr = {} as NodeJS.ReadableStream;
  child.send = jest.fn();
  child.kill = jest.fn(() => {
    child.connected = false;
    return true;
  });
  child.disconnect = jest.fn(() => {
    if (!child.connected) {
      throw Object.assign(new Error("IPC channel is already disconnected"), {
        code: "ERR_IPC_DISCONNECTED",
      });
    }
    child.connected = false;
  });
  return child;
}

function createBridge(child: FakeChildProcess) {
  jest
    .spyOn(childProcess, "spawn")
    .mockReturnValue(child as unknown as ChildProcess);

  const createPythonBridge = (
    jest.requireActual("python-bridge") as typeof import("python-bridge")
  ).pythonBridge;
  return createPythonBridge({ python: "python" });
}

describe("python-bridge lifecycle", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it("ends cleanly after cancellation has already disconnected the child", async () => {
    const child = createFakeChildProcess();
    const bridge = createBridge(child);

    bridge.kill("SIGKILL");

    await expect(bridge.end()).resolves.toBeUndefined();
    expect(child.disconnect).not.toHaveBeenCalled();
  });

  it("disconnects only once when disconnect and end are both called", async () => {
    const child = createFakeChildProcess();
    const bridge = createBridge(child);

    await expect(
      Promise.all([bridge.disconnect(), bridge.end()]),
    ).resolves.toEqual([undefined, undefined]);
    expect(child.disconnect).toHaveBeenCalledTimes(1);
  });

  it.each(["ERR_IPC_DISCONNECTED", "ERR_IPC_CHANNEL_CLOSED"])(
    "absorbs a %s race reported by Node after the connected check",
    async (code) => {
      const child = createFakeChildProcess();
      child.disconnect.mockImplementation(() => {
        throw Object.assign(new Error("IPC channel is already disconnected"), {
          code,
        });
      });
      const bridge = createBridge(child);

      await expect(bridge.end()).resolves.toBeUndefined();
      expect(child.disconnect).toHaveBeenCalledTimes(1);
    },
  );

  it("does not hide unrelated disconnect failures", async () => {
    const child = createFakeChildProcess();
    child.disconnect.mockImplementation(() => {
      throw Object.assign(new Error("permission denied"), { code: "EACCES" });
    });
    const bridge = createBridge(child);

    await expect(bridge.end()).rejects.toMatchObject({ code: "EACCES" });
  });
});
