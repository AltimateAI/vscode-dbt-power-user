import { afterEach, describe, expect, it, jest } from "@jest/globals";
import type { ChildProcess } from "child_process";
import { EventEmitter } from "events";
import { Duplex } from "stream";

const childProcess = require("child_process") as typeof import("child_process");

type FakeChildProcess = EventEmitter & {
  pid: number;
  stdin: NodeJS.WritableStream;
  stdout: NodeJS.ReadableStream;
  stderr: NodeJS.ReadableStream;
  stdio: [null, null, null, Duplex];
  kill: jest.Mock;
};

// The vendored bridge talks newline-delimited JSON over a plain fd-3 pipe
// (never Node IPC — Bun cannot hold an IPC channel to a non-JS child), so
// teardown half-closes that channel instead of calling ChildProcess
// disconnect.
function createFakeChildProcess(): {
  child: FakeChildProcess;
  channel: Duplex;
} {
  const channel = new Duplex({
    read() {
      /* inbound frames are pushed by tests when needed */
    },
    write(_chunk, _encoding, callback) {
      callback();
    },
  });
  const child = new EventEmitter() as FakeChildProcess;
  child.pid = 123;
  child.stdin = {} as NodeJS.WritableStream;
  child.stdout = {} as NodeJS.ReadableStream;
  child.stderr = {} as NodeJS.ReadableStream;
  child.stdio = [null, null, null, channel];
  child.kill = jest.fn(() => true);
  return { child, channel };
}

function createBridge(child: FakeChildProcess) {
  jest
    .spyOn(childProcess, "spawn")
    .mockReturnValue(child as unknown as ChildProcess);

  const createPythonBridge = (
    jest.requireActual(
      "@altimateai/dbt-integration",
    ) as typeof import("@altimateai/dbt-integration")
  ).pythonBridge;
  return createPythonBridge({ python: "python" });
}

describe("python bridge lifecycle (vendored in @altimateai/dbt-integration)", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it("ends cleanly after cancellation has already destroyed the channel", async () => {
    const { child, channel } = createFakeChildProcess();
    channel.destroy();
    const endSpy = jest.spyOn(channel, "end");
    const bridge = createBridge(child);

    bridge.kill("SIGKILL");

    await expect(bridge.end()).resolves.toBeUndefined();
    expect(endSpy).not.toHaveBeenCalled();
  });

  it("half-closes the channel only once when disconnect and end are both called", async () => {
    const { child, channel } = createFakeChildProcess();
    const endSpy = jest.spyOn(channel, "end");
    const bridge = createBridge(child);

    await expect(
      Promise.all([bridge.disconnect(), bridge.end()]),
    ).resolves.toEqual([undefined, undefined]);
    expect(endSpy).toHaveBeenCalledTimes(1);
  });

  it.each(["ERR_STREAM_DESTROYED", "ERR_STREAM_WRITE_AFTER_END"])(
    "absorbs a %s race reported after the channel-open check",
    async (code) => {
      const { child, channel } = createFakeChildProcess();
      const endSpy = jest.spyOn(channel, "end").mockImplementation((() => {
        throw Object.assign(new Error("channel already closed"), { code });
      }) as never);
      const bridge = createBridge(child);

      await expect(bridge.end()).resolves.toBeUndefined();
      expect(endSpy).toHaveBeenCalledTimes(1);
    },
  );

  it("does not hide unrelated teardown failures", async () => {
    const { child, channel } = createFakeChildProcess();
    jest.spyOn(channel, "end").mockImplementation((() => {
      throw Object.assign(new Error("permission denied"), { code: "EACCES" });
    }) as never);
    const bridge = createBridge(child);

    await expect(bridge.end()).rejects.toMatchObject({ code: "EACCES" });
  });
});
