import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as vscode from "vscode";
import { TelemetryService, __TELEMETRY_INTERNALS__ } from "../../telemetry";

/**
 * 0.60.7 telemetry surfaced diagnosability gaps in `sendTelemetryError`:
 * VS Code's `TelemetryLogger` PII redactor was whole-replacing `stack` and/or
 * `error_message` to "<REDACTED: URL>" / "<REDACTED: Generic Secret>" /
 * "<REDACTED: user-file-path>", erasing the entire event's diagnostic value.
 *
 * The fix is two-tiered:
 *
 *   1. Existing `error_name` / `error_message` / `error_code` extractions:
 *      shorter atomic properties survive redaction more often than a full
 *      stack does.
 *
 *   2. Redactor-proof structured fields (`stack_hash`, `stack_top_frame_fn`,
 *      `stack_top_frame_file`, `error_constructor`, `is_power_user_origin`)
 *      plus measurements (`stack_top_frame_line`, `stack_frame_count`).
 *      These are hashes / numbers / basenames / enum tokens — none match
 *      VS Code's redactor patterns by construction. App Insights triage
 *      now groups by `stack_hash` + `stack_top_frame_fn`.
 *
 * The previous pattern-allowlist sanitizer (Bearer / JWT / keyword=value)
 * has been retired in favour of the structured fields above; the residual
 * `sanitizeForTelemetry` is a small URL+email safety net for the readable
 * strings, not a load-bearing piece of correctness.
 */

const setupVscodeEnv = () => {
  (vscode as { env?: unknown }).env = {
    appName: "Visual Studio Code",
    createTelemetryLogger: jest.fn().mockReturnValue({
      onDidChangeEnableStates: jest
        .fn()
        .mockReturnValue({ dispose: jest.fn() }),
      isErrorsEnabled: false,
      isUsageEnabled: false,
      logUsage: jest.fn(),
      logError: jest.fn(),
      dispose: jest.fn(),
    }),
  };
};

describe("TelemetryService.sendTelemetryError forwards diagnostic fields", () => {
  let telemetry: TelemetryService;
  let reporterErrorSpy: jest.Mock;

  beforeEach(() => {
    setupVscodeEnv();
    telemetry = new TelemetryService();
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

  const captureCall = () => {
    expect(reporterErrorSpy).toHaveBeenCalledTimes(1);
    const [, properties, measurements] = reporterErrorSpy.mock.calls[0] as [
      string,
      Record<string, string>,
      Record<string, number> | undefined,
    ];
    return { properties, measurements: measurements ?? {} };
  };

  it("forwards error.name as a top-level property", () => {
    const err = new TypeError("Cannot destructure property 'returnResult'");
    telemetry.sendTelemetryError("unhandledRejectionError", err);
    expect(captureCall().properties.error_name).toBe("TypeError");
  });

  it("forwards error.message as a top-level property", () => {
    const err = new Error("Channel closed");
    telemetry.sendTelemetryError("unhandledRejectionError", err);
    expect(captureCall().properties.error_message).toBe("Channel closed");
  });

  it("forwards error.code for system errors (ENOENT, EACCES, etc.)", () => {
    const err = Object.assign(new Error("spawn /usr/local/bin/python ENOENT"), {
      code: "ENOENT",
      syscall: "spawn",
      errno: -2,
    });
    telemetry.sendTelemetryError(
      "innoverio.vscode-dbt-power-user/CommandProcessExecutionError",
      err,
    );
    const { properties } = captureCall();
    expect(properties.error_code).toBe("ENOENT");
    expect(properties.error_message).toBe("spawn /usr/local/bin/python ENOENT");
    expect(properties.error_name).toBe("Error");
  });

  it("does not regress the existing stack property", () => {
    const err = new Error("boom");
    telemetry.sendTelemetryError("activationError", err);
    const { properties } = captureCall();
    expect(typeof properties.stack).toBe("string");
    expect(properties.stack).toContain("Error: boom");
  });

  it("preserves caller-supplied custom properties", () => {
    const err = new Error("boom");
    telemetry.sendTelemetryError("activationError", err, { foo: "bar" });
    expect(captureCall().properties.foo).toBe("bar");
  });

  it("preserves caller-supplied measurements alongside structured ones", () => {
    const err = new Error("boom");
    telemetry.sendTelemetryError("activationError", err, undefined, {
      duration: 123,
    });
    const { measurements } = captureCall();
    expect(measurements.duration).toBe(123);
    expect(typeof measurements.stack_frame_count).toBe("number");
  });

  it("tolerates non-Error error values", () => {
    telemetry.sendTelemetryError("activationError", "string error");
    const { properties } = captureCall();
    expect(properties.error_name).toBeUndefined();
    expect(properties.error_message).toBeUndefined();
    expect(properties.error_code).toBeUndefined();
    expect(properties.error_constructor).toBe("string");
    expect(properties.is_power_user_origin).toBe("false");
    expect(properties.stack).toBe('"string error"');
  });

  it("tolerates undefined error", () => {
    telemetry.sendTelemetryError("activationError", undefined);
    const { properties } = captureCall();
    expect(properties.error_name).toBeUndefined();
    expect(properties.error_message).toBeUndefined();
    expect(properties.error_code).toBeUndefined();
    expect(properties.error_constructor).toBe("undefined");
    expect(properties.is_power_user_origin).toBe("false");
  });
});

describe("TelemetryService.sendTelemetryError emits redactor-proof structured fields", () => {
  let telemetry: TelemetryService;
  let reporterErrorSpy: jest.Mock;

  beforeEach(() => {
    setupVscodeEnv();
    telemetry = new TelemetryService();
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

  const sendAndCapture = (err: unknown) => {
    reporterErrorSpy.mockClear();
    telemetry.sendTelemetryError("activationError", err);
    expect(reporterErrorSpy).toHaveBeenCalledTimes(1);
    const [, properties, measurements] = reporterErrorSpy.mock.calls[0] as [
      string,
      Record<string, string>,
      Record<string, number> | undefined,
    ];
    return { properties, measurements: measurements ?? {} };
  };

  it("emits error_constructor for native Error subclasses", () => {
    expect(
      sendAndCapture(new TypeError("x")).properties.error_constructor,
    ).toBe("TypeError");
    expect(
      sendAndCapture(new RangeError("x")).properties.error_constructor,
    ).toBe("RangeError");
  });

  it("emits error_constructor for plain Errors", () => {
    expect(sendAndCapture(new Error("x")).properties.error_constructor).toBe(
      "Error",
    );
  });

  it("flags is_power_user_origin=true when stack references our extension dir", () => {
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at DBTWorkspaceFolder.discoverProjects (/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:32059)",
    ].join("\n");
    expect(sendAndCapture(err).properties.is_power_user_origin).toBe("true");
  });

  it("flags is_power_user_origin=false when stack is from another extension", () => {
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at PromiseCache.getOrCreate (/u/.vscode/extensions/eamodio.gitlens-2025.5.0/dist/extension.js:42:10)",
    ].join("\n");
    expect(sendAndCapture(err).properties.is_power_user_origin).toBe("false");
  });

  it("extracts stack_top_frame_fn and basename from the first non-internal frame", () => {
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
      "    at DBTWorkspaceFolder.discoverProjects (/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:32059)",
      "    at DBTProjectContainer.registerWorkspaceFolder (/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:23186)",
    ].join("\n");
    const { properties, measurements } = sendAndCapture(err);
    expect(properties.stack_top_frame_fn).toBe(
      "DBTWorkspaceFolder.discoverProjects",
    );
    expect(properties.stack_top_frame_file).toBe("extension.js");
    expect(measurements.stack_top_frame_line).toBe(174);
  });

  it("counts stack frames in a measurement (not a string property)", () => {
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at a (/u/x.js:1:1)",
      "    at b (/u/x.js:2:1)",
      "    at c (/u/x.js:3:1)",
    ].join("\n");
    const { properties, measurements } = sendAndCapture(err);
    expect(measurements.stack_frame_count).toBe(3);
    // stack_frame_count must be a measurement, not a string property —
    // numbers don't go through VS Code's string redactor at all.
    expect(properties.stack_frame_count).toBeUndefined();
  });

  it("produces a stack_hash that is stable across user paths", () => {
    const make = (homePrefix: string): Error => {
      const e = new Error("boom");
      e.stack = [
        "Error: boom",
        `    at DBTWorkspaceFolder.discoverProjects (${homePrefix}/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:32059)`,
      ].join("\n");
      return e;
    };

    reporterErrorSpy.mockClear();
    telemetry.sendTelemetryError("activationError", make("/Users/alice"));
    const hashAlice = (
      reporterErrorSpy.mock.calls[0] as unknown as [
        string,
        Record<string, string>,
      ]
    )[1].stack_hash;

    reporterErrorSpy.mockClear();
    telemetry.sendTelemetryError("activationError", make("C:\\Users\\bob"));
    const hashBob = (
      reporterErrorSpy.mock.calls[0] as unknown as [
        string,
        Record<string, string>,
      ]
    )[1].stack_hash;

    expect(hashAlice).toBeTruthy();
    expect(hashAlice).toBe(hashBob);
    expect(hashAlice).toMatch(/^[a-f0-9]{40}$/);
  });

  it("produces a different stack_hash for a different logical stack", () => {
    const a = new Error("boom");
    a.stack = ["Error: boom", "    at foo (/u/x.js:1:1)"].join("\n");
    const b = new Error("boom");
    b.stack = ["Error: boom", "    at bar (/u/x.js:1:1)"].join("\n");
    const ha = sendAndCapture(a).properties.stack_hash;
    reporterErrorSpy.mockClear();
    const hb = sendAndCapture(b).properties.stack_hash;
    expect(ha).not.toBe(hb);
  });

  it("survives a stack that VS Code's user-file-path redactor already touched", () => {
    // Simulates the inline-redaction case (94% of staging events): the
    // absolute user-home portion of the path is replaced with the redactor
    // marker but the post-`.vscode` tail and frame structure remain.
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at DBTWorkspaceFolder.retryWithBackoff (<REDACTED: user-file-path>/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:31638)",
    ].join("\n");
    const { properties } = sendAndCapture(err);
    expect(properties.stack_top_frame_fn).toBe(
      "DBTWorkspaceFolder.retryWithBackoff",
    );
    expect(properties.stack_top_frame_file).toBe("extension.js");
    expect(properties.is_power_user_origin).toBe("true");
    expect(properties.stack_hash).toMatch(/^[a-f0-9]{40}$/);
  });

  it("handles errors with no stack at all", () => {
    const err = new Error("boom");
    err.stack = undefined;
    const { properties, measurements } = sendAndCapture(err);
    expect(properties.error_constructor).toBe("Error");
    expect(properties.is_power_user_origin).toBe("false");
    expect(properties.stack_top_frame_fn).toBeUndefined();
    expect(properties.stack_top_frame_file).toBeUndefined();
    expect(properties.stack_hash).toBeUndefined();
    expect(measurements.stack_frame_count).toBeUndefined();
  });

  it("attributes the top frame to our extension dir, not another extension's extension.js", () => {
    // Mixed-extension stack: gitlens' extension.js appears first. A bare
    // "extension.js" basename match would stamp stack_top_frame_* with the
    // gitlens frame; the marker match must skip to ours.
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at PromiseCache.getOrCreate (/u/.vscode/extensions/eamodio.gitlens-2025.5.0/dist/extension.js:42:10)",
      "    at DBTWorkspaceFolder.discoverProjects (/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.4/dist/extension.js:174:32059)",
    ].join("\n");
    const { properties, measurements } = sendAndCapture(err);
    expect(properties.stack_top_frame_fn).toBe(
      "DBTWorkspaceFolder.discoverProjects",
    );
    expect(measurements.stack_top_frame_line).toBe(174);
  });

  it("falls back to the first non-internal frame when no frame is from our extension", () => {
    const err = new Error("boom");
    err.stack = [
      "Error: boom",
      "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
      "    at PromiseCache.getOrCreate (/u/.vscode/extensions/eamodio.gitlens-2025.5.0/dist/extension.js:42:10)",
    ].join("\n");
    const { properties } = sendAndCapture(err);
    expect(properties.stack_top_frame_fn).toBe("PromiseCache.getOrCreate");
  });

  it("does not throw when the error value is a circular object", () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;
    const { properties } = sendAndCapture(circular);
    expect(properties.error_constructor).toBe("object");
    expect(properties.stack).toBe("[object Object]");
  });

  it("does not throw when the error value is a BigInt", () => {
    const { properties } = sendAndCapture(1n);
    expect(properties.error_constructor).toBe("bigint");
    expect(properties.stack).toBe("1");
  });
});

describe("__TELEMETRY_INTERNALS__.parseStackFrames", () => {
  const { parseStackFrames } = __TELEMETRY_INTERNALS__;

  it("parses 'at FN (PATH:LINE:COL)' frames", () => {
    const stack = [
      "Error: boom",
      "    at DBTProject.initialize (/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.3/dist/extension.js:159:21869)",
    ].join("\n");
    const frames = parseStackFrames(stack);
    expect(frames).toHaveLength(1);
    expect(frames[0]).toEqual({
      fn: "DBTProject.initialize",
      fullPath:
        "/u/.vscode/extensions/innoverio.vscode-dbt-power-user-0.61.3/dist/extension.js",
      file: "extension.js",
      line: 159,
      isInternal: false,
    });
  });

  it("parses 'at PATH:LINE:COL' frames (no function name)", () => {
    const stack = ["Error: boom", "    at /u/x.js:42:7"].join("\n");
    const frames = parseStackFrames(stack);
    expect(frames).toHaveLength(1);
    expect(frames[0].fn).toBeUndefined();
    expect(frames[0].file).toBe("x.js");
    expect(frames[0].line).toBe(42);
    expect(frames[0].isInternal).toBe(false);
  });

  it("marks node:internal frames as internal", () => {
    const stack = [
      "Error: boom",
      "    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
    ].join("\n");
    const frames = parseStackFrames(stack);
    expect(frames).toHaveLength(1);
    expect(frames[0].isInternal).toBe(true);
  });

  it("ignores non-frame lines (Generator.next, <anonymous>, header)", () => {
    const stack = [
      "Error: boom",
      "    at Generator.next (<anonymous>)",
      "    at f (/u/x.js:1:1)",
    ].join("\n");
    const frames = parseStackFrames(stack);
    // "<anonymous>" has no line:col so the regex skips it.
    expect(frames).toHaveLength(1);
    expect(frames[0].fn).toBe("f");
  });
});

describe("sanitizeForTelemetry (slim safety net)", () => {
  const { sanitizeForTelemetry } = __TELEMETRY_INTERNALS__;

  it("masks https URLs (greedy up to whitespace, matches VS Code's URL regex span)", () => {
    // VS Code's TelemetryLogger redactor uses `://[^\s]*` — the trailing
    // colon-before-space is consumed by the URL. We mirror that span so a
    // pre-sanitized field doesn't leave a substring the redactor would
    // still react to.
    expect(
      sanitizeForTelemetry(
        "Failed to fetch https://api.example.com/x: timeout",
      ),
    ).toBe("Failed to fetch <url> timeout");
  });

  it("masks any-scheme URLs (file://, vscode://, postgres://, ...)", () => {
    expect(sanitizeForTelemetry("path is file:///home/u/x.txt")).toContain(
      "<url>",
    );
    expect(
      sanitizeForTelemetry("error connecting to postgres://u@host/db"),
    ).toContain("<url>");
    expect(
      sanitizeForTelemetry("resource vscode-resource://innoverio/x"),
    ).toContain("<url>");
  });

  it("does NOT treat node:internal/* as a URL (single slash, not ://)", () => {
    const out = sanitizeForTelemetry(
      "    at process.emit (node:internal/events:519:28)",
    );
    expect(out).toContain("node:internal/events");
    expect(out).not.toContain("<url>");
  });

  it("masks email addresses", () => {
    expect(
      sanitizeForTelemetry("permission denied for user@host.example.com"),
    ).toBe("permission denied for <email>");
  });

  it("leaves the rest of the string intact (no keyword/Bearer/JWT masking)", () => {
    // Deliberately keep the keyword path. The structured fields keep the
    // event clusterable even if VS Code masks this whole string downstream.
    expect(sanitizeForTelemetry("token: expired")).toBe("token: expired");
    expect(sanitizeForTelemetry("Bearer abc123longvalue")).toBe(
      "Bearer abc123longvalue",
    );
  });

  it("returns empty string for empty / undefined input", () => {
    expect(sanitizeForTelemetry(undefined)).toBe("");
    expect(sanitizeForTelemetry("")).toBe("");
  });
});
