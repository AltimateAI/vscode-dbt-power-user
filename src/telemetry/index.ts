import TelemetryReporter from "@vscode/extension-telemetry";
import { createHash } from "crypto";
import * as vscode from "vscode";

const POWER_USER_EXTENSION_MARKER = "innoverio.vscode-dbt-power-user";

export class TelemetryService implements vscode.Disposable {
  private customAttributes: { [key: string]: string } = {};
  private telemetryReporter: TelemetryReporter = new TelemetryReporter(
    "InstrumentationKey=50598369-dd83-4f9a-9a65-ca1fa6f1785c;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus.livediagnostics.monitor.azure.com/;ApplicationId=429da6f5-e7b0-40e6-a602-adaa8dcde8b9",
  );
  private eventMeasurements = new Map();

  constructor() {
    this.customAttributes["ide"] = vscode.env.appName;
  }

  setTelemetryCustomAttribute(key: string, value: string) {
    this.customAttributes[key] = value;
  }

  startTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.eventMeasurements.set(eventName, new Date().getTime());
    this.sendTelemetryEvent(eventName, properties, measurements);
  }

  // TODO: check if we have to identify python exception
  endTelemetryEvent(
    eventName: string,
    error?: unknown,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    const start = this.eventMeasurements.get(eventName);
    if (error) {
      this.sendTelemetryError(`${eventName}Error`, error, properties, {
        ...(measurements || {}),
        duration: new Date().getTime() - start,
      });
      return;
    }

    this.sendTelemetryEvent(`${eventName}Success`, properties, {
      ...(measurements || {}),
      duration: new Date().getTime() - start,
    });
  }

  private getFeatureName(eventName: string) {
    const [featureName, rest] = eventName.split("/");
    if (rest) {
      return { feature: featureName };
    }
    return {};
  }

  sendTelemetryEvent(
    eventName: string, // TODO: should be TelemetryEvents
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    this.telemetryReporter.sendTelemetryEvent(
      eventName,
      {
        ...this.getFeatureName(eventName),
        ...properties,
        instanceName: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("altimateInstanceName"),
        dbtIntegrationMode: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core"),
        localMode: vscode.workspace
          .getConfiguration("dbt")
          .get<boolean>("isLocalMode", false)
          ? "true"
          : "false",
        ...this.customAttributes,
      },
      measurements,
    );
  }

  sendTelemetryError(
    eventName: string, // TODO: should be TelemetryEvents
    error?: unknown,
    properties?: { [key: string]: string },
    measurements?: { [key: string]: number },
  ) {
    const rawStack =
      error !== undefined && error instanceof Error
        ? error.stack
        : JSON.stringify(error);
    const structured = extractStructuredFields(error, rawStack);
    this.telemetryReporter.sendTelemetryErrorEvent(
      eventName,
      {
        ...this.getFeatureName(eventName),
        ...properties,
        instanceName: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("altimateInstanceName"),
        dbtIntegrationMode: vscode.workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core"),
        localMode: vscode.workspace
          .getConfiguration("dbt")
          .get<boolean>("isLocalMode", false)
          ? "true"
          : "false",
        stack: sanitizeForTelemetry(rawStack),
        ...this.extractErrorFields(error),
        ...structured.properties,
        ...this.customAttributes,
      },
      {
        ...measurements,
        ...structured.measurements,
      },
    );
  }

  // Surfaces error.name / error.message / error.code as their own properties
  // so they survive VS Code's TelemetryLogger PII redaction (which can mask
  // an entire stack to "<REDACTED: URL>") and can be filtered/grouped in
  // App Insights independently of the stack trace.
  private extractErrorFields(error: unknown): { [key: string]: string } {
    if (!(error instanceof Error)) {
      return {};
    }
    const fields: { [key: string]: string } = {
      error_name: error.name,
      error_message: sanitizeForTelemetry(error.message),
    };
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" || typeof code === "number") {
      fields.error_code = String(code);
    }
    return fields;
  }

  dispose(): void {
    this.telemetryReporter?.dispose();
  }
}

// =====================================================================
// Redactor-proof structured fields.
//
// VS Code's `TelemetryLogger` runs a PII redactor over every string property
// of every telemetry event. When any of its regexes (URL / Generic Secret /
// email / JWT / GitHub token / user-file-path / etc.) matches, the field is
// whole-replaced with "<REDACTED: ...>" — taking the rest of the stack with
// it. The redactor set is hardcoded in VS Code core and grows over time.
//
// Pattern-chasing in a pre-sanitizer is a perpetual maintenance burden, and
// incomplete by construction (~6% of staging error events still get whole-
// redacted no matter how many keywords we add). Instead, emit a fixed set
// of atomic fields the redactor cannot match: hashes, numbers, basenames,
// enum tokens. App Insights triage moves to grouping by `stack_hash` and
// `stack_top_frame_fn` — both immune to the redactor by construction. The
// readable `stack` / `error_message` stay as best-effort strings; if VS Code
// masks them in one event we still cluster and act on the event.
// =====================================================================

interface StructuredFields {
  properties: { [key: string]: string };
  measurements: { [key: string]: number };
}

const STACK_FRAME_RE =
  // Matches "    at <function> (<path>:<line>[:<col>])" and
  //         "    at <path>:<line>[:<col>]"
  /^\s*at\s+(?:(.+?)\s+\()?([^()]+?):(\d+)(?::\d+)?\)?\s*$/;

const NODE_INTERNAL_FILE_RE = /^(?:node:|internal\/)/;

function extractStructuredFields(
  error: unknown,
  rawStack: string | undefined,
): StructuredFields {
  const properties: { [key: string]: string } = {
    error_constructor:
      error instanceof Error
        ? error.constructor.name
        : error === undefined
          ? "undefined"
          : typeof error,
  };
  const measurements: { [key: string]: number } = {};

  if (!rawStack) {
    properties.is_power_user_origin = "false";
    return { properties, measurements };
  }

  properties.is_power_user_origin = rawStack.includes(
    POWER_USER_EXTENSION_MARKER,
  )
    ? "true"
    : "false";

  const frames = parseStackFrames(rawStack);
  measurements.stack_frame_count = frames.length;

  const topFrame = pickTopFrame(frames);
  if (topFrame) {
    if (topFrame.fn) {
      properties.stack_top_frame_fn = topFrame.fn;
    }
    properties.stack_top_frame_file = topFrame.file;
    measurements.stack_top_frame_line = topFrame.line;
  }

  if (frames.length > 0) {
    properties.stack_hash = hashNormalisedStack(frames);
  }

  return { properties, measurements };
}

interface StackFrame {
  fn: string | undefined;
  file: string;
  line: number;
  isInternal: boolean;
}

function parseStackFrames(stack: string): StackFrame[] {
  const out: StackFrame[] = [];
  for (const line of stack.split("\n")) {
    const m = STACK_FRAME_RE.exec(line);
    if (!m) {
      continue;
    }
    const fn = m[1] ? m[1].trim() : undefined;
    const fullPath = m[2].trim();
    const lineno = Number(m[3]);
    if (!Number.isFinite(lineno)) {
      continue;
    }
    const file = basenameForFrame(fullPath);
    const isInternal = NODE_INTERNAL_FILE_RE.test(fullPath);
    out.push({ fn, file, line: lineno, isInternal });
  }
  return out;
}

function basenameForFrame(filePath: string): string {
  if (NODE_INTERNAL_FILE_RE.test(filePath)) {
    return filePath;
  }
  // VS Code's user-file-path redactor may have already replaced the
  // absolute path with "<REDACTED: user-file-path>". The remaining
  // ".../foo/bar.js" tail still has a real basename worth keeping.
  const m = /([^\\/]+?)$/.exec(filePath);
  return m ? m[1] : filePath;
}

function pickTopFrame(frames: StackFrame[]): StackFrame | undefined {
  const powerUser = frames.find(
    (f) => !f.isInternal && f.file.includes("extension.js"),
  );
  if (powerUser) {
    return powerUser;
  }
  return frames.find((f) => !f.isInternal) || frames[0];
}

function hashNormalisedStack(frames: StackFrame[]): string {
  const normalised = frames
    .map((f) => `${f.fn ?? "<anon>"}|${f.file}|${f.line}`)
    .join("\n");
  return createHash("sha1").update(normalised).digest("hex");
}

// Best-effort safety net for the readable string fields. After the structured
// fields above are in place this is no longer load-bearing: if a string still
// slips through and triggers VS Code's redactor, the structured fields keep
// the event clusterable. So keep this short and narrow rather than chasing
// VS Code's full regex set.
const URL_RE = /\b[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s<>"'`)\]}\\]+/g;
const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

function sanitizeForTelemetry(input: string | undefined): string {
  if (!input) {
    return "";
  }
  return input.replace(URL_RE, "<url>").replace(EMAIL_RE, "<email>");
}

// Exposed for unit tests only.
export const __TELEMETRY_INTERNALS__ = {
  extractStructuredFields,
  sanitizeForTelemetry,
  parseStackFrames,
  hashNormalisedStack,
};
