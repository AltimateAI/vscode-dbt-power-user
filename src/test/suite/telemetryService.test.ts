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

/**
 * 0.60.7 telemetry surfaced two diagnosability problems in `sendTelemetryError`:
 *
 *   1. `extensionActivationError` (19 events / 15 machines / 24h, win32 + VS Code 1.117)
 *      arrives with `customDimensions.stack === "<REDACTED: URL>"` and an empty
 *      `customDimensions.message`. VS Code's TelemetryLogger PII redactor
 *      collapses the entire stack into the URL replacement marker, so the
 *      event carries no usable diagnostic info.
 *
 *   2. `CommandProcessExecutionError` (24 events / 18 machines / 24h)
 *      reports only "Command errored: <REDACTED: user-file-path>" — the
 *      Error object passed in (typically a child_process spawn failure with
 *      `code: ENOENT`/`EACCES`) is reduced to a stack trace, then redacted,
 *      and `error.code` / `error.message` are not surfaced separately.
 *
 * Root cause: `sendTelemetryError` only forwards `error.stack`. It does not
 * extract `error.name`, `error.message`, or `error.code` as their own
 * properties. Those individual fields don't trigger VS Code's URL/path
 * regexes, so they survive redaction and group cleanly in App Insights.
 */
describe("TelemetryService.sendTelemetryError surfaces diagnostic fields", () => {
  let telemetry: TelemetryService;
  let reporterErrorSpy: jest.Mock;

  beforeEach(() => {
    // The TelemetryReporter constructor calls vscode.env.createTelemetryLogger
    // and reads vscode.env.appName during TelemetryService construction.
    (vscode as { env?: unknown }).env = {
      appName: "Visual Studio Code",
      createTelemetryLogger: jest.fn().mockReturnValue({
        onDidChangeEnableStates: jest.fn().mockReturnValue({ dispose: jest.fn() }),
        isErrorsEnabled: false,
        isUsageEnabled: false,
        logUsage: jest.fn(),
        logError: jest.fn(),
        dispose: jest.fn(),
      }),
    };

    telemetry = new TelemetryService();

    // Replace the live TelemetryReporter with a spy-only stub so we can
    // observe the exact properties dictionary handed to App Insights.
    reporterErrorSpy = jest.fn();
    (telemetry as unknown as { telemetryReporter: unknown }).telemetryReporter =
      {
        sendTelemetryEvent: jest.fn(),
        sendTelemetryErrorEvent: reporterErrorSpy,
        dispose: jest.fn(),
      };
  });

  afterEach(() => {
    telemetry.dispose();
    delete (vscode as { env?: unknown }).env;
  });

  const captureProperties = () => {
    expect(reporterErrorSpy).toHaveBeenCalledTimes(1);
    const [, properties] = reporterErrorSpy.mock.calls[0] as [
      string,
      Record<string, string>,
    ];
    return properties;
  };

  it("forwards error.name as a top-level property", () => {
    const err = new TypeError("Cannot destructure property 'returnResult'");
    telemetry.sendTelemetryError("unhandlederror", err);
    expect(captureProperties().error_name).toBe("TypeError");
  });

  it("forwards error.message as a top-level property (survives URL redaction)", () => {
    const err = new Error("Channel closed");
    telemetry.sendTelemetryError("unhandlederror", err);
    expect(captureProperties().error_message).toBe("Channel closed");
  });

  it("forwards error.code for system errors (ENOENT, EACCES, etc.)", () => {
    const err = Object.assign(
      new Error("spawn /usr/local/bin/python ENOENT"),
      { code: "ENOENT", syscall: "spawn", errno: -2 },
    );
    telemetry.sendTelemetryError(
      "innoverio.vscode-dbt-power-user/CommandProcessExecutionError",
      err,
    );
    const props = captureProperties();
    expect(props.error_code).toBe("ENOENT");
    expect(props.error_message).toBe("spawn /usr/local/bin/python ENOENT");
    expect(props.error_name).toBe("Error");
  });

  it("does not regress the existing stack property", () => {
    const err = new Error("boom");
    telemetry.sendTelemetryError("activationError", err);
    const props = captureProperties();
    expect(typeof props.stack).toBe("string");
    expect(props.stack).toContain("Error: boom");
  });

  it("preserves caller-supplied custom properties", () => {
    const err = new Error("boom");
    telemetry.sendTelemetryError("activationError", err, { foo: "bar" });
    expect(captureProperties().foo).toBe("bar");
  });

  it("tolerates non-Error error values without surfacing diagnostic fields", () => {
    telemetry.sendTelemetryError("activationError", "string error");
    const props = captureProperties();
    expect(props.error_name).toBeUndefined();
    expect(props.error_message).toBeUndefined();
    expect(props.error_code).toBeUndefined();
    expect(props.stack).toBe('"string error"');
  });

  it("tolerates undefined error", () => {
    telemetry.sendTelemetryError("activationError", undefined);
    const props = captureProperties();
    expect(props.error_name).toBeUndefined();
    expect(props.error_message).toBeUndefined();
    expect(props.error_code).toBeUndefined();
  });
});
