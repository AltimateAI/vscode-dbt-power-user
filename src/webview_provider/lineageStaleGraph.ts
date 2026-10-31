import * as path from "path";

// The banner the lineage panel shows over a graph drawn while an error stops
// the project from parsing: the graph is then the last manifest that parsed,
// not the project as it is now. Mirrors
// webview_panels/src/modules/lineage/types.ts.

export type StaleGraphActionId = "openFile" | "showProblems" | "tryAgain";

export interface StaleGraphAction {
  id: StaleGraphActionId;
  label: string;
  args?: { path: string; line?: number };
}

export interface StaleGraphBanner {
  // "startup": the manifest was read from disk because the project never
  // parsed in this session. "midsession": an earlier parse in this session.
  id: "stale-graph-startup" | "stale-graph-midsession";
  severity: "warning";
  title: string;
  detail: string;
  // dbt's message, verbatim.
  dbtMessage: string;
  // The first action is the primary button.
  actions: StaleGraphAction[];
}

export interface StaleGraphInput {
  // A graph is drawn in the panel.
  graphDrawn: boolean;
  // The error that stops the project from parsing, if one stands.
  blocking?: { message: string };
  manifest: {
    // Read from disk after a failed project check, not parsed in this session.
    readFromDisk: boolean;
    // Where the manifest was read from, relative to the project when inside it.
    path?: string;
    // When the manifest file was written (ms since the epoch).
    writtenAt?: number;
  };
  // The re-parse command is registered.
  canReparse: boolean;
  now: number;
}

export function staleGraphBanner(
  input: StaleGraphInput,
): StaleGraphBanner | undefined {
  if (!input.graphDrawn || !input.blocking) {
    return undefined;
  }
  const { manifest, now } = input;
  const error = summarizeDbtError(input.blocking.message);
  const when =
    manifest.writtenAt !== undefined
      ? describeWrittenAt(manifest.writtenAt, now)
      : undefined;
  const fromDisk = manifest.readFromDisk;
  const title = fromDisk
    ? `This graph is from ${manifest.path ?? "the manifest on disk"}${when ? `, written ${when}` : ""}.`
    : `This graph is from the last successful parse${when ? `, ${when}` : ""}.`;
  const detail = error.file
    ? `Your project has an error in ${error.file}${error.line !== undefined ? `, line ${error.line}` : ""}: ${error.summary}`
    : `dbt can't parse the project right now: ${error.summary}`;

  const actions: StaleGraphAction[] = [];
  if (error.file) {
    actions.push({
      id: "openFile",
      label: `Open ${path.posix.basename(error.file)}`,
      args: { path: error.file, line: error.line },
    });
  }
  actions.push({ id: "showProblems", label: "Show all problems" });
  if (input.canReparse) {
    actions.push({ id: "tryAgain", label: "Try again" });
  }

  return {
    id: fromDisk ? "stale-graph-startup" : "stale-graph-midsession",
    severity: "warning",
    title,
    detail,
    dbtMessage: error.message,
    actions,
  };
}

// The prefixes the extension and the integration put in front of dbt's own
// message.
const MESSAGE_PREFIXES = [
  "There is a problem in your dbt project. Compilation failed: ",
  "dbt configuration is invalid : ",
  "dbt_project.yml is invalid : ",
];

// A summary longer than this is cut; the full text is in dbt's message.
const SUMMARY_MAX = 200;

// dbt names the failing file in parentheses: "Compilation Error in model
// orders (models/marts/orders.sql)".
const FILE_IN_PARENS = /\(([^()\s]+\.(?:sql|py|yml|yaml|csv|md))\)/;
const LINE_NUMBER = /\bline (\d+)\b/i;

export function summarizeDbtError(raw: string): {
  // dbt's message without the extension's prefix.
  message: string;
  // The one line that says what is wrong.
  summary: string;
  file?: string;
  line?: number;
} {
  let message = raw.trim();
  for (const prefix of MESSAGE_PREFIXES) {
    if (message.startsWith(prefix)) {
      message = message.slice(prefix.length).trim();
    }
  }
  const lines = message
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  // dbt's last line is the specific one ("Could not find profile named
  // 'jaffle_shop'"); the first is the error class ("Runtime Error"). A Jinja
  // error ends with "line 14" and the source line, so its reason is the line
  // before them.
  const lineMarker = lines.findIndex((text) => /^line \d+$/i.test(text));
  let summary =
    (lineMarker > 0 ? lines[lineMarker - 1] : lines[lines.length - 1]) ??
    message;
  if (summary.length > SUMMARY_MAX) {
    summary = `${summary.slice(0, SUMMARY_MAX - 1)}…`;
  }
  const file = FILE_IN_PARENS.exec(message)?.[1];
  const line = LINE_NUMBER.exec(message)?.[1];
  return {
    message,
    summary,
    file,
    line: line !== undefined ? Number(line) : undefined,
  };
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const plural = (count: number, unit: string) =>
  `${count} ${unit}${count === 1 ? "" : "s"}`;

const clock = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

// When a manifest was written, in the user's local time: "2 hours ago",
// "yesterday at 16:40", "5 days ago".
export function describeWrittenAt(writtenAt: number, now: number): string {
  const elapsed = now - writtenAt;
  if (elapsed < MINUTE) {
    return "less than a minute ago";
  }
  if (elapsed < HOUR) {
    return `${plural(Math.floor(elapsed / MINUTE), "minute")} ago`;
  }
  const written = new Date(writtenAt);
  const today = startOfDay(new Date(now));
  if (writtenAt >= today) {
    return `${plural(Math.floor(elapsed / HOUR), "hour")} ago`;
  }
  if (writtenAt >= today - DAY) {
    return `yesterday at ${clock(written)}`;
  }
  return `${plural(Math.round((today - startOfDay(written)) / DAY), "day")} ago`;
}

// The manifest's age as a bucket, for telemetry.
export function manifestAgeBucket(
  writtenAt: number | undefined,
  now: number,
): string {
  if (writtenAt === undefined) {
    return "unknown";
  }
  const elapsed = now - writtenAt;
  if (elapsed < HOUR) {
    return "<1h";
  }
  if (elapsed < DAY) {
    return "1h-1d";
  }
  if (elapsed < 7 * DAY) {
    return "1d-7d";
  }
  if (elapsed < 30 * DAY) {
    return "7d-30d";
  }
  return "30d+";
}
