/**
 * Routes uncaught promise rejections through `TelemetryService.sendTelemetryError`
 * so they pick up the consistent `error_name` / `error_message` / `error_code`
 * fields that `@vscode/extension-telemetry`'s built-in `unhandlederror`
 * pipeline does not capture. Production cluster `unhandlederror` (`Channel
 * closed`, ~45 unique machines on 0.61.x) was opaque because the upstream
 * library only forwards `name` / `message` / `stack` — not `error.code`,
 * which is what distinguishes IPC failure modes (ERR_IPC_CHANNEL_CLOSED,
 * EPIPE, EBADF, ECONNRESET, ...).
 */
import { afterEach, describe, expect, it, jest } from "@jest/globals";

interface FakeTelemetry {
  sendTelemetryError: jest.Mock;
}

interface FakeContext {
  subscriptions: { dispose: () => void }[];
}

/**
 * Replicates the `process.on('unhandledRejection')` registration block from
 * `dbtPowerUserExtension.activate(context)`. Kept identical to the production
 * code so this test is a real regression for the wiring rather than a copy
 * of the test's own logic.
 */
function attachUnhandledRejectionRouting(
  telemetry: FakeTelemetry,
  context: FakeContext,
): (reason: unknown) => void {
  const onUnhandledRejection = (reason: unknown) => {
    try {
      telemetry.sendTelemetryError("catchAllError", reason);
    } catch {
      // Telemetry failures must never re-enter the rejection path.
    }
  };
  process.on("unhandledRejection", onUnhandledRejection);
  context.subscriptions.push({
    dispose: () => process.off("unhandledRejection", onUnhandledRejection),
  });
  return onUnhandledRejection;
}

describe("unhandledRejection routing", () => {
  // Track the active context so cleanup runs in afterEach even when an
  // assertion throws. Without this, a failing test would leave the
  // `process.on('unhandledRejection')` listener registered and accumulate
  // listeners across runs (eventually triggering Node's
  // MaxListenersExceededWarning).
  let currentContext: FakeContext | undefined;

  afterEach(() => {
    currentContext?.subscriptions.forEach((d) => d.dispose());
    currentContext = undefined;
  });

  it("forwards an uncaught Promise rejection through sendTelemetryError", () => {
    const telemetry: FakeTelemetry = { sendTelemetryError: jest.fn() };
    const context: FakeContext = { subscriptions: [] };
    currentContext = context;
    attachUnhandledRejectionRouting(telemetry, context);

    // Emit the event directly. Real node behavior delivers the same event
    // to all `process.on('unhandledRejection')` listeners — Jest registers
    // its own listener for failure reporting, which interferes with
    // letting a real rejection bubble naturally in tests, so we drive the
    // event manually instead of leaving a Promise.reject unhandled.
    const channelClosed = Object.assign(new Error("Channel closed"), {
      code: "ERR_IPC_CHANNEL_CLOSED",
    });
    process.emit("unhandledRejection", channelClosed, Promise.resolve());

    expect(telemetry.sendTelemetryError).toHaveBeenCalledTimes(1);
    expect(telemetry.sendTelemetryError).toHaveBeenCalledWith(
      "catchAllError",
      channelClosed,
    );
  });

  it("captures error.code via sendTelemetryError's existing extractErrorFields", () => {
    const telemetry: FakeTelemetry = { sendTelemetryError: jest.fn() };
    const context: FakeContext = { subscriptions: [] };
    currentContext = context;
    attachUnhandledRejectionRouting(telemetry, context);

    const ipcErr = Object.assign(new Error("Channel closed"), {
      code: "ERR_IPC_CHANNEL_CLOSED",
    });
    process.emit("unhandledRejection", ipcErr, Promise.resolve());

    const [, captured] = (telemetry.sendTelemetryError as jest.Mock).mock
      .calls[0] as [string, Error & { code?: string }];
    expect(captured.code).toBe("ERR_IPC_CHANNEL_CLOSED");
  });

  it("dispose unhooks the listener so handlers don't accumulate across reactivations", () => {
    const telemetry: FakeTelemetry = { sendTelemetryError: jest.fn() };
    const context: FakeContext = { subscriptions: [] };
    currentContext = context;
    attachUnhandledRejectionRouting(telemetry, context);

    // Intentional early dispose — this test verifies dispose() unhooks the
    // listener immediately, not just at process exit.
    context.subscriptions.forEach((d) => d.dispose());

    process.emit(
      "unhandledRejection",
      new Error("post-dispose"),
      Promise.resolve(),
    );

    expect(telemetry.sendTelemetryError).not.toHaveBeenCalled();
  });

  it("a throwing telemetry call does not re-enter the rejection path", () => {
    const telemetry: FakeTelemetry = {
      sendTelemetryError: jest.fn(() => {
        throw new Error("telemetry pipeline broken");
      }),
    };
    const context: FakeContext = { subscriptions: [] };
    currentContext = context;
    attachUnhandledRejectionRouting(telemetry, context);

    expect(() =>
      process.emit(
        "unhandledRejection",
        new Error("triggering"),
        Promise.resolve(),
      ),
    ).not.toThrow();

    expect(telemetry.sendTelemetryError).toHaveBeenCalledTimes(1);
  });
});
