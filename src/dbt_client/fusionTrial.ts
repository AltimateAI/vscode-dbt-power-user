import {
  DBT_PROJECT_FILE,
  EnvironmentVariables,
  FusionReportedError,
} from "@altimateai/dbt-integration";
import { ChildProcess, spawn, SpawnOptions } from "child_process";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  stat,
} from "fs/promises";
import { homedir, tmpdir } from "os";
import * as path from "path";
import { parse as parseYaml } from "yaml";

/**
 * A trial parse: dbt Fusion's `parse` on each dbt project, run in the
 * background before a window switches to dbt Fusion, to learn whether Fusion
 * can load the project at all.
 *
 * It never writes inside a project. A plain `dbt parse` does: `target/`,
 * `logs/`, a `.user.yml` next to a `profiles.yml` kept in the project, and,
 * when a declared package isn't installed, the packages and
 * `package-lock.yml` (Fusion's parse installs missing packages on its own,
 * and drops installed ones that aren't declared). `dbt deps` in the project
 * rewrites `package-lock.yml` too. So every run points its target and log
 * paths into a scratch directory and turns off the anonymous usage stats
 * that write `.user.yml`; a project that declares packages has them all
 * installed into scratch, by `dbt deps` on a copy of its package files,
 * whatever is installed in the project, and is parsed against those.
 */

export type FusionTrialOutcome =
  /** Every project parsed with no errors. */
  | "parsed"
  /** A project's parse reported errors, or exited non-zero. */
  | "parseErrors"
  /** A run passed its time limit and was killed. */
  | "timeout"
  /** The binary could not be started. */
  | "spawnError"
  /** This Fusion rejects a flag the trial needs (an older build). */
  | "unsupportedFlags"
  /** The project's packages couldn't be installed into scratch: it declares
   * a `local:` package (no `firstError`), or `dbt deps` failed (`firstError`
   * is its first error). */
  | "packagesMissing"
  /** The caller's AbortSignal fired. */
  | "canceled";

export interface FusionTrialProject {
  root: string;
  outcome: FusionTrialOutcome;
  errorCount: number;
  /** Fusion's first error, for showing to the user: one line, the home directory as ~, at most 300 chars (end with "…" when cut). Never for telemetry. */
  firstError?: string;
  /** The dbt error code of the first error ("dbt1005"), for telemetry; only when it matches /^dbt\d{4}$/. */
  firstErrorCode?: string;
  durationMs: number;
}

export interface FusionTrialResult {
  /** "parsed" only if every project parsed; otherwise the first non-parsed project's outcome. */
  outcome: FusionTrialOutcome;
  projects: FusionTrialProject[];
  /** The first project that did not parse. */
  failed?: FusionTrialProject;
  durationMs: number;
}

/** `child_process.spawn`, or a stand-in for tests. */
export type SpawnProcess = (
  command: string,
  args: string[],
  options: SpawnOptions,
) => ChildProcess;

export interface FusionTrialOptions {
  /** Absolute path of the dbt Fusion binary. */
  binary: string;
  /** Tried one at a time, in order; the trial stops at the first that doesn't parse. */
  projectRoots: string[];
  /** The environment dbt runs that project with. */
  envFor: (projectRoot: string) => EnvironmentVariables;
  signal?: AbortSignal;
  /** Default 180_000. */
  projectTimeoutMs?: number;
  /** Default 300_000; projects not reached in time count as "timeout". */
  totalTimeoutMs?: number;
  /** For tests: replaces `child_process.spawn`. */
  spawnProcess?: SpawnProcess;
}

const DEFAULT_PROJECT_TIMEOUT_MS = 180_000;
const DEFAULT_TOTAL_TIMEOUT_MS = 300_000;
// How long a killed run gets to exit before the trial moves on without it.
const KILL_GRACE_MS = 2_000;
const MAX_FIRST_ERROR_LENGTH = 300;
const SCRATCH_PREFIX = "pu-fusion-trial-";
// A scratch folder this old is a leftover: a trial takes 5 minutes at most.
const LEFTOVER_SCRATCH_MS = 60 * 60 * 1000;
const PACKAGE_FILES = ["packages.yml", "dependencies.yml"];
const PACKAGE_LOCK_FILE = "package-lock.yml";

/**
 * Runs the trial parse on each project in turn. Never throws and never
 * rejects: anything unexpected becomes a project's outcome. With no projects
 * it is trivially "parsed"; callers pass at least one.
 */
export async function runFusionTrial(
  options: FusionTrialOptions,
): Promise<FusionTrialResult> {
  const started = Date.now();
  const totalDeadline =
    started + (options.totalTimeoutMs ?? DEFAULT_TOTAL_TIMEOUT_MS);
  await removeLeftoverScratch(tmpdir());
  const projects: FusionTrialProject[] = [];
  for (const [index, root] of options.projectRoots.entries()) {
    const project = await trialProject(root, options, totalDeadline);
    projects.push(project);
    if (project.outcome === "parsed") {
      continue;
    }
    // Out of time for the whole trial: the projects not reached count as
    // timed out, so the result says none of them were shown to parse.
    if (project.outcome === "timeout" && Date.now() >= totalDeadline) {
      for (const unreached of options.projectRoots.slice(index + 1)) {
        projects.push(projectResult(unreached, "timeout", Date.now()));
      }
    }
    break;
  }
  const failed = projects.find((project) => project.outcome !== "parsed");
  return {
    outcome: failed?.outcome ?? "parsed",
    projects,
    ...(failed ? { failed } : {}),
    durationMs: Date.now() - started,
  };
}

/**
 * Removes trial scratch folders in `dir` older than an hour. They're left
 * when a window closed or its extension host exited mid-trial, before the
 * trial could remove its own. Never throws.
 */
export async function removeLeftoverScratch(
  dir: string,
  now = Date.now(),
): Promise<void> {
  const names = await readdir(dir).catch(() => [] as string[]);
  for (const name of names.filter((n) => n.startsWith(SCRATCH_PREFIX))) {
    const folder = path.join(dir, name);
    try {
      if (now - (await stat(folder)).mtimeMs > LEFTOVER_SCRATCH_MS) {
        await rm(folder, { recursive: true, force: true, maxRetries: 3 });
      }
    } catch {
      // Gone already, or not ours to remove.
    }
  }
}

async function trialProject(
  root: string,
  options: FusionTrialOptions,
  totalDeadline: number,
): Promise<FusionTrialProject> {
  const started = Date.now();
  const deadline = Math.min(
    started + (options.projectTimeoutMs ?? DEFAULT_PROJECT_TIMEOUT_MS),
    totalDeadline,
  );
  let scratch: string | undefined;
  try {
    if (options.signal?.aborted) {
      return projectResult(root, "canceled", started);
    }
    const env = options.envFor(root);
    const scratchDir = await mkdtemp(path.join(tmpdir(), SCRATCH_PREFIX));
    scratch = scratchDir;
    const run = (args: string[], cwd: string) =>
      runFusion(options, args, cwd, env, deadline);
    // Fusion's own paths for this run, all in scratch.
    const outputArgs = (name: string) => [
      "--target-path",
      path.join(scratchDir, name, "target"),
      "--log-path",
      path.join(scratchDir, name, "logs"),
      "--log-format",
      "json",
      "--no-send-anonymous-usage-stats",
    ];

    const packageArgs: string[] = [];
    const packages = await declaredPackages(root);
    // A `local:` package's relative path would not resolve from the copy.
    if (packages.local) {
      return projectResult(root, "packagesMissing", started);
    }
    if (packages.declared) {
      const depsProject = path.join(scratchDir, "deps-project");
      const packagesDir = path.join(scratchDir, "packages");
      await copyPackageFiles(root, depsProject);
      const deps = await run(
        [
          "deps",
          "--project-dir",
          depsProject,
          "--packages-install-path",
          packagesDir,
          ...outputArgs("deps"),
        ],
        depsProject,
      );
      const depsOutcome = outcomeOf(deps);
      if (depsOutcome.outcome !== "parsed") {
        return {
          ...depsOutcome,
          // A deps failure says nothing about Fusion's parse of the project.
          outcome:
            depsOutcome.outcome === "parseErrors"
              ? "packagesMissing"
              : depsOutcome.outcome,
          root,
          durationMs: Date.now() - started,
        };
      }
      packageArgs.push("--packages-install-path", packagesDir);
    }

    const parse = await run(
      ["parse", "--project-dir", root, ...packageArgs, ...outputArgs("parse")],
      root,
    );
    return { ...outcomeOf(parse), root, durationMs: Date.now() - started };
  } catch (error) {
    return {
      ...projectResult(root, "spawnError", started),
      firstError: shownLine(
        error instanceof Error ? error.message : `${error}`,
      ),
    };
  } finally {
    if (scratch) {
      await rm(scratch, { recursive: true, force: true, maxRetries: 3 }).catch(
        () => undefined,
      );
    }
  }
}

function projectResult(
  root: string,
  outcome: FusionTrialOutcome,
  started: number,
): FusionTrialProject {
  return { root, outcome, errorCount: 0, durationMs: Date.now() - started };
}

/** Whether the project declares packages, and whether one is `local:`. */
async function declaredPackages(
  root: string,
): Promise<{ declared: boolean; local: boolean }> {
  let declared = false;
  let local = false;
  for (const file of PACKAGE_FILES) {
    let text: string;
    try {
      text = await readFile(path.join(root, file), "utf8");
    } catch {
      continue;
    }
    let packages: unknown;
    try {
      packages = (parseYaml(text) as { packages?: unknown } | null)?.packages;
    } catch {
      // Unreadable here: taken as declaring packages, so that `dbt deps` on
      // the copy reports the problem and the parse never installs any.
      declared = true;
      continue;
    }
    if (Array.isArray(packages) && packages.length > 0) {
      declared = true;
      local ||= packages.some(
        (entry) =>
          typeof entry === "object" && entry !== null && "local" in entry,
      );
    }
  }
  return { declared, local };
}

/** The files `dbt deps` reads, copied into `target` so it runs on the copy. */
async function copyPackageFiles(root: string, target: string): Promise<void> {
  await mkdir(target, { recursive: true });
  for (const file of [DBT_PROJECT_FILE, ...PACKAGE_FILES, PACKAGE_LOCK_FILE]) {
    await copyFile(path.join(root, file), path.join(target, file)).catch(
      (error: NodeJS.ErrnoException) => {
        if (error.code !== "ENOENT") {
          throw error;
        }
      },
    );
  }
}

type RunEnd =
  | { kind: "exited"; exitCode: number | null; output: FusionOutput }
  | { kind: "timeout" }
  | { kind: "canceled" }
  | { kind: "spawnError"; message: string };

type ProjectOutcome = Pick<
  FusionTrialProject,
  "outcome" | "errorCount" | "firstError" | "firstErrorCode"
>;

function outcomeOf(end: RunEnd): ProjectOutcome {
  switch (end.kind) {
    case "timeout":
    case "canceled":
      return { outcome: end.kind, errorCount: 0 };
    case "spawnError":
      return {
        outcome: "spawnError",
        errorCount: 0,
        firstError: shownLine(end.message),
      };
  }
  const { output, exitCode } = end;
  if (exitCode !== 0 && output.unsupportedFlag) {
    return {
      outcome: "unsupportedFlags",
      errorCount: 0,
      firstError: shownLine(output.unsupportedFlag),
    };
  }
  if (output.firstError) {
    return {
      outcome: "parseErrors",
      errorCount: output.errorCount,
      firstError: shownError(output.firstError.msg),
      ...withCode(errorCode(output.firstError)),
    };
  }
  if (exitCode !== 0) {
    const last = output.lastStderrLine ?? output.lastStdoutLine;
    return {
      outcome: "parseErrors",
      errorCount: 0,
      firstError: shownLine(last ?? `dbt exited with code ${exitCode}`),
    };
  }
  return { outcome: "parsed", errorCount: 0 };
}

function withCode(code: string | undefined) {
  return code ? { firstErrorCode: code } : {};
}

function runFusion(
  options: FusionTrialOptions,
  args: string[],
  cwd: string,
  env: EnvironmentVariables,
  deadline: number,
): Promise<RunEnd> {
  const timeoutMs = deadline - Date.now();
  if (options.signal?.aborted) {
    return Promise.resolve({ kind: "canceled" });
  }
  if (timeoutMs <= 0) {
    return Promise.resolve({ kind: "timeout" });
  }
  const spawnProcess = options.spawnProcess ?? spawn;
  return new Promise<RunEnd>((resolve) => {
    let child: ChildProcess;
    try {
      child = spawnProcess(options.binary, args, {
        cwd,
        env,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
        // Its own process group on macOS and Linux, so a timeout or cancel
        // kills the processes it started too.
        detached: process.platform !== "win32",
      });
    } catch (error) {
      resolve({ kind: "spawnError", message: messageOf(error) });
      return;
    }
    const output = new FusionOutputReader();
    let settled = false;
    let stopping = false;
    let graceTimer: NodeJS.Timeout | undefined;
    const finish = (end: RunEnd) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      clearTimeout(graceTimer);
      options.signal?.removeEventListener("abort", onAbort);
      resolve(end);
    };
    const exited = (exitCode: number | null) => {
      output.end();
      finish({ kind: "exited", exitCode, output: output.result() });
    };
    // Killed: done once the process exits, or after a grace period if it
    // doesn't, so a stuck process can't hold the trial up.
    const stop = (end: RunEnd) => {
      if (settled || stopping) {
        return;
      }
      // Before the kill: a kill that fails emits "error" too.
      stopping = true;
      killTree(child, spawnProcess);
      // It exited already, and only its output is still closing (a process
      // it started may hold it, killed above): that's its result.
      if (child.exitCode !== null) {
        exited(child.exitCode);
        return;
      }
      if (child.signalCode !== null) {
        finish(end);
        return;
      }
      child.once("exit", () => finish(end));
      graceTimer = setTimeout(() => {
        // On Windows the run is killed once taskkill reports: kill it now
        // if taskkill hasn't, so it doesn't outlive its scratch folder.
        killProcess(child);
        finish(end);
      }, KILL_GRACE_MS);
    };
    const onAbort = () => stop({ kind: "canceled" });
    const timer = setTimeout(() => stop({ kind: "timeout" }), timeoutMs);
    options.signal?.addEventListener("abort", onAbort, { once: true });

    child.stdout?.on("data", (chunk: Buffer) => output.stdout(chunk));
    child.stderr?.on("data", (chunk: Buffer) => output.stderr(chunk));
    // Before a stop, "error" means the process failed to start. After one,
    // a kill failed: the stop's own outcome stands.
    child.once("error", (error) => {
      if (!stopping) {
        finish({ kind: "spawnError", message: messageOf(error) });
      }
    });
    child.once("close", (exitCode: number | null) => {
      if (!stopping) {
        exited(exitCode);
      }
    });
  });
}

/**
 * Kills a run and the processes it started (`dbt deps` may start git). On
 * Windows a process's children outlive it unless the tree is killed. On
 * macOS and Linux the run has its own process group, killed as one.
 */
function killTree(child: ChildProcess, spawnProcess: SpawnProcess): void {
  if (process.platform !== "win32" && child.pid !== undefined) {
    try {
      process.kill(-child.pid, "SIGKILL");
      return;
    } catch {
      // No such group: kill the process itself.
    }
  }
  if (process.platform === "win32" && child.pid !== undefined) {
    // taskkill finds the tree from the run, so the run is killed after it.
    const killRun = () => killProcess(child);
    try {
      spawnProcess("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      })
        .on("error", killRun)
        .on("exit", killRun);
      return;
    } catch {
      // taskkill didn't start: kill the run itself.
    }
  }
  killProcess(child);
}

function killProcess(child: ChildProcess): void {
  try {
    child.kill("SIGKILL");
  } catch {
    // Already gone.
  }
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : `${error}`;
}

interface FusionLogRecord {
  level: string;
  msg: string;
  code?: string;
}

interface FusionOutput {
  errorCount: number;
  firstError?: FusionLogRecord;
  lastStdoutLine?: string;
  lastStderrLine?: string;
  /** The line where Fusion rejected a flag. */
  unsupportedFlag?: string;
}

// How Fusion's argument parser rejects a flag: 2.0.12 prints
// `error: unexpected argument '--x' found`, or for a value it doesn't know
// `error: invalid value 'x' for '--log-format <LOG_FORMAT>'`; older parsers
// printed `error: Found argument '--x' which wasn't expected`.
const UNSUPPORTED_FLAG =
  /^error: (unexpected argument '|Found argument '|invalid value '[^']*' for '--log-format)/;

/**
 * Reads Fusion's `--log-format json` output line by line as it arrives,
 * keeping only what the outcome needs, so a large output is never held whole.
 */
class FusionOutputReader {
  private readonly output: FusionOutput = { errorCount: 0 };
  private readonly partial = { stdout: "", stderr: "" };

  stdout(chunk: Buffer): void {
    this.append("stdout", chunk.toString());
  }

  stderr(chunk: Buffer): void {
    this.append("stderr", chunk.toString());
  }

  end(): void {
    this.line("stdout", this.partial.stdout);
    this.line("stderr", this.partial.stderr);
    this.partial.stdout = this.partial.stderr = "";
  }

  result(): FusionOutput {
    return this.output;
  }

  private append(stream: "stdout" | "stderr", text: string): void {
    const lines = (this.partial[stream] + text).split("\n");
    this.partial[stream] = lines.pop() ?? "";
    for (const line of lines) {
      this.line(stream, line);
    }
  }

  private line(stream: "stdout" | "stderr", raw: string): void {
    const text = stripAnsi(raw).trim();
    if (!text) {
      return;
    }
    const record = logRecord(text);
    const last = record ? lastLine(record.msg) : text;
    if (last) {
      if (stream === "stdout") {
        this.output.lastStdoutLine = last;
      } else {
        this.output.lastStderrLine = last;
      }
    }
    if (record) {
      if (record.level === "error" || record.level === "fatal") {
        this.output.errorCount += 1;
        this.output.firstError ??= record;
      }
    } else if (stream === "stderr" && UNSUPPORTED_FLAG.test(text)) {
      this.output.unsupportedFlag ??= text;
    }
  }
}

/**
 * A `--log-format json` line's level, message and code. Fusion 2.0.12 writes
 * `{"data":{…},"info":{"code":"1005","level":"error","msg":"[error]
 * [InvalidConfig (dbt1005)]: …","name":"InvalidConfig",…}}`.
 */
function logRecord(line: string): FusionLogRecord | undefined {
  if (!line.startsWith("{")) {
    return undefined;
  }
  try {
    const info = JSON.parse(line)?.info;
    if (typeof info?.level !== "string" || typeof info?.msg !== "string") {
      return undefined;
    }
    return {
      level: info.level,
      msg: info.msg,
      ...(typeof info.code === "string" ? { code: info.code } : {}),
    };
  } catch {
    return undefined;
  }
}

/**
 * The error's dbt code: the record's `code` ("1005") where it is one, else
 * the first code its message carries, read the way dbt-integration reads it.
 */
function errorCode(record: FusionLogRecord): string | undefined {
  const fromRecord = /^(?:dbt)?(\d{4})$/.exec(record.code ?? "");
  const code = fromRecord
    ? `dbt${fromRecord[1]}`
    : new FusionReportedError(record.msg, 1).errorCodes?.split(",")[0];
  return code && /^dbt\d{4}$/.test(code) ? code : undefined;
}

function stripAnsi(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\u001b\[[0-9;]*m/g, "");
}

function lastLine(text: string): string | undefined {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .pop();
}

/**
 * A Fusion error message as one line: its first line, without the `[error]`
 * tag, and the file it points at (`  --> models/a.yml:5:1`) when it names one.
 */
function shownError(message: string): string | undefined {
  const lines = stripAnsi(message)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) {
    return undefined;
  }
  const first = lines[0].replace(/^\[error\]\s*/, "");
  const location = lines
    .find((line) => line.startsWith("-->"))
    ?.slice(3)
    .trim();
  return shownLine(location ? `${first} (${location})` : first);
}

/**
 * A line for the user: the home directory as `~` where it starts a path, cut
 * to 300 characters. The same rule as dbt-integration's error details:
 * `/home/al` leaves `/home/alice` and `/opt/home/al` alone.
 */
function shownLine(line: string): string {
  const oneLine = line.replace(/\s*\r?\n\s*/g, " ").trim();
  const home = homedir().replace(/[\\/]+$/, "");
  const escapedHome = home.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wholeHome = new RegExp(
    String.raw`(?<=^|[\s'"(<\[=,])` +
      escapedHome +
      String.raw`(?=$|[\\/\s'"()<>\[\],:;])`,
    "g",
  );
  const shown = home ? oneLine.replace(wholeHome, "~") : oneLine;
  return shown.length > MAX_FIRST_ERROR_LENGTH
    ? `${shown.slice(0, MAX_FIRST_ERROR_LENGTH - 1)}…`
    : shown;
}
