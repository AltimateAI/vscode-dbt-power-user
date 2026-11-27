import * as path from "path";
import { StaleGraphAction } from "./lineageStaleGraph";
import { LineageCard } from "./lineageStateCard";

// The notice the lineage panel shows over a graph drawn from a partial
// manifest: dbt Fusion wrote the manifest although some files failed to
// parse, so the models and refs those files would add are missing from it.
// The panel shows it as a "Partial graph" chip in the toolbar row, in the
// stale chip's place, that opens a popover listing the failed files. Mirrors
// webview_panels/src/modules/lineage/types.ts.

export interface PartialManifestErrors {
  errors: { filePath: string; message: string }[];
}

export interface PartialGraphFile {
  // The file, relative to the project when inside it, with "/" separators.
  path: string;
  // The 1-based line of the file's first error, when dbt gives one.
  line?: number;
  // The first error's reason, in one line.
  summary: string;
  // How many errors dbt reported in the file.
  errorCount: number;
  // Opens the file at that line, where its Problems entry points.
  action: StaleGraphAction;
}

export interface PartialGraphBanner {
  id: "partial-graph";
  severity: "warning";
  // The chip's text after "Partial graph": "customers.sql failed to parse".
  age: string;
  title: string;
  detail: string;
  files: PartialGraphFile[];
  // dbt's messages, verbatim, one after the other.
  dbtMessage: string;
  actions: StaleGraphAction[];
}

// A summary longer than this is cut; the full text is in dbt's message.
const SUMMARY_MAX = 200;
// "[error] [DependencyNotFound (dbt1048)]: Ref 'x' not found": the level and
// the error's name before the reason.
const LEVEL_PREFIX = /^\s*\[(?:error|fatal)\]\s*/i;
const NAME_AND_CODE = /^\[(\w+) \((dbt\d+)\)\]:\s*/;
// Fusion's location line: "  --> models/customers.sql:9:19".
const LOCATION_LINE = /^\s*-->\s+(.+?)(?::(\d+)(?::\d+)?)?\s*$/;

/** The 1-based line of the first `-->` location in a Fusion message. */
export function fusionErrorLine(message: string): number | undefined {
  for (const text of message.split(/\r?\n/)) {
    const match = LOCATION_LINE.exec(text);
    if (match) {
      return match[2] !== undefined ? Number(match[2]) : undefined;
    }
  }
  return undefined;
}

/** The reason in a Fusion message's first line, with its dbt code after it. */
export function fusionErrorSummary(message: string): string {
  const first =
    message
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0) ?? "";
  let summary = first.replace(LEVEL_PREFIX, "");
  const named = NAME_AND_CODE.exec(summary);
  if (named) {
    summary = `${summary.slice(named[0].length)} (${named[2]})`;
  }
  return summary.length > SUMMARY_MAX
    ? `${summary.slice(0, SUMMARY_MAX - 1)}…`
    : summary;
}

const relativePath = (filePath: string, projectRoot: string): string => {
  const relative = path.relative(projectRoot, filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative)
    ? relative.split(path.sep).join("/")
    : filePath;
};

/** The files that failed to parse, once each, in the order dbt reported them. */
export function partialGraphFiles(
  partial: PartialManifestErrors,
  projectRoot: string,
): PartialGraphFile[] {
  const files = new Map<string, PartialGraphFile>();
  for (const { filePath, message } of partial.errors) {
    const shown = relativePath(filePath, projectRoot);
    const known = files.get(shown);
    if (known) {
      known.errorCount++;
      continue;
    }
    const line = fusionErrorLine(message);
    files.set(shown, {
      path: shown,
      line,
      summary: fusionErrorSummary(message),
      errorCount: 1,
      action: {
        id: "openFile",
        label: `Open ${path.posix.basename(shown)}`,
        args: { path: shown, ...(line !== undefined ? { line } : {}) },
      },
    });
  }
  return [...files.values()];
}

const fileNames = (files: PartialGraphFile[]): string =>
  files.length === 1
    ? path.posix.basename(files[0].path)
    : `${files.length} files`;

/** The notice over a graph drawn from a partial manifest, or undefined. */
export function partialGraphBanner(input: {
  graphDrawn: boolean;
  partial?: PartialManifestErrors;
  projectRoot: string;
}): PartialGraphBanner | undefined {
  if (!input.graphDrawn || !input.partial?.errors.length) {
    return undefined;
  }
  const files = partialGraphFiles(input.partial, input.projectRoot);
  const names = fileNames(files);
  return {
    id: "partial-graph",
    severity: "warning",
    age: `${names} failed to parse`,
    title: `This graph is missing parts because ${names} failed to parse.`,
    detail:
      "dbt Fusion wrote the manifest without the models and refs it couldn't parse. Fix the errors and the graph updates when you save.",
    files,
    dbtMessage: input.partial.errors
      .map(({ message }) => message.trim())
      .join("\n\n"),
    actions: [{ id: "showProblems", label: "Show all problems" }],
  };
}

/**
 * The card for an active file whose model a partial manifest left out because
 * the file itself failed to parse, or undefined when the file isn't one that
 * failed.
 */
export function droppedModelCard(input: {
  partial?: PartialManifestErrors;
  projectRoot: string;
  // The active file's absolute path.
  filePath: string;
  // The model's name, the file's name without its extension.
  modelName: string;
}): LineageCard | undefined {
  if (!input.partial?.errors.length) {
    return undefined;
  }
  const files = partialGraphFiles(input.partial, input.projectRoot);
  const own = relativePath(input.filePath, input.projectRoot);
  const file = files.find((failed) => failed.path === own);
  if (!file) {
    return undefined;
  }
  const where = file.line !== undefined ? ` (line ${file.line})` : "";
  const errors = input.partial.errors.filter(
    ({ filePath }) => relativePath(filePath, input.projectRoot) === own,
  );
  return {
    kind: "model-not-parsed",
    severity: "error",
    title: `${input.modelName} isn't in the graph`,
    detail: `${file.path} failed to parse${where}, so dbt Fusion left ${input.modelName} out of the manifest. Fix it and the graph updates when you save.`,
    dbtMessage: errors.map(({ message }) => message.trim()).join("\n\n"),
    actions: [file.action, { id: "showProblems", label: "Show all problems" }],
    setup: false,
  };
}

/**
 * What the drawn graph's canvas has to be redrawn for: the files a partial
 * manifest is missing, or "" for a whole manifest.
 */
export function partialGraphKey(partial?: PartialManifestErrors): string {
  return partial?.errors.length
    ? JSON.stringify(
        [...new Set(partial.errors.map(({ filePath }) => filePath))].sort(),
      )
    : "";
}
