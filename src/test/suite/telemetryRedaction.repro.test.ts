import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import * as vscode from "vscode";
import { TelemetryService } from "../../telemetry";

// Reproduction tests for the extension's own pre-send secret scrubbing in
// TelemetryService.removeGenericSecretsFromStackTrace (src/telemetry/index.ts).
//
// Why this matters: error stacks are sent to App Insights via
// sendTelemetryErrorEvent. Field data shows error events at very high volume
// (millions / 30d), so any stack that slips a secret past this scrubber is a
// real privacy exposure. VS Code's TelemetryLogger is the primary redactor, so
// severity is defence-in-depth — but the extension's own scrubber is provably
// incomplete, and these tests pin exactly how.
//
// Root cause (src/telemetry/index.ts:144):
//   error.replace(/(key|token|sig|secret|...)/i, "****")
// has NO /g flag, so only the FIRST keyword occurrence in the whole stack is
// touched; every later secret-bearing line passes through verbatim. It also
// only masks the matched KEYWORD, never the secret VALUE that follows it.

describe("TelemetryService secret-redaction (repro: incomplete stack scrubbing)", () => {
  let telemetry: TelemetryService;
  let reporterErrorSpy: jest.Mock;

  beforeEach(() => {
    // TelemetryService's constructor builds a real TelemetryReporter, which reads
    // vscode.env.appName and calls vscode.env.createTelemetryLogger. Mirror the
    // env mock used by the existing telemetryService.test.ts so construction works.
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

    telemetry = new TelemetryService();
    // Swap the live reporter for a spy so nothing leaves the process; capture the
    // exact properties dict (including the scrubbed `stack`) handed to App Insights.
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
    jest.restoreAllMocks();
  });

  // Event name ends in "Error" per the repo's eslint convention for
  // sendTelemetryError's first argument.
  function scrubbedStackFor(stack: string): string {
    const err = new Error("boom");
    err.stack = stack;
    telemetry.sendTelemetryError("reproSecretScrubError", err);
    expect(reporterErrorSpy).toHaveBeenCalledTimes(1);
    const [, properties] = reporterErrorSpy.mock.calls[0] as [
      string,
      Record<string, string>,
    ];
    return properties.stack;
  }

  // Pins CURRENT behaviour: with two "token" keywords, only the first is masked
  // and the second leaks through. Passes today (documents the bug); becomes a
  // tripwire that fails the moment the scrubber is made global.
  test("BUG: only the first secret keyword in a multi-line stack is masked", () => {
    const out = scrubbedStackFor(
      [
        "Error: request failed",
        "    at a (token=AAAA111)",
        "    at b (token=BBBB222)",
      ].join("\n"),
    );
    expect(out).toContain("****"); // first occurrence masked
    expect(out).toContain("token=BBBB222"); // later occurrence leaks (the bug)
    expect(out.split("****").length - 1).toBe(1); // exactly one substitution
  });

  // Also pins that only the keyword is masked, not the secret value after it.
  test("BUG: the secret VALUE survives even when its keyword is masked", () => {
    const out = scrubbedStackFor("Error\n    at x (secret=SUPERSECRET123)");
    expect(out).toContain("****"); // 'secret' keyword masked
    expect(out).toContain("SUPERSECRET123"); // the actual value still leaks
  });

  // Desired behaviour. Currently fails (scrubber is not global), so marked
  // `failing` to keep the suite green; flips to a hard failure when index.ts adds
  // the /g flag — the signal to convert this to a normal test().
  test.failing(
    "FIXME(field-repro): every secret keyword in the stack should be masked",
    () => {
      const out = scrubbedStackFor(
        [
          "Error: request failed",
          "    at a (token=AAAA111)",
          "    at b (password=BBBB222)",
        ].join("\n"),
      );
      expect(out).not.toMatch(/AAAA111/);
      expect(out).not.toMatch(/BBBB222/);
    },
  );
});
