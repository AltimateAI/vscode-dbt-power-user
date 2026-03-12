import { spawnSync } from "child_process";
import which from "which";

let cachedSqlfmtPath: string | null | undefined;

/**
 * Validates that a candidate path is the Python shandy-sqlfmt binary
 * by checking `--version` output for "sqlfmt, version".
 */
function isShandySqlfmt(candidatePath: string): boolean {
  try {
    const result = spawnSync(candidatePath, ["--version"], {
      encoding: "utf-8",
      timeout: 5_000,
    });
    const output = (result.stdout || "") + (result.stderr || "");
    return output.includes("sqlfmt, version");
  } catch {
    return false;
  }
}

/**
 * Finds the Python shandy-sqlfmt binary. Caches the result.
 *
 * Resolution order:
 * 1. SQLFMT_PATH environment variable (explicit path to binary)
 * 2. `sqlfmt` on PATH (validated as shandy-sqlfmt, not Go sqlfmt)
 */
export function findSqlfmt(): string | null {
  if (cachedSqlfmtPath !== undefined) {
    return cachedSqlfmtPath;
  }

  // 1. Check SQLFMT_PATH env var
  const envPath = process.env.SQLFMT_PATH;
  if (envPath && isShandySqlfmt(envPath)) {
    cachedSqlfmtPath = envPath;
    return cachedSqlfmtPath;
  }

  // 2. Search PATH
  let candidate: string;
  try {
    candidate = which.sync("sqlfmt");
  } catch {
    cachedSqlfmtPath = null;
    return null;
  }

  if (isShandySqlfmt(candidate)) {
    cachedSqlfmtPath = candidate;
    return cachedSqlfmtPath;
  }

  cachedSqlfmtPath = null;
  return null;
}

export interface SqlfmtResult {
  diffOutput: string;
  hasChanges: boolean;
  available: boolean;
}

export interface SqlfmtFormatResult {
  /** The formatted SQL content */
  formatted: string;
  /** Whether sqlfmt made any changes */
  hasChanges: boolean;
  /** Whether sqlfmt was found */
  available: boolean;
}

/**
 * Runs sqlfmt on the given SQL content with the same args used in production:
 *   sqlfmt - --diff --no-progressbar --quiet --line-length 80
 *
 * Returns the diff output (from stderr, since sqlfmt exits non-zero when
 * there are changes and puts the diff in the error message).
 */
export function runSqlfmt(sqlContent: string): SqlfmtResult {
  const sqlfmtPath = findSqlfmt();
  if (!sqlfmtPath) {
    return { diffOutput: "", hasChanges: false, available: false };
  }

  const result = spawnSync(
    sqlfmtPath,
    ["-", "--diff", "--no-progressbar", "--quiet", "--line-length", "80"],
    {
      input: sqlContent,
      encoding: "utf-8",
      timeout: 15_000,
    },
  );

  // sqlfmt exit code 0 = no changes, exit code 1 = changes (diff in stderr)
  if (result.status === 0) {
    return { diffOutput: "", hasChanges: false, available: true };
  }

  const diffOutput = postProcessDiff(result.stderr || "");
  return { diffOutput, hasChanges: true, available: true };
}

/**
 * Runs sqlfmt on the given SQL content and returns the formatted output:
 *   sqlfmt - --no-progressbar --quiet --line-length 80
 *
 * Unlike runSqlfmt(), this returns the actual formatted SQL (not a diff).
 * Without --diff, sqlfmt always exits 0, so hasChanges is determined by
 * comparing the output to the input.
 */
export function runSqlfmtFormat(sqlContent: string): SqlfmtFormatResult {
  const sqlfmtPath = findSqlfmt();
  if (!sqlfmtPath) {
    return { formatted: "", hasChanges: false, available: false };
  }

  const result = spawnSync(
    sqlfmtPath,
    ["-", "--no-progressbar", "--quiet", "--line-length", "80"],
    {
      input: sqlContent,
      encoding: "utf-8",
      timeout: 15_000,
    },
  );

  // Without --diff, sqlfmt writes formatted SQL to stdout and always exits 0.
  const formatted = result.stdout || "";
  return {
    formatted,
    hasChanges: formatted !== sqlContent,
    available: true,
  };
}

/**
 * Post-processes sqlfmt diff output to handle a parse-diff quirk:
 * blank context lines (lines that exist unchanged between changes) in
 * unified diffs should have a leading space, but sqlfmt emits them as
 * truly empty lines. parse-diff needs the leading space to recognize
 * them as context lines rather than ignoring them.
 */
function postProcessDiff(diff: string): string {
  const lines = diff.split("\n");
  const result: string[] = [];
  let inHunk = false;

  for (const line of lines) {
    if (line.startsWith("@@")) {
      inHunk = true;
      result.push(line);
    } else if (
      inHunk &&
      line === "" &&
      result.length > 0 &&
      !result[result.length - 1].startsWith("@@")
    ) {
      // Empty line inside a hunk that isn't right after the @@ header —
      // treat as a blank context line
      result.push(" ");
    } else {
      if (
        line.startsWith("---") ||
        line.startsWith("+++") ||
        line.startsWith("diff ")
      ) {
        inHunk = false;
      }
      result.push(line);
    }
  }

  return result.join("\n");
}
